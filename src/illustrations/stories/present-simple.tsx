import { Arrow, Check, Cross, Clock, Label, Person, Prop, Scene, TimeAxis } from '../kit'
import type { TopicStories } from '../types'

// Present Simple: ряд точек «каждый день» (привычка, расписание), -s только у he / she / it,
// а в вопросе и отрицании -s уходит во вспомогательный does. Выделение — цветом глагола (aux — у does).

const HABIT = { x: 24, y: 34, w: 272, now: 0.72 }
// Привычка тянется и до, и после NOW: ряд точек стоит вокруг черты (между точками), а не только в прошлом.
const EVERY_DAY = [{ at: 0.7, kind: 'dots' as const, label: 'every day' }]

export default [
  {
    id: 'present-simple.habit-s',
    title: 'Привычка — это повтор; he / she / it берёт -s',
    focus: ['base', 's'],
    frames: [
      {
        scene: (
          <Scene label="Ряд точек на оси: каждый день. Человек у рабочего стола, стрелка work">
            <TimeAxis {...HABIT} marks={EVERY_DAY} />
            <Person x={64} y={168} pose="stand" s={1.4} />
            <Prop name="desk" x={228} y={168} s={1.6} />
            <Arrow from={[106, 100]} to={[178, 104]} tone="action" label="work" bend={-12} />
            <Label x={64} y={192} muted size={16}>
              I
            </Label>
          </Scene>
        ),
        en: 'I_P {work_V} here_R every_D day_N .',
        ru: 'Привычка — не одна точка, а ряд точек: каждый день одно и то же. С I глагол без изменений.',
      },
      {
        scene: (
          <Scene label="Та же сцена, но человек — она, и на стрелке works с -s">
            <TimeAxis {...HABIT} marks={EVERY_DAY} />
            <Person x={64} y={168} pose="stand" hair="long" tone={1} s={1.4} />
            <Prop name="desk" x={228} y={168} s={1.6} />
            <Arrow from={[106, 100]} to={[178, 104]} tone="action" label="works" bend={-12} />
            <Label x={64} y={192} muted size={16}>
              she / he / it
            </Label>
          </Scene>
        ),
        en: 'She_P {works_V} here_R every_D day_N .',
        ru: 'Ряд точек тот же, а «она» — один человек: к глаголу добавляется -s. Только he, she, it и одно имя.',
      },
      {
        scene: (
          <Scene label="Часы показывают девять, стрелка opens ведёт к зданию банка: расписание повторяется каждый день">
            <TimeAxis {...HABIT} marks={EVERY_DAY} />
            <Clock x={62} y={128} r={30} h={9} m={0} />
            <Prop name="office" x={246} y={168} s={1.7} />
            <Arrow from={[108, 108]} to={[210, 108]} tone="action" label="opens" bend={-12} />
          </Scene>
        ),
        en: 'The_D bank_N {opens_V} at_I nine_M .',
        ru: 'Расписание и факты тоже повторяются, поэтому Present Simple. The bank — одно имя, как it: opens.',
      },
    ],
  },
  {
    id: 'present-simple.does',
    title: 'В вопросе и отрицании -s уходит в does',
    focus: ['do', 'does', 's'],
    frames: [
      {
        scene: (
          <Scene label="Она любит кофе: стрелка likes с -s">
            <Person x={64} y={168} pose="stand" hair="long" tone={1} s={1.4} />
            <Prop name="coffee" x={250} y={168} s={2.1} />
            <Arrow from={[106, 96]} to={[204, 96]} tone="action" label="likes" bend={-12} />
            <Label x={64} y={192} muted size={16}>
              she
            </Label>
          </Scene>
        ),
        en: 'She_P {likes_V} coffee_N .',
        ru: 'В утверждении -s стоит на самом глаголе: likes.',
      },
      {
        scene: (
          <Scene label="Тот же сюжет вопросом: над началом стрелки появилось does, а стрелка like без -s">
            <Person x={64} y={168} pose="stand" hair="long" tone={1} s={1.4} />
            <Prop name="coffee" x={250} y={168} s={2.1} />
            <Arrow from={[106, 96]} to={[204, 96]} tone="ink" label="like" bend={-12} />
            <Label x={124} y={72} pos="aux" size={20}>
              Does
            </Label>
            <Label x={250} y={92} muted size={30}>
              ?
            </Label>
            <Label x={64} y={192} muted size={16}>
              she
            </Label>
          </Scene>
        ),
        en: '{Does_A} she_P like_V coffee_N ?',
        ru: 'В вопросе вперёд выходит does, и -s переходит в него. Глагол like остаётся «чистым».',
      },
      {
        scene: (
          <Scene label="Отрицание: над началом стрелки doesn’t, дальше like без -s; кофе приглушён и зачёркнут">
            <Person x={64} y={168} pose="stand" hair="long" tone={1} s={1.4} />
            <Prop name="coffee" x={250} y={168} s={2.1} dim />
            <Cross x={250} y={134} size={34} />
            <Arrow from={[106, 96]} to={[204, 96]} tone="ink" dashed label="like" bend={-12} />
            <Label x={138} y={72} pos="aux" size={20}>
              doesn’t
            </Label>
            <Label x={64} y={192} muted size={16}>
              she
            </Label>
          </Scene>
        ),
        en: 'She_P {doesn’t_A} like_V coffee_N .',
        ru: 'В отрицании то же: doesn’t уже несёт -s, поэтому не doesn’t likes, а doesn’t like.',
      },
      {
        scene: (
          <Scene label="Русский «Он не любит» — глагол сохраняет окончание; по-английски likes зачёркнуто, like — верно">
            <Person x={52} y={168} pose="stand" tone={1} s={1.3} />
            <Label x={104} y={74} anchor="start" size={16} muted>
              He doesn’t likes
            </Label>
            <Cross x={284} y={69} size={16} />
            <Label x={104} y={126} anchor="start" size={16}>
              He doesn’t like
            </Label>
            <Check x={284} y={120} size={18} />
          </Scene>
        ),
        en: 'He_P doesn’t_A {like_V} tea_N .',
        ru: 'По-русски «не любит» — окончание на глаголе. По-английски -s уже в doesn’t, поэтому глагол без -s.',
      },
    ],
  },
  {
    id: 'present-simple.spelling',
    title: 'he / she: -s, -es, -ies и особый has',
    focus: ['s', 'es', 'ies', 'have-has'],
    frames: [
      {
        scene: (
          <Scene label="Она смотрит телевизор: стрелка watches; внизу watch + es">
            <Person x={64} y={168} pose="stand" hair="long" tone={1} s={1.4} />
            <Prop name="tv" x={250} y={168} s={2.1} />
            <Arrow from={[106, 96]} to={[194, 96]} tone="action" label="watches" bend={-12} />
            <Label x={160} y={192} muted size={16}>
              watch → watches
            </Label>
          </Scene>
        ),
        en: 'She_P {watches_V} TV_N every_D night_N .',
        ru: 'После ch, sh, s, x окончание -es, иначе не выговорить: watch → watches. Так же go → goes, do → does.',
      },
      {
        scene: (
          <Scene label="Она читает книгу: стрелка studies; внизу study → studies">
            <Person x={64} y={168} pose="stand" hair="long" tone={1} s={1.4} />
            <Prop name="book" x={250} y={168} s={2.1} />
            <Arrow from={[106, 96]} to={[194, 96]} tone="action" label="studies" bend={-12} />
            <Label x={160} y={192} muted size={16}>
              study → studies
            </Label>
          </Scene>
        ),
        en: 'She_P {studies_V} French_N .',
        ru: 'Согласная + y: y превращается в ies: study → studies (но play → plays).',
      },
      {
        scene: (
          <Scene label="Том и собака: стрелка has; внизу have → has">
            <Person x={64} y={168} pose="stand" tone={0} s={1.4} />
            <Prop name="dog" x={250} y={168} s={1.9} />
            <Arrow from={[106, 96]} to={[190, 96]} tone="action" label="has" bend={-12} />
            <Label x={160} y={192} muted size={16}>
              have → has
            </Label>
          </Scene>
        ),
        en: 'Tom_N {has_V} a_D dog_N .',
        ru: 'have меняется целиком: Tom has, а не Tom haves.',
      },
    ],
  },
] satisfies TopicStories
