import { Arrow, Check, Cross, Frame, Label, Many, Person, Prop, Scene, Spot } from '../kit'
import type { Pos } from '../../content/types'
import type { TopicStories } from '../types'

// Степени сравнения. Короткие слова «растут» вместе с человеком: tall → taller → the tallest (рост = степень).
// Длинные слова не растут — перед ними встаёт помощник more / most. Особые слова меняют корень.
// Выделена одна метка кадра цветом своей части речи (adj — слово, adv — more / most / as … as).

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

/** Пунктирная линия уровня: что на одной высоте, что выше. */
const Level = ({ x1, x2, y }: { x1: number; x2: number; y: number }) => <line x1={x1} x2={x2} y1={y} y2={y} className="st-line" strokeDasharray="4 5" />

/** Рост человека при масштабе s (макушка волос на 77 над ногами). */
const top = (s: number) => 168 - 77 * s

export default [
  {
    id: 'comparison.steps',
    title: 'tall → taller → the tallest: слово растёт вместе с ростом',
    focus: ['er', 'than', 'as'],
    frames: [
      {
        scene: (
          <Scene label="Один человек, рядом линейка высоты: tall — просто высокий">
            <Person x={140} y={168} pose="stand" s={1.3} />
            <path d={`M196 168 V${top(1.3)} M190 168 H202 M190 ${top(1.3)} H202`} className="st-line" />
            <Chip x={246} y={118} w={64} pos="adj">
              tall
            </Chip>
            <Label x={140} y={190} muted size={15}>
              Tom
            </Label>
          </Scene>
        ),
        en: 'Tom_N is_V {tall_J} .',
        ru: 'Один человек, ни с кем не сравниваем: обычная форма — tall.',
      },
      {
        scene: (
          <Scene label="Том выше Кейт: пунктир на уровне головы Кейт, над ним стрелка вверх до макушки Тома">
            <Person x={90} y={168} pose="stand" s={1.3} />
            <Person x={212} y={168} pose="stand" hair="long" tone={1} s={1} />
            <Level x1={120} x2={212} y={top(1)} />
            <Arrow from={[120, top(1)]} to={[120, top(1.3) + 2]} />
            <Chip x={90} y={30} w={72} pos="adj">
              taller
            </Chip>
            <Arrow from={[90, 45]} to={[90, 56]} />
            <Label x={90} y={190} muted size={15}>
              Tom
            </Label>
            <Label x={151} y={190} muted size={14}>
              than
            </Label>
            <Label x={212} y={190} muted size={15}>
              Kate
            </Label>
          </Scene>
        ),
        en: 'Tom_N is_V {taller_J} than_C Kate_N .',
        ru: 'Двое: сверху прибавилось, к слову прибавилось -er. «Чем» — than.',
      },
      {
        scene: (
          <Scene label="Три человека разного роста; пунктир на уровне головы самого высокого, Макса, выше всех">
            <Person x={64} y={168} pose="stand" hair="long" tone={1} s={0.95} />
            <Person x={156} y={168} pose="stand" s={1.2} />
            <Person x={252} y={168} pose="stand" tone={2} s={1.45} />
            <Level x1={34} x2={290} y={top(1.45)} />
            <Label x={204} y={35} anchor="end" muted size={14}>
              the
            </Label>
            <Chip x={252} y={30} w={84} pos="adj">
              tallest
            </Chip>
            <Label x={64} y={190} muted size={14}>
              Kate
            </Label>
            <Label x={156} y={190} muted size={14}>
              Tom
            </Label>
            <Label x={252} y={190} muted size={14}>
              Max
            </Label>
          </Scene>
        ),
        en: 'Max_N is_V the_D {tallest_J} .',
        ru: 'Трое и больше: самый высокий из всех — the tallest. Перед превосходной формой обычно стоит the.',
      },
      {
        scene: (
          <Scene label="Двое одного роста, пунктир на уровне обеих голов и знак равенства между ними">
            <Person x={110} y={168} pose="stand" hair="long" tone={1} s={1.2} />
            <Person x={212} y={168} pose="stand" s={1.2} />
            <Level x1={72} x2={250} y={top(1.2)} />
            <Label x={161} y={130} size={30} weight={700} muted>
              =
            </Label>
            <Chip x={161} y={34} w={92} pos="adv">
              as … as
            </Chip>
            <Label x={110} y={190} muted size={15}>
              Anna
            </Label>
            <Label x={212} y={190} muted size={15}>
              Tom
            </Label>
          </Scene>
        ),
        en: 'Anna_N is_V {as_R} tall_J as_C Tom_N .',
        ru: 'Рост одинаковый — tall не меняется, его просто берут в as … as: «такая же высокая, как».',
      },
    ],
  },
  {
    id: 'comparison.more-most',
    title: 'expensive не растёт: ему ставят more / most',
    focus: ['more', 'er'],
    frames: [
      {
        scene: (
          <Scene label="Две сумки, левая за 20 фунтов, правая за 60: перед словом expensive встало more">
            <Prop name="bag" x={76} y={168} s={1.5} />
            <Prop name="bag" x={246} y={168} s={1.5} />
            <Label x={76} y={190} muted size={15}>
              £20
            </Label>
            <Label x={246} y={190} muted size={15}>
              £60
            </Label>
            <Label x={161} y={150} muted size={14}>
              than
            </Label>
            <Label x={226} y={44} anchor="end" size={16} pos="adv">
              more
            </Label>
            <Label x={232} y={44} anchor="start" size={16}>
              expensive
            </Label>
            <Arrow from={[252, 56]} to={[252, 104]} />
          </Scene>
        ),
        en: 'This_D bag_N is_V {more_R} expensive_J than_C that_D one_P .',
        ru: 'Слово длинное, -er к нему не приклеить. Вместо этого перед ним встаёт помощник more.',
      },
      {
        scene: (
          <Scene label="Три сумки за 20, 60 и 90 фунтов: самая дорогая обведена, перед expensive стоят the most">
            <Prop name="bag" x={60} y={168} s={1.4} />
            <Prop name="bag" x={150} y={168} s={1.4} />
            <Prop name="bag" x={240} y={168} s={1.4} />
            <Spot x={240} y={139} r={30} pos="adv" />
            <Label x={60} y={190} muted size={15}>
              £20
            </Label>
            <Label x={150} y={190} muted size={15}>
              £60
            </Label>
            <Label x={240} y={190} muted size={15}>
              £90
            </Label>
            <Label x={90} y={40} anchor="start" size={16}>
              the
            </Label>
            <Label x={122} y={40} anchor="start" size={16} pos="adv">
              most
            </Label>
            <Label x={166} y={40} anchor="start" size={16}>
              expensive
            </Label>
            <Arrow from={[222, 50]} to={[238, 100]} bend={-10} />
          </Scene>
        ),
        en: 'This_D is_V the_D {most_R} expensive_J bag_N in_I the_D shop_N .',
        ru: 'Из трёх и больше самая дорогая — the most expensive. Тот же помощник, только сильнее: most.',
      },
      {
        scene: (
          <Scene ground={false} label="Слева человек и «taller» с галочкой, «more tall» зачёркнуто; справа сумка и «more expensive» с галочкой, «expensiver» зачёркнуто">
            <Person x={72} y={100} pose="stand" s={0.9} />
            <Prop name="bag" x={246} y={100} s={1.3} />
            <Check x={30} y={124} size={16} />
            <Label x={46} y={130} anchor="start" size={15}>
              taller
            </Label>
            <Cross x={30} y={160} size={14} />
            <Label x={46} y={165} anchor="start" size={15} muted>
              more tall
            </Label>
            <Check x={176} y={124} size={16} />
            <Label x={192} y={130} anchor="start" size={15} pos="adv">
              more
            </Label>
            <Label x={232} y={130} anchor="start" size={15}>
              expensive
            </Label>
            <Cross x={176} y={160} size={14} />
            <Label x={192} y={165} anchor="start" size={15} muted>
              expensiver
            </Label>
          </Scene>
        ),
        en: 'This_D bag_N is_V {more_R} expensive_J than_C that_D one_P .',
        ru: 'Короткое слово растёт само (taller), длинное не растёт, ему нужен помощник. Одно из двух: либо -er, либо more.',
      },
    ],
  },
  {
    id: 'comparison.good-better-best',
    title: 'good → better → the best: особые слова меняют корень',
    focus: ['irregular'],
    frames: [
      {
        scene: (
          <Scene label="Три строки: good с одной звездой, better с двумя, the best с тремя" ground={false}>
            <Label x={26} y={56} anchor="start" size={18}>
              good
            </Label>
            <Many name="star" n={1} x={190} y={68} gap={42} s={0.95} />
            <Label x={26} y={108} anchor="start" size={18} pos="adj">
              better
            </Label>
            <Many name="star" n={2} x={190} y={120} gap={42} s={0.95} />
            <Label x={26} y={160} anchor="start" size={18}>
              the best
            </Label>
            <Many name="star" n={3} x={190} y={172} gap={42} s={0.95} />
          </Scene>
        ),
        en: 'This_D is_V {better_J} than_C that_D one_P .',
        ru: 'Звёзд больше — слово другое: good → better → the best. Никаких -er и -est, у слова другой корень.',
      },
      {
        scene: (
          <Scene label="Три строки: bad с одной тучей, worse с двумя, the worst с тремя" ground={false}>
            <Label x={26} y={56} anchor="start" size={18}>
              bad
            </Label>
            <Many name="cloud" n={1} x={186} y={66} gap={50} s={0.85} />
            <Label x={26} y={108} anchor="start" size={18} pos="adj">
              worse
            </Label>
            <Many name="cloud" n={2} x={186} y={118} gap={50} s={0.85} />
            <Label x={26} y={160} anchor="start" size={18}>
              the worst
            </Label>
            <Many name="cloud" n={3} x={186} y={170} gap={50} s={0.85} />
          </Scene>
        ),
        en: 'Today_N is_V {worse_J} than_C yesterday_R .',
        ru: 'То же с bad: bad → worse → the worst. Эти формы нужно просто запомнить.',
      },
      {
        scene: (
          <Scene label="Четыре строки: better с галочкой, more better зачёркнуто, the best с галочкой, the most best зачёркнуто" ground={false}>
            <Label x={40} y={46} anchor="start" size={18} pos="adj">
              better
            </Label>
            <Check x={288} y={40} size={18} />
            <Label x={40} y={90} anchor="start" size={18} muted>
              more better
            </Label>
            <Cross x={288} y={84} size={16} />
            <Label x={40} y={134} anchor="start" size={18}>
              the best
            </Label>
            <Check x={288} y={128} size={18} />
            <Label x={40} y={178} anchor="start" size={18} muted>
              the most best
            </Label>
            <Cross x={288} y={172} size={16} />
          </Scene>
        ),
        en: 'This_D is_V {better_J} .',
        ru: 'better уже и есть «более хороший»: more добавлять не надо. По-русски «более лучший» тоже звучит странно.',
      },
    ],
  },
] satisfies TopicStories
