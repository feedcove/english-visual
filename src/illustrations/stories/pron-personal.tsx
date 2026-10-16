import { Arrow, Check, Cross, Label, Person, Scene } from '../kit'
import type { TopicStories } from '../types'

// Эталонная история (docs/illustrations.md): глагол — стрелка; кто до стрелки — I/he/she, на кого стрелка — me/him/her.

export default [
  {
    id: 'pron-personal.arrow',
    title: 'Почему him, а не he?',
    focus: ['subj', 'obj', 'subj.he', 'obj.he', 'he'],
    frames: [
      {
        scene: (
          <Scene label="Он смотрит на неё: стрелка действия идёт от него к ней">
            <Person x={78} y={168} pose="look" s={1.5} hl pos="pron" />
            <Person x={244} y={168} pose="stand" flip hair="long" tone={1} s={1.5} />
            <Arrow from={[112, 66]} to={[208, 66]} tone="action" label="sees" bend={-16} />
            <Label x={78} y={190} pos="pron" size={15}>
              he
            </Label>
            <Label x={244} y={190} muted size={15}>
              her
            </Label>
          </Scene>
        ),
        en: '{He_P} sees_V her_P .',
        ru: 'Стрелка действия начинается у него. Тот, кто делает, стоит перед глаголом — he.',
      },
      {
        scene: (
          <Scene label="Она смотрит на него: стрелка теперь направлена на него">
            <Person x={78} y={168} pose="stand" s={1.5} hl pos="pron" />
            <Person x={244} y={168} pose="look" flip hair="long" tone={1} s={1.5} />
            <Arrow from={[208, 66]} to={[112, 66]} tone="action" label="sees" bend={16} />
            <Label x={78} y={190} pos="pron" size={15}>
              him
            </Label>
            <Label x={244} y={190} muted size={15}>
              she
            </Label>
          </Scene>
        ),
        en: 'She_P sees_V {him_P} .',
        ru: 'Тот же человек, но стрелка пришла к нему. Тот, на кого направлено действие, стоит после глагола — him.',
      },
      {
        scene: (
          <Scene label="Я смотрю на него. По-русски «Его вижу я», по-английски так нельзя — только I see him">
            <Person x={40} y={168} pose="look" hair="long" tone={1} s={1.2} />
            <Person x={146} y={168} pose="stand" flip s={1.2} hl pos="pron" />
            <Arrow from={[66, 84]} to={[122, 84]} tone="action" bend={-10} />
            <Label x={40} y={190} muted size={14}>
              I
            </Label>
            <Label x={146} y={190} pos="pron" size={14}>
              him
            </Label>
            <Label x={192} y={44} anchor="start" size={15}>
              Его вижу я.
            </Label>
            <Label x={192} y={62} anchor="start" size={11} muted>
              по-русски можно
            </Label>
            <Label x={192} y={104} anchor="start" size={16}>
              Him see I.
            </Label>
            <Cross x={292} y={99} size={16} />
            <Label x={192} y={146} anchor="start" size={16}>
              I see him.
            </Label>
            <Check x={293} y={140} size={18} />
          </Scene>
        ),
        en: 'I_P see_V {him_P} .',
        ru: 'Порядок слов не спасёт: в английском форму выбирает место. До глагола — I, he; после — me, him.',
      },
    ],
  },
] satisfies TopicStories
