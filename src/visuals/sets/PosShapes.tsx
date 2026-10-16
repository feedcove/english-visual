import { FAMILIES, POS, POS_ORDER } from '../../content/pos'
import type { Family } from '../../content/pos'
import type { Pos } from '../../content/types'
import { Glyph } from '../../ui/Glyph'
import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'
import { Hidden } from './Hidden'

// Карта 11 частей речи: три семьи, у каждой — форма, название, вопрос и пример. Цвет всегда с формой (Glyph).

const EX: Record<Pos, { en: string; ru: string }> = {
  noun: { en: 'a {cat_N} sleeps', ru: '{кошка_N} спит' },
  pron: { en: '{she_P} sleeps', ru: '{она_P} спит' },
  det: { en: '{the_D} cat', ru: '{этот_D} кот' },
  num: { en: '{two_M} cats', ru: '{два_M} кота' },
  adj: { en: 'a {big_J} cat', ru: '{большой_J} кот' },
  verb: { en: 'a cat {sleeps_V}', ru: 'кошка {спит_V}' },
  aux: { en: 'she {can_A} swim', ru: 'она {может_A} плавать' },
  adv: { en: 'she runs {fast_R}', ru: 'она бежит {быстро_R}' },
  prep: { en: 'a cat {on_I} a sofa', ru: 'кот {на_I} диване' },
  conj: { en: 'tea {and_C} milk', ru: 'чай {и_C} молоко' },
  part: { en: 'she does {not_X} sleep', ru: 'она {не_X} спит' },
}

const FAMILY_ORDER: Family[] = ['things', 'actions', 'links']

const inFamily = (f: Family) => POS_ORDER.filter((p) => POS[p].family === f)

function parseFocus(focus?: string): { pos?: Pos; ru: boolean; questions: boolean } {
  const pos = POS_ORDER.find((p) => p === focus)
  return { pos, ru: focus === 'ru', questions: focus === 'questions' }
}

/** Короткий вопрос — до двоеточия; полный школьный — как в справочнике. */
const shortQ = (p: Pos) => POS[p].q.split(':')[0]

export function PosShapes({ focus, compact, quiz }: VisualProps) {
  const { pos, ru, questions } = parseFocus(focus)
  const lang = ru ? 'ru' : 'en'

  if (compact) return <Mini pos={pos} ru={ru} quiz={quiz} />

  return (
    <div className="vs vst-pos-map" data-mode={ru ? 'ru' : questions ? 'questions' : undefined}>
      {FAMILY_ORDER.map((f) => (
        <section key={f} className="vst-fam" aria-label={FAMILIES[f].ru}>
          <h3 className="vst-fam-head">
            <b>{FAMILIES[f].ru}</b>
            <span>{FAMILIES[f].hint}</span>
          </h3>
          <ul className="vst-pos-list">
            {inFamily(f).map((p) => {
              const on = p === pos
              const dim = Boolean(pos) && !on
              const hide = quiz && (!pos || on)
              const [main, sub] = ru ? [POS[p].ru, POS[p].en] : [POS[p].en, POS[p].ru]
              return (
                <li key={p} className="vst-pos" data-pos={p} data-on={on || undefined} data-dim={dim || undefined}>
                  <Glyph pos={p} size={20} />
                  <div className="vst-pos-body">
                    {hide ? (
                      <div className="vst-pos-name">
                        <Hidden />
                      </div>
                    ) : (
                      <div className="vst-pos-name">
                        <b>{main}</b>
                        <span>{sub}</span>
                      </div>
                    )}
                    <div className="vst-pos-line">
                      {!hide && <span className="vst-pos-q">{ru ? POS[p].q : shortQ(p)}</span>}
                      <span className="vst-pos-ex">
                        <Sentence source={EX[p][lang]} lang={lang} paint={dim ? 'none' : 'target'} />
                      </span>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}

/** Мини-версия: полоска семьи с фигурами и подробности одной части речи. */
function Mini({ pos, ru, quiz }: { pos?: Pos; ru: boolean; quiz?: boolean }) {
  const lang = ru ? 'ru' : 'en'
  const families = pos ? [POS[pos].family] : FAMILY_ORDER
  return (
    <div className="vs vst-pos-mini" data-all={!pos || undefined}>
      {families.map((f) => (
        <div key={f} className="vst-strip">
          <span className="vst-strip-name">{FAMILIES[f].ru}</span>
          {inFamily(f).map((p) => {
            const on = p === pos
            return (
              <span key={p} className="vst-chip" data-pos={p} data-on={on || undefined} data-dim={(Boolean(pos) && !on) || undefined}>
                <Glyph pos={p} size={14} />
                {quiz && on ? <Hidden /> : ru ? POS[p].short : p}
              </span>
            )
          })}
        </div>
      ))}
      {pos && (
        <div className="vst-pos vst-pos-detail" data-pos={pos} data-on>
          <Glyph pos={pos} size={20} />
          <div className="vst-pos-body">
            <div className="vst-pos-name">{quiz ? <Hidden /> : <b>{ru ? POS[pos].ru : POS[pos].en}</b>}</div>
            <div className="vst-pos-line">
              {!quiz && <span className="vst-pos-q">{ru ? POS[pos].q : shortQ(pos)}</span>}
              <span className="vst-pos-ex">
                <Sentence source={EX[pos][lang]} lang={lang} />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
