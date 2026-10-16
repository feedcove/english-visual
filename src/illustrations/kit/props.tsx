import type { ReactElement } from 'react'
import type { Pos } from '../../content/types'

// Предметы. Каждый рисуется в своей системе координат: низ по центру — в точке (0, 0), размер около 40 × 40.
// Стиль: заливка --n3 (st-thing) / --n4 (st-thing2), обводка --c2, 1.75 px, скругления. Без мелких деталей и текстур.
// st-void — проём или пустота, st-liquid — вода, st-solid — мелкая сплошная точка, st-line — линия без заливки.
// Каждый предмет узнаётся силуэтом в 40 px. Реестр расширяется: добавь запись, имя — английское слово (как в подписях).

export interface PropDef {
  /** Русское название для галереи и подписей. */
  ru: string
  w: number
  h: number
  draw: () => ReactElement
}

const T = 'st-thing'
const T2 = 'st-thing2'
const L = 'st-line'
const V = 'st-void'
const S = 'st-solid'
const WTR = 'st-liquid'

const def = (ru: string, w: number, h: number, draw: () => ReactElement): PropDef => ({ ru, w, h, draw })

const r2 = (n: number) => Math.round(n * 100) / 100
/** Точки на окружности: n штук, первая — сверху. */
const ring = (cx: number, cy: number, r: number, n: number, turn = 0) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((i + turn) / n) * Math.PI * 2 - Math.PI / 2
    return [r2(cx + Math.cos(a) * r), r2(cy + Math.sin(a) * r)] as const
  })

