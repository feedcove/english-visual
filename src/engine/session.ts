import type { Item, Topic } from '../content/types'
import { dayKey, endOfStudyDay } from './dates'
import { seeded, shuffle } from './random'
import type { Rng } from './random'
import { retrievability, State, stageOf } from './srs'
import type { CardRec } from './srs'
import type { Format, Persisted } from './store'

// Сборка занятия. Порядок: разминка повторами (вперемешку) → новая тема блоком → второй проход
// по новому уже вводом → остаток повторов → скоростной раунд. Ошибки возвращаются в очередь при прохождении.

export type SessionKind = 'daily' | 'short' | 'topic' | 'check' | 'speed' | 'exam'
export type Phase = 'review' | 'new' | 'practice' | 'retry' | 'check'

export type Step =
  | { kind: 'intro'; topicId: string }
  | { kind: 'task'; itemId: string; variant: number; format: Format; phase: Phase; practice?: boolean }
  | { kind: 'speed'; itemIds: string[] }

export interface SessionPlan {
  kind: SessionKind
  steps: Step[]
  topicId?: string
  dueTotal: number
  reviews: number
  fresh: number
  estimateMin: number
}

const SEC_PER_TASK = 20

export interface Lookup {
  topics: Topic[]
  itemById: Map<string, { item: Item; topic: Topic }>
}

/** Формат задания по стадии навыка: новое — узнавание, окрепшее — воспроизведение. */
export function formatFor(item: Item, rec: CardRec | undefined, phase: Phase): Format {
  const mode = item.mode ?? 'gap'
  if (mode !== 'gap') return mode === 'choice' ? 'choice' : mode
  if (phase === 'practice' || phase === 'check') return 'type'
  if (phase === 'new' || !rec || rec.st === State.New) return 'choose'
  // После срыва — снова с узнавания (short-term шаги выключены, State.Relearning не бывает).
  if (rec.fail) return 'choose'
  return 'type'
}

export function pickVariant(item: Item, rec: CardRec | undefined, rng: Rng): number {
  const n = item.variants.length
  if (n <= 1) return 0
  const options = Array.from({ length: n }, (_, i) => i).filter((i) => i !== rec?.last)
  return options[Math.floor(rng() * options.length)]!
}

/** Текущая тема: последняя начатая, где ещё есть непоказанные навыки, иначе первая по пути. */
export function currentTopic(state: Persisted, topics: Topic[]): Topic | undefined {
  const open = topics.filter((t) => t.items.some((i) => !state.cards[i.id]))
  const started = open
    .filter((t) => state.topics[t.id]?.startedAt)
    .sort((a, b) => (state.topics[b.id]!.startedAt ?? 0) - (state.topics[a.id]!.startedAt ?? 0))
  return started[0] ?? open[0]
}

export function dueItems(state: Persisted, lookup: Lookup, now: number): string[] {
  const end = endOfStudyDay(now)
  const today = dayKey(now)
  return Object.entries(state.cards)
    .filter(([id, c]) => lookup.itemById.has(id) && c.due < end && !(c.lr !== undefined && dayKey(c.lr) === today))
    .map(([id, c]) => ({ id, r: retrievability(c, now, state.settings.retention) }))
    .sort((a, b) => a.r - b.r)
    .map((x) => x.id)
}

/** Перемешать так, чтобы задания одной темы по возможности не шли подряд. */
function interleave(ids: string[], lookup: Lookup, rng: Rng): string[] {
  const pool = shuffle(ids, rng)
  const out: string[] = []
  while (pool.length) {
    const prevTopic = out.length ? lookup.itemById.get(out[out.length - 1]!)?.topic.id : undefined
    const idx = pool.findIndex((id) => lookup.itemById.get(id)?.topic.id !== prevTopic)
    out.push(pool.splice(idx === -1 ? 0 : idx, 1)[0]!)
  }
  return out
}

function task(lookup: Lookup, state: Persisted, id: string, phase: Phase, rng: Rng, practice = false): Step {
  const { item } = lookup.itemById.get(id)!
  const rec = state.cards[id]
  return { kind: 'task', itemId: id, variant: pickVariant(item, rec, rng), format: formatFor(item, rec, phase), phase, practice }
}

function speedCandidates(state: Persisted, lookup: Lookup): string[] {
  return Object.keys(state.cards).filter((id) => {
    const entry = lookup.itemById.get(id)
    if (!entry) return false
    const mode = entry.item.mode ?? 'gap'
    const stage = stageOf(state.cards[id])
    return (mode === 'gap' || mode === 'choice') && (stage === 'review' || stage === 'solid' || stage === 'learning')
  })
}

