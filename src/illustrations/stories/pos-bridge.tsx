import { Arrow, Bubble, Frame, Label, Person, Prop, Scene } from '../kit'
import { Ask, Chip, Tie } from '../kit/extra/words'
import type { TopicStories } from '../types'

// Русский и английский: смысловые слова те же, а служебные (is, a, do, there, it) английский добавляет.
// Пустая пунктирная ячейка — слово, которого в русском нет; заполненная цветом — слово, которое добавил английский.

/** Ячейка для слова, которого нет по-русски (пунктир). */
function Slot({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Frame x={x - 20} y={y - 15} w={40} h={30} dashed />
      <Ask x={x} y={y + 34}>
        нет
      </Ask>
    </g>
  )
}

export default [
  {
    id: 'pos-bridge.is-and-a',
    title: 'Она врач, а по-английски She is a doctor: что добавилось',
    focus: ['same', 'be', 'article'],
    frames: [
      {
        scene: (
          <Scene label="Женщина и слово «врач»; между ними две пустые ячейки: по-русски связки и артикля нет">
            <Person x={50} y={168} pose="stand" hair="long" tone={1} s={1.6} />
            <Slot x={128} y={104} />
            <Slot x={180} y={104} />
            <Chip x={248} y={104} pos="noun">
              врач
            </Chip>
          </Scene>
        ),
        en: 'Она_P {врач_N} .',
        lang: 'ru',
        ru: 'По-русски достаточно двух слов: она — врач. Между ними пусто, и перед «врач» тоже.',
      },
      {
        scene: (
          <Scene label="В первую ячейку встало слово is: оно связывает she и doctor">
            <Person x={50} y={168} pose="stand" hair="long" tone={1} s={1.6} />
            <Chip x={128} y={104} pos="verb">
              is
            </Chip>
            <Slot x={180} y={104} />
            <Chip x={248} y={104}>
              doctor
            </Chip>
          </Scene>
        ),
        en: 'She_P {is_V} a_D doctor_N .',
        ru: 'Английскому нужен глагол в каждом предложении. Связку «есть», которую русский опускает, ставит is.',
      },
      {
        scene: (
          <Scene label="Во вторую ячейку встало a: один из многих врачей">
            <Person x={50} y={168} pose="stand" hair="long" tone={1} s={1.6} />
            <Chip x={128} y={104}>
              is
            </Chip>
            <Chip x={180} y={104} pos="det">
              a
            </Chip>
            <Chip x={248} y={104}>
              doctor
            </Chip>
          </Scene>
        ),
        en: 'She_P is_V {a_D} doctor_N .',
        ru: 'Исчисляемое существительное в единственном числе не стоит без артикля. Один врач из многих — a.',
      },
    ],
  },
  {
    id: 'pos-bridge.do-there-it',
    title: 'Ты любишь чай? В комнате стол. Холодно: do, there, it',
    focus: ['same', 'aux', 'there'],
    frames: [
      {
        scene: (
          <Scene label="Человек спрашивает про чай; перед вопросом стоит слово Do, которого по-русски нет">
            <Person x={52} y={168} pose="talk" s={1.5} />
            <Bubble x={196} y={92} w={104} h={64} tail="left">
              <Prop name="tea" x={170} y={112} s={1.4} />
              <Label x={226} y={104} size={26}>
                ?
              </Label>
            </Bubble>
            <Chip x={196} y={36} pos="aux">
              Do
            </Chip>
            <Tie from={[196, 52]} to={[196, 60]} />
          </Scene>
        ),
        en: '{Do_A} you_P like_V tea_N ?',
        ru: 'По-русски вопрос — интонация: «Ты любишь чай?». Английский ставит впереди помощника Do, и вопрос готов.',
      },
      {
        scene: (
          <Scene label="Комната со столом; слово There стоит в начале, на месте подлежащего, и ни на что не указывает">
            <Chip x={70} y={60} pos="pron">
              There
            </Chip>
            <Ask x={70} y={96}>
              не «там»
            </Ask>
            <Frame x={136} y={34} w={168} h={134} label="room" />
            <Prop name="table" x={220} y={168} s={1.8} />
          </Scene>
        ),
        en: '{There_P} is_V a_D table_N in_I the_D room_N .',
        ru: 'По-русски «В комнате стол». Английскому нужно начало: There is — «есть». There здесь не «там», а пустое место подлежащего.',
      },
      {
        scene: (
          <Scene label="Человеку холодно, идёт снег; слово It стоит отдельно: пустое подлежащее, не снег и не человек">
            <Chip x={56} y={60} pos="pron">
              It
            </Chip>
            <Ask x={56} y={96}>
              пустое
            </Ask>
            <Person x={150} y={168} pose="stand" s={1.5} />
            <Prop name="snow" x={250} y={150} s={2} />
          </Scene>
        ),
        en: '{It_P} is_V cold_J today_R .',
        ru: 'По-русски «Холодно» — подлежащего нет. Английскому оно нужно всегда: пустое it обозначает погоду вокруг.',
      },
    ],
  },
  {
    id: 'pos-bridge.ending-to-word',
    title: 'Дал маме, а по-английски gave Mum: окончание → предлог или порядок',
    focus: ['same', 'case', 'order'],
    frames: [
      {
        scene: (
          <Scene label="Человек дарит книгу маме: по-русски кому — это окончание «-е» в слове «маме»">
            <Person x={52} y={168} pose="give" s={1.5} />
            <Prop name="book" x={150} y={128} s={1.3} />
            <Arrow from={[96, 70]} to={[222, 70]} tone="ink" bend={-12} />
            <Person x={262} y={168} pose="stand" flip hair="long" tone={1} s={1.5} hl pos="noun" />
            <Label x={262} y={191} pos="noun" size={15}>
              маме
            </Label>
            <Ask x={180} y={34}>
              кому? — окончание -е
            </Ask>
          </Scene>
        ),
        en: 'Я_P дал_V книгу_N {маме_N} .',
        lang: 'ru',
        ru: 'Кто получил книгу, русский показывает окончанием: маме. Порядок слов при этом можно менять.',
      },
      {
        scene: (
          <Scene label="Та же сцена: роль получателя теперь показывает предлог to перед Mum">
            <Person x={52} y={168} pose="give" s={1.5} />
            <Prop name="book" x={140} y={128} s={1.3} />
            <Arrow from={[96, 70]} to={[222, 70]} tone="ink" bend={-12} />
            <Chip x={196} y={110} pos="prep">
              to
            </Chip>
            <Person x={262} y={168} pose="stand" flip hair="long" tone={1} s={1.5} />
            <Label x={262} y={191} size={15} muted>
              Mum
            </Label>
          </Scene>
        ),
        en: 'I_P gave_V the_D book_N {to_I} Mum_N .',
        ru: 'У слова Mum окончания нет, поэтому роль «кому» берёт предлог to: книга — to Mum.',
      },
      {
        scene: (
          <Scene label="Без предлога: слова в ряд gave, Mum, the book — Mum сразу после глагола; порядок вместо окончания">
            <Person x={52} y={168} pose="give" s={1.5} />
            <Chip x={92} y={34}>
              gave
            </Chip>
            <Chip x={176} y={34} pos="noun">
              Mum
            </Chip>
            <Chip x={266} y={34}>
              the book
            </Chip>
            <Tie from={[176, 50]} to={[176, 70]} />
            <Tie from={[266, 50]} to={[266, 120]} />
            <Person x={176} y={168} pose="stand" flip hair="long" tone={1} s={1.3} />
            <Prop name="book" x={266} y={168} s={1.6} />
          </Scene>
        ),
        en: 'I_P gave_V {Mum_N} the_D book_N .',
        ru: 'Можно и без to: получатель встаёт сразу после глагола, а книга — за ним. Роль показывает порядок.',
      },
    ],
  },
] satisfies TopicStories
