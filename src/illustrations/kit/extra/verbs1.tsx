import type { PropDef } from '../props'

// Предметы раздела «глаголы 1»: be, Present Simple / Continuous, Past Simple / Continuous.
// Низ по центру — в (0, 0); стиль как в props.tsx: заливка st-thing / st-thing2, обводка по классам, без деталей.

const T = 'st-thing'
const T2 = 'st-thing2'
const L = 'st-line'

export const EXTRA: Record<string, PropDef> = {
  // Рабочий стол с ноутбуком: «работать».
  desk: {
    ru: 'рабочий стол с ноутбуком',
    w: 56,
    h: 50,
    draw: () => (
      <>
        <rect x="-24" y="-26" width="4.5" height="26" rx="1.5" className={T2} />
        <rect x="19.5" y="-26" width="4.5" height="26" rx="1.5" className={T2} />
        <rect x="-28" y="-30" width="56" height="6.5" rx="3" className={T} />
        <rect x="-12" y="-50" width="24" height="17" rx="2" className={T} />
        <rect x="-9" y="-47" width="18" height="11" rx="1" className={T2} />
        <path d="M-16 -33 L-13 -35 H13 L16 -33 V-31 H-16 Z" className={T} />
      </>
    ),
  },
  // Стетоскоп: врач.
  stethoscope: {
    ru: 'стетоскоп (врач)',
    w: 28,
    h: 42,
    draw: () => (
      <>
        <path d="M-10 -42 V-26 Q-10 -14 0 -14 Q10 -14 10 -26 V-42" className={L} strokeWidth="2.5" />
        <path d="M0 -14 V-9" className={L} strokeWidth="2.5" />
        <circle cx="0" cy="-5" r="5.5" className={T} />
        <circle cx="-10" cy="-42" r="2.4" className="st-solid" />
        <circle cx="10" cy="-42" r="2.4" className="st-solid" />
      </>
    ),
  },
}
