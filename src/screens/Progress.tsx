import { AREA_ORDER, AREAS } from '../content/catalog'
import { itemById, topics } from '../content'
import { formatDay, WEEKDAY_SHORT } from '../engine/dates'
import { STAGE_LABEL } from '../engine/srs'
import type { Stage } from '../engine/srs'
import { daysInLast, exams, forecast, heatmap, history, layoutStats, streakOf, topicProgress, totals, weakItems } from '../engine/stats'
import { useStore } from '../engine/store'
import { href } from '../router'
import { Glyph } from '../ui/Glyph'
import { Icon } from '../ui/icons'
import { plural } from './Session'

const STAGES: Stage[] = ['solid', 'review', 'learning', 'new']

/** Прогресс по реальному знанию: стадии навыков, точность, скорость, прогноз нагрузки. */
export function ProgressScreen() {
  const state = useStore()
  const streak = streakOf(state)
  const in28 = daysInLast(state, 28)
  const count = totals(state, topics)
  const all = Object.values(count).reduce((a, b) => a + b, 0)
  const hist = history(state, 14)
  const fc = forecast(state, 7, Date.now(), (id) => itemById.has(id))
  const maxFc = Math.max(1, ...fc.map((f) => f.count))
  const weeks = heatmap(state, 12)
  const maxDay = Math.max(1, ...weeks.flat().map((d) => d.answered))
  const weak = weakItems(state, 6)
  const speeds = hist.filter((h) => h.speed !== null)
  const examList = exams(state)
  const lay = layoutStats(state)

  return (
    <main className="page">
      <header className="page-head">
        <h1 className="page-title">Прогресс</h1>
        <p className="page-sub">Считаем то, что реально в памяти: навык «освоен», когда держится от 21 дня и дважды верно воспроизведён в разные дни.</p>
      </header>

      <div className="stat-grid">
        {!state.settings.hideStreak && <Stat value={streak.days} label={plural(streak.days, 'день подряд', 'дня подряд', 'дней подряд')} />}
        <Stat value={`${in28}/28`} label="дней с занятиями" />
        <Stat value={count.solid} label="навыков освоено" />
        <Stat value={count.review + count.learning} label="в работе" />
      </div>

      <section className="card">
        <h2 className="section-title">Навыки</h2>
        <div className="stage-bar" role="img" aria-label={STAGES.map((s) => `${STAGE_LABEL[s]}: ${count[s]}`).join(', ')}>
          {STAGES.map((s) => (
            <span key={s} data-stage={s} style={{ flexGrow: count[s] || 0.0001 }} />
          ))}
        </div>
        <ul className="stage-legend">
          {STAGES.map((s) => (
            <li key={s}>
              <span className="stage-dot" data-stage={s} /> {STAGE_LABEL[s]} <b>{count[s]}</b>
            </li>
          ))}
        </ul>
        <p className="small faint">Всего навыков в приложении: {all}</p>
      </section>

      <section className="card">
        <h2 className="section-title">12 недель</h2>
        <div className="heatmap" role="img" aria-label="Активность за 12 недель">
          <div className="heatmap-labels">
            {WEEKDAY_SHORT.map((d, i) => (
              <span key={d}>{i % 2 === 0 ? d : ''}</span>
            ))}
          </div>
          {weeks.map((w, i) => (
            <div key={i} className="heatmap-week">
              {w.map((d) => (
                <span
                  key={d.key}
                  className="heatmap-day"
                  title={`${formatDay(d.key)}: ${d.answered} ответов`}
                  data-future={d.future || undefined}
                  style={{ ['--a' as string]: d.answered ? 0.25 + 0.75 * (d.answered / maxDay) : 0 }}
                />
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="section-title">Точность с первого раза, 14 дней</h2>
        <div className="bars" role="img" aria-label="Точность по дням">
          {hist.map((h) => (
            <span key={h.key} className="bar" title={`${formatDay(h.key)}: ${h.accuracy === null ? 'нет занятий' : `${Math.round(h.accuracy * 100)}%`}`}>
              <i style={{ height: `${h.accuracy === null ? 0 : Math.max(4, h.accuracy * 80)}%` }} data-empty={h.accuracy === null || undefined} />
            </span>
          ))}
        </div>
        {speeds.length > 0 && (
          <p className="small muted">
            Скоростной раунд: медиана {(speeds[speeds.length - 1]!.speed! / 1000).toFixed(1)} с на ответ
            {speeds.length > 1 && ` (было ${(speeds[0]!.speed! / 1000).toFixed(1)} с)`}. Чем меньше — тем автоматичнее.
          </p>
        )}
      </section>

      <section className="card">
        <h2 className="section-title">Проверка недели</h2>
        <p className="small muted">20 заданий из разных тем, только воспроизведение, без подсказок цветом и без повторов. Честный замер того, что держится в памяти.</p>
        {examList.length > 0 && (
          <ul className="exam-list">
            {examList.slice(-6).map((e) => (
              <li key={e.key}>
                <span>{formatDay(e.key)}</span>
                <b>{Math.round((e.ok / e.n) * 100)}%</b>
                <span className="faint">
                  {e.ok}/{e.n}
                </span>
              </li>
            ))}
          </ul>
        )}
        {Object.keys(state.cards).length >= 20 ? (
          <a className="k-ctl" data-variant="soft" href={href({ name: 'session', kind: 'exam' })}>
            Пройти проверку
          </a>
        ) : (
          <p className="small faint">Откроется, когда начатых навыков будет 20 и больше. На «Сегодня» напомню раз в неделю.</p>
        )}
      </section>

      {lay.cascade.n + lay.block.n > 0 && (
        <section className="card">
          <h2 className="section-title">Лесенка или строка</h2>
          <p className="small muted">
            Длинные предложения показываются случайно то лесенкой, то обычной строкой. В независимых исследованиях эффект лесенки маленький, поэтому проверяем на тебе. Сравнивать честно, когда на каждый способ
            наберётся 20+ ответов за 8+ занятий.
          </p>
          <div className="stat-grid">
            <div className="stat">
              <span className="stat-value">{lay.cascade.n ? `${Math.round(lay.cascade.accuracy * 100)}%` : '—'}</span>
              <span className="stat-label">
                лесенкой · {lay.cascade.n} отв. · {(lay.cascade.medianMs / 1000).toFixed(1)} с
              </span>
            </div>
            <div className="stat">
              <span className="stat-value">{lay.block.n ? `${Math.round(lay.block.accuracy * 100)}%` : '—'}</span>
              <span className="stat-label">
                строкой · {lay.block.n} отв. · {(lay.block.medianMs / 1000).toFixed(1)} с
              </span>
            </div>
          </div>
        </section>
      )}

      <section className="card">
        <h2 className="section-title">Повторы на неделю</h2>
        <div className="bars bars-forecast" role="img" aria-label="Прогноз повторов">
          {fc.map((f, i) => (
            <span key={f.key} className="bar">
              <b>{f.count || ''}</b>
              <i style={{ height: `${(f.count / maxFc) * 80}%` }} data-empty={!f.count || undefined} />
              <small>{i === 0 ? 'сег.' : WEEKDAY_SHORT[(new Date().getDay() + 6 + i) % 7]}</small>
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Карта освоения</h2>
        <div className="mastery">
          {AREA_ORDER.map((areaId) => {
            const area = AREAS[areaId]
            const list = topics.filter((t) => t.area === areaId)
            if (!list.length) return null
            return (
              <div key={areaId} className="mastery-area">
                <p className="small muted row">
                  {area.pos && <Glyph pos={area.pos} size={12} />} {area.title}
                </p>
                <div className="mastery-tiles" data-pos={area.pos}>
                  {list.map((t) => {
                    const p = topicProgress(state, t)
                    return (
                      <a key={t.id} className="mastery-tile" href={href({ name: 'topic', id: t.id })} title={`${t.title}: ${Math.round(p.value * 100)}%`} style={{ ['--v' as string]: p.value }}>
                        <span>{t.title}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {weak.length > 0 && (
        <section className="section">
          <h2 className="section-title">Слабые места</h2>
          <div className="k-group k-list card-list">
            {weak.map((id) => {
              const e = itemById.get(id)
              if (!e) return null
              return (
                <a key={id} className="k-row" href={href({ name: 'session', kind: 'topic', topic: e.topic.id })}>
                  <span className="k-row-icon">
                    <Icon name="undo" />
                  </span>
                  <span className="k-row-text">
                    <span className="k-text" data-style="callout">
                      {e.item.skill}
                    </span>
                    <span className="k-text" data-style="footnote" data-level2="secondary">
                      {e.topic.title} · срывов {state.cards[id]?.lapses ?? 0}
                    </span>
                  </span>
                  <Icon name="next" />
                </a>
              )
            })}
          </div>
        </section>
      )}
    </main>
  )
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="stat">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}
