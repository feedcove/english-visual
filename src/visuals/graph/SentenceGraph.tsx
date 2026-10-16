import { useMemo } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { buildGraph, memberOf, MEMBERS, RELS, subtree } from '../../content/graph'
import type { Edge, Graph, Member } from '../../content/graph'
import { parseSentence } from '../../content/sentence'
import type { Pos, Rel } from '../../content/types'
import { Glyph } from '../../ui/Glyph'
import { textWidth, useBoxWidth } from './measure'

// Граф предложения в трёх видах: дерево зависимостей, школьные подчёркивания, рамки групп (NP / VP / PP).
// Разметка и связи — те же, что в упражнениях: parseSentence + buildGraph (src/content).

export type GraphView = 'tree' | 'members' | 'groups'

export interface SentenceGraphProps {
  /** Предложение в мини-разметке (src/content/sentence.ts). */
  source: string
  /** Связи «слово>хозяин отношение» (src/content/graph.ts). */
  graph: string
  lang?: 'en' | 'ru'
  view?: GraphView
  /** Одно выделение: слово, отношение (все связи с ним) или группа (по индексу её главного слова). */
  highlight?: { word?: number; rel?: Rel; group?: number }
  /** Скрыть школьные вопросы, названия членов и метки групп (режим вопроса). */
  hideLabels?: boolean
  /** Индекс слова без пунктуации, как в Graph.words. */
  onWord?: (wordIndex: number) => void
  /** Слова с рамкой выбора (индексы как в onWord). */
  selected?: number[]
  /** Мини-версия: ниже строки, без подписи корня. */
  compact?: boolean
  /** Как hideLabels, а у выделенного элемента вместо подписи стоит «?». */
  quiz?: boolean
}

type Highlight = NonNullable<SentenceGraphProps['highlight']>

/** Разбор и сборка графа; ошибка разметки не роняет экран. */
export function useSentenceGraph(source: string, graph: string): { graph?: Graph; error?: string } {
  return useMemo(() => {
    try {
      return { graph: buildGraph(parseSentence(source), graph) }
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Не разобрать предложение' }
    }
  }, [source, graph])
}

export function SentenceGraph(props: SentenceGraphProps) {
  const { source, graph: spec, lang = 'en', view = 'tree', highlight, onWord, selected, compact, quiz } = props
  const hideLabels = Boolean(props.hideLabels || quiz)
  const parsed = useSentenceGraph(source, spec)
  if (!parsed.graph) {
    return (
      <div className="sg-error" role="alert">
        {parsed.error}
      </div>
    )
  }
  const g = parsed.graph
  const common = { g, hl: highlight, hideLabels, quiz: Boolean(quiz), compact: Boolean(compact), onWord, selected }
  return (
    <div className="sg" lang={lang} data-view={view} data-compact={compact || undefined} data-lang={lang}>
      {view === 'tree' ? <TreeView {...common} /> : view === 'members' ? <MembersView {...common} /> : <GroupsView {...common} />}
    </div>
  )
}

interface ViewProps {
  g: Graph
  hl?: Highlight
  hideLabels: boolean
  quiz: boolean
  compact: boolean
  onWord?: (wordIndex: number) => void
  selected?: number[]
}

/* ---------- Общее: подсветка и слова ---------- */

function useMarks(g: Graph, hl?: Highlight) {
  return useMemo(() => {
    const on = new Set<number>()
    const edges = new Set<Edge>()
    let active = false
    if (hl?.word !== undefined && hl.word >= 0 && hl.word < g.words.length) {
      active = true
      on.add(hl.word)
      const e = g.edges.find((x) => x.dep === hl.word)
      if (e) edges.add(e)
    }
    if (hl?.rel) {
      active = true
      for (const e of g.edges) {
        if (e.rel === hl.rel && !(e.rel === 'attr' && isArticle(g, e.dep))) {
          on.add(e.dep)
          edges.add(e)
        }
      }
    }
    if (hl?.group !== undefined && hl.group >= 0 && hl.group < g.words.length) {
      active = true
      const sub = subtree(g, hl.group)
      for (const w of sub) on.add(w)
      for (const e of g.edges) if (sub.includes(e.dep) && e.dep !== hl.group) edges.add(e)
    }
    return { on, edges, active }
  }, [g, hl?.word, hl?.rel, hl?.group])
}

