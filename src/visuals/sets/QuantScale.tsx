import type { VisualProps } from '../types'
import { Hidden } from './Hidden'

// Шкала количества от 0 до «все» в две строки: исчисляемые и неисчисляемые. Столбец = ступень шкалы.

type Row = 'count' | 'mass'

interface Step {
  id: string
  /** Высота столбика, 0–100. */
  level: number
  count: string[]
  mass: string[]
  /** Знак отношения: − мало (почти нет), + немного (но есть). */
  sign?: '−' | '+'
}

const STEPS: Step[] = [
  { id: 'no', level: 0, count: ['no'], mass: ['no'] },
  { id: 'few', level: 22, count: ['few'], mass: ['little'], sign: '−' },
  { id: 'a-few', level: 36, count: ['a few'], mass: ['a little'], sign: '+' },
  { id: 'some', level: 52, count: ['some', 'any'], mass: ['some', 'any'] },
  { id: 'many', level: 70, count: ['many'], mass: ['much'] },
  { id: 'a-lot', level: 86, count: ['a lot of'], mass: ['a lot of'] },
  { id: 'all', level: 100, count: ['all'], mass: ['all'] },
]

const ROWS: Record<Row, { label: string; ex: string }> = {
  count: { label: 'исчисл.', ex: 'cats' },
  mass: { label: 'неисчисл.', ex: 'water' },
}

/** Ключ focus → ступень, строка (или обе) и слово внутри ячейки. */
function parseFocus(focus?: string): { step?: string; rows: Row[]; word?: string } {
  switch (focus) {
    case 'no':
    case 'a-lot':
    case 'all':
      return { step: focus, rows: ['count', 'mass'] }
    case 'some':
    case 'any':
      return { step: 'some', rows: ['count', 'mass'], word: focus }
    case 'few':
    case 'a-few':
    case 'many':
      return { step: focus, rows: ['count'] }
    case 'little':
      return { step: 'few', rows: ['mass'] }
    case 'a-little':
      return { step: 'a-few', rows: ['mass'] }
    case 'much':
      return { step: 'many', rows: ['mass'] }
    default:
      return { rows: [] }
  }
}

export function QuantScale({ focus, compact, quiz }: VisualProps) {
  const { step, rows: litRows, word } = parseFocus(focus)
  const hasFocus = Boolean(step)
  const at = Math.max(0, STEPS.findIndex((s) => s.id === step))
  const start = Math.max(0, Math.min(at - 1, STEPS.length - 3))
  const steps = compact && hasFocus ? STEPS.slice(start, start + 3) : STEPS
  const rows: Row[] = compact && hasFocus ? litRows : ['count', 'mass']

  return (
    <div className="vs vst-scale" data-pos="det" data-compact={compact || undefined} style={{ ['--n' as string]: steps.length }}>
      <div className="vst-bars" aria-hidden="true">
        {compact && <span />}
        {steps.map((s) => (
          <span key={s.id} className="vst-bar" data-on={(hasFocus && s.id === step) || undefined}>
            <i style={{ height: `${Math.max(s.level, 4)}%` }} />
          </span>
        ))}
      </div>
      {rows.map((r) => (
        <div key={r} className="vst-qrow" data-row={r}>
          <span className="vst-qlabel">{compact ? ROWS[r].ex : `${ROWS[r].label} (${ROWS[r].ex})`}</span>
          <div className="vst-qcells">
            {steps.map((s) => {
              const on = hasFocus && s.id === step && litRows.includes(r)
              const dim = hasFocus && !on
              const hide = quiz && (on || !hasFocus)
              const words = s[r]
              return (
                <span key={s.id} className="vst-qcell" data-on={on || undefined} data-dim={dim || undefined}>
                  {hide ? (
                    <Hidden />
                  ) : (
                    <>
                      {words.map((w) => (
                        <b key={w} data-pick={on && word && w !== word ? 'off' : undefined}>
                          {w}
                        </b>
                      ))}
                      {s.sign && <i className="vst-sign">{s.sign}</i>}
                    </>
                  )}
                </span>
              )
            })}
          </div>
        </div>
      ))}
      {!compact && (
        <p className="vst-signs">
          <span>
            <i className="vst-sign">−</i> мало, почти нет
          </span>
          <span>
            <i className="vst-sign">+</i> немного, но есть
          </span>
        </p>
      )}
    </div>
  )
}
