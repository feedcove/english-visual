import type { PropDef } from '../props'

// Предметы раздела «местоимения»: зеркало (отражение рисуется в сцене человеком), знак минуса (отрицание), метка места (pin).
// Стиль как в props.tsx: заливка st-thing / st-thing2, обводка, проём st-void.

const def = (ru: string, w: number, h: number, draw: PropDef['draw']): PropDef => ({ ru, w, h, draw })

export const EXTRA: Record<string, PropDef> = {
  mirror: def('зеркало', 60, 56, () => (
    <>
      <rect x="-30" y="-56" width="60" height="56" rx="7" className="st-thing2" />
      <rect x="-26" y="-52" width="52" height="48" rx="4" className="st-void" />
    </>
  )),
  pin: def('метка места', 28, 41, () => (
    <>
      <path d="M0 0 C-12 -14 -14 -19 -14 -27 A14 14 0 1 1 14 -27 C14 -19 12 -14 0 0 Z" className="st-thing" />
      <circle cx="0" cy="-27" r="5" className="st-void" />
    </>
  )),
  minus: def('минус (отрицание)', 28, 28, () => (
    <>
      <circle cx="0" cy="-14" r="13" className="st-thing" />
      <path d="M-6.5 -14 H6.5" className="st-mark" />
    </>
  )),
}
