import type { VisualProps } from '../types'
import { ASPECTS, ASPECT_NAME, TIMES, TIME_NAME, parseTense } from './model'
import type { Aspect, Time } from './model'
import { MiniCell } from './parts'

// Карта 12 времён: столбцы — момент, строки — аспект. В каждой ячейке мини-ось (тот же шаблон, что в timeline) и формула чипами.

export function TenseMap({ focus, compact, quiz }: VisualProps) {
  const { time, aspect } = parseTense(focus)
  const hasFocus = Boolean(time || aspect)
  const lit = (t: Time, a: Aspect) => (!time || t === time) && (!aspect || a === aspect)
  // quiz: подписи строк/столбцов и формулы соседей выдают ответ методом исключения — прячем все, остаются символы.
  const q = (hidden: boolean, text: string) => (quiz && hasFocus ? (hidden ? '?' : '') : text)
  // Шапки подсвечиваются только при фокусе на строку или столбец; у точной ячейки выделение одно — сама ячейка.
  const exactFocus = Boolean(time && aspect)

  const cell = (t: Time, a: Aspect, extra: { title?: string; name?: string; chips?: boolean } = {}) => {
    const on = hasFocus && lit(t, a)
    return (
      <MiniCell
        key={`${t}.${a}`}
        time={t}
        aspect={a}
        state={hasFocus ? (on ? 'on' : 'dim') : undefined}
        exact={Boolean(time && aspect && on)}
        hideFormula={quiz && on}
        {...extra}
        chips={!(quiz && hasFocus && !on) && extra.chips !== false}
      />
    )
  }

  if (compact) {
    // Мини-версия: ячейка focus и соседи по строке; для одного времени — его 4 аспекта.
    if (time && !aspect) {
      return (
        <div className="vt vt-compact" data-level="1" data-pos="verb">
          <span className="vt-rowlabel">
            <b>{q(true, TIME_NAME[time].en)}</b>
            {!quiz && <span>{TIME_NAME[time].ru}</span>}
          </span>
          <div className="vt-minis" data-cols={2}>
            {ASPECTS.map((a) => cell(time, a, { name: ASPECT_NAME[a].en, chips: false }))}
          </div>
        </div>
      )
    }
    const a = aspect ?? 'simple'
    return (
      <div className="vt vt-compact" data-level="1" data-pos="verb">
        <span className="vt-rowlabel">
          <b>{q(Boolean(aspect), ASPECT_NAME[a].en)}</b>
          {!(quiz && aspect) && <span>{ASPECT_NAME[a].ru}</span>}
        </span>
        <div className="vt-minis" data-cols={3}>
          {TIMES.map((t) => cell(t, a, { title: q(time === t, TIME_NAME[t].ru) }))}
        </div>
      </div>
    )
  }

  return (
    <div className="vt vt-map" data-level="1" data-pos="verb">
      <div className="vt-cols">
        {TIMES.map((t) => (
          <span key={t} className="vt-colhead" data-lit={(!exactFocus && time === t) || undefined}>
            <b>{q(time === t, TIME_NAME[t].en)}</b>
            <span>{q(time === t, TIME_NAME[t].ru)}</span>
          </span>
        ))}
      </div>
      {ASPECTS.map((a) => (
        <div key={a} className="vt-maprow">
          <span className="vt-rowlabel" data-lit={(!exactFocus && aspect === a) || undefined}>
            <b>{q(aspect === a, ASPECT_NAME[a].en)}</b>
            <span>{q(aspect === a, ASPECT_NAME[a].ru)}</span>
          </span>
          <div className="vt-cells">{TIMES.map((t) => cell(t, a))}</div>
        </div>
      ))}
    </div>
  )
}