const REL_SHORT: Record<Rel, string> = {
  subj: 'кто? что?',
  obj: 'кого? что?',
  compl: 'кто? какой?',
  attr: 'какой? чей?',
  adv: 'где? когда?',
  aux: 'помогает',
  part: 'оттенок',
  prep: 'предлог',
  cc: 'и / но',
  conj: 'однородный',
  mark: 'что, когда',
}

/** Подпись на связи: школьный вопрос из RELS (первые два вопроса), для служебных — короткое слово. */
export function relLabel(rel: Rel): string {
  return REL_SHORT[rel] ?? RELS[rel].question
}

/** Артикль a / an / the: служебное слово, а не определение — ни «какой?», ни волнистой линии. */
function isArticle(g: Graph, i: number): boolean {
  const t = g.words[i]
  return t?.pos === 'det' && /^(a|an|the)$/i.test(t.text)
}

function edgeLabel(g: Graph, e: Edge): string {
  return e.rel === 'attr' && isArticle(g, e.dep) ? 'артикль' : relLabel(e.rel)
}

const MEMBER_LABEL: Record<Exclude<Member, 'same'>, string> = {
  subject: MEMBERS.subject.ru,
  predicate: MEMBERS.predicate.ru,
  object: MEMBERS.object.ru,
  attribute: MEMBERS.attribute.ru,
  adverbial: MEMBERS.adverbial.ru,
  service: 'служебное',
}

interface WordBoxProps {
  g: Graph
  i: number
  className: string
  on: boolean
  dim: boolean
  selected?: number[]
  onWord?: (i: number) => void
  style?: CSSProperties
  children: ReactNode
}

/** Слово в схеме: кнопка при onWord, иначе обычный блок. Цвет — data-pos, рамка выбора — data-sel. */
function WordBox({ g, i, className, on, dim, selected, onWord, style, children }: WordBoxProps) {
  const pos = g.words[i]!.pos
  const common = {
    className,
    style,
    'data-pos': pos,
    'data-on': on || undefined,
    'data-dim': dim || undefined,
    'data-sel': selected?.includes(i) || undefined,
  }
  return onWord ? (
    <button type="button" {...common} onClick={() => onWord(i)}>
      {children}
    </button>
  ) : (
    <div {...common}>{children}</div>
  )
}

function GlyphMark({ pos }: { pos?: Pos }) {
  return pos ? <Glyph pos={pos} size={14} /> : <span className="sg-noglyph" aria-hidden="true" />
}

/* ---------- Дерево зависимостей ---------- */

function depths(g: Graph): number[] {
  const d = g.heads.map(() => 0)
  for (let i = 0; i < d.length; i++) {
    let cur = i
    let n = 0
    while (g.heads[cur] !== -1) {
      cur = g.heads[cur]!
      n++
    }
    d[i] = n
  }
  return d
}

/** Слова в порядке предложения; на одном уровне не накладываются, на разных могут стоять друг под другом. */
function layoutX(g: Graph, depth: number[], w: number[], minStep: number, gap: number) {
  const n = w.length
  const need = (i: number, k: number) => (depth[i] === depth[k] ? (w[i]! + w[k]!) / 2 + gap : minStep)
  const x: number[] = []
  for (let k = 0; k < n; k++) {
    let v = w[k]! / 2
    for (let i = 0; i < k; i++) v = Math.max(v, x[i]! + need(i, k))
    x.push(v)
  }
  const right = Math.max(...x.map((v, i) => v + w[i]! / 2))
  // Хозяина сдвигаем к середине его зависимых, если соседи позволяют.
  const kids = g.words.map((_, k) => g.edges.filter((e) => e.head === k).map((e) => e.dep))
  const order = [...x.keys()].sort((a, b) => depth[b]! - depth[a]!)
  for (let pass = 0; pass < 3; pass++) {
    for (const k of order) {
      const ch = kids[k]!
      if (!ch.length) continue
      const want = ch.reduce((s, c) => s + x[c]!, 0) / ch.length
      let lo = w[k]! / 2
      for (let i = 0; i < k; i++) lo = Math.max(lo, x[i]! + need(i, k))
      let hi = right - w[k]! / 2
      for (let j = k + 1; j < n; j++) hi = Math.min(hi, x[j]! - need(k, j))
      if (hi >= lo) x[k] = Math.min(hi, Math.max(lo, want))
    }
  }
  const shift = -Math.min(...x.map((v, i) => v - w[i]! / 2))
  const out = x.map((v) => v + shift)
  return { x: out, width: Math.max(...out.map((v, i) => v + w[i]! / 2)) }
}

