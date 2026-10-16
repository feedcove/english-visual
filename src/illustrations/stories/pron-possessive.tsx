import { Arrow, Check, Cross, Frame, Label, Person, Prop, Scene } from '../kit'
import type { TopicStories } from '../types'

// Пунктирная стрелка — «чьё»: от владельца к вещи (ink). Выделено слово-притяжательное — цветом местоимения (pron).
// История 1: my + сущ. / mine без сущ. История 2: his / her по владельцу, а не по вещи (ловушка «свой»). История 3: its, а не it’s.

export default [
  {
    id: 'pron-possessive.my-or-mine',
    title: 'my bag или mine?',
    focus: ['poss', 'posspron', 'poss.i', 'posspron.i', 'poss.they', 'posspron.they'],
    frames: [
      {
        scene: (
          <Scene label="Пунктирная стрелка «чьё» идёт от человека к сумке; над стрелкой my, под сумкой слово bag">
            <Person x={64} y={168} s={1.5} />
            <Label x={64} y={190} muted size={14}>
              I
            </Label>
            <Prop name="bag" x={206} y={168} s={1.8} />
            <Arrow from={[100, 96]} to={[182, 122]} tone="ink" dashed bend={-22} />
            <Label x={146} y={80} pos="pron" size={16}>
              my
            </Label>
            <Frame x={182} y={174} w={48} h={22} />
            <Label x={206} y={190} size={14} muted>
              bag
            </Label>
          </Scene>
        ),
        en: 'This_P is_V {my_P} bag_N .',
        ru: 'Пунктир показывает, чья вещь. Слово bag стоит сразу после — значит my.',
      },
      {
        scene: (
          <Scene label="Та же сумка и та же стрелка, но слова bag нет: на его месте пустая рамка, над стрелкой mine">
            <Person x={64} y={168} s={1.5} />
            <Label x={64} y={190} muted size={14}>
              I
            </Label>
            <Prop name="bag" x={206} y={168} s={1.8} />
            <Arrow from={[100, 96]} to={[182, 122]} tone="ink" dashed bend={-22} />
            <Label x={146} y={80} pos="pron" size={16}>
              mine
            </Label>
            <Frame x={182} y={174} w={48} h={22} dashed />
          </Scene>
        ),
        en: 'The_D bag_N is_V {mine_P} .',
        ru: 'Сумка та же, но слова после нет: пустая рамка. Когда существительного нет, my превращается в mine.',
      },
      {
        scene: (
          <Scene label="Две пары людей: слева маленький дом «наш» и под ним слово house, справа большой дом «их» и под ним пустая рамка">
            <Person x={28} y={168} s={0.95} />
            <Person x={58} y={168} s={0.95} hair="long" tone={1} />
            <Prop name="house" x={112} y={168} s={1.05} />
            <Arrow from={[40, 80]} to={[104, 108]} tone="ink" dashed bend={-16} />
            <Label x={72} y={70} muted size={15}>
              our
            </Label>
            <Frame x={88} y={174} w={48} h={22} />
            <Label x={112} y={190} size={13} muted>
              house
            </Label>
            <Person x={170} y={168} s={0.95} tone={2} />
            <Person x={200} y={168} s={0.95} hair="long" tone={3} />
            <Prop name="house" x={272} y={168} s={1.9} />
            <Arrow from={[184, 80]} to={[238, 90]} tone="ink" dashed bend={-16} />
            <Label x={211} y={70} pos="pron" size={15}>
              theirs
            </Label>
            <Frame x={248} y={174} w={48} h={22} dashed />
          </Scene>
        ),
        en: 'Our_P house_N is_V small_J , but_C {theirs_P} is_V big_J .',
        ru: 'Слева our house: слово house есть. Справа рамка пустая — дом уже понятен, поэтому theirs, как mine.',
      },
    ],
  },
  {
    id: 'pron-possessive.his-or-her',
    title: 'his или her: смотри на владельца, а не на вещь',
    focus: ['poss', 'poss.he', 'poss.she', 'he', 'she'],
    frames: [
      {
        scene: (
          <Scene label="Том (мужчина) и его сестра: пунктир от Тома к сестре, над ним his">
            <Person x={70} y={168} s={1.45} />
            <Label x={70} y={190} muted size={14}>
              Tom
            </Label>
            <Person x={244} y={168} s={1.45} flip hair="long" tone={1} />
            <Label x={244} y={190} muted size={14}>
              sister
            </Label>
            <Arrow from={[100, 94]} to={[212, 94]} tone="ink" dashed bend={-26} />
            <Label x={156} y={66} pos="pron" size={16}>
              his
            </Label>
          </Scene>
        ),
        en: 'Tom_N loves_V {his_P} sister_N .',
        ru: 'Владелец — Том, мужчина. Сестра женщина, но слово выбираем по владельцу: his.',
      },
      {
        scene: (
          <Scene label="Анна (женщина) и её брат: пунктир от Анны к брату, над ним her">
            <Person x={70} y={168} s={1.45} hair="long" tone={1} />
            <Label x={70} y={190} muted size={14}>
              Anna
            </Label>
            <Person x={244} y={168} s={1.45} flip />
            <Label x={244} y={190} muted size={14}>
              brother
            </Label>
            <Arrow from={[100, 94]} to={[212, 94]} tone="ink" dashed bend={-26} />
            <Label x={156} y={66} pos="pron" size={16}>
              her
            </Label>
          </Scene>
        ),
        en: 'Anna_N loves_V {her_P} brother_N .',
        ru: 'Те же люди, роли поменялись: владелец — Анна, значит her, хотя брат — мужчина.',
      },
      {
        scene: (
          <Scene label="Том и сестра, как в первом кадре: her над пунктиром зачёркнут, his отмечен как верный">
            <Person x={70} y={168} s={1.45} />
            <Label x={70} y={190} muted size={14}>
              Tom
            </Label>
            <Person x={244} y={168} s={1.45} flip hair="long" tone={1} />
            <Label x={244} y={190} muted size={14}>
              sister
            </Label>
            <Arrow from={[100, 112]} to={[212, 112]} tone="ink" dashed bend={-26} />
            <Label x={116} y={76} muted size={16}>
              her
            </Label>
            <Cross x={141} y={71} size={16} />
            <Label x={172} y={76} pos="pron" size={16}>
              his
            </Label>
            <Check x={195} y={70} size={16} />
          </Scene>
        ),
        en: 'Он_P любит_V {свою_P} сестру_N .',
        lang: 'ru',
        ru: '«Свою сестру» тянет сказать her. Но her sister — сестра какой-то женщины. Слова «свой» в английском нет: владелец — Том, значит his.',
      },
    ],
  },
  {
    id: 'pron-possessive.its',
    title: 'its или it’s?',
    focus: ['poss', 'poss.it', 'it'],
    frames: [
      {
        scene: (
          <Scene label="Собака и её мяч: пунктир от собаки к мячу, над ним its, без апострофа">
            <Prop name="dog" x={84} y={168} s={1.6} />
            <Label x={84} y={190} muted size={14}>
              dog
            </Label>
            <Prop name="ball" x={236} y={168} s={2.4} />
            <Label x={236} y={190} muted size={14}>
              ball
            </Label>
            <Arrow from={[116, 112]} to={[210, 140]} tone="ink" dashed bend={-22} />
            <Label x={168} y={100} pos="pron" size={16}>
              its
            </Label>
          </Scene>
        ),
        en: 'The_D dog_N loves_V {its_P} ball_N .',
        ru: 'Владелец — животное, не человек: ни his, ни her, а its. Апострофа нет.',
      },
      {
        scene: (
          <Scene label="Слева its: собака с мячом, чьё. Справа it’s: снежинка, холодно, это it is">
            <Prop name="dog" x={44} y={168} s={1} dim />
            <Prop name="ball" x={106} y={168} s={1.6} dim />
            <Label x={78} y={62} muted size={22}>
              its
            </Label>
            <Label x={78} y={190} muted size={13}>
              чей
            </Label>
            <path d="M160 40 V184" className="st-line" strokeDasharray="4 5" />
            <Prop name="snow" x={240} y={148} s={1.8} />
            <Label x={240} y={62} pos="pron" size={22}>
              it’s
            </Label>
            <Label x={240} y={190} muted size={13}>
              = it is
            </Label>
          </Scene>
        ),
        en: '{It_P} +’s_V cold_J today_R .',
        ru: 'С апострофом it’s — это it is: «сегодня холодно». Чей — без апострофа: its.',
      },
    ],
  },
] satisfies TopicStories
