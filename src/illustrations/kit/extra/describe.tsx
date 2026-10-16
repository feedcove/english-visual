import type { PropDef } from '../props'

// Предметы раздела «описание»: включённая лампа (phrasal: turn on) — та же лампа, что в PROPS, но с лучами света.

const L = 'st-line'
const T = 'st-thing'
const T2 = 'st-thing2'

// Лучи света вокруг абажура (кроме направления вниз, где стойка): центр (0, -37), радиусы 20 → 28.
const LAMP_RAYS = [-165, -130, -90, -50, -15, 15, 165]
  .map((deg) => {
    const a = (deg * Math.PI) / 180
    const p = (r: number) => `${Math.round((Math.cos(a) * r) * 100) / 100} ${Math.round((-37 + Math.sin(a) * r) * 100) / 100}`
    return `M${p(21)}L${p(29)}`
  })
  .join('')

export const EXTRA: Record<string, PropDef> = {
  'lamp-on': {
    ru: 'включённая лампа',
    w: 24,
    h: 46,
    draw: () => (
      <>
        <path d={LAMP_RAYS} className={L} strokeWidth="2.5" />
        <path d="M0 -4 V-30" className={L} />
        <rect x="-9" y="-4" width="18" height="4" rx="2" className={T2} />
        <path d="M-12 -28 L-6 -46 H6 L12 -28 Z" className={T} />
      </>
    ),
  },
}
