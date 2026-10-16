import { Arrow, Bubble, CalendarPage, Check, Clock, Cross, Frame, Label, Person, Prop, Scene, Spot } from '../kit'
import type { TopicStories } from '../types'

// Модальные глаголы. Выделение — цветом модального (aux): запрет против «не обязательно», шкала уверенности, неизменный can.

const SCALE_Y = 158
const STOPS = { cant: 56, might: 160, must: 264 } as const

/** Шкала уверенности: can’t be — might — must be. Активная точка в кольце, подпись цветом модального. */
function Scale({ active }: { active: keyof typeof STOPS }) {
  const word = { cant: 'can’t be', might: 'might', must: 'must be' } as const
  const hint = { cant: 'точно нет', might: 'возможно', must: 'точно да' } as const
  return (
    <g>
      <path d={`M36 ${SCALE_Y}H290`} className="st-axis" />
      {(Object.keys(STOPS) as (keyof typeof STOPS)[]).map((k) => (
        <g key={k}>
          <circle cx={STOPS[k]} cy={SCALE_Y} r={k === active ? 7 : 5} className="st-sym-fill" data-pos={k === active ? 'aux' : undefined} style={k === active ? { fill: 'var(--pc)' } : undefined} />
          <Label x={STOPS[k]} y={SCALE_Y - 16} muted size={11} weight={500}>
            {hint[k]}
          </Label>
          <Label x={STOPS[k]} y={SCALE_Y + 26} pos={k === active ? 'aux' : undefined} muted={k !== active} size={14}>
            {word[k]}
          </Label>
        </g>
      ))}
      <Spot x={STOPS[active]} y={SCALE_Y} r={15} pos="aux" />
    </g>
  )
}

