import { Arrow, Label, Person, Prop, Scene } from '../kit'
import type { ReactNode } from 'react'
import { Ask, Chip, Tie } from '../kit/extra/words'
import type { TopicStories } from '../types'

// Сцена → граф: глагол-стрелка — корень; на нём висят «кто» (подлежащее), «что» (дополнение), а на существительном — определение.
// Кадры одной истории отличаются одним: что подсвечено или что добавилось.

/** Сцена «мама двигает стол»: кто, стрелка, на что. */
function Move({ children, hlWho, hlWhat, arrow = 'action', label = 'moved' }: { children?: ReactNode; hlWho?: boolean; hlWhat?: boolean; arrow?: 'action' | 'ink'; label?: string }) {
  return (
    <>
      <Person x={58} y={168} pose="give" hair="long" tone={1} s={1.5} hl={hlWho} pos="noun" />
      <Arrow from={[116, 92]} to={[208, 92]} tone={arrow} bend={-12} />
      <Label x={166} y={112} size={12} pos={arrow === 'action' ? 'verb' : undefined}>
        {label}
      </Label>
      <Prop name="table" x={232} y={168} s={1.5} hl={hlWhat} pos="noun" />
      {children}
    </>
  )
}

export default [
  {
    id: 'sentence-graph.scene-to-graph',
    title: 'Сцена → граф: кто, действие, на что',
    focus: ['root', 'subj', 'obj', 'attr', 'members'],
    frames: [
      {
        scene: (
          <Scene label="Мама двигает стол: стрелка действия — главное в сцене">
            <Move />
          </Scene>
        ),
        en: 'Mum_N {moved_V} the_D table_N .',
        ru: 'Сначала найди действие: это стрелка. Сказуемое — корень, от него зависят все остальные слова.',
      },
      {
        scene: (
          <Scene label="У начала стрелки стоит мама: она подлежащее, кто делает">
            <Move arrow="ink" hlWho />
            <Ask x={58} y={34}>
              кто?
            </Ask>
          </Scene>
        ),
        en: '{Mum_N} moved_V the_D table_N .',
        ru: 'Кто делает — у начала стрелки. Подлежащее отвечает «кто? что?» и висит на сказуемом.',
      },
      {
        scene: (
          <Scene label="У конца стрелки стол: он дополнение, на что направлено действие">
            <Move arrow="ink" hlWhat />
            <Ask x={232} y={34}>
              что?
            </Ask>
          </Scene>
        ),
        en: 'Mum_N moved_V the_D {table_N} .',
        ru: 'На что направлено — у конца стрелки. Дополнение отвечает «кого? что?» и тоже висит на сказуемом.',
      },
      {
        scene: (
          <Scene label="Граф: moved наверху, от него вниз Mum и table, а на table висит the" ground={false}>
            <Chip x={160} y={30} pos="verb">
              moved
            </Chip>
            <Arrow from={[142, 46]} to={[86, 92]} tone="ink" />
            <Arrow from={[178, 46]} to={[234, 92]} tone="ink" />
            <Ask x={100} y={64} anchor="end">
              кто?
            </Ask>
            <Ask x={226} y={66} anchor="start">
              что?
            </Ask>
            <Chip x={72} y={108}>
              Mum
            </Chip>
            <Chip x={246} y={108}>
              table
            </Chip>
            <Arrow from={[246, 124]} to={[246, 158]} tone="ink" />
            <Ask x={256} y={146} anchor="start">
              какой?
            </Ask>
            <Chip x={246} y={172} pos="det">
              the
            </Chip>
          </Scene>
        ),
        en: 'Mum_N moved_V {the_D} table_N .',
        ru: 'Слова не стоят в ряд, а висят: Mum и table на moved, а артикль the — на своём существительном.',
      },
    ],
  },
  {
    id: 'sentence-graph.hang-on',
    title: 'Кто на ком висит: признак, обстоятельство, помощник',
    focus: ['attr', 'adv', 'aux', 'root'],
    frames: [
      {
        scene: (
          <Scene label="Метка «red» висит на двери: определение отвечает какая?">
            <Person x={52} y={168} pose="give" hair="long" tone={1} s={1.4} />
            <Arrow from={[92, 108]} to={[196, 108]} tone="ink" label="opened" bend={-10} />
            <Prop name="door" x={236} y={168} s={2.3} />
            <Chip x={236} y={40} pos="adj">
              red
            </Chip>
            <Tie from={[236, 56]} to={[236, 66]} />
            <Ask x={266} y={45} anchor="start">
              какая?
            </Ask>
          </Scene>
        ),
        en: 'Anna_N opened_V the_D {red_J} door_N .',
        ru: 'Определение висит на существительном и отвечает «какая?». Хозяин red — door.',
      },
      {
        scene: (
          <Scene label="Метка «quickly» висит на стрелке opened: обстоятельство отвечает как?">
            <Person x={52} y={168} pose="give" hair="long" tone={1} s={1.4} />
            <Arrow from={[92, 108]} to={[196, 108]} tone="ink" label="opened" bend={-10} />
            <Prop name="door" x={252} y={168} s={1.8} />
            <Chip x={146} y={50} pos="adv">
              quickly
            </Chip>
            <Tie from={[146, 66]} to={[146, 94]} />
            <Ask x={206} y={55} anchor="start">
              как?
            </Ask>
          </Scene>
        ),
        en: 'Anna_N {quickly_R} opened_V the_D door_N .',
        ru: 'Обстоятельство висит на глаголе и отвечает «как? где? когда?». Хозяин quickly — opened.',
      },
      {
        scene: (
          <Scene label="Слово can помогает стрелке swim: вспомогательный висит на глаголе">
            <Person x={52} y={168} pose="stand" s={1.4} />
            <Arrow from={[92, 118]} to={[212, 118]} tone="ink" label="swim" bend={-10} />
            <Prop name="river" x={256} y={168} s={1.6} />
            <Chip x={118} y={64} pos="aux">
              can
            </Chip>
            <Tie from={[118, 80]} to={[118, 106]} />
          </Scene>
        ),
        en: 'Tom_N {can_A} swim_V .',
        ru: 'Вспомогательный не называет действие, а помогает: can висит на смысловом глаголе swim.',
      },
    ],
  },
  {
    id: 'sentence-graph.ru-en-same-graph',
    title: 'Мама передвинула стол = Mum moved the table: один граф',
    focus: ['root', 'subj', 'obj', 'attr'],
    frames: [
      {
        scene: (
          <Scene label="Сцена с подписями по-русски: мама, передвинула, стол">
            <Move label="передвинула" />
            <Label x={58} y={191} size={14} muted>
              мама
            </Label>
            <Label x={232} y={191} size={14} muted>
              стол
            </Label>
          </Scene>
        ),
        en: 'Мама_N {передвинула_V} стол_N .',
        lang: 'ru',
        ru: 'Те же роли: мама — у начала стрелки, стол — у конца, сказуемое в корне. Артиклей нет.',
      },
      {
        scene: (
          <Scene label="Та же сцена по-английски; добавилась метка the на столе">
            <Move arrow="ink" label="moved" />
            <Label x={58} y={191} size={14} muted>
              Mum
            </Label>
            <Label x={232} y={191} size={14} muted>
              table
            </Label>
            <Chip x={232} y={74} pos="det">
              the
            </Chip>
            <Tie from={[232, 90]} to={[232, 114]} />
          </Scene>
        ),
        en: 'Mum_N moved_V {the_D} table_N .',
        ru: 'Картинка и граф те же, добавился один артикль, и он висит на существительном table.',
      },
    ],
  },
] satisfies TopicStories
