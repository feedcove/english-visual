import type { ReactNode } from 'react'
import { Glyph } from '../../ui/Glyph'
import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'
import { Sec, markOf, pickFocus } from './common'

// Карта частиц: у каждой — образ движения, значение и пара глаголов. Плюс блок «отделяемые».

const KEYS = ['up', 'down', 'out', 'off', 'on', 'in', 'back', 'over', 'away', 'separable'] as const
type Key = (typeof KEYS)[number]
type Particle = Exclude<Key, 'separable'>

const PARTICLES: Particle[] = ['up', 'down', 'out', 'off', 'on', 'in', 'back', 'over', 'away']

const INFO: Record<Particle, { ru: string; verbs: [string, string] }> = {
  up: { ru: 'вверх, до конца', verbs: ['give', 'pick'] },
  down: { ru: 'вниз, меньше', verbs: ['sit', 'turn'] },
  out: { ru: 'наружу, выяснить', verbs: ['find', 'run'] },
  off: { ru: 'прочь, выключить', verbs: ['take', 'turn'] },
  on: { ru: 'дальше, включить, надеть', verbs: ['carry', 'put'] },
  in: { ru: 'внутрь', verbs: ['fill', 'check'] },
  back: { ru: 'обратно', verbs: ['come', 'give'] },
  over: { ru: 'заново, через', verbs: ['start', 'think'] },
  away: { ru: 'прочь', verbs: ['run', 'throw'] },
}

// Образы движения: viewBox 32×32, штрих currentColor. Статика, без анимации.
const ICONS: Record<Particle, ReactNode> = {
  up: <path d="M16 28V6M8.5 13.5 16 6l7.5 7.5" />,
  down: <path d="M16 4v22M8.5 18.5 16 26l7.5-7.5" />,
  out: <path d="M17 6H6v20h11M13 16h16M24 11l5 5-5 5" />,
  in: <path d="M15 6h11v20H15M3 16h16M14 11l5 5-5 5" />,
  off: (
    <>
      <path d="M4 27h24" />
      <circle cx="9" cy="21" r="2.5" />
      <path d="M14 17 26 5M17 5h9v9" />
    </>
  ),
  on: (
    <>
      <path d="M3 27h26" />
      <circle cx="16" cy="19" r="7" />
    </>
  ),
  back: <path d="M25 28V16a8 8 0 0 0-8-8H7M12 3 7 8l5 5" />,
  over: <path d="M4 26a12 12 0 0 1 24 0M23 22l5 4 3-5" />,
  away: (
    <>
      <circle cx="5" cy="16" r="2.5" />
      <path d="M11 16h8" strokeDasharray="2 4" />
      <path d="M22 16h7M25 11l5 5-5 5" />
    </>
  ),
}

const SEPARABLE: { src: string; ok: boolean; key: string }[] = [
  { src: 'pick_V the~box_N up_R', ok: true, key: 'a' },
  { src: 'pick_V up_R the~box_N', ok: true, key: 'b' },
  { src: 'pick_V it_P up_R', ok: true, key: 'c' },
  { src: 'pick_V up_R it_P', ok: false, key: 'd' },
]

export function PhrasalParticles({ focus, compact, quiz }: VisualProps) {
  const key = pickFocus(focus, KEYS)
  const has = Boolean(key)
  const ask = (k: Key) => Boolean(quiz && (!has || key === k))
  const showTile = (p: Particle) => !compact || (key ?? 'up') === p
  const showSep = !compact || key === 'separable'
  const anyTile = !compact || (key !== 'separable')

  return (
    <div className="vx2" data-compact={compact || undefined}>
      {anyTile && (
        <div className="vx2-pp-grid" data-single={compact || undefined}>
          {PARTICLES.filter(showTile).map((p) => {
            const m = markOf(has, key === p)
            const info = INFO[p]
            const hide = ask(p)
            return (
              <div key={p} className="vx2-pp-tile" data-pos="adv" data-on={m === 'on' || undefined} data-dim={m === 'dim' || undefined}>
                <div className="vx2-pp-top">
                  <svg viewBox="0 0 32 32" className="vx2-pp-ico" aria-hidden="true">
                    {ICONS[p]}
                  </svg>
                  <span className="vx2-pp-word">
                    <Glyph pos="adv" size={13} />
                    {p}
                  </span>
                </div>
                <span className="vx2-pp-ru">{hide ? '?' : info.ru}</span>
                {!hide && (
                  <div className="vx2-pp-verbs">
                    {info.verbs.map((v) => (
                      <Sentence key={v} source={`${v}_V ${p}_R`} paint="all" />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {showSep && (
        <Sec pos="verb" title="Отделяемые" hint="местоимение — внутри" mark={markOf(has, key === 'separable')} bare={quiz}>
          <ul className="vx2-pp-sep">
            {SEPARABLE.map((r) => (
              <li key={r.key} data-ok={r.ok || undefined}>
                <b aria-hidden="true">{ask('separable') && !r.ok ? '?' : r.ok ? '✓' : '✕'}</b>
                <Sentence source={r.src} paint="all" />
              </li>
            ))}
          </ul>
        </Sec>
      )}
    </div>
  )
}
