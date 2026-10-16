import type { ReactNode } from 'react'

// Сцены предлогов движения: ориентир, траектория шара и пара «старт — финиш».
// Система координат 120 × 84, радиус шара 9. Путь задаётся командами M/L/Q, внутри считается по точкам.

export type MotionId = 'to' | 'from' | 'into' | 'out-of' | 'onto' | 'off' | 'up' | 'down' | 'through' | 'across' | 'along' | 'past' | 'towards'

export type Pt = readonly [number, number]
export type Cmd = readonly ['M' | 'L', number, number] | readonly ['Q', number, number, number, number]

export interface Sampled {
  pts: Pt[]
  /** Накопленная длина до каждой точки. */
  dist: number[]
  total: number
}

const ORIGIN: Pt = [0, 0]
const pt = (pts: Pt[], i: number): Pt => pts[i] ?? ORIGIN

export function sample(path: readonly Cmd[]): Sampled {
  const pts: Pt[] = []
  let cur: Pt = ORIGIN
  for (const c of path) {
    if (c[0] === 'Q') {
      const [, cx, cy, x, y] = c
      const [x0, y0] = cur
      for (let i = 1; i <= 24; i++) {
        const t = i / 24
        const u = 1 - t
        pts.push([u * u * x0 + 2 * u * t * cx + t * t * x, u * u * y0 + 2 * u * t * cy + t * t * y])
      }
      cur = [x, y]
    } else {
      cur = [c[1], c[2]]
      pts.push(cur)
    }
  }
  const dist = [0]
  for (let i = 1; i < pts.length; i++) {
    const [ax, ay] = pt(pts, i - 1)
    const [bx, by] = pt(pts, i)
    dist.push((dist[i - 1] ?? 0) + Math.hypot(bx - ax, by - ay))
  }
  return { pts, dist, total: dist[dist.length - 1] ?? 0 }
}

export const startOf = (s: Sampled): Pt => pt(s.pts, 0)
export const endOf = (s: Sampled): Pt => pt(s.pts, s.pts.length - 1)

export function pointAt(s: Sampled, d: number): Pt {
  const t = Math.min(Math.max(d, 0), s.total)
  for (let i = 1; i < s.pts.length; i++) {
    const di = s.dist[i] ?? 0
    if (t <= di) {
      const d0 = s.dist[i - 1] ?? 0
      const k = (t - d0) / (di - d0 || 1)
      const [ax, ay] = pt(s.pts, i - 1)
      const [bx, by] = pt(s.pts, i)
      return [ax + (bx - ax) * k, ay + (by - ay) * k]
    }
  }
  return endOf(s)
}

/** Путь между двумя расстояниями вдоль траектории в виде атрибута d. */
export function arrowD(s: Sampled, from: number, to: number): string {
  const inner = s.pts.filter((_, i) => (s.dist[i] ?? 0) > from && (s.dist[i] ?? 0) < to)
  const all = [pointAt(s, from), ...inner, pointAt(s, to)]
  return all.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join('')
}

interface Motion {
  id: MotionId
  name: string
  ru: string
  ex: string
  lm: ReactNode
  path: readonly Cmd[]
  /** Дополнительная линия смысла (например, «дошёл бы до ориентира»). */
  note?: ReactNode
}

// Общий ориентир-справа для to / towards / from
const HOUSE = <rect className="vsp-lm" x={84} y={26} width={26} height={40} rx={6} />
// Комната с дверным проёмом слева для into / out of
const ROOM = <path className="vsp-wall" d="M60 36V14H104V72H60V56" />
// Холм для up / down
const HILL = <path className="vsp-lm" d="M8 72 112 72 112 28Z" strokeLinejoin="round" />

export const MOTIONS: Motion[] = [
  { id: 'to', name: 'to', ru: 'к, до (дошёл)', ex: 'to_I the_D station_N', lm: HOUSE, path: [['M', 16, 46], ['L', 75, 46]] },
  { id: 'from', name: 'from', ru: 'от, из (начало)', ex: 'from_I the_D station_N', lm: HOUSE, path: [['M', 75, 46], ['L', 16, 46]] },
  { id: 'into', name: 'into', ru: 'внутрь, в', ex: 'into_I the_D room_N', lm: ROOM, path: [['M', 14, 46], ['L', 82, 46]] },
  { id: 'out-of', name: 'out of', ru: 'из, наружу', ex: 'out~of_I the_D room_N', lm: ROOM, path: [['M', 82, 46], ['L', 14, 46]] },
  {
    id: 'onto',
    name: 'onto',
    ru: 'на (поверх)',
    ex: 'onto_I the_D table_N',
    lm: (
      <>
        <rect className="vsp-slab" x={6} y={68} width={50} height={7} rx={3} />
        <rect className="vsp-lm" x={56} y={44} width={58} height={31} rx={5} />
      </>
    ),
    path: [['M', 20, 59], ['Q', 40, 14, 86, 35]],
  },
  {
    id: 'off',
    name: 'off',
    ru: 'с поверхности',
    ex: 'off_I the_D table_N',
    lm: (
      <>
        <rect className="vsp-slab" x={6} y={68} width={50} height={7} rx={3} />
        <rect className="vsp-lm" x={56} y={44} width={58} height={31} rx={5} />
      </>
    ),
    path: [['M', 86, 35], ['Q', 56, 14, 20, 59]],
  },
  { id: 'up', name: 'up', ru: 'вверх по', ex: 'up_I the_D hill_N', lm: HILL, path: [['M', 20, 55], ['L', 93, 24]] },
  { id: 'down', name: 'down', ru: 'вниз по', ex: 'down_I the_D hill_N', lm: HILL, path: [['M', 93, 24], ['L', 20, 55]] },
  {
    id: 'through',
    name: 'through',
    ru: 'сквозь, через',
    ex: 'through_I the_D tunnel_N',
    lm: (
      <>
        <rect className="vsp-lm" x={42} y={12} width={44} height={24} rx={4} />
        <rect className="vsp-lm" x={42} y={56} width={44} height={24} rx={4} />
      </>
    ),
    path: [['M', 12, 46], ['L', 108, 46]],
  },
  {
    id: 'across',
    name: 'across',
    ru: 'поперёк, через',
    ex: 'across_I the_D river_N',
    lm: <rect className="vsp-slab" x={46} y={6} width={28} height={72} rx={3} />,
    path: [['M', 14, 46], ['L', 106, 46]],
  },
  {
    id: 'along',
    name: 'along',
    ru: 'вдоль',
    ex: 'along_I the_D road_N',
    lm: <rect className="vsp-slab" x={6} y={32} width={108} height={28} rx={3} />,
    path: [['M', 22, 46], ['L', 98, 46]],
  },
  {
    id: 'past',
    name: 'past',
    ru: 'мимо',
    ex: 'past_I the_D bank_N',
    lm: <rect className="vsp-lm" x={40} y={12} width={40} height={32} rx={6} />,
    path: [['M', 14, 62], ['L', 106, 62]],
  },
  {
    id: 'towards',
    name: 'towards',
    ru: 'в сторону',
    ex: 'towards_I the_D station_N',
    lm: HOUSE,
    path: [['M', 16, 46], ['L', 52, 46]],
    note: <path className="vsp-guide" d="M63 46H80" />,
  },
]
