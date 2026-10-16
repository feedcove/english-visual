import { Arrow, Bubble, Check, Label, Person, Prop, Scene } from '../kit'
import { Train, trainSlots } from '../kit/extra/quant-sentence'
import type { Car } from '../kit/extra/quant-sentence'
import type { TopicStories } from '../types'

// Вопрос. Слова — вагончики, вспомогательный (aux) — цветом вспомогательного глагола: в утверждении он стоит после подлежащего,
// в вопросе выезжает вперёд; нет вспомогательного — подставляем do. Голос вверх — по-русски; по-английски нужна перестановка.

const Q = ({ x, y }: { x: number; y: number }) => (
  <Label x={x} y={y} size={22} muted>
    ?
  </Label>
)

/** Тонкая линия «голос идёт вверх»: ровно, потом вверх к концу фразы. */
const Rise = ({ x, y, w }: { x: number; y: number; w: number }) => (
  <g>
    <path d={`M${x} ${y}H${x + w - 36}Q${x + w - 12} ${y} ${x + w} ${y - 26}`} className="st-line" strokeDasharray="2 6" strokeWidth="2.5" />
    <path d={`M${x + w - 9} ${y - 20}L${x + w} ${y - 27}L${x + w + 3} ${y - 16}`} className="st-line" strokeWidth="2.5" />
  </g>
)

/** Реплика с подсвеченным вспомогательным: «Yes, I do.» */
const Answer = ({ x, y, before, aux, after = '.' }: { x: number; y: number; before: string; aux: string; after?: string }) => (
  <Label x={x} y={y} size={15}>
    {before}{' '}
    <tspan className="st-label-pos" data-pos="aux" fontWeight={700}>
      {aux}
    </tspan>
    {after}
  </Label>
)

const whoSlot = trainSlots([{ text: 'Tom' }, { text: 'lives' }, { text: 'here' }], 140)[0]!.mid
const driveRow: Car[] = [{ text: 'You' }, { text: 'can', pos: 'aux' }, { text: 'drive' }]
const askRow: Car[] = [{ text: 'Can', pos: 'aux' }, { text: 'you' }, { text: '', ghost: true, w: 40 }, { text: 'drive' }]

