import { Glyph } from '../../ui/Glyph'
import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'
import { Hidden } from './Hidden'

// Две дорожки по ПЕРВОМУ ЗВУКУ слова. Транскрипция первого звука — крупно, ловушки (буква ≠ звук) помечены.

type Lane = 'a' | 'an'

interface Item {
  word: string
  /** Разметка слова после артикля. */
  ph: string
  note?: string
}

const LANES: Record<Lane, { ru: string; sound: string; items: Item[] }> = {
  a: {
    ru: 'согласный звук',
    sound: 'a',
    items: [
      { word: 'cat', ph: 'k' },
      { word: 'house', ph: 'h' },
      { word: 'university', ph: 'j', note: 'буква u, звук «ю»' },
      { word: 'one-way ticket', ph: 'w', note: 'буква o, звук «в»' },
    ],
  },
  an: {
    ru: 'гласный звук',
    sound: 'an',
    items: [
      { word: 'apple', ph: 'æ' },
      { word: 'umbrella', ph: 'ʌ' },
      { word: 'hour', ph: 'aʊ', note: 'h не читается' },
      { word: 'MP', ph: 'e', note: 'читается «эм-пи»' },
    ],
  },
}

const LANE_IDS: Lane[] = ['a', 'an']

const isLane = (f?: string): f is Lane => f === 'a' || f === 'an'

export function AAn({ focus, compact, quiz }: VisualProps) {
  const lane = isLane(focus) ? focus : undefined
  const lanes = compact && lane ? [lane] : LANE_IDS

  return (
    <div className="vs vst-aan" data-pos="det" data-compact={compact || undefined}>
      {lanes.map((id) => {
        const L = LANES[id]
        const on = lane === id
        const dim = Boolean(lane) && !on
        const hide = quiz && (!lane || on)
        const items = compact ? L.items.slice(0, 3) : L.items
        return (
          <section key={id} className="vst-lane" data-on={on || undefined} data-dim={dim || undefined} aria-label={`${L.sound} + ${L.ru}`}>
            <header className="vst-lane-head">
              <Glyph pos="det" size={16} />
              <b>{hide ? <Hidden /> : L.sound}</b>
              <span>+ {L.ru}</span>
            </header>
            <ul className="vst-lane-items">
              {items.map((it) => (
                <li key={it.word} className="vst-snd" data-trap={Boolean(it.note) || undefined}>
                  <span className="vst-ipa">/{it.ph}/</span>
                  <span className="vst-snd-word">
                    {hide ? (
                      <span>
                        <Hidden /> {it.word}
                      </span>
                    ) : (
                      <Sentence source={`${L.sound}_D ${it.word.split(' ').map((w, i, a) => (i === a.length - 1 ? `${w}_N` : w)).join(' ')}`} paint={dim ? 'none' : 'all'} />
                    )}
                    {it.note && !compact && <small>{it.note}</small>}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
