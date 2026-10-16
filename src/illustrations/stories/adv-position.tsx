import { Arrow, Bubble, Cross, Frame, Label, Many, Person, Prop, Scene, W } from '../kit'
import type { Pos } from '../../content/types'
import type { TopicStories } from '../types'

// Слоты предложения: строка карточек сверху (как схема adv-slots), внизу — картинка того же предложения.
// Цветом выделена одна карточка — наречие; пунктирная пустая карточка с крестом — место, где ему стоять нельзя.

interface Card {
  t?: string
  /** Цвет части речи: карточка выделена. */
  pos?: Pos
  /** Пустое место (так нельзя): пунктир и крест. */
  ghost?: boolean
}

const cardW = (c: Card) => (c.ghost ? 26 : 18 + 8 * (c.t?.length ?? 0))

/** Строка карточек по центру холста: слова предложения слева направо. */
function Strip({ cards, y = 40 }: { cards: Card[]; y?: number }) {
  const gap = 6
  const total = cards.reduce((sum, c) => sum + cardW(c), 0) + gap * (cards.length - 1)
  let x = (W - total) / 2
  return (
    <>
      {cards.map((c, i) => {
        const w = cardW(c)
        const cx = x + w / 2
        x += w + gap
        return (
          <g key={i}>
            <Frame x={cx - w / 2} y={y - 15} w={w} h={30} pos={c.pos} dashed={c.ghost} />
            {c.ghost ? (
              <Cross x={cx} y={y} size={14} />
            ) : (
              <Label x={cx} y={y + 5} size={15} pos={c.pos}>
                {c.t}
              </Label>
            )}
          </g>
        )
      })}
    </>
  )
}

export default [
  {
    id: 'adv-position.before-verb',
    title: 'always, often, never: перед глаголом, но после is',
    focus: ['mid', 'mid-be'],
    frames: [
      {
        scene: (
          <Scene label="Строка слов I, often, walk, to work: often стоит прямо перед walk. Внизу человек идёт к офису">
            <Strip cards={[{ t: 'I' }, { t: 'often', pos: 'adv' }, { t: 'walk' }, { t: 'to work' }]} />
            <Person x={64} y={168} pose="walk" s={1.3} />
            <Arrow from={[108, 124]} to={[228, 124]} tone="action" label="walk" />
            <Prop name="office" x={272} y={168} s={1.5} />
          </Scene>
        ),
        en: 'I_P {often_R} walk_V to_I work_N .',
        ru: 'Обычный глагол: наречие частоты встаёт прямо перед ним, в слот перед стрелкой действия.',
      },
      {
        scene: (
          <Scene label="Строка слов She, is, always, late: always после is. Перед is пустое место с крестом. Внизу женщина и часы">
            <Strip cards={[{ t: 'She' }, { ghost: true }, { t: 'is' }, { t: 'always', pos: 'adv' }, { t: 'late' }]} />
            <Person x={80} y={168} pose="stand" hair="long" tone={1} s={1.3} />
            <Prop name="clock-wall" x={238} y={138} s={1.6} />
          </Scene>
        ),
        en: 'She_P is_V {always_R} late_J .',
        ru: 'Глагол be — не действие, а «знак равно»: наречие встаёт уже после него. Перед is — нельзя.',
      },
      {
        scene: (
          <Scene label="Строка слов He, has, never, been, there: never после has. Перед has пустое место с крестом. Внизу человек и дом, дорога к дому зачёркнута">
            <Strip cards={[{ t: 'He' }, { ghost: true }, { t: 'has' }, { t: 'never', pos: 'adv' }, { t: 'been' }, { t: 'there' }]} />
            <Person x={64} y={168} pose="stand" s={1.3} />
            <Arrow from={[106, 126]} to={[196, 126]} tone="motion" />
            <Cross x={151} y={126} size={18} />
            <Prop name="house" x={256} y={168} s={1.8} />
          </Scene>
        ),
        en: 'He_P has_A {never_R} been_V there_R .',
        ru: 'Если есть вспомогательный глагол (has, can, will), наречие встаёт после первого из них, а не перед ним.',
      },
    ],
  },
  {
    id: 'adv-position.end-slot',
    title: 'well, here, yesterday — в конец. very — перед прилагательным',
    focus: ['end', 'before-adj'],
    frames: [
      {
        scene: (
          <Scene label="Строка слов He, speaks, English, well: well в конце. Внизу человек говорит, стрелка идёт прямо к слову English">
            <Strip cards={[{ t: 'He' }, { t: 'speaks' }, { t: 'English' }, { t: 'well', pos: 'adv' }]} />
            <Person x={52} y={168} pose="talk" s={1.3} />
            <Arrow from={[98, 122]} to={[208, 122]} tone="action" label="speaks" />
            <Bubble x={256} y={122} w={88} h={40} tail="none">
              <Label x={256} y={127} size={15}>
                English
              </Label>
            </Bubble>
          </Scene>
        ),
        en: 'He_P speaks_V English_N {well_R} .',
        ru: 'Стрелка идёт от глагола прямо к дополнению. «Как?» — отдельный слот в самом конце.',
      },
      {
        scene: (
          <Scene label="Строка слов He, speaks, well, English: well втиснуто между глаголом и English, над ним крест. Стрелка разорвана словом well">
            <Strip cards={[{ t: 'He' }, { t: 'speaks' }, { t: 'well', pos: 'adv' }, { t: 'English' }]} />
            <Person x={52} y={168} pose="talk" s={1.3} />
            <Arrow from={[98, 122]} to={[124, 122]} tone="action" />
            <Frame x={128} y={110} w={50} h={24} pos="adv" />
            <Label x={153} y={127} size={14} pos="adv">
              well
            </Label>
            <Cross x={153} y={88} size={20} />
            <Arrow from={[182, 122]} to={[208, 122]} tone="action" />
            <Bubble x={256} y={122} w={88} h={40} tail="none">
              <Label x={256} y={127} size={15}>
                English
              </Label>
            </Bubble>
          </Scene>
        ),
        en: 'He_P speaks_V {well_R} English_N .',
        ru: 'Нельзя разрывать стрелку: между глаголом и дополнением наречие не ставят. По-русски можно, по-английски нет.',
      },
      {
        scene: (
          <Scene label="Строка слов It, is, very, cold: very прямо перед cold. Внизу снег, на нём метки very и cold">
            <Strip cards={[{ t: 'It' }, { t: 'is' }, { t: 'very', pos: 'adv' }, { t: 'cold' }]} />
            <Prop name="snow" x={60} y={128} s={1.5} />
            <Label x={60} y={156} size={15} muted>
              cold
            </Label>
            <Arrow from={[96, 108]} to={[138, 108]} />
            <Many name="snow" n={3} x={176} y={128} gap={56} s={1.25} />
            <Label x={228} y={156} anchor="end" size={15} pos="adv">
              very
            </Label>
            <Label x={234} y={156} anchor="start" size={15}>
              cold
            </Label>
          </Scene>
        ),
        en: 'It_P is_V {very_R} cold_J .',
        ru: 'Степень — «насколько?» — стоит вплотную перед прилагательным: very cold. Не после него.',
      },
    ],
  },
] satisfies TopicStories
