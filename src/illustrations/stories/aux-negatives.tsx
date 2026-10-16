import { Arrow, Check, Cross, Label, Person, Prop, Scene } from '../kit'
import { Neg, Train, trainSlots } from '../kit/extra/quant-sentence'
import type { Car } from '../kit/extra/quant-sentence'
import type { Pos } from '../../content/types'
import type { TopicStories } from '../types'

// Отрицание. Слова — вагончики; not (частица) встаёт сразу после первого вспомогательного; нет вспомогательного — do + not.
// Минус в кружке — отрицание: в английском оно одно на предложение.

/** cx так, чтобы левый край ряда оказался в точке left (ряды с разной длиной выровнены по левому краю). */
const cxAt = (cars: Car[], left: number, gap = 7) => left - trainSlots(cars, 0, gap)[0]!.x

const L = 28

/** Ряд-«было» блёклый, ряд-«стало» с выделенным вагончиком. */
function Row({ cars, y, gap = 7, left = L }: { cars: Car[]; y: number; gap?: number; left?: number }) {
  return <Train y={y} cars={cars} cx={cxAt(cars, left, gap)} gap={gap} />
}

export default [
  {
    id: 'aux-negatives.not-after-aux',
    title: 'Где стоит not: сразу после вспомогательного',
    focus: ['negative', 'statement', 'do-support'],
    frames: [
      {
        scene: (
          <Scene label="Два ряда слов: сверху We will be late, снизу вагончик not встал сразу после will; рядом человек идёт к автобусу">
            <Label x={L} y={18} anchor="start" size={12} muted>
              утверждение
            </Label>
            <Row y={24} cars={[{ text: 'We' }, { text: 'will' }, { text: 'be' }, { text: 'late' }]} />
            <Label x={L} y={72} anchor="start" size={12} muted>
              отрицание: not после will
            </Label>
            <Row y={79} cars={[{ text: 'We' }, { text: 'will' }, { text: 'not', pos: 'part' }, { text: 'be' }, { text: 'late' }]} />
            <Person x={44} y={168} pose="walk" s={0.72} />
            <Prop name="bus" x={250} y={168} s={1.2} />
          </Scene>
        ),
        en: 'We_P will_A {not_X} be_V late_J .',
        ru: 'С will, can, have — вставляем not сразу после вспомогательного. Остальные слова не двигаются.',
      },
      {
        scene: (
          <Scene label="Два ряда слов: сверху She is at home, снизу not встал сразу после is; рядом дом">
            <Label x={L} y={18} anchor="start" size={12} muted>
              утверждение
            </Label>
            <Row y={24} cars={[{ text: 'She' }, { text: 'is' }, { text: 'at' }, { text: 'home' }]} />
            <Label x={L} y={72} anchor="start" size={12} muted>
              отрицание: not после is
            </Label>
            <Row y={79} cars={[{ text: 'She' }, { text: 'is' }, { text: 'not', pos: 'part' }, { text: 'at' }, { text: 'home' }]} />
            <Person x={44} y={168} pose="stand" hair="long" s={0.72} />
            <Prop name="house" x={250} y={168} s={1.3} />
          </Scene>
        ),
        en: 'She_P is_V {not_X} at_I home_N .',
        ru: 'Глагол be не нужно подпирать do: not встаёт сразу после am, is, are, was, were. She isn’t at home.',
      },
      {
        scene: (
          <Scene label="Два ряда слов: в верхнем между I и like пустая рамка — вспомогательного нет; в нижнем её занял don’t">
            <Label x={L} y={18} anchor="start" size={12} muted>
              вспомогательного нет — место пустое
            </Label>
            <Row y={24} cars={[{ text: 'I' }, { text: '', ghost: true, w: 62 }, { text: 'like' }, { text: 'coffee' }]} />
            <Label x={L} y={72} anchor="start" size={12} muted>
              ставим do + not
            </Label>
            <Row y={79} cars={[{ text: 'I' }, { text: 'don’t', pos: 'aux', w: 62 }, { text: 'like' }, { text: 'coffee' }]} />
            <Person x={44} y={168} pose="talk" s={0.72} />
            <Prop name="coffee" x={250} y={168} s={1.4} />
          </Scene>
        ),
        en: 'I_P {don’t_A} like_V coffee_N .',
        ru: 'В Present Simple и Past Simple вспомогательного нет, место пустое. Занимаем его: don’t, doesn’t, didn’t. Глагол не меняется.',
      },
    ],
  },
  {
    id: 'aux-negatives.one-negative',
    title: 'Одно отрицание: по-русски их много, по-английски одно',
    focus: ['negative'],
    frames: [
      {
        scene: (
          <Scene label="Русская фраза «Никто ничего не знает»: над тремя словами три знака минус">
            <Train y={50} cars={[{ text: 'Никто', w: 66 }, { text: 'ничего', w: 66 }, { text: 'не', w: 40 }, { text: 'знает', w: 62 }]} cx={160} gap={6} />
            {(() => {
              const s = trainSlots([{ text: 'Никто', w: 66 }, { text: 'ничего', w: 66 }, { text: 'не', w: 40 }, { text: 'знает', w: 62 }], 160, 6)
              return [0, 1, 2].map((i) => <Neg key={i} x={s[i]!.mid} y={30} />)
            })()}
            <Person x={54} y={168} pose="think" s={1.1} />
          </Scene>
        ),
        en: 'Никто_P ничего_P {не_X} знает_V .',
        lang: 'ru',
        ru: 'По-русски отрицаний сколько угодно: никто, ничего и ещё «не» — три минуса, и это норма.',
      },
      {
        scene: (
          <Scene ground={false} label="Сверху I don’t know nothing с двумя минусами и крестом, снизу I don’t know anything с одним минусом и галочкой">
            <Row y={44} cars={[{ text: 'I' }, { text: 'don’t' }, { text: 'know' }, { text: 'nothing' }]} gap={5} left={18} />
            {(() => {
              const cars: Car[] = [{ text: 'I' }, { text: 'don’t' }, { text: 'know' }, { text: 'nothing' }]
              const s = trainSlots(cars, cxAt(cars, 18, 5), 5)
              return (
                <>
                  <Neg x={s[1]!.mid} y={28} />
                  <Neg x={s[3]!.mid} y={28} />
                </>
              )
            })()}
            <Cross x={300} y={59} size={20} />
            <Row y={122} cars={[{ text: 'I' }, { text: 'don’t' }, { text: 'know' }, { text: 'anything', pos: 'pron' }]} gap={5} left={18} />
            {(() => {
              const cars: Car[] = [{ text: 'I' }, { text: 'don’t' }, { text: 'know' }, { text: 'anything' }]
              const s = trainSlots(cars, cxAt(cars, 18, 5), 5)
              return <Neg x={s[1]!.mid} y={106} />
            })()}
            <Check x={300} y={137} size={22} />
          </Scene>
        ),
        en: 'I_P don’t_A know_V {anything_P} .',
        ru: 'Два минуса в английском спорят: don’t уже отрицает, поэтому дальше anything, а не nothing.',
      },
      {
        scene: (
          <Scene label="Фраза Nobody knows anything: один минус над словом Nobody">
            <Train y={50} cars={[{ text: 'Nobody', pos: 'pron', w: 74 }, { text: 'knows', w: 62 }, { text: 'anything', w: 78 }]} cx={160} gap={6} />
            {(() => {
              const s = trainSlots([{ text: 'Nobody', w: 74 }, { text: 'knows', w: 62 }, { text: 'anything', w: 78 }], 160, 6)
              return <Neg x={s[0]!.mid} y={30} />
            })()}
            <Person x={54} y={168} pose="think" s={1.1} />
            <Check x={290} y={65} size={22} />
          </Scene>
        ),
        en: '{Nobody_P} knows_V anything_P .',
        ru: 'Или отрицание в самом слове: Nobody. Один минус — глагол без not: Nobody knows anything.',
      },
    ],
  },
  {
    id: 'aux-negatives.s-moves',
    title: 'doesn’t likes? Окончание -s переехало к does',
    focus: ['negative', 'do-support'],
    frames: [
      {
        scene: (
          <Scene label="He likes tea: у глагола like на конце значок -s">
            <Person x={54} y={168} pose="talk" s={1.1} />
            <Prop name="tea" x={256} y={168} s={1.5} />
            <Train y={46} cars={[{ text: 'He' }, { text: 'like', w: 64 }, { text: 'tea' }]} cx={160} />
            {(() => {
              const s = trainSlots([{ text: 'He' }, { text: 'like', w: 64 }, { text: 'tea' }], 160)
              return <Chip x={s[1]!.x + s[1]!.w - 2} y={48} pos="verb" />
            })()}
          </Scene>
        ),
        en: 'He_P {likes_V} tea_N .',
        ru: 'В утверждении окончание -s (he, she, it) висит на самом глаголе: likes.',
      },
      {
        scene: (
          <Scene label="He doesn’t like tea: значок -s переехал с глагола like на doesn’t, у like окончания нет">
            <Person x={54} y={168} pose="stand" s={1.1} />
            <Prop name="tea" x={256} y={168} s={1.5} />
            <Train y={46} cars={[{ text: 'He' }, { text: 'doesn’t', pos: 'aux', w: 74 }, { text: 'like', w: 54 }, { text: 'tea' }]} cx={160} gap={6} />
            {(() => {
              const s = trainSlots([{ text: 'He' }, { text: 'doesn’t', w: 74 }, { text: 'like', w: 54 }, { text: 'tea' }], 160, 6)
              return (
                <>
                  <circle cx={s[2]!.x + s[2]!.w - 2} cy={48} r="9" style={{ fill: 'none', stroke: 'var(--c3)', strokeWidth: 1.5, strokeDasharray: '3 3' }} />
                  <Chip x={s[1]!.x + s[1]!.w - 2} y={48} pos="aux" />
                  <Arrow from={[s[2]!.x + s[2]!.w - 12, 26]} to={[s[1]!.x + s[1]!.w - 10, 26]} tone="motion" bend={14} />
                </>
              )
            })()}
          </Scene>
        ),
        en: 'He_P {doesn’t_A} like_V tea_N .',
        ru: 'Отрицание строит doesn’t, и «хозяин» -s теперь он. Его работа — показать he / she / it, глагол остаётся голым: like.',
      },
      {
        scene: (
          <Scene label="Ошибка: у doesn’t и у likes одновременно значок -s; зачёркнуто">
            <Person x={54} y={168} pose="stand" s={1.1} />
            <Train y={46} cars={[{ text: 'He' }, { text: 'doesn’t', w: 74 }, { text: 'like', w: 54 }, { text: 'tea' }]} cx={160} gap={6} />
            {(() => {
              const s = trainSlots([{ text: 'He' }, { text: 'doesn’t', w: 74 }, { text: 'like', w: 54 }, { text: 'tea' }], 160, 6)
              return (
                <>
                  <Chip x={s[1]!.x + s[1]!.w - 2} y={48} />
                  <Chip x={s[2]!.x + s[2]!.w - 2} y={48} />
                </>
              )
            })()}
            <Cross x={160} y={116} size={30} />
            <Label x={160} y={150} size={14} muted>
              два -s — лишнее
            </Label>
          </Scene>
        ),
        en: 'He_P doesn’t_A {like_V} tea_N .',
        ru: 'Два -s — лишнее: doesn’t уже несёт окончание. После doesn’t, don’t, didn’t глагол всегда в начальной форме.',
      },
    ],
  },
] satisfies TopicStories

/** Значок окончания -s на углу вагончика; pos — выделить цветом хозяина окончания (глагол или вспомогательный). */
function Chip({ x, y, pos }: { x: number; y: number; pos?: Pos }) {
  return (
    <g data-pos={pos}>
      <circle cx={x} cy={y} r="9" style={{ fill: 'var(--n0)', stroke: pos ? 'var(--pc)' : 'var(--c2)', strokeWidth: pos ? 2.25 : 1.75 }} />
      <Label x={x} y={y + 4} size={12} pos={pos}>
        s
      </Label>
    </g>
  )
}
