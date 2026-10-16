import { Arrow, At, Check, Cross, Frame, Label, Person, Prop, Scene } from '../kit'
import { Part } from '../kit/extra/nouns'
import type { TopicStories } from '../types'

// ’s — стрелка владения от человека к вещи: владелец идёт первым и получает ’s. Выделен владелец (цвет noun).
// История 2 — несколько владельцев (parents’, children’s), история 3 — of для вещей и один ’s на двоих.

export default [
  {
    id: 'possessive-s.owner-first',
    title: 'Anna’s bag: сначала владелец, потом вещь',
    focus: ['s'],
    frames: [
      {
        scene: (
          <Scene label="Анна и её сумка: стрелка владения идёт от Анны к сумке, у владельца ’s">
            <Person x={64} y={168} pose="stand" hair="long" s={1.6} hl pos="noun" />
            <Prop name="bag" x={244} y={168} s={2.3} />
            <Arrow from={[108, 118]} to={[196, 128]} tone="ink" bend={-14} />
            <Label x={152} y={96} size={22}>
              ’s
            </Label>
            <Label x={64} y={192} size={20} pos="noun">
              Anna’s
            </Label>
            <Label x={244} y={192} size={20} muted>
              bag
            </Label>
          </Scene>
        ),
        en: 'This_P is_V {Anna’s_N} bag_N .',
        ru: 'Сумка принадлежит Anna: к владельцу добавляем ’s, стрелка владения идёт от человека к вещи.',
      },
      {
        scene: (
          <Scene label="Сверху по-русски: машина, потом брат. Снизу по-английски: брат с ’s, потом машина" ground={false}>
            <Label x={14} y={18} anchor="start" size={11} muted>
              по-русски: вещь, потом владелец
            </Label>
            <Prop name="car" x={56} y={92} s={1.1} />
            <Person x={150} y={92} pose="stand" s={0.8} tone={1} />
            <Arrow from={[134, 56]} to={[88, 62]} tone="ink" bend={10} />
            <Label x={196} y={66} anchor="start" size={16} muted>
              машина брата
            </Label>
            <Label x={14} y={116} anchor="start" size={11} muted>
              по-английски: владелец, потом вещь
            </Label>
            <Person x={56} y={188} pose="stand" s={0.8} tone={1} hl pos="noun" />
            <Prop name="car" x={150} y={188} s={1.1} />
            <Arrow from={[84, 152]} to={[126, 158]} tone="ink" bend={-10} />
            <Label x={196} y={162} anchor="start" size={16}>
              brother<Part pos="noun">’s</Part> car
            </Label>
          </Scene>
        ),
        en: 'It_P is_V my_P {brother’s_N} car_N .',
        ru: 'По-русски вещь идёт первой, владелец после: «машина брата». По-английски наоборот: владелец + ’s, потом вещь.',
      },
    ],
  },
  {
    id: 'possessive-s.plural-owners',
    title: 'Несколько владельцев: parents’, children’s',
    focus: ['s-plural', 'irregular-plural'],
    frames: [
      {
        scene: (
          <Scene label="Двое родителей и один дом: у слова parents уже есть s, поэтому добавляем только апостроф">
            <Frame x={14} y={56} w={128} h={114} pos="noun" dashed />
            <Person x={52} y={168} pose="stand" s={1.3} tone={1} />
            <Person x={104} y={168} pose="stand" s={1.3} hair="long" tone={2} />
            <Arrow from={[148, 112]} to={[196, 122]} tone="ink" bend={-10} />
            <Prop name="house" x={244} y={168} s={2.1} />
            <Label x={78} y={196} size={20} pos="noun">
              parents’
            </Label>
            <Label x={244} y={196} size={20} muted>
              house
            </Label>
            <Label x={160} y={34} size={12} muted>
              -s уже есть — ставим только ’
            </Label>
          </Scene>
        ),
        en: 'This_P is_V my_P {parents’_N} house_N .',
        ru: 'Владельцев двое, и слово parents уже кончается на -s. Второе s не нужно — только апостроф.',
      },
      {
        scene: (
          <Scene label="Трое детей и одна кровать: у слова children нет s, поэтому добавляем ’s">
            <Frame x={14} y={76} w={148} h={94} pos="noun" dashed />
            <Person x={44} y={168} pose="stand" s={1.0} tone={1} />
            <Person x={88} y={168} pose="stand" s={1.0} hair="long" tone={2} />
            <Person x={132} y={168} pose="stand" s={1.0} tone={3} />
            <Arrow from={[168, 120]} to={[206, 128]} tone="ink" bend={-10} />
            <Prop name="bed" x={258} y={168} s={1.3} />
            <Label x={88} y={196} size={20} pos="noun">
              children’s
            </Label>
            <Label x={258} y={196} size={20} muted>
              room
            </Label>
            <Label x={160} y={44} size={12} muted>
              нет -s — добавляем ’s
            </Label>
          </Scene>
        ),
        en: 'This_P is_V the_D {children’s_N} room_N .',
        ru: 'Children — множественное число без -s, поэтому добавляем ’s, как к одному человеку: children’s.',
      },
      {
        scene: (
          <Scene label="Слева один родитель: апостроф перед s. Справа двое: апостроф после s" ground={false}>
            <At x={0} y={0} dim>
              <Person x={40} y={160} pose="stand" s={1.0} hair="long" tone={2} />
              <Prop name="house" x={96} y={160} s={1.2} />
              <Label x={68} y={190} size={15}>
                parent’s house
              </Label>
            </At>
            <Frame x={150} y={64} w={84} h={102} pos="noun" dashed />
            <Person x={172} y={160} pose="stand" s={1.0} tone={1} />
            <Person x={212} y={160} pose="stand" s={1.0} hair="long" tone={2} />
            <Prop name="house" x={272} y={160} s={1.2} />
            <Label x={214} y={190} size={15}>
              <Part pos="noun">parents’</Part> house
            </Label>
            <Label x={68} y={44} size={12} muted>
              один владелец
            </Label>
            <Label x={192} y={44} size={12} muted>
              двое
            </Label>
          </Scene>
        ),
        en: 'My_P {parents’_N} house_N is_V by_I the_D sea_N .',
        ru: 'Апостроф стоит там, где кончается слово-владелец: parent’s — один, parents’ — двое.',
      },
    ],
  },
  {
    id: 'possessive-s.things-and-shared',
    title: 'of — для вещей, один ’s — для общей вещи',
    focus: ['of', 's'],
    frames: [
      {
        scene: (
          <Scene label="Верх страницы отмечен рамкой: the top of the page верно, the page’s top не говорят" ground={false}>
            <Prop name="paper" x={64} y={170} s={2.6} />
            <Frame x={38} y={62} w={64} h={36} dashed />
            <Label x={128} y={60} anchor="start" size={17}>
              the top <Part pos="prep">of</Part> the page
            </Label>
            <Check x={296} y={54} size={20} />
            <Label x={128} y={130} anchor="start" size={17} muted>
              the page’s top
            </Label>
            <Cross x={296} y={124} size={18} />
          </Scene>
        ),
        en: 'Write_V your_P name_N at_I the_D top_N {of_I} the_D page_N .',
        ru: 'Страница — вещь, а не человек. Для части вещи обычно берём of, а не ’s: the top of the page.',
      },
      {
        scene: (
          <Scene label="Том и Кейт вместе владеют одним домом: апостроф-s только у второго имени">
            <Frame x={12} y={56} w={134} h={114} pos="noun" dashed />
            <Person x={50} y={168} pose="stand" s={1.3} tone={1} />
            <Person x={106} y={168} pose="stand" s={1.3} hair="long" tone={2} />
            <Arrow from={[152, 112]} to={[198, 122]} tone="ink" bend={-10} />
            <Prop name="house" x={248} y={168} s={2.1} />
            <Label x={79} y={196} size={18}>
              Tom and Kate<Part pos="noun">’s</Part>
            </Label>
            <Label x={248} y={196} size={18} muted>
              house
            </Label>
          </Scene>
        ),
        en: 'Tom_N and_C {Kate’s_N} house_N is_V small_J .',
        ru: 'Дом один на двоих — и ’s тоже один, в конце: Tom and Kate’s house.',
      },
    ],
  },
] satisfies TopicStories