export default [
  {
    id: 'modals.mustnt-vs-dont-have-to',
    title: 'mustn’t или don’t have to: нельзя или не обязательно?',
    focus: ['mustnt', 'dont-have-to', 'must', 'have-to'],
    frames: [
      {
        scene: (
          <Scene label="Машина зачёркнута большим крестом: парковаться нельзя; человек показывает на неё">
            <Person x={64} y={168} pose="point" s={1.4} />
            <Prop name="car" x={216} y={168} s={1.9} />
            <Cross x={216} y={138} size={56} />
            <Label x={216} y={76} pos="aux" size={17}>
              mustn’t
            </Label>
          </Scene>
        ),
        en: 'You_P {mustn’t_A} park_V here_R .',
        ru: 'Запрещено: крест перечёркивает само действие. Выбора у тебя нет — mustn’t.',
      },
      {
        scene: (
          <Scene label="Бесплатный автобус: человек с кошельком может заплатить, а может и не платить — оба пути в порядке">
            <Person x={48} y={168} pose="hold" s={1.4} />
            <Prop name="bus" x={266} y={168} s={1.6} />
            <Label x={266} y={98} muted size={13}>
              FREE
            </Label>
            <Arrow from={[92, 112]} to={[208, 112]} tone="motion" />
            <Prop name="coin" x={150} y={108} s={1.1} />
            <Check x={222} y={112} size={20} />
            <Label x={150} y={130} muted size={12}>
              с монетой
            </Label>
            <Arrow from={[92, 146]} to={[208, 146]} tone="motion" />
            <Check x={222} y={146} size={20} />
            <Label x={150} y={163} muted size={12}>
              без монеты
            </Label>
          </Scene>
        ),
        en: 'You_P {don’t~have~to_A} pay_V — it_P +’s_V free_J .',
        ru: 'Обе дорожки открыты: заплатить можно, а можно не платить. Не обязательно — don’t have to.',
      },
      {
        scene: (
          <Scene ground={false} label="Русское «не надо» ведёт к двум английским фразам; mustn’t pay перечёркнуто, don’t have to pay отмечено галочкой">
            <Label x={160} y={34} size={18}>
              Не надо платить.
            </Label>
            <Arrow from={[130, 48]} to={[84, 92]} tone="ink" bend={10} />
            <Arrow from={[190, 48]} to={[236, 92]} tone="ink" bend={-10} />
            <Frame x={14} y={98} w={136} h={64} />
            <Frame x={170} y={98} w={140} h={64} />
            <Label x={82} y={126} muted size={14}>
              mustn’t pay
            </Label>
            <Label x={82} y={148} muted size={11} weight={500}>
              запрещено
            </Label>
            <Cross x={140} y={99} size={18} />
            <Label x={240} y={126} pos="aux" size={14}>
              don’t have to pay
            </Label>
            <Label x={240} y={148} muted size={11} weight={500}>
              не обязательно
            </Label>
            <Check x={300} y={99} size={18} />
          </Scene>
        ),
        en: 'You_P {don’t~have~to_A} pay_V .',
        ru: '«Не надо» по-русски — одна фраза, а в английском две. Бесплатно — don’t have to, mustn’t значит «запрещено платить».',
      },
    ],
  },
  {
    id: 'modals.how-sure',
    title: 'must be, might, can’t be: насколько ты уверен?',
    focus: ['must', 'might', 'cant', 'may', 'could'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Часы показывают одиннадцать вечера, мужчина думает только о кровати; точка на шкале стоит у «точно да»">
            <Clock x={44} y={52} r={18} h={11} m={0} />
            <Label x={44} y={90} muted size={12}>
              11 pm
            </Label>
            <Person x={128} y={118} pose="stand" s={1.2} tone={1} />
            <Bubble x={238} y={58} w={96} h={60} kind="thought" tail="left">
              <Prop name="bed" x={238} y={82} s={1.2} />
            </Bubble>
            <Scale active="must" />
          </Scene>
        ),
        en: 'He_P {must_A} be_V tired_J .',
        ru: 'Уже 11 вечера, а он думает только о кровати — вывод почти наверняка. Точка на шкале у правого края: must be.',
      },
      {
        scene: (
          <Scene ground={false} label="Над человеком тучка и вопрос: дождь возможен, точка в середине шкалы">
            <Person x={60} y={118} pose="look" s={1.2} />
            <Prop name="cloud" x={160} y={78} s={1.7} />
            <Prop name="question" x={236} y={88} s={1.2} />
            <Scale active="might" />
          </Scene>
        ),
        en: 'It_P {might_A} rain_V later_R .',
        ru: 'Тучка есть, но вопрос остаётся: может быть, а может и нет. Точка посередине — might.',
      },
      {
        scene: (
          <Scene ground={false} label="Воскресенье в календаре, офис зачёркнут: на работе её быть не может, точка у «точно нет»">
            <CalendarPage x={96} y={106} day="Sun" s={1.35} />
            <Prop name="office" x={226} y={112} s={1.7} dim />
            <Cross x={226} y={84} size={40} />
            <Scale active="cant" />
          </Scene>
        ),
        en: 'She_P {can’t_A} be_V at_I work_N . It_P +’s_V Sunday_N .',
        ru: 'Воскресенье — значит, на работе её быть не может. Точка у левого края: can’t be, почти сто процентов «нет».',
      },
    ],
  },
  {
    id: 'modals.no-s-no-to',
    title: 'После can и must — ни -s, ни to',
    focus: ['can', 'must', 'should'],
    frames: [
      {
        scene: (
          <Scene label="Трое людей — я, она и он — говорят одно и то же can swim: модальный глагол у всех одинаковый">
            {[
              { x: 56, who: 'I', hair: 'short' as const, tone: 2 as const },
              { x: 160, who: 'she', hair: 'long' as const, tone: 1 as const },
              { x: 264, who: 'he', hair: 'short' as const, tone: 0 as const },
            ].map((p) => (
              <g key={p.who}>
                <Person x={p.x} y={168} pose="talk" s={1.15} hair={p.hair} tone={p.tone} />
                <Bubble x={p.x} y={34} w={88} h={36} tail="left">
                  <Label x={p.x - 2} y={39} anchor="end" pos="aux" size={14}>
                    can
                  </Label>
                  <Label x={p.x + 4} y={39} anchor="start" size={14}>
                    swim
                  </Label>
                </Bubble>
                <Label x={p.x} y={188} muted size={13}>
                  {p.who}
                </Label>
              </g>
            ))}
          </Scene>
        ),
        en: 'She_P {can_A} swim_V .',
        ru: 'I, she, he — модальный глагол один и тот же, без -s. А swim остаётся в начальной форме.',
      },
      {
        scene: (
          <Scene ground={false} label="Две пары: she cans swim и I must to go перечёркнуты, she can swim и I must go отмечены галочкой">
            <Frame x={14} y={28} w={136} h={64} />
            <Frame x={170} y={28} w={136} h={64} />
            <Label x={82} y={66} muted size={14}>
              she cans swim
            </Label>
            <Cross x={138} y={38} size={20} />
            <Label x={238} y={66} size={14}>
              she can swim
            </Label>
            <Check x={296} y={38} size={20} />
            <Frame x={14} y={108} w={136} h={64} />
            <Frame x={170} y={108} w={136} h={64} />
            <Label x={82} y={146} muted size={14}>
              I must to go
            </Label>
            <Cross x={138} y={118} size={20} />
            <Label x={238} y={146} size={14}>
              I
              <tspan className="st-label-pos" data-pos="aux"> must</tspan> go
            </Label>
            <Check x={296} y={118} size={20} />
          </Scene>
        ),
        en: 'I_P {must_A} go_V now_R .',
        ru: 'Две ловушки: -s у модального («cans») и лишнее to («must to»). Ни -s, ни to не нужны: после модального сразу глагол.',
      },
    ],
  },
] satisfies TopicStories
