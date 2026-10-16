import { Label } from './Scene'

// Время в сценах: ось с NOW (та же символика, что у схемы timeline), часы и листок календаря.
// Simple — точка (или ряд точек — привычка), Continuous — волна, Perfect — точка до момента и дуга-стрелка к нему,
// Perfect Continuous — отрезок до момента. Выделение (hl) — цветом глагола.

export interface TimeMark {
  /** Где на оси: доля 0..1 от левого края. */
  at: number
  kind: 'dot' | 'dots' | 'wave' | 'arrow' | 'span'
  hl?: boolean
  /** Подпись над символом, 1–2 слова. */
  label?: string
}

export interface TimeZone {
  /** Закрытый период в прошлом (yesterday, last week): от и до, доли 0..1. */
  from: number
  to: number
  label?: string
  hl?: boolean
}

const f = (n: number) => Math.round(n * 100) / 100

function wave(x0: number, x1: number, y: number, amp = 4.5, half = 8) {
  const n = Math.max(2, Math.round((x1 - x0) / half))
  const h = (x1 - x0) / n
  let d = `M${f(x0)} ${y}q${f(h / 2)} ${-2 * amp} ${f(h)} 0`
  for (let i = 1; i < n; i++) d += `t${f(h)} 0`
  return d
}

/**
 * Ось времени: прошлое слева, будущее справа, NOW — вертикальная черта (now, доля 0..1; по умолчанию 0.72).
 * marks — символы аспекта, zones — закрытые периоды. (x, y) — левый конец оси, w — длина.
 */
export function TimeAxis({ x, y, w, now = 0.72, marks = [], zones = [], nowLabel = 'NOW' }: { x: number; y: number; w: number; now?: number; marks?: TimeMark[]; zones?: TimeZone[]; nowLabel?: string }) {
  const at = (p: number) => x + p * w
  const nx = at(now)
  return (
    <g className="st-time">
      {zones.map((z, i) => (
        <g key={`z${i}`} className={z.hl ? 'st-zone st-zone-hl' : 'st-zone'} data-pos={z.hl ? 'adv' : undefined}>
          <rect x={at(z.from)} y={y - 13} width={at(z.to) - at(z.from)} height={26} rx={8} />
          {z.label && (
            <Label x={(at(z.from) + at(z.to)) / 2} y={y + 30} size={12} pos={z.hl ? 'adv' : undefined} muted={!z.hl}>
              {z.label}
            </Label>
          )}
        </g>
      ))}
      <path d={`M${x} ${y}H${x + w}`} className="st-axis" />
      <path d={`M${x + w - 8} ${y - 5}L${x + w} ${y}L${x + w - 8} ${y + 5}`} className="st-axis" />
      <path d={`M${nx} ${y - 14}V${y + 14}`} className="st-now" />
      <Label x={nx} y={y + 30} size={12} weight={700}>
        {nowLabel}
      </Label>
      {marks.map((m, i) => (
        <Mark key={i} m={m} x={at(m.at)} nx={nx} y={y} />
      ))}
    </g>
  )
}

