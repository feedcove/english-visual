import { Glyph } from '../../ui/Glyph'
import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'
import { Pill, Sec, markOf, pickFocus } from './common'

// Три группы глаголов и ворота Continuous (be + -ing): состояние — закрыто, действие — открыто, двойные — по значению.

const KEYS = ['state', 'action', 'both'] as const
type Key = (typeof KEYS)[number]

const STATE = ['know', 'like', 'want', 'need', 'own', 'believe', 'seem']
const ACTION = ['work', 'read', 'cook']
const BOTH = ['think', 'have', 'see', 'taste']
const GAP = <span className="vx2-q">?</span>

function Gate({ open, label, hide }: { open: boolean; label: string; hide?: boolean }) {
  return (
    <span className="vx2-sa-gate" data-open={open || undefined}>
      <b aria-hidden="true">{hide ? '?' : open ? '✓' : '✕'}</b>
      {hide ? 'be + -ing?' : label}
    </span>
  )
}

export function StateAction({ focus, compact, quiz }: VisualProps) {
  const key = pickFocus(focus, KEYS)
  const has = Boolean(key)
  const mk = (k: Key) => markOf(has, key === k)
  const shown: Key[] = compact ? [key ?? 'state'] : [...KEYS]
  const q = (k: Key) => Boolean(quiz && (!has || key === k))

  return (
    <div className="vx2" data-compact={compact || undefined}>
      {shown.includes('state') && (
        <Sec pos="verb" title="Состояние" hint="не думаем о процессе" mark={mk('state')} bare={quiz || compact}>
          <div className="vx2-sa-chips">
            {(compact ? STATE.slice(0, 5) : STATE).map((w) => (
              <Pill key={w} pos="verb" text={w} />
            ))}
          </div>
          <div className="vx2-sa-ex">
            <Sentence source="I_P know_V her_P ." paint="all" />
            <Gate open={false} label="be + -ing нельзя" hide={q('state')} />
          </div>
        </Sec>
      )}

      {shown.includes('action') && (
        <Sec pos="verb" title="Действие" hint="можно показать процесс" mark={mk('action')} bare={quiz || compact}>
          <div className="vx2-sa-chips">
            {ACTION.map((w) => (
              <Pill key={w} pos="verb" text={w} />
            ))}
          </div>
          <div className="vx2-sa-ex">
            <Sentence source={q('action') ? 'I_P [am~working_V] now_R .' : 'I_P +’m_A working_V now_R .'} paint="all" gap={GAP} />
            <Gate open label="be + -ing можно" hide={q('action')} />
          </div>
        </Sec>
      )}

      {shown.includes('both') && (
        <Sec pos="verb" title="Двойные" hint="зависит от значения" mark={mk('both')} bare={quiz || compact}>
          <div className="vx2-sa-chips">
            {BOTH.map((w) => (
              <Pill key={w} pos="verb" text={w} />
            ))}
          </div>
          <div className="vx2-sa-two">
            <div className="vx2-sa-way">
              <span className="vx2-sa-way-h">
                <Glyph pos="verb" size={12} />
                {q('both') ? '?' : 'состояние'}
              </span>
              <Sentence source="I_P have_V a_D car_N" paint="all" />
              <Gate open={false} label="без -ing" hide={q('both')} />
            </div>
            <div className="vx2-sa-way">
              <span className="vx2-sa-way-h">
                <Glyph pos="verb" size={12} />
                {q('both') ? '?' : 'действие'}
              </span>
              <Sentence source={q('both') ? 'I_P [am~having_V] lunch_N' : 'I_P +’m_A having_V lunch_N'} paint="all" gap={GAP} />
              <Gate open label="можно -ing" hide={q('both')} />
            </div>
          </div>
        </Sec>
      )}
    </div>
  )
}
