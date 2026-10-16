import type { Pos } from '../../content/types'
import { Arrow, Frame, Person, Prop, Scene } from '../kit'
import type { TopicStories } from '../types'

// Лесенка: слева сцена, справа предложение по строкам. Номер на строке и тот же номер на части сцены:
// 1 — кто, 2 — что делает, 3 — где / какой, 4 — когда. Отступ строки — к чему она относится.
// Цвет — только у слова, о котором кадр (цвет его части речи).

type Seg = string | { t: string; pos: Pos }
interface Line {
  indent: number
  segs: Seg[]
  tag: number
  dim?: boolean
}

const X0 = 182
const STEP = 8
const Y0 = 62
const DY = 28

function Tag({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={8.5} className="st-thing2" />
      <text x={x} y={y + 4} textAnchor="middle" className="st-label" fontSize={11} fontWeight={700}>
        {n}
      </text>
    </g>
  )
}

/** Предложение лесенкой: каждая строка — со своим номером слева. */
function Ladder({ lines }: { lines: Line[] }) {
  return (
    <g>
      {lines.map((l, i) => {
        const y = Y0 + i * DY
        return (
          <g key={i} className={l.dim ? 'st-dim' : undefined}>
            <Tag x={X0 - 12} y={y - 4} n={l.tag} />
            <text x={X0 + l.indent * STEP} y={y} className="st-label" fontSize={11.5} fontWeight={600}>
              {l.segs.map((s, k) =>
                typeof s === 'string' ? (
                  s
                ) : (
                  <tspan key={k} data-pos={s.pos} style={{ fill: 'var(--pt)' }}>
                    {s.t}
                  </tspan>
                ),
              )}
            </text>
          </g>
        )
      })}
    </g>
  )
}

