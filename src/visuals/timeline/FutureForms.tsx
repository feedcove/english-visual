import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'
import { AspectSymbol, AxisBase, Formula, geo, nowX } from './parts'
import type { Tok } from './model'

// Три способа сказать о будущем на одной оси: will (решение сейчас), going to (план), Present Continuous (договорённость).

type Form = 'will' | 'going-to' | 'pres-cont'

const FORMS: { id: Form; name: string; toks: Tok[]; ex: string }[] = [
  { id: 'will', name: 'will', toks: [{ pos: 'aux', t: 'will' }, { pos: 'verb', t: 'V1' }], ex: 'I_P will_A help_V you_P .' },
  {
    id: 'going-to',
    name: 'going to',
    toks: [
      { pos: 'aux', t: 'am/is/are' },
      { pos: 'verb', t: 'going' },
      { pos: 'part', t: 'to' },
      { pos: 'verb', t: 'V1' },
    ],
    ex: 'I_P am_A going_V to_X buy_V a_D car_N .',
  },
  {
    id: 'pres-cont',
    name: 'Present Continuous',
    toks: [{ pos: 'aux', t: 'am/is/are' }, { pos: 'verb', t: 'V-ing' }],
    ex: 'I_P am_A meeting_V Tom_N at_I five_M .',
  },
]

const G = geo('lg', { y: 66, H: 102, tick: 12 })
const EVENT = 236

function Mechanism({ form, quiet }: { form: Form; quiet?: boolean }) {
  const y = G.y
  const now = nowX(G)
  if (form === 'will') {
    return (
      <g className="vt-sym" data-pos="aux">
        <rect x={96} y={6} width={148} height={32} rx={16} fill="none" stroke="currentColor" strokeWidth={2} />
        <circle cx={now - 4} cy={45} r={3.5} fill="currentColor" />
        <circle cx={now - 1} cy={51} r={2} fill="currentColor" />
        {!quiet && (
          <text className="vt-lbl vt-ink" x={170} y={27} textAnchor="middle">
            решение, прогноз
          </text>
        )}
      </g>
    )
  }
  if (form === 'going-to') {
    const sy = y - 10
    const ey = y - 10
    const cy = sy - 2 * 24
    return (
      <g className="vt-sym">
        <path d={`M${now} ${sy}Q${(now + EVENT) / 2} ${cy} ${EVENT - 3} ${ey - 5}`} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
        <path d={`M${EVENT} ${y - 9}l-7 -2.5l1 -8z`} fill="currentColor" />
        {!quiet && (
          <text className="vt-lbl vt-ink" x={(now + EVENT) / 2} y={22} textAnchor="middle">
            план, признаки
          </text>
        )}
      </g>
    )
  }
  return (
    <g className="vt-sym">
      <rect x={EVENT - 17} y={y - 52} width={34} height={36} rx={5} fill="none" stroke="currentColor" strokeWidth={2} />
      <path d={`M${EVENT - 17} ${y - 41}H${EVENT + 17}`} stroke="currentColor" strokeWidth={2} />
      {[-8, 0, 8].flatMap((dx) => [-35, -27].map((dy) => <rect key={`${dx}${dy}`} x={EVENT + dx - 2} y={y + dy} width={4} height={4} rx={1} fill="currentColor" />))}
      <path d={`M${EVENT} ${y - 16}V${y - 8}`} stroke="currentColor" strokeWidth={2} />
      {!quiet && (
        <text className="vt-lbl vt-ink" x={EVENT - 26} y={y - 28} textAnchor="end">
          договорились
        </text>
      )}
    </g>
  )
}

export function FutureForms({ focus, compact, quiz }: VisualProps) {
  const known = FORMS.find((f) => f.id === focus)
  // В quiz остальные строки выдали бы ответ методом исключения — показываем только спрашиваемую.
  const single = compact || (quiz && known)
  const forms = single ? [known ?? FORMS[0]!] : FORMS
  return (
    <div className="vt vt-ff" data-level="1" data-pos="verb">
      {forms.map((f) => {
        const on = Boolean(known && known.id === f.id)
        const dim = Boolean(known && !on && !single)
        const hide = Boolean(quiz && on)
        return (
          <section key={f.id} className="vt-plate" data-on={(!single && on) || undefined} data-dim={dim || undefined} data-exact={(!single && on) || undefined}>
            <div className="vt-plate-head">
              <span className="vt-title vt-title-sm">{hide ? '?' : f.name}</span>
              <Formula toks={f.toks} plus hidden={hide} />
            </div>
            <AxisBase g={G} mode="lg" label={`Будущее: ${hide ? 'форма' : f.name}`} dim={dim}>
              <Mechanism form={f.id} quiet={hide} />
              <AspectSymbol g={G} aspect="simple" m={EVENT} />
              <text className="vt-lbl" x={EVENT} y={G.y + 30} textAnchor="middle">
                событие
              </text>
            </AxisBase>
            {!compact && !hide && (
              <p className="vt-ex">
                <Sentence source={f.ex} paint="all" />
              </p>
            )}
          </section>
        )
      })}
    </div>
  )
}