const STAR = (() => {
  const outer = ring(0, -19, 19, 5)
  const inner = ring(0, -19, 8, 5, 0.5)
  return outer.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}L${inner[i]![0]} ${inner[i]![1]}`).join('') + 'Z'
})()
const PENTA = ring(0, -17, 6, 5)
const poly = (pts: readonly (readonly [number, number])[]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('') + 'Z'
const SUN_RAYS = ring(0, -21, 14, 8).map(([x, y], i) => {
  const [ox, oy] = ring(0, -21, 19.5, 8)[i]!
  return `M${x} ${y}L${ox} ${oy}`
})
const SNOW = ring(0, -20, 18, 6).map(([x, y]) => `M0 -20L${x} ${y}`).join('')
const SNOW_TIPS = ring(0, -20, 12, 6)
  .map(([x, y], i) => {
    const [a1, b1] = ring(0, -20, 16, 6, -0.28)[i]!
    const [a2, b2] = ring(0, -20, 16, 6, 0.28)[i]!
    return `M${a1} ${b1}L${x} ${y}L${a2} ${b2}`
  })
  .join('')
const CLOCK_TICKS = ring(0, -21, 15, 12)
  .map(([x, y], i) => {
    const [ox, oy] = ring(0, -21, i % 3 ? 16.5 : 13.5, 12)[i]!
    return `M${x} ${y}L${ox} ${oy}`
  })
  .join('')

const BASE: Record<string, PropDef> = {
  // Животные
  cat: def('кошка', 36, 42, () => (
    <>
      <path d="M-10 -4 C-22 -4 -23 -18 -17 -23" className={L} />
      <path d="M-12 0 C-14 -12 -10 -25 0 -25 C8 -25 11 -14 10 0 Z" className={T} />
      <path d="M-3 -29 L-5 -42 L2 -36 H7 L13 -42 L12.5 -29 C12.5 -24 9 -21 4.7 -21 C0 -21 -3 -24 -3 -29 Z" className={T} />
      <circle cx="2" cy="-30" r="1.4" className={S} />
      <circle cx="8" cy="-30" r="1.4" className={S} />
    </>
  )),
  dog: def('собака', 48, 38, () => (
    <g transform="translate(-6 0)">
      <path d="M-16 -20 C-21 -24 -22 -30 -19 -35" className={L} />
      {/* Ноги парами (задние и передние), короче туловища — иначе силуэт читается как стол. */}
      <rect x="-16" y="-14" width="5" height="14" rx="2.5" className={T2} />
      <rect x="-9" y="-14" width="5" height="14" rx="2.5" className={T} />
      <rect x="6" y="-14" width="5" height="14" rx="2.5" className={T2} />
      <rect x="13" y="-14" width="5" height="14" rx="2.5" className={T} />
      <rect x="-18" y="-28" width="37" height="17" rx="8.5" className={T} />
      <path d="M11 -22 C10 -33 14 -37 20 -37 C25 -37 27 -34 27 -31 L32 -29 C34 -28 33 -23 30 -23 L18 -21 Z" className={T} />
      <path d="M16 -36 C11 -35 10 -28 13 -24 C16 -25 19 -30 19 -35 Z" className={T2} />
      <circle cx="23" cy="-32" r="1.4" className={S} />
      <circle cx="32.5" cy="-27.5" r="1.5" className={S} />
    </g>
  )),
  bird: def('птица', 44, 34, () => (
    <>
      <path d="M-2 -7 V0 M3 -7 V0" className={L} />
      <path d="M-12 -17 L-23 -23 L-21 -13 Z" className={T} />
      <ellipse cx="-1" cy="-15" rx="13" ry="9" className={T} />
      <circle cx="10" cy="-26" r="7" className={T} />
      <path d="M16.5 -28 L23 -25.5 L16.5 -23 Z" className={T2} />
      <path d="M-9 -18 C-5 -11 3 -11 6 -17" className={L} />
      <circle cx="12" cy="-27.5" r="1.3" className={S} />
    </>
  )),
  fish: def('рыба', 40, 24, () => (
    <>
      <path d="M-11 -13 L-21 -23 L-21 -3 Z" className={T2} />
      <path d="M-13 -13 C-5 -26 10 -26 19 -13 C10 0 -5 0 -13 -13 Z" className={T} />
      <path d="M4 -20 C6.5 -16 6.5 -10 4 -6" className={L} />
      <circle cx="11" cy="-15" r="1.6" className={S} />
    </>
  )),

  // Дом и вещи
  house: def('дом', 42, 42, () => (
    <>
      <rect x="-16" y="-25" width="32" height="25" rx="2" className={T} />
      <path d="M-21 -23 L0 -41 L21 -23 Z" className={T2} />
      <rect x="-5" y="-15" width="9" height="15" rx="1.5" className={T2} />
      <rect x="7" y="-19" width="6" height="6" rx="1" className={V} />
    </>
  )),
  door: def('дверь', 26, 46, () => (
    <>
      <rect x="-13" y="-46" width="26" height="46" rx="2.5" className={T} />
      <rect x="-8" y="-40" width="16" height="13" rx="1.5" className={L} />
      <rect x="-8" y="-22" width="16" height="16" rx="1.5" className={L} />
      <circle cx="8" cy="-24.5" r="1.8" className={S} />
    </>
  )),
  window: def('окно', 42, 38, () => (
    <>
      <rect x="-18" y="-38" width="36" height="33" rx="3" className={T} />
      <path d="M0 -38 V-5 M-18 -21.5 H18" className={L} />
      <rect x="-21" y="-5" width="42" height="5" rx="2" className={T2} />
    </>
  )),
  table: def('стол', 70, 34, () => (
    <>
      <rect x="-30" y="-29" width="4.5" height="29" rx="1.5" className={T2} />
      <rect x="25.5" y="-29" width="4.5" height="29" rx="1.5" className={T2} />
      <rect x="-35" y="-34" width="70" height="7" rx="3" className={T} />
    </>
  )),
  chair: def('стул', 26, 46, () => (
    <>
      <rect x="-12" y="-18" width="3.5" height="18" rx="1.5" className={T2} />
      <rect x="8.5" y="-18" width="3.5" height="18" rx="1.5" className={T2} />
      <rect x="-12" y="-46" width="4.5" height="28" rx="2" className={T} />
      <rect x="-12" y="-21" width="25" height="4.5" rx="2" className={T} />
    </>
  )),
  sofa: def('диван', 60, 32, () => (
    <>
      <path d="M-23 -4 V0 M23 -4 V0" className={L} />
      <rect x="-24" y="-31" width="48" height="18" rx="6" className={T2} />
      <rect x="-25" y="-17" width="50" height="13" rx="4" className={T} />
      <rect x="-30" y="-24" width="9" height="20" rx="4" className={T} />
      <rect x="21" y="-24" width="9" height="20" rx="4" className={T} />
    </>
  )),
  bed: def('кровать', 62, 32, () => (
    <>
      <rect x="-31" y="-32" width="6" height="32" rx="2" className={T2} />
      <rect x="26" y="-20" width="5" height="20" rx="2" className={T2} />
      <rect x="-26" y="-18" width="53" height="11" rx="3" className={T} />
      <rect x="-22" y="-25" width="14" height="7" rx="3.5" className={T2} />
      <path d="M-4 -18 C2 -22 22 -22 27 -18" className={L} />
    </>
  )),
  lamp: def('лампа', 24, 46, () => (
    <>
      <path d="M0 -4 V-30" className={L} />
      <rect x="-9" y="-4" width="18" height="4" rx="2" className={T2} />
      <path d="M-12 -28 L-6 -46 H6 L12 -28 Z" className={T} />
    </>
  )),
  box: def('коробка', 44, 34, () => (
    <>
      <path d="M-21 -34 L-31 -42 L-26 -45 L-14 -34 Z M21 -34 L31 -42 L26 -45 L14 -34 Z" className={T2} />
      <rect x="-22" y="-34" width="44" height="34" rx="4" className={T} />
    </>
  )),
  bag: def('сумка', 34, 36, () => (
    <>
      <path d="M-8 -24 C-8 -36 8 -36 8 -24" className={L} />
      <path d="M-14 -24 H14 L16.5 -2 Q16.5 0 14.5 0 H-14.5 Q-16.5 0 -16.5 -2 Z" className={T} />
      <path d="M-14.6 -17 H14.6" className={L} />
    </>
  )),
  key: def('ключ', 38, 16, () => (
    <>
      <path d="M12 -6 V-1 M17 -6 V-2" className={L} />
      <rect x="-5" y="-10" width="26" height="5" rx="2.5" className={T} />
      <circle cx="-11" cy="-8" r="7.5" className={T} />
      <circle cx="-11" cy="-8" r="2.6" className={V} />
    </>
  )),
  phone: def('телефон', 22, 38, () => (
    <>
      <rect x="-11" y="-38" width="22" height="38" rx="4.5" className={T} />
      <rect x="-7.5" y="-33" width="15" height="26" rx="1.5" className={T2} />
      <circle cx="0" cy="-3.5" r="1.4" className={S} />
    </>
  )),
  laptop: def('ноутбук', 46, 30, () => (
    <>
      <rect x="-17" y="-30" width="34" height="24" rx="2" className={T} />
      <rect x="-13.5" y="-26.5" width="27" height="17" rx="1" className={T2} />
      <path d="M-23 -4 L-19 -7 H19 L23 -4 V-2 Q23 0 21 0 H-21 Q-23 0 -23 -2 Z" className={T} />
    </>
  )),
  tv: def('телевизор', 46, 38, () => (
    <>
      <path d="M-9 0 L0 -9 L9 0" className={L} />
      <rect x="-23" y="-38" width="46" height="30" rx="3" className={T} />
      <rect x="-19" y="-34" width="38" height="22" rx="1.5" className={T2} />
    </>
  )),
  book: def('книга', 44, 28, () => (
    <>
      <path d="M0 -2 C-7 -6 -15 -6 -21 -4 V-28 C-15 -30 -7 -30 0 -26 Z" className={T} />
      <path d="M0 -2 C7 -6 15 -6 21 -4 V-28 C15 -30 7 -30 0 -26 Z" className={T} />
      <path d="M-16 -21 C-12 -22 -8 -22 -4 -20 M-16 -14 C-12 -15 -8 -15 -4 -13 M16 -21 C12 -22 8 -22 4 -20 M16 -14 C12 -15 8 -15 4 -13" className={L} />
    </>
  )),
  letter: def('письмо', 38, 26, () => (
    <>
      <rect x="-19" y="-26" width="38" height="26" rx="2.5" className={T} />
      <path d="M-18 -24 L0 -11 L18 -24" className={L} />
    </>
  )),
  gift: def('подарок', 38, 38, () => (
    <>
      <path d="M0 -29 C-5 -39 -14 -36 -8 -29 M0 -29 C5 -39 14 -36 8 -29" className={L} />
      <rect x="-16" y="-23" width="32" height="23" rx="2" className={T} />
      <rect x="-18" y="-30" width="36" height="8" rx="2" className={T2} />
      <path d="M0 -30 V0" className={L} />
    </>
  )),
  cup: def('кружка', 32, 28, () => (
    <>
      <path d="M11 -22 C19 -22 19 -9 11 -9" className={L} />
      <path d="M-11 -27 H11 V-6 Q11 0 5 0 H-5 Q-11 0 -11 -6 Z" className={T} />
    </>
  )),
  glass: def('стакан', 22, 32, () => <path d="M-11 -32 L-8.5 -2 Q-8.3 0 -6.3 0 H6.3 Q8.3 0 8.5 -2 L11 -32 Z" className={V} />),
  bottle: def('бутылка', 22, 46, () => (
    <>
      <rect x="-5" y="-46" width="10" height="6" rx="1.5" className={T2} />
      <path d="M-8 0 Q-10.5 0 -10.5 -2.5 V-22 C-10.5 -28 -4 -30 -4 -35 V-41 H4 V-35 C4 -30 10.5 -28 10.5 -22 V-2.5 Q10.5 0 8 0 Z" className={T} />
      <rect x="-10.5" y="-19" width="21" height="10" className={T2} />
    </>
  )),
  plate: def('тарелка', 42, 12, () => (
    <>
      <ellipse cx="0" cy="-5.5" rx="21" ry="5.5" className={T} />
      <ellipse cx="0" cy="-6.2" rx="12" ry="2.6" className={L} />
    </>
  )),
  shelf: def('полка', 54, 30, () => (
    <>
      <rect x="-20" y="-26" width="7" height="22" rx="1" className={T2} />
      <rect x="-12" y="-22" width="7" height="18" rx="1" className={T} />
      <rect x="-4" y="-28" width="7" height="24" rx="1" className={T2} />
      <path d="M8 -5 L15 -23 L21 -21 L14 -4" className={T} />
      <rect x="-27" y="-5" width="54" height="5" rx="2" className={T} />
    </>
  )),
  picture: def('картина', 40, 38, () => (
    <>
      <path d="M-9 -30 L0 -38 L9 -30" className={L} />
      <rect x="-19" y="-30" width="38" height="30" rx="2" className={T} />
      <rect x="-14.5" y="-25.5" width="29" height="21" rx="1" className={T2} />
      <path d="M-14 -5 L-5 -16 L1 -10 L5 -14 L14 -5" className={L} />
      <circle cx="7" cy="-20" r="2.3" className={S} />
    </>
  )),
  umbrella: def('зонт', 42, 42, () => (
    <>
      <path d="M0 -27 V-5 C0 0 -7 0 -7 -4" className={L} />
      <path d="M0 -37 V-41" className={L} />
      <path d="M-21 -27 C-21 -40 21 -40 21 -27 C18 -30 14 -30 10.5 -27 C7.5 -30 3 -30 0 -27 C-3 -30 -7.5 -30 -10.5 -27 C-14 -30 -18 -30 -21 -27 Z" className={T} />
    </>
  )),
  shoes: def('обувь', 44, 18, () => (
    <>
      <g transform="translate(-7 0)">
        <path d="M-15 0 V-12 Q-15 -16 -11 -16 H-4 C-2 -11 5 -9 13 -7 Q17 -6 17 -2.5 V0 Z" className={T2} />
      </g>
      <g transform="translate(5 0)">
        <path d="M-15 0 V-12 Q-15 -16 -11 -16 H-4 C-2 -11 5 -9 13 -7 Q17 -6 17 -2.5 V0 Z" className={T} />
        <path d="M-15 -3 H17" className={L} />
      </g>
    </>
  )),
  coat: def('пальто', 40, 46, () => (
    <>
      <path d="M0 -38 V-42 C0 -46 4 -46 4 -43" className={L} />
      <path d="M-15 -33 L-21 -6 H-15" className={T2} />
      <path d="M15 -33 L21 -6 H15" className={T2} />
      <path d="M-6 -38 L-15 -33 L-17 -3 Q-17 0 -14 0 H14 Q17 0 17 -3 L15 -33 L6 -38 L0 -27 Z" className={T} />
      <path d="M0 -27 V0 M-6 -38 L0 -27 L6 -38" className={L} />
      <circle cx="3.5" cy="-19" r="1.5" className={S} />
      <circle cx="3.5" cy="-10" r="1.5" className={S} />
    </>
  )),
  glasses: def('очки', 44, 18, () => (
    <>
      <path d="M-3 -10 Q0 -12.5 3 -10 M-17 -10 L-21 -14 M17 -10 L21 -14" className={L} />
      <circle cx="-10" cy="-8" r="7.5" className={T} />
      <circle cx="10" cy="-8" r="7.5" className={T} />
    </>
  )),
  wallet: def('кошелёк', 34, 24, () => (
    <>
      <rect x="-17" y="-24" width="34" height="24" rx="3.5" className={T} />
      <rect x="5" y="-16" width="14" height="9" rx="3" className={T2} />
      <circle cx="10.5" cy="-11.5" r="1.6" className={S} />
    </>
  )),
  coin: def('монета', 26, 26, () => (
    <>
      <circle cx="0" cy="-13" r="12.5" className={T} />
      <circle cx="0" cy="-13" r="8.5" className={L} />
      <path d="M0 -17.5 V-8.5" className={L} />
    </>
  )),
  ticket: def('билет', 42, 22, () => (
    <>
      <path d="M-21 -22 H21 V-14 A3.5 3.5 0 0 0 21 -7 V0 H-21 V-7 A3.5 3.5 0 0 0 -21 -14 Z" className={T} />
      <path d="M9 -20 V-2" className={L} strokeDasharray="2 3" />
      <path d="M-15 -14 H3 M-15 -8 H-3" className={L} />
    </>
  )),
  map: def('карта', 42, 32, () => (
    <>
      <path d="M-20 -4 V-30 L-7 -26 L7 -30 L20 -26 V0 L7 -4 L-7 0 Z" className={T} />
      <path d="M-7 -26 V0 M7 -30 V-4" className={L} />
      <path d="M-15 -10 C-9 -12 -3 -22 3 -18 C8 -15 12 -20 14 -22" className={L} strokeDasharray="2 3" />
      <circle cx="14" cy="-22" r="2.3" className={S} />
    </>
  )),
  pen: def('ручка', 24, 40, () => (
    <g transform="rotate(35)">
      <rect x="-3.5" y="-40" width="7" height="31" rx="2.5" className={T} />
      <path d="M-3.5 -9 L0 0 L3.5 -9 Z" className={T2} />
      <path d="M3.5 -36 V-24" className={L} />
    </g>
  )),
  paper: def('лист бумаги', 30, 38, () => (
    <>
      <path d="M-14 0 V-38 H6 L14 -30 V0 Z" className={T} />
      <path d="M6 -38 V-30 H14 M-9 -24 H9 M-9 -17 H9 M-9 -10 H3" className={L} />
    </>
  )),
  'clock-wall': def('настенные часы', 40, 42, () => (
    <>
      <circle cx="0" cy="-21" r="19" className={T} />
      <path d={CLOCK_TICKS} className={L} />
      <path d="M0 -21 V-31 M0 -21 L7 -17" className={L} strokeWidth="2.5" />
      <circle cx="0" cy="-21" r="1.8" className={S} />
    </>
  )),

  // Еда и вещество
  apple: def('яблоко', 34, 38, () => (
    <>
      <path d="M0 -26 C0 -30 1 -33 3 -36" className={L} />
      <path d="M0 -26 C-6 -30 -16 -28 -16 -16 C-16 -6 -9 0 -4.5 0 C-2.5 0 -1.5 -1 0 -1 C1.5 -1 2.5 0 4.5 0 C9 0 16 -6 16 -16 C16 -28 6 -30 0 -26 Z" className={T} />
      <path d="M2.5 -31 C6 -36.5 11 -36 12.5 -34 C9 -29.5 5 -29 2.5 -31 Z" className={T2} />
    </>
  )),
  bread: def('хлеб', 42, 28, () => (
    <>
      <path d="M-20 -2 V-14 C-20 -24 -10 -28 0 -28 C10 -28 20 -24 20 -14 V-2 Q20 0 18 0 H-18 Q-20 0 -20 -2 Z" className={T} />
      <path d="M-11 -22 L-7 -17 M-2 -24 L2 -19 M7 -22 L11 -17" className={L} />
    </>
  )),
  cake: def('торт', 38, 38, () => (
    <>
      <path d="M0 -38 C2.5 -35 2.5 -32.5 0 -31.5 C-2.5 -32.5 -2.5 -35 0 -38 Z" className={S} />
      <rect x="-1.75" y="-30" width="3.5" height="9" rx="1" className={T2} />
      <rect x="-18" y="-21" width="36" height="21" rx="3" className={T} />
      <path d="M-18 -13 V-18 Q-18 -21 -15 -21 H15 Q18 -21 18 -18 V-13 C15 -10 12 -10 10 -13.5 C8 -10 4 -10 2 -13.5 C0 -10 -4 -10 -6 -13.5 C-8 -10 -12 -10 -14 -13.5 C-15.5 -11.5 -17 -12 -18 -13 Z" className={T2} />
    </>
  )),
  slice: def('кусок торта', 38, 30, () => (
    // Клин в три четверти: боковая грань со слоем крема, торец и глазурь сверху, вишня на широком конце.
    <>
      <path d="M-18 -14 H9 V0 H-16 Q-18 0 -18 -2 Z" className={T} />
      <path d="M9 -14 L17 -21 V-6 Q17 -4.5 15.8 -3.5 L9 0 Z" className={T} />
      <path d="M-18 -14 L17 -21 L9 -14 Z" className={T2} />
      <path d="M-17 -7 H9 L17 -13.5" className={L} />
      <circle cx="12.5" cy="-24" r="3.2" className={S} />
    </>
  )),
  water: def('стакан воды', 22, 32, () => (
    <>
      <path d="M-11 -32 L-8.5 -2 Q-8.3 0 -6.3 0 H6.3 Q8.3 0 8.5 -2 L11 -32 Z" className={V} />
      <path d="M-9.5 -20 L-7.6 -2.6 Q-7.4 -1 -5.8 -1 H5.8 Q7.4 -1 7.6 -2.6 L9.5 -20 Z" className={WTR} />
      <path d="M-9.5 -20 H9.5" className={L} />
    </>
  )),
  milk: def('молоко', 24, 42, () => (
    <>
      <rect x="-6.5" y="-42" width="13" height="5" rx="1" className={T2} />
      <path d="M-11 0 V-28 L-6.5 -37 H6.5 L11 -28 V0 Z" className={T} />
      <path d="M-11 -28 H11" className={L} />
      <path d="M0 -21 C3.5 -16 4.5 -13 4.5 -11 C4.5 -8.5 2.5 -6.5 0 -6.5 C-2.5 -6.5 -4.5 -8.5 -4.5 -11 C-4.5 -13 -3.5 -16 0 -21 Z" className={S} />
    </>
  )),
  coffee: def('кофе', 34, 36, () => (
    <>
      <path d="M-4 -25 C-6.5 -28 -1.5 -30 -4 -35 M4 -25 C1.5 -28 6.5 -30 4 -35" className={L} />
      <path d="M11 -18 C17.5 -18 17.5 -10 11 -10" className={L} />
      <path d="M-11 -21 H11 V-10 Q11 -3.5 4 -3.5 H-4 Q-11 -3.5 -11 -10 Z" className={T} />
      <rect x="-17" y="-4" width="34" height="4" rx="2" className={T2} />
    </>
  )),
  tea: def('чай', 34, 36, () => (
    <>
      <path d="M3 -20 L9 -30" className={L} />
      <rect x="6.5" y="-36" width="7" height="7" rx="1" className={T2} />
      <path d="M11 -18 C17.5 -18 17.5 -10 11 -10" className={L} />
      <path d="M-12 -21 H12 C12 -10 7 -3.5 0 -3.5 C-7 -3.5 -12 -10 -12 -21 Z" className={T} />
      <rect x="-17" y="-4" width="34" height="4" rx="2" className={T2} />
    </>
  )),
  rice: def('рис', 40, 36, () => (
    <>
      <path d="M5 -20 L17 -36 M9 -19 L20 -33" className={L} strokeWidth="2.25" />
      <path d="M-15.5 -15 C-13 -24 13 -24 15.5 -15 Z" className={T2} />
      <circle cx="-6" cy="-18.5" r="1.1" className={S} />
      <circle cx="0" cy="-20.5" r="1.1" className={S} />
      <circle cx="6" cy="-18.5" r="1.1" className={S} />
      <path d="M-19 -15 H19 C19 -4.5 10 0 0 0 C-10 0 -19 -4.5 -19 -15 Z" className={T} />
    </>
  )),
  sugar: def('сахар', 28, 38, () => (
    <>
      <path d="M-13 0 V-30 L-11 -38 H11 L13 -30 V0 Z" className={T} />
      <path d="M-13 -30 H13" className={L} />
      <rect x="-6" y="-21" width="9" height="9" rx="1.5" className={T2} />
      <rect x="1" y="-14" width="7" height="7" rx="1.5" className={T2} />
    </>
  )),
  cheese: def('сыр', 38, 26, () => (
    <>
      <path d="M-18 -2 V-11 L15 -25 Q18 -26 18 -22 V-2 Q18 0 16 0 H-16 Q-18 0 -18 -2 Z" className={T2} />
      <path d="M-18 -11 L18 -11" className={L} />
      <circle cx="-8" cy="-5" r="2.6" className={V} />
      <circle cx="6" cy="-4.5" r="2" className={V} />
      <circle cx="10" cy="-17" r="2.2" className={V} />
    </>
  )),
  egg: def('яйцо', 26, 32, () => (
    <path d="M0 -32 C9 -32 13 -18 13 -11.5 C13 -4 7 0 0 0 C-7 0 -13 -4 -13 -11.5 C-13 -18 -9 -32 0 -32 Z" className={T} />
  )),
  pizza: def('пицца', 36, 36, () => (
    <>
      <path d="M-17 -30 Q0 -37 17 -30 L0 0 Z" className={T} />
      <path d="M-17 -30 Q0 -37 17 -30 L14.5 -25.5 Q0 -31 -14.5 -25.5 Z" className={T2} />
      <circle cx="-5" cy="-19" r="3.3" className={T2} />
      <circle cx="5" cy="-15" r="2.8" className={T2} />
      <circle cx="0" cy="-7" r="2.1" className={T2} />
    </>
  )),
  jar: def('банка', 28, 34, () => (
    <>
      <rect x="-12" y="-28" width="24" height="28" rx="4.5" className={T} />
      <rect x="-13.5" y="-34" width="27" height="7" rx="2" className={T2} />
      <rect x="-12" y="-19" width="24" height="10" className={T2} />
    </>
  )),

  // Город и путь
  car: def('машина', 50, 30, () => (
    <>
      <path d="M-24 -9 V-14 Q-24 -17 -21 -17.5 L-14 -18.5 L-8 -26 Q-6 -28 -3 -28 H8 Q11 -28 13 -26 L18 -18.5 L22 -17.5 Q24.5 -16.5 24.5 -13.5 V-9 Q24.5 -7 22.5 -7 H-22 Q-24 -7 -24 -9 Z" className={T} />
      <path d="M-5.5 -24.5 H3.5 V-18.5 H-11 Z M6.5 -24.5 H9.5 L13.5 -18.5 H6.5 Z" className={T2} />
      <circle cx="-13" cy="-6.5" r="6" className={T2} />
      <circle cx="14" cy="-6.5" r="6" className={T2} />
      <circle cx="-13" cy="-6.5" r="1.8" className={S} />
      <circle cx="14" cy="-6.5" r="1.8" className={S} />
    </>
  )),
  bus: def('автобус', 54, 38, () => (
    <>
      <rect x="-27" y="-36" width="54" height="29" rx="5" className={T} />
      <rect x="-23" y="-31" width="9" height="9" rx="1.5" className={T2} />
      <rect x="-11" y="-31" width="9" height="9" rx="1.5" className={T2} />
      <rect x="1" y="-31" width="9" height="9" rx="1.5" className={T2} />
      <rect x="14" y="-31" width="9" height="17" rx="1.5" className={T2} />
      <circle cx="-15" cy="-6.5" r="6" className={T2} />
      <circle cx="13" cy="-6.5" r="6" className={T2} />
      <circle cx="-15" cy="-6.5" r="1.8" className={S} />
      <circle cx="13" cy="-6.5" r="1.8" className={S} />
    </>
  )),
  train: def('поезд', 40, 44, () => (
    <>
      <path d="M-10 -7 L-15 0 M10 -7 L15 0 M-20 0 H20" className={L} />
      <rect x="-16" y="-44" width="32" height="37" rx="9" className={T} />
      <rect x="-11" y="-38" width="22" height="13" rx="3" className={T2} />
      <circle cx="-8.5" cy="-15" r="2.3" className={S} />
      <circle cx="8.5" cy="-15" r="2.3" className={S} />
    </>
  )),
  bike: def('велосипед', 50, 34, () => (
    <>
      <circle cx="-14" cy="-11" r="10.5" className={L} />
      <circle cx="14" cy="-11" r="10.5" className={L} />
      <path d="M-14 -11 L-5 -25 H9 L14 -11 M-5 -25 L1 -11 L9 -25 M-14 -11 H1" className={L} strokeWidth="2.25" />
      <path d="M9 -25 L7 -31 H12 M-7 -29 H-1.5 M-4.5 -25 V-29" className={L} strokeWidth="2.25" />
    </>
  )),
  plane: def('самолёт', 52, 30, () => (
    <>
      <path d="M-21 -19 L-24 -30 H-18 L-11 -19 Z" className={T2} />
      <path d="M-25 -15 Q-25 -19 -21 -19 H16 C22 -19 26.5 -17 26.5 -15 C26.5 -13 22 -11 16 -11 H-21 Q-25 -11 -25 -15 Z" className={T} />
      <path d="M-3 -14 L-13 -3 H-6 L8 -14 Z" className={T2} />
      <path d="M16 -17 H21" className={L} />
    </>
  )),
  boat: def('лодка', 42, 42, () => (
    <>
      <path d="M0 -10 V-42" className={L} />
      <path d="M2 -40 L19 -14 H2 Z" className={T2} />
      <path d="M-2 -33 L-14 -14 H-2 Z" className={T} />
      <path d="M-21 -11 H21 L14.5 0 H-14.5 Z" className={T} />
    </>
  )),
  road: def('дорога', 46, 32, () => (
    <>
      <path d="M-6 -32 H6 L23 0 H-23 Z" className={T} />
      <path d="M0 -29 V-24 M0 -18 V-12 M0 -6 V0" className={L} strokeWidth="2.5" />
    </>
  )),
  bridge: def('мост', 54, 30, () => (
    <>
      <path d="M-26 -29 H26 M-20 -29 V-23 M-10 -29 V-23 M0 -29 V-23 M10 -29 V-23 M20 -29 V-23" className={L} />
      <path d="M-27 -18 H27 V0 H20 C20 -13 -20 -13 -20 0 H-27 Z" className={T2} />
      <rect x="-27" y="-23" width="54" height="5" rx="2" className={T} />
    </>
  )),
  tunnel: def('туннель', 54, 38, () => (
    <>
      <path d="M-27 0 C-27 -25 -14 -38 0 -38 C14 -38 27 -25 27 0 Z" className={T} />
      <path d="M-11 0 V-12 C-11 -25 11 -25 11 -12 V0 Z" className={V} />
      <path d="M-3 -1 L-5 -8 M3 -1 L5 -8" className={L} />
    </>
  )),
  river: def('река', 54, 18, () => (
    <>
      <path d="M-27 -12 C-18 -18 -9 -6 0 -12 C9 -18 18 -6 27 -12 V-4 C18 2 9 -10 0 -4 C-9 2 -18 -10 -27 -4 Z" className={WTR} />
      <path d="M-27 -12 C-18 -18 -9 -6 0 -12 C9 -18 18 -6 27 -12 M-27 -4 C-18 2 -9 -10 0 -4 C9 2 18 -10 27 -4" className={L} />
    </>
  )),
  station: def('вокзал (табличка)', 42, 46, () => (
    <>
      <path d="M0 0 V-25" className={L} strokeWidth="2.5" />
      <rect x="-21" y="-46" width="42" height="21" rx="5" className={T} />
      <rect x="-7" y="-42" width="14" height="10" rx="3.5" className={T2} />
      <path d="M-4 -32 L-6 -29 M4 -32 L6 -29" className={L} />
    </>
  )),
  stop: def('остановка', 44, 40, () => (
    <>
      <path d="M-18 -33 V0 M18 -33 V0" className={L} strokeWidth="2.5" />
      <rect x="-14" y="-28" width="28" height="15" rx="1.5" className={V} />
      <rect x="-13" y="-12" width="26" height="3.5" rx="1.5" className={T2} />
      <rect x="-22" y="-37" width="44" height="5" rx="2.5" className={T} />
      <circle cx="0" cy="-20.5" r="4" className={T2} />
    </>
  )),
  shop: def('магазин', 48, 34, () => (
    <>
      <rect x="-22" y="-28" width="44" height="28" rx="2" className={T} />
      <rect x="-16" y="-17" width="15" height="10" rx="1" className={V} />
      <rect x="5" y="-17" width="11" height="17" rx="1" className={T2} />
      <path d="M-24.5 -34 H24.5 L23 -24 C20 -21 16 -21 14 -24 C11 -21 7 -21 5 -24 C2 -21 -2 -21 -5 -24 C-7 -21 -11 -21 -14 -24 C-16 -21 -20 -21 -23 -24 Z" className={T2} />
    </>
  )),
  school: def('школа', 50, 46, () => (
    <>
      <path d="M0 -40 V-46 L7 -44 L0 -42" className={L} />
      <rect x="-24" y="-24" width="48" height="24" rx="1.5" className={T} />
      <path d="M-10 -24 V-32 L0 -40 L10 -32 V-24 Z" className={T2} />
      <circle cx="0" cy="-31" r="3" className={V} />
      <rect x="-4.5" y="-12" width="9" height="12" rx="1" className={T2} />
      <rect x="-19" y="-18" width="8" height="7" rx="1" className={V} />
      <rect x="11" y="-18" width="8" height="7" rx="1" className={V} />
    </>
  )),
  office: def('офис', 30, 48, () => (
    <>
      <rect x="-15" y="-48" width="30" height="48" rx="2" className={T} />
      {[-42, -34, -26, -18].map((y) => (
        <g key={y}>
          <rect x="-10" y={y} width="5" height="4.5" rx="0.8" className={V} />
          <rect x="-2.5" y={y} width="5" height="4.5" rx="0.8" className={V} />
          <rect x="5" y={y} width="5" height="4.5" rx="0.8" className={V} />
        </g>
      ))}
      <rect x="-4" y="-9" width="8" height="9" rx="1" className={T2} />
    </>
  )),
  bench: def('скамейка', 50, 28, () => (
    <>
      <rect x="-20" y="-12" width="3.5" height="12" rx="1.5" className={T2} />
      <rect x="16.5" y="-12" width="3.5" height="12" rx="1.5" className={T2} />
      <path d="M-18 -26 V-14 M18 -26 V-14" className={L} />
      <rect x="-25" y="-29" width="50" height="5" rx="2.5" className={T} />
      <rect x="-25" y="-16" width="50" height="5" rx="2.5" className={T} />
    </>
  )),
  tree: def('дерево', 44, 48, () => (
    <>
      <rect x="-3.5" y="-17" width="7" height="17" rx="2" className={T2} />
      <path d="M-11 -14 C-22 -14 -24 -29 -14 -32 C-13 -44 6 -49 10 -37 C21 -37 24 -18 11 -14 Z" className={T} />
    </>
  )),
  flower: def('цветок', 26, 40, () => (
    <>
      <path d="M0 0 V-22" className={L} strokeWidth="2.25" />
      <path d="M0 -8 C4 -15 10 -15 11 -13 C9 -8 4 -6 0 -8 Z" className={T2} />
      {ring(0, -29, 6.5, 5).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5.2" className={T} />
      ))}
      <circle cx="0" cy="-29" r="4" className={T2} />
    </>
  )),
  hill: def('холм', 56, 28, () => <path d="M-28 0 C-18 -32 18 -32 28 0 Z" className={T} />),
  stairs: def('лестница', 44, 32, () => <path d="M-22 0 V-8 H-11 V-16 H0 V-24 H11 V-32 H22 V0 Z" className={T} />),
  wall: def('стена', 48, 30, () => (
    <>
      <rect x="-24" y="-30" width="48" height="30" rx="1.5" className={T} />
      <path d="M-24 -20 H24 M-24 -10 H24 M-8 -30 V-20 M8 -30 V-20 M-16 -20 V-10 M0 -20 V-10 M16 -20 V-10 M-8 -10 V0 M8 -10 V0" className={L} />
    </>
  )),
  fence: def('забор', 54, 30, () => (
    <>
      <rect x="-27" y="-22" width="54" height="4" rx="1.5" className={T2} />
      <rect x="-27" y="-10" width="54" height="4" rx="1.5" className={T2} />
      {[-22, -11, 0, 11, 22].map((x) => (
        <path key={x} d={`M${x - 4} 0 V-25 L${x} -30 L${x + 4} -25 V0 Z`} className={T} />
      ))}
    </>
  )),
  gate: def('ворота', 50, 38, () => (
    <>
      <path d="M-18 -27 Q0 -35 18 -27 M-18 -6 H18 M-12 -29 V-6 M-6 -31 V-6 M0 -31.5 V-6 M6 -31 V-6 M12 -29 V-6" className={L} />
      <rect x="-24" y="-38" width="6" height="38" rx="1.5" className={T} />
      <rect x="18" y="-38" width="6" height="38" rx="1.5" className={T} />
    </>
  )),

  // Природа и время
  sun: def('солнце', 40, 40, () => (
    <>
      <path d={SUN_RAYS.join('')} className={L} strokeWidth="2.5" />
      <circle cx="0" cy="-21" r="10" className={T} />
    </>
  )),
  moon: def('луна', 30, 34, () => (
    <path d="M6 -35 C-6 -33 -13 -26 -13 -19 C-13 -10 -5 -2 6 -3 C-1 -7 -4 -13 -4 -19 C-4 -25 -1 -31 6 -35 Z" className={T} />
  )),
  star: def('звезда', 38, 38, () => <path d={STAR} className={T} />),
  cloud: def('облако', 50, 26, () => (
    <path d="M-17 0 C-26 0 -26 -13 -17 -14 C-17 -24 -4 -27 1 -19 C5 -27 18 -25 18 -15 C26 -15 27 0 18 0 Z" className={T} />
  )),
  rain: def('дождь', 46, 40, () => (
    <>
      <path d="M-9 -10 L-12 -3 M1 -10 L-2 -3 M11 -10 L8 -3" className={L} strokeWidth="2.5" />
      <path d="M-15 -14 C-23 -14 -23 -25 -15 -26 C-15 -35 -4 -38 0 -31 C4 -38 16 -36 16 -27 C23 -27 24 -14 16 -14 Z" className={T} />
    </>
  )),
  snow: def('снег', 40, 40, () => <path d={SNOW + SNOW_TIPS} className={L} strokeWidth="2.5" />),

  // Абстракции со смыслом
  heart: def('сердце', 40, 36, () => (
    <path d="M0 -3 C-4 -7 -20 -15 -20 -26 C-20 -33 -14 -37 -9 -37 C-5 -37 -2 -35 0 -31 C2 -35 5 -37 9 -37 C14 -37 20 -33 20 -26 C20 -15 4 -7 0 -3 Z" className={T} />
  )),
  idea: def('идея (лампочка)', 40, 46, () => (
    <>
      <path d="M-19 -32 H-23 M19 -32 H23 M-14 -45 L-17 -48 M14 -45 L17 -48" className={L} />
      <path d="M-6 -12 C-6 -18 -13 -21 -13 -30 C-13 -38 -7 -43 0 -43 C7 -43 13 -38 13 -30 C13 -21 6 -18 6 -12 Z" className={T} />
      <rect x="-6.5" y="-12" width="13" height="8" rx="2" className={T2} />
      <path d="M-3 -1.5 H3" className={L} strokeWidth="2.5" />
    </>
  )),
  question: def('вопрос', 40, 40, () => (
    <>
      <circle cx="0" cy="-20" r="19" className={T} />
      <path d="M-6.5 -27 C-6.5 -34 6.5 -34 6.5 -27 C6.5 -22 0 -21.5 0 -16 V-14" className="st-mark" />
      <circle cx="0" cy="-7.5" r="2.4" className="st-solid" />
    </>
  )),
  music: def('музыка', 36, 42, () => (
    <>
      <path d="M-4.5 -10 V-37 M15.5 -14 V-41" className={L} strokeWidth="2.5" />
      <path d="M-4.5 -37 L15.5 -41 V-35 L-4.5 -31 Z" className={T} />
      <ellipse cx="-10" cy="-9" rx="6.5" ry="4.8" transform="rotate(-20 -10 -9)" className={T} />
      <ellipse cx="10" cy="-13" rx="6.5" ry="4.8" transform="rotate(-20 10 -13)" className={T} />
    </>
  )),
  trophy: def('кубок', 40, 40, () => (
    <>
      <path d="M-12 -35 C-21 -35 -21 -24 -10 -22 M12 -35 C21 -35 21 -24 10 -22" className={L} strokeWidth="2.25" />
      <rect x="-3" y="-17" width="6" height="10" rx="1" className={T2} />
      <rect x="-11" y="-8" width="22" height="8" rx="2" className={T} />
      <path d="M-13 -39 H13 V-29 C13 -21 7 -16 0 -16 C-7 -16 -13 -21 -13 -29 Z" className={T} />
    </>
  )),
  magnifier: def('лупа', 38, 40, () => (
    <>
      <rect x="-3.5" y="0" width="7" height="18" rx="3.5" transform="translate(5 -17) rotate(-45)" className={T2} />
      <circle cx="-4" cy="-25" r="13" className={T} />
      <circle cx="-4" cy="-25" r="8.5" className={V} />
    </>
  )),
  'check-mark': def('галочка', 40, 40, () => (
    <>
      <circle cx="0" cy="-20" r="19" className={T} />
      <path d="M-8.5 -20 L-2.5 -13 L9 -27" className="st-mark" />
    </>
  )),
  'calendar-page': def('листок календаря', 34, 40, () => (
    <>
      <rect x="-17" y="-36" width="34" height="36" rx="3.5" className={T} />
      <path d="M-17 -26 V-32.5 Q-17 -36 -13.5 -36 H13.5 Q17 -36 17 -32.5 V-26 Z" className={T2} />
      <path d="M-8 -40 V-32 M8 -40 V-32" className={L} strokeWidth="2.5" />
      {[-9, 0, 9].flatMap((x) => [-18, -9].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.8" className={S} />))}
    </>
  )),

  // Спорт и музыка
  ball: def('мяч', 18, 18, () => (
    <>
      <circle cx="0" cy="-9" r="9" className={T} />
      <path d="M-6.4 -15.4 C-2 -11.5 -2 -6.5 -6.4 -2.6 M6.4 -15.4 C2 -11.5 2 -6.5 6.4 -2.6" className={L} />
    </>
  )),
  football: def('футбольный мяч', 34, 34, () => (
    <>
      <circle cx="0" cy="-17" r="16.5" className={T} />
      <path d={PENTA.map(([x, y]) => `M${x} ${y}L${r2(x * 1.9)} ${r2(-17 + (y + 17) * 1.9)}`).join('')} className={L} />
      <path d={poly(PENTA)} className={S} />
      {ring(0, -17, 16.5, 5, 0.5).map(([x, y], i) => (
        <path key={i} d={poly(ring(x, y, 5, 5, 0.5))} className={S} clipPath="url(#st-football)" />
      ))}
      <clipPath id="st-football">
        <circle cx="0" cy="-17" r="15.6" />
      </clipPath>
    </>
  )),
  guitar: def('гитара', 28, 56, () => (
    <g transform="rotate(18)">
      <rect x="-2.25" y="-50" width="4.5" height="22" rx="1" className={T2} />
      <rect x="-3.5" y="-57" width="7" height="8" rx="1.5" className={T} />
      <path d="M0 -34 C6 -34 9 -30 8 -25 C7 -22 7 -21 9 -19 C14 -16 13 0 0 0 C-13 0 -14 -16 -9 -19 C-7 -21 -7 -22 -8 -25 C-9 -30 -6 -34 0 -34 Z" className={T} />
      <circle cx="0" cy="-17" r="4" className={V} />
      <path d="M-5 -7 H5" className={L} strokeWidth="2.5" />
    </g>
  )),
  piano: def('пианино', 52, 38, () => (
    <>
      <path d="M-21 -4 V0 M21 -4 V0" className={L} />
      <rect x="-24" y="-38" width="48" height="34" rx="3" className={T} />
      <rect x="-26" y="-22" width="52" height="9" rx="1.5" className={T2} />
      {[-19, -12, -2, 5, 12, 19].map((x) => (
        <rect key={x} x={x - 1.6} y="-22" width="3.2" height="5.5" className="st-void" />
      ))}
    </>
  )),
  racket: def('ракетка', 28, 46, () => (
    <g transform="rotate(-20)">
      <rect x="-2.75" y="-18" width="5.5" height="18" rx="2" className={T2} />
      <ellipse cx="0" cy="-31" rx="11" ry="13.5" className={T} />
      <path d="M-5 -42.8 V-19.2 M0 -44 V-18 M5 -42.8 V-19.2 M-9.6 -37 H9.6 M-11 -31 H11 M-9.6 -25 H9.6" className={L} strokeWidth="1.25" />
    </g>
  )),
}

// Дополнительные предметы разделов: src/illustrations/kit/extra/<раздел>.tsx с export const EXTRA. Имена не должны пересекаться.
const extras = import.meta.glob<{ EXTRA: Record<string, PropDef> }>('./extra/*.tsx', { eager: true })

export const PROPS: Record<string, PropDef> = { ...BASE }
for (const mod of Object.values(extras)) Object.assign(PROPS, mod.EXTRA)

interface Props {
  name: string
  x: number
  y: number
  s?: number
  flip?: boolean
  /** Выделить предмет цветом части речи (обычно noun). */
  hl?: boolean
  pos?: Pos
  dim?: boolean
}

export function Prop({ name, x, y, s = 1, flip, hl, pos, dim }: Props) {
  const def = PROPS[name]
  if (!def) return <text x={x} y={y} className="st-label st-muted">{`?${name}`}</text>
  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}
      className={`st-prop${hl ? ' st-hl' : ''}${dim ? ' st-dim' : ''}`}
      data-pos={hl ? (pos ?? 'noun') : undefined}
    >
      {def.draw()}
    </g>
  )
}

/** Несколько одинаковых предметов в ряд: «много», «один из многих». hlIndex — какой из них выделен. */
export function Many({ name, n, x, y, gap = 34, s = 1, hlIndex, pos }: { name: string; n: number; x: number; y: number; gap?: number; s?: number; hlIndex?: number; pos?: Pos }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <Prop key={i} name={name} x={x + i * gap} y={y} s={s} hl={i === hlIndex} pos={pos} dim={hlIndex !== undefined && i !== hlIndex} />
      ))}
    </>
  )
}
