import { useLayoutEffect, useRef, useState } from 'react'
import { Sentence } from '../../ui/Sentence'
import type { Pos } from '../../content/types'
import type { VisualProps } from '../types'
import { Tile } from './Tile'

// Формула «утверждение / отрицание / вопрос» с вспомогательным глаголом как двигателем.
// В вопросе вспомогательный переезжает в начало — по кнопке «показать» (движение до 1,2 с, без цикла).

interface T {
  id: string
  pos: Pos
  role: string
  word: string
  /** Слово добавлено правилом do-support, в исходной фразе его не было. */
  ghost?: boolean
}

const S: T = { id: 'S', pos: 'pron', role: 'S', word: 'she' }
const AUX: T = { id: 'aux', pos: 'aux', role: 'aux', word: 'can' }
const NOT: T = { id: 'not', pos: 'part', role: 'not', word: 'not' }
const V: T = { id: 'V', pos: 'verb', role: 'V', word: 'swim' }
const WH: T = { id: 'wh', pos: 'adv', role: 'Wh', word: 'where' }
const DOES: T = { id: 'aux', pos: 'aux', role: 'aux', word: 'does', ghost: true }
const PLAY: T = { id: 'V', pos: 'verb', role: 'V', word: 'play' }

type GroupId = 'statement' | 'negative' | 'question' | 'wh' | 'do-support' | 'short'

interface Row {
  cap?: string
  tiles: T[]
  end: '.' | '?'
}

interface Group {
  id: GroupId
  title: string
  rows: Row[]
}

const GROUPS: Group[] = [
  { id: 'statement', title: 'утверждение · S + aux + V', rows: [{ tiles: [S, AUX, V], end: '.' }] },
  { id: 'negative', title: 'отрицание · S + aux + not + V', rows: [{ tiles: [S, AUX, NOT, V], end: '.' }] },
  { id: 'question', title: 'вопрос · aux + S + V', rows: [{ tiles: [AUX, S, V], end: '?' }] },
  { id: 'wh', title: 'вопрос со словом · Wh + aux + S + V', rows: [{ tiles: [WH, AUX, S, V], end: '?' }] },
  {
    id: 'do-support',
    title: 'нет aux — ставим do / does / did',
    rows: [
      { cap: 'She plays → отрицание', tiles: [S, DOES, NOT, PLAY], end: '.' },
      { cap: 'She plays → вопрос', tiles: [DOES, S, PLAY], end: '?' },
    ],
  },
]

const SHORT = { q: 'Does_A she_P play_V?', yes: 'Yes, she_P does_A.', no: 'No, she_P doesn’t_A.' }

const QUESTION_ORDER = ['aux', 'S', 'V']
const STATEMENT_ORDER = ['S', 'aux', 'V']

const cap = (w: string, first: boolean) => (first ? w.charAt(0).toUpperCase() + w.slice(1) : w)

/** FLIP: когда порядок плиток меняется, они плавно переезжают на новые места. */
function useFlip(order: string, skip: { current: boolean }) {
  const els = useRef(new Map<string, HTMLElement>())
  const prev = useRef(new Map<string, { x: number; y: number }>())
  useLayoutEffect(() => {
    els.current.forEach((el, id) => {
      const last = { x: el.offsetLeft, y: el.offsetTop }
      const first = prev.current.get(id)
      prev.current.set(id, last)
      if (!first || skip.current) return
      const dx = first.x - last.x
      const dy = first.y - last.y
      if (!dx && !dy) return
      el.style.transition = 'none'
      el.style.transform = `translate(${dx}px, ${dy}px)`
      void el.offsetWidth
      el.style.transition = ''
      el.style.transform = ''
    })
    skip.current = false
  }, [order, skip])
  return (id: string) => (el: HTMLElement | null) => {
    if (el) els.current.set(id, el)
    else els.current.delete(id)
  }
}

function TileRow({ row, hideRoles, dim, flipOrder, skip }: { row: Row; hideRoles: boolean; dim: boolean; flipOrder?: string[]; skip: { current: boolean } }) {
  const tiles = flipOrder ? flipOrder.map((id) => row.tiles.find((t) => t.id === id)!) : row.tiles
  const asQuestion = flipOrder ? flipOrder[0] === 'aux' : row.end === '?'
  const refFor = useFlip(tiles.map((t) => t.id).join(), skip)
  return (
    <div className="vsl-tiles">
      {tiles.map((t, i) => (
        <Tile
          key={t.id}
          tileRef={flipOrder ? refFor(t.id) : undefined}
          pos={t.pos}
          role={hideRoles ? undefined : t.role}
          word={cap(t.word, i === 0 && t.word !== 'I') + (i === tiles.length - 1 ? (asQuestion ? '?' : '.') : '')}
          ghost={t.ghost}
          dim={dim}
        />
      ))}
    </div>
  )
}

export function AuxFormula({ focus, compact, quiz }: VisualProps) {
  const hasFocus = Boolean(focus)
  const [order, setOrder] = useState(QUESTION_ORDER)
  const skip = useRef(false)
  const lit = (id: GroupId) => focus === id
  const dim = (id: GroupId) => hasFocus && !lit(id)

  let groups: GroupId[] = ['statement', 'negative', 'question', 'wh', 'do-support', 'short']
  if (compact) groups = hasFocus ? [focus as GroupId] : ['statement', 'question']
  // В quiz другие строки (Wh-вопрос, do-support) показали бы тот же порядок слов — оставляем утверждение как опору и спрошенную строку.
  else if (quiz && hasFocus) groups = focus === 'negative' || focus === 'question' || focus === 'wh' ? ['statement', focus] : [focus as GroupId]

  const play = () => {
    skip.current = true
    setOrder(STATEMENT_ORDER)
    window.setTimeout(() => setOrder(QUESTION_ORDER), 450)
  }

  return (
    <div className="vs vsl-aux" data-pos="aux" data-compact={compact || undefined}>
      {groups.map((gid) => {
        const on = lit(gid)
        const hide = Boolean(quiz && (on || !hasFocus))
        if (gid === 'short') {
          return (
            <section key={gid} className="vsl-group" data-on={on || undefined} data-dim={dim(gid) || undefined}>
              <span className="vsl-cap">{hide ? '?' : 'короткий ответ · только aux'}</span>
              <div className="vsl-short">
                <Sentence source={SHORT.q} paint="all" />
                <Sentence source={hide ? '[Yes], she_P [does_A].' : SHORT.yes} paint="all" gap="?" />
                <Sentence source={hide ? '[No], she_P [doesn’t_A].' : SHORT.no} paint="all" gap="?" />
              </div>
            </section>
          )
        }
        const g = GROUPS.find((x) => x.id === gid)!
        const animated = !compact && !quiz && gid === 'question'
        return (
          <section key={gid} className="vsl-group" data-on={on || undefined} data-dim={dim(gid) || undefined}>
            <div className="vsl-grouphead">
              <span className="vsl-cap">{hide ? '?' : g.title}</span>
              {animated && (
                <button type="button" className="k-ctl chip k-down vsl-play" data-variant="soft" data-size="sm" onClick={play}>
                  ▶ показать
                </button>
              )}
            </div>
            {g.rows.map((r, i) => (
              <div key={i} className="vsl-subrow">
                {r.cap && !compact && <span className="vsl-subcap">{hide ? '?' : r.cap}</span>}
                <TileRow row={r} hideRoles={hide} dim={dim(gid)} flipOrder={animated ? order : undefined} skip={skip} />
              </div>
            ))}
          </section>
        )
      })}
    </div>
  )
}
