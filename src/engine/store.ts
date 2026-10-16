import { useSyncExternalStore } from 'react'
import { buildGraph } from '../content/graph'
import { parseSentence } from '../content/sentence'
import type { CustomSentence } from '../content/types'
import { dayKey } from './dates'
import { markProductive, Rating, review } from './srs'
import type { CardRec, Grade } from './srs'

// Прогресс живёт в браузере (localStorage). Если хранилище недоступно — работаем в памяти и честно предупреждаем.
// Экспорт/импорт JSON — единственный перенос между устройствами.

const KEY = 'ev:v1'

export type Format = 'choose' | 'type' | 'order' | 'choice' | 'tag' | 'graph' | 'pick'

export interface Settings {
  /** Длина стандартного занятия, минуты. */
  minutes: 10 | 15
  newPerDay: number
  retention: 0.85 | 0.9 | 0.95
  voice: boolean
  voiceName?: string
  rate: number
  hideStreak: boolean
  /** Подсвечивать цель задания цветом части речи. */
  colorHints: boolean
}

export interface LogRec {
  t: number
  id: string
  ok: boolean
  fmt: Format
  ms: number
  g: Grade
  /** Как было показано предложение: c — лесенкой, b — строкой. */
  lay?: 'c' | 'b'
}

export interface DayRec {
  sessions: number
  answered: number
  correct: number
  ms: number
  newItems: number
  /** Скоростной раунд: число ответов, верных и медиана времени, мс. */
  speed?: { n: number; ok: number; median: number }
  /** Проверка недели: число заданий и верных. */
  exam?: { n: number; ok: number }
}

export interface TopicRec {
  startedAt?: number
  checkedAt?: number
  checkScore?: number
}

export interface Persisted {
  v: 1
  createdAt: number
  settings: Settings
  cards: Record<string, CardRec>
  log: LogRec[]
  days: Record<string, DayRec>
  topics: Record<string, TopicRec>
  /** План «если — то» для утренней привычки. */
  plan: string
  /** «Мои предложения». */
  custom: CustomSentence[]
}

export const DEFAULT_SETTINGS: Settings = {
  minutes: 10,
  newPerDay: 6,
  retention: 0.9,
  voice: true,
  rate: 0.95,
  hideStreak: false,
  colorHints: true,
}

const LOG_CAP = 20_000

function fresh(): Persisted {
  return { v: 1, createdAt: Date.now(), settings: { ...DEFAULT_SETTINGS }, cards: {}, log: [], days: {}, topics: {}, plan: '', custom: [] }
}

export type StorageStatus = 'ok' | 'memory' | 'corrupt'

let state: Persisted = fresh()
let status: StorageStatus = 'ok'
const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

/** Проверка формы данных: из файла или хранилища может прийти что угодно. */
export function validate(raw: unknown): Persisted | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Partial<Persisted>
  if (r.v !== 1 || typeof r.cards !== 'object' || !Array.isArray(r.log) || typeof r.days !== 'object') return null
  for (const c of Object.values(r.cards ?? {})) {
    if (!c || typeof c.due !== 'number' || typeof c.s !== 'number' || !Array.isArray(c.prod)) return null
  }
  return {
    v: 1,
    createdAt: typeof r.createdAt === 'number' ? r.createdAt : Date.now(),
    settings: sanitizeSettings(r.settings),
    cards: r.cards ?? {},
    log: r.log.filter((l) => l && typeof l.t === 'number' && typeof l.id === 'string'),
    days: Object.fromEntries(
      Object.entries(r.days ?? {}).filter(([k, d]) => /^\d{4}-\d{2}-\d{2}$/.test(k) && d && typeof d === 'object' && typeof d.answered === 'number'),
    ),
    topics: Object.fromEntries(Object.entries(r.topics ?? {}).filter(([, t]) => t && typeof t === 'object')),
    plan: typeof r.plan === 'string' ? r.plan : '',
    custom: Array.isArray(r.custom) ? r.custom.filter(validCustom) : [],
  }
}

