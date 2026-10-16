import type { ReactNode } from 'react'
import { Arrow, Pill, markAttrs, markOf, pickFocus } from './common'
import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'

// Источник чувства (фильм) → человек. -ing — про то, что вызывает чувство; -ed — про того, кто чувствует.

const KEYS = ['ing', 'ed'] as const
type Key = (typeof KEYS)[number]

const PAIRS = [
  ['interesting', 'interested'],
  ['exciting', 'excited'],
  ['tiring', 'tired'],
  ['surprising', 'surprised'],
]

const SIDE: Record<Key, { pos: 'noun' | 'pron'; node: string; cap: string; adj: string; tag: string; src: string; capAdj: string }> = {
  ing: { pos: 'noun', node: 'film', cap: 'источник', adj: 'boring', tag: '-ing', src: 'The_D film_N is_V [boring_J]', capAdj: 'какой фильм' },
  ed: { pos: 'pron', node: 'I', cap: 'человек', adj: 'bored', tag: '-ed', src: 'I_P am_V [bored_J]', capAdj: 'что я чувствую' },
}

export function EdIng({ focus, compact, quiz }: VisualProps) {
  const key = pickFocus(focus, KEYS)
  const has = Boolean(key)

  const col = (k: Key): ReactNode => {
    const s = SIDE[k]
    const m = markOf(has, key === k)
    const hide = Boolean(quiz && (!has || key === k))
    return (
      <div className="vx2-ei-col" data-pos="adj" {...markAttrs(m)}>
        <Pill pos={s.pos} text={s.node} cap={compact ? undefined : s.cap} />
        <span className="vx2-ei-down" aria-hidden="true">
          ↓
        </span>
        <Pill pos="adj" text={s.adj} cap={quiz ? undefined : `${s.tag}: ${s.capAdj}`} mask={hide} />
        <p className="vx2-ei-ex">
          <Sentence source={s.src} paint="all" gap={hide ? <span className="vx2-q">?</span> : undefined} />
        </p>
        {!compact && (
          <ul className="vx2-ei-pairs">
            {PAIRS.map((p) => (
              <li key={p[0]}>
                <Pill pos="adj" text={hide ? <span className="vx2-q">?</span> : p[k === 'ing' ? 0 : 1]} />
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  return (
    <div className="vx2 vx2-ei" data-compact={compact || undefined}>
      {col('ing')}
      <div className="vx2-ei-mid">
        <Arrow label={quiz ? '' : 'вызывает'} />
      </div>
      {col('ed')}
    </div>
  )
}
