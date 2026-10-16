import { Arrow, Check, Cross, Frame, GROUND, Label, PROPS, Prop, Scene } from '../kit'
import type { Pos } from '../../content/types'
import type { TopicStories } from '../types'

// Порядок прилагательных: слова-«бусины» стоят в ряд слева направо в порядке слотов и упираются в существительное.
// Под каждой бусиной — её слот (мнение, размер, возраст…). Выделена одна бусина кадра цветом своей части речи.

interface Bead {
  t: string
  /** Название слота под бусиной. */
  slot: string
  pos?: Pos
}

const beadW = (t: string) => 16 + 8.2 * t.length
const ROW = 88

/** Ряд бусин от x0 вправо и стрелка к верху существительного (name в точке nounX, масштаб s). */
function Beads({ beads, x0, noun, nounX, s }: { beads: Bead[]; x0: number; noun: string; nounX: number; s: number }) {
  let x = x0
  const parts = beads.map((b) => {
    const w = beadW(b.t)
    const cx = x + w / 2
    x += w + 10
    return (
      <g key={b.t}>
        <Frame x={cx - w / 2} y={ROW - 14} w={w} h={28} pos={b.pos} />
        <Label x={cx} y={ROW + 5} size={15} pos={b.pos}>
          {b.t}
        </Label>
        <Label x={cx} y={ROW + 32} size={11} muted>
          {b.slot}
        </Label>
      </g>
    )
  })
  const topY = GROUND - PROPS[noun]!.h * s
  return (
    <>
      {parts}
      <Arrow from={[x - 4, ROW]} to={[nounX - 6, topY - 6]} bend={-14} />
      <Prop name={noun} x={nounX} y={GROUND} s={s} />
    </>
  )
}

export default [
  {
    id: 'adj-order.slots',
    title: 'a lovely big old house: слова стоят по слотам',
    focus: ['opinion', 'size', 'age'],
    frames: [
      {
        scene: (
          <Scene label="Три слова-бусины подряд: lovely — мнение, big — размер, old — возраст. Дальше дом">
            <Beads
              beads={[
                { t: 'lovely', slot: 'мнение', pos: 'adj' },
                { t: 'big', slot: 'размер' },
                { t: 'old', slot: 'возраст' },
              ]}
              x0={18}
              noun="house"
              nounX={256}
              s={1.7}
            />
          </Scene>
        ),
        en: 'We_P live_V in_I a_D {lovely_J} big_J old_J house_N .',
        ru: 'Ряд идёт к существительному по слотам. Мнение (что я думаю) стоит первым, дальше размер, потом возраст.',
      },
      {
        scene: (
          <Scene ground={false} label="По-русски оба порядка «большой старый дом» и «старый большой дом» верны. По-английски верно только a big old house, а an old big house зачёркнуто">
            <Label x={26} y={26} anchor="start" size={12} muted>
              по-русски
            </Label>
            <Label x={40} y={52} anchor="start" size={16}>
              большой старый дом
            </Label>
            <Check x={288} y={47} size={16} />
            <Label x={40} y={80} anchor="start" size={16}>
              старый большой дом
            </Label>
            <Check x={288} y={75} size={16} />
            <Label x={26} y={116} anchor="start" size={12} muted>
              in English
            </Label>
            <Label x={40} y={142} anchor="start" size={16}>
              a
            </Label>
            <Label x={58} y={142} anchor="start" size={16} pos="adj">
              big
            </Label>
            <Label x={90} y={142} anchor="start" size={16}>
              old house
            </Label>
            <Check x={288} y={137} size={16} />
            <Label x={40} y={170} anchor="start" size={16} muted>
              an old big house
            </Label>
            <Cross x={288} y={165} size={15} />
          </Scene>
        ),
        en: 'We_P have_V a_D {big_J} old_J house_N .',
        ru: 'По-русски прилагательные можно переставлять. В английском слоты стоят намертво: размер раньше возраста.',
      },
    ],
  },
  {
    id: 'adj-order.near-noun',
    title: 'Ближе к существительному — материал, происхождение, назначение',
    focus: ['colour', 'origin', 'material', 'purpose'],
    frames: [
      {
        scene: (
          <Scene label="Бусины nice, small, wooden идут к столу; wooden, материал, стоит вплотную к столу">
            <Beads
              beads={[
                { t: 'nice', slot: 'мнение' },
                { t: 'small', slot: 'размер' },
                { t: 'wooden', slot: 'материал', pos: 'adj' },
              ]}
              x0={14}
              noun="table"
              nounX={264}
              s={1.5}
            />
          </Scene>
        ),
        en: 'We_P bought_V a_D nice_J small_J {wooden_J} table_N .',
        ru: 'Материал — часть самой вещи, поэтому он ближе всех к существительному. Мнение — самое дальнее.',
      },
      {
        scene: (
          <Scene label="Бусины lovely, red, Italian идут к машине; Italian, происхождение, вплотную к машине, цвет перед ним">
            <Beads
              beads={[
                { t: 'lovely', slot: 'мнение' },
                { t: 'red', slot: 'цвет' },
                { t: 'Italian', slot: 'откуда', pos: 'adj' },
              ]}
              x0={14}
              noun="car"
              nounX={256}
              s={1.8}
            />
          </Scene>
        ),
        en: 'He_P drives_V a_D lovely_J red_J {Italian_J} car_N .',
        ru: 'Цвет стоит раньше происхождения. Откуда вещь родом — ближе к самой вещи, чем её цвет.',
      },
      {
        scene: (
          <Scene label="Бусины nice, new, running идут к кроссовкам; running, назначение, вплотную к ним">
            <Beads
              beads={[
                { t: 'nice', slot: 'мнение' },
                { t: 'new', slot: 'возраст' },
                { t: 'running', slot: 'зачем', pos: 'noun' },
              ]}
              x0={14}
              noun="shoes"
              nounX={256}
              s={2.1}
            />
          </Scene>
        ),
        en: 'I_P need_V nice_J new_J {running_N} shoes_N .',
        ru: 'Для чего вещь — самое близкое к ней слово: running shoes. Слот «назначение» последний, сразу перед существительным.',
      },
    ],
  },
] satisfies TopicStories
