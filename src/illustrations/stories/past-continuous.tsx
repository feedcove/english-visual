import { Arrow, Clock, Label, Person, Prop, Scene, TimeAxis } from '../kit'
import type { TopicStories } from '../types'

// Past Continuous: волна в прошлом — действие уже шло, пока (в нужный момент) случалась точка Past Simple.
// Фон — волна, событие — точка поверх неё. Выделение — цветом глагола.

const AXIS = { x: 24, y: 34, w: 272, now: 0.8 }
// Момент в прошлом — часы прямо под волной: волна идёт вокруг этого момента.
const MOMENT = { x: 24, y: 36, w: 272, now: 0.82 }
const AT = 0.45
const AT_X = MOMENT.x + AT * MOMENT.w

export default [
  {
    id: 'past-continuous.background-event',
    title: 'Фон и событие: I was walking, когда пошёл дождь',
    focus: ['past.cont', 'past.simple'],
    frames: [
      {
        scene: (
          <Scene label="Волна в прошлом: человек идёт домой, процесс уже идёт">
            <TimeAxis {...AXIS} marks={[{ at: 0.32, kind: 'wave', hl: true, label: 'was walking' }]} />
            <Person x={64} y={168} pose="walk" s={1.3} />
            <Prop name="house" x={252} y={168} s={1.9} />
            <Arrow from={[108, 140]} to={[204, 140]} tone="motion" bend={-8} />
          </Scene>
        ),
        en: 'I_P was_A {walking_V} home_R .',
        ru: 'Идёт процесс: он начался раньше и ещё не закончился. Это фон — волна.',
      },
      {
        scene: (
          <Scene label="Поверх волны точка: начался дождь. Человек всё ещё идёт домой">
            <TimeAxis {...AXIS} marks={[{ at: 0.32, kind: 'wave' }, { at: 0.35, kind: 'dot', hl: true, label: 'started' }]} />
            <Person x={64} y={168} pose="walk" s={1.3} />
            <Prop name="rain" x={158} y={122} s={1.3} />
            <Prop name="house" x={252} y={168} s={1.9} />
            <Arrow from={[108, 140]} to={[204, 140]} tone="motion" bend={-8} />
          </Scene>
        ),
        en: 'I_P was_A walking_V home_R when_C it_P {started_V} to_X rain_V .',
        ru: 'Короткое событие падает на фон, как точка на волну. Событие — Past Simple, фон — Past Continuous.',
      },
      {
        scene: (
          <Scene ground={false} label="Две волны идут одновременно: Кейт ведёт машину, а я смотрю на карту">
            <TimeAxis x={88} y={40} w={216} now={0.88} marks={[{ at: 0.4, kind: 'wave', label: 'was driving' }]} />
            <TimeAxis x={88} y={118} w={216} now={0.88} marks={[{ at: 0.4, kind: 'wave', hl: true, label: 'was looking' }]} />
            <Prop name="car" x={44} y={58} s={1} />
            <Label x={44} y={78} muted size={15}>
              Kate
            </Label>
            <Prop name="map" x={44} y={136} s={1.1} />
            <Label x={44} y={156} muted size={15}>
              I
            </Label>
          </Scene>
        ),
        en: 'While_C Kate_N was_A driving_V , I_P was_A {looking_V} at_I the_D map_N .',
        ru: 'while — два фона сразу: обе волны идут рядом, и ни одна не кончилась. Поэтому оба глагола — was + -ing.',
      },
    ],
  },
  {
    id: 'past-continuous.at-moment',
    title: 'was / were + -ing: в нужный момент действие уже шло',
    focus: ['past.cont'],
    frames: [
      {
        scene: (
          <Scene label="Под волной на оси — часы, девять: в этот момент человек на диване уже смотрит телевизор">
            <TimeAxis {...MOMENT} marks={[{ at: AT, kind: 'wave', hl: true, label: 'was watching' }]} />
            <path d={`M${AT_X} 46V58`} className="st-axis" strokeDasharray="2 3" />
            <Clock x={AT_X} y={74} r={15} h={9} m={0} />
            <Label x={AT_X + 22} y={79} anchor="start" muted size={13}>
              at nine
            </Label>
            <Prop name="sofa" x={62} y={168} s={1.15} />
            <Person x={62} y={168} pose="sit" s={1.15} />
            <Prop name="tv" x={252} y={168} s={1.6} />
            <Arrow from={[108, 112]} to={[212, 112]} tone="ink" bend={-12} />
          </Scene>
        ),
        en: 'At_I nine_M I_P was_A {watching_V} TV_N .',
        ru: 'В девять действие уже шло: когда началось и кончилось — неважно. Для одного «я» — was.',
      },
      {
        scene: (
          <Scene label="Под волной на оси — часы, десять: в этот момент двое уже играют в мяч">
            <TimeAxis {...MOMENT} marks={[{ at: AT, kind: 'wave', hl: true, label: 'were playing' }]} />
            <path d={`M${AT_X} 46V58`} className="st-axis" strokeDasharray="2 3" />
            <Clock x={AT_X} y={74} r={15} h={10} m={0} />
            <Label x={AT_X + 22} y={79} anchor="start" muted size={13}>
              at ten
            </Label>
            <Person x={38} y={168} pose="run" s={1.15} />
            <Person x={100} y={168} pose="run" hair="long" tone={1} s={1.15} />
            <Prop name="football" x={268} y={168} s={1.5} />
            <Arrow from={[146, 116]} to={[236, 116]} tone="ink" bend={-12} />
            <Label x={69} y={192} muted size={15}>
              they
            </Label>
          </Scene>
        ),
        en: 'They_P were_A {playing_V} football_N at_I ten_M .',
        ru: 'Те же две части — be + -ing, но they, we, you — were, а не was.',
      },
    ],
  },
] satisfies TopicStories
