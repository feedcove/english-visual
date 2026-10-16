import { Bubble, Cross, Frame, Label, Person, Prop, Scene, TimeAxis } from '../kit'
import type { TopicStories } from '../types'

// Глаголы состояния. Действие — волна с началом и концом (его можно начать и закончить),
// состояние — ровная полоса без начала и конца (оно просто есть). Выделение — цветом глагола.

const AX = { x: 20, y: 156, w: 280, now: 0.5 }
const FLOOR = 140

/** Состояние: ровная полоса вдоль всей оси, под осью — «нет начала и конца». */
function Flat({ x0 = 28, x1 = 292, y = 156, hl = true }: { x0?: number; x1?: number; y?: number; hl?: boolean }) {
  return (
    <g className={hl ? 'st-sym st-hl' : 'st-sym'} data-pos={hl ? 'verb' : undefined}>
      <path d={`M${x0} ${y}H${x1}`} className="st-sym-span" />
    </g>
  )
}

/** Действие: волна и две черты — «начал» и «закончил». */
function Wave({ x0, x1, y, hl = true }: { x0: number; x1: number; y: number; hl?: boolean }) {
  const n = Math.max(2, Math.round((x1 - x0) / 14))
  const h = (x1 - x0) / n
  let d = `M${x0} ${y}q${h / 2} -10 ${h} 0`
  for (let i = 1; i < n; i++) d += `t${h} 0`
  return (
    <g className={hl ? 'st-sym st-hl' : 'st-sym'} data-pos={hl ? 'verb' : undefined}>
      <path d={d} className="st-sym-line" />
      <path d={`M${x0} ${y - 12}V${y + 12}M${x1} ${y - 12}V${y + 12}`} className="st-axis" />
    </g>
  )
}

export default [
  {
    id: 'stative.state-or-action',
    title: 'Состояние или действие: есть или делается?',
    focus: ['state', 'action'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Человек работает за ноутбуком: на оси волна с чертой начала и чертой конца — действие можно начать и закончить">
            <Wave x0={118} x1={202} y={AX.y} />
            <TimeAxis {...AX} marks={[]} />
            <Person x={120} y={FLOOR} pose="hold" s={1.25} />
            <Prop name="table" x={196} y={FLOOR} s={1.3} />
            <Prop name="laptop" x={196} y={FLOOR - 44} s={1.2} />
            <Label x={110} y={186} muted size={12}>
              начал
            </Label>
            <Label x={216} y={186} muted size={12}>
              закончил
            </Label>
          </Scene>
        ),
        en: 'Tom_N is_A {working_V} now_R .',
        ru: 'Работу можно начать и закончить: волна с двумя чертами. Процесс идёт сейчас — am / is / are + -ing.',
      },
      {
        scene: (
          <Scene ground={false} label="Человек знает ответ: на оси ровная полоса без начала и конца — состояние просто есть">
            <Flat />
            <TimeAxis {...AX} marks={[]} />
            <Person x={84} y={FLOOR} pose="think" s={1.25} />
            <Bubble x={206} y={66} w={100} h={60} kind="thought" tail="left">
              <Prop name="check-mark" x={206} y={90} s={1.3} />
            </Bubble>
            <Label x={300} y={186} anchor="end" muted size={12}>
              нет начала и конца
            </Label>
          </Scene>
        ),
        en: 'I_P {know_V} the_D answer_N .',
        ru: 'Знание не начинают и не заканчивают в какой-то час: оно просто есть. Полоса ровная — только Simple: know.',
      },
      {
        scene: (
          <Scene ground={false} label="Девушка хочет кофе; волна is wanting зачёркнута, потому что слово now не делает желание процессом; на оси ровная полоса">
            <Flat />
            <TimeAxis {...AX} marks={[]} />
            <Person x={70} y={FLOOR} pose="stand" s={1.25} hair="long" tone={1} />
            <Bubble x={192} y={48} w={96} h={56} kind="thought" tail="left">
              <Prop name="coffee" x={192} y={70} s={1.3} />
            </Bubble>
            <Wave x0={128} x1={192} y={128} hl={false} />
            <Label x={160} y={116} muted size={12}>
              is wanting
            </Label>
            <Cross x={226} y={112} size={18} />
          </Scene>
        ),
        en: 'She_P {wants_V} a_D coffee_N now_R .',
        ru: 'Слово now не превращает «хочу» в процесс: желание — состояние, его не «делают». Остаётся ровная полоса — wants.',
      },
    ],
  },
  {
    id: 'stative.two-meanings',
    title: 'think и have: два значения — две формы',
    focus: ['both', 'state', 'action'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Человек говорит «это неверно»: мнение — состояние, на оси ровная полоса">
            <Flat />
            <TimeAxis {...AX} marks={[]} />
            <Person x={72} y={FLOOR} pose="talk" s={1.25} />
            <Bubble x={206} y={70} w={104} h={44} tail="left">
              <Label x={206} y={75} size={14}>
                it’s wrong
              </Label>
            </Bubble>
            <Label x={300} y={186} anchor="end" muted size={12}>
              мнение
            </Label>
          </Scene>
        ),
        en: 'I_P {think_V} it_P +’s_V wrong_J .',
        ru: 'Think — «считаю»: это мнение, оно просто есть. Ровная полоса — Simple.',
      },
      {
        scene: (
          <Scene ground={false} label="Человек обдумывает отпуск: в мыслях солнце; на оси волна с началом и концом — действие">
            <Wave x0={110} x1={210} y={AX.y} />
            <TimeAxis {...AX} marks={[]} />
            <Person x={72} y={FLOOR} pose="think" s={1.25} />
            <Bubble x={206} y={70} w={100} h={60} kind="thought" tail="left">
              <Prop name="sun" x={206} y={96} s={1.2} />
            </Bubble>
            <Label x={300} y={186} anchor="end" muted size={12}>
              процесс
            </Label>
          </Scene>
        ),
        en: 'I_P am_A {thinking_V} about_I my_P holiday_N .',
        ru: 'Think about — «обдумываю»: я что-то делаю головой прямо сейчас. Волна с началом и концом — Continuous.',
      },
      {
        scene: (
          <Scene ground={false} label="Слева две машины — владею, ровная полоса; справа человек обедает — действие, волна">
            <Frame x={10} y={10} w={146} h={180} />
            <Frame x={164} y={10} w={146} h={180} pos="verb" />
            <Prop name="car" x={50} y={120} s={0.85} />
            <Prop name="car" x={112} y={120} s={0.85} />
            <Label x={83} y={30} muted size={13}>
              have
            </Label>
            <Flat x0={26} x1={140} y={150} hl={false} />
            <Label x={83} y={178} muted size={11} weight={500}>
              владею
            </Label>
            <Person x={204} y={130} pose="hold" s={1.1} />
            <Prop name="plate" x={268} y={130} s={1.3} />
            <Label x={237} y={30} pos="verb" size={13}>
              ’m having
            </Label>
            <Wave x0={182} x1={290} y={150} />
            <Label x={237} y={178} muted size={11} weight={500}>
              обедаю
            </Label>
          </Scene>
        ),
        en: 'I_P +’m_A {having_V} lunch_N .',
        ru: 'Have — «иметь» (состояние) или «обедать» (действие). Если это то, что делаешь сейчас, нужен -ing.',
      },
    ],
  },
] satisfies TopicStories
