import type { ReactElement } from 'react'
import { POS } from '../content/pos'
import type { Glyph as GlyphName } from '../content/pos'
import type { Pos } from '../content/types'

const SHAPES: Record<GlyphName, ReactElement> = {
  square: <rect x="3" y="3" width="10" height="10" rx="1.5" fill="currentColor" />,
  'square-o': <rect x="3.75" y="3.75" width="8.5" height="8.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.5" />,
  triangle: <path d="M3 4.5h10L8 12.5z" fill="currentColor" strokeLinejoin="round" />,
  'triangle-o': <path d="M3.6 4.8h8.8L8 11.8z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  diamond: <path d="M8 2.5 13.5 8 8 13.5 2.5 8z" fill="currentColor" />,
  circle: <circle cx="8" cy="8" r="5.5" fill="currentColor" />,
  ring: <circle cx="8" cy="8" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />,
  dot: <circle cx="8" cy="8" r="3.25" fill="currentColor" />,
  arch: <path d="M3 12.5V9a5 5 0 0 1 10 0v3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />,
  bars: <path d="M3 6h10M3 10h10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />,
  tick: <path d="M9.5 3.5 7 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
}

interface Props {
  pos: Pos
  size?: number
  /** Цвет глифа: заливка части речи (по умолчанию) или текущий цвет текста. */
  tone?: 'pos' | 'current'
}

/** Форма части речи. Дублирует цвет, чтобы смысл не держался на одном цвете. */
export function Glyph({ pos, size = 16, tone = 'pos' }: Props) {
  return (
    <svg
      className="glyph"
      data-pos={pos}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={tone === 'pos' ? { color: 'var(--pc)' } : undefined}
    >
      {SHAPES[POS[pos].glyph]}
    </svg>
  )
}
