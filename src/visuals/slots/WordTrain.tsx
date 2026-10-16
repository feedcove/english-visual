import { useState } from 'react'
import { Glyph } from '../../ui/Glyph'
import { Sentence } from '../../ui/Sentence'
import type { Pos } from '../../content/types'
import type { VisualProps } from '../types'

// Порядок слов — поезд из шести вагонов. Цвет вагона — часть речи главного слова. Время можно перецепить в начало (кнопка).

type CarId = 'S' | 'V' | 'O' | 'M' | 'P' | 'T'

const CARS: { id: CarId; pos: Pos; word: string; q: string }[] = [
  { id: 'S', pos: 'pron', word: 'I', q: 'кто?' },
  { id: 'V', pos: 'verb', word: 'eat', q: 'делает?' },
  { id: 'O', pos: 'noun', word: 'soup', q: 'что?' },
  { id: 'M', pos: 'adv', word: 'slowly', q: 'как?' },
  { id: 'P', pos: 'prep', word: 'at home', q: 'где?' },
  { id: 'T', pos: 'adv', word: 'today', q: 'когда?' },
]

// Разметка слов каждого вагона для Sentence; вагон из focus помечаем {…}, чтобы окрасить только его.
const MARKUP: Record<CarId, string[]> = {
  S: ['I_P'],
  V: ['eat_V'],
  O: ['soup_N'],
  M: ['slowly_R'],
  P: ['at_I', 'home_N'],
  T: ['today_R'],
}

function sentenceFor(order: CarId[], focus?: string) {
  const words = order.flatMap((id, i) =>
    MARKUP[id].map((w, j) => {
      const text = i === 0 && j === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w
      return id === focus ? `{${text}}` : text
    }),
  )
  return `${words.join(' ')}.`
}

export function WordTrain({ focus, compact, quiz }: VisualProps) {
  const [front, setFront] = useState(false)
  const hasFocus = Boolean(focus)
  // Порядок вагонов: T либо в конце, либо первый.
  const order: CarId[] = front ? ['T', 'S', 'V', 'O', 'M', 'P'] : ['S', 'V', 'O', 'M', 'P', 'T']
  const canMove = !compact && !quiz

  return (
    <div className="vs vsl-train" data-compact={compact || undefined}>
      <div className="vsl-rail" role="img" aria-label="Порядок слов: S V O M P T, время можно поставить в начало">
        {CARS.map((c) => {
          const on = focus === c.id
          const hide = quiz && (on || !hasFocus)
          return (
            <div
              key={c.id}
              className="vsl-car"
              data-pos={c.pos}
              data-on={on || undefined}
              data-dim={(hasFocus && !on) || undefined}
              style={{ ['--i' as string]: order.indexOf(c.id) }}
            >
              <span className="vsl-car-head">
                <Glyph pos={c.pos} size={12} />
                <b>{hide ? '?' : c.id}</b>
              </span>
              <span className="vsl-car-word">{c.word}</span>
              {!compact && <span className="vsl-car-q">{hide ? '' : c.q}</span>}
            </div>
          )
        })}
      </div>
      {!compact && !quiz && (
        <div className="vsl-foot">
          <span className="vsl-sent">
            <Sentence source={sentenceFor(order, focus)} paint={hasFocus ? 'target' : 'all'} />
          </span>
        </div>
      )}
      {canMove && (
        <button type="button" className="k-ctl chip k-down vsl-play" data-variant="soft" data-size="sm" onClick={() => setFront((v) => !v)}>
          {front ? '↺ назад' : '▶ время в начало'}
        </button>
      )}
    </div>
  )
}
