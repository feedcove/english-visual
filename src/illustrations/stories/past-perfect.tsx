import { Arrow, Clock, Cross, Label, Person, Prop, Scene, TimeAxis } from '../kit'
import type { TopicStories } from '../types'

// Past Perfect: два события в прошлом, ось внизу служит «землёй». Часы над событием показывают, кто раньше.
// Дуга от более позднего момента назад, к более раннему событию — «оглянулись назад»: had + V3 (цвет глагола).
// Past Simple подряд — события идут как в рассказе: дуги нет, порядок слева направо.

const AX = { x: 20, y: 156, w: 280, now: 0.93 }
const FLOOR = 140
const A = 84
const B = 190
const at = (x: number) => (x - AX.x) / AX.w

export default [
  {
    id: 'past-perfect.earlier',
    title: 'Past Perfect: что случилось раньше — had + V3',
    focus: ['past.perf', 'past.simple'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Два события в прошлом: фильм начался в семь, человек пришёл в половину восьмого; по-русски оба глагола просто прошедшие">
            <TimeAxis {...AX} marks={[{ at: at(A), kind: 'dot', hl: true }, { at: at(B), kind: 'dot' }]} />
            <Clock x={A} y={26} r={15} h={7} m={0} />
            <Prop name="tv" x={A} y={FLOOR} s={1.4} />
            <Clock x={B} y={26} r={15} h={7} m={30} />
            <Person x={B} y={FLOOR} pose="walk" s={1.2} />
            <Label x={A} y={184} pos="verb" size={13}>
              начался
            </Label>
            <Label x={B} y={184} muted size={13}>
              пришёл
            </Label>
          </Scene>
        ),
        en: 'Когда_C я_P пришёл_V , фильм_N уже_R {начался_V} .',
        lang: 'ru',
        ru: 'Фильм начался в 7:00, я пришёл в 7:30. По-русски оба глагола просто в прошедшем, а порядок подсказывает только «уже».',
      },
      {
        scene: (
          <Scene ground={false} label="Дуга от момента прихода назад, к более раннему событию — началу фильма: оглядываемся назад">
            <TimeAxis {...AX} marks={[{ at: at(A), kind: 'dot', hl: true }, { at: at(B), kind: 'dot' }]} />
            <Clock x={A} y={26} r={15} h={7} m={0} />
            <Prop name="tv" x={A} y={FLOOR} s={1.4} />
            <Clock x={B} y={26} r={15} h={7} m={30} />
            <Person x={B} y={FLOOR} pose="walk" s={1.2} />
            <Arrow from={[B - 16, 96]} to={[A + 14, 96]} tone="action" bend={30} />
            <Label x={A} y={184} pos="verb" size={13}>
              had started
            </Label>
            <Label x={B} y={184} muted size={13}>
              arrived
            </Label>
          </Scene>
        ),
        en: 'When_C I_P arrived_V , the_D film_N {had_A} already_R started_V .',
        ru: 'Из момента прихода оглядываемся назад: фильм начался раньше. Дуга назад — had + V3.',
      },
      {
        scene: (
          <Scene ground={false} label="Порядок обратный: сначала человек пришёл в семь, потом в пять минут восьмого начался фильм; события идут слева направо без дуги назад">
            <TimeAxis {...AX} marks={[{ at: at(A), kind: 'dot' }, { at: at(B), kind: 'dot', hl: true }]} />
            <Clock x={A} y={26} r={15} h={7} m={0} />
            <Person x={A} y={FLOOR} pose="walk" s={1.2} />
            <Clock x={B} y={26} r={15} h={7} m={5} />
            <Prop name="tv" x={B} y={FLOOR} s={1.4} />
            <Arrow from={[A + 28, 100]} to={[B - 30, 100]} tone="dim" bend={-8} />
            <Label x={A} y={184} muted size={13}>
              arrived
            </Label>
            <Label x={B} y={184} pos="verb" size={13}>
              started
            </Label>
          </Scene>
        ),
        en: 'When_C I_P arrived_V , the_D film_N {started_V} .',
        ru: 'Сначала пришёл я, потом начался фильм: события идут по порядку, оба в Past Simple. Дуги назад нет.',
      },
    ],
  },
  {
    id: 'past-perfect.hints',
    title: 'by the time, never … before: когда оглядываемся назад, а когда нет',
    focus: ['past.perf', 'past.simple'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Магазин закрылся в пять, двое пришли в половину шестого; дуга от прихода назад, к закрытию">
            <TimeAxis {...AX} marks={[{ at: at(A), kind: 'dot', hl: true }, { at: at(B), kind: 'dot' }]} />
            <Clock x={A} y={26} r={15} h={5} m={0} />
            <Prop name="shop" x={A} y={FLOOR} s={1.5} />
            <Clock x={B} y={26} r={15} h={5} m={30} />
            <Person x={B - 22} y={FLOOR} pose="walk" s={1.1} />
            <Person x={B + 20} y={FLOOR} pose="walk" s={1.1} hair="long" tone={1} />
            <Arrow from={[B - 36, 96]} to={[A + 14, 96]} tone="action" bend={30} />
            <Label x={A} y={184} pos="verb" size={13}>
              had closed
            </Label>
            <Label x={B} y={184} muted size={13}>
              got there
            </Label>
          </Scene>
        ),
        en: 'By~the~time_C we_P got_V there_R , the_D shop_N {had_A} closed_V .',
        ru: 'By the time — «к тому времени как»: мы пришли в 5:30, магазин закрылся ещё в пять. Оглядываемся назад — had closed.',
      },
      {
        scene: (
          <Scene ground={false} label="До момента полёта слева ни одного полёта: зачёркнутый самолёт и слово never; справа человек смотрит на самолёт">
            <TimeAxis {...AX} zones={[{ from: 0.02, to: 0.46, label: 'before' }]} marks={[{ at: at(172), kind: 'dot' }]} />
            <Prop name="plane" x={74} y={FLOOR - 8} s={1.4} dim />
            <Cross x={74} y={104} size={34} />
            <Label x={74} y={70} pos="adv" size={16}>
              never
            </Label>
            <Person x={172} y={FLOOR} pose="look" s={1.2} />
            <Prop name="plane" x={246} y={FLOOR} s={1.5} />
          </Scene>
        ),
        en: 'I_P had_A {never_R} flown_V before_R .',
        ru: 'До этого дня — ни одного полёта. Never ставим между had и V3, а «до того» отмечает before.',
      },
      {
        scene: (
          <Scene ground={false} label="Вчера один отрезок: двое встретились; другого, более раннего момента нет, дуги назад нет">
            <TimeAxis {...AX} zones={[{ from: 0.1, to: 0.52, label: 'yesterday' }]} marks={[]} />
            <Person x={58} y={FLOOR} pose="stand" s={1.2} hair="long" tone={1} />
            <Person x={146} y={FLOOR} pose="stand" s={1.2} flip />
            <Arrow from={[84, 96]} to={[120, 96]} tone="action" bend={-10} />
            <Label x={102} y={80} pos="verb" size={14}>
              saw
            </Label>
            <Label x={232} y={80} muted size={14}>
              had seen
            </Label>
            <Cross x={232} y={108} size={22} />
          </Scene>
        ),
        en: 'I_P {saw_V} him_P yesterday_R .',
        ru: 'Одно событие в закрытом «вчера» — второго момента, от которого оглядываться, нет. Нужен просто Past Simple.',
      },
    ],
  },
] satisfies TopicStories
