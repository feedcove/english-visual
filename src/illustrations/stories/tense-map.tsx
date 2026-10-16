import { Check, Cross, Frame, Label, Scene } from '../kit'
import type { TopicStories } from '../types'

// Карта времён: столбец = когда (past / now / future), строка = как выглядит действие (точка, волна, дуга, отрезок).
// Каждая ячейка — мини-ось с тем же символом аспекта, что в схеме timeline. Выделение — цветом глагола (aux).

const COLS = [
  { name: 'past', sub: 'was · had' },
  { name: 'present', sub: 'am · have' },
  { name: 'future', sub: 'will' },
]
const ROWS = [
  { name: 'Simple', sub: 'V' },
  { name: 'Continuous', sub: 'V-ing' },
  { name: 'Perfect', sub: 'V3' },
  { name: 'Perf. Cont.', sub: 'been V-ing' },
]
const COL_X = [122, 198, 274]
const ROW_Y = [60, 98, 136, 174]

/** Ячейка: ось, момент-отсчёт (черта) и символ аспекта. (cx, cy) — центр, k — масштаб. */
function Cell({ cx, cy, col, row, hl, k = 1 }: { cx: number; cy: number; col: number; row: number; hl?: boolean; k?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${k})`} className={hl ? 'st-sym st-hl' : 'st-sym'} data-pos={hl ? 'aux' : undefined}>
      <path d="M-31 0H31" className="st-axis" strokeWidth={1.5} />
      <path d="M0 -10V10" className={col === 1 ? 'st-now' : 'st-axis'} strokeWidth={col === 1 ? 2.5 : 2} strokeDasharray={col === 2 ? '3 3' : undefined} />
      {row === 0 && <circle r={4.5} className="st-sym-fill" />}
      {row === 1 && <path d="M-18 0q4.5 -7 9 0t9 0t9 0t9 0" className="st-sym-line" strokeWidth={2.25} />}
      {row === 2 && (
        <>
          <circle cx={-22} r={4} className="st-sym-fill" />
          <path d="M-22 -6Q-12 -22 -3 -8M-10.2 -11.7L-3 -8L-3.4 -16.1" className="st-sym-line" strokeWidth={2} />
        </>
      )}
      {row === 3 && <path d="M-26 0H-1" className="st-sym-span" strokeWidth={6} />}
    </g>
  )
}

function Grid({ col, row, cell }: { col?: number; row?: number; cell?: [number, number] }) {
  return (
    <g>
      {COLS.map((c, i) => (
        <g key={c.name}>
          <Label x={COL_X[i]!} y={20} size={13} weight={700} pos={col === i ? 'aux' : undefined}>
            {c.name}
          </Label>
          <Label x={COL_X[i]!} y={34} size={11} weight={500} pos={col === i ? 'aux' : undefined} muted={col !== i}>
            {c.sub}
          </Label>
        </g>
      ))}
      {ROWS.map((r, j) => (
        <g key={r.name}>
          <Label x={10} y={ROW_Y[j]! - 3} anchor="start" size={11} weight={700} pos={row === j ? 'aux' : undefined}>
            {r.name}
          </Label>
          <Label x={10} y={ROW_Y[j]! + 11} anchor="start" size={11} weight={500} pos={row === j ? 'aux' : undefined} muted={row !== j}>
            {r.sub}
          </Label>
        </g>
      ))}
      {ROWS.map((_, j) => COLS.map((_, i) => <Cell key={`${i}${j}`} cx={COL_X[i]!} cy={ROW_Y[j]!} col={i} row={j} hl={cell?.[0] === i && cell[1] === j} />))}
      {col !== undefined && <Frame x={COL_X[col]! - 37} y={6} w={74} h={188} pos="aux" />}
      {row !== undefined && <Frame x={6} y={ROW_Y[row]! - 20} w={308} h={40} pos="aux" />}
      {cell && <Frame x={COL_X[cell[0]]! - 37} y={ROW_Y[cell[1]]! - 20} w={74} h={40} pos="aux" />}
    </g>
  )
}

export default [
  {
    id: 'tense-map.read-the-map',
    title: 'Как читать карту времён: столбец, строка, ячейка',
    focus: ['past', 'present', 'future', 'simple', 'cont', 'perf', 'perfcont', 'past.perfcont', 'present.perfcont'],
    frames: [
      {
        scene: (
          <Scene ground={false} label="Карта 3 на 4; выделен столбец past: первое вспомогательное was или had говорит, что действие в прошлом">
            <Grid col={0} />
          </Scene>
        ),
        en: 'She_P {was_A} working_V here_R .',
        ru: 'Столбец — «когда». Первое вспомогательное сразу называет его: was, did, had — прошлое; am, is, do, have — сейчас; will — будущее.',
      },
      {
        scene: (
          <Scene ground={false} label="Та же карта; выделена строка Continuous: в каждой ячейке волна, а у глагола -ing">
            <Grid row={1} />
          </Scene>
        ),
        en: 'She_P was_A {working_V} here_R .',
        ru: 'Строка — «как выглядит действие». Хвост глагола выбирает символ: V-ing — волна, процесс.',
      },
      {
        scene: (
          <Scene ground={false} label="Выделена одна ячейка на пересечении столбца past и строки Perfect Continuous: отрезок, дошедший до момента в прошлом">
            <Grid cell={[0, 3]} />
          </Scene>
        ),
        en: 'They_P had_A {been_A} waiting_V .',
        ru: 'Столбец past + строка «been V-ing» = ячейка: they had been waiting — ждали до какого-то момента в прошлом.',
      },
      {
        scene: (
          <Scene ground={false} label="Русское «жду уже час» ведёт в ячейку present simple и зачёркнуто; английскому нужна ячейка present perfect continuous">
            <Label x={160} y={28} size={17}>
              Я жду уже час.
            </Label>
            <Frame x={14} y={46} w={140} h={98} />
            <Frame x={166} y={46} w={140} h={98} pos="aux" />
            <Cell cx={84} cy={96} col={1} row={0} k={1.8} />
            <Cell cx={236} cy={96} col={1} row={3} k={1.8} hl />
            <Cross x={142} y={58} size={18} />
            <Check x={294} y={58} size={18} />
            <Label x={84} y={166} muted size={13}>
              wait (Simple)
            </Label>
            <Label x={236} y={166} pos="aux" size={13}>
              have been waiting
            </Label>
          </Scene>
        ),
        en: 'I_P have_A {been_A} waiting_V for_I an_D hour_N .',
        ru: 'По-русски «жду» — просто настоящее. В английском ожидание началось раньше и длится до NOW: нужна ячейка present + «been V-ing».',
      },
    ],
  },
] satisfies TopicStories
