import { Arrow, CalendarPage, Clock, Frame, Label, Prop, Scene, Spot, TimeAxis } from '../kit'
import type { TopicStories } from '../types'

// Тот же образ, что у мест (prep-place): at — точка, on — поверхность-день, in — контейнер-период.
// Выделен предлог (цвет prep): кольцо вокруг точки, рамка вокруг дня, рамка вокруг периода.
// В углу — значок-схема, как у prep-place. Без предлога (next week) — зачёркнутые at / on / in над осью.

type Kind = 'in' | 'on' | 'at'

function Glyph({ kind, x = 26, y = 22 }: { kind: Kind; x?: number; y?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
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

/** Сутки тремя частями: утро / день / вечер. Солнце поднимается и садится. hl — выделенная часть. */
function DayBar({ hl }: { hl: 0 | 1 | 2 }) {
  const cells = [
    { x: 28, name: 'morning', sun: 104 },
    { x: 116, name: 'afternoon', sun: 92 },
    { x: 204, name: 'evening', sun: 104 },
  ]
  return (
    <>
      {cells.map((c, i) => (
        <g key={c.name}>
          <Prop name="sun" x={c.x + 44} y={c.sun} s={0.7} dim={i !== hl} />
          <g data-pos={i === hl ? 'prep' : undefined} className={i === hl ? 'st-hl' : undefined}>
            <rect x={c.x} y={116} width={88} height={36} rx={8} className="st-thing" />
          </g>
          <Label x={c.x + 44} y={170} size={13} muted={i !== hl} pos={i === hl ? 'prep' : undefined}>
            {c.name}
          </Label>
        </g>
      ))}
    </>
  )
}

export default [
  {
    id: 'prep-time.at-on-in',
    title: 'at, on, in: точка, день, период',
    focus: ['at', 'on', 'in'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Часы показывают 7.30; кольцо отмечает один момент — точку на времени">
            <Glyph kind="at" />
            <Clock x={160} y={104} r={40} h={7} m={30} />
            <Spot x={160} y={104} r={54} pos="prep" />
            <Label x={160} y={184} size={16} pos="prep">
              at 7.30
            </Label>
          </Scene>
        ),
        en: 'The_D film_N starts_V {at_I} 7.30_M .',
        ru: 'Момент на часах — точка. Точное время — at.',
      },
      {
        scene: (
          <Scene ground={false} label="Листок календаря с днём Mon; рамка вокруг него — день как поверхность">
            <Glyph kind="on" />
            <CalendarPage x={160} y={152} day="Mon" s={1.7} />
            <Frame x={100} y={34} w={120} h={130} pos="prep" />
            <Label x={160} y={186} size={16} pos="prep">
              on Monday
            </Label>
          </Scene>
        ),
        en: 'We_P have_V a_D meeting_N {on_I} Monday_N .',
        ru: 'День — целая поверхность, на ней что-то происходит. День и дата — on.',
      },
      {
        scene: (
          <Scene ground={false} label="Месяц June — большая рамка, внутри много дней; событие где-то внутри периода">
            <Glyph kind="in" />
            <Frame x={62} y={58} w={196} h={116} pos="prep" />
            <Label x={78} y={82} anchor="start" size={15}>
              June
            </Label>
            {Array.from({ length: 21 }, (_, i) => (
              <rect key={i} x={77 + (i % 7) * 25} y={92 + Math.floor(i / 7) * 26} width={19} height={20} rx={4} className="st-thing" />
            ))}
            <circle cx={77 + 3 * 25 + 9.5} cy={92 + 26 + 10} r={5} className="st-solid" />
            <Label x={160} y={190} size={16} pos="prep">
              in June
            </Label>
          </Scene>
        ),
        en: 'Our_P holiday_N starts_V {in_I} June_N .',
        ru: 'Месяц — контейнер: внутри много дней. Период (месяц, год, сезон) — in.',
      },
      {
        scene: (
          <Scene ground={false} label="Три вложенные рамки: июнь, внутри понедельник, внутри часы на 9.00">
            <Frame x={14} y={32} w={292} h={156} label="in June" />
            <Frame x={36} y={66} w={248} h={110} label="on Monday" />
            <Frame x={58} y={100} w={204} h={66} pos="prep" label="at 9.00" />
            <Clock x={160} y={134} r={24} h={9} m={0} />
          </Scene>
        ),
        en: 'The_D concert_N starts_V {at_I} nine_M on_I Monday_N in_I June_N .',
        ru: 'Как матрёшка: от широкого к узкому. Месяц — in, день — on, час — at.',
      },
    ],
  },
  {
    id: 'prep-time.morning-trap',
    title: 'in the morning, но on Monday morning',
    focus: ['in', 'on', 'at'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Сутки из трёх частей: утро выделено, день недели не назван">
            <Glyph kind="in" x={230} y={14} />
            <DayBar hl={0} />
          </Scene>
        ),
        en: 'I_P read_V the_D news_N {in_I} the_D morning_N .',
        ru: 'Часть суток сама по себе — период внутри суток. Предлог in.',
      },
      {
        scene: (
          <Scene ground={false} label="Те же три части, но вокруг рамка Monday: назван день, и день стал поверхностью">
            <Glyph kind="on" x={230} y={14} />
            <Frame x={16} y={48} w={288} h={134} label="Monday" />
            <DayBar hl={0} />
          </Scene>
        ),
        en: 'I_P have_V a_D lesson_N {on_I} Monday_N morning_N .',
        ru: 'Назвали день — утро стало его частью. Для дня работает on, значит и для «утра этого дня».',
      },
      {
        scene: (
          <Scene ground={false} label="Три строки: утром — in the morning, в понедельник утром — on Monday morning, ночью — at night">
            <Prop name="sun" x={34} y={64} s={0.8} dim />
            <Label x={62} y={42} anchor="start" size={12} muted>
              утром
            </Label>
            <Label x={62} y={64} anchor="start" size={16}>
              in the morning
            </Label>
            <Frame x={12} y={76} w={296} h={50} pos="prep" />
            <Prop name="calendar-page" x={34} y={118} s={0.8} dim />
            <Label x={62} y={96} anchor="start" size={12} muted>
              в понедельник утром
            </Label>
            <Label x={62} y={118} anchor="start" size={16}>
              on Monday morning
            </Label>
            <Prop name="moon" x={34} y={176} s={0.8} dim />
            <Label x={62} y={152} anchor="start" size={12} muted>
              ночью
            </Label>
            <Label x={62} y={174} anchor="start" size={16}>
              at night
            </Label>
          </Scene>
        ),
        en: 'I_P saw_V her_P {on_I} Monday_N morning_N .',
        ru: 'По-русски «утром» и «ночью» — без предлога, «в» есть только у дня. По-английски день тянет за собой on, а «ночью» — устойчивое at night.',
      },
    ],
  },
  {
    id: 'prep-time.no-prep',
    title: 'next week, last year, every day: без предлога',
    focus: ['no-prep'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Над осью времени зачёркнуты at, on, in; справа от NOW отрезок week, на него указывает слово next">
            <Label x={160} y={46} size={22} muted>
              at · on · in
            </Label>
            <path d="M102 48 L218 32" className="st-cross" />
            <TimeAxis x={24} y={130} w={272} now={0.4} zones={[{ from: 0.5, to: 0.92, label: 'week' }]} />
            <Label x={218} y={92} size={18} pos="adj">
              next
            </Label>
            <Arrow from={[218, 100]} to={[218, 114]} tone="ink" />
          </Scene>
        ),
        en: 'We_P +’ll_A meet_V {next_J} week_N .',
        ru: 'Слово next само показывает, когда: на отрезок справа от NOW. Предлог не нужен.',
      },
      {
        scene: (
          <Scene ground={false} label="Над осью времени зачёркнуты at, on, in; слева от NOW отрезок year, на него указывает слово last">
            <Label x={160} y={46} size={22} muted>
              at · on · in
            </Label>
            <path d="M102 48 L218 32" className="st-cross" />
            <TimeAxis x={24} y={130} w={272} now={0.7} zones={[{ from: 0.1, to: 0.5, label: 'year' }]} />
            <Label x={90} y={92} size={18} pos="adj">
              last
            </Label>
            <Arrow from={[90, 100]} to={[90, 114]} tone="ink" />
          </Scene>
        ),
        en: 'We_P went_V to_I Paris_N {last_J} year_N .',
        ru: 'Так же с last, this, every: last year, this summer, every day.',
      },
      {
        scene: (
          <Scene ground={false} label="Слева русский предлог на и в, справа английские next week и last year с зачёркнутым предлогом">
            <Frame x={22} y={22} w={30} h={30} pos="prep" />
            <Label x={37} y={44} size={16} pos="prep">
              на
            </Label>
            <Label x={62} y={44} anchor="start" size={16}>
              следующей неделе
            </Label>
            <Arrow from={[60, 58]} to={[60, 74]} tone="ink" />
            <Label x={36} y={96} anchor="start" size={17} muted>
              on
            </Label>
            <path d="M32 98 L58 84" className="st-cross" />
            <Label x={72} y={96} anchor="start" size={17}>
              next week
            </Label>
            <Label x={37} y={134} size={16}>
              в
            </Label>
            <Label x={62} y={134} anchor="start" size={16}>
              прошлом году
            </Label>
            <Arrow from={[60, 148]} to={[60, 164]} tone="ink" />
            <Label x={36} y={186} anchor="start" size={17} muted>
              in
            </Label>
            <path d="M32 188 L54 174" className="st-cross" />
            <Label x={72} y={186} anchor="start" size={17}>
              last year
            </Label>
          </Scene>
        ),
        en: 'Увидимся_V {на_I} следующей_J неделе_N .',
        lang: 'ru',
        ru: 'Русский просит «на» и «в». Английский — нет: next week, last year без предлога.',
      },
    ],
  },
] satisfies TopicStories
