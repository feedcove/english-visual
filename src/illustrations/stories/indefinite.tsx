import type { ReactNode } from 'react'
import { Arrow, Cross, Frame, Label, Person, Prop, Scene, Spot } from '../kit'
import type { TopicStories } from '../types'

// История 1: кто у двери — somebody (кто-то есть, неизвестно кто), anybody (спрашиваем: есть ли), nobody (пусто), everybody (все, как одно целое).
// История 2: окончания -body / -thing / -where — кто, что, где: неизвестный человек, предмет, место.
// История 3: отрицание одно — в русском три минуса (никто, ничего, не), в английском один: на nobody или на didn’t, а anything без минуса.
// Выделено слово цветом местоимения (pron), наречия (adv) или вспомогательного (aux). Минус-значок — предмет minus из kit/extra/pronouns.

/** Говорящий смотрит на дверь; у двери — то, о чём правило (в кадрах 1–3 одно и то же место). */
function Door({ children }: { children?: ReactNode }) {
  return (
    <>
      <Person x={56} y={168} pose="look" s={1.3} />
      <Prop name="door" x={266} y={168} s={2.2} />
      {children}
    </>
  )
}

export default [
  {
    id: 'indefinite.some-any-no-every',
    title: 'somebody, anybody, nobody, everybody: кто у двери?',
    focus: ['some', 'any', 'no', 'every', 'body', 'some.body', 'any.body', 'no.body', 'every.body'],
    frames: [
      {
        scene: (
          <Scene label="Человек смотрит на дверь: рядом стоит кто-то, лицо неизвестно, над ним вопрос">
            <Door>
              <Person x={184} y={168} s={1.3} flip hl pos="pron" />
              <Prop name="question" x={184} y={66} s={0.8} />
              <Label x={184} y={190} pos="pron" size={15}>
                somebody
              </Label>
            </Door>
          </Scene>
        ),
        en: '{Somebody_P} is_V at_I the_D door_N .',
        ru: 'У двери кто-то есть, кто — неизвестно. some- в утверждении: человек есть.',
      },
      {
        scene: (
          <Scene label="Человек смотрит на дверь и спрашивает: у двери пустой пунктирный круг и вопрос — есть ли там кто-нибудь">
            <Door>
              <Spot x={184} y={122} r={44} pos="pron" />
              <Prop name="question" x={184} y={148} s={1.2} />
              <Label x={184} y={190} pos="pron" size={15}>
                anybody
              </Label>
            </Door>
          </Scene>
        ),
        en: 'Is_V {anybody_P} at_I the_D door_N ?',
        ru: 'Мы не знаем, есть ли там кто-нибудь. В вопросе — any-: anybody.',
      },
      {
        scene: (
          <Scene label="Человек смотрит на дверь: у двери пустой пунктирный круг, перечёркнутый, никого нет">
            <Door>
              <Spot x={184} y={122} r={44} pos="pron" />
              <Cross x={184} y={122} size={32} />
              <Label x={184} y={190} pos="pron" size={15}>
                nobody
              </Label>
            </Door>
          </Scene>
        ),
        en: '{Nobody_P} is_V at_I the_D door_N .',
        ru: 'Круг пуст, и крест уже стоит: nobody — это «никого». Отрицание внутри слова, not не нужен.',
      },
      {
        scene: (
          <Scene label="Четверо стоят в одной общей рамке: все здесь, и всё это одно целое">
            <Person x={62} y={168} s={1.1} />
            <Person x={126} y={168} s={1.1} hair="long" tone={1} />
            <Person x={190} y={168} s={1.1} tone={2} />
            <Person x={254} y={168} s={1.1} hair="long" tone={3} />
            <Frame x={20} y={74} w={280} h={94} pos="pron" dashed />
            <Label x={160} y={190} pos="pron" size={15}>
              everybody
            </Label>
          </Scene>
        ),
        en: '{Everybody_P} is_V here_R .',
        ru: 'Все — в одной общей рамке. Слово одно целое, поэтому глагол в единственном числе: is.',
      },
    ],
  },
  {
    id: 'indefinite.body-thing-where',
    title: 'some-: кто-то, что-то, где-то',
    focus: ['some', 'body', 'thing', 'where', 'some.body', 'some.thing', 'some.where'],
    frames: [
      {
        scene: (
          <Scene label="Человек видит кого-то: стрелка к неизвестному человеку с вопросом">
            <Person x={56} y={168} pose="look" s={1.3} />
            <Person x={236} y={168} s={1.3} flip hl pos="pron" />
            <Prop name="question" x={236} y={66} s={0.8} />
            <Arrow from={[92, 80]} to={[204, 80]} tone="action" label="see" bend={-14} />
            <Label x={236} y={190} pos="pron" size={15}>
              somebody
            </Label>
          </Scene>
        ),
        en: 'I_P can_A see_V {somebody_P} .',
        ru: '-body — человек: кого-то видно, кого именно — неизвестно.',
      },
      {
        scene: (
          <Scene label="Человек видит что-то: стрелка к закрытой коробке с вопросом">
            <Person x={56} y={168} pose="look" s={1.3} />
            <Prop name="box" x={236} y={168} s={2} hl pos="pron" />
            <Prop name="question" x={236} y={96} s={0.8} />
            <Arrow from={[92, 124]} to={[196, 124]} tone="action" label="see" />
            <Label x={236} y={190} pos="pron" size={15}>
              something
            </Label>
          </Scene>
        ),
        en: 'I_P can_A see_V {something_P} .',
        ru: '-thing — предмет: что-то видно, что именно — неизвестно.',
      },
      {
        scene: (
          <Scene label="Человек идёт к метке места с вопросом: куда-нибудь, место неизвестно">
            <Person x={56} y={168} pose="walk" s={1.3} />
            <Arrow from={[96, 140]} to={[196, 150]} tone="action" label="go" bend={-8} />
            <Prop name="pin" x={236} y={168} s={1.7} hl pos="adv" />
            <Label x={236} y={190} pos="adv" size={15}>
              somewhere
            </Label>
          </Scene>
        ),
        en: 'I_P want_V to_X go_V {somewhere_R} .',
        ru: '-where — место: пойти куда-нибудь, куда именно — неизвестно.',
      },
    ],
  },
  {
    id: 'indefinite.one-minus',
    title: 'Никто ничего не сказал: отрицание одно',
    focus: ['no', 'any', 'no.body', 'any.body', 'no.thing', 'any.thing'],
    frames: [
      {
        scene: (
          <Scene label="Русская фраза «никто ничего не сказал»: под каждым из трёх слов по знаку минус" ground={false}>
            <Label x={76} y={92} pos="pron" size={19}>
              никто
            </Label>
            <Label x={170} y={92} muted size={19}>
              ничего
            </Label>
            <Label x={250} y={92} muted size={19}>
              не
            </Label>
            <Prop name="minus" x={76} y={150} s={1.6} />
            <Prop name="minus" x={170} y={150} s={1.6} />
            <Prop name="minus" x={250} y={150} s={1.6} />
          </Scene>
        ),
        en: '{Никто_P} ничего_P не_X сказал_V .',
        lang: 'ru',
        ru: 'В русском три минуса: никто, ничего и не — и это правильно, так и говорят.',
      },
      {
        scene: (
          <Scene label="То же по-английски: минус только под словом nobody, а у слова anything пустое место без минуса" ground={false}>
            <Label x={96} y={92} pos="pron" size={19}>
              nobody
            </Label>
            <Label x={224} y={92} muted size={19}>
              anything
            </Label>
            <Prop name="minus" x={96} y={150} s={1.6} />
            <NoMinus x={224} y={128} />
          </Scene>
        ),
        en: '{Nobody_P} said_V anything_P .',
        ru: 'В английском минус один — в слове nobody. У anything его нет, это обычное any-.',
      },
      {
        scene: (
          <Scene label="Минус перешёл на didn’t, у слова anything по-прежнему пустое место: отрицание всё равно одно" ground={false}>
            <Label x={76} y={92} pos="aux" size={19}>
              didn’t
            </Label>
            <Label x={160} y={92} muted size={19}>
              say
            </Label>
            <Label x={244} y={92} muted size={19}>
              anything
            </Label>
            <Prop name="minus" x={76} y={150} s={1.6} />
            <NoMinus x={244} y={128} />
          </Scene>
        ),
        en: 'He_P {didn’t_A} say_V anything_P .',
        ru: 'Тот же смысл, но минус теперь в didn’t. После него — any-: anything. Всегда один минус.',
      },
    ],
  },
] satisfies TopicStories

/** Пустое место под словом: здесь минуса нет. */
function NoMinus({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={21} className="st-line" strokeDasharray="4 5" />
}