const ROOT_TAG_W = 66

function TreeView({ g, hl, hideLabels, quiz, compact, onWord, selected }: ViewProps) {
  const [boxRef, boxW] = useBoxWidth<HTMLDivElement>()
  const marks = useMarks(g, hl)
  const fs = compact ? 14 : 15
  const nodeH = compact ? 28 : 32
  // В мини-версии подписи оставляем только у выделенной связи: ниже строка и меньше шума.
  const onlyHl = compact
  const baseGap = compact ? (marks.active ? 34 : 26) : 44
  const rootOn = marks.on.has(g.root)
  const showRootTag = !compact && (!hideLabels || (quiz && rootOn))
  const tagH = showRootTag ? 16 : 0

  const geo = useMemo(() => {
    const depth = depths(g)
    const widths = g.words.map((t) => textWidth(t.text, fs) + (t.pos ? 19 : 0) + 14)
    const { x, width } = layoutX(g, depth, widths, 30, 6)
    return { depth, widths, x, width }
  }, [g, fs])

  const stretch = boxW > 0 && geo.width < boxW ? Math.min(boxW / geo.width, 1.8) : 1
  const W = Math.ceil(geo.width * stretch)
  const maxDepth = Math.max(...geo.depth)
  const cx = (i: number) => geo.x[i]! * stretch

  // Зазор между этажами растёт, если подписи соседних связей иначе не помещаются.
  const plan = (() => {
    const tops = [tagH]
    const spots = new Map<Edge, { x: number; y: number; w: number }>()
    for (let level = 0; level < maxDepth; level++) {
      const es = g.edges.filter((e) => geo.depth[e.dep] === level + 1 && (!onlyHl || marks.edges.has(e)))
      const sorted = [...es].sort((a, b) => cx(a.head) + cx(a.dep) - (cx(b.head) + cx(b.dep)))
      let gap = baseGap
      let found = new Map<Edge, { x: number; y: number; w: number }>()
      let done = false
      for (const [extra, alt] of [[0, false], [0, true], [20, false], [20, true], [40, true]] as const) {
        if (done) break
        gap = baseGap + extra
        found = new Map()
        const placed: { x: number; y: number; w: number }[] = []
        let ok = true
        for (const [k, e] of sorted.entries()) {
          const x1 = cx(e.head)
          const x2 = cx(e.dep)
          const y1 = tops[level]! + nodeH + 1
          const y2 = tops[level]! + nodeH + gap - 2
          const text = quiz && marks.edges.has(e) ? '?' : edgeLabel(g, e)
          const w = textWidth(text, 12, 600) + 14
          let spot: { x: number; y: number; w: number } | undefined
          // alt: соседние подписи сразу уходят на разные «этажи» зазора.
          const order = alt ? (k % 2 ? [0.72, 0.28, 0.5] : [0.28, 0.72, 0.5]) : [0.5, 0.3, 0.7, 0.4, 0.6, 0.25, 0.75]
          for (const t of order) {
            const x = x1 + (x2 - x1) * t
            const y = y1 + (y2 - y1) * t
            if (!placed.some((q) => Math.abs(q.x - x) < (q.w + w) / 2 + 3 && Math.abs(q.y - y) < 19)) {
              spot = { x, y, w }
              break
            }
          }
          if (!spot) {
            ok = false
            spot = { x: (x1 + x2) / 2, y: (y1 + y2) / 2, w }
          }
          placed.push(spot)
          found.set(e, spot)
        }
        if (ok || hideLabels) done = true
      }
      found.forEach((v, k) => spots.set(k, v))
      tops.push(tops[level]! + nodeH + gap)
    }
    return { tops, spots }
  })()
  const H = plan.tops[maxDepth]! + nodeH
  const top = (i: number) => plan.tops[geo.depth[i]!]!
  const labels = plan.spots

  const lines = g.edges.map((e) => {
    const x1 = cx(e.head)
    const y1 = top(e.head) + nodeH + 1
    const x2 = cx(e.dep)
    const y2 = top(e.dep) - 2
    const len = Math.hypot(x2 - x1, y2 - y1)
    const ux = (x2 - x1) / len
    const uy = (y2 - y1) / len
    const base = { x: x2 - ux * 7, y: y2 - uy * 7 }
    const head = `M${x2} ${y2} L${base.x - uy * 3.2} ${base.y + ux * 3.2} L${base.x + uy * 3.2} ${base.y - ux * 3.2}Z`
    return { e, head, line: `M${x1} ${y1} L${base.x} ${base.y}` }
  })

  return (
    <div className="sg-scroll" ref={boxRef}>
      <div className="sg-canvas" style={{ width: W, height: H, ['--nh' as string]: `${nodeH}px`, ['--fs' as string]: `${fs}px` }}>
        <svg className="sg-lines" width={W} height={H} aria-hidden="true">
          {lines.map(({ e, line, head }) => {
            const on = marks.edges.has(e)
            return (
              <g key={e.dep} data-pos={g.words[e.dep]!.pos} data-on={on || undefined} data-dim={(marks.active && !on) || undefined} className="sg-edge">
                <path d={line} />
                <path d={head} className="sg-arrow" />
              </g>
            )
          })}
        </svg>
        {g.words.map((t, i) => (
          <WordBox
            key={i}
            g={g}
            i={i}
            className="sg-node"
            on={marks.on.has(i)}
            dim={marks.active && !marks.on.has(i)}
            selected={selected}
            onWord={onWord}
            style={{ left: cx(i) - geo.widths[i]! / 2, top: top(i), width: geo.widths[i] }}
          >
            <GlyphMark pos={t.pos} />
            <span className="sg-word">{t.text}</span>
          </WordBox>
        ))}
        {lines.map(({ e }) => {
            const p = labels.get(e)
            if (!p) return null
            const on = marks.edges.has(e)
            if (onlyHl && !on) return null
            // В режиме вопроса остаётся только «?» на выделенной связи.
            if (hideLabels && !(quiz && on)) return null
            return (
              <span
                key={e.dep}
                className="sg-rel"
                data-pos={g.words[e.dep]!.pos}
                data-on={on || undefined}
                data-dim={(marks.active && !on) || undefined}
                style={{ left: p.x, top: p.y, minWidth: p.w }}
              >
                {quiz && on ? '?' : edgeLabel(g, e)}
              </span>
            )
          })}
        {showRootTag && (
          <span
            className="sg-roottag"
            data-pos={g.words[g.root]!.pos}
            data-on={rootOn || undefined}
            data-dim={(marks.active && !rootOn) || undefined}
            style={{ left: Math.max(cx(g.root), ROOT_TAG_W / 2), top: 0 }}
          >
            {quiz ? '?' : 'сказуемое'}
          </span>
        )}
      </div>
    </div>
  )
}

