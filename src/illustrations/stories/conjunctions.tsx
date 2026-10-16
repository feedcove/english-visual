import type { ReactNode } from 'react'
import { Frame, Label, Person, Prop, Scene } from '../kit'
import type { TopicStories } from '../types'

// Союз — связка между двумя блоками-мыслями (схема conj-links): слева первая мысль, справа вторая.
// Стрелка смысла: and — плюс, but — навстречу друг другу, or — выбор («?»), so — от причины к следствию,
// because — от причины назад к следствию, although — навстречу, when — одно время (часы), if — пунктир «возможно».
// Связка цветом союза (conj), блоки нейтральные.

const LX = 10
const RX = 206
const PW = 104
const PY = 30
const PH = 120
const MY = 90 // середина по высоте
const CX = 160 // середина связки

/** Блок-мысль: рамка, предметы внутри, подпись под ним. dashed — «ещё не случилось». */
function Panel({ x, caption, dashed, children }: { x: number; caption: string; dashed?: boolean; children: ReactNode }) {
  return (
    <>
      <Frame x={x} y={PY} w={PW} h={PH} dashed={dashed} />
      {children}
      <Label x={x + PW / 2} y={174} size={13}>
        {caption}
      </Label>
    </>
  )
}

const ink = { fill: 'none', stroke: 'var(--pc)', strokeWidth: 3.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/** Стрелка связки цветом союза. */
function Link({ from, to, dashed }: { from: [number, number]; to: [number, number]; dashed?: boolean }) {
  const [x1, y1] = from
  const [x2, y2] = to
  const a = Math.atan2(y2 - y1, x2 - x1)
  const h = (d: number) => `${x2 - Math.cos(a + d) * 11} ${y2 - Math.sin(a + d) * 11}`
  return (
    <g>
      <path d={`M${x1} ${y1}L${x2} ${y2}`} {...ink} strokeDasharray={dashed ? '2 8' : undefined} />
      <path d={`M${h(0.5)}L${x2} ${y2}L${h(-0.5)}`} {...ink} />
    </g>
  )
}

/** Связка между блоками: свой знак и слово под ним. */
function Bridge({ word, children, wordY = MY + 40 }: { word: string; children: ReactNode; wordY?: number }) {
  return (
    <g data-pos="conj">
      {children}
      <Label x={CX} y={wordY} size={16} pos="conj">
        {word}
      </Label>
    </g>
  )
}

const Plus = () => <path d={`M${CX - 12} ${MY}H${CX + 12}M${CX} ${MY - 12}V${MY + 12}`} {...ink} />
const Opposed = () => (
  <>
    <Link from={[CX - 28, MY]} to={[CX - 4, MY]} />
    <Link from={[CX + 28, MY]} to={[CX + 4, MY]} />
  </>
)

export default [
  {
    id: 'conjunctions.and-but-or',
    title: 'and, but, or: плюс, «наоборот», выбор',
    focus: ['and', 'but', 'or'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Два блока: смотрим фильм и едим пиццу; между ними плюс">
            <Panel x={LX} caption="watched a film">
              <Prop name="tv" x={LX + PW / 2} y={108} s={1.6} />
            </Panel>
            <Panel x={RX} caption="ate pizza">
              <Prop name="pizza" x={RX + PW / 2} y={112} s={1.7} />
            </Panel>
            <Bridge word="and">
              <Plus />
            </Bridge>
          </Scene>
        ),
        en: 'We_P watched_V a_D film_N {and_C} ate_V pizza_N .',
        ru: 'Две мысли идут вместе, одна к другой. Складываем — and.',
      },
      {
        scene: (
          <Scene ground={false} label="Два блока: солнце и снег; стрелки между ними направлены навстречу друг другу">
            <Panel x={LX} caption="sunny">
              <Prop name="sun" x={LX + PW / 2} y={112} s={1.7} />
            </Panel>
            <Panel x={RX} caption="cold">
              <Prop name="snow" x={RX + PW / 2} y={112} s={1.8} />
            </Panel>
            <Bridge word="but">
              <Opposed />
            </Bridge>
          </Scene>
        ),
        en: 'It_P was_V sunny_J {but_C} cold_J .',
        ru: 'Вторая часть идёт против ожидания: солнце, а холодно. Стрелки навстречу — but.',
      },
      {
        scene: (
          <Scene ground={false} label="Два блока: чай и кофе; между ними знак вопроса — выбрать одно">
            <Panel x={LX} caption="tea">
              <Prop name="tea" x={LX + PW / 2} y={118} s={1.8} />
            </Panel>
            <Panel x={RX} caption="coffee">
              <Prop name="coffee" x={RX + PW / 2} y={118} s={1.8} />
            </Panel>
            <Bridge word="or" wordY={MY + 48}>
              <Prop name="question" x={CX} y={MY + 18} s={1.1} hl pos="conj" />
            </Bridge>
          </Scene>
        ),
        en: 'Would_A you_P like_V tea_N {or_C} coffee_N ?',
        ru: 'Берём одно из двух — знак вопроса между ними. Выбор — or.',
      },
    ],
  },
  {
    id: 'conjunctions.so-because',
    title: 'so и because: стрелка причины в разные стороны',
    focus: ['so', 'because'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Холод слева, стрелка вправо к пальто: причина, потом результат; подпись so">
            <Panel x={LX} caption="It was cold">
              <Prop name="snow" x={LX + PW / 2} y={112} s={1.8} />
            </Panel>
            <Panel x={RX} caption="we wore coats">
              <Prop name="coat" x={RX + PW / 2} y={120} s={1.7} />
            </Panel>
            <Bridge word="so">
              <Link from={[CX - 26, MY]} to={[CX + 26, MY]} />
            </Bridge>
          </Scene>
        ),
        en: 'It_P was_V cold_J , {so_C} we_P wore_V coats_N .',
        ru: 'Сначала причина (холодно), стрелка вправо, потом результат (пальто). Результат — so.',
      },
      {
        scene: (
          <Scene ground={false} label="Пальто слева, холод справа, стрелка идёт справа налево от причины к результату; подпись because">
            <Panel x={LX} caption="We wore coats">
              <Prop name="coat" x={LX + PW / 2} y={120} s={1.7} />
            </Panel>
            <Panel x={RX} caption="it was cold">
              <Prop name="snow" x={RX + PW / 2} y={112} s={1.8} />
            </Panel>
            <Bridge word="because">
              <Link from={[CX + 26, MY]} to={[CX - 26, MY]} />
            </Bridge>
          </Scene>
        ),
        en: 'We_P wore_V coats_N {because_C} it_P was_V cold_J .',
        ru: 'Те же блоки, но причина теперь справа, и стрелка идёт назад, к результату. Причина — because.',
      },
      {
        scene: (
          <Scene ground={false} label="Те же блоки, между ними so; над первым блоком зачёркнуто Because — второй союз не нужен">
            <Panel x={LX} caption="It was cold">
              <Prop name="snow" x={LX + PW / 2} y={112} s={1.8} />
            </Panel>
            <Panel x={RX} caption="we wore coats">
              <Prop name="coat" x={RX + PW / 2} y={120} s={1.7} />
            </Panel>
            <Bridge word="so">
              <Link from={[CX - 26, MY]} to={[CX + 26, MY]} />
            </Bridge>
            <Label x={LX + PW / 2} y={22} size={14} muted>
              Because
            </Label>
            <path d={`M${LX + PW / 2 - 34} 24L${LX + PW / 2 + 34} 10`} className="st-cross" />
          </Scene>
        ),
        en: 'It_P was_V cold_J , {so_C} we_P wore_V coats_N .',
        ru: 'По-русски говорят «так как…, поэтому…». В английском союз один: либо because, либо so — не оба сразу.',
      },
    ],
  },
  {
    id: 'conjunctions.although-when-if',
    title: 'although, when, if: вопреки, одно время, условие',
    focus: ['although', 'but', 'when', 'if'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Блок с дождём слева и блок с человеком, который вышел, справа; между ними стрелки навстречу и подпись although">
            <Panel x={LX} caption="it was raining">
              <Prop name="rain" x={LX + PW / 2} y={116} s={1.8} />
            </Panel>
            <Panel x={RX} caption="we went out">
              <Person x={RX + PW / 2 - 4} y={142} pose="walk" s={1.15} />
            </Panel>
            <Bridge word="although">
              <Opposed />
            </Bridge>
          </Scene>
        ),
        en: '{Although_C} it_P was_A raining_V , we_P went_V out_R .',
        ru: 'Дождь — повод остаться, а мы вышли: вопреки. Хотя — although.',
      },
      {
        scene: (
          <Scene ground={false} label="Те же блоки, между ними although; над вторым блоком зачёркнуто but">
            <Panel x={LX} caption="it was raining">
              <Prop name="rain" x={LX + PW / 2} y={116} s={1.8} />
            </Panel>
            <Panel x={RX} caption="we went out">
              <Person x={RX + PW / 2 - 4} y={142} pose="walk" s={1.15} />
            </Panel>
            <Bridge word="although">
              <Opposed />
            </Bridge>
            <Label x={RX + PW / 2} y={22} size={14} muted>
              but
            </Label>
            <path d={`M${RX + PW / 2 - 18} 22L${RX + PW / 2 + 18} 10`} className="st-cross" />
          </Scene>
        ),
        en: '{Although_C} it_P was_A raining_V , we_P went_V out_R .',
        ru: 'По-русски «хотя…, но…». В английском одной связки хватает: although, и but уже не нужен.',
      },
      {
        scene: (
          <Scene ground={false} label="Слева человек читает, справа звонит телефон; между ними часы и подпись when">
            <Panel x={LX} caption="I was reading">
              <Person x={LX + PW / 2 - 10} y={142} pose="hold" s={1.2} />
              <Prop name="book" x={LX + PW / 2 + 26} y={108} s={0.9} />
            </Panel>
            <Panel x={RX} caption="the phone rang">
              <Prop name="phone" x={RX + PW / 2} y={120} s={1.9} />
              <path d={`M${RX + PW / 2 + 22} 72 q8 8 0 16 M${RX + PW / 2 + 32} 66 q12 14 0 28`} className="st-line" />
            </Panel>
            <Bridge word="when">
              <circle cx={CX} cy={MY} r="17" {...ink} />
              <path d={`M${CX} ${MY}V${MY - 10}M${CX} ${MY}L${CX + 8} ${MY + 4}`} {...ink} strokeWidth={3} />
            </Bridge>
          </Scene>
        ),
        en: 'I_P was_A reading_V {when_C} the_D phone_N rang_V .',
        ru: 'Две мысли в один и тот же момент: часы между ними. Когда — when.',
      },
      {
        scene: (
          <Scene ground={false} label="Слева пунктирный блок с дождём, который ещё не случился; пунктирная стрелка к блоку с домом; подпись if">
            <Panel x={LX} caption="it rains tomorrow" dashed>
              <Prop name="rain" x={LX + PW / 2} y={116} s={1.8} />
            </Panel>
            <Panel x={RX} caption="we stay at home">
              <Prop name="house" x={RX + PW / 2} y={120} s={1.9} />
            </Panel>
            <Bridge word="if">
              <Link from={[CX - 26, MY]} to={[CX + 26, MY]} dashed />
            </Bridge>
          </Scene>
        ),
        en: '{If_C} it_P rains_V tomorrow_R , we_P will_A stay_V at_I home_N .',
        ru: 'Пунктир — это ещё не случилось, только «если». Условие — if; результат следует, когда оно выполнится.',
      },
    ],
  },
] satisfies TopicStories
