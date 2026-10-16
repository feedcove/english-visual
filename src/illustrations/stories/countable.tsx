import { Bubble, Check, Cross, Frame, Label, Many, Person, Prop, Scene } from '../kit'
import { Part } from '../kit/extra/nouns'
import type { TopicStories } from '../types'

// Исчисляемое — отдельные предметы, которые считают (1-2-3). Неисчисляемое — масса в посуде или целая «куча»: считать нельзя,
// считают порции (cup of, piece of). Выделено существительное (noun); во второй истории — глагол is (единственное число).

/** Номера над предметами: 1, 2, 3 — «можно посчитать». */
const Counts = ({ xs, y }: { xs: number[]; y: number }) => (
  <>
    {xs.map((x, i) => (
      <Label key={x} x={x} y={y} size={20} muted>
        {i + 1}
      </Label>
    ))}
  </>
)

export default [
  {
    id: 'countable.count-or-mass',
    title: 'Можно посчитать по штукам?',
    focus: ['count', 'mass', 'piece'],
    frames: [
      {
        scene: (
          <Scene label="Три яблока отдельно друг от друга, над ними числа 1, 2, 3: исчисляемое, поэтому apples">
            <Counts xs={[70, 160, 250]} y={78} />
            <Prop name="apple" x={70} y={168} s={1.9} />
            <Prop name="apple" x={160} y={168} s={1.9} />
            <Prop name="apple" x={250} y={168} s={1.9} />
            <Label x={160} y={194} size={20}>
              three apple<Part pos="noun">s</Part>
            </Label>
          </Scene>
        ),
        en: 'I_P ate_V three_M {apples_N} .',
        ru: 'Яблоки — отдельные штуки: 1, 2, 3. Исчисляемое можно посчитать и поставить во множественное число.',
      },
      {
        scene: (
          <Scene label="Миска риса: масса без отдельных штук; a rice и two rices зачёркнуты, some rice верно">
            <Prop name="rice" x={74} y={168} s={2.6} hl pos="noun" />
            <Label x={150} y={64} anchor="start" size={17} muted>
              a rice
            </Label>
            <Cross x={290} y={58} size={18} />
            <Label x={150} y={112} anchor="start" size={17} muted>
              two rices
            </Label>
            <Cross x={290} y={106} size={18} />
            <Label x={150} y={160} anchor="start" size={17}>
              some <Part pos="noun">rice</Part>
            </Label>
            <Check x={290} y={154} size={20} />
          </Scene>
        ),
        en: 'I_P need_V some_D {rice_N} .',
        ru: 'Рис — «масса»: отдельных штук нет, поэтому нет a и -s. Вместо a берём some.',
      },
      {
        scene: (
          <Scene label="Две чашки кофе, над ними числа 1 и 2: считаем чашки, а не сам кофе">
            <Counts xs={[104, 204]} y={78} />
            <Prop name="coffee" x={104} y={168} s={2.2} />
            <Prop name="coffee" x={204} y={168} s={2.2} />
            <Label x={160} y={44} size={12} muted>
              считаем чашки, а не сам кофе
            </Label>
            <Label x={154} y={194} size={19}>
              two <Part pos="noun">cups</Part> of coffee
            </Label>
          </Scene>
        ),
        en: 'Two_M {cups_N} of_I coffee_N , please_R .',
        ru: 'Само coffee не посчитать, зато чашки — можно. Считаем порции: two cups of coffee.',
      },
    ],
  },
  {
    id: 'countable.russian-plural',
    title: 'Ловушка русского: новости, советы, деньги',
    focus: ['mass', 'piece'],
    frames: [
      {
        scene: (
          <Scene label="Три письма в одной рамке — одна масса news; news is верно, news are зачёркнуто">
            <Label x={14} y={30} anchor="start" size={12} muted>
              по-русски «новости» — много штук
            </Label>
            <Label x={14} y={48} anchor="start" size={12} muted>
              по-английски — одна масса
            </Label>
            <Frame x={10} y={94} w={166} h={76} dashed />
            <Prop name="letter" x={44} y={166} s={1.4} />
            <Prop name="letter" x={93} y={166} s={1.4} />
            <Prop name="letter" x={142} y={166} s={1.4} />
            <Label x={196} y={118} anchor="start" size={17}>
              news <Part pos="verb">is</Part>
            </Label>
            <Check x={298} y={112} size={18} />
            <Label x={196} y={154} anchor="start" size={17} muted>
              news are
            </Label>
            <Cross x={298} y={148} size={16} />
            <Label x={93} y={194} size={19}>
              news
            </Label>
          </Scene>
        ),
        en: 'The_D news_N {is_V} good_J .',
        ru: 'По-русски «новости» — много штук, а английское news — одна масса. Единственное число: is, а не are.',
      },
      {
        scene: (
          <Scene label="Человек даёт совет — лампочка в пузыре. advices и an advice зачёркнуты, a piece of advice верно" ground={false}>
            <Person x={40} y={168} pose="talk" s={1.4} />
            <Bubble x={106} y={50} w={74} h={62} tail="left">
              <Prop name="idea" x={106} y={80} s={1.1} />
            </Bubble>
            <Label x={176} y={62} anchor="start" size={14} muted>
              advices
            </Label>
            <Cross x={160} y={57} size={14} />
            <Label x={176} y={112} anchor="start" size={14} muted>
              an advice
            </Label>
            <Cross x={160} y={107} size={14} />
            <Label x={176} y={162} anchor="start" size={14}>
              a <Part pos="noun">piece</Part> of advice
            </Label>
            <Check x={160} y={157} size={16} />
          </Scene>
        ),
        en: 'Let_V me_P give_V you_P a_D {piece_N} of_I advice_N .',
        ru: 'Русские «советы» — много, а advice не считается: ни a, ни -s. Один совет — a piece of advice.',
      },
      {
        scene: (
          <Scene label="Четыре монеты в одной рамке — одна масса money; money is верно, money are зачёркнуто">
            <Label x={14} y={30} anchor="start" size={12} muted>
              по-русски «деньги» — много штук
            </Label>
            <Label x={14} y={48} anchor="start" size={12} muted>
              по-английски — одна масса
            </Label>
            <Frame x={10} y={92} w={172} h={78} dashed />
            <Many name="coin" n={4} x={37} y={166} gap={41} s={1.5} />
            <Label x={196} y={118} anchor="start" size={17}>
              money <Part pos="verb">is</Part>
            </Label>
            <Check x={300} y={112} size={18} />
            <Label x={196} y={154} anchor="start" size={17} muted>
              money are
            </Label>
            <Cross x={300} y={148} size={16} />
            <Label x={96} y={194} size={19}>
              money
            </Label>
          </Scene>
        ),
        en: 'My_P money_N {is_V} in_I my_P wallet_N .',
        ru: 'По-русски «деньги» во множественном числе, а money — одна масса: is, а не are, и нет -s.',
      },
    ],
  },
] satisfies TopicStories
