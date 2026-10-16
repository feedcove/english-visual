import type { Pos } from '../../content/types'
import { Glyph } from '../../ui/Glyph'
import type { VisualProps } from '../types'
import { AspectSymbol, AxisBase, QTok, Token, geo, nowX } from './parts'
import type { State } from './parts'

// Две оси друг над другом: Past Simple — событие в закрытом отрезке прошлого, Present Perfect — событие до NOW с результатом сейчас.
// Focus: ps / pp — блок; markers-ps / markers-pp — слова-маркеры блока; since / for — маркер на оси Present Perfect.

type Block = 'ps' | 'pp'
type Chip = { pos: Pos; w: string; key?: string }

const MARKERS: Record<Block, Chip[]> = {
  ps: [
    { pos: 'adv', w: 'yesterday' },
    { pos: 'adv', w: 'ago' },
    { pos: 'adv', w: 'last~week' },
    { pos: 'prep', w: 'in~2019' },
  ],
  pp: [
    { pos: 'adv', w: 'ever' },
    { pos: 'adv', w: 'never' },
    { pos: 'adv', w: 'just' },
    { pos: 'adv', w: 'already' },
    { pos: 'adv', w: 'yet' },
    { pos: 'prep', w: 'since', key: 'since' },
    { pos: 'prep', w: 'for', key: 'for' },
  ],
}

const TITLE: Record<Block, { en: string; ru: string }> = {
  ps: { en: 'Past Simple', ru: 'закрытый отрезок прошлого' },
  pp: { en: 'Present Perfect', ru: 'важен результат сейчас' },
}

interface Plan {
  /** Блок, чьё имя и маркеры скрывает quiz. */
  answer?: Block
  state: Record<Block, State>
  /** Маркеры какого блока подсвечены целиком. */
  chips?: Block
  /** Подсвеченное слово-маркер (since / for). */
  word?: string
  /** Режим оси Present Perfect. */
  pp: 'perf' | 'since' | 'for'
}

function plan(focus?: string): Plan {
  switch (focus) {
    case 'ps':
      return { answer: 'ps', state: { ps: 'on', pp: 'dim' }, pp: 'perf' }
    case 'pp':
      return { answer: 'pp', state: { ps: 'dim', pp: 'on' }, pp: 'perf' }
    case 'markers-ps':
      return { answer: 'ps', state: { ps: undefined, pp: 'dim' }, chips: 'ps', pp: 'perf' }
    case 'markers-pp':
      return { answer: 'pp', state: { ps: 'dim', pp: undefined }, chips: 'pp', pp: 'perf' }
    case 'since':
      return { answer: 'pp', state: { ps: 'dim', pp: undefined }, word: 'since', pp: 'since' }
    case 'for':
      return { answer: 'pp', state: { ps: 'dim', pp: undefined }, word: 'for', pp: 'for' }
    default:
      return { state: { ps: undefined, pp: undefined }, pp: 'perf' }
  }
}

const G = geo('lg', { y: 64, H: 104 })

function PsAxis({ dim, quiet }: { dim?: boolean; quiet?: boolean }) {
  const y = G.y
  const e = 100
  return (
    <AxisBase g={G} mode="lg" label="Past Simple: событие внутри закрытого отрезка прошлого, с NOW не связано" dim={dim}>
      <rect className="vt-span" x={52} y={y - 18} width={96} height={36} rx={10} />
      {!quiet && (
        <text className="vt-lbl" x={e} y={y - 28} textAnchor="middle">
          закрытый период
        </text>
      )}
      <AspectSymbol g={G} aspect="simple" m={e} />
      <text className="vt-lbl" x={e} y={y + 36} textAnchor="middle">
        событие
      </text>
      {!quiet && (
        <text className="vt-lbl vt-faint" x={nowX(G) + 10} y={y - 20}>
          с NOW не связано
        </text>
      )}
    </AxisBase>
  )
}

