import { Arrow, Cross, Label, Person, Prop, Scene, TimeAxis } from '../kit'
import type { TopicStories } from '../types'

// Present Continuous: волна вокруг NOW — действие идёт сейчас или в эти дни (be + -ing).
// Present Simple — ряд точек: «как обычно». Выделение — цветом глагола (aux — у пропущенного be).

const AXIS = { x: 24, y: 34, w: 272, now: 0.72 }

export default [
  {
    id: 'present-continuous.usually-or-now',
    title: 'Как обычно или как сейчас?',
    focus: ['present.cont', 'present.simple', 'present', 'cont', 'simple'],
    frames: [
      {
        scene: (
          <Scene label="Ряд точек: каждый день человек работает в офисе банка; стрелка work">
            <TimeAxis {...AXIS} marks={[{ at: 0.7, kind: 'dots', label: 'usually' }]} />
            <Person x={64} y={168} pose="stand" s={1.4} />
            <Prop name="office" x={246} y={168} s={1.7} />
            <Arrow from={[106, 100]} to={[204, 100]} tone="action" label="work" bend={-12} />
            <Label x={246} y={192} muted size={15}>
              bank
            </Label>
          </Scene>
        ),
        en: 'I_P {work_V} in_I a_D bank_N .',
        ru: 'Работа в банке — моя постоянная жизнь: ряд точек, «как обычно». Present Simple.',
      },
      {
        scene: (
          <Scene label="Волна вокруг NOW: на этой неделе человек работает из дома; стрелка am working">
            <TimeAxis {...AXIS} marks={[{ at: 0.72, kind: 'wave', label: 'this week' }]} />
            <Person x={64} y={168} pose="stand" s={1.4} />
            <Prop name="house" x={246} y={168} s={1.9} />
            <Arrow from={[106, 100]} to={[204, 100]} tone="action" label="am working" bend={-12} />
            <Label x={246} y={192} muted size={15}>
              home
            </Label>
          </Scene>
        ),
        en: 'I_P +’m_A {working_V} from_I home_N this_D week_N .',
        ru: 'Волна вокруг NOW: действие идёт сейчас и временно. Тот же человек, но дом вместо банка: am working.',
      },
      {
        scene: (
          <Scene ground={false} label="Русское «Он спит» раздваивается: ряд точек — he sleeps, волна вокруг NOW — he is sleeping">
            <Label x={160} y={34} muted size={22}>
              Он спит
            </Label>
            <Arrow from={[148, 46]} to={[84, 78]} tone="ink" bend={-8} />
            <Arrow from={[172, 46]} to={[238, 78]} tone="ink" bend={8} />
            <TimeAxis x={14} y={122} w={140} now={0.62} marks={[{ at: 0.57, kind: 'dots', label: 'usually' }]} />
            <TimeAxis x={166} y={122} w={140} now={0.62} marks={[{ at: 0.62, kind: 'wave', label: 'now' }]} />
            <Label x={78} y={184} muted size={16}>
              he sleeps
            </Label>
            <Label x={176} y={184} anchor="start" muted size={16}>
              he
            </Label>
            <Label x={200} y={184} anchor="start" pos="verb" size={16}>
              is sleeping
            </Label>
          </Scene>
        ),
        en: 'He_P is_A {sleeping_V} now_R .',
        ru: 'В русском «спит» — и «обычно», и «сейчас». Английский выбирает: sleeps (точки) или is sleeping (волна).',
      },
    ],
  },
  {
    id: 'present-continuous.be-ing',
    title: 'Волна держится на двух словах: be + -ing',
    focus: ['present.cont', 'present', 'cont'],
    frames: [
      {
        scene: (
          <Scene label="Она читает книгу на столе: стрелка is reading, волна вокруг NOW">
            <TimeAxis {...AXIS} marks={[{ at: 0.72, kind: 'wave', label: 'now' }]} />
            <Person x={64} y={168} pose="stand" hair="long" tone={1} s={1.4} />
            <Prop name="table" x={252} y={168} s={1.5} />
            <Prop name="book" x={252} y={117} s={1.3} />
            <Arrow from={[98, 98]} to={[196, 98]} tone="action" label="is reading" bend={-18} />
            <Label x={64} y={192} muted size={16}>
              she
            </Label>
          </Scene>
        ),
        en: 'She_P is_A {reading_V} a_D book_N .',
        ru: 'Продолжается именно сейчас: be + глагол с -ing. Вдвоём они и держат волну.',
      },
      {
        scene: (
          <Scene label="Пунктирная стрелка с одним reading зачёркнута; над ней вопрос: где is?">
            <TimeAxis {...AXIS} marks={[{ at: 0.72, kind: 'wave', label: 'now' }]} />
            <Person x={64} y={168} pose="stand" hair="long" tone={1} s={1.4} />
            <Prop name="table" x={252} y={168} s={1.5} />
            <Prop name="book" x={252} y={117} s={1.3} />
            <Arrow from={[98, 98]} to={[196, 98]} tone="ink" dashed label="reading" bend={-18} />
            <Cross x={147} y={116} size={16} />
            <Label x={147} y={64} pos="aux" size={17}>
              is ?
            </Label>
            <Label x={64} y={192} muted size={16}>
              she
            </Label>
          </Scene>
        ),
        en: 'She_P {is_A} reading_V a_D book_N .',
        ru: 'Один -ing без be не работает. По-русски «читает» хватает, по-английски нужен ещё и is.',
      },
      {
        scene: (
          <Scene label="Человек показывает на дождь и говорит Look; волна вокруг NOW, стрелки нет, у облака дождь">
            <TimeAxis {...AXIS} marks={[{ at: 0.72, kind: 'wave', hl: true, label: 'is raining' }]} />
            <Person x={64} y={168} pose="point" s={1.4} />
            <Prop name="rain" x={250} y={168} s={2.2} />
            <Label x={142} y={78} muted size={20}>
              Look!
            </Label>
          </Scene>
        ),
        en: 'Look_V ! It_P is_A {raining_V} .',
        ru: 'Look!, now, at the moment — сигналы «прямо сейчас»: is raining, а не rains.',
      },
    ],
  },
] satisfies TopicStories
