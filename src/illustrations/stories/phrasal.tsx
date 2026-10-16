import { Arrow, Check, Cross, Frame, Label, Person, Prop, Scene } from '../kit'
import type { Pos } from '../../content/types'
import type { TopicStories } from '../types'

// Фразовые глаголы: одна и та же сцена, меняется только частица — и меняется смысл (on — включить, off — выключить).
// Вторая история — слоты: существительное можно поставить по обе стороны от частицы, местоимение только внутрь.
// Выделена одна частица кадра: в цвете наречия (up, off, on) или предлога (look after).

/** Метка-«бирка» с центром (x, y). */
function Chip({ x, y, w, pos, children }: { x: number; y: number; w: number; pos?: Pos; children: string }) {
  return (
    <>
      <Frame x={x - w / 2} y={y - 12} w={w} h={24} pos={pos} />
      <Label x={x} y={y + 5} pos={pos} muted={!pos} size={15}>
        {children}
      </Label>
    </>
  )
}

interface Card {
  t: string
  pos?: Pos
  /** Прилипает к предыдущей карточке без зазора. */
  glue?: boolean
}

const cardW = (c: Card) => 18 + 8 * c.t.length

/** Строка карточек с отметкой справа: можно (галочка) или нельзя (крест). */
function Row({ y, cards, ok }: { y: number; cards: Card[]; ok: boolean }) {
  let x = 14
  const parts = cards.map((c, i) => {
    const w = cardW(c)
    if (i && !c.glue) x += 6
    const cx = x + w / 2
    x += w
    return (
      <g key={i}>
        <Frame x={cx - w / 2} y={y - 15} w={w} h={30} pos={c.pos} />
        <Label x={cx} y={y + 5} size={15} pos={c.pos}>
          {c.t}
        </Label>
      </g>
    )
  })
  return (
    <>
      {parts}
      {ok ? <Check x={x + 24} y={y} size={18} /> : <Cross x={x + 24} y={y} size={16} />}
    </>
  )
}

export default [
  {
    id: 'phrasal.on-off',
    title: 'turn on — turn off: частица меняет смысл',
    focus: ['on', 'off'],
    frames: [
      {
        scene: (
          <Scene label="Человек показывает на лампу, лампа горит, на стрелке-действии turn частица on">
            <Person x={64} y={168} pose="point" s={1.4} />
            <Arrow from={[132, 120]} to={[192, 120]} tone="action" label="turn" />
            <Chip x={160} y={86} w={54} pos="adv">
              on
            </Chip>
            <Arrow from={[160, 100]} to={[160, 114]} />
            <Prop name="lamp-on" x={258} y={168} s={2} />
          </Scene>
        ),
        en: 'Turn_V {on_R} the_D light_N .',
        ru: 'Глагол turn, частица on — «включено»: лампа горит. Включить — turn on.',
      },
      {
        scene: (
          <Scene label="Тот же человек и та же лампа, но она погасла; на стрелке turn частица off">
            <Person x={64} y={168} pose="point" s={1.4} />
            <Arrow from={[132, 120]} to={[192, 120]} tone="action" label="turn" />
            <Chip x={160} y={86} w={54} pos="adv">
              off
            </Chip>
            <Arrow from={[160, 100]} to={[160, 114]} />
            <Prop name="lamp" x={258} y={168} s={2} />
          </Scene>
        ),
        en: 'Turn_V {off_R} the_D light_N .',
        ru: 'Глагол тот же, частица другая: off — свет ушёл. Выключить — turn off. Меняется только частица, а смысл — наоборот.',
      },
      {
        scene: (
          <Scene label="Пальто летит от вешалки к человеку: частица on, оно оказывается на нём">
            <Person x={72} y={168} pose="stand" s={1.4} />
            <Prop name="coat" x={246} y={168} s={1.8} />
            <Arrow from={[208, 104]} to={[128, 104]} bend={-14} />
            <Chip x={170} y={58} w={54} pos="adv">
              on
            </Chip>
          </Scene>
        ),
        en: 'Put_V {on_R} your_P coat_N .',
        ru: 'On — «на себя»: вещь ложится на тело. Надеть — put on.',
      },
      {
        scene: (
          <Scene label="Пальто уходит от человека прочь: частица off, оно снято">
            <Person x={72} y={168} pose="stand" s={1.4} />
            <Prop name="coat" x={246} y={168} s={1.8} />
            <Arrow from={[128, 104]} to={[208, 104]} bend={14} />
            <Chip x={170} y={58} w={54} pos="adv">
              off
            </Chip>
          </Scene>
        ),
        en: 'Take_V {off_R} your_P coat_N .',
        ru: 'Off — «прочь»: вещь уходит от тела. Снять — take off.',
      },
    ],
  },
  {
    id: 'phrasal.separable',
    title: 'turn it off, а не turn off it',
    focus: ['separable'],
    frames: [
      {
        scene: (
          <Scene label="Две строки с телевизором: turn off the TV и turn the TV off обе с галочкой, существительное можно ставить по обе стороны частицы">
            <Row y={52} ok cards={[{ t: 'turn' }, { t: 'off', pos: 'adv' }, { t: 'the TV' }]} />
            <Row y={104} ok cards={[{ t: 'turn' }, { t: 'the TV' }, { t: 'off', pos: 'adv' }]} />
            <Prop name="tv" x={268} y={168} s={1.5} />
          </Scene>
        ),
        en: 'Turn_V the_D TV_N {off_R} .',
        ru: 'С существительным можно и так, и так: turn off the TV и turn the TV off. Частицу можно отодвинуть.',
      },
      {
        scene: (
          <Scene label="Две строки: turn it off с галочкой, turn off it зачёркнуто; местоимение it маленькое и встаёт внутрь между глаголом и частицей">
            <Row y={52} ok cards={[{ t: 'turn' }, { t: 'it' }, { t: 'off', pos: 'adv' }]} />
            <Row y={104} ok={false} cards={[{ t: 'turn' }, { t: 'off', pos: 'adv' }, { t: 'it' }]} />
            <Prop name="tv" x={268} y={168} s={1.5} />
            <Label x={268} y={100} size={15} muted>
              it
            </Label>
          </Scene>
        ),
        en: 'Turn_V it_P {off_R} .',
        ru: 'Местоимение (it, them, him) короткое: оно всегда втискивается внутрь, между глаголом и частицей.',
      },
      {
        scene: (
          <Scene label="Две строки: look after her, где look и after склеены и дальше her, с галочкой; look her after зачёркнуто">
            <Row y={52} ok cards={[{ t: 'look' }, { t: 'after', pos: 'prep', glue: true }, { t: 'her' }]} />
            <Row y={104} ok={false} cards={[{ t: 'look' }, { t: 'her' }, { t: 'after', pos: 'prep' }]} />
            <Person x={268} y={168} pose="stand" hair="long" tone={1} s={1} />
          </Scene>
        ),
        en: 'I_P look_V {after_I} her_P .',
        ru: 'Здесь after — предлог, он «приклеен» к глаголу и не отпускает: look after her. Такие нельзя разрывать, даже местоимением.',
      },
    ],
  },
] satisfies TopicStories
