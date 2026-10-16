import { Glyph } from '../../ui/Glyph'
import { Sentence } from '../../ui/Sentence'
import type { Pos } from '../../content/types'
import type { VisualProps } from '../types'

// Сетка 4 × 3: some / any / no / every × -body / -thing / -where. Столбцы цветом и формой: -body, -thing — местоимения, -where — наречие.

const QUANT = [
  { id: 'some', hint: '+ утв.', rule: 'some — в утверждении' },
  { id: 'any', hint: '? и not', rule: 'any — в вопросе и после not' },
  { id: 'no', hint: 'уже нет', rule: 'no — уже отрицание, not не нужен' },
  { id: 'every', hint: 'все', rule: 'every — все без исключения' },
] as const

const KINDS: { id: 'body' | 'thing' | 'where'; ru: string; pos: Pos }[] = [
  { id: 'body', ru: 'люди', pos: 'pron' },
  { id: 'thing', ru: 'вещи', pos: 'pron' },
  { id: 'where', ru: 'места', pos: 'adv' },
]

type Q = (typeof QUANT)[number]['id']
type K = (typeof KINDS)[number]['id']

const WORDS: Record<Q, Record<K, string>> = {
  some: { body: 'somebody', thing: 'something', where: 'somewhere' },
  any: { body: 'anybody', thing: 'anything', where: 'anywhere' },
  no: { body: 'nobody', thing: 'nothing', where: 'nowhere' },
  every: { body: 'everybody', thing: 'everything', where: 'everywhere' },
}

const EXAMPLES: Record<Q, Record<K, string>> = {
  some: { body: 'I_P see_V somebody_P.', thing: 'I_P see_V something_P.', where: 'I_P see_V it_P somewhere_R.' },
  any: { body: 'Do_A you_P see_V anybody_P?', thing: 'I_P don’t_A see_V anything_P.', where: 'Is_A he_P anywhere_R?' },
  no: { body: 'I_P see_V nobody_P.', thing: 'I_P see_V nothing_P.', where: 'It_P is_A nowhere_R.' },
  every: { body: 'I_P see_V everybody_P.', thing: 'I_P see_V everything_P.', where: 'It_P is_A everywhere_R.' },
}

const QS: string[] = QUANT.map((q) => q.id)
const KS: string[] = KINDS.map((k) => k.id)

function parseFocus(focus?: string): { q?: Q; k?: K } {
  if (!focus) return {}
  const [a, b] = focus.split('.')
  if (b) return { q: a as Q, k: b as K }
  if (QS.includes(a!)) return { q: a as Q }
  if (KS.includes(a!)) return { k: a as K }
  return {}
}

export function IndefGrid({ focus, compact, quiz }: VisualProps) {
  const { q, k } = parseFocus(focus)
  const hasFocus = Boolean(q || k)
  const rows = QUANT.filter((r) => !compact || (q ? r.id === q : k ? true : r.id === 'some' || r.id === 'any'))
  const lit = (r: Q, c: K) => (!q || r === q) && (!k || c === k)
  const example = q ? EXAMPLES[q][k ?? 'thing'] : undefined

  return (
    <div className="vg vg-ig" data-compact={compact || undefined}>
      <div className="vg-row vg-head">
        <span className="vg-rowhead" />
        {KINDS.map((c) => (
          <span key={c.id} className="vg-colhead" data-lit={c.id === k || undefined} data-pos={c.pos}>
            <b>
              <Glyph pos={c.pos} size={12} /> -{c.id}
            </b>
            {!compact && <span>{c.ru}</span>}
          </span>
        ))}
      </div>
      {rows.map((r) => {
        const rowLit = r.id === q
        return (
          <div key={r.id} className="vg-row">
            <span className="vg-rowhead vg-ig-rowhead" data-lit={rowLit || undefined}>
              <b>{quiz && rowLit ? '?' : `${r.id}-`}</b>
              {!compact && !(quiz && rowLit) && <span>{r.hint}</span>}
            </span>
            {KINDS.map((c) => {
              const on = hasFocus && lit(r.id, c.id)
              const exact = Boolean(q && k && on)
              return (
                <span key={c.id} className="vg-cell" data-pos={c.pos} data-on={on || undefined} data-exact={exact || undefined} data-dim={(hasFocus && !on) || undefined}>
                  {quiz && on ? '?' : WORDS[r.id][c.id]}
                </span>
              )
            })}
          </div>
        )
      })}
      {!compact && !quiz && example && (
        <p className="vg-ig-ex">
          <small>{QUANT.find((r) => r.id === q)?.rule}</small>
          <Sentence source={example} paint="all" />
        </p>
      )}
    </div>
  )
}
