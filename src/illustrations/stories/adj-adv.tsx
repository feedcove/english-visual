import { Arrow, Check, Cross, Frame, Label, Person, Prop, Scene } from '../kit'
import type { Pos } from '../../content/types'
import type { TopicStories } from '../types'

// quick или quickly: прилагательное — метка на предмете (человеке), наречие — метка на стрелке-действии.
// Выделена одна метка кадра цветом своей части речи; остальные слова сцены нейтральные.

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

export default [
  {
    id: 'adj-adv.label-on-what',
    title: 'quick или quickly: метка на человеке или на действии',
    focus: ['adj', 'adv', 'ly', 'linking'],
    frames: [
      {
        scene: (
          <Scene label="Бегунья, на которой висит метка quick: слово описывает человека">
            <Person x={150} y={168} pose="run" hair="long" tone={1} s={1.3} />
            <Chip x={150} y={30} w={76} pos="adj">
              quick
            </Chip>
            <Arrow from={[150, 45]} to={[150, 61]} />
            <Label x={150} y={190} muted size={15}>
              runner
            </Label>
          </Scene>
        ),
        en: 'She_P is_V a_D {quick_J} runner_N .',
        ru: 'Какая бегунья? Быстрая. Слово висит на человеке, значит, это прилагательное — quick.',
      },
      {
        scene: (
          <Scene label="Та же бегунья, но метка quickly висит на стрелке-действии: как она бежит">
            <Person x={90} y={168} pose="run" hair="long" tone={1} s={1.3} />
            <Arrow from={[150, 112]} to={[296, 112]} tone="action" label="runs" />
            <Chip x={222} y={86} w={86} pos="adv">
              quickly
            </Chip>
            <Arrow from={[222, 100]} to={[222, 108]} />
          </Scene>
        ),
        en: 'She_P runs_V {quickly_R} .',
        ru: 'Как она бежит? Быстро. Слово висит на действии, на стрелке, значит, это наречие — quickly, с -ly.',
      },
      {
        scene: (
          <Scene label="Женщина выглядит счастливой: метка happy на ней. «looks happily» зачёркнуто">
            <Person x={80} y={168} pose="stand" hair="long" tone={1} s={1.4} />
            <Chip x={80} y={30} w={76} pos="adj">
              happy
            </Chip>
            <Arrow from={[80, 45]} to={[80, 56]} />
            <Label x={170} y={90} anchor="start" size={15}>
              looks happy
            </Label>
            <Check x={296} y={85} size={18} />
            <Label x={170} y={134} anchor="start" size={15} muted>
              looks happily
            </Label>
            <Cross x={296} y={129} size={16} />
          </Scene>
        ),
        en: 'She_P looks_V {happy_J} .',
        ru: 'looks здесь «выглядит»: это не действие, а описание её самой. Метка остаётся на человеке — прилагательное, без -ly.',
      },
    ],
  },
  {
    id: 'adj-adv.good-well',
    title: 'good или well: «хорошо» по-английски двух видов',
    focus: ['irregular', 'adj', 'adv'],
    frames: [
      {
        scene: (
          <Scene label="Человек у машины: метка good висит на нём, он хороший водитель">
            <Person x={90} y={168} pose="stand" s={1.4} />
            <Chip x={90} y={30} w={64} pos="adj">
              good
            </Chip>
            <Arrow from={[90, 45]} to={[90, 56]} />
            <Prop name="car" x={238} y={168} s={1.7} />
            <Label x={90} y={190} muted size={15}>
              driver
            </Label>
          </Scene>
        ),
        en: 'He_P is_V a_D {good_J} driver_N .',
        ru: 'Какой водитель? Хороший. Метка на человеке — прилагательное good.',
      },
      {
        scene: (
          <Scene label="Человек ведёт машину: метка well висит на стрелке-действии drives">
            <Person x={64} y={168} pose="stand" s={1.4} />
            <Prop name="car" x={250} y={168} s={1.7} />
            <Arrow from={[118, 128]} to={[200, 128]} tone="action" label="drives" />
            <Chip x={159} y={96} w={64} pos="adv">
              well
            </Chip>
            <Arrow from={[159, 110]} to={[159, 124]} />
          </Scene>
        ),
        en: 'He_P drives_V {well_R} .',
        ru: 'Как водит? Хорошо. Метка на действии — наречие. У good нет формы goodly: наречие от него — well.',
      },
      {
        scene: (
          <Scene label="Три строки: хорошая певица, поёт хорошо и зачёркнутое «sings good»">
            <Person x={52} y={168} pose="talk" hair="long" tone={1} s={1.2} />
            <Label x={110} y={58} anchor="start" size={15}>
              a good singer
            </Label>
            <Check x={298} y={53} size={18} />
            <Label x={110} y={104} anchor="start" size={15}>
              sings
            </Label>
            <Label x={160} y={104} anchor="start" size={15} pos="adv">
              well
            </Label>
            <Check x={298} y={99} size={18} />
            <Label x={110} y={150} anchor="start" size={15} muted>
              sings good
            </Label>
            <Cross x={298} y={145} size={16} />
          </Scene>
        ),
        en: 'She_P sings_V {well_R} .',
        ru: 'По-русски «хороший» и «хорошо» отличаются окончанием, а по-английски это два разных слова. Человек — good, действие — well.',
      },
    ],
  },
] satisfies TopicStories
