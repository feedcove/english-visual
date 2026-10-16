import { Arrow, Bubble, Frame, Label, Many, Person, Prop, Scene } from '../kit'
import type { TopicStories } from '../types'

// История 1: два вопроса — близко или далеко, один или много. Близкое крупное и в руке, далёкое мельче и подальше.
// История 2: this is — про того, кто рядом (знакомство, «это я» по телефону), that — про того, кто на другом конце.
// Выделено слово цветом артикля/определителя (det) с существительным и цветом местоимения (pron) без него.

type Near = boolean
type Many1 = boolean

/** Сцена «человек показывает на яблоки»: близко — крупно у руки, далеко — мельче и на другом конце. */
function Apples({ near, many, label }: { near: Near; many: Many1; label: string }) {
  const word = near ? (many ? 'these' : 'this') : many ? 'those' : 'that'
  const s = near ? (many ? 1.25 : 1.6) : 1
  const gap = near ? 38 : 30
  const x = near ? (many ? 134 : 150) : many ? 232 : 262
  const n = many ? 3 : 1
  const fx = near ? (many ? 110 : 122) : many ? 214 : 242
  const fw = near ? (many ? 124 : 56) : many ? 96 : 40
  const fy = near ? (many ? 108 : 100) : 122
  const fh = 170 - fy
  return (
    <Scene label={label}>
      <Person x={50} y={168} pose="point" s={1.5} />
      <Many name="apple" n={n} x={x} y={168} gap={gap} s={s} />
      <Frame x={fx} y={fy} w={fw} h={fh} pos="det" dashed />
      <Label x={fx + fw / 2} y={fy - 10} pos="det" size={20}>
        {word}
      </Label>
      <Arrow from={[74, 177]} to={[fx - 6, 177]} tone="dim" />
      <Label x={(74 + fx - 6) / 2} y={195} muted size={12}>
        {near ? 'рядом' : 'далеко'}
      </Label>
    </Scene>
  )
}

export default [
  {
    id: 'demonstratives.near-far',
    title: 'this, that, these, those: близко или далеко, один или много',
    focus: ['this', 'that', 'these', 'those'],
    frames: [
      {
        scene: <Apples near many={false} label="Человек показывает на одно яблоко совсем рядом с ним: this" />,
        en: 'I_P like_V {this_D} apple_N .',
        ru: 'Яблоко рядом, и оно одно — this.',
      },
      {
        scene: <Apples near many label="Человек показывает на три яблока рядом с ним: these" />,
        en: 'I_P like_V {these_D} apples_N .',
        ru: 'Всё так же рядом, но яблок несколько — these.',
      },
      {
        scene: <Apples near={false} many label="Человек показывает на три яблока вдалеке: those" />,
        en: 'I_P like_V {those_D} apples_N .',
        ru: 'Яблок по-прежнему несколько, но теперь далеко — those.',
      },
      {
        scene: <Apples near={false} many={false} label="Человек показывает на одно яблоко вдалеке: that" />,
        en: 'I_P like_V {that_D} apple_N .',
        ru: 'Далеко и одно — that. Два вопроса: близко или далеко, один или много.',
      },
    ],
  },
  {
    id: 'demonstratives.this-that-people',
    title: 'This is… и Is that…? — кто рядом, а кто на другом конце',
    focus: ['this', 'that'],
    frames: [
      {
        scene: (
          <Scene label="Анна представляет Кейт стоящего рядом с ней Бена: о нём она говорит this is">
            <Bubble x={110} y={36} w={176} h={34} tail="left">
              <Label x={36} y={41} anchor="start" size={14} muted>
                Kate,
              </Label>
              <Label x={76} y={41} anchor="start" size={14} pos="pron">
                this
              </Label>
              <Label x={104} y={41} anchor="start" size={14} muted>
                is Ben.
              </Label>
            </Bubble>
            <Person x={50} y={168} pose="point" s={1.3} hair="long" />
            <Person x={118} y={168} s={1.3} tone={1} hl pos="pron" />
            <Person x={262} y={168} s={1.3} flip hair="long" tone={2} />
            <Label x={50} y={190} muted size={14}>
              Anna
            </Label>
            <Label x={118} y={190} pos="pron" size={14}>
              Ben
            </Label>
            <Label x={262} y={190} muted size={14}>
              Kate
            </Label>
          </Scene>
        ),
        en: 'Kate_N , {this_P} is_V Ben_N .',
        ru: 'Ben стоит рядом с Анной, это «близкий» человек — this. Так знакомят людей.',
      },
      {
        scene: (
          <Scene label="Анна и Том говорят по телефону; Анна называет себя, это this is">
            <Person x={64} y={168} pose="hold" s={1.3} hair="long" hl pos="pron" />
            <Prop name="phone" x={102} y={128} s={0.9} />
            <Person x={256} y={168} pose="hold" s={1.3} flip tone={1} />
            <Prop name="phone" x={218} y={128} s={0.9} />
            <Arrow from={[118, 96]} to={[202, 96]} tone="dim" dashed bend={-14} />
            <Label x={64} y={60} pos="pron" size={20}>
              this
            </Label>
            <Label x={64} y={190} pos="pron" size={14}>
              Anna
            </Label>
            <Label x={256} y={190} muted size={14}>
              Tom
            </Label>
          </Scene>
        ),
        en: 'Hello , {this_P} is_V Anna_N .',
        ru: 'По телефону себя называют через this: говорящий всегда «здесь», у своей трубки.',
      },
      {
        scene: (
          <Scene label="Те же Анна и Том по телефону; теперь Анна спрашивает про Тома на другом конце: Is that Tom">
            <Person x={64} y={168} pose="hold" s={1.3} hair="long" />
            <Prop name="phone" x={102} y={128} s={0.9} />
            <Person x={256} y={168} pose="hold" s={1.3} flip tone={1} hl pos="pron" />
            <Prop name="phone" x={218} y={128} s={0.9} />
            <Arrow from={[118, 96]} to={[202, 96]} tone="dim" dashed bend={-14} />
            <Label x={256} y={60} pos="pron" size={20}>
              that
            </Label>
            <Label x={64} y={190} muted size={14}>
              Anna
            </Label>
            <Label x={256} y={190} pos="pron" size={14}>
              Tom
            </Label>
          </Scene>
        ),
        en: 'Is_V {that_P} Tom_N ?',
        ru: 'О том, кто на другом конце провода, — that: Is that Tom?',
      },
    ],
  },
] satisfies TopicStories
