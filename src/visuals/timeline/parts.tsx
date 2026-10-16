import { Fragment } from 'react'
import type { ReactNode } from 'react'
import { POS } from '../../content/pos'
import type { Pos } from '../../content/types'
import { Glyph } from '../../ui/Glyph'
import { Sentence } from '../../ui/Sentence'
import { ASPECT_NAME, FORMULA, TIME_NAME, tenseName } from './model'
import type { Aspect, Time, Tok } from './model'

// Общие детали семьи timeline: единая ось, символы аспектов, формулы-чипы.
// Символы аспектов (одинаковы во всех четырёх схемах):
//   simple   — точка на моменте; в настоящем — ряд точек (привычка, а не «прямо сейчас»)
//   cont     — волна вокруг момента
//   perf     — точка до момента + стрелка к нему
//   perfcont — волна, доходящая до момента

export type Size = 'lg' | 'md' | 'sm'

export interface Geo {
  k: number
  W: number
  H: number
  y: number
  tick: number
  r: number
  sw: number
  amp: number
  half: number
  rise: number
  head: number
  left: number
  right: number
}

/** Геометрия оси. Все смещения заданы для ширины 340 и умножаются на k, поэтому шаблон один и тот же в любом размере. */
export function geo(size: Size, over: Partial<Geo> = {}): Geo {
  const base =
    size === 'sm'
      ? { k: 100 / 340, W: 100, H: 40, y: 24, tick: 9, r: 3.6, sw: 1.8, amp: 3, half: 4.4, rise: 11, head: 4.5, left: 3, right: 97 }
      : { k: 1, W: 340, H: size === 'lg' ? 114 : 74, y: size === 'lg' ? 74 : 34, tick: 16, r: 6, sw: 2.5, amp: 5, half: 9, rise: size === 'lg' ? 24 : 22, head: 7, left: 12, right: 328 }
  return { ...base, ...over }
}

export const nowX = (g: Geo) => 170 * g.k
export const momentX = (g: Geo, t: Time) => (t === 'past' ? 88 : t === 'present' ? 170 : 252) * g.k

const f = (n: number) => Math.round(n * 100) / 100

function wavePath(g: Geo, x0: number, x1: number) {
  const len = x1 - x0
  const n = Math.max(2, Math.round(len / g.half))
  const h = len / n
  let d = `M${f(x0)} ${g.y}q${f(h / 2)} ${f(-2 * g.amp)} ${f(h)} 0`
  for (let i = 1; i < n; i++) d += `t${f(h)} 0`
  return d
}

function Arrow({ g, x1, x2 }: { g: Geo; x1: number; x2: number }) {
  const sy = g.y - g.r - 1.5
  const ey = g.y - 2
  const cx = (x1 + x2) / 2
  const cy = (sy + ey) / 2 - 2 * g.rise
  const a = Math.atan2(ey - cy, x2 - cx)
  const ux = Math.cos(a)
  const uy = Math.sin(a)
  const bx = x2 - ux * g.head
  const by = ey - uy * g.head
  const px = -uy * g.head * 0.55
  const py = ux * g.head * 0.55
  return (
    <>
      <path d={`M${f(x1)} ${f(sy)}Q${f(cx)} ${f(cy)} ${f(bx)} ${f(by)}`} fill="none" stroke="currentColor" strokeWidth={g.sw} strokeLinecap="round" />
      <path d={`M${f(x2)} ${f(ey)}L${f(bx + px)} ${f(by + py)}L${f(bx - px)} ${f(by - py)}z`} fill="currentColor" />
    </>
  )
}