/* ---------- Школьные подчёркивания ---------- */

function wavePath(w: number): string {
  let d = 'M0 4'
  const step = 5
  for (let x = 0; x < w; x += step) d += x === 0 ? ` q${step / 2} -3 ${step} 0` : ` t${step} 0`
  return d
}

function MemberLine({ member, w }: { member: Exclude<Member, 'same'>; w: number }) {
  const common = { fill: 'none', strokeWidth: 1.75, strokeLinecap: 'round' as const }
  let body: ReactNode = null
  if (member === 'subject') body = <path d={`M1 4H${w - 1}`} {...common} />
  if (member === 'predicate') body = <path d={`M1 2H${w - 1}M1 6.5H${w - 1}`} {...common} />
  if (member === 'object') body = <path d={`M1 4H${w - 1}`} {...common} strokeDasharray="5 3" strokeLinecap="butt" />
  if (member === 'attribute') body = <path d={wavePath(w)} {...common} strokeWidth={1.5} />
  if (member === 'adverbial') body = <path d={`M1 4H${w - 1}`} {...common} strokeDasharray="7 3 1.5 3" strokeLinecap="butt" />
  return (
    <svg className="sg-line" width={w} height={8} viewBox={`0 0 ${w} 8`} aria-hidden="true" data-member={member}>
      {body}
    </svg>
  )
}

