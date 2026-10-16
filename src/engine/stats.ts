import type { Topic } from '../content/types'
import { addDays, dayKey, daysBetween, endOfStudyDay, weekday } from './dates'
import { retrievability, stageOf } from './srs'
import type { Stage } from './srs'
import type { DayRec, Persisted } from './store'

// Метрики прогресса считаются из ответов и FSRS, а не из «очков».

/** День засчитан: хотя бы короткое занятие (сессия или 8+ ответов). */
export function dayDone(d: DayRec | undefined): boolean {
  return Boolean(d && (d.sessions > 0 || d.answered >= 8))
}

export interface Streak {
  days: number
  /** Сколько пропусков закрыла автозаморозка (не больше одного за 7 дней). */
  frozen: number
  /** Сегодня уже засчитано. */
  today: boolean
}

/** Щадящая серия: один пропуск в неделю не обнуляет. Сегодняшний ещё не сделанный день не считается пропуском. */
export function streakOf(state: Persisted, now = Date.now()): Streak {
  const today = dayKey(now)
  const doneToday = dayDone(state.days[today])
  let key = doneToday ? today : addDays(today, -1)
  let days = 0
  let frozen = 0
  let lastFreeze: string | undefined
  for (let guard = 0; guard < 3650; guard++) {
    if (dayDone(state.days[key])) days++
    else {
      const canFreeze = (!lastFreeze || daysBetween(key, lastFreeze) >= 7) && dayDone(state.days[addDays(key, -1)])
      if (!canFreeze) break
      frozen++
      lastFreeze = key
    }
    key = addDays(key, -1)
  }
  return { days, frozen, today: doneToday }
}

export function daysInLast(state: Persisted, n: number, now = Date.now()): number {
  const today = dayKey(now)
  let count = 0
  for (let i = 0; i < n; i++) if (dayDone(state.days[addDays(today, -i)])) count++
  return count
}

/** Дни текущей недели (пн–вс) с отметкой, засчитан ли день. */
export function weekStrip(state: Persisted, now = Date.now()): { key: string; done: boolean; today: boolean; future: boolean }[] {
  const today = dayKey(now)
  const monday = addDays(today, -weekday(today))
  return Array.from({ length: 7 }, (_, i) => {
    const key = addDays(monday, i)
    return { key, done: dayDone(state.days[key]), today: key === today, future: key > today }
  })
}

export interface TopicProgress {
  total: number
  counts: Record<Stage, number>
  /** 0..1: доля пройденного пути (learning 1/3, review 2/3, solid 1). */
  value: number
  /** Средняя вероятность вспомнить по начатым навыкам. */
  recall: number
}

const STAGE_WEIGHT: Record<Stage, number> = { new: 0, learning: 1 / 3, review: 2 / 3, solid: 1 }

export function topicProgress(state: Persisted, topic: Topic, now = Date.now()): TopicProgress {
  const counts: Record<Stage, number> = { new: 0, learning: 0, review: 0, solid: 0 }
  let recallSum = 0
  let started = 0
  for (const item of topic.items) {
    const rec = state.cards[item.id]
    counts[stageOf(rec)]++
    if (rec) {
      started++
      recallSum += retrievability(rec, now, state.settings.retention)
    }
  }
  const total = topic.items.length
  const value = total ? topic.items.reduce((s, i) => s + STAGE_WEIGHT[stageOf(state.cards[i.id])], 0) / total : 0
  return { total, counts, value, recall: started ? recallSum / started : 0 }
}

export function totals(state: Persisted, topics: Topic[]): Record<Stage, number> {
  const counts: Record<Stage, number> = { new: 0, learning: 0, review: 0, solid: 0 }
  for (const t of topics) for (const i of t.items) counts[stageOf(state.cards[i.id])]++
  return counts
}