/** Символ аспекта относительно момента m. `habit` — Present Simple: ряд точек вокруг NOW. `reach` — своя длина волны для perfcont. */
export function AspectSymbol({ g, aspect, m, reach, habit }: { g: Geo; aspect: Aspect; m: number; reach?: number; habit?: boolean }) {
  const k = g.k
  switch (aspect) {
    case 'simple':
      return habit ? (
        <g className="vt-sym">
          {[-2, -1, 1, 2].map((i) => (
            <circle key={i} cx={f(m + i * 26 * k)} cy={g.y} r={g.r * 0.8} fill="currentColor" />
          ))}
        </g>
      ) : (
        <circle className="vt-sym" cx={f(m)} cy={g.y} r={g.r} fill="currentColor" />
      )
    case 'cont':
      return <path className="vt-sym" d={wavePath(g, m - 36 * k, m + 36 * k)} fill="none" stroke="currentColor" strokeWidth={g.sw} strokeLinecap="round" />
    case 'perf':
      return (
        <g className="vt-sym">
          <circle cx={f(m - 48 * k)} cy={g.y} r={g.r} fill="currentColor" />
          <Arrow g={g} x1={m - 48 * k} x2={m} />
        </g>
      )
    case 'perfcont':
      return <path className="vt-sym" d={wavePath(g, m - (reach ?? 64 * k), m)} fill="none" stroke="currentColor" strokeWidth={g.sw} strokeLinecap="round" />
  }
}

/** Где подписать символ (центр по x) — подпись стоит прямо над ним. */
export function symbolCenter(g: Geo, aspect: Aspect, m: number) {
  const k = g.k
  return aspect === 'perf' ? m - 24 * k : aspect === 'perfcont' ? m - 32 * k : m
}

interface BaseProps {
  g: Geo
  /** lg: зоны сверху, NOW и момент снизу; under: зоны и NOW снизу; now: только NOW и момент. */
  mode: 'lg' | 'under' | 'now'
  /** Какой момент рисовать маркером: past/future — свой штрих; both — оба (пустой шаблон). */
  moment?: Time | 'both'
  label: string
  dim?: boolean
  children?: ReactNode
}

/** Единая ось: прошлое — NOW — будущее. Меняется только содержимое (children). */
export function AxisBase({ g, mode, moment, label, dim, children }: BaseProps) {
  const { W, H, y, tick, left, right, head } = g
  const now = nowX(g)
  const small = g.k < 1
  const marks: Time[] = moment === 'both' ? ['past', 'future'] : moment && moment !== 'present' ? [moment] : []
  const under = y + tick + 18
  return (
    <svg className="vt-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} data-pos="verb" data-dim={dim || undefined}>
      <path className="vt-axis" d={`M${left} ${y}H${f(right - head)}`} strokeWidth={small ? 1.2 : 2} />
      <path className="vt-axis-head" d={`M${right} ${y}L${f(right - head * 1.3)} ${f(y - head * 0.6)}L${f(right - head * 1.3)} ${f(y + head * 0.6)}z`} />
      {marks.map((t) => (
        <line key={t} className="vt-moment" x1={f(momentX(g, t))} x2={f(momentX(g, t))} y1={y - tick} y2={y + tick} strokeWidth={small ? 1.2 : 2} strokeDasharray={small ? '2 2' : '3 3'} />
      ))}
      <line className="vt-nowline" x1={f(now)} x2={f(now)} y1={y - tick} y2={y + tick} strokeWidth={small ? 1.5 : 2.5} />
      {!small && (
        <>
          {mode === 'lg' && (
            <>
              <text className="vt-zone" x={left} y={14}>
                прошлое
              </text>
              <text className="vt-zone" x={right} y={14} textAnchor="end">
                будущее
              </text>
            </>
          )}
          {mode === 'under' && (
            <>
              <text className="vt-zone" x={left} y={under}>
                прошлое
              </text>
              <text className="vt-zone" x={right} y={under} textAnchor="end">
                будущее
              </text>
            </>
          )}
          <text className="vt-now" x={f(now)} y={under} textAnchor="middle">
            NOW
          </text>
          {(mode === 'lg' || mode === 'now') &&
            marks.map((t) => (
              <text key={t} className="vt-zone" x={f(momentX(g, t))} y={under} textAnchor="middle">
                момент
              </text>
            ))}
        </>
      )}
      {children}
    </svg>
  )
}

