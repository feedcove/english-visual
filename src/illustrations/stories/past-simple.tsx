import { Arrow, Check, Cross, Label, Person, Prop, Scene, TimeAxis } from '../kit'
import type { TopicStories } from '../types'

// Past Simple: точка внутри закрытого отрезка прошлого (yesterday, ago, last summer) — до NOW она не дотягивается.
// В вопросе и отрицании прошедшее «уходит» во вспомогательный did, сам глагол остаётся в начальной форме.

const AXIS = { x: 24, y: 34, w: 272, now: 0.8 }
const PAST = [{ from: 0.12, to: 0.44, label: 'yesterday' }]

export default [
  {
    id: 'past-simple.closed-point',
    title: 'Past Simple: точка в закрытом прошлом',
    focus: ['past.simple', 'past', 'simple'],
    frames: [
      {
        scene: (
          <Scene label="Рамка yesterday на оси, внутри точка called; от него к ней стрелка звонка">
            <TimeAxis {...AXIS} zones={PAST} marks={[{ at: 0.28, kind: 'dot', hl: true, label: 'called' }]} />
            <Person x={54} y={168} pose="talk" s={1.25} />
            <Person x={256} y={168} pose="stand" flip hair="long" tone={1} s={1.25} />
            <Arrow from={[96, 108]} to={[212, 108]} tone="ink" bend={-12} />
          </Scene>
        ),
        en: 'I_P {called_V} Anna_N yesterday_R .',
        ru: 'Назван момент в прошлом — yesterday. Отрезок закрыт, до NOW не тянется: точка и всё.',
      },
      {
        scene: (
          <Scene label="Та же точка на оси, от NOW к ней идёт пунктирная стрелка с подписью two days ago">
            <TimeAxis {...AXIS} marks={[{ at: 0.28, kind: 'dot', hl: true, label: 'called' }]} />
            <Arrow from={[216, 68]} to={[106, 68]} tone="dim" dashed label="two days ago" />
            <Person x={54} y={168} pose="talk" s={1.25} />
            <Person x={256} y={168} pose="stand" flip hair="long" tone={1} s={1.25} />
            <Arrow from={[96, 118]} to={[212, 118]} tone="ink" bend={-12} />
          </Scene>
        ),
        en: 'I_P {called_V} Anna_N two_M days_N ago_R .',
        ru: 'ago отсчитывает назад от NOW до точки. Момент назван — снова Past Simple.',
      },
      {
        scene: (
          <Scene label="Рамка last summer, внутри точка went; двое летят самолётом">
            <TimeAxis {...AXIS} zones={[{ from: 0.06, to: 0.46, label: 'last summer' }]} marks={[{ at: 0.26, kind: 'dot', hl: true, label: 'went' }]} />
            <Person x={44} y={168} pose="stand" s={1.2} />
            <Person x={90} y={168} pose="stand" hair="long" tone={1} s={1.2} />
            <Prop name="plane" x={246} y={138} s={1.7} />
            <Arrow from={[126, 112]} to={[196, 112]} tone="ink" bend={-12} />
          </Scene>
        ),
        en: 'We_P {went_V} to_I Paris_N last_J summer_N .',
        ru: 'last summer — тоже закрытый отрезок. Форма went — своя, у частых глаголов она не по правилу.',
      },
    ],
  },
  {
    id: 'past-simple.did',
    title: 'Прошедшее уходит в did: didn’t buy, а не didn’t bought',
    focus: ['past.simple', 'past', 'simple'],
    frames: [
      {
        scene: (
          <Scene label="Точка в прошлом на оси; он купил кофе: стрелка bought">
            <TimeAxis {...AXIS} zones={PAST} marks={[{ at: 0.28, kind: 'dot' }]} />
            <Person x={60} y={168} pose="stand" tone={1} s={1.3} />
            <Prop name="coffee" x={252} y={168} s={2.1} />
            <Arrow from={[102, 112]} to={[204, 112]} tone="action" label="bought" bend={-12} />
          </Scene>
        ),
        en: 'He_P {bought_V} coffee_N yesterday_R .',
        ru: 'В утверждении прошедшее на самом глаголе: bought.',
      },
      {
        scene: (
          <Scene label="Тот же сюжет вопросом: над началом стрелки Did, на стрелке buy в начальной форме">
            <TimeAxis {...AXIS} zones={PAST} marks={[{ at: 0.28, kind: 'dot' }]} />
            <Person x={60} y={168} pose="stand" tone={1} s={1.3} />
            <Prop name="coffee" x={252} y={168} s={2.1} />
            <Arrow from={[102, 112]} to={[204, 112]} tone="ink" label="buy" bend={-12} />
            <Label x={124} y={92} pos="aux" size={20}>
              Did
            </Label>
            <Label x={298} y={120} muted size={30}>
              ?
            </Label>
          </Scene>
        ),
        en: '{Did_A} he_P buy_V coffee_N ?',
        ru: 'В вопросе прошедшее переходит в did, а глагол возвращается к начальной форме: buy.',
      },
      {
        scene: (
          <Scene label="Отрицание: над началом стрелки didn’t, на стрелке buy; кофе приглушён и зачёркнут">
            <TimeAxis {...AXIS} zones={PAST} marks={[{ at: 0.28, kind: 'dot' }]} />
            <Person x={60} y={168} pose="stand" tone={1} s={1.3} />
            <Prop name="coffee" x={252} y={168} s={2.1} dim />
            <Cross x={252} y={134} size={34} />
            <Arrow from={[102, 112]} to={[204, 112]} tone="ink" dashed label="buy" bend={-12} />
            <Label x={134} y={92} pos="aux" size={20}>
              didn’t
            </Label>
          </Scene>
        ),
        en: 'He_P {didn’t_A} buy_V coffee_N .',
        ru: 'В отрицании то же: didn’t несёт прошедшее, поэтому buy без изменений.',
      },
      {
        scene: (
          <Scene label="Он думает. Справа didn’t bought зачёркнуто, didn’t buy с галочкой">
            <Person x={50} y={168} pose="think" tone={1} s={1.3} />
            <Label x={102} y={74} anchor="start" size={16} muted>
              He didn’t bought
            </Label>
            <Cross x={284} y={69} size={16} />
            <Label x={102} y={126} anchor="start" size={16}>
              He didn’t buy
            </Label>
            <Check x={284} y={120} size={18} />
          </Scene>
        ),
        en: 'He_P didn’t_A {buy_V} coffee_N .',
        ru: 'По-русски «не купил» — всё на глаголе. По-английски прошедшее одно — в didn’t, и ещё раз в bought его не ставят.',
      },
    ],
  },
  {
    id: 'past-simple.regular-irregular',
    title: 'worked или went: ed или своя форма?',
    focus: ['past.simple', 'past', 'simple'],
    frames: [
      {
        scene: (
          <Scene label="Точка в прошлом; человек работал: стрелка worked; под ней work плюс ed">
            <TimeAxis {...AXIS} zones={PAST} marks={[{ at: 0.28, kind: 'dot' }]} />
            <Person x={60} y={168} pose="stand" s={1.3} />
            <Prop name="desk" x={238} y={168} s={1.6} />
            <Arrow from={[102, 112]} to={[184, 112]} tone="action" label="worked" bend={-12} />
            <Label x={160} y={192} muted size={16}>
              work + ed
            </Label>
          </Scene>
        ),
        en: 'I_P {worked_V} late_R yesterday_R .',
        ru: 'У правильных глаголов в прошлом добавляется ed: work → worked, для всех лиц.',
      },
      {
        scene: (
          <Scene label="Точка в прошлом; человек пошёл домой: стрелка went; под ней go → went">
            <TimeAxis {...AXIS} zones={PAST} marks={[{ at: 0.28, kind: 'dot' }]} />
            <Person x={60} y={168} pose="walk" s={1.3} />
            <Prop name="house" x={246} y={168} s={1.9} />
            <Arrow from={[102, 112]} to={[204, 112]} tone="action" label="went" bend={-12} />
            <Label x={160} y={192} muted size={16}>
              go → went
            </Label>
          </Scene>
        ),
        en: 'He_P {went_V} home_R at_I six_M .',
        ru: 'У частых глаголов своя форма: go → went, see → saw, have → had. Её просто запоминают.',
      },
      {
        scene: (
          <Scene label="Человек у школы. Справа goed зачёркнуто, went с галочкой">
            <Person x={50} y={168} pose="think" s={1.3} />
            <Label x={102} y={74} anchor="start" size={17} muted>
              I goed to school
            </Label>
            <Cross x={290} y={69} size={16} />
            <Label x={102} y={126} anchor="start" size={17}>
              I went to school
            </Label>
            <Check x={290} y={120} size={18} />
          </Scene>
        ),
        en: 'I_P {went_V} to_I school_N .',
        ru: 'К неправильному глаголу ed не добавляют: не goed, а went.',
      },
    ],
  },
] satisfies TopicStories
