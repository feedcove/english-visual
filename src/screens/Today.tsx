import { useMemo, useState } from 'react'
import { AREAS } from '../content/catalog'
import { itemById, topics } from '../content'
import { dayKey, formatDay, WEEKDAY_SHORT } from '../engine/dates'
import { buildSession, currentTopic } from '../engine/session'
import { daysInLast, examDue, streakOf, topicProgress, weakItems, weekStrip } from '../engine/stats'
import { setPlan, useStore } from '../engine/store'
import { href } from '../router'
import { Glyph } from '../ui/Glyph'
import { Icon } from '../ui/icons'
import { Button, Progress } from '../ui/kit'
import { plural } from './Session'

const lookup = { topics, itemById }

function greeting(): string {
  const h = new Date().getHours()
  if (h < 5) return 'Доброй ночи'
  if (h < 12) return 'Доброе утро'
  if (h < 18) return 'Добрый день'
  return 'Добрый вечер'
}

export function Today() {
  const state = useStore()
  const plan = useMemo(() => buildSession('daily', state, lookup), [state])
  const streak = streakOf(state)
  const week = weekStrip(state)
  const in28 = daysInLast(state, 28)
  const topic = currentTopic(state, topics)
  const weak = weakItems(state, 3)
  const doneToday = streak.today
  const area = topic ? AREAS[topic.area] : undefined
  const upcoming = topic ? topics.slice(topics.indexOf(topic), topics.indexOf(topic) + 3) : []

  return (
    <main className="page today">
      <header className="page-head">
        <p className="page-sub">{formatDay(dayKey())}</p>
        <h1 className="page-title">{greeting()}</h1>
      </header>

      <section className="card week" aria-label="Неделя">
        <div className="week-days">
          {week.map((d, i) => (
            <span key={d.key} className="week-day" data-done={d.done || undefined} data-today={d.today || undefined} data-future={d.future || undefined}>
              <span className="week-dot">{d.done ? <Icon name="check" size={14} /> : null}</span>
              <span className="week-label">{WEEKDAY_SHORT[i]}</span>
            </span>
          ))}
        </div>
        {!state.settings.hideStreak && (
          <p className="week-meta">
            {streak.days > 0 ? `Серия ${streak.days} ${plural(streak.days, 'день', 'дня', 'дней')}` : 'Начни серию сегодня'}
            {streak.frozen > 0 && (
              <span className="faint">
                {' '}
                · <Icon name="snow" size={12} /> пропуск прощён
              </span>
            )}
            <span className="faint"> · {in28} из 28 дней</span>
          </p>
        )}
      </section>

      <PlanLine plan={state.plan} />

      <section className="card session-card" data-level="1">
        <div className="row-between">
          <h2 className="k-text" data-style="headline">
            {doneToday ? 'Ещё одно занятие' : 'Занятие на сегодня'}
          </h2>
          {plan.steps.length > 0 && <span className="muted small">≈ {plan.estimateMin} мин</span>}
        </div>
        <ul className="plan-list">
          <li>
            <Icon name="undo" />
            <span className="grow">Повторить</span>
            <span className="muted">{plan.reviews ? `${plan.reviews}${plan.dueTotal > plan.reviews ? ` из ${plan.dueTotal}` : ''}` : 'нет на сегодня'}</span>
          </li>
          {plan.fresh > 0 && topic && (
            <li>
              {area?.pos ? <Glyph pos={area.pos} /> : <Icon name="topics" />}
              <span className="grow">
                Новое: {topic.title}
              </span>
              <span className="muted">{plan.fresh}</span>
            </li>
          )}
          {plan.steps.some((s) => s.kind === 'speed') && (
            <li>
              <Icon name="bolt" />
              <span className="grow">Скоростной раунд</span>
              <span className="muted">45 с</span>
            </li>
          )}
        </ul>
        {plan.steps.length > 0 ? (
          <a className="k-ctl block" data-variant="solid" data-size="lg" href={href({ name: 'session', kind: 'daily' })}>
            <Icon name="play" /> Начать
          </a>
        ) : (
          <p className="muted">На сегодня всё сделано. Новое добавится завтра — или выбери тему сам.</p>
        )}
        <div className="row">
          <a className="k-ctl grow" data-variant="soft" href={href({ name: 'session', kind: 'short' })}>
            Коротко, 5 мин
          </a>
          {plan.steps.some((s) => s.kind === 'speed') && (
            <a className="k-ctl grow" data-variant="soft" href={href({ name: 'session', kind: 'speed' })}>
              <Icon name="bolt" /> Скорость
            </a>
          )}
        </div>
      </section>

      {examDue(state) && (
        <a className="card exam-card" href={href({ name: 'session', kind: 'exam' })}>
          <span className="k-text" data-style="headline">
            Проверка недели
          </span>
          <span className="small muted">20 заданий без подсказок — честный замер прогресса. ≈ 7 мин</span>
        </a>
      )}

      {weak.length > 0 && (
        <section className="section">
          <h2 className="section-title">Слабые места</h2>
          <div className="k-group k-list card-list">
            {weak.map((id) => {
              const e = itemById.get(id)
              if (!e) return null
              return (
                <a key={id} className="k-row" href={href({ name: 'session', kind: 'topic', topic: e.topic.id })}>
                  <span className="k-row-icon">{AREAS[e.topic.area].pos ? <Glyph pos={AREAS[e.topic.area].pos!} /> : <Icon name="topics" />}</span>
                  <span className="k-row-text">
                    <span className="k-text" data-style="callout">
                      {e.item.skill}
                    </span>
                    <span className="k-text" data-style="footnote" data-level2="secondary">
                      {e.topic.title}
                    </span>
                  </span>
                  <Icon name="next" />
                </a>
              )
            })}
          </div>
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="section">
          <div className="row-between">
            <h2 className="section-title">Путь</h2>
            <a className="small muted" href={href({ name: 'topics' })}>
              Все темы
            </a>
          </div>
          <div className="k-group k-list card-list">
            {upcoming.map((t, i) => {
              const p = topicProgress(state, t)
              const pos = AREAS[t.area].pos
              return (
                <a key={t.id} className="k-row" href={href({ name: 'topic', id: t.id })}>
                  <span className="k-row-icon">{pos ? <Glyph pos={pos} /> : <Icon name="topics" />}</span>
                  <span className="k-row-text">
                    <span className="k-text" data-style="callout">
                      {t.title}
                    </span>
                    <Progress value={p.value} label={`Прогресс темы ${t.title}`} />
                  </span>
                  <span className="small muted">{i === 0 ? 'сейчас' : t.level}</span>
                </a>
              )
            })}
          </div>
        </section>
      )}
    </main>
  )
}

function PlanLine({ plan }: { plan: string }) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(plan)
  if (editing) {
    return (
      <form
        className="card plan-edit"
        onSubmit={(e) => {
          e.preventDefault()
          setPlan(value.trim())
          setEditing(false)
        }}
      >
        <label className="small muted" htmlFor="plan">
          Когда и где ты занимаешься? Конкретный план «если — то» помогает привычке.
        </label>
        <label className="k-field" data-variant="surface">
          <input id="plan" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Если я налил кофе — открываю тренажёр" autoFocus />
        </label>
        <div className="row">
          <Button variant="solid" type="submit">
            Сохранить
          </Button>
          <Button variant="ghost" onClick={() => setEditing(false)}>
            Отмена
          </Button>
        </div>
      </form>
    )
  }
  return (
    <button type="button" className="plan-line" onClick={() => setEditing(true)}>
      <Icon name="info" />
      <span>{plan || 'Задай план: «Если я налил кофе — открываю тренажёр»'}</span>
    </button>
  )
}
