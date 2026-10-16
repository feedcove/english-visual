import { Glyph } from '../../ui/Glyph'
import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'
import { Hidden } from './Hidden'

// Две корзины: исчисляемые (отдельные фигурки) и неисчисляемые (масса в сосуде). Мост: порция делает массу счётной.

type Basket = 'count' | 'mass'
type Focus = Basket | 'piece'

interface Rule {
  label: string
  /** Разметка примера. ~ в начале — зачёркнуто (так не говорят). */
  ex: string
}

const BASKETS: Record<Basket, { ru: string; en: string; rules: Rule[] }> = {
  count: {
    ru: 'Исчисляемые',
    en: 'countable',
    rules: [
      { label: 'артикль', ex: 'a_D cat_N' },
      { label: 'мн. число', ex: 'cat{s}_N' },
      { label: 'сколько', ex: 'many_D cats_N' },
      { label: 'вопрос', ex: 'How many_D?' },
    ],
  },
  mass: {
    ru: 'Неисчисляемые',
    en: 'uncountable',
    rules: [
      { label: 'без a / an', ex: '~a_D water_N' },
      { label: 'без -s', ex: '~waters_N' },
      { label: 'сколько', ex: 'much_D water_N' },
      { label: 'вопрос', ex: 'How much_D?' },
    ],
  },
}

const BRIDGE = ['a {piece_N} of advice', 'a {cup_N} of tea', 'a {loaf_N} of bread']

const BASKET_IDS: Basket[] = ['count', 'mass']

const isFocus = (f?: string): f is Focus => f === 'count' || f === 'mass' || f === 'piece'

function Figure({ kind }: { kind: Basket }) {
  return kind === 'count' ? (
    <span className="vst-fig" aria-hidden="true">
      <Glyph pos="noun" size={22} />
      <Glyph pos="noun" size={22} />
      <Glyph pos="noun" size={22} />
    </span>
  ) : (
    <svg className="vst-vessel" viewBox="0 0 64 40" aria-hidden="true">
      <path className="vst-liquid" d="M10 17H54L51 36H13Z" />
      <path className="vst-cup" d="M7 4 13 36H51L57 4" />
    </svg>
  )
}

/** Правило-пример: зачёркнутое — так сказать нельзя. */
function Example({ rule, plain }: { rule: Rule; plain?: boolean }) {
  const bad = rule.ex.startsWith('~')
  const src = bad ? rule.ex.slice(1) : rule.ex
  // {s} в разметке — выделенное окончание: рисуем руками, Sentence слово целиком красит.
  const split = src.match(/^(\w+)\{(\w+)\}_N$/)
  return (
    <span className="vst-ex" data-bad={bad || undefined}>
      {split ? (
        <span className={plain ? 'w' : 'w w-pos'} data-pos="noun">
          {split[1]}
          <b>{split[2]}</b>
        </span>
      ) : (
        <Sentence source={src} paint={plain ? 'none' : 'all'} />
      )}
    </span>
  )
}

export function CountMass({ focus, compact, quiz }: VisualProps) {
  const f = isFocus(focus) ? focus : undefined
  const isBasket = f === 'count' || f === 'mass'
  const showBridge = !compact || f === 'piece'
  const baskets = compact && f === 'piece' ? [] : compact && isBasket ? [f] : BASKET_IDS

  return (
    <div className="vs vst-cm" data-pos="noun" data-compact={compact || undefined}>
      {baskets.length > 0 && (
        <div className="vst-baskets" data-one={baskets.length === 1 || undefined}>
          {baskets.map((id) => {
            const b = BASKETS[id]
            const on = f === id
            const dim = Boolean(f) && !on
            const hide = quiz && (on || !f)
            return (
              <section key={id} className="vst-basket" data-basket={id} data-on={on || undefined} data-dim={dim || undefined}>
                <header className="vst-basket-head">
                  <b>{hide ? <Hidden /> : b.ru}</b>
                  {!compact && <span>{hide ? '' : b.en}</span>}
                </header>
                <Figure kind={id} />
                <ul className="vst-rules">
                  {(compact ? b.rules.slice(0, baskets.length === 1 ? 3 : 2) : b.rules).map((r) => (
                    <li key={r.label}>
                      <span className="vst-rl">{r.label}</span>
                      {hide ? <Hidden /> : <Example rule={r} plain={dim} />}
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      )}
      {showBridge && (
        <div className="vst-bridge" data-on={f === 'piece' || undefined} data-dim={(Boolean(f) && f !== 'piece') || undefined}>
          <span className="vst-bridge-head">
            <b>Мост: порция</b>
            <span>неисчисляемое становится счётным</span>
          </span>
          <ul>
            {BRIDGE.map((s) => (
              <li key={s}>{quiz && f === 'piece' ? <Hidden /> : <Sentence source={s} paint={f && f !== 'piece' ? 'none' : 'target'} />}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
