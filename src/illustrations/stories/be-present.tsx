import { Arrow, Check, Cross, Label, Person, Prop, Scene, TimeAxis } from '../kit'
import type { TopicStories } from '../types'

// be — связка между «кто» и «каким / где он»: стрелка-глагол от человека к состоянию.
// Русский «есть» опускает (пунктир с пустым местом), английский — никогда. Выделение — цветом глагола.

export default [
  {
    id: 'be-present.never-skip',
    title: 'Без be не обойтись: She is a doctor',
    focus: ['is'],
    frames: [
      {
        scene: (
          <Scene label="Она и стетоскоп. Между ними пунктир, на нём пустое место: по-русски связки нет">
            <Person x={72} y={168} pose="stand" hair="long" s={1.5} />
            <Prop name="stethoscope" x={246} y={150} s={2.1} />
            <Arrow from={[116, 92]} to={[208, 92]} tone="dim" dashed />
            <Label x={162} y={86} pos="verb" size={26}>
              —
            </Label>
            <Label x={72} y={192} muted size={15}>
              Она
            </Label>
            <Label x={246} y={192} muted size={15}>
              врач
            </Label>
          </Scene>
        ),
        en: 'Она_P {—} врач_N .',
        lang: 'ru',
        ru: 'По-русски связку «есть» пропускают: «Она — врач». Место между «кто» и «кто она» остаётся пустым.',
      },
      {
        scene: (
          <Scene label="Та же сцена, но на стрелке написано is: связка не пропущена">
            <Person x={72} y={168} pose="stand" hair="long" s={1.5} />
            <Prop name="stethoscope" x={246} y={150} s={2.1} />
            <Arrow from={[116, 92]} to={[208, 92]} tone="action" label="is" bend={-12} />
            <Label x={72} y={192} muted size={15}>
              She
            </Label>
            <Label x={246} y={192} muted size={15}>
              a doctor
            </Label>
          </Scene>
        ),
        en: 'She_P {is_V} a_D doctor_N .',
        ru: 'В английском пустое место занимает be: she → is → a doctor. Без глагола предложения нет.',
      },
      {
        scene: (
          <Scene label="Человек и число 30. Стрелка am ведёт к возрасту, а have зачёркнуто">
            <Person x={72} y={168} pose="stand" tone={1} s={1.5} />
            <Label x={246} y={128} muted size={46}>
              30
            </Label>
            <Arrow from={[116, 78]} to={[208, 78]} tone="action" label="am" bend={-12} />
            <Label x={138} y={152} anchor="start" muted size={17}>
              have
            </Label>
            <Cross x={198} y={146} size={20} />
            <Label x={72} y={192} muted size={15}>
              I
            </Label>
          </Scene>
        ),
        en: 'I_P {am_V} thirty_M .',
        ru: 'Возраст — состояние, как усталость: be. По-русски «мне тридцать», по-английски не have, а I am thirty.',
      },
    ],
  },
  {
    id: 'be-present.forms',
    title: 'am, is, are, was, were: форму выбирает «кто»',
    focus: ['am', 'is', 'are', 'was', 'were'],
    frames: [
      {
        scene: (
          <Scene label="Человек у дома: стрелка с am">
            <Person x={62} y={168} pose="stand" s={1.5} />
            <Prop name="house" x={254} y={168} s={1.9} />
            <Arrow from={[108, 92]} to={[212, 92]} tone="action" label="am" bend={-12} />
            <Label x={62} y={192} muted size={16}>
              I
            </Label>
          </Scene>
        ),
        en: 'I_P {am_V} at_I home_N .',
        ru: 'С I — только am.',
      },
      {
        scene: (
          <Scene label="Она у дома: стрелка с is">
            <Person x={62} y={168} pose="stand" hair="long" tone={1} s={1.5} />
            <Prop name="house" x={254} y={168} s={1.9} />
            <Arrow from={[108, 92]} to={[212, 92]} tone="action" label="is" bend={-12} />
            <Label x={62} y={192} muted size={16}>
              she / he / it
            </Label>
          </Scene>
        ),
        en: 'She_P {is_V} at_I home_N .',
        ru: 'Один человек или одна вещь (she, he, it, Anna) — is.',
      },
      {
        scene: (
          <Scene label="Двое у дома: стрелка с are; подпись you, we, they">
            <Person x={42} y={168} pose="stand" s={1.35} />
            <Person x={96} y={168} pose="stand" hair="long" tone={2} s={1.35} />
            <Prop name="house" x={254} y={168} s={1.9} />
            <Arrow from={[132, 92]} to={[212, 92]} tone="action" label="are" bend={-12} />
            <Label x={69} y={192} muted size={16}>
              we / you / they
            </Label>
          </Scene>
        ),
        en: 'They_P {are_V} at_I home_N .',
        ru: 'we, you, they и «много» — are. you всегда are, даже когда «ты» один.',
      },
      {
        scene: (
          <Scene label="Ось времени: точка в прошлом (вчера), под ней она у дома; стрелка без подписи">
            <TimeAxis x={24} y={34} w={272} now={0.8} zones={[{ from: 0.12, to: 0.44, label: 'yesterday' }]} marks={[{ at: 0.28, kind: 'dot', hl: true, label: 'was' }]} />
            <Person x={56} y={168} pose="stand" hair="long" tone={1} s={1.25} />
            <Prop name="house" x={254} y={168} s={1.9} />
            <Arrow from={[98, 100]} to={[212, 100]} tone="ink" bend={-12} />
            <Label x={56} y={190} muted size={16}>
              she
            </Label>
          </Scene>
        ),
        en: 'She_P {was_V} at_I home_N yesterday_R .',
        ru: 'Вчера — закрытое прошлое: am и is → was, are → were. They were, а не they was.',
      },
    ],
  },
  {
    id: 'be-present.not-and-question',
    title: 'Отрицание и вопрос с be — без do',
    focus: ['negative', 'question'],
    frames: [
      {
        scene: (
          <Scene label="Она стоит далеко, дом приглушён и зачёркнут; пунктирная стрелка isn’t">
            <Person x={62} y={168} pose="stand" hair="long" tone={1} s={1.5} />
            <Prop name="house" x={254} y={168} s={1.9} dim />
            <Cross x={254} y={132} size={34} />
            <Arrow from={[108, 92]} to={[212, 92]} tone="action" dashed label="isn’t" bend={-12} />
          </Scene>
        ),
        en: 'She_P {isn’t_V} at_I home_N .',
        ru: 'Отрицание — not прямо после be: is not → isn’t. Вспомогательное do не нужно.',
      },
      {
        scene: (
          <Scene label="Вверху She is tired, внизу Is she tired: is перепрыгнуло вперёд, на место перед she">
            <Label x={76} y={78} muted size={24}>
              She
            </Label>
            <Label x={148} y={78} muted size={24}>
              is
            </Label>
            <Label x={232} y={78} muted size={24}>
              tired
            </Label>
            <Arrow from={[146, 92]} to={[66, 126]} tone="action" bend={14} />
            <Label x={62} y={150} pos="verb" size={24}>
              Is
            </Label>
            <Label x={122} y={150} muted size={24}>
              she
            </Label>
            <Label x={216} y={150} muted size={24}>
              tired?
            </Label>
          </Scene>
        ),
        en: '{Is_V} she_P tired_J ?',
        ru: 'Вопрос: be выходит вперёд, перед подлежащим. Было She is — стало Is she.',
      },
      {
        scene: (
          <Scene label="Человек устал. Справа Do you tired? зачёркнуто, Are you tired? с галочкой">
            <Person x={52} y={168} pose="think" tone={1} s={1.35} />
            <Label x={110} y={74} anchor="start" size={17} muted>
              Do you tired?
            </Label>
            <Cross x={284} y={69} size={16} />
            <Label x={110} y={126} anchor="start" size={17}>
              Are you tired?
            </Label>
            <Check x={284} y={120} size={18} />
          </Scene>
        ),
        en: '{Are_V} you_P tired_J ?',
        ru: 'По-русски вопрос — интонация: «Ты устал?». В английском do с be не нужен: Are you tired?',
      },
    ],
  },
] satisfies TopicStories
