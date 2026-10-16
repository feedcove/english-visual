import { Cross, Label, Many, Person, Prop, Scene, Spot } from '../kit'
import type { TopicStories } from '../types'

// a → the: сначала «одна из многих» (выделена одна, остальные приглушены), потом «та самая» (кольцо),
// и «единственная на свете» — the sun. Выделение — цветом артикля (det).

export default [
  {
    id: 'articles.a-then-the',
    title: 'a → the: сначала «одна из многих», потом «та самая»',
    focus: ['a', 'the', 'q-known', 'q-single'],
    frames: [
      {
        scene: (
          <Scene label="Человек показывает на одну кошку из четырёх; собеседник ещё не знает, на какую">
            <Person x={46} y={168} pose="point" s={1.45} />
            <Many name="cat" n={4} x={138} y={168} gap={50} s={1.4} hlIndex={2} pos="det" />
            <Label x={238} y={98} pos="det" size={15}>
              a cat
            </Label>
          </Scene>
        ),
        en: 'I_P can_A see_V {a_D} cat_N .',
        ru: 'Кошек много, и собеседник ещё не знает, какую я вижу. Одна из многих, впервые — a.',
      },
      {
        scene: (
          <Scene label="Та же кошка в кольце между двумя людьми: теперь оба знают, о какой речь">
            <Person x={52} y={168} pose="talk" s={1.45} />
            <Person x={270} y={168} pose="look" flip hair="long" tone={1} s={1.45} />
            <Prop name="cat" x={160} y={168} s={1.6} hl pos="det" />
            <Spot x={162} y={134} r={46} pos="det" />
            <Label x={162} y={74} pos="det" size={15}>
              the cat
            </Label>
          </Scene>
        ),
        en: '{The_D} cat_N is_V so_R sweet_J !',
        ru: 'Та же кошка, но теперь мы оба знаем, о какой речь: она уже была в разговоре. Та самая — the.',
      },
      {
        scene: (
          <Scene label="Три человека смотрят на одно солнце; «a sun» зачёркнуто">
            <Prop name="sun" x={130} y={86} s={1.6} hl pos="det" />
            <Label x={184} y={46} anchor="start" pos="det" size={16}>
              the sun
            </Label>
            <Label x={184} y={74} anchor="start" size={14} muted>
              a sun
            </Label>
            <Cross x={244} y={69} size={16} />
            <Person x={56} y={168} pose="look" s={1} />
            <Person x={160} y={168} pose="look" s={1} hair="long" tone={1} />
            <Person x={266} y={168} pose="look" flip s={1} tone={2} />
          </Scene>
        ),
        en: '{The_D} sun_N is_V very_R hot_J today_R .',
        ru: 'Солнце одно на всех — какое, понятно без пояснений. Поэтому сразу the, а не a.',
      },
    ],
  },
] satisfies TopicStories
