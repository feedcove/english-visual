import type { ReactNode } from 'react'
import { Glyph } from '../../ui/Glyph'
import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'
import { Hidden } from './Hidden'

// Вертикальное дерево двух вопросов. Листья: THE / A·AN / ∅. Сбоку (под деревом на узком экране) — устойчивые случаи.
// Focus подсвечивает узел и путь до него от корня.

type NodeId = 'q1' | 'q2' | 'the' | 'a' | 'zero'
type EdgeId = 'e1L' | 'e1R' | 'e2L' | 'e2R'
type FocusKey = 'q-known' | 'q-single' | 'the' | 'a' | 'zero' | 'fixed'

const PATHS: Record<FocusKey, { target: NodeId | 'fixed'; nodes: NodeId[]; edges: EdgeId[] }> = {
  'q-known': { target: 'q1', nodes: [], edges: [] },
  'q-single': { target: 'q2', nodes: ['q1'], edges: ['e1R'] },
  the: { target: 'the', nodes: ['q1'], edges: ['e1L'] },
  a: { target: 'a', nodes: ['q1', 'q2'], edges: ['e1R', 'e2L'] },
  zero: { target: 'zero', nodes: ['q1', 'q2'], edges: ['e1R', 'e2R'] },
  fixed: { target: 'fixed', nodes: [], edges: [] },
}

const isFocusKey = (f?: string): f is FocusKey => Boolean(f) && Object.hasOwn(PATHS, f as string)

const EDGES: { id: EdgeId; d: string; label: string; lx: number; ly: number }[] = [
  { id: 'e1L', d: 'M156 76V97H70V116M66 110l4 6 4-6', label: 'да', lx: 112, ly: 91 },
  { id: 'e1R', d: 'M156 76V97H228V116M224 110l4 6 4-6', label: 'нет', lx: 194, ly: 91 },
  { id: 'e2L', d: 'M228 190V211H188V230M184 224l4 6 4-6', label: 'да', lx: 207, ly: 205 },
  { id: 'e2R', d: 'M228 190V211H270V230M266 224l4 6 4-6', label: 'нет', lx: 250, ly: 205 },
]

const FIXED = ['go to {school_N}', 'by {bus_N}', 'at {home_N}']

