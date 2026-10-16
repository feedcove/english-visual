import { useMemo } from 'react'
import { parseSentence } from '../../content/sentence'
import type { Pos } from '../../content/types'
import { Glyph } from '../../ui/Glyph'
import type { VisualProps } from '../types'
import { textWidth } from './measure'

// Схема «Один цвет — два языка»: русское предложение над английским, слова раскрашены по частям речи,
// одинаковые роли соединены линиями. «Лишние» английские слова стоят над пустым местом в русской строке.

type Kind = 'article' | 'aux' | 'be' | 'case' | 'there'

interface PairDef {
  ru: string
  en: string
  /** Связи «номер русского слова-номер английского» (с 1, без пунктуации). */
  links: string
  /** Английские слова без русского соседа: номер → чем они «лишние». */
  extras: Record<number, Kind>
  /** Русское слово с падежным окончанием: номер → окончание (в английском его заменяет предлог или порядок слов). */
  endings?: Record<number, string>
}

const PAIRS: PairDef[] = [
  { ru: 'Я_P дал_V книгу_N Тому_N', en: 'I_P gave_V the_D book_N to_I Tom_N', links: '1-1, 2-2, 3-4, 4-6', extras: { 3: 'article', 5: 'case' }, endings: { 4: 'у' } },
  { ru: 'Ты_P любишь_V кофе_N ?', en: 'Do_A you_P like_V coffee_N ?', links: '1-2, 2-3, 3-4', extras: { 1: 'aux' } },
  { ru: 'Она_P врач_N', en: 'She_P is_V a_D doctor_N', links: '1-1, 2-4', extras: { 2: 'be', 3: 'article' } },
  { ru: 'В_I комнате_N есть_V стол_N', en: 'There_R is_V a_D table_N in_I the_D room_N', links: '1-5, 2-7, 3-2, 4-4', extras: { 1: 'there', 3: 'article', 6: 'article' } },
]

const KIND_LABEL: Record<Kind, string> = {
  article: 'артикль',
  aux: 'вспом.',
  be: 'связка',
  case: 'предлог',
  there: 'формальное',
}

const FOCUS_KINDS: Record<string, Kind> = { article: 'article', aux: 'aux', be: 'be', case: 'case', there: 'there' }

interface Cell {
  /** Слово вместе с прилипшей пунктуацией. */
  text: string
  stem: string
  ending?: string
  pos?: Pos
  kind?: Kind
}

function cellsOf(source: string, extras: Record<number, Kind> = {}, endings: Record<number, string> = {}): Cell[] {
  const cells: Cell[] = []
  let n = 0
  for (const t of parseSentence(source)) {
    if (t.punct) {
      const last = cells[cells.length - 1]
      if (last) {
        last.text += t.text
        last.stem += t.text
      }
      continue
    }
    n++
    const ending = endings[n]
    cells.push({
      text: t.text,
      stem: ending ? t.text.slice(0, -ending.length) : t.text,
      ending,
      pos: t.pos,
      kind: extras[n],
    })
  }
  return cells
}

function parseLinks(spec: string): [number, number][] {
  return spec.split(',').map((p) => {
    const [a, b] = p.trim().split('-').map((x) => Number(x) - 1)
    return [a!, b!]
  })
}

interface PairModel {
  ru: Cell[]
  en: Cell[]
  links: [number, number][]
  /** Линии не пересекаются: русские и английские слова можно поставить друг под другом. */
  mono: boolean
  crossing: Set<number>
}

const MODELS: PairModel[] = PAIRS.map((p) => {
  const links = parseLinks(p.links)
  const crossing = new Set<number>()
  links.forEach(([a, b], i) =>
    links.forEach(([c, d], j) => {
      if (i !== j && (a - c) * (b - d) < 0) crossing.add(i)
    }),
  )
  return { ru: cellsOf(p.ru, {}, p.endings), en: cellsOf(p.en, p.extras), links, mono: crossing.size === 0, crossing }
})

/** Чем пара важна для focus: на ней видно то, что подсвечено. */
function relevant(m: PairModel, focus?: string): boolean {
  if (!focus || focus === 'same') return true
  if (focus === 'order') return !m.mono
  const kind = FOCUS_KINDS[focus]
  if (!kind) return true
  return m.en.some((c) => c.kind === kind) || (kind === 'case' && m.ru.some((c) => c.ending))
}

