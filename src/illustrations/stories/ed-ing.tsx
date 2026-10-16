import { Arrow, Frame, Label, Person, Prop, Scene } from '../kit'
import type { Pos } from '../../content/types'
import type { TopicStories } from '../types'

// bored или boring: слева источник чувства (фильм, книга, день), справа человек, который его испытывает.
// Стрелка идёт от источника к человеку. -ing висит на источнике, -ed — на человеке. Выделена одна метка кадра.

/** Метка-«бирка» с центром (x, y): цветная у цели кадра, серая у остальных. */
function Chip({ x, y, w, pos, children }: { x: number; y: number; w: number; pos?: Pos; children: string }) {
  return (
    <>
      <Frame x={x - w / 2} y={y - 12} w={w} h={24} pos={pos} />
      <Label x={x} y={y + 5} pos={pos} muted={!pos} size={14}>
        {children}
      </Label>
    </>
  )
}

/** Сидящий человек справа, смотрит влево на источник. */
function Viewer({ x = 252, hair, tone = 0 }: { x?: number; hair?: 'short' | 'long'; tone?: 0 | 1 }) {
  return (
    <>
      <Prop name="chair" x={x} y={168} s={1.3} flip />
      <Person x={x} y={168} pose="sit" flip hair={hair} tone={tone} s={1.3} />
    </>
  )
}

export default [
  {
    id: 'ed-ing.source-or-feeling',
    title: 'bored или boring: кто источник, а кто чувствует',
    focus: ['ed', 'ing'],
    frames: [
      {
        scene: (
          <Scene label="Телевизор с фильмом, на нём метка boring; стрелка от него идёт к зрителю">
            <Prop name="tv" x={68} y={168} s={1.9} />
            <Chip x={68} y={40} w={84} pos="adj">
              boring
            </Chip>
            <Arrow from={[68, 55]} to={[68, 84]} />
            <Arrow from={[124, 126]} to={[208, 126]} />
            <Viewer />
            <Label x={68} y={190} muted size={15}>
              film
            </Label>
            <Label x={252} y={190} muted size={15}>
              I
            </Label>
          </Scene>
        ),
        en: 'The_D film_N is_V {boring_J} .',
        ru: 'Фильм — источник: от него скука идёт к зрителю. Метка на источнике: -ing, boring.',
      },
      {
        scene: (
          <Scene label="Та же сцена, но метка bored теперь на зрителе, который получает скуку">
            <Prop name="tv" x={68} y={168} s={1.9} />
            <Arrow from={[124, 126]} to={[208, 126]} />
            <Viewer />
            <Chip x={252} y={40} w={76} pos="adj">
              bored
            </Chip>
            <Arrow from={[252, 55]} to={[252, 66]} />
            <Label x={68} y={190} muted size={15}>
              film
            </Label>
            <Label x={252} y={190} muted size={15}>
              I
            </Label>
          </Scene>
        ),
        en: 'I_P +’m_V {bored_J} .',
        ru: 'Скука дошла до человека. Метка на том, кто чувствует: -ed, bored. «Мне скучно» — I am bored.',
      },
      {
        scene: (
          <Scene label="Человек рассказывает, от него стрелка идёт к слушателю: метка boring на говорящем, а слушателю скучно">
            <Person x={64} y={168} pose="talk" s={1.3} />
            <Chip x={64} y={32} w={84} pos="adj">
              boring
            </Chip>
            <Arrow from={[64, 47]} to={[64, 56]} />
            <Arrow from={[112, 120]} to={[196, 120]} />
            <Viewer hair="long" tone={1} />
            <Label x={64} y={190} muted size={15}>
              he
            </Label>
            <Label x={252} y={190} muted size={15}>
              bored
            </Label>
          </Scene>
        ),
        en: 'He_P is_V {boring_J} .',
        ru: 'Человек тоже бывает источником: он скучный, и скучно другим. «Я скучный» — I’m boring, а «мне скучно» — I’m bored.',
      },
    ],
  },
  {
    id: 'ed-ing.pairs',
    title: 'Пары: interesting / interested, exciting / excited',
    focus: ['ed', 'ing'],
    frames: [
      {
        scene: (
          <Scene label="Книга с меткой interesting; стрелка идёт к читателю с меткой interested (серой)">
            <Prop name="book" x={68} y={168} s={1.9} />
            <Chip x={68} y={40} w={110} pos="adj">
              interesting
            </Chip>
            <Arrow from={[68, 55]} to={[68, 102]} />
            <Arrow from={[118, 134]} to={[208, 134]} />
            <Viewer />
            <Chip x={252} y={40} w={110}>
              interested
            </Chip>
          </Scene>
        ),
        en: 'The_D book_N is_V {interesting_J} .',
        ru: 'Книга интересна, а не «заинтересована»: источник — -ing.',
      },
      {
        scene: (
          <Scene label="Самолёт, то есть поездка, с серой меткой exciting; стрелка к человеку с меткой excited">
            <Prop name="plane" x={68} y={150} s={1.5} />
            <Chip x={68} y={40} w={96}>
              exciting
            </Chip>
            <Arrow from={[68, 55]} to={[68, 100]} />
            <Arrow from={[124, 126]} to={[208, 126]} />
            <Viewer />
            <Chip x={252} y={40} w={96} pos="adj">
              excited
            </Chip>
            <Arrow from={[252, 55]} to={[252, 66]} />
          </Scene>
        ),
        en: 'We_P are_V {excited_J} about_I the_D trip_N .',
        ru: 'Поездка захватывает — exciting, а в предвкушении мы — excited. Чувствует человек — -ed, а about показывает, о чём.',
      },
      {
        scene: (
          <Scene label="Листок календаря, день, с меткой tiring; стрелка к уставшему человеку с серой меткой tired">
            <Prop name="calendar-page" x={68} y={168} s={1.9} />
            <Chip x={68} y={40} w={84} pos="adj">
              tiring
            </Chip>
            <Arrow from={[68, 55]} to={[68, 90]} />
            <Arrow from={[124, 126]} to={[208, 126]} />
            <Viewer />
            <Chip x={252} y={40} w={76}>
              tired
            </Chip>
          </Scene>
        ),
        en: 'It_P was_V a_D {tiring_J} day_N .',
        ru: 'День утомляет — tiring, а я от него устал — tired. Источник и человек всегда получают разные слова.',
      },
    ],
  },
] satisfies TopicStories
