import type { Pos } from '../../content/types'

// Человечек: ноги в точке (0, 0), рост ~74. Лицо смотрит вправо; влево — flip.
// Конечности — толстые скруглённые линии с обводкой (как у пиктограмм), кисть — кружок.
// tone различает людей нейтральными оттенками (цвет занят частями речи). hl — выделение цветом части речи (pos).
// he / she различимы без цвета: hair="long" — длинные волосы до плеч и платье-трапеция, short — короткая стрижка.

export type Pose = 'stand' | 'walk' | 'run' | 'sit' | 'point' | 'think' | 'talk' | 'wave' | 'hold' | 'sleep' | 'give' | 'look'

const TONES = ['var(--n6)', 'var(--n8)', 'var(--n5)', 'var(--n10)'] as const

type Pt = [number, number]

interface Props {
  x: number
  y: number
  pose?: Pose
  flip?: boolean
  s?: number
  tone?: 0 | 1 | 2 | 3
  /** Выделить человека цветом части речи (например, pron — «он» в этом кадре). */
  hl?: boolean
  pos?: Pos
  /** Длинные волосы / короткие — чтобы различать he и she без цвета. */
  hair?: 'short' | 'long' | 'none'
  dim?: boolean
}

export function Person({ x, y, pose = 'stand', flip, s = 1, tone = 0, hl, pos, hair = 'short', dim }: Props) {
  const body = TONES[tone]
  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}
      className={`st-person${hl ? ' st-hl' : ''}${dim ? ' st-dim' : ''}`}
      data-pos={hl ? (pos ?? 'pron') : undefined}
    >
      {pose === 'sleep' ? (
        // Лежит на полу головой влево, глаза закрыты.
        <g transform="translate(36 -15) rotate(-90)">
          <PersonBody body={body} hair={hair} pose="stand" />
        </g>
      ) : (
        <PersonBody body={body} hair={hair} pose={pose} />
      )}
    </g>
  )
}

