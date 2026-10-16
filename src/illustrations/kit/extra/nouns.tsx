import type { ReactElement, ReactNode } from 'react'
import type { Pos } from '../../../content/types'
import type { PropDef } from '../props'

// Предметы раздела «существительные» (a / an, множественное число): то, чего нет в основном каталоге.
// Стиль тот же, что в props.tsx: заливка st-thing / st-thing2, обводка из CSS, низ по центру в (0, 0).

const T = 'st-thing'
const T2 = 'st-thing2'
const L = 'st-line'
const S = 'st-solid'

/** Часть подписи цветом части речи: «a» в «a cat». Кладётся внутрь <Label>, где остальной текст нейтральный. */
export function Part({ pos, children }: { pos: Pos; children: ReactNode }) {
  return (
    <tspan className="st-label-pos" data-pos={pos}>
      {children}
    </tspan>
  )
}

const def = (ru: string, w: number, h: number, draw: () => ReactElement): PropDef => ({ ru, w, h, draw })

export const EXTRA: Record<string, PropDef> = {
  // Здание с колоннами и фронтоном — университет (колонны отличают его от школы).
  university: def('университет', 54, 44, () => (
    <>
      <path d="M-26 -34 L0 -44 L26 -34 Z" className={T2} />
      <rect x="-26" y="-34" width="52" height="4" rx="1" className={T} />
      {[-18, -6, 6, 18].map((x) => (
        <rect key={x} x={x - 2.5} y="-30" width="5" height="25" rx="1" className={T} />
      ))}
      <rect x="-28" y="-5" width="56" height="5" rx="1.5" className={T2} />
    </>
  )),
  // Две вишни на общем черенке.
  cherry: def('вишня', 40, 44, () => (
    <>
      <path d="M-9 -16 C-7 -30 -2 -37 4 -42 M9 -14 C9 -28 7 -37 4 -42" className={L} />
      <path d="M4 -42 C10 -46 17 -44 19 -38 C13 -36 7 -37 4 -42 Z" className={T2} />
      <circle cx="-9" cy="-9" r="9" className={T} />
      <circle cx="10" cy="-8" r="8.5" className={T} />
    </>
  )),
  // Овца: облачное тело, голова и ноги темнее.
  sheep: def('овца', 50, 36, () => (
    <>
      <rect x="-14" y="-12" width="4.5" height="12" rx="2" className={T2} />
      <rect x="-2" y="-12" width="4.5" height="12" rx="2" className={T2} />
      <rect x="8" y="-12" width="4.5" height="12" rx="2" className={T2} />
      <circle cx="-12" cy="-22" r="9" className={T} />
      <circle cx="-2" cy="-27" r="10" className={T} />
      <circle cx="9" cy="-24" r="9.5" className={T} />
      <circle cx="0" cy="-19" r="11" className={T} />
      <path d="M13 -26 C13 -35 22 -36 23 -29 L27 -22 C28 -19 25 -18 22 -19 L15 -19 Z" className={T2} />
      <circle cx="20" cy="-28" r="1.3" className={S} />
    </>
  )),
  // Босая стопа сбоку: голень сужается к щиколотке, круглая пятка, впереди пальцы (чтобы не читалась как сапог).
  foot: def('ступня', 44, 28, () => (
    <>
      <path d="M-10 -28 C-10 -24 -9 -21 -9 -18 C-14 -14 -15 -7 -12 -2 Q-10 0 -6 0 H13 C17 0 19 -3 17 -7 C14 -12 7 -14 2 -18 C2 -22 2 -25 3 -28 Z" className={T} />
      <circle cx="17.5" cy="-4.5" r="3.6" className={T} />
      <circle cx="12" cy="-6.5" r="3" className={T} />
      <circle cx="7.5" cy="-8" r="2.5" className={T} />
    </>
  )),
}
