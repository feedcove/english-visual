import type { VisualProps } from '../types'

// Эталонная схема (docs/visuals.md): HTML-сетка, подписи прямо в ячейках и над столбцами, одна подсветка.

const FORMS = [
  { id: 'subj', q: 'кто?', where: 'перед глаголом' },
  { id: 'obj', q: 'кого? кому?', where: 'после глагола и предлога' },
  { id: 'poss', q: 'чей? + сущ.', where: 'my book' },
  { id: 'posspron', q: 'чей? без сущ.', where: 'it’s mine' },
  { id: 'refl', q: 'сам себя', where: 'I did it myself' },
] as const

type FormId = (typeof FORMS)[number]['id']

const ROWS: { id: string; ru: string; forms: Record<FormId, string> }[] = [
  { id: 'i', ru: 'я', forms: { subj: 'I', obj: 'me', poss: 'my', posspron: 'mine', refl: 'myself' } },
  { id: 'you', ru: 'ты, вы', forms: { subj: 'you', obj: 'you', poss: 'your', posspron: 'yours', refl: 'yourself' } },
  { id: 'he', ru: 'он', forms: { subj: 'he', obj: 'him', poss: 'his', posspron: 'his', refl: 'himself' } },
  { id: 'she', ru: 'она', forms: { subj: 'she', obj: 'her', poss: 'her', posspron: 'hers', refl: 'herself' } },
  { id: 'it', ru: 'оно, вещь', forms: { subj: 'it', obj: 'it', poss: 'its', posspron: '—', refl: 'itself' } },
  { id: 'we', ru: 'мы', forms: { subj: 'we', obj: 'us', poss: 'our', posspron: 'ours', refl: 'ourselves' } },
  { id: 'they', ru: 'они', forms: { subj: 'they', obj: 'them', poss: 'their', posspron: 'theirs', refl: 'themselves' } },
]

function parseFocus(focus?: string): { form?: FormId; person?: string } {
  if (!focus) return {}
  const [a, b] = focus.split('.')
  if (b) return { form: a as FormId, person: b }
  if (FORMS.some((f) => f.id === a)) return { form: a as FormId }
  return { person: a }
}

export function PronGrid({ focus, compact, quiz }: VisualProps) {
  const { form, person } = parseFocus(focus)
  // Мини-версия: только нужные столбцы (подлежащее + форма из focus) или одна строка лица.
  const forms = compact
    ? FORMS.filter((f) => (form ? f.id === 'subj' || f.id === form : person ? true : f.id === 'subj' || f.id === 'obj'))
    : FORMS
  const rows = compact && person && !form ? ROWS.filter((r) => r.id === person) : ROWS
  const lit = (f: FormId, p: string) => (!form || f === form) && (!person || p === person)
  const hasFocus = Boolean(form || person)

  return (
    <div className="vg" data-pos="pron" data-compact={compact || undefined} style={{ ['--cols' as string]: forms.length }}>
      <div className="vg-row vg-head">
        <span className="vg-rowhead" />
        {forms.map((f) => (
          <span key={f.id} className="vg-colhead" data-lit={!hasFocus || f.id === form || undefined}>
            <b>{f.q}</b>
            {!compact && <span>{f.where}</span>}
          </span>
        ))}
      </div>
      {rows.map((r) => (
        <div key={r.id} className="vg-row">
          <span className="vg-rowhead" data-lit={!hasFocus || r.id === person || undefined}>
            {r.ru}
          </span>
          {forms.map((f) => {
            const on = hasFocus && lit(f.id, r.id)
            const exact = Boolean(form && person && on)
            return (
              <span key={f.id} className="vg-cell" data-on={on || undefined} data-dim={(hasFocus && !on) || undefined} data-exact={exact || undefined}>
                {quiz && exact ? '?' : f.id === 'refl' ? <Reflexive word={r.forms[f.id]} /> : r.forms[f.id]}
              </span>
            )
          })}
        </div>
      ))}
    </div>
  )
}

/** Возвратное местоимение переносится только на стыке: my·self, them·selves — заодно видно, из чего оно собрано. */
function Reflexive({ word }: { word: string }) {
  const at = word.search(/sel(f|ves)$/)
  if (at <= 0) return <>{word}</>
  return (
    <>
      {word.slice(0, at)}
      <wbr />
      {word.slice(at)}
    </>
  )
}