function PpAxis({ mode, dim, quiet }: { mode: Plan['pp']; dim?: boolean; quiet?: boolean }) {
  const y = G.y
  const now = nowX(G)
  const start = 84
  return (
    <AxisBase g={G} mode="lg" label="Present Perfect: событие где-то до NOW, результат виден сейчас" dim={dim}>
      {mode === 'perf' ? (
        <>
          <AspectSymbol g={G} aspect="perf" m={now} />
          <text className="vt-lbl" x={now - 34} y={y + 36} textAnchor="end">
            событие
          </text>
          {!quiet && (
            <>
              <text className="vt-lbl vt-faint" x={12} y={y - 24}>
                где-то до NOW
              </text>
              <text className="vt-lbl" x={now + 10} y={y - 20}>
                результат сейчас
              </text>
            </>
          )}
        </>
      ) : (
        <>
          {/* Present Perfect + since/for: состояние длится до NOW. Сплошной отрезок, а не волна — волна значит Continuous. */}
          <path className="vt-sym" d={`M${start} ${y}H${now}`} stroke="currentColor" strokeWidth={G.r} strokeLinecap="round" fill="none" />
          <g data-pos="prep" className="vt-dim-line">
            {mode === 'since' ? (
              <>
                <circle cx={start} cy={y - 28} r={4} fill="var(--pc)" />
                <path d={`M${start} ${y - 28}H${now - 8}`} stroke="var(--pc)" strokeWidth={2} fill="none" />
                <path d={`M${now} ${y - 28}l-8 -4v8z`} fill="var(--pc)" />
              </>
            ) : (
              <path d={`M${start} ${y - 20}v-8H${now}v8`} stroke="var(--pc)" strokeWidth={2} fill="none" strokeLinejoin="round" />
            )}
            {!quiet && (
              <>
                <g transform={`translate(${start} ${y - 52})`}>
                  <Glyph pos="prep" size={14} />
                </g>
                <text className="vt-lbl vt-pt" x={start + 18} y={y - 40}>
                  {mode === 'since' ? 'since 2019' : 'for 3 years'}
                  <tspan className="vt-faint"> {mode === 'since' ? '· точка' : '· длина'}</tspan>
                </text>
              </>
            )}
          </g>
          {!quiet && (
            <text className="vt-lbl" x={now + 10} y={y - 20}>
              до сих пор
            </text>
          )}
        </>
      )}
    </AxisBase>
  )
}

export function PpVsPs({ focus, compact, quiz }: VisualProps) {
  const p = plan(focus)
  // В quiz второй блок выдал бы ответ методом исключения — показываем только спрашиваемый.
  const blocks: Block[] = compact || (quiz && p.answer) ? [p.answer ?? 'pp'] : ['ps', 'pp']

  return (
    <div className="vt vt-pp" data-level="1" data-pos="verb" data-compact={compact || undefined}>
      {blocks.map((b) => {
        const hide = Boolean(quiz && p.answer === b)
        const state = blocks.length === 1 ? undefined : p.state[b]
        return (
          <section key={b} className="vt-plate" data-on={state === 'on' || undefined} data-dim={state === 'dim' || undefined}>
            <div className="vt-plate-head">
              <span className="vt-title vt-title-sm">{hide ? '?' : TITLE[b].en}</span>
              {!hide && <span className="vt-sub">{TITLE[b].ru}</span>}
            </div>
            {b === 'ps' ? <PsAxis quiet={hide} /> : <PpAxis mode={p.pp} quiet={hide} />}
            <div className="vt-markers" data-on={p.chips === b || undefined}>
              <span className="vt-markers-label">маркеры</span>
              {hide ? (
                <QTok />
              ) : (
                MARKERS[b].map((c) => (
                  <Token key={c.w} pos={c.pos} t={c.w} hot={Boolean(p.word && c.key === p.word)} />
                ))
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}
