import type { Pos } from '../../../content/types'
import { Label } from '../Scene'
import type { PropDef } from '../props'

// Раздел «количества и строй предложения»: вагончики-слова (порядок слов, вопрос, отрицание) и знак «минус» отрицания.
// Новый предмет: water-low — стакан с остатком воды на дне (little water).

export const EXTRA: Record<string, PropDef> = {
  'water-low': {
    ru: 'стакан с остатком воды',
    w: 22,
    h: 32,
    draw: () => (
      <>
        <path d="M-11 -32 L-8.5 -2 Q-8.3 0 -6.3 0 H6.3 Q8.3 0 8.5 -2 L11 -32 Z" className="st-void" />
        <path d="M-8.4 -7 L-8 -2.6 Q-7.8 -1 -6.2 -1 H6.2 Q7.8 -1 8 -2.6 L8.4 -7 Z" className="st-liquid" />
        <path d="M-8.4 -7 H8.4" className="st-line" />
      </>
    ),
  },
}

/** Вагончик-слово: текст в рамке. pos — выделение цветом части речи; ghost — пунктирное пустое место. */
export interface Car {
  text: string
  pos?: Pos
  /** Пунктирная рамка: слово, которого ещё нет или которое ушло. */
  ghost?: boolean
  /** Приглушить. */
  dim?: boolean
  /** Подпись-роль над вагончиком (S, V, O…). */
  tag?: string
  /** Ширина вручную. */
  w?: number
}

const SIZE = 14
export const CAR_H = 30

/** Ширина вагончика: по тексту; у мелкого шрифта (size < 14) поля уже, чтобы длинное предложение влезло в ряд. */
const carWidth = (c: Car, size = SIZE) => c.w ?? Math.max(size < SIZE ? 28 : 40, Math.round(c.text.length * size * 0.6) + (size < SIZE ? 12 : 20))

/** Положение вагончиков в ряду: центр ряда в cx. */
export function trainSlots(cars: Car[], cx: number, gap = 7, size = SIZE) {
  const total = cars.reduce((s, c) => s + carWidth(c, size), 0) + gap * (cars.length - 1)
  let x = cx - total / 2
  return cars.map((c) => {
    const w = carWidth(c, size)
    const slot = { x, w, mid: x + w / 2 }
    x += w + gap
    return slot
  })
}

/** Ряд вагончиков: верх рамки на y. Выделен тот, у кого есть pos. */
export function Train({ cars, y, cx = 160, gap = 7, wheels, size = SIZE }: { cars: Car[]; y: number; cx?: number; gap?: number; wheels?: boolean; size?: number }) {
  const slots = trainSlots(cars, cx, gap, size)
  return (
    <g>
      {cars.map((c, i) => {
        const s = slots[i]!
        return (
          <g key={i} data-pos={c.pos} className={c.dim ? 'st-dim' : undefined}>
            <rect
              x={s.x}
              y={y}
              width={s.w}
              height={CAR_H}
              rx="8"
              className="st-frame-car"
              style={{
                fill: c.pos ? 'color-mix(in oklab, var(--pc) 22%, var(--n0))' : 'var(--n1)',
                stroke: c.pos ? 'var(--pc)' : 'var(--c3)',
                strokeWidth: c.pos ? 2.25 : 1.75,
                strokeDasharray: c.ghost ? '5 4' : undefined,
              }}
            />
            {!c.ghost && (
              <Label x={s.mid} y={y + 20} size={size} pos={c.pos}>
                {c.text}
              </Label>
            )}
            {c.ghost && c.text && (
              <Label x={s.mid} y={y + 20} size={size} muted>
                {c.text}
              </Label>
            )}
            {c.tag && (
              <Label x={s.mid} y={y - 6} size={11} muted>
                {c.tag}
              </Label>
            )}
            {wheels && (
              <>
                <circle cx={s.x + Math.min(12, s.w / 4)} cy={y + CAR_H + 5} r="4.5" className="st-solid" />
                <circle cx={s.x + s.w - Math.min(12, s.w / 4)} cy={y + CAR_H + 5} r="4.5" className="st-solid" />
              </>
            )}
          </g>
        )
      })}
    </g>
  )
}

/** Знак отрицания над словом: кружок с минусом цветом частицы (not, no, не). */
export function Neg({ x, y, r = 9 }: { x: number; y: number; r?: number }) {
  return (
    <g data-pos="part">
      <circle cx={x} cy={y} r={r} style={{ fill: 'var(--n0)', stroke: 'var(--pc)', strokeWidth: 2.25 }} />
      <path d={`M${x - r * 0.5} ${y}H${x + r * 0.5}`} style={{ fill: 'none', stroke: 'var(--pc)', strokeWidth: 2.5, strokeLinecap: 'round' }} />
    </g>
  )
}
