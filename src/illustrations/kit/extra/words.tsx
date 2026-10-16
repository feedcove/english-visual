import type { ReactElement, ReactNode } from 'react'
import type { Pos } from '../../../content/types'
import { Frame, Label } from '../Scene'
import type { PropDef } from '../props'

// Раздел «слова»: темы про части речи и граф предложения. Предметы + «чип» — плашка со словом для сцен,
// где слово само часть картинки (признак на предмете, наречие на стрелке, узел графа).

const def = (ru: string, w: number, h: number, draw: () => ReactElement): PropDef => ({ ru, w, h, draw })

export const EXTRA: Record<string, PropDef> = {
  telescope: def('телескоп', 44, 40, () => (
    <>
      <path d="M-2 -17 L-10 0 M-2 -17 L8 0 M-2 -17 V0" className="st-line" />
      <path d="M-18 -20 L9 -35 L14 -27 L-13 -12 Z" className="st-thing" />
      <path d="M9 -35 L16 -39 L21 -31 L14 -27 Z" className="st-thing2" />
    </>
  )),
}

/** Плашка со словом. pos — цвет части речи (выделение), без pos — нейтральная. (x, y) — центр. */
export function Chip({ x, y, children, pos, size = 14 }: { x: number; y: number; children: string; pos?: Pos; size?: number }) {
  const w = Math.max(32, Math.round(children.length * size * 0.62) + 20)
  const h = size + 12
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={10} fill="var(--n0)" />
      <Frame x={x - w / 2} y={y - h / 2} w={w} h={h} pos={pos} />
      <Label x={x} y={y + size * 0.36} pos={pos} size={size} muted={!pos}>
        {children}
      </Label>
    </g>
  )
}

/** Тонкая связь «метка висит на предмете». */
export function Tie({ from, to }: { from: [number, number]; to: [number, number] }) {
  return <path d={`M${from[0]} ${from[1]}L${to[0]} ${to[1]}`} className="st-line" strokeDasharray="3 4" />
}

/** Надпись-вопрос рядом с признаком: «какой?», «как?». */
export function Ask({ x, y, children, anchor = 'middle' }: { x: number; y: number; children: ReactNode; anchor?: 'start' | 'middle' | 'end' }) {
  return (
    <Label x={x} y={y} size={12} muted anchor={anchor} weight={500}>
      {children}
    </Label>
  )
}