const line = (pts: Pt[]) => pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px} ${py}`).join('')

/** Конечность: широкая обводка снизу, цвет тела сверху. */
function Limb({ pts, body, hand }: { pts: Pt[]; body: string; hand?: boolean }) {
  const d = line(pts)
  const [hx, hy] = pts[pts.length - 1]!
  return (
    <>
      <path d={d} className="st-limb-o" />
      <path d={d} className="st-limb" stroke={body} />
      {hand && <circle cx={hx} cy={hy} r="3.1" className="st-hand" fill={body} />}
    </>
  )
}

function PersonBody({ body, hair, pose }: { body: string; hair: Props['hair']; pose: Pose }) {
  const [front, back] = ARMS[pose]
  const [legA, legB] = LEGS[pose]
  const she = hair === 'long'
  const lean = pose === 'run' ? -10 : pose === 'walk' ? -3 : 0
  return (
    <g transform={`skewX(${lean})`}>
      <Limb pts={back} body={body} hand />
      <Limb pts={legA} body={body} />
      <Limb pts={legB} body={body} />
      {she && <path d={HAIR_BACK} className="st-hair" />}
      <path d={she ? DRESS : TORSO} fill={body} className="st-body" />
      <circle cx="0" cy="-62" r="11" fill={body} className="st-head" />
      {hair !== 'none' && <path d={she ? FRINGE_LONG : HAIR_SHORT} className="st-hair" />}
      {pose === 'sleep' ? <path d="M3 -63 H8" className="st-eye-line" /> : <circle cx="5.5" cy="-63" r="1.9" className="st-eye" />}
      {pose === 'talk' && <path d="M6 -56.5 Q8.5 -55 10 -57" className="st-eye-line" />}
      <Limb pts={front} body={body} hand />
    </g>
  )
}

// Туловище: скруглённая капсула плеч; у неё — трапеция-платье.
const TORSO = 'M-11 -40 Q-11 -49 -3 -49 H3 Q11 -49 11 -40 V-22 Q11 -18 7 -18 H-7 Q-11 -18 -11 -22 Z'
const DRESS = 'M-10 -41 Q-10 -49 -3 -49 H3 Q10 -49 10 -41 L15 -18 Q15.5 -15 12 -15 H-12 Q-15.5 -15 -15 -18 Z'
// Короткая стрижка: шапочка с чёлкой. Длинные: задняя часть до плеч + чёлка поверх головы.
const HAIR_SHORT = 'M-11.6 -60 C-13 -72 -5 -77 2 -76 C9 -75.5 13 -71 12 -64 C8 -67.5 2 -68.5 -3 -67 C-6 -66 -9 -63.5 -11.6 -60 Z'
const HAIR_BACK = 'M-12.5 -62 C-13 -78 13 -78 12.5 -62 L13 -46 Q13 -42 9 -42 H-9 Q-13 -42 -13.5 -46 Z'
const FRINGE_LONG = 'M-12 -58 C-13.5 -73 -5 -77 2 -76.2 C9 -75.5 13 -71 12.2 -63 C7 -68 0 -69.5 -5 -66 C-8 -63.5 -10 -61 -12 -58 Z'

// Ноги: от бедра к стопе, стопа носком вперёд (вправо).
const LEG_L: Pt = [-5, -20]
const LEG_R: Pt = [5, -20]
const LEGS_STAND: [Pt[], Pt[]] = [
  [LEG_L, [-5, 0], [-1, 0]],
  [LEG_R, [5, 0], [9, 0]],
]
const LEGS: Record<Pose, [Pt[], Pt[]]> = {
  stand: LEGS_STAND,
  point: LEGS_STAND,
  think: LEGS_STAND,
  talk: LEGS_STAND,
  wave: LEGS_STAND,
  hold: LEGS_STAND,
  give: LEGS_STAND,
  look: LEGS_STAND,
  sleep: LEGS_STAND,
  walk: [
    [[-4, -20], [-12, 0], [-8, 0]],
    [[4, -20], [11, 0], [15, 0]],
  ],
  run: [
    [[-4, -20], [-10, -9], [-21, -7]],
    [[4, -20], [17, -13], [16, 0], [20, 0]],
  ],
  // Сидит на стуле: сиденье на y = -20, колени вперёд.
  sit: [
    [[-5, -20], [14, -20], [14, 0], [18, 0]],
    [[5, -20], [19, -20], [19, 0], [23, 0]],
  ],
}

// Руки: [передняя (правая, к взгляду), задняя]. Плечи на (±10, -44). Последняя точка передней — кисть (HAND).
const BACK_DOWN: Pt[] = [[-10, -44], [-14, -24]]
const ARMS: Record<Pose, [Pt[], Pt[]]> = {
  stand: [[[10, -44], [14, -24]], BACK_DOWN],
  walk: [[[10, -44], [19, -28]], [[-10, -44], [-18, -28]]],
  run: [[[10, -44], [21, -38], [27, -50]], [[-10, -44], [-19, -34], [-26, -38]]],
  sit: [[[10, -44], [16, -32], [24, -30]], [[-10, -44], [-10, -27]]],
  point: [[[10, -44], [38, -52]], BACK_DOWN],
  think: [[[10, -44], [17, -33], [9, -53]], BACK_DOWN],
  talk: [[[10, -44], [19, -34], [29, -40]], BACK_DOWN],
  wave: [[[10, -44], [21, -56], [21, -74]], BACK_DOWN],
  hold: [[[10, -44], [15, -31], [28, -32]], BACK_DOWN],
  give: [[[10, -44], [36, -38]], BACK_DOWN],
  look: [[[10, -44], [24, -55], [17, -70]], BACK_DOWN], // ладонь козырьком перед лбом
  sleep: [[[10, -44], [14, -24]], BACK_DOWN],
}

/** Точка, где рука держит или куда указывает (для предметов и стрелок). У sleep кисти нет. */
export const HAND: Partial<Record<Pose, [number, number]>> = Object.fromEntries(
  (Object.keys(ARMS) as Pose[]).filter((p) => p !== 'sleep').map((p) => [p, ARMS[p][0][ARMS[p][0].length - 1]!]),
)
