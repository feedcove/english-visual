import { Glyph } from '../../ui/Glyph'
import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'

// Сетка 2 × 2: близко / далеко × один / много. Человечек слева, предметы стоят на разном расстоянии.

type Near = 'near' | 'far'
type Count = 'one' | 'many'

interface Cell {
  id: 'this' | 'that' | 'these' | 'those'
  near: Near
  count: Count
  ru: string
  ex: string
}

const CELLS: Cell[] = [
  { id: 'this', near: 'near', count: 'one', ru: 'этот', ex: 'this_D book_N' },
  { id: 'these', near: 'near', count: 'many', ru: 'эти', ex: 'these_D books_N' },
  { id: 'that', near: 'far', count: 'one', ru: 'тот', ex: 'that_D car_N' },
  { id: 'those', near: 'far', count: 'many', ru: 'те', ex: 'those_D cars_N' },
]

const ROWS: { id: Near; ru: string }[] = [
  { id: 'near', ru: 'близко · здесь' },
  { id: 'far', ru: 'далеко · там' },
]

const COUNTS: { id: Count; ru: string }[] = [
  { id: 'one', ru: 'один' },
  { id: 'many', ru: 'много' },
]

const SPEC = {
  near: { xs: { one: [34], many: [34, 50, 66] }, size: 12 },
  far: { xs: { one: [112], many: [96, 110, 124] }, size: 9 },
} as const

function Scene({ near, count }: { near: Near; count: Count }) {
  const { xs, size } = SPEC[near]
  const list: readonly number[] = xs[count]
  const first = list[0] ?? 0
  return (
    <svg viewBox="0 0 140 62" role="img" aria-label={`${near === 'near' ? 'Близко' : 'Далеко'}: ${count === 'one' ? 'один предмет' : 'несколько предметов'}`}>
      {/* человечек */}
      <g stroke="var(--c2)" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <circle cx="14" cy="13" r="5" />
        <path d="M14 18v17M14 35l-5 13M14 35l5 13M14 23l10-3" />
      </g>
      {/* пол */}
      <path d="M4 50h132" stroke="var(--sep)" strokeWidth="1" />
      {/* предметы: форма и цвет существительного */}
      <g data-pos="noun">
        {list.map((x) => (
          <rect key={x} x={x} y={50 - size} width={size} height={size} rx="1.5" fill="var(--pc)" />
        ))}
      </g>
      {/* расстояние */}
      <path d={`M14 58H${first}`} stroke="var(--c3)" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d={`M14 55v6M${first} 55v6`} stroke="var(--c3)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function NearFar({ focus, compact, quiz }: VisualProps) {
  const lit = CELLS.find((c) => c.id === focus)
  const hasFocus = Boolean(lit)
  const rows = compact ? ROWS.filter((r) => r.id === (lit?.near ?? 'near')) : ROWS
  // Подписи строк и столбцов выдают ответ — в вопросе их нет.
  const labels = !quiz

  return (
    <div className="vg vg-nf" data-pos="det" data-compact={compact || undefined}>
      {!compact && labels && (
        <div className="vg-nf-row vg-nf-heads">
          {COUNTS.map((c) => (
            <span key={c.id} className="vg-colhead" data-lit={lit?.count === c.id || undefined}>
              <b>{c.ru}</b>
            </span>
          ))}
        </div>
      )}
      {rows.map((r) => (
        <div key={r.id} className="vg-nf-group">
          {labels && (
            <span className="vg-nf-cap" data-lit={lit?.near === r.id || undefined}>
              {r.ru}
            </span>
          )}
          <div className="vg-nf-row">
            {CELLS.filter((c) => c.near === r.id).map((c) => {
              const on = lit?.id === c.id
              const hide = quiz && (on || !hasFocus)
              return (
                <div key={c.id} className="vg-nf-cell" data-on={on || undefined} data-exact={on || undefined} data-dim={(hasFocus && !on) || undefined}>
                  <span className="vg-nf-word">
                    <Glyph pos="det" size={14} />
                    <b>{hide ? '?' : c.id}</b>
                    {!hide && <small>{c.ru}</small>}
                  </span>
                  <Scene near={c.near} count={c.count} />
                  <span className="vg-nf-ex">
                    <Sentence source={hide ? `[${c.ex.split(' ')[0]}] ${c.ex.split(' ')[1]}` : c.ex} gap="?" paint={on || !hasFocus ? 'all' : 'none'} />
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