export default [
  {
    id: 'aux-questions.aux-forward',
    title: 'Вопрос: вспомогательный выезжает вперёд',
    focus: ['statement', 'question', 'do-support'],
    frames: [
      {
        scene: (
          <Scene label="Утверждение: вагончики You, can, drive стоят по порядку; человек говорит, что умеет водить машину">
            <Person x={64} y={168} pose="talk" s={1.1} />
            <Prop name="car" x={246} y={168} s={1.5} />
            <Train y={40} cars={driveRow} />
          </Scene>
        ),
        en: 'You_P {can_A} drive_V .',
        ru: 'Утверждение: подлежащее, потом вспомогательный can, потом глагол. Вспомогательный стоит между ними.',
      },
      {
        scene: (
          <Scene label="Вопрос: вагончик Can выехал в начало, на его месте осталась пустая рамка, you и drive на местах">
            <Person x={64} y={168} pose="think" s={1.1} />
            <Prop name="car" x={246} y={168} s={1.5} />
            <Train y={40} cars={askRow} />
            {(() => {
              const s = trainSlots(askRow, 160)
              return (
                <>
                  <Arrow from={[s[2]!.mid, 32]} to={[s[0]!.mid, 32]} tone="motion" bend={22} />
                  <Q x={s[3]!.x + s[3]!.w + 14} y={62} />
                </>
              )
            })()}
          </Scene>
        ),
        en: '{Can_A} you_P drive_V ?',
        ru: 'Вопрос делает перестановка: can выезжает вперёд, подлежащее и глагол остаются на местах.',
      },
      {
        scene: (
          <Scene ground={false} label="Сверху русский вопрос: порядок слов тот же, голос идёт вверх. Снизу английский: впереди Do, дальше you, like, tea">
            <Label x={22} y={22} anchor="start" size={12} muted>
              по-русски: порядок тот же, голос вверх
            </Label>
            <Rise x={60} y={60} w={200} />
            <Train y={68} cars={[{ text: 'Ты' }, { text: 'любишь' }, { text: 'чай' }]} />
            <Label x={22} y={128} anchor="start" size={12} muted>
              по-английски: вспомогательный вперёд
            </Label>
            <Train y={138} cars={[{ text: 'Do', pos: 'aux' }, { text: 'you' }, { text: 'like' }, { text: 'tea' }]} />
            <Check x={290} y={153} size={22} />
          </Scene>
        ),
        en: '{Do_A} you_P like_V tea_N ?',
        ru: 'Русский вопрос — голос вверх. Английскому нужна перестановка, а вспомогательного нет — берём do (does, did).',
      },
    ],
  },
  {
    id: 'aux-questions.wh-who',
    title: 'Вопросительное слово — первым; who вместо подлежащего — без do',
    focus: ['wh', 'question'],
    frames: [
      {
        scene: (
          <Scene label="Женщина идёт к офису. Вагончики: Where в начале, потом does, she, work">
            <Person x={64} y={168} pose="walk" hair="long" s={1.1} />
            <Prop name="office" x={246} y={168} s={1.5} />
            <Train y={40} cars={[{ text: 'Where', pos: 'adv' }, { text: 'does' }, { text: 'she' }, { text: 'work' }]} />
            <Q x={296} y={62} />
          </Scene>
        ),
        en: '{Where_R} does_A she_P work_V ?',
        ru: 'Вопросительное слово — самое первое. Дальше порядок обычного вопроса: does, she, work.',
      },
      {
        scene: (
          <Scene ground={false} label="Сверху Tom lives here; снизу Who занимает место Tom, остальное не двигается, does нет">
            <Label x={22} y={26} anchor="start" size={12} muted>
              утверждение
            </Label>
            <Train y={34} cars={[{ text: 'Tom' }, { text: 'lives' }, { text: 'here' }]} cx={140} />
            <Arrow from={[whoSlot, 70]} to={[whoSlot, 104]} tone="ink" />
            <Label x={22} y={120} anchor="start" size={12} muted>
              вопрос: who на месте подлежащего
            </Label>
            <Train y={128} cars={[{ text: 'Who', pos: 'pron' }, { text: 'lives' }, { text: 'here' }]} cx={140} />
            <Q x={262} y={150} />
            <Prop name="house" x={288} y={172} s={0.9} />
          </Scene>
        ),
        en: '{Who_P} lives_V here_R ?',
        ru: 'Who — само подлежащее и стоит на его месте. Порядок как в утверждении, поэтому do не нужен: Who lives here?',
      },
    ],
  },
  {
    id: 'aux-questions.short-answer',
    title: 'Короткий ответ: повторяем вспомогательный',
    focus: ['short', 'question'],
    frames: [
      {
        scene: (
          <Scene label="Двое разговаривают: «Do you like tea?» — «Yes, I do.»; в ответе подсвечено do">
            <Person x={34} y={168} pose="talk" s={1.1} />
            <Person x={286} y={168} pose="stand" flip hair="long" tone={1} s={1.1} />
            <Bubble x={142} y={52} w={168} h={42} tail="left">
              <Label x={142} y={57} size={15}>
                Do you like tea?
              </Label>
            </Bubble>
            <Bubble x={178} y={108} w={140} h={42} tail="right">
              <Answer x={178} y={113} before="Yes, I" aux="do" />
            </Bubble>
          </Scene>
        ),
        en: 'Do_A you_P like_V tea_N ? — Yes, I_P {do_A} .',
        ru: 'В вопросе был do — им и отвечаем: Yes, I do. Глагол like повторять не нужно.',
      },
      {
        scene: (
          <Scene label="Двое разговаривают: «Can he swim?» — «No, he can’t.»; в ответе подсвечено can’t">
            <Person x={34} y={168} pose="talk" s={1.1} />
            <Person x={286} y={168} pose="stand" flip hair="long" tone={1} s={1.1} />
            <Bubble x={142} y={52} w={168} h={42} tail="left">
              <Label x={142} y={57} size={15}>
                Can he swim?
              </Label>
            </Bubble>
            <Bubble x={178} y={108} w={150} h={42} tail="right">
              <Answer x={178} y={113} before="No, he" aux="can’t" />
            </Bubble>
          </Scene>
        ),
        en: 'Can_A he_P swim_V ? — No, he_P {can’t_A} .',
        ru: 'Тот же приём: в вопросе был can — в ответе can или can’t. Какой вспомогательный спросили, такой и повторили.',
      },
    ],
  },
] satisfies TopicStories

