import { Glyph } from '../../ui/Glyph'
import type { VisualProps } from '../types'
import { markOf, pickFocus } from './common'

// V1 — V2 — V3 и узоры форм. Одинаковые соседние формы слиты в одну ячейку, буква A / B / C — «та же или другая».

const KEYS = ['regular', 'aaa', 'abb', 'abc', 'aba', 'v2', 'v3'] as const
type RowKey = 'regular' | 'aaa' | 'abb' | 'abc' | 'aba'

interface Row {
  id: RowKey
  pattern: string
  ru: string
  forms: [string, string, string]
  /** Буквы форм: одинаковая буква — одинаковая форма. */
  letters: [string, string, string]
}

const ROWS: Row[] = [
  { id: 'regular', pattern: '+ed', ru: 'правильные', forms: ['work', 'worked', 'worked'], letters: ['A', 'B', 'B'] },
  { id: 'aaa', pattern: 'AAA', ru: 'все одинаковые', forms: ['cut', 'cut', 'cut'], letters: ['A', 'A', 'A'] },
  { id: 'abb', pattern: 'ABB', ru: 'V2 = V3', forms: ['buy', 'bought', 'bought'], letters: ['A', 'B', 'B'] },
  { id: 'abc', pattern: 'ABC', ru: 'все разные', forms: ['write', 'wrote', 'written'], letters: ['A', 'B', 'C'] },
  { id: 'aba', pattern: 'ABA', ru: 'V3 = V1', forms: ['come', 'came', 'come'], letters: ['A', 'B', 'A'] },
]

const COLS = [
  { id: 'v1', n: 'V1', ru: 'основа' },
  { id: 'v2', n: 'V2', ru: 'Past Simple' },
  { id: 'v3', n: 'V3', ru: 'Perfect, пассив' },
] as const

export function VerbForms({ focus, compact, quiz }: VisualProps) {
  const key = pickFocus(focus, KEYS)
  const has = Boolean(key)
  const col = key === 'v2' ? 1 : key === 'v3' ? 2 : undefined
  const rowKey = key && col === undefined ? (key as RowKey) : undefined
  // Мини-версия: строка из focus; для столбцов V2 / V3 — три показательные строки.
  const rows = compact ? (rowKey ? ROWS.filter((r) => r.id === rowKey) : ROWS.filter((r) => ['regular', 'abb', 'abc'].includes(r.id))) : ROWS

  return (
    <div className="vx2 vx2-vf" data-pos="verb" data-compact={compact || undefined}>
      <div className="vx2-vf-row vx2-vf-head">
        <span />
        {COLS.map((c, i) => (
          <span key={c.id} className="vx2-vf-col" {...(has && col === i ? { 'data-on': true } : has && col !== undefined ? { 'data-dim': true } : {})}>
            <b>{c.n}</b>
            {!compact && <span>{c.ru}</span>}
          </span>
        ))}
      </div>
      {rows.map((r) => {
        const rowMark = markOf(has && col === undefined, rowKey === r.id)
        // Слитые ячейки: соседние формы с одной буквой идут одним блоком.
        const groups: { from: number; span: number }[] = []
        r.letters.forEach((l, i) => {
          const last = groups[groups.length - 1]
          // В quiz не сливаем: слитая ячейка выдала бы одинаковые формы.
          if (!quiz && last && r.letters[last.from] === l && i === last.from + last.span) last.span += 1
          else groups.push({ from: i, span: 1 })
        })
        return (
          <div className="vx2-vf-row" key={r.id} data-pos="verb" data-on={rowMark === 'on' || undefined} data-dim={rowMark === 'dim' || undefined}>
            <span className="vx2-vf-pat">
              <b>{quiz && rowMark !== 'dim' ? '?' : r.pattern}</b>
              {!compact && <span>{quiz ? '' : r.ru}</span>}
            </span>
            {groups.map((g) => {
              const colLit = col !== undefined && g.from <= col && col < g.from + g.span
              const dim = has && col !== undefined && !colLit
              const hide = Boolean(quiz && ((col !== undefined && colLit) || (rowKey === r.id && g.from > 0) || (!has && g.from > 0)))
              return (
                <span
                  key={g.from}
                  className="vx2-vf-cell"
                  style={{ gridColumn: `span ${g.span}` }}
                  data-on={colLit || undefined}
                  data-dim={dim || undefined}
                >
                  <Glyph pos="verb" size={12} />
                  {hide ? <span className="vx2-q">?</span> : r.forms[g.from]}
                  {!quiz && <i className="vx2-vf-l">{r.letters[g.from]}</i>}
                </span>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
