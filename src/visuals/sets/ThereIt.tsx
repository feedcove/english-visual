import { Glyph } from '../../ui/Glyph'
import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'
import { Hidden } from './Hidden'

// Слева — there is / are: сообщаем, что что-то ЕСТЬ (новое). Справа — it is: о том, что уже знаем, погода, время, расстояние.

type Side = 'there' | 'it'

interface Line {
  id: string
  tag: string
  ex: string
  /** Разметка для quiz по этой строке: пропуск на месте ответа. */
  quiz?: string
}

const SIDES: Record<Side, { head: string; role: string; pos: 'adv' | 'pron'; lines: Line[] }> = {
  there: {
    head: 'There is / are',
    role: 'есть, появилось — новое',
    pos: 'adv',
    lines: [
      { id: 'there-one', tag: 'один', ex: '[There_R] is a cat in the garden.' },
      { id: 'there-plural', tag: 'несколько', ex: '[There_R] are two cats here.', quiz: 'There [are_V] two cats here.' },
    ],
  },
  it: {
    head: 'It is',
    role: 'о том, что уже знаем',
    pos: 'pron',
    lines: [
      { id: 'it-known', tag: 'о знакомом', ex: '[It_P] is black.' },
      { id: 'it-weather', tag: 'погода', ex: '[It_P] is cold today.' },
      { id: 'it-time', tag: 'время', ex: '[It_P] is six o’clock.' },
      { id: 'it-dist', tag: 'расстояние', ex: '[It_P] is far from here.' },
    ],
  },
}

const BRIDGE = [
  { tag: 'новое', ex: 'There_R is_V a_D cat_N in_I the_D garden_N.', quiz: '[There_R] is_V a_D cat_N in_I the_D garden_N.' },
  { tag: 'уже знаем', ex: 'It_P is_V black_J.', quiz: '[It_P] is_V black_J.' },
]

const SIDE_IDS: Side[] = ['there', 'it']

type FocusKey = 'there' | 'it' | 'there-plural'
const isFocus = (f?: string): f is FocusKey => f === 'there' || f === 'it' || f === 'there-plural'

export function ThereIt({ focus, compact, quiz }: VisualProps) {
  const f = isFocus(focus) ? focus : undefined
  const sideOf = (id: Side) => (f === id || (f === 'there-plural' && id === 'there') ? (f === 'there-plural' ? 'part' : 'on') : f ? 'dim' : undefined)
  const sides = compact && f ? [f === 'it' ? 'it' : 'there'] : SIDE_IDS
  const hideAll = (id: Side) => quiz && (f === id || !f)
  const gap = <Hidden />

  return (
    <div className="vs vst-ti" data-compact={compact || undefined}>
      <div className="vst-ti-cols" data-one={sides.length === 1 || undefined}>
        {sides.map((id) => {
          const S = SIDES[id as Side]
          const st = sideOf(id as Side)
          const lines = compact ? (f === 'there-plural' ? S.lines.slice(1, 2) : S.lines.slice(0, 2)) : S.lines
          return (
            <section key={id} className="vst-side" data-pos={S.pos} data-on={st === 'on' || undefined} data-dim={st === 'dim' || undefined}>
              <header className="vst-side-head">
                <Glyph pos={S.pos} size={16} />
                <b>
                  {hideAll(id as Side) ? (
                    <Hidden />
                  ) : quiz && f === 'there-plural' && id === 'there' ? (
                    <>
                      There is / <Hidden />
                    </>
                  ) : (
                    S.head
                  )}
                </b>
              </header>
              {!compact && <p className="vst-role">{S.role}</p>}
              <ul>
                {lines.map((l) => {
                  const lit = f === 'there-plural' && l.id === 'there-plural'
                  const hideLine = hideAll(id as Side) || (quiz && lit)
                  return (
                    <li key={l.id} className="vst-line" data-on={lit || undefined}>
                      {!compact && <span className="vst-tag">{l.tag}</span>}
                      <Sentence source={quiz && lit && l.quiz ? l.quiz : l.ex} gap={hideLine ? gap : undefined} paint={st === 'dim' ? 'none' : 'target'} />
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>
      {!compact && (
        <div className="vst-bridge">
          {BRIDGE.map((b) => (
            <p key={b.tag}>
              <span className="vst-tag">{b.tag}</span>
              {/* в quiz мост выдал бы ответ — прячем there / it (для there-plural ответ — are, мост его не выдаёт) */}
              <Sentence source={quiz && f !== 'there-plural' ? b.quiz : b.ex} paint={f ? 'none' : 'all'} gap={quiz ? gap : undefined} />
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
