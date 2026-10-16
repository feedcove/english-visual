import { Glyph } from '../../ui/Glyph'
import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'

// Порядок прилагательных: девять слотов 3 × 3 читаются слева направо, сверху вниз. Заполнены 2–3 слота и сам предмет.

const SLOTS = [
  { id: 'opinion', ru: 'мнение', word: 'lovely' },
  { id: 'size', ru: 'размер', word: 'little' },
  { id: 'age', ru: 'возраст', word: 'old' },
  { id: 'shape', ru: 'форма', word: 'round' },
  { id: 'colour', ru: 'цвет', word: 'red' },
  { id: 'origin', ru: 'откуда', word: 'Italian' },
  { id: 'material', ru: 'материал', word: 'wooden' },
  { id: 'purpose', ru: 'назначение', word: 'dining' },
] as const

// Без focus показываем эти слоты; подсвеченный слот всегда заполнен.
const BASE = ['opinion', 'size', 'colour']

export function AdjOrder({ focus, compact, quiz }: VisualProps) {
  const hasFocus = Boolean(focus)
  const filled = (id: string) => BASE.includes(id) || id === focus
  const rowOf = (i: number) => Math.floor(i / 3)
  const focusIndex = SLOTS.findIndex((s) => s.id === focus)
  const rows = compact ? [focusIndex >= 0 ? rowOf(focusIndex) : 0] : [0, 1, 2]

  // С focus в фразе окрашено только слово из подсвеченного слота — одно выделение на экран.
  const words = SLOTS.filter((s) => filled(s.id)).map((s) => (s.id === focus ? `{${s.word}_J}` : `${s.word}_J`))
  const sentence = `a_D ${words.join(' ')} table_N`

  const cells = [...SLOTS.map((s, i) => ({ ...s, n: i + 1 })), { id: 'noun', ru: 'предмет', word: 'table', n: 9 }]

  return (
    <div className="vs vsl-adj" data-compact={compact || undefined}>
      <div className="vsl-grid3">
        {rows.flatMap((r) =>
          cells.slice(r * 3, r * 3 + 3).map((c) => {
            const isNoun = c.id === 'noun'
            const on = c.id === focus
            const full = isNoun || filled(c.id)
            const pos = isNoun ? 'noun' : 'adj'
            const hide = quiz && (on || !hasFocus) && !isNoun
            return (
              <div key={c.id} className="vsl-slot" data-pos={pos} data-on={on || undefined} data-dim={(hasFocus && !on) || undefined} data-empty={!full || undefined}>
                <span className="vsl-role">
                  <b>{c.n}</b>
                  {hide ? '?' : c.id === 'noun' ? 'noun' : c.id}
                </span>
                {!compact && <span className="vsl-ru">{hide ? '' : c.ru}</span>}
                <span className="vsl-slotword">
                  {full && <Glyph pos={pos} size={12} />}
                  {full ? c.word : '—'}
                </span>
              </div>
            )
          }),
        )}
      </div>
      <p className="vsl-sentence">
        <Sentence source={sentence} paint={hasFocus ? 'target' : 'all'} />
      </p>
    </div>
  )
}
