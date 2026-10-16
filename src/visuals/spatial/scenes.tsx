import type { ReactNode } from 'react'
import { Ball } from './shared'

// Сцены предлогов места: шар (траектор) и серый ориентир. Система координат 120 × 84, радиус шара 9.
// Те же три образа (контейнер / поверхность / точка) используются в prep-time.

export type PlaceId = 'in' | 'on' | 'at' | 'under' | 'above' | 'next-to' | 'between' | 'behind' | 'in-front-of' | 'opposite'

export const PLACE_SCENES: Record<PlaceId, () => ReactNode> = {
  // in — шар внутри контейнера
  in: () => (
    <>
      <rect className="vsp-wall" x={22} y={14} width={76} height={58} rx={9} />
      <Ball x={60} y={52} />
    </>
  ),
  // on — шар лежит на поверхности
  on: () => (
    <>
      <rect className="vsp-slab" x={12} y={60} width={96} height={9} rx={3} />
      <Ball x={60} y={51} />
    </>
  ),
  // at — шар ровно в точке: перекрестие, центр которого виден как тёмная точка в шаре
  at: () => (
    <>
      <path className="vsp-cross" d="M32 42H88M60 14V70" />
      <Ball x={60} y={42} />
      <circle className="vsp-pin" cx={60} cy={42} r={3} />
    </>
  ),
  // under — ориентир сверху, шар ниже с зазором
  under: () => (
    <>
      <rect className="vsp-slab" x={12} y={16} width={96} height={9} rx={3} />
      <Ball x={60} y={56} />
    </>
  ),
  // above — шар выше ориентира, не касаясь
  above: () => (
    <>
      <rect className="vsp-slab" x={12} y={62} width={96} height={9} rx={3} />
      <Ball x={60} y={28} />
    </>
  ),
  // next to — рядом, на одном уровне
  'next-to': () => (
    <>
      <rect className="vsp-lm" x={14} y={30} width={34} height={38} rx={6} />
      <Ball x={68} y={59} />
    </>
  ),
  // between — между двумя ориентирами
  between: () => (
    <>
      <rect className="vsp-lm" x={10} y={30} width={28} height={38} rx={6} />
      <rect className="vsp-lm" x={82} y={30} width={28} height={38} rx={6} />
      <Ball x={60} y={59} />
    </>
  ),
  // behind — шар частично закрыт ориентиром
  behind: () => (
    <>
      <Ball x={40} y={52} />
      <rect className="vsp-lm" x={48} y={22} width={50} height={46} rx={6} />
    </>
  ),
  // in front of — шар закрывает часть ориентира
  'in-front-of': () => (
    <>
      <rect className="vsp-lm" x={24} y={22} width={50} height={46} rx={6} />
      <Ball x={70} y={54} />
    </>
  ),
  // opposite — друг напротив друга через полосу (стол, улица); пунктир — линия взгляда
  opposite: () => (
    <>
      <rect className="vsp-slab" x={52} y={6} width={16} height={72} rx={3} />
      <rect className="vsp-lm" x={88} y={26} width={22} height={32} rx={5} />
      <path className="vsp-guide" d="M34 42H84" />
      <Ball x={22} y={42} />
    </>
  ),
}
