import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'
import { Pill, Sec, pickFocus } from './common'

// Две шкалы (уверенность, обязанность и совет) + умение и разрешение. Модальные — aux (кольцо).

const KEYS = ['must', 'have-to', 'should', 'can', 'could', 'may', 'might', 'cant', 'mustnt', 'dont-have-to'] as const
type Key = (typeof KEYS)[number]

interface Chip {
  key: Key
  text: string
}
interface Node {
  chips: Chip[]
  hint: string
}

const CERTAINTY: Node[] = [
  { chips: [{ key: 'must', text: 'must' }], hint: 'почти точно' },
  { chips: [{ key: 'should', text: 'should' }], hint: 'скорее да' },
  {
    chips: [
      { key: 'may', text: 'may' },
      { key: 'might', text: 'might' },
      { key: 'could', text: 'could' },
    ],
    hint: 'возможно',
  },
  { chips: [{ key: 'cant', text: 'can’t' }], hint: 'точно нет' },
]

const OBLIGATION: Node[] = [
  {
    chips: [
      { key: 'must', text: 'must' },
      { key: 'have-to', text: 'have to' },
    ],
    hint: 'надо',
  },
  { chips: [{ key: 'should', text: 'should' }], hint: 'совет' },
  { chips: [{ key: 'dont-have-to', text: 'don’t have to' }], hint: 'не обязательно' },
  { chips: [{ key: 'mustnt', text: 'mustn’t' }], hint: 'нельзя' },
]

const ABILITY: { key: Key; hint: string }[] = [
  { key: 'can', hint: 'умею, можно' },
  { key: 'could', hint: 'мог, вежливо' },
]

type ScaleId = 'cert' | 'oblig'

function Scale({ id, nodes, focus, quiz, compact }: { id: ScaleId; nodes: Node[]; focus?: Key; quiz?: boolean; compact?: boolean }) {
  const has = Boolean(focus)
  const inScale = nodes.some((n) => n.chips.some((c) => c.key === focus))
  const title = id === 'cert' ? 'Уверенность' : 'Обязанность и совет'
  const hint = id === 'cert' ? 'He must be tired' : 'You must go'
  return (
    // Подсвечено само слово на шкале; блок со словом остаётся обычным, остальные приглушены.
    <Sec pos="aux" title={title} hint={quiz ? undefined : hint} mark={has && !inScale ? 'dim' : undefined} bare={quiz || compact}>
      <div className="vx2-ms-scale">
        {nodes.map((n) => {
          const lit = n.chips.some((c) => c.key === focus)
          return (
            <div className="vx2-ms-node" key={n.hint} data-on={lit || undefined}>
              <div className="vx2-ms-chips">
                {(compact ? [n.chips.find((c) => c.key === focus) ?? n.chips[0]] : n.chips).map((c) =>
                  c && (
                  <Pill key={c.key} pos="aux" text={c.text} mark={has ? (c.key === focus ? 'on' : 'dim') : undefined} mask={Boolean(quiz && (!has || c.key === focus))} />
                  ),
                )}
              </div>
              <span className="vx2-ms-dot" aria-hidden="true" />
              <span className="vx2-ms-hint">{n.hint}</span>
            </div>
          )
        })}
      </div>
    </Sec>
  )
}

export function ModalScale({ focus, compact, quiz }: VisualProps) {
  const key = pickFocus(focus, KEYS)
  const has = Boolean(key)
  const inCert = CERTAINTY.some((n) => n.chips.some((c) => c.key === key))
  const inOblig = OBLIGATION.some((n) => n.chips.some((c) => c.key === key))
  const inAbility = key === 'can' || key === 'could'
  // Мини-версия: только шкала с подсвеченным словом (по умолчанию — уверенность).
  const showCert = !compact || inCert || !has
  const showOblig = !compact || inOblig
  const showAbility = !compact || key === 'can'

  return (
    <div className="vx2" data-compact={compact || undefined}>
      {showCert && <Scale id="cert" nodes={CERTAINTY} focus={key} quiz={quiz} compact={compact} />}
      {showOblig && <Scale id="oblig" nodes={OBLIGATION} focus={key} quiz={quiz} compact={compact} />}
      {showAbility && (
        <Sec pos="aux" title="Умение и разрешение" mark={has && !inAbility ? 'dim' : undefined} bare={quiz}>
          <div className="vx2-ms-abil">
            {ABILITY.map((a) => (
              <div key={a.key} className="vx2-ms-ab">
                <Pill pos="aux" text={a.key} mark={has ? (a.key === key ? 'on' : 'dim') : undefined} mask={Boolean(quiz && (!has || a.key === key))} />
                <span className="vx2-ms-hint">{a.hint}</span>
              </div>
            ))}
          </div>
        </Sec>
      )}
      {!compact && (
        <p className="vx2-ms-rule" data-dim={has || undefined}>
          <Sentence source="must_A go_V" paint="all" />
          <span>после must, can, should — глагол без to</span>
        </p>
      )}
    </div>
  )
}
