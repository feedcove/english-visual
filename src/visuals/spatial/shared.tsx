import type { ReactNode } from 'react'
import { Glyph } from '../../ui/Glyph'

// Общие части семьи spatial: шар-траектор, SVG-рамка сцены и ячейка «сцена + подпись».
// Сцены рисуются в системе координат 120 × 84; текста внутри SVG нет — подписи в HTML (≥ 12 px).

export const VB_W = 120
export const VB_H = 84
export const BALL_R = 9

/** Траектор — цветной шар. Цвет — от data-pos="prep" контейнера. */
export function Ball({ x, y, className }: { x: number; y: number; className?: string }) {
  return <circle className={className ? `vsp-ball ${className}` : 'vsp-ball'} cx={x} cy={y} r={BALL_R} />
}

interface SvgProps {
  label: string
  dim?: boolean
  decor?: boolean
  children: ReactNode
}

export function SceneSvg({ label, dim, decor, children }: SvgProps) {
  return (
    <svg
      className="vsp-svg"
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      role={decor ? undefined : 'img'}
      aria-label={decor ? undefined : label}
      aria-hidden={decor || undefined}
      data-dim={dim || undefined}
    >
      {children}
    </svg>
  )
}

/** Вместо спрятанного предлога в примерах квиза: «___». */
export const BLANK = <span className="vsp-blank">___</span>

/** Разметка примера с первым предлогом в виде пропуска: in_I the_D box_N → [in_I] the_D box_N. */
export function withGap(source: string): string {
  return source.replace(/^(\S+_I)/, '[$1]')
}

interface CellProps {
  name: string
  ru: string
  lit: boolean
  dim: boolean
  /** Название сцены спрятано (режим quiz). */
  hidden: boolean
  /** Крупная сцена слева, подписи справа (мини-версия). */
  compact?: boolean
  /** Ряд узких сцен в мини-версии: без русской подсказки. */
  slim?: boolean
  /** Кнопка рядом с названием. */
  action?: ReactNode
  /** Пример, показывается только в мини-версии. */
  extra?: ReactNode
  children: ReactNode
}

export function SceneCell({ name, ru, lit, dim, hidden, compact, slim, action, extra, children }: CellProps) {
  return (
    <div className="vsp-cell" data-lit={lit || undefined} data-dim={dim || undefined} data-compact={compact || undefined} data-slim={slim || undefined}>
      {children}
      <div className="vsp-side">
        <div className="vsp-cap">
          <div className="vsp-captext">
            <span className="vsp-name">
              <Glyph pos="prep" size={compact ? 18 : 14} tone={dim ? 'current' : 'pos'} />
              {hidden ? '?' : name}
            </span>
            {!hidden && !slim && <span className="vsp-ru">{ru}</span>}
          </div>
          {action}
        </div>
        {extra}
      </div>
    </div>
  )
}
