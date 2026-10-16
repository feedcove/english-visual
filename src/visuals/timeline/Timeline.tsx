import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'
import { ASPECTS, ASPECT_NAME, EXAMPLE, FORMULA, TIMES, TIME_NAME, parseTense, tenseName } from './model'
import type { Aspect, Time } from './model'
import { AxisSvg, Formula, MiniCell } from './parts'

// Одна ось для всех времён. Focus: past.perf (одно время), past (4 аспекта в одном моменте), perf (один аспект в 3 моментах).

/** Словарь символов: четыре аспекта на оси того же момента, что и главная ось; текущий — обычный, остальные приглушены. */
function AspectTiles({ current, time = 'present' }: { current?: Aspect; time?: Time }) {
  return (
    <div className="vt-tiles">
      {ASPECTS.map((a) => (
        <div key={a} className="vt-tile" data-dim={(current && a !== current) || undefined}>
          <AxisSvg time={time} aspect={a} size="sm" />
          <span className="vt-tilename">
            <b>{ASPECT_NAME[a].en}</b>
            <span>{ASPECT_NAME[a].sym}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

export function Timeline({ focus, compact, quiz }: VisualProps) {
  const { time, aspect } = parseTense(focus)

  if (time && aspect) {
    if (compact) {
      return (
        <div className="vt vt-compact" data-level="1" data-pos="verb">
          {!quiz && (
            <div className="vt-line">
              <span className="vt-title vt-title-sm">{tenseName(time, aspect)}</span>
              <Formula toks={FORMULA[time][aspect]} plus mini />
            </div>
          )}
          <AxisSvg time={time} aspect={aspect} size="md" quiet={quiz} />
        </div>
      )
    }
    return (
      <div className="vt" data-level="1" data-pos="verb">
        <div className="vt-head">
          {quiz ? (
            <span className="vt-sub">Какое это время?</span>
          ) : (
            <>
              <span className="vt-title">{tenseName(time, aspect)}</span>
              <span className="vt-sub">
                {TIME_NAME[time].ru}, {ASPECT_NAME[aspect].ru}
              </span>
              <Formula toks={FORMULA[time][aspect]} plus />
            </>
          )}
        </div>
        <AxisSvg time={time} aspect={aspect} size="lg" quiet={quiz} />
        {!quiz && <AspectTiles current={aspect} time={time} />}
        {!quiz && (
          <p className="vt-ex">
            <Sentence source={EXAMPLE[time][aspect]} paint="all" />
          </p>
        )}
      </div>
    )
  }

  // Столбец (одно время, 4 аспекта) или строка (один аспект, 3 времени).
  if (time || aspect) {
    const title = time ? `${TIME_NAME[time].en} — ${TIME_NAME[time].ru}` : `${ASPECT_NAME[aspect!].en} — ${ASPECT_NAME[aspect!].ru}`
    const rows: { t: Time; a: Aspect }[] = time ? ASPECTS.map((a) => ({ t: time, a })) : TIMES.map((t) => ({ t, a: aspect! }))
    if (compact) {
      return (
        <div className="vt vt-compact" data-level="1" data-pos="verb">
          <span className="vt-title vt-title-sm">{quiz ? '?' : title}</span>
          <div className="vt-minis" data-cols={time ? 2 : 3}>
            {rows.map(({ t, a }) => (
              <MiniCell
                key={`${t}.${a}`}
                time={t}
                aspect={a}
                title={time ? undefined : TIME_NAME[t].ru}
                name={time ? ASPECT_NAME[a].en : undefined}
                chips={Boolean(aspect)}
                hideFormula={quiz}
              />
            ))}
          </div>
        </div>
      )
    }
    return (
      <div className="vt" data-level="1" data-pos="verb">
        <div className="vt-head">
          <span className="vt-title">{quiz ? 'Какое это время?' : title}</span>
        </div>
        {rows.map(({ t, a }) => (
          <div key={`${t}.${a}`} className="vt-row">
            <div className="vt-rowhead">
              <b>{time ? ASPECT_NAME[a].en : TIME_NAME[t].en}</b>
              <span>{time ? ASPECT_NAME[a].ru : TIME_NAME[t].ru}</span>
            </div>
            <AxisSvg time={t} aspect={a} size="md" quiet={quiz} />
            {!quiz && <Formula toks={FORMULA[t][a]} plus />}
          </div>
        ))}
      </div>
    )
  }

  // Без focus: пустой шаблон оси и словарь символов.
  if (compact) {
    return (
      <div className="vt vt-compact" data-level="1" data-pos="verb">
        <div className="vt-minis" data-cols={2}>
          {ASPECTS.map((a) => (
            <MiniCell key={a} time="present" aspect={a} name={ASPECT_NAME[a].en} chips={false} />
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="vt" data-level="1" data-pos="verb">
      <div className="vt-head">
        <span className="vt-title">Одна ось для всех времён</span>
        <span className="vt-sub">Настоящее — это NOW. В прошлом и будущем момент свой.</span>
      </div>
      <AxisSvg size="lg" />
      <AspectTiles />
    </div>
  )
}
