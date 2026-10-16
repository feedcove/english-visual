import { Arrow, Bubble, CalendarPage, Cross, Frame, Label, Person, Prop, Scene, TimeAxis } from '../kit'
import type { TopicStories } from '../types'

// Будущее: ось времени внизу служит «землёй» (люди и предметы стоят на ней), NOW — вертикальная черта.
// will — лампочка загорается на NOW; going to — лампочка давно в прошлом или признак виден сейчас; Present Continuous — календарь и билет.
// Выделение — цветом глагола: стрелка от того, кто делает, к тому, что будет (глагол — стрелка).

const AX = 156
const FLOOR = 140
const axis = (now: number) => ({ x: 20, y: AX, w: 280, now })
const nowX = (now: number) => 20 + now * 280

/** Дуги звонка по бокам телефона. */
function Rings({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} className="st-line" fill="none">
      <path d="M-18 -44 q-5 6 0 12M-24 -48 q-8 12 0 20M18 -44 q5 6 0 12M24 -48 q8 12 0 20" />
    </g>
  )
}

export default [
  {
    id: 'future.will-or-going-to',
    title: 'will или going to: решил сейчас или уже решил?',
    focus: ['will', 'going-to'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Телефон звонит; лампочка загорается прямо над человеком на NOW, стрелка от него к телефону">
            <TimeAxis {...axis(0.4)} marks={[{ at: 0.8, kind: 'dot' }]} />
            <Prop name="idea" x={nowX(0.4)} y={42} s={0.75} />
            <Person x={nowX(0.4)} y={FLOOR} pose="think" s={1.3} />
            <Prop name="phone" x={246} y={FLOOR} s={1.5} />
            <Rings x={246} y={FLOOR} />
            <Arrow from={[nowX(0.4) + 24, 100]} to={[216, 104]} tone="action" bend={-6} />
            <Label x={196} y={88} pos="verb" size={13}>
              ’ll get
            </Label>
          </Scene>
        ),
        en: 'The_D phone_N is_A ringing_V . — I_P +{’ll_A} get_V it_P !',
        ru: 'Лампочка загорелась прямо сейчас, на NOW: раньше я об этом не думал. Решил в момент речи — will.',
      },
      {
        scene: (
          <Scene ground={false} label="Лампочка давно осталась в прошлом, к NOW план уже готов; стрелка от человека к книге в будущем">
            <TimeAxis {...axis(0.4)} marks={[{ at: 0.7, kind: 'dot' }]} />
            <Prop name="idea" x={52} y={104} s={0.9} />
            <Label x={52} y={124} muted size={12}>
              вчера
            </Label>
            <Arrow from={[76, 88]} to={[nowX(0.4) - 24, 96]} tone="dim" dashed bend={-8} />
            <Person x={nowX(0.4)} y={FLOOR} pose="stand" s={1.3} />
            <Prop name="book" x={246} y={FLOOR} s={1.5} />
            <Arrow from={[nowX(0.4) + 24, 100]} to={[212, 112]} tone="action" bend={-6} />
            <Label x={198} y={88} pos="verb" size={13}>
              going to
            </Label>
          </Scene>
        ),
        en: 'I_P +’m_A {going~to_A} learn_V French_N .',
        ru: 'Лампочка загорелась давно: к NOW план уже есть. Я иду к нему со стрелкой — am going to.',
      },
      {
        scene: (
          <Scene ground={false} label="Над человеком на NOW тучи — их видно сейчас; от туч стрелка к дождю в будущем">
            <TimeAxis {...axis(0.25)} marks={[{ at: 0.8, kind: 'dot' }]} />
            <Person x={nowX(0.25)} y={FLOOR} pose="look" s={1.0} />
            <Prop name="cloud" x={nowX(0.25)} y={57} s={1.4} />
            <Label x={nowX(0.25)} y={18} muted size={12}>
              видно сейчас
            </Label>
            <Prop name="rain" x={248} y={FLOOR} s={1.6} />
            <Arrow from={[132, 42]} to={[222, 84]} tone="action" bend={-14} />
            <Label x={200} y={46} pos="verb" size={13}>
              going to
            </Label>
          </Scene>
        ),
        en: 'Look_V at_I those_D clouds_N ! It_P +’s_A {going~to_A} rain_V .',
        ru: 'Причина видна уже сейчас — тучи. Стрелка тянется от них к дождю: вот-вот начнётся — going to.',
      },
    ],
  },
  {
    id: 'future.arranged-or-planned',
    title: 'Present Continuous: уже договорились или просто хочу?',
    focus: ['pres-cont', 'going-to'],
    frames: [
      {
        scene: (
          <Scene label="Человек мечтает о Риме: в мыслях самолёт и Рим, даты нет">
            <Person x={64} y={168} pose="think" s={1.4} />
            <Bubble x={200} y={70} w={112} h={64} kind="thought" tail="left">
              <Prop name="plane" x={174} y={88} s={1.0} />
              <Label x={232} y={81} size={14}>
                Rome
              </Label>
            </Bubble>
            <Label x={200} y={148} muted size={12}>
              когда-нибудь
            </Label>
            <Arrow from={[98, 122]} to={[150, 112]} tone="action" bend={10} />
            <Label x={126} y={142} pos="verb" size={13}>
              going to
            </Label>
          </Scene>
        ),
        en: 'I_P +’m_A {going~to_A} visit_V Rome_N one~day_R .',
        ru: 'Только мысль, даты нет: «когда-нибудь». Намерение без договорённости — going to.',
      },
      {
        scene: (
          <Scene label="Купленный билет и листок календаря с пятницей; стрелка от человека к самолёту">
            <Person x={52} y={168} pose="hold" s={1.4} />
            <CalendarPage x={158} y={80} day="Fri" s={1.2} />
            <Prop name="ticket" x={158} y={168} s={1.5} />
            <Prop name="plane" x={266} y={168} s={1.6} />
            <Arrow from={[84, 118]} to={[230, 130]} tone="action" bend={-20} />
            <Label x={158} y={106} pos="verb" size={13}>
              ’m flying
            </Label>
          </Scene>
        ),
        en: 'I_P +{’m_A} flying_V to_I Rome_N on_I Friday_N .',
        ru: 'Билет куплен, пятница в календаре — всё уже договорено. Для договорённости — am flying.',
      },
      {
        scene: (
          <Scene ground={false} label="Без даты самолёт летит прямо на NOW; с листком календаря «пятница» полёт уходит в будущее">
            <TimeAxis {...axis(0.3)} marks={[{ at: 0.3, kind: 'wave' }]} />
            <Prop name="plane" x={nowX(0.3)} y={104} s={1.5} />
            <Label x={nowX(0.3)} y={50} muted size={12}>
              без даты — сейчас
            </Label>
            <Arrow from={[146, 88]} to={[204, 88]} tone="motion" />
            <CalendarPage x={250} y={118} day="Fri" s={1.1} />
            <Label x={250} y={140} pos="noun" size={15}>
              Friday
            </Label>
          </Scene>
        ),
        en: 'I_P +’m_A flying_V on_I {Friday_N} .',
        ru: 'Без Friday «I’m flying» значит «лечу прямо сейчас». Название дня переносит фразу в будущее.',
      },
    ],
  },
  {
    id: 'future.when-present',
    title: 'When I get home — почему не will?',
    focus: ['will'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Две точки в будущем: приду домой, потом позвоню; в русском оба глагола в будущем времени">
            <TimeAxis {...axis(0.15)} marks={[]} />
            <Person x={nowX(0.15)} y={FLOOR} pose="walk" s={1.3} />
            <Prop name="house" x={172} y={FLOOR} s={1.4} />
            <Prop name="phone" x={268} y={FLOOR} s={1.5} />
            <Arrow from={[88, 98]} to={[136, 104]} tone="action" bend={-6} />
            <Label x={112} y={88} pos="verb" size={13}>
              приду
            </Label>
            <Arrow from={[206, 88]} to={[252, 98]} tone="ink" bend={-6} />
            <Label x={230} y={78} size={13}>
              позвоню
            </Label>
          </Scene>
        ),
        en: 'Когда_C я_P {приду_V} домой_R , я_P позвоню_V .',
        lang: 'ru',
        ru: 'По-русски обе стрелки в будущем: «приду» и «позвоню».',
      },
      {
        scene: (
          <Scene ground={false} label="Часть when в рамке: там глагол как факт, без will; перечёркнутое will get">
            <TimeAxis {...axis(0.15)} marks={[]} />
            <Person x={nowX(0.15)} y={FLOOR} pose="walk" s={1.3} />
            <Frame x={134} y={74} w={76} h={74} label="when…" />
            <Prop name="house" x={172} y={FLOOR} s={1.4} />
            <Prop name="phone" x={268} y={FLOOR} s={1.5} dim />
            <Arrow from={[88, 98]} to={[140, 106]} tone="action" bend={-6} />
            <Label x={112} y={88} pos="verb" size={13}>
              get
            </Label>
            <Label x={160} y={52} muted size={14}>
              will get
            </Label>
            <Cross x={208} y={47} size={16} />
          </Scene>
        ),
        en: 'When_C I_P {get_V} home_R , I_P +’ll_A call_V you_P .',
        ru: 'После when будущее называем как факт: get, а не will get. Рамка when — Present Simple.',
      },
      {
        scene: (
          <Scene ground={false} label="Рамка when приглушена; will стоит только у стрелки к телефону в главной части">
            <TimeAxis {...axis(0.15)} marks={[]} />
            <Person x={nowX(0.15)} y={FLOOR} pose="walk" s={1.3} />
            <Frame x={134} y={74} w={76} h={74} label="when… get" dashed />
            <Prop name="house" x={172} y={FLOOR} s={1.4} dim />
            <Prop name="phone" x={268} y={FLOOR} s={1.5} />
            <Arrow from={[90, 84]} to={[262, 90]} tone="action" bend={-70} />
            <Label x={176} y={46} pos="verb" size={14}>
              ’ll call
            </Label>
          </Scene>
        ),
        en: 'When_C I_P get_V home_R , I_P +{’ll_A} call_V you_P .',
        ru: 'Will остаётся в главной части: позвоню, когда приду домой.',
      },
    ],
  },
] satisfies TopicStories
