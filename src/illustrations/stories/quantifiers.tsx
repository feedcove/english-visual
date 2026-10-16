import { Arrow, Bubble, Check, Cross, Frame, Label, Many, Person, Prop, Scene } from '../kit'
import type { TopicStories } from '../types'

// Количества. Выделено слово-количество (many, much, a lot of, a few, some, any) — цветом определителя (det).
// История 1: штуки считаем (many), массу — нет (much), «много» по-русски одно; история 2: few / little — «мало», a few — «хватает»;
// история 3: some — «есть», any — «есть ли?» и «нет».

export default [
  {
    id: 'quantifiers.many-much',
    title: 'many или much: штуки считаем, массу — нет',
    focus: ['many', 'much', 'a-lot'],
    frames: [
      {
        scene: (
          <Scene label="Шесть яблок в ряд, над каждым номер: их можно сосчитать по одному">
            <Many name="apple" n={6} x={60} y={168} gap={40} s={1.1} />
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Label key={n} x={20 + n * 40} y={116} size={14} muted>
                {n}
              </Label>
            ))}
            <Label x={156} y={64} anchor="end" size={24} pos="det">
              many
            </Label>
            <Label x={166} y={64} anchor="start" size={24} muted>
              apples
            </Label>
          </Scene>
        ),
        en: 'How_R {many_D} apples_N are_V there_P ?',
        ru: 'Яблоки считаются по одному: 1, 2, 3… Штуки во множественном числе — many.',
      },
      {
        scene: (
          <Scene label="Миска риса, рядом «1, 2, 3?» зачёркнуто: рис по штукам не считают">
            <Prop name="rice" x={100} y={168} s={2.4} />
            <Label x={156} y={64} anchor="end" size={24} pos="det">
              much
            </Label>
            <Label x={166} y={64} anchor="start" size={24} muted>
              rice
            </Label>
            <Label x={222} y={116} size={22} muted>
              1 2 3
            </Label>
            <Cross x={294} y={109} size={22} />
            <Label x={238} y={150} size={12} muted>
              не посчитать
            </Label>
          </Scene>
        ),
        en: 'How_R {much_D} rice_N do_A you_P want_V ?',
        ru: 'Рис не посчитать по штукам — это масса. Массу меряют: much, а не many.',
      },
      {
        scene: (
          <Scene label="Русское «много» по-английски делится на many и much; в утверждении подходит a lot of для обоих">
            <Label x={160} y={30} size={16} muted>
              много
            </Label>
            <Arrow from={[160, 38]} to={[160, 56]} tone="ink" />
            <Label x={160} y={76} size={20} pos="det">
              a lot of
            </Label>
            <Frame x={28} y={92} w={264} h={84} dashed />
            <Many name="apple" n={3} x={64} y={168} gap={38} s={0.9} />
            <Prop name="rice" x={226} y={168} s={1.3} />
          </Scene>
        ),
        en: 'We_P have_V {a~lot~of_D} apples_N and_C rice_N .',
        ru: 'По-русски «много» одно на всё. В утверждении a lot of подходит и штукам, и массе; many и much чаще в вопросах и с not.',
      },
    ],
  },
  {
    id: 'quantifiers.few-a-few',
    title: 'few и a few: «хватает» или «мало»?',
    focus: ['few', 'a-few', 'little', 'a-little'],
    frames: [
      {
        scene: (
          <Scene label="Человек и рядом три друга в рамке: компания есть">
            <Person x={46} y={168} pose="talk" s={1.3} />
            <Frame x={116} y={76} w={178} h={96} pos="det" />
            <Person x={150} y={168} pose="stand" flip tone={1} s={1} hair="long" />
            <Person x={205} y={168} pose="stand" flip tone={2} s={1} />
            <Person x={260} y={168} pose="stand" flip tone={3} s={1} hair="long" />
            <Label x={205} y={52} size={24} pos="det">
              a few
            </Label>
            <Label x={205} y={72} size={12} muted>
              хватает
            </Label>
          </Scene>
        ),
        en: 'I_P have_V {a~few_D} friends_N here_R .',
        ru: 'Несколько друзей — компания есть, это радует. a few = «немного, но хватает».',
      },
      {
        scene: (
          <Scene label="Человек и один друг далеко в рамке, между ними пусто: почти никого">
            <Person x={46} y={168} pose="talk" s={1.3} />
            <Frame x={216} y={76} w={78} h={96} pos="det" />
            <Person x={255} y={168} pose="stand" flip tone={1} s={1} hair="long" />
            <Label x={255} y={52} size={24} pos="det">
              few
            </Label>
            <Label x={255} y={72} size={12} muted>
              маловато
            </Label>
          </Scene>
        ),
        en: 'I_P have_V {few_D} friends_N here_R .',
        ru: 'Без a — акцент на нехватке: друзей почти нет, не хватает. few = «мало».',
      },
      {
        scene: (
          <Scene label="Стакан с остатком воды: сказать few water нельзя, воду не считают штуками — только little">
            <Prop name="water-low" x={92} y={168} s={3.4} />
            <Label x={210} y={70} size={20} muted>
              few water
            </Label>
            <Cross x={290} y={64} size={20} />
            <Label x={210} y={118} size={20} pos="det">
              little water
            </Label>
            <Check x={296} y={112} size={20} />
          </Scene>
        ),
        en: 'There_P is_V {little_D} water_N in_I the_D glass_N .',
        ru: 'Воду по штукам не считают, поэтому few здесь нельзя. Для массы — little («мало»), a little — «немного, хватает».',
      },
    ],
  },
  {
    id: 'quantifiers.some-any',
    title: 'some или any: есть — или «есть ли?» и «нет»',
    focus: ['some', 'any'],
    frames: [
      {
        scene: (
          <Scene label="Человек показывает на стол, на котором лежат три яблока">
            <Person x={48} y={168} pose="point" s={1.4} />
            <Prop name="table" x={214} y={168} s={1.8} />
            <Many name="apple" n={3} x={184} y={114} gap={30} s={0.8} />
            <Label x={214} y={58} size={24} pos="det">
              some
            </Label>
          </Scene>
        ),
        en: 'We_P have_V {some_D} apples_N .',
        ru: 'Яблоки есть, и я это знаю — some. Утверждение: «есть немного».',
      },
      {
        scene: (
          <Scene label="Человек спрашивает про яблоки: в пузыре яблоко и знак вопроса: есть ли яблоки — неизвестно">
            <Person x={48} y={168} pose="talk" s={1.4} />
            <Bubble x={206} y={92} w={140} h={64} tail="left">
              <Prop name="apple" x={176} y={118} s={1.1} />
              <Prop name="question" x={236} y={118} s={1} />
            </Bubble>
            <Label x={206} y={44} size={24} pos="det">
              any
            </Label>
          </Scene>
        ),
        en: 'Do_A you_P have_V {any_D} apples_N ?',
        ru: 'Я не знаю, есть ли хоть одно яблоко. В вопросе — any.',
      },
      {
        scene: (
          <Scene label="Пустой стол, над ним крест: яблок нет">
            <Person x={48} y={168} pose="stand" s={1.4} />
            <Prop name="table" x={214} y={168} s={1.8} />
            <Cross x={214} y={112} size={44} />
            <Label x={214} y={58} size={24} pos="det">
              any
            </Label>
          </Scene>
        ),
        en: 'We_P don’t_A have_V {any_D} apples_N .',
        ru: 'После not — тоже any: «ни одного, хоть сколько-нибудь». В обычном отрицании some не ставят.',
      },
    ],
  },
] satisfies TopicStories
