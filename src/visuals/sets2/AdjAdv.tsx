import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'
import { Arrow, Pill, Sec, markOf, pickFocus } from './common'

// Прилагательное ◆ цепляется к существительному, наречие • — к глаголу. Блоки: adj, linking, adv, ly, irregular.

const KEYS = ['adj', 'linking', 'adv', 'ly', 'irregular'] as const

const IRREGULAR = [
  { adj: 'good', adv: 'well', mid: '≠', ru: 'хорошо' },
  { adj: 'fast', adv: 'fast', mid: '=', ru: 'быстро' },
  { adj: 'hard', adv: 'hard', mid: '=', ru: 'усердно' },
  { adj: 'late', adv: 'late', mid: '=', ru: 'поздно' },
]

export function AdjAdv({ focus, compact, quiz }: VisualProps) {
  const key = pickFocus(focus, KEYS)
  const has = Boolean(key)
  const cap = (s: string) => (quiz ? undefined : s)
  const lab = (s: string) => (quiz ? '' : s)
  const mk = (k: (typeof KEYS)[number]) => markOf(has, key === k)
  // Мини-версия: только блок из focus (по умолчанию — прилагательное).
  const show = (k: (typeof KEYS)[number]) => !compact || (key ?? 'adj') === k
  const bare = quiz
  const ask = (k: (typeof KEYS)[number]) => Boolean(quiz && (!has || key === k))

  return (
    <div className="vx2" data-compact={compact || undefined}>
      {show('adj') && (
        <Sec pos="adj" title="Прилагательное" hint="к существительному" mark={mk('adj')} bare={bare}>
          <div className="vx2-link">
            <Pill pos="adj" text="quick" cap={cap('прил.')} />
            <Arrow dir="left" label={lab('какой?')} />
            <Pill pos="noun" text="answer" cap={cap('сущ.')} />
          </div>
          {!compact && (
            <p className="vx2-ex">
              <Sentence source="a_D quick_J answer_N" paint="all" />
            </p>
          )}
        </Sec>
      )}

      {show('linking') && (
        <Sec pos="adj" title="После be / look / feel" hint="тоже прилагательное" mark={mk('linking')} bare={bare}>
          <div className="vx2-trio">
            <Pill pos="pron" text="she" cap={cap('мест.')} />
            <Pill pos="verb" text="looks" cap={cap('глаг.')} />
            <Pill pos="adj" text="happy" cap={cap('прил.')} />
          </div>
          <div className="vx2-brk" aria-hidden="true" />
          <p className="vx2-note">{quiz ? '' : 'описывает she, а не глагол'}</p>
          {!compact && (
            <p className="vx2-ex">
              <Sentence source="She_P looks_V happy_J ." paint="all" />
            </p>
          )}
        </Sec>
      )}

      {show('adv') && (
        <Sec pos="adv" title="Наречие" hint="к глаголу" mark={mk('adv')} bare={bare}>
          <div className="vx2-link">
            <Pill pos="verb" text="answer" cap={cap('глаг.')} />
            <Arrow label={lab('как?')} />
            <Pill pos="adv" text="quickly" cap={cap('нар.')} />
          </div>
          {!compact && (
            <p className="vx2-ex">
              <Sentence source="She_P answers_V quickly_R ." paint="all" />
            </p>
          )}
        </Sec>
      )}

      {show('ly') && (
        <Sec pos="adv" title="Из прилагательного" hint="+ly" mark={mk('ly')} bare={bare}>
          <div className="vx2-link">
            <Pill pos="adj" text="slow" cap={cap('прил.')} />
            <Arrow label={lab('+ly')} />
            <Pill pos="adv" text="slowly" cap={cap('нар.')} mask={ask('ly')} />
          </div>
          {!compact && (
            <div className="vx2-link">
              <Pill pos="adj" text="happy" />
              <Arrow label={lab('y → i + ly')} />
              <Pill pos="adv" text="happily" mask={ask('ly')} />
            </div>
          )}
        </Sec>
      )}

      {show('irregular') && (
        <Sec pos="adv" title="Исключения" hint="форма другая или та же" mark={mk('irregular')} bare={bare}>
          {(compact ? IRREGULAR.slice(0, 2) : IRREGULAR).map((r) => (
            <div className="vx2-irr" key={r.adj}>
              <Pill pos="adj" text={r.adj} />
              <span className="vx2-eq" aria-hidden="true">
                {ask('irregular') ? '→' : r.mid}
              </span>
              <Pill pos="adv" text={r.adv} mask={ask('irregular')} />
              <span className="vx2-ru">{quiz ? '' : r.ru}</span>
            </div>
          ))}
        </Sec>
      )}
    </div>
  )
}