/** Своё предложение из файла: все поля на месте и граф действительно строится. */
function validCustom(c: CustomSentence): boolean {
  if (!c || typeof c.id !== 'string' || typeof c.s !== 'string' || typeof c.graph !== 'string' || typeof c.text !== 'string') return false
  if (c.lang !== 'en' && c.lang !== 'ru') return false
  try {
    buildGraph(parseSentence(c.s), c.graph)
    return true
  } catch {
    return false
  }
}

/** Настройки из файла или старой версии: всё неизвестное и недопустимое — по умолчанию. */
function sanitizeSettings(raw: unknown): Settings {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Partial<Record<keyof Settings, unknown>>
  const pick = <T,>(value: unknown, allowed: readonly T[], fallback: T): T => (allowed.includes(value as T) ? (value as T) : fallback)
  const d = DEFAULT_SETTINGS
  return {
    minutes: pick(r.minutes, [10, 15] as const, d.minutes),
    newPerDay: pick(r.newPerDay, [3, 6, 9], d.newPerDay),
    retention: pick(r.retention, [0.85, 0.9, 0.95] as const, d.retention),
    voice: typeof r.voice === 'boolean' ? r.voice : d.voice,
    voiceName: typeof r.voiceName === 'string' ? r.voiceName : undefined,
    rate: pick(r.rate, [0.8, 0.95, 1.1], d.rate),
    hideStreak: typeof r.hideStreak === 'boolean' ? r.hideStreak : d.hideStreak,
    colorHints: typeof r.colorHints === 'boolean' ? r.colorHints : d.colorHints,
  }
}

export function loadStore() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = validate(JSON.parse(raw))
      if (parsed) state = parsed
      else {
        // Повреждённые данные не перезаписываем: откладываем копию и начинаем заново.
        localStorage.setItem(`${KEY}:corrupt:${Date.now()}`, raw)
        status = 'corrupt'
      }
    }
    localStorage.setItem(`${KEY}:probe`, '1')
    localStorage.removeItem(`${KEY}:probe`)
  } catch {
    status = 'memory'
  }
  navigator.storage?.persist?.().catch(() => {})
}

function persist() {
  if (status === 'memory') return
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
    if (status === 'corrupt') status = 'ok'
  } catch {
    status = 'memory'
  }
}

export function update(fn: (s: Persisted) => Persisted) {
  state = fn(state)
  persist()
  emit()
}

export function getState(): Persisted {
  return state
}

export function getStatus(): StorageStatus {
  return status
}

export function useStore(): Persisted {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => state,
  )
}

// Синхронизация между вкладками.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key !== KEY || !e.newValue) return
    try {
      const parsed = validate(JSON.parse(e.newValue))
      if (parsed) {
        state = parsed
        emit()
      }
    } catch {}
  })
}

// ---------- Операции ----------

export interface Answer {
  itemId: string
  format: Format
  ok: boolean
  /** Доля верного для частично проверяемых форматов (tag, graph, pick). */
  score?: number
  ms: number
  /** Человек отметил, что ответ — опечатка (тогда ok = true, оценка «трудно»). */
  typo?: boolean
  /** Брал подсказку. */
  hint?: boolean
  variant: number
  /** Ответ в этот день по навыку уже был — только практика, FSRS не трогаем. */
  practice?: boolean
  /** Проверка темы «Уже знаю»: карточки не создаём, итог выставит markKnown. */
  check?: boolean
  layout?: 'cascade' | 'block'
}

const PRODUCTIVE: Format[] = ['type', 'order', 'tag', 'graph', 'pick']
const FAST_MS: Partial<Record<Format, number>> = { type: 5000, choice: 4000, choose: 3000 }

/** Автоматическая оценка для FSRS: без ручных кнопок «трудно/легко». */
export function gradeOf(a: Answer, rec: CardRec | undefined): Grade {
  if (!a.ok) return Rating.Again
  if (a.score !== undefined && a.score < 1) return Rating.Hard
  // Узнавание (выбор) нового навыка — короткий интервал: завтра проверим вводом.
  if (a.format === 'choose') return Rating.Hard
  if (a.typo || a.hint) return Rating.Hard
  const fast = a.ms < (FAST_MS[a.format] ?? 6000)
  if (fast && rec && rec.s >= 7 && PRODUCTIVE.includes(a.format)) return Rating.Easy
  if (a.ms > 25_000) return Rating.Hard
  return Rating.Good
}

