import { Arrow, Frame, Label, Many, Person, Prop, Scene } from '../kit'
import { Part } from '../kit/extra/nouns'
import type { TopicStories } from '../types'

// Множественное число: слева один предмет, справа несколько, под ними слово с изменившейся частью (цвет noun).
// История 1 — окончания -s / -es / -ies и русская ловушка (книга, книги, книг), 2 — особые формы, 3 — f → ves и слова без изменений.

/** Стрелка «один → несколько» между левой и правой частями кадра. */
const To = () => <Arrow from={[104, 118]} to={[140, 118]} tone="ink" />

export default [
  {
    id: 'noun-plural.endings',
    title: 'Как стать множественным: -s, -es, -ies',
    focus: ['s', 'es', 'ies'],
    frames: [
      {
        scene: (
          <Scene label="Одна кошка и три кошки: к слову cat добавили s">
            <Prop name="cat" x={62} y={168} s={2.1} />
            <To />
            <Many name="cat" n={3} x={168} y={168} gap={56} s={1.6} />
            <Label x={64} y={192} size={20}>
              cat
            </Label>
            <Label x={224} y={192} size={20}>
              cat<Part pos="noun">s</Part>
            </Label>
          </Scene>
        ),
        en: 'Anna_N has_V three_M {cats_N} .',
        ru: 'Обычное слово просто получает -s: один cat, три cats.',
      },
      {
        scene: (
          <Scene label="Одна коробка и три коробки: после x добавили es, получился лишний слог">
            <Prop name="box" x={62} y={168} s={1.3} />
            <To />
            <Many name="box" n={3} x={170} y={168} gap={56} s={0.85} />
            <Label x={64} y={192} size={20}>
              box
            </Label>
            <Label x={226} y={192} size={20}>
              box<Part pos="noun">es</Part>
            </Label>
            <Label x={226} y={60} size={12} muted>
              слышен лишний слог
            </Label>
          </Scene>
        ),
        en: 'There_P are_V three_M {boxes_N} here_R .',
        ru: 'После s, x, ch, sh одного -s не слышно, поэтому добавляем -es: box → boxes, лишний слог.',
      },
      {
        scene: (
          <Scene label="Одна вишня и три вишни: y после согласной сменилась на ies">
            <Prop name="cherry" x={62} y={168} s={1.9} />
            <To />
            <Many name="cherry" n={3} x={168} y={168} gap={56} s={1.25} />
            <Label x={64} y={192} size={20}>
              cherry
            </Label>
            <Label x={224} y={192} size={20}>
              cherr<Part pos="noun">ies</Part>
            </Label>
            <Label x={224} y={60} size={12} muted>
              y → ies
            </Label>
          </Scene>
        ),
        en: 'I_P bought_V some_D {cherries_N} .',
        ru: 'Согласная + y: y превращается в -ies. Было cherry, стало cherries.',
      },
      {
        scene: (
          <Scene label="По-русски книга, книги, книг; по-английски только book и books">
            {[
              [90, '1', '●', 'книга', 'book'],
              [170, '2', '●●', 'книги', 'books'],
              [250, '5', '●●●●●', 'книг', 'books'],
            ].map(([x, n, dots, ru, en]) => (
              <g key={n}>
                <Label x={x as number} y={36} size={22}>
                  {n}
                </Label>
                <Label x={x as number} y={56} size={11} muted>
                  {dots}
                </Label>
                <Label x={x as number} y={100} size={17} muted>
                  {ru}
                </Label>
                <Label x={x as number} y={156} size={22}>
                  book{en === 'books' ? <Part pos="noun">s</Part> : null}
                </Label>
              </g>
            ))}
            <Label x={14} y={78} anchor="start" size={11} muted>
              по-русски: три формы
            </Label>
            <Label x={14} y={130} anchor="start" size={11} muted>
              по-английски: две формы
            </Label>
            <Frame x={126} y={134} w={164} h={32} pos="noun" />
          </Scene>
        ),
        en: 'There_P are_V five_M {books_N} on_I the_D table_N .',
        ru: 'По-русски форма меняется: книга, книги, книг. В английском два варианта: один — book, любое другое число — books.',
      },
    ],
  },
  {
    id: 'noun-plural.special',
    title: 'Особые формы: man → men, child → children, foot → feet',
    focus: ['irregular'],
    frames: [
      {
        scene: (
          <Scene label="Один мужчина и трое мужчин: слово изменилось целиком, man стало men">
            <Person x={62} y={168} pose="stand" s={1.65} />
            <To />
            <Person x={168} y={168} pose="stand" s={1.4} tone={1} />
            <Person x={224} y={168} pose="stand" s={1.4} tone={2} />
            <Person x={280} y={168} pose="stand" s={1.4} tone={3} />
            <Label x={64} y={192} size={20}>
              man
            </Label>
            <Label x={224} y={192} size={20} pos="noun">
              men
            </Label>
          </Scene>
        ),
        en: 'Three_M {men_N} work_V here_R .',
        ru: 'Не man + s, а новое слово: man → men. Эту форму надо просто знать.',
      },
      {
        scene: (
          <Scene label="Один ребёнок и трое детей: child меняется на children">
            <Person x={62} y={168} pose="stand" s={1.1} />
            <To />
            <Person x={168} y={168} pose="stand" s={1.1} tone={1} />
            <Person x={224} y={168} pose="stand" s={1.1} tone={2} hair="long" />
            <Person x={280} y={168} pose="stand" s={1.1} tone={3} />
            <Label x={64} y={192} size={20}>
              child
            </Label>
            <Label x={224} y={192} size={20} pos="noun">
              children
            </Label>
          </Scene>
        ),
        en: 'The_D {children_N} are_V in_I the_D garden_N .',
        ru: 'child → children: тоже особая форма, окончания -s здесь нет.',
      },
      {
        scene: (
          <Scene label="Одна ступня и две ступни: foot меняется на feet">
            <Prop name="foot" x={60} y={168} s={2.1} />
            <To />
            <Prop name="foot" x={178} y={168} s={1.9} />
            <Prop name="foot" x={266} y={168} s={1.9} />
            <Label x={64} y={192} size={20}>
              foot
            </Label>
            <Label x={224} y={192} size={20} pos="noun">
              feet
            </Label>
          </Scene>
        ),
        en: 'My_P {feet_N} are_V cold_J .',
        ru: 'foot → feet: гласные внутри слова меняются. Так же tooth → teeth, mouse → mice.',
      },
    ],
  },
  {
    id: 'noun-plural.ves-same',
    title: 'shelf → shelves, но sheep остаётся sheep',
    focus: ['ves', 'same'],
    frames: [
      {
        scene: (
          <Scene label="Одна полка и две полки: f в конце сменилась на ves">
            <Prop name="shelf" x={62} y={168} s={1.5} />
            <To />
            <Many name="shelf" n={2} x={184} y={168} gap={72} s={1.25} />
            <Label x={64} y={192} size={20}>
              shelf
            </Label>
            <Label x={220} y={192} size={20}>
              shel<Part pos="noun">ves</Part>
            </Label>
            <Label x={220} y={60} size={12} muted>
              f → ves
            </Label>
          </Scene>
        ),
        en: 'There_P are_V two_M {shelves_N} here_R .',
        ru: 'Многие слова на f / fe меняют её на -ves: shelf → shelves, knife → knives.',
      },
      {
        scene: (
          <Scene label="Одна овца и три овцы: слово sheep не меняется">
            <Prop name="sheep" x={62} y={168} s={1.8} />
            <Label x={130} y={126} size={30}>
              =
            </Label>
            <Many name="sheep" n={3} x={170} y={168} gap={56} s={1.1} />
            <Label x={64} y={192} size={20}>
              sheep
            </Label>
            <Label x={226} y={192} size={20} pos="noun">
              sheep
            </Label>
          </Scene>
        ),
        en: 'The_D children_N saw_V some_D {sheep_N} .',
        ru: 'Одна овца и много овец — то же слово. Так же fish и deer: two sheep, не sheeps.',
      },
    ],
  },
] satisfies TopicStories