export function buildSession(kind: SessionKind, state: Persisted, lookup: Lookup, now = Date.now(), topicId?: string): SessionPlan {
  const rng = seeded(`${dayKey(now)}:${kind}:${topicId ?? ''}:${state.days[dayKey(now)]?.sessions ?? 0}`)
  const due = dueItems(state, lookup, now)
  const today = state.days[dayKey(now)]
  const steps: Step[] = []

  if (kind === 'check' && topicId) {
    const topic = lookup.topics.find((t) => t.id === topicId)
    const items = topic ? shuffle(topic.items, rng).slice(0, 6) : []
    for (const item of items) steps.push(task(lookup, state, item.id, 'check', rng))
    return { kind, steps, topicId, dueTotal: due.length, reviews: 0, fresh: 0, estimateMin: Math.ceil((steps.length * SEC_PER_TASK) / 60) }
  }

  if (kind === 'exam') {
    // Проверка недели: до 20 уже начатых навыков из разных тем, только воспроизведение, без подсказок и повторов.
    const started = Object.keys(state.cards).filter((id) => lookup.itemById.has(id))
    const byTopic = new Map<string, string[]>()
    for (const id of shuffle(started, rng)) {
      const t = lookup.itemById.get(id)!.topic.id
      byTopic.set(t, [...(byTopic.get(t) ?? []), id])
    }
    const picked: string[] = []
    while (picked.length < 20 && [...byTopic.values()].some((l) => l.length)) {
      for (const list of byTopic.values()) if (list.length && picked.length < 20) picked.push(list.shift()!)
    }
    for (const id of picked) steps.push(task(lookup, state, id, 'check', rng))
    return { kind, steps, dueTotal: due.length, reviews: 0, fresh: 0, estimateMin: estimate(steps) }
  }

  if (kind === 'speed') {
    const ids = shuffle(speedCandidates(state, lookup), rng).slice(0, 40)
    return { kind, steps: ids.length ? [{ kind: 'speed', itemIds: ids }] : [], dueTotal: due.length, reviews: 0, fresh: 0, estimateMin: 1 }
  }

  if (kind === 'topic' && topicId) {
    const topic = lookup.topics.find((t) => t.id === topicId)
    if (!topic) return { kind, steps, dueTotal: due.length, reviews: 0, fresh: 0, estimateMin: 0 }
    const ids = new Set(topic.items.map((i) => i.id))
    const topicDue = due.filter((id) => ids.has(id))
    const fresh = topic.items.filter((i) => !state.cards[i.id]).slice(0, 8)
    const known = topic.items.filter((i) => state.cards[i.id] && !topicDue.includes(i.id))
    if (fresh.length && !state.topics[topic.id]?.startedAt) steps.push({ kind: 'intro', topicId: topic.id })
    for (const id of shuffle(topicDue, rng)) steps.push(task(lookup, state, id, 'review', rng))
    for (const item of fresh) steps.push(task(lookup, state, item.id, 'new', rng))
    for (const item of fresh) steps.push(task(lookup, state, item.id, 'practice', rng, true))
    const extra = shuffle(known, rng).slice(0, Math.max(0, 12 - steps.length))
    for (const item of extra) steps.push(task(lookup, state, item.id, 'review', rng, true))
    return { kind, steps, topicId, dueTotal: due.length, reviews: topicDue.length, fresh: fresh.length, estimateMin: estimate(steps) }
  }

  // daily и short
  const minutes = kind === 'short' ? 5 : state.settings.minutes
  const budget = Math.floor((minutes * 60) / SEC_PER_TASK)
  const reviewCap = kind === 'short' ? budget : Math.round(budget * 0.6)
  const reviews = due.slice(0, reviewCap)
  const backlog = due.length > reviewCap * 1.5
  let newQuota = kind === 'short' ? (reviews.length < 4 ? 3 : 0) : Math.max(0, state.settings.newPerDay - (today?.newItems ?? 0))
  if (backlog) newQuota = 0
  const topic = currentTopic(state, lookup.topics)
  const fresh = topic && newQuota > 0 ? topic.items.filter((i) => !state.cards[i.id]).slice(0, newQuota) : []

  const mixed = interleave(reviews, lookup, rng)
  const warmup = mixed.slice(0, Math.ceil(mixed.length / 3))
  const rest = mixed.slice(warmup.length)
  for (const id of warmup) steps.push(task(lookup, state, id, 'review', rng))
  if (fresh.length && topic) {
    if (!state.topics[topic.id]?.startedAt) steps.push({ kind: 'intro', topicId: topic.id })
    for (const item of fresh) steps.push(task(lookup, state, item.id, 'new', rng))
  }
  // Второй проход по новому — через несколько других заданий и уже воспроизведением.
  const half = Math.ceil(rest.length / 2)
  for (const id of rest.slice(0, half)) steps.push(task(lookup, state, id, 'review', rng))
  for (const item of shuffle(fresh, rng)) steps.push(task(lookup, state, item.id, 'practice', rng, true))
  for (const id of rest.slice(half)) steps.push(task(lookup, state, id, 'review', rng))

  if (kind === 'daily') {
    const cands = speedCandidates(state, lookup)
    if (cands.length >= 8) steps.push({ kind: 'speed', itemIds: shuffle(cands, rng).slice(0, 40) })
  }
  return { kind, steps, topicId: fresh.length ? topic?.id : undefined, dueTotal: due.length, reviews: reviews.length, fresh: fresh.length, estimateMin: estimate(steps) }
}

function estimate(steps: Step[]): number {
  const sec = steps.reduce((sum, s) => sum + (s.kind === 'task' ? SEC_PER_TASK : 60), 0)
  return Math.max(1, Math.round(sec / 60))
}
