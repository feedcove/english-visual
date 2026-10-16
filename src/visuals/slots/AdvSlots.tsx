import type { Pos } from '../../content/types'
import type { VisualProps } from '../types'
import { Tile } from './Tile'

// Место наречия: строки-слоты. Цветом выделены только наречие и прилагательное; остальные плитки нейтральные.

interface Slot {
  role: string
  word: string
  pos?: Pos
  /** Роль, которую в вопросе прячем вместе с подписью. */
  answer?: boolean
}

interface Line {
  id: string
  focus: string
  cap: string
  tiles: Slot[]
}

const ADV = (role: string, word: string): Slot => ({ role, word, pos: 'adv', answer: true })

const LINES: Line[] = [
  { id: 'front', focus: 'front', cap: 'front · в начале', tiles: [ADV('front', 'Today'), { role: 'S', word: 'I' }, { role: 'V', word: 'read' }, { role: 'O', word: 'books' }] },
  { id: 'mid', focus: 'mid', cap: 'mid · перед глаголом', tiles: [{ role: 'S', word: 'She' }, ADV('mid', 'often'), { role: 'V', word: 'reads' }, { role: 'O', word: 'books' }] },
  { id: 'mid-be', focus: 'mid-be', cap: 'mid · после am / is / are', tiles: [{ role: 'S', word: 'She' }, { role: 'be', word: 'is' }, ADV('mid', 'often'), { role: 'adj', word: 'late', pos: 'adj' }] },
  { id: 'mid-aux', focus: 'mid-be', cap: 'mid · после вспомогательного', tiles: [{ role: 'S', word: 'He' }, { role: 'aux', word: 'has' }, ADV('mid', 'never'), { role: 'V', word: 'read' }, { role: 'O', word: 'it' }] },
  { id: 'end', focus: 'end', cap: 'end · в конце', tiles: [{ role: 'S', word: 'She' }, { role: 'V', word: 'reads' }, { role: 'O', word: 'books' }, ADV('end', 'slowly')] },
  { id: 'before-adj', focus: 'before-adj', cap: 'перед прилагательным', tiles: [{ role: 'S', word: 'She' }, { role: 'be', word: 'is' }, ADV('степень', 'very'), { role: 'adj', word: 'tired', pos: 'adj' }] },
]

export function AdvSlots({ focus, compact, quiz }: VisualProps) {
  const hasFocus = Boolean(focus)
  const lit = (l: Line) => l.focus === focus
  let lines = LINES
  if (compact) lines = hasFocus ? LINES.filter(lit) : LINES.filter((l) => l.id === 'mid')
  // В quiz соседние строки с подписями mid / end выдали бы ответ — оставляем только спрошенные.
  else if (quiz && hasFocus) lines = LINES.filter(lit)

  return (
    <div className="vs vsl-adv" data-pos="adv" data-compact={compact || undefined}>
      {lines.map((l) => {
        const on = lit(l)
        const hide = quiz && (on || !hasFocus)
        return (
          <div key={l.id} className="vsl-line" data-on={on || undefined} data-dim={(hasFocus && !on) || undefined}>
            <span className="vsl-cap">{hide ? '?' : l.cap}</span>
            <div className="vsl-tiles">
              {l.tiles.map((t, i) => (
                <Tile key={i} pos={t.pos} role={hide && t.answer ? '?' : t.role} word={t.word} on={on && t.pos === 'adv'} dim={hasFocus && !on} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
