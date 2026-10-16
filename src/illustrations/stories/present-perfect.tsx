import { Arrow, Bubble, Cross, Person, Prop, Scene, TimeAxis } from '../kit'
import type { TopicStories } from '../types'

// Present Perfect или Past Simple: одно событие (ключи потерялись), но смотрим по-разному.
// Ось — как в схеме timeline: точка — момент, дуга к NOW — результат сейчас, рамка yesterday — закрытый отрезок.
// Кадры 1 и 3 — одна и та же сцена: меняется только ось (появилась рамка yesterday) — и форма.

const AXIS = { x: 24, y: 46, w: 272, now: 0.8 }
const EVENT = 0.3

export default [
  {
    id: 'present-perfect.result-or-yesterday',
    title: 'Present Perfect или Past Simple?',
    focus: ['pp', 'ps', 'markers-ps', 'markers-pp'],
    frames: [
      {
        scene: (
          <Scene label="На оси времени точка в прошлом: человек идёт, и у него выпадают ключи">
            <TimeAxis {...AXIS} marks={[{ at: EVENT, kind: 'dot', hl: true, label: 'потерял' }]} />
            <Person x={188} y={168} pose="walk" s={1.35} />
            <Arrow from={[160, 134]} to={[132, 156]} tone="motion" bend={10} />
            <Prop name="key" x={108} y={168} s={1.3} />
          </Scene>
        ),
        en: 'Я_P {потерял_V} ключи_N .',
        lang: 'ru',
        ru: 'По-русски одно прошедшее — «потерял». Английский спрашивает: куда смотрим — на сейчас или на момент в прошлом?',
      },
      {
        scene: (
          <Scene label="Дуга от события тянется к NOW: человек стоит у двери, ключей нет">
            <TimeAxis {...AXIS} marks={[{ at: EVENT, kind: 'arrow', hl: true, label: 'have lost' }]} />
            <Bubble x={84} y={98} w={74} h={48} kind="thought" tail="right">
              <Prop name="key" x={84} y={108} s={1.25} />
              <Cross x={84} y={98} size={26} />
            </Bubble>
            <Person x={170} y={168} pose="think" s={1.35} />
            <Prop name="door" x={258} y={168} s={1.75} />
          </Scene>
        ),
        en: 'I_P +{’ve_A} lost_V my_P keys_N .',
        ru: 'Когда потерял — не сказано. Важно, что сейчас ключей нет и домой не попасть: результат дотянулся до NOW — Present Perfect.',
      },
      {
        scene: (
          <Scene label="Рамка yesterday закрывает отрезок в прошлом; точка внутри, до NOW связи нет">
            <TimeAxis {...AXIS} zones={[{ from: 0.14, to: 0.46, label: 'yesterday' }]} marks={[{ at: EVENT, kind: 'dot', hl: true, label: 'lost' }]} />
            <Person x={188} y={168} pose="walk" s={1.35} />
            <Arrow from={[160, 134]} to={[132, 156]} tone="motion" bend={10} />
            <Prop name="key" x={108} y={168} s={1.3} />
          </Scene>
        ),
        en: 'I_P {lost_V} my_P keys_N yesterday_R .',
        ru: 'Назван момент — yesterday. Отрезок в прошлом закрыт, к NOW не тянется — Past Simple: lost.',
      },
    ],
  },
] satisfies TopicStories
