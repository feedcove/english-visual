import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'
import { MOTIONS, arrowD, endOf, pointAt, sample, startOf } from './motions'
import type { MotionId } from './motions'
import { BALL_R, BLANK, SceneCell, SceneSvg, withGap } from './shared'

// Предлоги движения: траектория шара относительно ориентира. По умолчанию статика:
// шар в начале, пунктирное кольцо в конце, стрелка между ними. «▶» проводит шар по пути (до ~1 с).

const BASIC: MotionId[] = ['to', 'into', 'onto']
// Длительность проезда = 2,5 × --dur-slow (токен кита, 400 мс → 1 с); до 1,2 с
const DURATION_K = 2.5

type Phase = 'idle' | 'play' | 'done'

const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

function readMs(el: Element, name: string, fallback: number): number {
  const raw = getComputedStyle(el).getPropertyValue(name).trim()
  const n = parseFloat(raw)
  if (Number.isNaN(n)) return fallback
  return raw.endsWith('ms') ? n : raw.endsWith('s') ? n * 1000 : n
}

function PlayIcon({ phase }: { phase: Phase }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      {phase === 'done' ? (
        <path d="M3.5 8a4.5 4.5 0 1 0 1.5-3.35M3.2 2.6v2.7h2.7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M5.2 3.4v9.2L12.6 8z" fill="currentColor" strokeLinejoin="round" />
      )}
    </svg>
  )
}

interface FigureProps {
  motion: (typeof MOTIONS)[number]
  lit: boolean
  dim: boolean
  hidden: boolean
  compact: boolean
  slim: boolean
  label: string
  extra?: ReactNode
  /** Меняется при смене схемы или режима: ролик сбрасывается в статику. */
  reset: string
}

function MotionCell({ motion, lit, dim, hidden, compact, slim, label, extra, reset }: FigureProps) {
  const track = useMemo(() => sample(motion.path), [motion])
  const start = startOf(track)
  const end = endOf(track)
  const [phase, setPhase] = useState<Phase>('idle')
  const [fade, setFade] = useState(0)
  const ballRef = useRef<SVGCircleElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const markerId = `vsp-arr-${useId().replace(/:/g, '')}`

  // Смена схемы или режима — снова статика
  useEffect(() => {
    setPhase('idle')
  }, [motion.id, reset])

  useEffect(() => {
    if (phase !== 'play') return
    const root = rootRef.current
    const ball = ballRef.current
    if (!root || !ball) return
    const total = Math.min(readMs(root, '--dur-slow', 400) * DURATION_K, 1200)
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const k = Math.min((now - t0) / total, 1)
      const [x, y] = pointAt(track, ease(k) * track.total)
      ball.setAttribute('cx', x.toFixed(2))
      ball.setAttribute('cy', y.toFixed(2))
      if (k < 1) raf = requestAnimationFrame(tick)
      else setPhase('done')
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase, track])

  const onPlay = () => {
    const root = rootRef.current
    // «Уменьшить движение» (--m-move: 0): шар не едет, а проявляется в конце (и снова в начале)
    const still = root ? getComputedStyle(root).getPropertyValue('--m-move').trim() === '0' : false
    if (still) {
      setFade((n) => n + 1)
      setPhase((p) => (p === 'done' ? 'idle' : 'done'))
    } else if (phase !== 'play') {
      setPhase('play')
    }
  }

  const at = phase === 'done' ? end : start
  const tip = Math.max(track.total - BALL_R - 1, BALL_R + 4)
  const action = (
    <button
      type="button"
      className="vsp-play k-ctl icon round k-down"
      data-variant="soft"
      data-size="sm"
      disabled={phase === 'play'}
      aria-label={hidden ? 'Показать движение' : `Показать движение: ${motion.name}`}
      onClick={onPlay}
    >
      <PlayIcon phase={phase} />
    </button>
  )

  return (
    <div ref={rootRef} className="vsp-fig">
      <SceneCell name={motion.name} ru={motion.ru} lit={lit} dim={dim} hidden={hidden} compact={compact} slim={slim} action={action} extra={extra}>
        <SceneSvg label={label} dim={dim}>
          <defs>
            <marker id={markerId} viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto">
              <path className="vsp-tip" d="M1 1.2 9 5 1 8.8z" />
            </marker>
          </defs>
          {motion.lm}
          {motion.note}
          <circle className="vsp-ghost" cx={end[0]} cy={end[1]} r={BALL_R} />
          <path className="vsp-arrow" d={arrowD(track, BALL_R + 3, tip)} markerEnd={`url(#${markerId})`} />
          <circle
            key={fade}
            ref={ballRef}
            className={fade > 0 ? 'vsp-ball vsp-fadein' : 'vsp-ball'}
            cx={at[0]}
            cy={at[1]}
            r={BALL_R}
          />
        </SceneSvg>
      </SceneCell>
    </div>
  )
}

export function PrepMotion({ focus, compact, quiz }: VisualProps) {
  const picked = MOTIONS.find((m) => m.id === focus)
  const list = compact ? (picked ? [picked] : MOTIONS.filter((m) => BASIC.includes(m.id))) : MOTIONS
  const single = compact && list.length === 1
  const mode = `${compact ? 'c' : 'f'}${quiz ? 'q' : ''}${focus ?? ''}`

  return (
    <div className="vs" data-pos="prep" data-compact={compact || undefined}>
      <div className="vsp-grid" data-n={compact ? list.length : undefined} data-wide={compact ? undefined : 4}>
        {list.map((m) => {
          const lit = Boolean(picked) && m.id === picked?.id
          const dim = Boolean(picked) && !lit
          const hidden = Boolean(quiz) // все названия: иначе ответ угадывается исключением
          return (
            <MotionCell
              key={m.id}
              motion={m}
              reset={mode}
              lit={lit}
              dim={dim}
              hidden={hidden}
              compact={Boolean(single)}
              slim={Boolean(compact) && !single}
              label={hidden ? 'Траектория шара: подберите предлог движения' : `${m.name}: ${m.ru}`}
              extra={single ? <Sentence source={hidden ? withGap(m.ex) : m.ex} paint="all" gap={BLANK} className="vsp-ex" /> : undefined}
            />
          )
        })}
      </div>
    </div>
  )
}
