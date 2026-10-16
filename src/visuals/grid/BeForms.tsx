import { Glyph } from '../../ui/Glyph'
import type { VisualProps } from '../types'

// Лицо × время × (утверждение, отрицание, вопрос). Цвет — глагол (be), подсвеченная ячейка — рамка и заливка.

type TimeId = 'pres' | 'past'
type PersonId = 'i' | 'he' | 'you'
type ColId = 'aff' | 'neg' | 'q'

const TIMES: { id: TimeId; ru: string; en: string }[] = [
  { id: 'pres', ru: 'сейчас', en: 'present' },
  { id: 'past', ru: 'раньше', en: 'past' },
]

const PERSONS: { id: PersonId; label: string }[] = [
  { id: 'i', label: 'I' },
  { id: 'he', label: 'he she it' },
  { id: 'you', label: 'you we they' },
]

const COLS: { id: ColId; b: string; hint: string }[] = [
  { id: 'aff', b: 'факт', hint: 'как есть' },
  { id: 'neg', b: 'не', hint: '+ not' },
  { id: 'q', b: 'вопрос', hint: 'be вперёд' },
]

const FORMS: Record<TimeId, Record<PersonId, Record<ColId, string>>> = {
  pres: {
    i: { aff: 'am', neg: 'am not', q: 'Am I?' },
    he: { aff: 'is', neg: 'isn’t', q: 'Is he?' },
    you: { aff: 'are', neg: 'aren’t', q: 'Are you?' },
  },
  past: {
    i: { aff: 'was', neg: 'wasn’t', q: 'Was I?' },
    he: { aff: 'was', neg: 'wasn’t', q: 'Was he?' },
    you: { aff: 'were', neg: 'weren’t', q: 'Were you?' },
  },
}

const WORDS = ['am', 'is', 'are', 'was', 'were']

interface Line {
  time: TimeId
  person: PersonId
}

export function BeForms({ focus, compact, quiz }: VisualProps) {
  const word = focus && WORDS.includes(focus) ? focus : undefined
  const column: ColId | undefined = focus === 'negative' ? 'neg' : focus === 'question' ? 'q' : undefined
  const hasFocus = Boolean(word || column)

  const all: Line[] = TIMES.flatMap((t) => PERSONS.map((p) => ({ time: t.id, person: p.id })))
  const litLines = word ? all.filter((l) => FORMS[l.time][l.person].aff === word) : []

  const isOn = (l: Line, c: ColId) => (word ? c === 'aff' && FORMS[l.time][l.person].aff === word : column ? c === column : false)

  let lines = all
  let cols = COLS
  if (compact) {
    if (word) {
      // Подсвеченные строки; если она одна — добавляем соседнюю по времени.
      lines = litLines.length > 1 ? litLines : all.filter((l) => l.person === litLines[0]?.person)
    } else {
      lines = all.filter((l) => l.time === 'pres')
      if (column) cols = COLS.filter((c) => c.id === 'aff' || c.id === column)
    }
  }

  // В quiz по слову (is, were…) соседи в той же строке (isn’t, Is he?) выдали бы ответ — прячем всю строку.
  const rowAsked = (l: Line) => Boolean(word && litLines.some((x) => x.time === l.time && x.person === l.person))

  const cell = (l: Line, c: ColId) => {
    const on = isOn(l, c)
    const exact = Boolean(word && on)
    return (
      <span key={c} className="vg-cell" data-on={on || undefined} data-dim={(hasFocus && !on) || undefined} data-exact={exact || undefined}>
        {exact && <Glyph pos="verb" size={12} />}
        {quiz && (on || rowAsked(l)) ? '?' : FORMS[l.time][l.person][c]}
      </span>
    )
  }

  const head = (
    <div className="vg-row vg-head">
      <span className="vg-rowhead vg-be-corner">
        <Glyph pos="verb" size={14} /> be
      </span>
      {cols.map((c) => (
        <span key={c.id} className="vg-colhead" data-lit={(column === c.id) || undefined}>
          <b>{c.b}</b>
          {!compact && <span>{c.hint}</span>}
        </span>
      ))}
    </div>
  )

  return (
    <div className="vg vg-be" data-pos="verb" data-compact={compact || undefined} style={{ ['--tpl' as string]: `64px repeat(${cols.length}, minmax(0, 1fr))` }}>
      {head}
      {compact
        ? lines.map((l) => (
            <div key={l.time + l.person} className="vg-row">
              <span className="vg-rowhead vg-be-two" data-lit={litLines.some((x) => x === l) || undefined}>
                <b>{PERSONS.find((p) => p.id === l.person)?.label}</b>
                <i>{TIMES.find((t) => t.id === l.time)?.ru}</i>
              </span>
              {cols.map((c) => cell(l, c.id))}
            </div>
          ))
        : TIMES.map((t) => (
            <div key={t.id} className="vg-be-block">
              <div className="vg-band">
                {t.ru} · {t.en}
              </div>
              {PERSONS.map((p) => {
                const l: Line = { time: t.id, person: p.id }
                return (
                  <div key={p.id} className="vg-row">
                    <span className="vg-rowhead" data-lit={litLines.some((x) => x.time === l.time && x.person === l.person) || undefined}>
                      {p.label}
                    </span>
                    {cols.map((c) => cell(l, c.id))}
                  </div>
                )
              })}
            </div>
          ))}
    </div>
  )
}
