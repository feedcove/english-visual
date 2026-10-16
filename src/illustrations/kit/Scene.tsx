import type { ReactNode } from 'react'
import type { Pos } from '../../content/types'

// Основа сцен: холст 320 × 200, пол на y = GROUND. Все координаты — в единицах viewBox.
// Цвет — только токены кита: нейтральные --n*/--c*, выделение — цвет части речи через data-pos (--pc, --pt).

export const W = 320
export const H = 200
export const GROUND = 168

export function Scene({ children, label, ground = true, pos }: { children: ReactNode; label: string; ground?: boolean; pos?: Pos }) {
  return (
    <svg className="st" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} data-pos={pos}>
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx="18" className="st-bg" />
      {ground && <line x1="16" x2={W - 16} y1={GROUND} y2={GROUND} className="st-ground" />}
      {children}
    </svg>
  )
}

/** Сдвиг и масштаб: всё внутри рисуется от точки (0, 0). flip — отразить по горизонтали (смотреть влево). */
export function At({ x, y, s = 1, flip, children, dim, pos }: { x: number; y: number; s?: number; flip?: boolean; children: ReactNode; dim?: boolean; pos?: Pos }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} className={dim ? 'st-dim' : undefined} data-pos={pos}>
      {children}
    </g>
  )
}

/** Подпись в сцене. С pos — цветом части речи, иначе нейтральная. Коротко: 1–3 слова. */
export function Label({ x, y, children, pos, anchor = 'middle', size = 13, weight = 600, muted }: { x: number; y: number; children: ReactNode; pos?: Pos; anchor?: 'start' | 'middle' | 'end'; size?: number; weight?: number; muted?: boolean }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={pos ? 'st-label st-label-pos' : muted ? 'st-label st-muted' : 'st-label'} data-pos={pos} fontSize={size} fontWeight={weight}>
      {children}
    </text>
  )
}

/** Единственное выделение кадра: кольцо цветом части речи вокруг того, о чём правило. */
export function Spot({ x, y, r = 30, pos }: { x: number; y: number; r?: number; pos?: Pos }) {
  return <circle cx={x} cy={y} r={r} className="st-spot" data-pos={pos} />
}

/** Крест «так нельзя» (ошибка, ловушка русского). */
export function Cross({ x, y, size = 18 }: { x: number; y: number; size?: number }) {
  const d = size / 2
  return <path d={`M${x - d} ${y - d}L${x + d} ${y + d}M${x + d} ${y - d}L${x - d} ${y + d}`} className="st-cross" />
}

/** Галочка «так правильно». */
export function Check({ x, y, size = 18 }: { x: number; y: number; size?: number }) {
  const d = size / 2
  return <path d={`M${x - d} ${y}L${x - d / 3} ${y + d * 0.7}L${x + d} ${y - d * 0.7}`} className="st-check" />
}

/**
 * Стрелка. tone: action — глагол (цвет verb): действие от того, кто делает, к тому, на что направлено;
 * ink — нейтральная связь; dim — фон; motion — траектория движения. bend — изгиб дугой (± пиксели).
 */
export function Arrow({ from, to, bend = 0, tone = 'ink', dashed, label, labelPos }: { from: [number, number]; to: [number, number]; bend?: number; tone?: 'action' | 'ink' | 'dim' | 'motion'; dashed?: boolean; label?: string; labelPos?: Pos }) {
  const [x1, y1] = from
  const [x2, y2] = to
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  const len = Math.hypot(x2 - x1, y2 - y1) || 1
  const nx = -(y2 - y1) / len
  const ny = (x2 - x1) / len
  const cx = mx + nx * bend
  const cy = my + ny * bend
  // Наконечник по касательной в конце.
  const tx = x2 - cx
  const ty = y2 - cy
  const tl = Math.hypot(tx, ty) || 1
  const ux = tx / tl
  const uy = ty / tl
  const hx1 = x2 - ux * 9 - uy * 5
  const hy1 = y2 - uy * 9 + ux * 5
  const hx2 = x2 - ux * 9 + uy * 5
  const hy2 = y2 - uy * 9 - ux * 5
  const lx = mx + nx * (bend / 2) + nx * 12
  const ly = my + ny * (bend / 2) + ny * 12
  return (
    <g className={`st-arrow st-arrow-${tone}`} data-pos={tone === 'action' ? 'verb' : undefined}>
      <path d={`M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`} fill="none" strokeDasharray={dashed ? '5 5' : undefined} />
      <path d={`M${hx1} ${hy1}L${x2} ${y2}L${hx2} ${hy2}`} fill="none" />
      {label && (
        <Label x={lx} y={ly} pos={labelPos ?? (tone === 'action' ? 'verb' : undefined)} size={12}>
          {label}
        </Label>
      )}
    </g>
  )
}

/** Пузырь речи или мысли; содержимое — внутри (текст через Label или предметы). Точка (x, y) — центр пузыря. */
export function Bubble({ x, y, w = 96, h = 44, kind = 'speech', tail = 'left', children }: { x: number; y: number; w?: number; h?: number; kind?: 'speech' | 'thought'; tail?: 'left' | 'right' | 'none'; children?: ReactNode }) {
  const left = x - w / 2
  const top = y - h / 2
  const tx = tail === 'left' ? left + w * 0.25 : left + w * 0.75
  return (
    <g className="st-bubble">
      <rect x={left} y={top} width={w} height={h} rx={kind === 'thought' ? h / 2 : 12} />
      {tail !== 'none' &&
        (kind === 'speech' ? (
          <path d={`M${tx - 6} ${top + h - 1}L${tx + (tail === 'left' ? -10 : 10)} ${top + h + 12}L${tx + 8} ${top + h - 1}`} />
        ) : (
          <>
            <circle cx={tx} cy={top + h + 8} r="4" />
            <circle cx={tx + (tail === 'left' ? -7 : 7)} cy={top + h + 16} r="2.5" />
          </>
        ))}
      {children}
    </g>
  )
}

/** Рамка-группа: то, что относится вместе (группа слов, «этот самый», область времени). */
export function Frame({ x, y, w, h, pos, dashed, label }: { x: number; y: number; w: number; h: number; pos?: Pos; dashed?: boolean; label?: string }) {
  return (
    <g className="st-frame" data-pos={pos}>
      <rect x={x} y={y} width={w} height={h} rx="10" strokeDasharray={dashed ? '6 5' : undefined} />
      {label && (
        <Label x={x + 8} y={y - 6} anchor="start" size={11} pos={pos} muted={!pos}>
          {label}
        </Label>
      )}
    </g>
  )
}