export function recordAnswer(a: Answer, now = Date.now()) {
  update((s) => {
    const key = dayKey(now)
    const rec = s.cards[a.itemId]
    const reviewedToday = rec?.lr !== undefined && dayKey(rec.lr) === key
    const g = gradeOf(a, rec)
    let next = rec
    if (a.check) next = rec
    else if (!a.practice && !reviewedToday) next = { ...review(rec, g, now, s.settings.retention), fail: g === Rating.Again }
    else if (!next) next = review(undefined, g, now, s.settings.retention)
    if (next && !a.check && a.ok && !a.typo && !a.hint && PRODUCTIVE.includes(a.format) && (a.score ?? 1) >= 1) next = markProductive(next, now)
    if (next) next = { ...next, last: a.variant }
    const day = s.days[key] ?? { sessions: 0, answered: 0, correct: 0, ms: 0, newItems: 0 }
    const log: LogRec = { t: now, id: a.itemId, ok: a.ok, fmt: a.format, ms: Math.round(a.ms), g, ...(a.layout ? { lay: a.layout === 'cascade' ? 'c' : 'b' } : {}) }
    return {
      ...s,
      cards: next ? { ...s.cards, [a.itemId]: next } : s.cards,
      log: [...s.log, log].slice(-LOG_CAP),
      days: {
        ...s.days,
        [key]: {
          ...day,
          answered: day.answered + 1,
          correct: day.correct + (a.ok ? 1 : 0),
          ms: day.ms + Math.min(a.ms, 60_000),
          newItems: day.newItems + (rec || a.check ? 0 : 1),
        },
      },
    }
  })
}

/** «Уже знаю»: проверка темы пройдена — навыки сразу уходят на длинный интервал. */
export function markKnown(itemIds: string[], wrong: Set<string>, score: number, topicId: string, now = Date.now()) {
  update((s) => {
    const cards = { ...s.cards }
    for (const id of itemIds) {
      if (cards[id]) continue
      cards[id] = review(undefined, wrong.has(id) ? Rating.Again : Rating.Easy, now, s.settings.retention)
    }
    return { ...s, cards, topics: { ...s.topics, [topicId]: { ...s.topics[topicId], startedAt: s.topics[topicId]?.startedAt ?? now, checkedAt: now, checkScore: score } } }
  })
}

export function startTopic(topicId: string, now = Date.now()) {
  update((s) => (s.topics[topicId]?.startedAt ? s : { ...s, topics: { ...s.topics, [topicId]: { ...s.topics[topicId], startedAt: now } } }))
}

export function finishSession(extra: { speed?: DayRec['speed']; exam?: DayRec['exam'] } = {}, now = Date.now()) {
  update((s) => {
    const key = dayKey(now)
    const day = s.days[key] ?? { sessions: 0, answered: 0, correct: 0, ms: 0, newItems: 0 }
    return { ...s, days: { ...s.days, [key]: { ...day, sessions: day.sessions + 1, speed: extra.speed ?? day.speed, exam: extra.exam ?? day.exam } } }
  })
}

export function setSettings(patch: Partial<Settings>) {
  update((s) => ({ ...s, settings: { ...s.settings, ...patch } }))
}

export function setPlan(plan: string) {
  update((s) => ({ ...s, plan }))
}

export function addCustom(items: Omit<CustomSentence, 'id' | 'addedAt'>[], now = Date.now()) {
  update((s) => {
    const known = new Set(s.custom.map((c) => c.s))
    const fresh = items.filter((i) => !known.has(i.s)).map((i, n) => ({ ...i, id: `${now.toString(36)}${n}`, addedAt: now }))
    return { ...s, custom: [...s.custom, ...fresh] }
  })
}

export function removeCustom(id: string) {
  update((s) => ({ ...s, custom: s.custom.filter((c) => c.id !== id) }))
}

export function exportJson(): string {
  return JSON.stringify(state, null, 1)
}

export function importJson(text: string): boolean {
  try {
    const parsed = validate(JSON.parse(text))
    if (!parsed) return false
    update(() => parsed)
    return true
  } catch {
    return false
  }
}

export function resetAll() {
  update(() => fresh())
}