export default [
  {
    id: 'cascade-reading.core-first',
    title: 'Длинное предложение: сначала ядро, потом довески',
    focus: ['cascade', 'block'],
    frames: [
      {
        scene: (
          <Scene label="Слева Том стоит у автобуса, стрелка waited ведёт к автобусу; справа предложение двумя строками: Tom и waited for the bus">
            <Person x={28} y={168} pose="stand" s={1.25} />
            <Prop name="bus" x={128} y={168} s={1.2} />
            <Arrow from={[58, 122]} to={[98, 128]} tone="action" bend={-8} />
            <Tag x={28} y={62} n={1} />
            <Tag x={128} y={100} n={2} />
            <Ladder
              lines={[
                { indent: 0, tag: 1, segs: ['Tom'] },
                { indent: 1, tag: 2, segs: [{ t: 'waited', pos: 'verb' }, ' for the bus'] },
              ]}
            />
          </Scene>
        ),
        en: 'Tom_N {waited_V} for_I the_D bus_N .',
        ru: 'Ядро короткое: 1 — кто (Tom), 2 — что делает (waited for the bus). Подлежащее левее, сказуемое — на ступеньку правее.',
      },
      {
        scene: (
          <Scene label="К той же сцене добавлен дождь над ними; в лесенке новая строка in the rain глубже сказуемого">
            <Prop name="rain" x={84} y={96} s={1.3} />
            <Person x={28} y={168} pose="stand" s={1.25} />
            <Prop name="bus" x={128} y={168} s={1.2} />
            <Arrow from={[58, 122]} to={[98, 128]} tone="dim" bend={-8} />
            <Tag x={28} y={62} n={1} />
            <Tag x={128} y={100} n={2} />
            <Tag x={84} y={32} n={3} />
            <Ladder
              lines={[
                { indent: 0, tag: 1, segs: ['Tom'] },
                { indent: 1, tag: 2, segs: ['waited for the bus'] },
                { indent: 2, tag: 3, segs: [{ t: 'in', pos: 'prep' }, ' the rain'] },
              ]}
            />
          </Scene>
        ),
        en: 'Tom_N waited_V for_I the_D bus_N {in_I} the_D rain_N .',
        ru: 'Довесок «где?» (in the rain) — новая строка 3, ещё правее: она поясняет сказуемое, а ядро не меняет.',
      },
      {
        scene: (
          <Scene label="Том держит звонящий телефон; в лесенке новая строка when his phone rang на уровне сказуемого, у неё свой глагол">
            <Prop name="rain" x={84} y={96} s={1.3} />
            <Person x={28} y={168} pose="hold" s={1.25} />
            <Prop name="phone" x={62} y={142} s={0.7} />
            <path d="M76 108 q6 6 0 12 M83 103 q9 10 0 22" className="st-line" />
            <Prop name="bus" x={132} y={168} s={1.1} dim />
            <Tag x={28} y={62} n={1} />
            <Tag x={84} y={32} n={3} />
            <Tag x={130} y={126} n={2} />
            <Tag x={100} y={112} n={4} />
            <Ladder
              lines={[
                { indent: 0, tag: 1, segs: ['Tom'] },
                { indent: 1, tag: 2, segs: ['waited for the bus'] },
                { indent: 2, tag: 3, segs: ['in the rain'] },
                { indent: 1, tag: 4, segs: [{ t: 'when', pos: 'conj' }, ' his phone rang'] },
              ]}
            />
          </Scene>
        ),
        en: 'Tom_N waited_V for_I the_D bus_N in_I the_D rain_N {when_C} his_P phone_N rang_V .',
        ru: 'when открывает свой кусок: свой кто (phone) и свой глагол (rang). Строка 4 — на уровне сказуемого: это довесок к waited.',
      },
    ],
  },
  {
    id: 'cascade-reading.who-clause',
    title: 'who lives upstairs: придаточное про слово',
    focus: ['cascade', 'block'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Дом из двух этажей: наверху человек у пианино, внизу другой человек; строка who lives upstairs висит под The man">
            <Frame x={14} y={22} w={148} h={148} />
            <line x1="14" x2="162" y1="96" y2="96" className="st-ground" />
            <Person x={52} y={92} pose="stand" s={0.85} hl pos="pron" />
            <Prop name="piano" x={118} y={92} s={0.9} />
            <Person x={52} y={166} pose="stand" s={0.85} tone={2} dim />
            <Tag x={26} y={56} n={1} />
            <Tag x={28} y={96} n={2} />
            <Tag x={118} y={48} n={3} />
            <Ladder
              lines={[
                { indent: 0, tag: 1, segs: ['The man'] },
                { indent: 1, tag: 2, segs: [{ t: 'who', pos: 'pron' }, ' lives upstairs'] },
                { indent: 0, tag: 3, segs: ['plays the piano'] },
              ]}
            />
          </Scene>
        ),
        en: 'The_D man_N {who_P} lives_V upstairs_R plays_V the_D piano_N .',
        ru: 'who lives upstairs — не новая мысль, а пояснение к man: какой из двух. Строка висит под man со сдвигом вправо.',
      },
      {
        scene: (
          <Scene ground={false} label="Тот же дом: нижний этаж и подпись who lives upstairs приглушены; остаётся ядро: человек и пианино, сказуемое plays">
            <Frame x={14} y={22} w={148} h={148} />
            <line x1="14" x2="162" y1="96" y2="96" className="st-ground" />
            <Person x={52} y={92} pose="stand" s={0.85} />
            <Prop name="piano" x={118} y={92} s={0.9} />
            <Arrow from={[78, 58]} to={[100, 66]} tone="action" bend={-6} />
            <Person x={52} y={166} pose="stand" s={0.85} tone={2} dim />
            <Tag x={26} y={56} n={1} />
            <Tag x={118} y={48} n={3} />
            <Ladder
              lines={[
                { indent: 0, tag: 1, segs: ['The man'] },
                { indent: 1, tag: 2, segs: ['who lives upstairs'], dim: true },
                { indent: 0, tag: 3, segs: [{ t: 'plays', pos: 'verb' }, ' the piano'] },
              ]}
            />
          </Scene>
        ),
        en: 'The_D man_N who_P lives_V upstairs_R {plays_V} the_D piano_N .',
        ru: 'Чтобы найти ядро, вычеркни придаточное: The man … plays the piano. Сказуемое главной части — plays, а не lives.',
      },
    ],
  },
] satisfies TopicStories