function Mark({ m, x, nx, y }: { m: TimeMark; x: number; nx: number; y: number }) {
  let sym
  let cx = x
  switch (m.kind) {
    case 'dot':
      sym = <circle cx={x} cy={y} r={6} className="st-sym-fill" />
      break
    case 'dots':
      sym = (
        <>
          {[-2, -1, 0, 1, 2].map((k) => (
            <circle key={k} cx={x + k * 15} cy={y} r={4.2} className="st-sym-fill" />
          ))}
        </>
      )
      break
    case 'wave':
      sym = <path d={wave(x - 30, x + 30, y)} className="st-sym-line" />
      break
    case 'arrow': {
      // Точка в прошлом и дуга к NOW: результат «дотянулся» до сейчас.
      const top = y - 34
      const ex = nx - 2
      const ey = y - 8
      const c = (x + ex) / 2
      const a = Math.atan2(ey - top, ex - c)
      const ux = Math.cos(a)
      const uy = Math.sin(a)
      const bx = ex - ux * 9
      const by = ey - uy * 9
      sym = (
        <>
          <circle cx={x} cy={y} r={6} className="st-sym-fill" />
          <path d={`M${x} ${y - 8}Q${f(c)} ${top} ${f(bx)} ${f(by)}`} className="st-sym-line" />
          <path d={`M${ex} ${ey}L${f(bx - uy * 5)} ${f(by + ux * 5)}L${f(bx + uy * 5)} ${f(by - ux * 5)}Z`} className="st-sym-fill" />
        </>
      )
      cx = (x + nx) / 2
      break
    }
    case 'span':
      sym = <path d={`M${x} ${y}H${nx}`} className="st-sym-span" />
      cx = (x + nx) / 2
      break
  }
  const ly = m.kind === 'arrow' ? y - 30 : y - 16
  return (
    <g className={m.hl ? 'st-sym st-hl' : 'st-sym'} data-pos={m.hl ? 'verb' : undefined}>
      {sym}
      {m.label && (
        <Label x={cx} y={ly} size={12} pos={m.hl ? 'verb' : undefined} muted={!m.hl}>
          {m.label}
        </Label>
      )}
    </g>
  )
}

/** Часы со стрелками: (x, y) — центр, r — радиус, h:m — время. */
export function Clock({ x, y, r = 22, h, m }: { x: number; y: number; r?: number; h: number; m: number }) {
  const ha = (((h % 12) + m / 60) / 12) * Math.PI * 2 - Math.PI / 2
  const ma = (m / 60) * Math.PI * 2 - Math.PI / 2
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2
    const r0 = i % 3 ? r * 0.82 : r * 0.7
    return `M${f(x + Math.cos(a) * r0)} ${f(y + Math.sin(a) * r0)}L${f(x + Math.cos(a) * r * 0.9)} ${f(y + Math.sin(a) * r * 0.9)}`
  }).join('')
  return (
    <g className="st-clock">
      <circle cx={x} cy={y} r={r} className="st-thing" />
      <path d={ticks} className="st-line" />
      <path d={`M${x} ${y}L${f(x + Math.cos(ha) * r * 0.5)} ${f(y + Math.sin(ha) * r * 0.5)}`} className="st-line st-hand-h" />
      <path d={`M${x} ${y}L${f(x + Math.cos(ma) * r * 0.75)} ${f(y + Math.sin(ma) * r * 0.75)}`} className="st-line st-hand-m" />
      <circle cx={x} cy={y} r={2} className="st-solid" />
    </g>
  )
}

/** Листок календаря: (x, y) — низ по центру. day — крупно («Mon», «5»), label — в шапке («yesterday», «May»). */
export function CalendarPage({ x, y, day, label, s = 1, hl, dim }: { x: number; y: number; day: string; label?: string; s?: number; hl?: boolean; dim?: boolean }) {
  const w = 56
  const h = 58
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className={`st-cal${hl ? ' st-hl' : ''}${dim ? ' st-dim' : ''}`} data-pos={hl ? 'adv' : undefined}>
      <rect x={-w / 2} y={-h} width={w} height={h} rx={6} className="st-thing" />
      <path d={`M${-w / 2} ${-h + 17}V${-h + 6}Q${-w / 2} ${-h} ${-w / 2 + 6} ${-h}H${w / 2 - 6}Q${w / 2} ${-h} ${w / 2} ${-h + 6}V${-h + 17}Z`} className="st-thing2" />
      <path d={`M-12 ${-h - 5}V${-h + 6}M12 ${-h - 5}V${-h + 6}`} className="st-line" strokeWidth={2.5} />
      {label && (
        <text x={0} y={-h + 13} textAnchor="middle" className="st-cal-head" fontSize={10} fontWeight={600}>
          {label}
        </text>
      )}
      <text x={0} y={-11} textAnchor="middle" className="st-cal-day" fontSize={day.length > 2 ? 17 : 24} fontWeight={700}>
        {day}
      </text>
    </g>
  )
}