function MembersView({ g, hl, hideLabels, quiz, compact, onWord, selected }: ViewProps) {
  const marks = useMarks(g, hl)
  const fs = compact ? 14 : 15
  return (
    <div className="sg-members" style={{ ['--fs' as string]: `${fs}px` }}>
      {g.words.map((t, i) => {
        const member = isArticle(g, i) ? 'service' : memberOf(g, i)
        const on = marks.on.has(i)
        const hidden = quiz && on
        const label = hidden ? '?' : MEMBER_LABEL[member]
        const tw = textWidth(t.text, fs) + 6
        const w = Math.max(tw, hideLabels && !hidden ? 0 : textWidth(label, 12, 500) + 2)
        return (
          <WordBox
            key={i}
            g={g}
            i={i}
            className="sg-cell"
            on={on}
            dim={marks.active && !on}
            selected={selected}
            onWord={onWord}
            style={{ width: w + 10 }}
          >
            <GlyphMark pos={t.pos} />
            <span className="sg-word">{t.text}</span>
            <span className="sg-underline" style={{ height: 8 }}>
              {!hidden && member !== 'service' && <MemberLine member={member} w={tw} />}
            </span>
            {(!hideLabels || hidden) && (
              <span className="sg-member" data-service={member === 'service' || undefined}>
                {label}
              </span>
            )}
          </WordBox>
        )
      })}
    </div>
  )
}

/* ---------- Рамки групп ---------- */

type FrameKind = 'S' | 'NP' | 'VP' | 'PP'

interface Frame {
  kind: FrameKind
  head: number
  from: number
  to: number
  /** Этаж скобки: 0 — у слов, дальше вверх по вложенности. */
  level: number
}

const KIND_RANK: Record<FrameKind, number> = { NP: 0, PP: 1, VP: 2, S: 3 }

function isVerbal(pos?: Pos) {
  return pos === 'verb' || pos === 'aux'
}

/** Группы из дерева зависимостей: NP — существительное с зависимыми, PP — NP с предлогом, VP — сказуемое без подлежащего, S — предложение. */
export function framesOf(g: Graph): Frame[] {
  const raw: Omit<Frame, 'level'>[] = []
  const add = (kind: FrameKind, head: number, words: number[]) => {
    if (!words.length) return
    raw.push({ kind, head, from: Math.min(...words), to: Math.max(...words) })
  }
  const hasSubj = (k: number) => g.edges.some((e) => e.head === k && e.rel === 'subj')
  for (let k = 0; k < g.words.length; k++) {
    const pos = g.words[k]!.pos
    if (pos === 'noun' || pos === 'pron') {
      const preps = g.edges.filter((e) => e.head === k && e.rel === 'prep').map((e) => e.dep)
      const all = subtree(g, k)
      add('NP', k, all.filter((w) => !preps.includes(w)))
      if (preps.length) add('PP', k, all)
    }
    if (isVerbal(pos) && (k === g.root || hasSubj(k))) {
      const rest = g.edges.filter((e) => e.head === k && e.rel !== 'subj' && e.rel !== 'mark')
      add('VP', k, [k, ...rest.flatMap((e) => subtree(g, e.dep))])
      if (hasSubj(k)) add('S', k, subtree(g, k))
    }
  }
  const frames: Frame[] = []
  const sorted = [...raw].sort((a, b) => a.to - a.from - (b.to - b.from) || KIND_RANK[a.kind] - KIND_RANK[b.kind])
  for (const f of sorted) {
    const inside = frames.filter((c) => c.from >= f.from && c.to <= f.to)
    frames.push({ ...f, level: inside.length ? 1 + Math.max(...inside.map((c) => c.level)) : 0 })
  }
  return frames
}

