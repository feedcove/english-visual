import { Label, Prop, Scene, Spot } from '../kit'
import type { TopicStories } from '../types'

// in / on / at: внутри объёма, на поверхности, в точке. Выделено место (коробка, стол, точка у двери) — цветом предлога.
// В углу — значок-схема: квадрат с точкой внутри, точка на линии, точка-мишень.

function Glyph({ kind }: { kind: 'in' | 'on' | 'at' }) {
  return (
    <g transform="translate(26 22)">
      {kind === 'in' && <rect x="0" y="0" width="30" height="30" rx="5" className="st-line" />}
      {kind === 'on' && <path d="M0 30 H30" className="st-line" strokeWidth="2.5" />}
      {kind === 'at' && <circle cx="15" cy="15" r="13" className="st-line" strokeDasharray="3 3" />}
      <circle cx="15" cy={kind === 'on' ? 24 : 15} r="5" className="st-solid" />
      <Label x={40} y={21} anchor="start" size={15} pos="prep">
        {kind}
      </Label>
    </g>
  )
}

export default [
  {
    id: 'prep-place.in-on-at',
    title: 'in / on / at: внутри, на поверхности, в точке',
    focus: ['in', 'on', 'at'],
    frames: [
      {
        scene: (
          <Scene label="Кошка сидит внутри коробки, видна только голова">
            <Glyph kind="in" />
            <Prop name="cat" x={160} y={132} s={1.5} />
            <Prop name="box" x={160} y={168} s={2} hl pos="prep" />
          </Scene>
        ),
        en: 'The_D cat_N is_V {in_I} the_D box_N .',
        ru: 'Со всех сторон стенки — кошка внутри объёма. Внутри — in.',
      },
      {
        scene: (
          <Scene label="Кошка сидит на столе, сверху на его поверхности">
            <Glyph kind="on" />
            <Prop name="table" x={160} y={168} s={1.8} hl pos="prep" />
            <Prop name="cat" x={160} y={107} s={1.35} />
          </Scene>
        ),
        en: 'The_D cat_N is_V {on_I} the_D table_N .',
        ru: 'Кошка касается поверхности сверху. На поверхности — on.',
      },
      {
        scene: (
          <Scene label="Кошка сидит у двери; кольцо отмечает место-точку">
            <Glyph kind="at" />
            <Prop name="door" x={226} y={168} s={2} />
            <Prop name="cat" x={150} y={168} s={1.35} />
            <Spot x={152} y={140} r={38} pos="prep" />
          </Scene>
        ),
        en: 'The_D cat_N is_V {at_I} the_D door_N .',
        ru: 'Не внутри и не сверху — просто у двери. Место как точка, где кто-то находится, — at.',
      },
    ],
  },
] satisfies TopicStories
