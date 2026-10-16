import { Glyph } from '../../ui/Glyph'
import type { VisualProps } from '../types'
import { Hidden } from './Hidden'

// Лента правил множественного числа. Изменённая часть слова — цветом существительного.

type RuleId = 's' | 'es' | 'ies' | 'ves' | 'irregular' | 'same'

/** from — единственное; stem — общая часть; end — что стало в мн. ч. */
interface Pair {
  from: string
  stem: string
  end: string
}

interface Rule {
  id: RuleId
  badge: string
  when: string
  note?: string
  pairs: Pair[]
}

const p = (from: string, stem: string, end: string): Pair => ({ from, stem, end })

const RULES: Rule[] = [
  { id: 's', badge: '+s', when: 'почти всегда', pairs: [p('cat', 'cat', 's'), p('dog', 'dog', 's'), p('book', 'book', 's')] },
  {
    id: 'es',
    badge: '+es',
    when: 'после s, x, ch, sh и часто o',
    pairs: [p('box', 'box', 'es'), p('watch', 'watch', 'es'), p('tomato', 'tomato', 'es')],
  },
  {
    id: 'ies',
    badge: 'y → ies',
    when: 'согласная + y',
    note: 'гласная + y: просто +s (boy → boys)',
    pairs: [p('city', 'cit', 'ies'), p('baby', 'bab', 'ies')],
  },
  { id: 'ves', badge: 'f → ves', when: 'часто f / fe на конце', note: 'но: roof → roofs, chef → chefs', pairs: [p('knife', 'kni', 'ves'), p('leaf', 'lea', 'ves'), p('wolf', 'wol', 'ves')] },
  {
    id: 'irregular',
    badge: 'особые',
    when: 'учить как есть',
    pairs: [p('man', '', 'men'), p('child', '', 'children'), p('mouse', '', 'mice'), p('foot', '', 'feet')],
  },
  { id: 'same', badge: '= то же', when: 'не меняются', pairs: [p('sheep', 'sheep', ''), p('fish', 'fish', '')] },
]

const isRule = (f?: string): f is RuleId => RULES.some((r) => r.id === f)

export function PluralRules({ focus, compact, quiz }: VisualProps) {
  const sel = isRule(focus) ? focus : undefined
  let rows = RULES
  if (compact) {
    const i = Math.max(0, RULES.findIndex((r) => r.id === sel))
    const j = i === RULES.length - 1 ? i - 1 : i + 1
    rows = RULES.filter((_, k) => k === i || k === j)
  }

  return (
    <div className="vs vst-plural" data-pos="noun" data-compact={compact || undefined}>
      {rows.map((r) => {
        const on = r.id === sel
        const dim = Boolean(sel) && !on
        const hide = quiz && (!sel || on)
        const pairs = compact ? r.pairs.slice(0, 2) : r.pairs
        return (
          <div key={r.id} className="vst-rule" data-on={on || undefined} data-dim={dim || undefined}>
            <span className="vst-badge">{hide ? <Hidden /> : r.badge}</span>
            <div className="vst-rule-body">
              <span className="vst-when-line">
                <Glyph pos="noun" size={14} />
                <span className="vst-when">{r.when}</span>
              </span>
              <ul className="vst-pairs">
                {pairs.map((x) => (
                  <li key={x.from} className="vst-pair">
                    <span>{x.from}</span>
                    <i aria-label="во мн. ч.">→</i>
                    {hide ? (
                      <Hidden />
                    ) : (
                      <span>
                        {x.stem}
                        <b>{x.end}</b>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              {r.note && !compact && !hide && <small className="vst-note">{r.note}</small>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
