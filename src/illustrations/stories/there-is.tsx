import { Arrow, Check, Cross, Frame, Label, Person, Prop, Scene, Spot } from '../kit'
import { Train } from '../kit/extra/quant-sentence'
import type { TopicStories } from '../types'

// there is / there are. Глагол — стрелка от there к предмету: один предмет — is, несколько — are; место — в конце.
// История 2: there — «появилось, новость», it — «уже знаем» и погода. Выделено there / it — цветом местоимения (pron).

export default [
  {
    id: 'there-is.is-are',
    title: 'There is или there are: сколько предметов?',
    focus: ['there', 'there-plural'],
    frames: [
      {
        scene: (
          <Scene label="Комната в рамке, внутри один стол; от слова There стрелка is идёт к столу">
            <Frame x={140} y={52} w={164} h={118} label="the room" />
            <Prop name="table" x={228} y={168} s={1.5} />
            <Label x={56} y={92} size={24} muted>
              There
            </Label>
            <Arrow from={[92, 98]} to={[176, 124]} tone="action" label="is" bend={-8} />
          </Scene>
        ),
        en: 'There_P {is_V} a_D table_N in_I the_D room_N .',
        ru: 'Сообщаем, что в комнате что-то есть. Начинаем с there, стрелка is уходит к одному предмету.',
      },
      {
        scene: (
          <Scene label="В комнате два стула; стрелка от There идёт к обоим, подпись are">
            <Frame x={140} y={52} w={164} h={118} label="the room" />
            <Prop name="chair" x={196} y={168} s={1.5} />
            <Prop name="chair" x={262} y={168} s={1.5} />
            <Label x={56} y={92} size={24} muted>
              There
            </Label>
            <Arrow from={[92, 98]} to={[180, 112]} tone="action" label="are" bend={-6} />
            <Arrow from={[92, 98]} to={[246, 112]} tone="action" bend={-36} />
          </Scene>
        ),
        en: 'There_P {are_V} two_M chairs_N in_I the_D room_N .',
        ru: 'Предметов два — стрелка идёт к обоим, и вместо is — are. Форму выбирает то, что стоит сразу после.',
      },
      {
        scene: (
          <Scene ground={false} label="Сверху русский порядок «в комнате есть стол» с крестом, снизу английский: There is, потом предмет, место в конце">
            <Label x={24} y={26} anchor="start" size={12} muted>
              не так: место впереди
            </Label>
            <Train y={40} cars={[{ text: 'In the room', w: 88 }, { text: 'is', w: 34 }, { text: 'a table', w: 66 }]} cx={126} gap={6} />
            <Cross x={284} y={55} size={22} />
            <Label x={24} y={116} anchor="start" size={12} muted>
              так: there впереди, место в конце
            </Label>
            <Train y={130} cars={[{ text: 'There is', w: 74, pos: 'pron' }, { text: 'a table', w: 66 }, { text: 'in the room', w: 88 }]} cx={146} gap={6} />
            <Check x={288} y={145} size={22} />
          </Scene>
        ),
        en: '{There_P} is_V a_D table_N in_I the_D room_N .',
        ru: 'По-русски место ставят первым: «В комнате есть стол». По-английски впереди there, а место уезжает в конец.',
      },
    ],
  },
  {
    id: 'there-is.there-or-it',
    title: 'There или it: «вот что появилось» и «о нём уже говорили»',
    focus: ['there', 'it'],
    frames: [
      {
        scene: (
          <Scene label="Человек показывает на новую кошку в саду; стрелка от There идёт к кошке">
            <Person x={36} y={168} pose="point" s={1.2} />
            <Frame x={138} y={74} w={168} h={98} label="the garden" />
            <Prop name="cat" x={222} y={168} s={1.7} />
            <Label x={266} y={38} size={24} pos="pron">
              There
            </Label>
            <Arrow from={[262, 48]} to={[238, 100]} tone="action" label="is" bend={-6} />
          </Scene>
        ),
        en: '{There_P} is_V a_D cat_N in_I the_D garden_N .',
        ru: 'Кошка — новость, о ней только что узнали. Новое, что появилось в месте, вводим через there is.',
      },
      {
        scene: (
          <Scene label="Та же кошка в кольце: о ней уже знают, стрелка от слова It идёт к кошке">
            <Person x={36} y={168} pose="look" s={1.2} />
            <Prop name="cat" x={222} y={168} s={1.7} />
            <Spot x={222} y={134} r={46} pos="pron" />
            <Label x={222} y={38} size={24} pos="pron">
              It
            </Label>
            <Arrow from={[222, 48]} to={[222, 82]} tone="action" label="is" bend={6} />
          </Scene>
        ),
        en: '{It_P} is_V black_J .',
        ru: 'Кошка уже названа — мы её знаем. О ней говорим уже it is, а не there is.',
      },
      {
        scene: (
          <Scene label="Облако и снег: на улице холодно, говорим It is cold; There is cold зачёркнуто">
            <Prop name="cloud" x={96} y={78} s={1.8} />
            <Prop name="snow" x={70} y={130} s={1.1} />
            <Prop name="snow" x={122} y={142} s={1} />
            <Label x={204} y={74} anchor="end" size={26} pos="pron">
              It
            </Label>
            <Label x={212} y={74} anchor="start" size={20} muted>
              is cold
            </Label>
            <Label x={172} y={132} anchor="start" size={16} muted>
              There is cold
            </Label>
            <Cross x={292} y={127} size={18} />
          </Scene>
        ),
        en: '{It_P} is_V cold_J today_R .',
        ru: 'Про погоду, время и расстояние по-русски подлежащего нет («Холодно»), а по-английски нужно it. There is cold — нельзя: после there is идёт предмет, а cold — не предмет.',
      },
    ],
  },
] satisfies TopicStories
