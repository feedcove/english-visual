import type { ReactNode } from 'react'
import { Arrow, Bubble, Cross, Label, Person, Prop, Scene } from '../kit'
import type { TopicStories } from '../types'

// История 1: her → himself: стрелка действия идёт к другому человеку или возвращается к тому же (в зеркале он сам).
// История 2: relax / met / feel — по-английски без -self, хотя по-русски «-ся» или «себя».
// История 3: themselves (каждый себя) и each other (друг друга): стрелки в зеркало или между людьми.
// Выделено слово цветом местоимения (pron), у глаголов без -self — цветом глагола (verb). Зеркало — предмет mirror из kit/extra/pronouns.

/** Зеркало и отражения: люди в зеркале повторяют тех, кто смотрит (hl — цвет местоимения). */
function Mirror({ x, s = 2.1, children }: { x: number; s?: number; children: ReactNode }) {
  return (
    <>
      <Prop name="mirror" x={x} y={168} s={s} />
      {children}
    </>
  )
}

/** Глагол без -self: само слово цветом глагола и рядом приглушённое лишнее -self с крестом (w — ширина слова). */
function NoSelf({ verb, no, w, x = 152 }: { verb: string; no: string; w: number; x?: number }) {
  return (
    <>
      <Label x={x} y={44} anchor="end" pos="verb" size={18}>
        {verb}
      </Label>
      <Label x={x + 12} y={44} anchor="start" muted size={18}>
        {no}
      </Label>
      <Cross x={x + 12 + w + 18} y={38} size={16} />
    </>
  )
}

export default [
  {
    id: 'pron-reflexive.arrow-back',
    title: 'her или himself: куда идёт стрелка?',
    focus: ['refl', 'refl.he', 'refl.she', 'he', 'she'],
    frames: [
      {
        scene: (
          <Scene label="Том смотрит на Анну: стрелка идёт от него к другому человеку, это her">
            <Person x={64} y={168} s={1.4} />
            <Person x={236} y={168} s={1.4} flip hair="long" tone={1} hl pos="pron" />
            <Arrow from={[96, 76]} to={[204, 76]} tone="action" label="looks at" bend={-16} />
            <Label x={64} y={190} muted size={14}>
              Tom
            </Label>
            <Label x={236} y={190} pos="pron" size={14}>
              her
            </Label>
          </Scene>
        ),
        en: 'Tom_N looks_V at_I {her_P} .',
        ru: 'Стрелка идёт от Тома к другому человеку — Анне. Для неё форма her.',
      },
      {
        scene: (
          <Scene label="Том смотрит в зеркало: стрелка идёт к отражению, а в зеркале тот же Том, это himself">
            <Person x={64} y={168} s={1.4} />
            <Mirror x={244}>
              <Person x={244} y={160} s={1.3} flip hl pos="pron" />
            </Mirror>
            <Arrow from={[96, 92]} to={[170, 92]} tone="action" label="looks at" />
            <Label x={64} y={190} muted size={14}>
              Tom
            </Label>
            <Label x={244} y={190} pos="pron" size={14}>
              himself
            </Label>
          </Scene>
        ),
        en: 'Tom_N looks_V at_I {himself_P} in_I the_D mirror_N .',
        ru: 'Стрелка вернулась к самому Тому: в зеркале он сам. Тот же человек — нужна форма на -self: himself.',
      },
    ],
  },
  {
    id: 'pron-reflexive.no-self',
    title: 'relax, meet, feel: без -self',
    focus: ['refl', 'refl.you', 'refl.we', 'refl.i'],
    frames: [
      {
        scene: (
          <Scene label="Том говорит Анне, которая сидит на стуле: relax; слово yourself зачёркнуто">
            <NoSelf verb="relax" no="yourself" w={72} />
            <Person x={84} y={168} pose="talk" s={1.3} />
            <Chair />
            <Label x={84} y={190} muted size={14}>
              Tom
            </Label>
            <Label x={214} y={190} muted size={14}>
              Anna
            </Label>
          </Scene>
        ),
        en: '{Relax_V} , Anna_N !',
        ru: 'По-русски «расслабься» (с -ся). По-английски relax уже значит «расслабь себя»: yourself не нужно.',
      },
      {
        scene: (
          <Scene label="Двое идут навстречу друг другу и встречаются: met; слово ourselves зачёркнуто">
            <NoSelf verb="met" no="ourselves" w={82} />
            <Person x={70} y={168} pose="walk" s={1.3} />
            <Person x={250} y={168} pose="walk" s={1.3} flip hair="long" tone={1} />
            <Arrow from={[102, 112]} to={[152, 112]} tone="motion" />
            <Arrow from={[218, 112]} to={[168, 112]} tone="motion" />
          </Scene>
        ),
        en: 'We_P {met_V} at_I six_M .',
        ru: '«Встретились» — тоже с -ся, но в английском просто met. Ourselves не нужно.',
      },
      {
        scene: (
          <Scene label="Человек чувствует себя счастливым: в мыслях сердце; слово myself зачёркнуто">
            <NoSelf verb="feel" no="myself" w={56} x={206} />
            <Person x={80} y={168} s={1.5} />
            <Bubble x={128} y={32} w={64} h={44} kind="thought" tail="left">
              <Prop name="heart" x={128} y={48} s={0.9} />
            </Bubble>
          </Scene>
        ),
        en: 'I_P {feel_V} happy_J .',
        ru: '«Чувствую себя счастливым»: в английском feel + прилагательное, без myself.',
      },
    ],
  },
  {
    id: 'pron-reflexive.each-other',
    title: 'themselves или each other?',
    focus: ['refl', 'refl.they', 'they'],
    frames: [
      {
        scene: (
          <Scene label="Двое смотрят в зеркало: стрелка идёт к их отражениям, это themselves">
            <Person x={38} y={168} s={1.15} />
            <Person x={80} y={168} s={1.15} hair="long" tone={1} />
            <Mirror x={248}>
              <Person x={276} y={160} s={0.95} flip hl pos="pron" />
              <Person x={220} y={160} s={0.95} flip hair="long" tone={1} hl pos="pron" />
            </Mirror>
            <Arrow from={[108, 96]} to={[174, 96]} tone="action" label="look at" />
            <Label x={248} y={190} pos="pron" size={14}>
              themselves
            </Label>
          </Scene>
        ),
        en: 'They_P look_V at_I {themselves_P} in_I the_D mirror_N .',
        ru: 'Каждый смотрит на своё отражение: стрелка вернулась к тем же людям — themselves.',
      },
      {
        scene: (
          <Scene label="Двое стоят лицом друг к другу, две стрелки идут навстречу: каждый смотрит на другого, это each other">
            <Person x={72} y={168} s={1.4} />
            <Person x={248} y={168} s={1.4} flip hair="long" tone={1} />
            <Arrow from={[104, 80]} to={[216, 80]} tone="action" label="look at" bend={-14} />
            <Arrow from={[216, 116]} to={[104, 116]} tone="action" bend={-14} />
            <Label x={160} y={104} pos="pron" size={14}>
              each other
            </Label>
          </Scene>
        ),
        en: 'Tom_N and_C Kate_N look_V at_I {each~other_P} .',
        ru: 'Две стрелки идут навстречу: Том на Кейт, Кейт на Тома. Друг на друга — each other.',
      },
    ],
  },
] satisfies TopicStories

/** Стул Анны: она сидит на нём лицом к Тому. */
function Chair() {
  return (
    <>
      <Prop name="chair" x={214} y={168} s={1.3} flip />
      <Person x={214} y={168} pose="sit" s={1.3} flip hair="long" tone={1} />
    </>
  )
}