function GroupsView({ g, hl, hideLabels, quiz, compact, onWord, selected }: ViewProps) {
  const marks = useMarks(g, hl)
  const fs = compact ? 14 : 15
  const cellH = compact ? 42 : 46
  const pitch = compact ? 22 : 24

  const geo = useMemo(() => {
    const widths = g.words.map((t) => Math.max(42, textWidth(t.text, fs) + 8))
    const gap = 4
    const x: number[] = []
    let pos = 0
    widths.forEach((w) => {
      x.push(pos)
      pos += w + gap
    })
    return { widths, x, width: pos - gap }
  }, [g, fs])

  const frames = useMemo(() => framesOf(g), [g])
  const maxLevel = frames.length ? Math.max(...frames.map((f) => f.level)) : -1
  const groupOn = hl?.group !== undefined
  const H = cellH + 6 + (maxLevel + 1) * pitch

  return (
    <div className="sg-scroll">
      <div className="sg-canvas" style={{ width: geo.width, height: H, ['--nh' as string]: `${cellH}px`, ['--fs' as string]: `${fs}px` }}>
        {g.words.map((t, i) => (
          <WordBox
            key={i}
            g={g}
            i={i}
            className="sg-cell sg-cell-abs"
            on={marks.on.has(i)}
            dim={marks.active && !marks.on.has(i)}
            selected={selected}
            onWord={onWord}
            style={{ left: geo.x[i], width: geo.widths[i], height: cellH }}
          >
            <GlyphMark pos={t.pos} />
            <span className="sg-word">{t.text}</span>
          </WordBox>
        ))}
        <svg className="sg-lines" width={geo.width} height={H} aria-hidden="true">
          {frames.map((f, k) => {
            const x1 = geo.x[f.from]! + 2
            const x2 = geo.x[f.to]! + geo.widths[f.to]! - 2
            const y = cellH + 6 + f.level * pitch + 8
            const on = groupOn && f.head === hl!.group
            return (
              <g key={k} className="sg-bracket" data-on={on || undefined} data-dim={(groupOn && !on) || undefined} data-pos={f.kind === 'S' ? undefined : g.words[f.head]!.pos}>
                <path d={`M${x1} ${y - 6}V${y}H${x2}V${y - 6}`} />
              </g>
            )
          })}
        </svg>
        {!hideLabels &&
          frames.map((f, k) => {
            const x = (geo.x[f.from]! + geo.x[f.to]! + geo.widths[f.to]!) / 2
            const y = cellH + 6 + f.level * pitch + 8
            const on = groupOn && f.head === hl!.group
            const pos = f.kind === 'S' ? undefined : g.words[f.head]!.pos
            const narrow = geo.x[f.to]! + geo.widths[f.to]! - geo.x[f.from]! < 52
            return (
              <span key={k} className="sg-group" data-pos={pos} data-on={on || undefined} data-dim={(groupOn && !on) || undefined} style={{ left: x, top: y }}>
                {pos && !narrow && <Glyph pos={pos} size={12} />}
                {quiz && on ? '?' : f.kind}
              </span>
            )
          })}
        {hideLabels &&
          quiz &&
          frames.map((f, k) =>
            groupOn && f.head === hl!.group ? (
              <span
                key={k}
                className="sg-group"
                data-on
                data-pos={f.kind === 'S' ? undefined : g.words[f.head]!.pos}
                style={{ left: (geo.x[f.from]! + geo.x[f.to]! + geo.widths[f.to]!) / 2, top: cellH + 6 + f.level * pitch + 8 }}
              >
                ?
              </span>
            ) : null,
          )}
      </div>
    </div>
  )
}
