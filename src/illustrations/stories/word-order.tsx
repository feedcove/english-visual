import { Arrow, Check, Cross, Label, Person, Prop, Scene } from '../kit'
import { Train, trainSlots } from '../kit/extra/quant-sentence'
import type { TopicStories } from '../types'

// Порядок слов — «поезд»: S (кто) — V (что делает) — O (что, кого) — M (как) — P (где) — T (когда). Слова — вагончики.
// История 1: роль задаёт место (Anna loves Tom / Tom loves Anna); история 2: вагончики по порядку, время можно перецепить вперёд;
// история 3: дополнение прижато к глаголу.

export default [
  {
    id: 'word-order.who-does-what',
    title: 'Кто стоит до глагола, тот и делает',
    focus: ['S', 'V', 'O'],
    frames: [
      {
        scene: (
          <Scene label="Анна слева смотрит на Тома: стрелка loves идёт от Анны к Тому; вагончики Anna, loves, Tom">
            <Train y={30} cars={[{ text: 'Anna', pos: 'noun', tag: 'S' }, { text: 'loves', tag: 'V' }, { text: 'Tom', tag: 'O' }]} gap={8} />
            <Person x={62} y={168} pose="look" hair="long" tone={1} s={1.25} hl pos="noun" />
            <Person x={258} y={168} pose="stand" flip tone={2} s={1.25} />
            <Arrow from={[96, 108]} to={[224, 108]} tone="action" label="loves" bend={-20} />
          </Scene>
        ),
        en: '{Anna_N} loves_V Tom_N .',
        ru: 'Anna стоит перед глаголом — значит, она и любит. Стрелка начинается у неё.',
      },
      {
        scene: (
          <Scene label="Те же двое, но стрелка loves теперь идёт от Тома к Анне; вагончики Tom, loves, Anna">
            <Train y={30} cars={[{ text: 'Tom', tag: 'S' }, { text: 'loves', tag: 'V' }, { text: 'Anna', pos: 'noun', tag: 'O' }]} gap={8} />
            <Person x={62} y={168} pose="stand" hair="long" tone={1} s={1.25} hl pos="noun" />
            <Person x={258} y={168} pose="look" flip tone={2} s={1.25} />
            <Arrow from={[224, 108]} to={[96, 108]} tone="action" label="loves" bend={20} />
          </Scene>
        ),
        en: 'Tom_N loves_V {Anna_N} .',
        ru: 'Слова те же, а Anna переехала за глагол — теперь любят её. Роль задаёт место, не окончание.',
      },
      {
        scene: (
          <Scene label="Сверху русский порядок «Эту книгу прочитала Анна» слово в слово: The book read Anna, крест. Снизу Anna read the book, галочка; стрелка read идёт от Анны к книге">
            <Label x={22} y={20} anchor="start" size={12} muted>
              по-русски можно: Эту книгу прочитала Анна
            </Label>
            <Train y={28} cars={[{ text: 'The book' }, { text: 'read' }, { text: 'Anna' }]} cx={150} gap={8} />
            <Cross x={292} y={43} size={20} />
            <Train y={72} cars={[{ text: 'Anna', pos: 'noun' }, { text: 'read' }, { text: 'the book' }]} cx={150} gap={8} />
            <Check x={292} y={87} size={22} />
            <Person x={70} y={168} pose="stand" hair="long" tone={1} s={0.85} hl pos="noun" />
            <Prop name="book" x={252} y={168} s={1.2} />
            <Arrow from={[100, 140]} to={[222, 140]} tone="action" label="read" bend={-10} />
          </Scene>
        ),
        en: '{Anna_N} read_V the_D book_N .',
        ru: 'Русский порядок слово в слово — The book read Anna — значит «книга прочитала Анну». Читает Анна — значит, она перед глаголом.',
      },
    ],
  },
  {
    id: 'word-order.train',
    title: 'Поезд слов: кто — что делает — что — как — где — когда',
    focus: ['S', 'V', 'O', 'M', 'P', 'T'],
    frames: [
      {
        scene: (
          <Scene label="Поезд из четырёх вагончиков She, speaks, English, very well с подписями S, V, O, M; рядом говорящая женщина">
            <Train y={44} wheels size={13} cars={[{ text: 'She', tag: 'S' }, { text: 'speaks', tag: 'V' }, { text: 'English', tag: 'O' }, { text: 'very well', pos: 'adv', tag: 'M' }]} gap={5} />
            <Person x={160} y={168} pose="talk" hair="long" s={1.1} />
          </Scene>
        ),
        en: 'She_P speaks_V English_N very_R {well_R} .',
        ru: 'Сначала кто, что делает и что. Потом «как» — very well: оно едет за дополнением.',
      },
      {
        scene: (
          <Scene label="Поезд I, bought, a bag, in Rome, last year с подписями S, V, O, P, T">
            <Train
              y={44}
              wheels
              size={12}
              cars={[{ text: 'I', tag: 'S' }, { text: 'bought', tag: 'V' }, { text: 'a bag', tag: 'O' }, { text: 'in Rome', pos: 'prep', tag: 'P' }, { text: 'last year', tag: 'T' }]}
              gap={4}
            />
            <Person x={100} y={168} pose="hold" s={1.1} />
            <Prop name="bag" x={196} y={168} s={1.5} />
          </Scene>
        ),
        en: 'I_P bought_V a_D bag_N {in_I} Rome_N last_J year_N .',
        ru: 'Дальше — где (P), потом когда (T). Порядок вагончиков не меняем: место раньше времени.',
      },
      {
        scene: (
          <Scene ground={false} label="Два поезда: сверху время last year в конце, снизу вагончик last year перецеплен в начало, стрелка показывает переезд">
            <Train y={28} size={12} cars={[{ text: 'I', tag: 'S' }, { text: 'bought', tag: 'V' }, { text: 'a bag', tag: 'O' }, { text: 'in Rome', tag: 'P' }, { text: 'last year', tag: 'T' }]} cx={160} gap={4} />
            <Train y={112} size={12} cars={[{ text: 'Last year', pos: 'noun', tag: 'T' }, { text: 'I', tag: 'S' }, { text: 'bought', tag: 'V' }, { text: 'a bag', tag: 'O' }, { text: 'in Rome', tag: 'P' }]} cx={160} gap={4} />
            {(() => {
              const top = trainSlots([{ text: 'I' }, { text: 'bought' }, { text: 'a bag' }, { text: 'in Rome' }, { text: 'last year' }], 160, 4, 12)
              const bot = trainSlots([{ text: 'Last year' }, { text: 'I' }, { text: 'bought' }, { text: 'a bag' }, { text: 'in Rome' }], 160, 4, 12)
              return <Arrow from={[top[4]!.mid, 64]} to={[bot[0]!.mid, 91]} tone="motion" bend={-12} />
            })()}
          </Scene>
        ),
        en: '{Last~year_N} I_P bought_V a_D bag_N in_I Rome_N .',
        ru: 'Время можно перецепить в начало — это только акцент. Между глаголом и дополнением его ставить нельзя.',
      },
    ],
  },
  {
    id: 'word-order.o-next-to-v',
    title: 'Дополнение прижато к глаголу',
    focus: ['O', 'V', 'P'],
    frames: [
      {
        scene: (
          <Scene label="Том играет в футбол в парке: стрелка plays от Тома сразу идёт к вагончику football, за ним in the park">
            <Train y={40} size={12} cars={[{ text: 'Tom' }, { text: 'plays' }, { text: 'football', pos: 'noun' }, { text: 'in the park' }]} cx={160} gap={4} />
            <Person x={52} y={168} pose="run" s={1.15} />
            <Prop name="football" x={118} y={168} s={1.2} hl pos="noun" />
            <Prop name="tree" x={252} y={168} s={1.5} />
            {(() => {
              const s = trainSlots([{ text: 'Tom' }, { text: 'plays' }, { text: 'football' }, { text: 'in the park' }], 160, 4, 12)
              return <Arrow from={[s[1]!.mid, 32]} to={[s[2]!.mid, 32]} tone="action" bend={10} />
            })()}
          </Scene>
        ),
        en: 'Tom_N plays_V {football_N} in_I the_D park_N .',
        ru: 'Глагол тянет стрелку к дополнению сразу, без остановок. Что играет — football, и только потом где.',
      },
      {
        scene: (
          <Scene ground={false} label="Сверху плохой порядок: между plays и football встал вагончик in the park, стрелка вынуждена его перепрыгивать, крест. Снизу правильный порядок, галочка">
            <Label x={22} y={24} anchor="start" size={12} muted>
              плохо: между ними чужой вагончик
            </Label>
            <Train y={54} size={12} cars={[{ text: 'Tom' }, { text: 'plays' }, { text: 'in the park' }, { text: 'football' }]} cx={146} gap={4} />
            {(() => {
              const s = trainSlots([{ text: 'Tom' }, { text: 'plays' }, { text: 'in the park' }, { text: 'football' }], 146, 4, 12)
              return <Arrow from={[s[1]!.mid, 46]} to={[s[3]!.mid, 46]} tone="action" bend={26} />
            })()}
            <Cross x={296} y={69} size={20} />
            <Label x={22} y={118} anchor="start" size={12} muted>
              хорошо: plays → football сразу
            </Label>
            <Train y={128} size={12} cars={[{ text: 'Tom' }, { text: 'plays' }, { text: 'football', pos: 'noun' }, { text: 'in the park' }]} cx={146} gap={4} />
            <Check x={296} y={143} size={22} />
          </Scene>
        ),
        en: 'Tom_N plays_V {football_N} in_I the_D park_N .',
        ru: 'Сначала «что», потом «где»: Tom plays football in the park, а не in the park football. Дополнение от глагола не отрываем.',
      },
    ],
  },
] satisfies TopicStories