/** Повторы на ближайшие дни (включая сегодня). Тот же отбор, что у очереди: только существующий контент, без сделанного сегодня. */
export function forecast(state: Persisted, days = 7, now = Date.now(), exists: (id: string) => boolean = () => true): { key: string; count: number }[] {
  const today = dayKey(now)
  const out = Array.from({ length: days }, (_, i) => ({ key: addDays(today, i), count: 0 }))
  const end = endOfStudyDay(now)
  for (const [id, c] of Object.entries(state.cards)) {
    if (!exists(id)) continue
    const doneToday = c.lr !== undefined && dayKey(c.lr) === today
    const idx = c.due < end ? (doneToday ? 1 : 0) : daysBetween(today, dayKey(c.due))
    if (idx >= 0 && idx < days) out[idx]!.count++
  }
  return out
}

/** Точность и объём по дням за последние n дней. */
export function history(state: Persisted, n = 14, now = Date.now()) {
  const today = dayKey(now)
  return Array.from({ length: n }, (_, i) => {
    const key = addDays(today, i - n + 1)
    const d = state.days[key]
    return { key, answered: d?.answered ?? 0, accuracy: d && d.answered ? d.correct / d.answered : null, speed: d?.speed?.median ?? null }
  })
}

/** Слабые места: больше всего срывов и низкая вероятность вспомнить. */
export function weakItems(state: Persisted, limit = 5, now = Date.now()): string[] {
  const recent = new Map<string, number>()
  for (const l of state.log.slice(-400)) if (!l.ok) recent.set(l.id, (recent.get(l.id) ?? 0) + 1)
  return Object.entries(state.cards)
    .map(([id, c]) => ({ id, score: c.lapses * 2 + (recent.get(id) ?? 0) * 3 + (1 - retrievability(c, now, state.settings.retention)) }))
    .filter((x) => x.score > 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.id)
}

/** Тепловая карта: n недель по 7 дней, значение — число ответов. */
export function heatmap(state: Persisted, weeks = 12, now = Date.now()): { key: string; answered: number; future: boolean }[][] {
  const today = dayKey(now)
  const start = addDays(today, -weekday(today) - (weeks - 1) * 7)
  return Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      const key = addDays(start, w * 7 + d)
      return { key, answered: state.days[key]?.answered ?? 0, future: key > today }
    }),
  )
}

export function median(values: number[]): number {
  if (!values.length) return 0
  const s = [...values].sort((a, b) => a - b)
  const m = Math.floor(s.length / 2)
  return s.length % 2 ? s[m]! : (s[m - 1]! + s[m]!) / 2
}

/** История проверок недели: от старых к новым. */
export function exams(state: Persisted): { key: string; n: number; ok: number }[] {
  return Object.entries(state.days)
    .filter(([, d]) => d.exam && d.exam.n > 0)
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([key, d]) => ({ key, n: d.exam!.n, ok: d.exam!.ok }))
}

/** Пора ли честно проверить себя: занимаешься хотя бы неделю, есть что проверять, прошлая проверка — неделю назад. */
export function examDue(state: Persisted, now = Date.now()): boolean {
  if (Object.keys(state.cards).length < 20) return false
  const first = Object.keys(state.days).sort()[0]
  if (!first || daysBetween(first, dayKey(now)) < 7) return false
  const last = exams(state).at(-1)
  return !last || daysBetween(last.key, dayKey(now)) >= 7
}

export interface LayoutStat {
  n: number
  accuracy: number
  medianMs: number
}

/** Личный A/B: одни и те же задания лесенкой и строкой. Сравнение честное, только когда ответов достаточно. */
export function layoutStats(state: Persisted): { cascade: LayoutStat; block: LayoutStat } {
  const of = (lay: 'c' | 'b'): LayoutStat => {
    const rows = state.log.filter((l) => l.lay === lay)
    return { n: rows.length, accuracy: rows.length ? rows.filter((r) => r.ok).length / rows.length : 0, medianMs: median(rows.map((r) => r.ms)) }
  }
  return { cascade: of('c'), block: of('b') }
}
