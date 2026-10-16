import { Glyph } from '../../ui/Glyph'
import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'

// Present Simple по лицам: форма → окончание -s → правила → do / does. Цвет — глагол, лица — местоимения.

type RuleId = 's' | 'es' | 'ies' | 'have-has'

interface Example {
  base: string
  /** Начало результата, которое не меняется. */
  stem: string
  /** Меняющийся хвост результата — он подсвечен. */
  end: string
}

const RULES: { id: RuleId; chip: string; hint: string; examples: Example[] }[] = [
  { id: 's', chip: '+s', hint: 'почти всегда', examples: [{ base: 'work', stem: 'work', end: 's' }, { base: 'play', stem: 'play', end: 's' }] },
  { id: 'es', chip: '+es', hint: 'после s, x, z, ch, sh, o', examples: [{ base: 'go', stem: 'go', end: 'es' }, { base: 'watch', stem: 'watch', end: 'es' }] },
  { id: 'ies', chip: 'y → ies', hint: 'согласная + y', examples: [{ base: 'study', stem: 'stud', end: 'ies' }, { base: 'try', stem: 'tr', end: 'ies' }] },
  { id: 'have-has', chip: 'have', hint: 'не «haves»', examples: [{ base: 'have', stem: 'h', end: 'as' }] },
]

const RULE_IDS: string[] = RULES.map((r) => r.id)

interface AuxCol {
  id: 'do' | 'does'
  aux: string
  persons: string
  q: string
  neg: string
  note: string
}

const AUX: AuxCol[] = [
  { id: 'do', aux: 'Do', persons: 'I you we they', q: 'Do_A you_P work_V?', neg: 'I_P don’t_A work_V.', note: 'глагол как есть' },
  { id: 'does', aux: 'Does', persons: 'he she it', q: 'Does_A she_P work_V?', neg: 'She_P doesn’t_A work_V.', note: 'после does — без -s' },
]

function Result({ ex, quiz, lit }: { ex: Example; quiz?: boolean; lit: boolean }) {
  return (
    <span className="vg-ex">
      {ex.base} → {quiz && lit ? <b className="vg-end">?</b> : <>{ex.stem}<b className="vg-end">{ex.end}</b></>}
    </span>
  )
}

export function VerbPerson({ focus, compact, quiz }: VisualProps) {
  const rule = focus && RULE_IDS.includes(focus) ? (focus as RuleId) : undefined
  const auxFocus = focus === 'do' || focus === 'does' ? focus : undefined
  const hasFocus = Boolean(focus)
  const base = focus === 'base'
  const third = focus === 's'

  // compact — только нужная часть; quiz с focus — тоже, иначе соседний блок (work → works) выдал бы ответ.
  const only = (compact || quiz) && hasFocus
  const showForms = !only || base || third
  const showRules = !only ? !compact : Boolean(rule)
  const showAux = !only ? !compact : Boolean(auxFocus)

  const dim = (lit: boolean) => (hasFocus && !lit) || undefined

  return (
    <div className="vg vg-vp" data-pos="verb" data-compact={compact || undefined}>
      {showForms && (
        <section className="vg-sec">
          {!compact && <h4 className="vg-sech">Форма глагола</h4>}
          <div className="vg-two">
            <div className="vg-box" data-on={base || undefined} data-exact={base || undefined} data-dim={dim(base)}>
              <span className="vg-who">
                <Glyph pos="pron" size={14} /> I · you · we · they
              </span>
              <span className="vg-big">
                <Glyph pos="verb" size={14} /> <span>{quiz && base ? '?' : 'work'}</span>
              </span>
            </div>
            <div className="vg-box" data-on={third || undefined} data-exact={third || undefined} data-dim={dim(third)}>
              <span className="vg-who">
                <Glyph pos="pron" size={14} /> he · she · it
              </span>
              <span className="vg-big">
                <Glyph pos="verb" size={14} /> <span>{quiz && third ? '?' : <>work<b className="vg-end">s</b></>}</span>
              </span>
            </div>
          </div>
        </section>
      )}

      {showRules && (
        <section className="vg-sec">
          {!compact && <h4 className="vg-sech">Как добавить -s</h4>}
          {RULES.filter((r) => !compact || r.id === rule).map((r) => {
            const lit = r.id === rule
            return (
              <div key={r.id} className="vg-rule" data-on={lit || undefined} data-exact={lit || undefined} data-dim={dim(lit)}>
                <span className="vg-chip">{quiz && lit ? '?' : r.chip}</span>
                <span className="vg-exs">
                  {r.examples.map((ex) => (
                    <Result key={ex.base} ex={ex} quiz={quiz} lit={lit} />
                  ))}
                  {!(quiz && lit) && <small>{r.hint}</small>}
                </span>
              </div>
            )
          })}
        </section>
      )}

      {showAux && (
        <section className="vg-sec">
          {!compact && <h4 className="vg-sech">Вопрос и отрицание</h4>}
          <div className="vg-two">
            {AUX.map((a) => {
              const lit = a.id === auxFocus
              const hide = quiz && lit
              const mark = (s: string) => (hide ? s.replace(/^(Do|Does)_A/, '[$1_A]').replace(/(don’t|doesn’t)_A/, '[$1_A]') : s)
              return (
                <div key={a.id} className="vg-box" data-on={lit || undefined} data-exact={lit || undefined} data-dim={dim(lit)}>
                  <span className="vg-who">
                    <Glyph pos="aux" size={14} /> {hide ? '?' : a.aux} · {a.persons}
                  </span>
                  <span className="vg-line">
                    <Sentence source={mark(a.q)} paint={lit || !hasFocus ? 'all' : 'none'} gap="?" />
                  </span>
                  <span className="vg-line">
                    <Sentence source={mark(a.neg)} paint={lit || !hasFocus ? 'all' : 'none'} gap="?" />
                  </span>
                  {!compact && <small className="vg-note">{a.note}</small>}
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
