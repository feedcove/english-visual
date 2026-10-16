import type { ReactNode } from 'react'
import { Glyph } from '../../ui/Glyph'
import type { VisualProps } from '../types'
import { Sec, markOf, pickFocus } from './common'

// Три ступени высотой: positive — comparative — superlative. Ряды er / more / irregular / less и пары as … as, than.

const KEYS = ['er', 'more', 'irregular', 'less', 'as', 'than'] as const
type Key = (typeof KEYS)[number]

/** Форма слова: [основа, изменённая часть]. Изменённая часть — то, что делает ступень. */
type Form = [string, string]

interface Series {
  title: string
  hint: string
  rows: Form[][]
  /** Слово-основа для рядов more / less: показывается после приставки. */
  stem?: boolean
  down?: boolean
}

const SERIES: Partial<Record<Key, Series>> = {
  er: {
    title: 'Короткие',
    hint: '+er / +est',
    rows: [
      [['big', ''], ['big', 'ger'], ['big', 'gest']],
      [['happy', ''], ['happ', 'ier'], ['happ', 'iest']],
    ],
  },
  more: {
    title: 'Длинные',
    hint: 'more / most',
    rows: [[['beautiful', ''], ['', 'more '], ['', 'most ']]],
    stem: true,
  },
  irregular: {
    title: 'Неправильные',
    hint: 'свои формы',
    rows: [
      [['good', ''], ['better', ''], ['best', '']],
      [['bad', ''], ['worse', ''], ['worst', '']],
      [['far', ''], ['further', ''], ['furthest', '']],
    ],
  },
  less: {
    title: 'Меньше',
    hint: 'less / least',
    rows: [[['expensive', ''], ['', 'less '], ['', 'least ']]],
    stem: true,
    down: true,
  },
}

const HEAD = [
  { en: 'positive', ru: 'обычная' },
  { en: 'comparative', ru: '… than' },
  { en: 'superlative', ru: 'the …' },
]

// Высоты ступеней; у less / least столбики висят вниз от потолка.
const UP = [40, 52, 64]

function Cell({ form, stem, step, mask }: { form: Form; stem?: string; step: number; mask?: boolean }) {
  const [a, b] = form
  const text = stem ? (
    <>
      <b>{b}</b>
      {stem}
    </>
  ) : (
    <>
      {a}
      <b>{b}</b>
    </>
  )
  return (
    <span className="vx2-cs-cell" data-pos="adj" style={{ height: UP[step] ?? 40 }}>
      <Glyph pos="adj" size={12} />
      <span className="vx2-cs-t">{mask ? <span className="vx2-q">?</span> : text}</span>
    </span>
  )
}

function W({ pos, children }: { pos: 'adj' | 'conj'; children: ReactNode }) {
  return (
    <span className="vx2-cs-w" data-pos={pos}>
      <Glyph pos={pos} size={12} />
      {children}
    </span>
  )
}

export function ComparisonSteps({ focus, compact, quiz }: VisualProps) {
  const key = pickFocus(focus, KEYS)
  const has = Boolean(key)
  const mk = (k: Key) => markOf(has, key === k)
  const shown: Key[] = compact ? [key ?? 'er'] : [...KEYS]

  return (
    <div className="vx2" data-compact={compact || undefined}>
      {shown.some((k) => SERIES[k]) && (
        <div className="vx2-cs-head">
          {HEAD.map((h) => (
            <span key={h.en}>
              <b>{h.en}</b>
              {!compact && <span>{h.ru}</span>}
            </span>
          ))}
        </div>
      )}
      {shown.map((k) => {
        const masked = Boolean(quiz && (!has || key === k))
        const s = SERIES[k]
        if (s) {
          return (
            <Sec key={k} pos="adj" title={s.title} hint={s.hint} mark={mk(k)} bare={quiz}>
              {(compact ? s.rows.slice(0, 1) : s.rows).map((row) => (
                <div className="vx2-cs-row" key={row[0]?.[0]} data-down={s.down || undefined}>
                  {row.map((f, i) => (
                    <Cell key={i} form={f} stem={s.stem && i > 0 ? row[0]?.[0] : undefined} step={i} mask={masked && i > 0} />
                  ))}
                </div>
              ))}
            </Sec>
          )
        }
        // Пары: as … as — равные столбики, than — разные.
        const equal = k === 'as'
        const q = <span className="vx2-q">?</span>
        return (
          <Sec key={k} pos="conj" title={equal ? 'Одинаково' : 'Сравниваем'} hint={equal ? 'as … as' : 'сравнит. + than'} mark={mk(k)} bare={quiz}>
            <div className="vx2-cs-pair">
              <span className="vx2-cs-bar" data-pos="noun" style={{ height: equal ? 40 : 64 }}>
                <Glyph pos="noun" size={12} />
                Tom
              </span>
              <span className="vx2-cs-mid">
                {equal ? (
                  <>
                    <W pos="conj">{masked ? q : 'as'}</W>
                    <W pos="adj">tall</W>
                    <W pos="conj">{masked ? q : 'as'}</W>
                  </>
                ) : (
                  <>
                    <W pos="adj">taller</W>
                    <W pos="conj">{masked ? q : 'than'}</W>
                  </>
                )}
              </span>
              <span className="vx2-cs-bar" data-pos="noun" style={{ height: 40 }}>
                <Glyph pos="noun" size={12} />
                Ann
              </span>
            </div>
          </Sec>
        )
      })}
    </div>
  )
}