interface AxisProps {
  time?: Time
  aspect?: Aspect
  size: Size
  dim?: boolean
  /** Скрыть подписи символа (quiz). */
  quiet?: boolean
}

/** Ось одного времени: момент + символ аспекта. Без time — пустой шаблон с обоими маркерами. */
export function AxisSvg({ time, aspect, size, dim, quiet }: AxisProps) {
  // Без подписи символа верхняя полоса не нужна — ось поднимается.
  const g = size === 'lg' && (quiet || !aspect) ? geo('lg', { y: 56, H: 96 }) : geo(size)
  const m = time ? momentX(g, time) : nowX(g)
  const name = time && aspect && !quiet ? tenseName(time, aspect) : 'ось времени'
  return (
    <AxisBase g={g} mode={size === 'lg' ? 'lg' : 'now'} moment={time ?? 'both'} label={`Ось времени: ${name}`} dim={dim}>
      {time && aspect && <AspectSymbol g={g} aspect={aspect} m={m} habit={time === 'present'} />}
      {time && aspect && size === 'lg' && !quiet && (
        <text className="vt-sym vt-symlbl" x={f(symbolCenter(g, aspect, m))} y={36} textAnchor="middle">
          {time === 'present' && aspect === 'simple' ? `${ASPECT_NAME.simple.sym}, привычка` : ASPECT_NAME[aspect].sym}
        </text>
      )}
    </AxisBase>
  )
}

/** Слово-токен: глиф части речи + слово из Sentence (цвет совпадает с остальным приложением). */
export function Token({ pos, t, mini, hot }: { pos: Pos; t: string; mini?: boolean; hot?: boolean }) {
  return (
    <span className="vt-tok" data-pos={pos} data-mini={mini || undefined} data-hot={hot || undefined}>
      <Glyph pos={pos} size={12} />
      <Sentence source={`${t}_${POS[pos].code}`} paint="all" />
    </span>
  )
}

export function QTok({ mini }: { mini?: boolean }) {
  return (
    <span className="vt-tok vt-q" data-mini={mini || undefined}>
      ?
    </span>
  )
}

export function Formula({ toks, plus, mini, hidden }: { toks: Tok[]; plus?: boolean; mini?: boolean; hidden?: boolean }) {
  return (
    <span className="vt-formula">
      {hidden ? (
        <QTok mini={mini} />
      ) : (
        toks.map((tk, i) => (
          <Fragment key={i}>
            {plus && i > 0 && <span className="vt-plus">+</span>}
            <Token pos={tk.pos} t={tk.t} mini={mini} />
          </Fragment>
        ))
      )}
    </span>
  )
}

export type State = 'on' | 'dim' | undefined

interface CellProps {
  time: Time
  aspect: Aspect
  /** Подпись сверху (например «прошлое»); '?' в quiz. */
  title?: string
  name?: string
  state?: State
  exact?: boolean
  chips?: boolean
  hideFormula?: boolean
}

/** Ячейка: мини-ось + формула чипами. Используется в tense-map и в мини-версиях timeline. */
export function MiniCell({ time, aspect, title, name, state, exact, chips = true, hideFormula }: CellProps) {
  return (
    <div className="vt-cell" data-on={state === 'on' || undefined} data-dim={state === 'dim' || undefined} data-exact={exact || undefined}>
      {title !== undefined && <span className="vt-celltitle">{title}</span>}
      <AxisSvg time={time} aspect={aspect} size="sm" />
      {name !== undefined && <span className="vt-cellname">{name}</span>}
      {chips && <Formula toks={FORMULA[time][aspect]} mini hidden={hideFormula} />}
    </div>
  )
}

export { ASPECT_NAME, TIME_NAME }