const CELL_H = 46
const LINK_H = 40
/** Пары с пересекающимися линиями выше: пересечение должно быть видно. */
const LINK_H_CROSS = 58
const GAP = 2
const FS = 15

export function PosBridge({ focus, compact, quiz }: VisualProps) {
  const rel = MODELS.map((m) => relevant(m, focus))
  const shown = compact ? [Math.max(0, rel.indexOf(true))] : MODELS.map((_, i) => i)
  const firstRel = rel.indexOf(true)
  return (
    <div className="pb" data-compact={compact || undefined}>
      {!compact && <p className="pb-note">Сверху русский, снизу английский</p>}
      {shown.map((i) => (
        <BridgePair key={i} model={MODELS[i]!} focus={focus} compact={Boolean(compact)} quiz={Boolean(quiz)} dim={Boolean(focus) && !rel[i]} labelled={i === firstRel} />
      ))}
    </div>
  )
}

interface PairProps {
  model: PairModel
  focus?: string
  compact: boolean
  quiz: boolean
  dim: boolean
  /** На линиях этой пары можно писать подписи («порядок», «та же роль»). */
  labelled: boolean
}

function BridgePair({ model, focus, compact, quiz, dim, labelled }: PairProps) {
  const kind = focus ? FOCUS_KINDS[focus] : undefined
  const showLabels = !quiz && !compact

  const geo = useMemo(() => {
    const isTarget = (c: Cell, ru: boolean) => (ru ? focus === 'case' && Boolean(c.ending) : kind !== undefined && c.kind === kind)
    const width = (c: Cell, ru: boolean) => {
      const label = showLabels && isTarget(c, ru) ? textWidth(ru ? 'окончание' : KIND_LABEL[c.kind!], 12, 500) + 2 : 0
      return Math.max(26, textWidth(c.text, FS) + 6, label)
    }
    const ruW = model.ru.map((c) => width(c, true))
    const enW = model.en.map((c) => width(c, false))
    const ruLeft: number[] = []
    const enLeft: number[] = []
    const ruW2 = [...ruW]
    const enW2 = [...enW]
    let total = 0
    const ghostsRu: { left: number; w: number }[] = []
    const ghostsEn: { left: number; w: number }[] = []
    if (model.mono) {
      // Слоты: связанные слова делят одну колонку, лишние английские — над пустым местом.
      const toEn = new Map(model.links)
      let j = 0
      let x = 0
      const put = (ri?: number, ei?: number) => {
        const w = Math.max(ri !== undefined ? ruW[ri]! : 0, ei !== undefined ? enW[ei]! : 0)
        if (ri !== undefined) {
          ruLeft[ri] = x
          ruW2[ri] = w
        } else ghostsRu.push({ left: x, w })
        if (ei !== undefined) {
          enLeft[ei] = x
          enW2[ei] = w
        } else ghostsEn.push({ left: x, w })
        x += w + GAP
      }
      for (let i = 0; i < model.ru.length; i++) {
        const k = toEn.get(i)
        if (k === undefined) {
          put(i, undefined)
          continue
        }
        while (j < k) put(undefined, j++)
        put(i, k)
        j = k + 1
      }
      while (j < model.en.length) put(undefined, j++)
      total = x - GAP
    } else {
      const lay = (w: number[], left: number[]) => {
        let x = 0
        w.forEach((v, i) => {
          left[i] = x
          x += v + GAP
        })
        return x - GAP
      }
      const a = lay(ruW, ruLeft)
      const b = lay(enW, enLeft)
      total = Math.max(a, b)
      ruLeft.forEach((_, i) => (ruLeft[i] = ruLeft[i]! + (total - a) / 2))
      enLeft.forEach((_, i) => (enLeft[i] = enLeft[i]! + (total - b) / 2))
    }
    const ruLabel = showLabels && focus === 'case' && model.ru.some((c) => c.ending)
    const enLabel = showLabels && kind !== undefined && model.en.some((c) => c.kind === kind)
    const ruTop = ruLabel ? 18 : 0
    const linkH = model.mono || compact ? LINK_H : LINK_H_CROSS
    const enTop = ruTop + CELL_H + linkH
    const height = enTop + CELL_H + (enLabel ? 18 : 0)
    return { ruLeft, enLeft, ruW: ruW2, enW: enW2, total, ruTop, enTop, linkH, height, ghostsRu, ghostsEn, ruLabel, enLabel }
  }, [model, focus, kind, showLabels, compact])

  const linked = new Set(model.links.flatMap(([a, b]) => [`r${a}`, `e${b}`]))
  const linkOn = (i: number) => (focus === 'same' ? true : focus === 'order' ? model.crossing.has(i) : false)
  const noFocus = !focus

  const cell = (c: Cell, i: number, ru: boolean) => {
    const target = ru ? focus === 'case' && Boolean(c.ending) : kind !== undefined && c.kind === kind
    const on = target || (focus === 'same' && linked.has(`${ru ? 'r' : 'e'}${i}`))
    const faded = !noFocus && !on && focus !== 'order'
    const hidden = quiz && target
    const left = ru ? geo.ruLeft[i]! : geo.enLeft[i]!
    const w = ru ? geo.ruW[i]! : geo.enW[i]!
    const top = ru ? geo.ruTop : geo.enTop
    return (
      <div
        key={`${ru ? 'r' : 'e'}${i}`}
        className="pb-cell"
        data-pos={hidden ? undefined : c.pos}
        data-on={on || undefined}
        data-dim={faded || undefined}
        lang={ru ? 'ru' : 'en'}
        style={{ left, top, width: w, height: CELL_H }}
      >
        {c.pos && !hidden ? <Glyph pos={c.pos} size={14} /> : <span className="pb-noglyph" aria-hidden="true" />}
        <span className="pb-word">
          {c.ending && focus === 'case' ? (
            <>
              {c.stem}
              <u className="pb-ending">{quiz ? '?' : c.ending}</u>
            </>
          ) : hidden ? (
            '?'
          ) : (
            c.text
          )}
        </span>
        {showLabels && target && (
          <span className="pb-label" data-side={ru ? 'top' : 'bottom'}>
            {ru ? 'окончание' : KIND_LABEL[c.kind!]}
          </span>
        )}
      </div>
    )
  }

  // Подпись ставим на связь, у которой больше всего места от соседних, чтобы она не легла на чужие линии.
  const roomy = model.links
    .map(([a], i) => {
      const xs = model.links.map(([r]) => geo.ruLeft[r]! + geo.ruW[r]! / 2)
      const mine = geo.ruLeft[a]! + geo.ruW[a]! / 2
      return { i, room: Math.min(...xs.filter((_, j) => j !== i).map((x) => Math.abs(x - mine)), 999) }
    })
    .sort((p, q) => q.room - p.room)[0]
  const midLabel = showLabels && labelled && (focus === 'order' || focus === 'same') ? { text: focus === 'order' ? 'порядок слов' : 'та же роль', link: focus === 'order' ? 0 : (roomy?.i ?? 0) } : undefined

  return (
    <div className="pb-scroll" data-dim={dim || undefined}>
      <div className="pb-canvas" style={{ width: geo.total, height: geo.height }}>
        {model.ru.map((c, i) => cell(c, i, true))}
        {model.en.map((c, i) => cell(c, i, false))}
        {geo.ghostsRu.map((g, i) => (
          <span key={`gr${i}`} className="pb-ghost" style={{ left: g.left, top: geo.ruTop, width: g.w, height: CELL_H }} aria-hidden="true" />
        ))}
        {geo.ghostsEn.map((g, i) => (
          <span key={`ge${i}`} className="pb-ghost" style={{ left: g.left, top: geo.enTop, width: g.w, height: CELL_H }} aria-hidden="true" />
        ))}
        <svg className="pb-links" width={geo.total} height={geo.height} aria-hidden="true">
          {model.links.map(([a, b], i) => {
            const x1 = geo.ruLeft[a]! + geo.ruW[a]! / 2
            const x2 = geo.enLeft[b]! + geo.enW[b]! / 2
            const on = linkOn(i)
            return (
              <path
                key={i}
                d={`M${x1} ${geo.ruTop + CELL_H + 2}L${x2} ${geo.enTop - 2}`}
                data-pos={model.ru[a]!.pos}
                data-on={on || undefined}
                data-dim={(!noFocus && !on) || undefined}
                className="pb-link"
              />
            )
          })}
        </svg>
        {midLabel &&
          (() => {
            const [a, b] = model.links[midLabel.link]!
            const x = (geo.ruLeft[a]! + geo.ruW[a]! / 2 + geo.enLeft[b]! + geo.enW[b]! / 2) / 2
            return (
              <span className="pb-mid" data-pos={model.ru[a]!.pos} style={{ left: x, top: geo.ruTop + CELL_H + geo.linkH / 2 }}>
                {midLabel.text}
              </span>
            )
          })()}
      </div>
    </div>
  )
}
