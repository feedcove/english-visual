import { Cascade } from '../../ui/Cascade'
import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'

const DEMO = {
  s: 'When_C Anna_N got_V home_R , the_D old_J man_N who_P lives_V next~door_R was_A waiting_V for_I her_P at_I the_D gate_N .',
  graph: '1>3 mark, 2>3 subj, 3>12 adv, 4>3 adv, 5>7 attr, 6>7 attr, 7>12 subj, 8>9 subj, 9>7 attr, 10>9 adv, 11>12 aux, 13>14 prep, 14>12 obj, 15>17 prep, 16>17 attr, 17>12 adv',
}

/** Одно длинное предложение двумя способами: строкой и лесенкой (visual-syntactic text formatting). */
export function CascadeDemo({ focus, compact, quiz }: VisualProps) {
  if (compact) return <Cascade source={DEMO.s} graph={DEMO.graph} labels={!quiz} paint="none" />
  return (
    <div className="vr" data-focus={focus}>
      <div className="vr-block" data-lit={focus === 'block' || !focus || undefined}>
        <span className="vr-label">Строкой</span>
        <p className="vr-text">
          <Sentence source={DEMO.s} paint="none" />
        </p>
      </div>
      <div className="vr-block" data-lit={focus === 'cascade' || !focus || undefined}>
        <span className="vr-label">Лесенкой: одна фраза — одна строка, отступ — к чему она относится</span>
        <Cascade source={DEMO.s} graph={DEMO.graph} labels={!quiz} paint="none" />
      </div>
    </div>
  )
}
