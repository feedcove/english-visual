import { Arrow, Frame, Label, Person, Prop, Scene } from '../kit'
import type { TopicStories } from '../types'

// Неправильные глаголы. История 1: три формы — три «фотографии» одного действия (go — went — gone);
// выделена та фотография, которая нужна в предложении. История 2: четыре узора — какие формы совпадают
// (скобка под одинаковыми карточками). Выделение — цветом глагола.

const PX = [8, 112, 216]
const PW = 96

/** Фотография одного действия. n: 0 — go (идёт к дому), 1 — went (вчера дошла), 2 — gone (ушла и сейчас дома: результат). */
function Photo({ n, active }: { n: 0 | 1 | 2; active: boolean }) {
  const x0 = PX[n]!
  const name = ['go', 'went', 'gone'][n]!
  const form = ['V1', 'V2', 'V3'][n]!
  return (
    <g>
      <Frame x={x0} y={12} w={PW} h={132} pos={active ? 'verb' : undefined} />
      <Prop name="house" x={x0 + 72} y={134} s={1.0} />
      {n === 0 && (
        <>
          <Person x={x0 + 26} y={134} pose="walk" s={0.9} hair="long" tone={1} />
          <Arrow from={[x0 + 40, 106]} to={[x0 + 54, 106]} tone="motion" />
        </>
      )}
      {n === 1 && (
        <>
          <Person x={x0 + 40} y={134} pose="stand" s={0.9} hair="long" tone={1} />
          <Label x={x0 + PW / 2} y={34} muted size={11}>
            вчера
          </Label>
        </>
      )}
      {n === 2 && (
        <>
          <Person x={x0 + 40} y={134} pose="stand" s={0.9} hair="long" tone={1} />
          <Label x={x0 + PW / 2} y={34} muted size={11}>
            и сейчас дома
          </Label>
        </>
      )}
      <Label x={x0 + PW / 2} y={168} pos={active ? 'verb' : undefined} size={17} weight={700}>
        {name}
      </Label>
      <Label x={x0 + PW / 2} y={187} muted size={11} weight={500}>
        {form}
      </Label>
    </g>
  )
}

const CX = [58, 160, 262]

/** Карточки V1 V2 V3 с узором. same — какие карточки совпадают (скобка с ножками только под ними, остальные пунктиром), mark — какая карточка нужна в предложении. */
function Pattern({ words, letters, prop, same, mark }: { words: [string, string, string]; letters: string; prop: string; same?: number[]; mark?: number }) {
  return (
    <g>
      <Prop name={prop} x={30} y={62} s={1.0} />
      {words.map((w, i) => (
        <g key={i}>
          <Label x={CX[i]!} y={80} muted size={16} weight={700}>
            {letters[i]}
          </Label>
          <Frame x={CX[i]! - 46} y={88} w={92} h={46} pos={mark === i ? 'verb' : undefined} dashed={same && !same.includes(i)} />
          <Label x={CX[i]! - 38} y={101} anchor="start" muted size={11} weight={500}>
            {`V${i + 1}`}
          </Label>
          <Label x={CX[i]!} y={125} size={19} weight={700} muted={same && !same.includes(i)}>
            {w}
          </Label>
        </g>
      ))}
      {same && (
        <g className="st-sym st-hl" data-pos="verb">
          <path d={`M${CX[same[0]!]} 147H${CX[same[same.length - 1]!]}${same.map((i) => `M${CX[i]} 138V147`).join('')}`} className="st-sym-line" strokeWidth={2.5} />
          <Label x={(CX[same[0]!]! + CX[same[same.length - 1]!]!) / 2} y={172} pos="verb" size={20}>
            =
          </Label>
        </g>
      )}
      {!same && (
        <Label x={160} y={166} muted size={13}>
          все три разные
        </Label>
      )}
    </g>
  )
}

export default [
  {
    id: 'irregular-verbs.three-photos',
    title: 'go — went — gone: три фотографии одного действия',
    focus: ['abc', 'v2', 'v3'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Три снимка: go — Анна идёт к дому, went — вчера дошла, gone — ушла и сейчас дома; выделен первый снимок go">
            <Photo n={0} active />
            <Photo n={1} active={false} />
            <Photo n={2} active={false} />
          </Scene>
        ),
        en: 'Anna_N wants_V to_X {go_V} home_R .',
        ru: 'Первый снимок: само действие, без времени. Словарная форма go — после to и после did / didn’t.',
      },
      {
        scene: (
          <Scene ground={false} label="Те же три снимка; выделен второй — went, вчера она дошла до дома">
            <Photo n={0} active={false} />
            <Photo n={1} active />
            <Photo n={2} active={false} />
          </Scene>
        ),
        en: 'Anna_N {went_V} home_R yesterday_R .',
        ru: 'Второй снимок: событие закончилось «вчера». Время названо — went (Past Simple).',
      },
      {
        scene: (
          <Scene ground={false} label="Те же три снимка; выделен третий — gone: Анна ушла и сейчас дома, важен результат">
            <Photo n={0} active={false} />
            <Photo n={1} active={false} />
            <Photo n={2} active />
          </Scene>
        ),
        en: 'Anna_N has_A {gone_V} home_R .',
        ru: 'Третий снимок: важен результат сейчас — Анна ушла и она дома, здесь её нет. После has / have / had — gone.',
      },
    ],
  },
  {
    id: 'irregular-verbs.patterns',
    title: 'Четыре узора: какие формы совпадают',
    focus: ['aaa', 'abb', 'abc', 'aba'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Узор aaa: cut, cut, cut — все три карточки одинаковые, скобка с ножками под каждой и знак равно">
            <Pattern words={['cut', 'cut', 'cut']} letters="AAA" prop="paper" same={[0, 1, 2]} />
          </Scene>
        ),
        en: 'I_P {cut_V} the_D paper_N yesterday_R .',
        ru: 'aaa: все три формы одинаковые. Учить нечего: cut, cut, cut.',
      },
      {
        scene: (
          <Scene ground={false} label="Узор abb: buy, bought, bought — вторая и третья карточки одинаковые, скобка под ними; первая — пунктиром">
            <Pattern words={['buy', 'bought', 'bought']} letters="ABB" prop="bag" same={[1, 2]} />
          </Scene>
        ),
        en: 'She_P {bought_V} a_D new_J bag_N .',
        ru: 'abb: V2 и V3 совпадают. Выучил один раз bought — и закрыл две формы.',
      },
      {
        scene: (
          <Scene ground={false} label="Узор abc: write, wrote, written — все три карточки разные, скобки нет; выделена третья">
            <Pattern words={['write', 'wrote', 'written']} letters="ABC" prop="letter" mark={2} />
          </Scene>
        ),
        en: 'He_P has_A {written_V} a_D letter_N .',
        ru: 'abc: все три разные, их надо знать каждую. Самая коварная — третья: written.',
      },
      {
        scene: (
          <Scene ground={false} label="Узор aba: come, came, come — первая и третья карточки одинаковые, скобка соединяет только их; вторая — пунктиром">
            <Pattern words={['come', 'came', 'come']} letters="ABA" prop="house" same={[0, 2]} />
          </Scene>
        ),
        en: 'Tom_N has_A {come_V} home_R .',
        ru: 'aba: V1 и V3 совпадают, а V2 другая: came. Ловушка — написать has came.',
      },
    ],
  },
] satisfies TopicStories
