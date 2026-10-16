import type { ReactNode } from 'react'
import { Glyph } from '../../ui/Glyph'
import type { VisualProps } from '../types'
import { markOf, pickFocus } from './common'

// Связка между двумя блоками-предложениями. У каждого союза своя стрелка смысла.

const KEYS = ['and', 'but', 'or', 'so', 'because', 'although', 'when', 'if'] as const
type Key = (typeof KEYS)[number]

const LINKS: { id: Key; a: string; b: string; ru: string; icon: ReactNode }[] = [
  {
    id: 'and',
    a: 'It was cold',
    b: 'it was dark',
    ru: 'и, плюс',
    icon: <path d="M4 8h28M48 8h28M40 3.5v9M35.5 8h9" />,
  },
  {
    id: 'but',
    a: 'I tried',
    b: 'I failed',
    ru: 'против',
    icon: <path d="M4 8h27M26.5 3.5 32 8l-5.5 4.5M76 8H49M53.5 3.5 48 8l5.5 4.5" />,
  },
  {
    id: 'or',
    a: 'Stay here',
    b: 'come with us',
    ru: 'выбор',
    icon: <path d="M4 8h18l16-5h38M22 8l16 5h38" />,
  },
  {
    id: 'so',
    a: 'It rained',
    b: 'we stayed in',
    ru: 'следствие',
    icon: <path d="M4 8h68M66 3.5 72 8l-6 4.5" />,
  },
  {
    id: 'because',
    a: 'We stayed in',
    b: 'it rained',
    ru: 'причина',
    icon: <path d="M76 8H8M14 3.5 8 8l6 4.5" />,
  },
  {
    id: 'although',
    a: 'We went out',
    b: 'it rained',
    ru: 'вопреки',
    icon: <path d="M4 8h68M66 3.5 72 8l-6 4.5M38 0v16" />,
  },
  {
    id: 'when',
    a: 'We left',
    b: 'it rained',
    ru: 'время',
    icon: (
      <>
        <path d="M4 8h18.5M29.5 8h17M57.5 8h18.5" />
        <circle cx="26" cy="8" r="3.5" />
        <circle cx="54" cy="8" r="3.5" />
      </>
    ),
  },
  {
    id: 'if',
    a: 'We’ll stay in',
    b: 'it rains',
    ru: 'условие',
    icon: <path d="M76 8H8M14 3.5 8 8l6 4.5" strokeDasharray="4 4" />,
  },
]

export function ConjLinks({ focus, compact, quiz }: VisualProps) {
  const key = pickFocus(focus, KEYS)
  const has = Boolean(key)
  const rows = compact ? LINKS.filter((l) => l.id === (key ?? 'and')) : LINKS

  return (
    <div className="vx2 vx2-cj" data-compact={compact || undefined}>
      {rows.map((l) => {
        const m = markOf(has, key === l.id)
        const hide = Boolean(quiz && (!has || key === l.id))
        return (
          <div key={l.id} className="vx2-cj-row" data-pos="conj" data-on={m === 'on' || undefined} data-dim={m === 'dim' || undefined}>
            <span className="vx2-cj-box">{l.a}</span>
            <span className="vx2-cj-mid">
              <span className="vx2-cj-word">
                <Glyph pos="conj" size={13} />
                {hide ? <span className="vx2-q">?</span> : l.id}
              </span>
              <svg viewBox="0 0 80 16" className="vx2-cj-ico" aria-hidden="true">
                {l.icon}
              </svg>
              {!compact && <span className="vx2-cj-ru">{hide ? '' : l.ru}</span>}
            </span>
            <span className="vx2-cj-box">{l.b}</span>
          </div>
        )
      })}
    </div>
  )
}
