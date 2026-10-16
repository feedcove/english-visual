import { Glyph } from '../../ui/Glyph'
import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'
import { Hidden } from './Hidden'

// Чей? Владелец + маркер + вещь. Маркер (’s, ’, of) — главное в схеме, ловит выделение.

type Rule = 's' | 's-plural' | 'irregular-plural' | 'of'

interface Case {
  id: Rule
  badge: string
  when: string
  /** Разметка до и после маркера; сам маркер — отдельно, чтобы спрятать его в quiz. */
  before: string
  marker: string
  after: string
}

const CASES: Case[] = [
  { id: 's', badge: '+’s', when: 'один владелец', before: 'Anna_N', marker: '+’s_X', after: 'bag_N' },
  { id: 's-plural', badge: 'мн. ч. на -s: +’', when: 'много владельцев, уже есть -s', before: 'my parents_N', marker: '+’_X', after: 'house_N' },
  { id: 'irregular-plural', badge: 'особое мн. ч.: +’s', when: 'мн. ч. без -s: men, children', before: 'the children_N', marker: '+’s_X', after: 'toys_N' },
  { id: 'of', badge: 'чаще of', when: 'вещи, не люди', before: 'the end_N', marker: 'of_I', after: 'the film_N' },
]

/** Маркер как пропуск: [of_I], +[’s_X]. */
const asGap = (m: string) => (m.startsWith('+') ? `+[${m.slice(1)}]` : `[${m}]`)

const isRule = (f?: string): f is Rule => CASES.some((c) => c.id === f)

export function PossessiveS({ focus, compact, quiz }: VisualProps) {
  const sel = isRule(focus) ? focus : undefined
  const rows = compact && sel ? CASES.filter((c) => c.id === sel) : compact ? CASES.slice(0, 2) : CASES

  return (
    <div className="vs vst-poss" data-pos="noun" data-compact={compact || undefined}>
      {!compact && (
        <p className="vst-poss-q">
          <b>Чей?</b> <span>владелец</span> + <span className="vst-poss-mark"><Glyph pos="part" size={14} /> маркер</span> + <span>вещь</span>
        </p>
      )}
      {rows.map((c) => {
        const on = c.id === sel
        const dim = Boolean(sel) && !on
        const hide = quiz && (!sel || on)
        const tokens = `${c.before} ${hide ? asGap(c.marker) : c.marker} ${c.after}`
        return (
          <div key={c.id} className="vst-case" data-on={on || undefined} data-dim={dim || undefined}>
            <div className="vst-case-head">
              <span className="vst-badge">{hide ? <Hidden /> : c.badge}</span>
              {!compact && <span className="vst-when">{c.when}</span>}
            </div>
            <p className="vst-case-ex">
              <Sentence source={tokens} paint={dim ? 'none' : 'all'} gap={hide ? <Hidden /> : undefined} />
            </p>
          </div>
        )
      })}
    </div>
  )
}