export function ArticleTree({ focus, compact, quiz }: VisualProps) {
  const key = isFocusKey(focus) ? focus : undefined
  const path = key ? PATHS[key] : undefined
  if (compact) return <Mini fk={key} quiz={quiz} />

  const state = (id: NodeId) => {
    if (!path) return undefined
    if (path.target === id) return 'on'
    return path.nodes.includes(id) ? 'path' : 'dim'
  }
  const edgeState = (id: EdgeId) => (!path ? undefined : path.edges.includes(id) ? 'path' : 'dim')
  const hideLeaf = (id: NodeId) => quiz && (!path || path.target === id)
  const hideQ = (id: NodeId) => quiz && path?.target === id
  const edges = [...EDGES].sort((a, b) => Number(edgeState(a.id) === 'path') - Number(edgeState(b.id) === 'path'))

  return (
    <div className="vs vst-at" data-pos="det">
      <svg className="vst-tree" viewBox="0 0 312 316" role="img" aria-label="Дерево артиклей: понятно ли, какой именно предмет, и исчисляем ли он в единственном числе">
        {edges.map((e) => (
          <g key={e.id} className="vst-edge" data-state={edgeState(e.id)}>
            <path d={e.d} />
            <text x={e.lx} y={e.ly} textAnchor="middle">
              {e.label}
            </text>
          </g>
        ))}

        <Node id="q1" x={36} y={4} w={240} h={72} state={state('q1')}>
          {hideQ('q1') ? (
            <text x={156} y={46} textAnchor="middle" className="vst-t-big">
              ?
            </text>
          ) : (
            <>
              <text x={156} y={26} textAnchor="middle" className="vst-t-head">
                1. Понятно, какой именно?
              </text>
              <text x={156} y={44} textAnchor="middle" className="vst-t-sub">
                уже упоминали, единственный
              </text>
              <text x={156} y={60} textAnchor="middle" className="vst-t-sub">
                или ясно из ситуации
              </text>
            </>
          )}
        </Node>

        <Node id="q2" x={148} y={118} w={160} h={72} state={state('q2')}>
          {hideQ('q2') ? (
            <text x={228} y={160} textAnchor="middle" className="vst-t-big">
              ?
            </text>
          ) : (
            <>
              <text x={228} y={140} textAnchor="middle" className="vst-t-head">
                2. Один предмет,
              </text>
              <text x={228} y={158} textAnchor="middle" className="vst-t-head">
                можно посчитать?
              </text>
              <text x={228} y={176} textAnchor="middle" className="vst-t-sub">
                не мн. ч., не масса
              </text>
            </>
          )}
        </Node>

        <Leaf id="the" x={8} y={118} w={124} h={84} state={state('the')} word="THE" ex="the sun" gloss="этот самый" hide={hideLeaf('the')} glyph />
        <Leaf id="a" x={150} y={230} w={76} h={84} state={state('a')} word="A / AN" ex="a cat" hide={hideLeaf('a')} glyph />
        <Leaf id="zero" x={232} y={230} w={76} h={84} state={state('zero')} word="∅" gloss="или some" ex="cats, milk" hide={hideLeaf('zero')} />
      </svg>

      <aside className="vst-fixed" data-on={path?.target === 'fixed' || undefined} data-dim={(path && path.target !== 'fixed') || undefined}>
        <h3>
          <span className="vst-zero">∅</span> Устойчивые случаи
        </h3>
        <p>место или способ как «действие» — без артикля</p>
        <ul>
          {FIXED.map((s) => (
            <li key={s}>
              <Sentence source={s} paint={path && path.target !== 'fixed' ? 'none' : 'target'} />
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}

function Node({ id, x, y, w, h, state, children }: { id: string; x: number; y: number; w: number; h: number; state?: string; children: ReactNode }) {
  return (
    <g className="vst-node" data-node={id} data-state={state}>
      <rect x={x} y={y} width={w} height={h} rx={14} />
      {children}
    </g>
  )
}

interface LeafProps {
  id: string
  x: number
  y: number
  w: number
  h: number
  state?: string
  word: string
  ex: string
  gloss?: string
  hide?: boolean
  glyph?: boolean
}

function Leaf({ id, x, y, w, h, state, word, ex, gloss, hide, glyph }: LeafProps) {
  const cx = x + w / 2
  return (
    <g className="vst-node vst-leaf" data-node={id} data-state={state} data-zero={!glyph || undefined}>
      <rect x={x} y={y} width={w} height={h} rx={14} />
      {glyph && (
        <g transform={`translate(${cx - 8} ${y + 8})`}>
          <Glyph pos="det" size={16} />
        </g>
      )}
      <text x={cx} y={y + 46} textAnchor="middle" className="vst-t-leaf">
        {hide ? '?' : word}
      </text>
      {!hide && gloss && (
        <text x={cx} y={y + 62} textAnchor="middle" className="vst-t-sub">
          {gloss}
        </text>
      )}
      {!hide && (
        <text x={cx} y={y + (gloss ? 77 : 66)} textAnchor="middle" className="vst-t-ex">
          {ex}
        </text>
      )}
    </g>
  )
}

const Q1 = 'Понятно, какой именно?'
const Q2 = 'Один, можно посчитать?'

/** Мини-версия: только путь до выбранного узла. */
function Mini({ fk, quiz }: { fk?: FocusKey; quiz?: boolean }) {
  const hideAns = (k: FocusKey) => quiz && fk === k
  const step = (label: string, on: boolean, hidden?: boolean) => (
    <span className="vst-step" data-on={on || undefined}>
      {hidden ? <Hidden /> : label}
    </span>
  )
  const arrow = (label: string) => (
    <span className="vst-arrow" aria-label={label}>
      <i>{label}</i>
      <svg viewBox="0 0 28 8" aria-hidden="true">
        <path d="M0 4h26M22 1l4 3-4 3" />
      </svg>
    </span>
  )
  const leaf = (k: 'the' | 'a' | 'zero') => {
    const word = k === 'the' ? 'THE' : k === 'a' ? 'A / AN' : '∅'
    return (
      <span className="vst-step vst-step-leaf" data-on={fk === k || undefined}>
        {hideAns(k) ? <Hidden /> : word}
      </span>
    )
  }

  let body: ReactNode
  if (fk === 'fixed') {
    body = (
      <div className="vst-fixed" data-on>
        <h3>
          <span className="vst-zero">∅</span> Устойчивые случаи
        </h3>
        <ul>
          {FIXED.map((s) => (
            <li key={s}>
              <Sentence source={s} />
            </li>
          ))}
        </ul>
      </div>
    )
  } else if (fk === 'the') {
    body = (
      <div className="vst-chain">
        {step(Q1, false)}
        {arrow('да')}
        {leaf('the')}
      </div>
    )
  } else if (fk === 'a' || fk === 'zero') {
    body = (
      <div className="vst-chain">
        {step(Q1, false)}
        {arrow('нет')}
        {step(Q2, false)}
        {arrow(fk === 'a' ? 'да' : 'нет')}
        {leaf(fk)}
      </div>
    )
  } else if (fk === 'q-single') {
    body = (
      <>
        <div className="vst-chain">
          {step(Q1, false)}
          {arrow('нет')}
          {step(Q2, true, quiz)}
        </div>
        <div className="vst-outs">
          <span>да → A / AN</span>
          <span>нет → ∅</span>
        </div>
      </>
    )
  } else if (fk === 'q-known') {
    body = (
      <>
        <div className="vst-chain">{step(Q1, true, quiz)}</div>
        <div className="vst-outs">
          <span>да → THE</span>
          <span>нет → вопрос 2</span>
        </div>
      </>
    )
  } else {
    body = (
      <div className="vst-chain">
        {step(Q1, false)}
        {arrow('да')}
        {leaf('the')}
        <span className="vst-or">нет → вопрос 2 → A / AN или ∅</span>
      </div>
    )
  }
  return (
    <div className="vs vst-at-mini" data-pos="det">
      {body}
    </div>
  )
}
