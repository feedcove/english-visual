import { describe, expect, it } from 'vitest'
import { itemById, topics } from '../src/content'
import { addDays, dayKey, endOfStudyDay } from '../src/engine/dates'
import { buildSession, formatFor } from '../src/engine/session'
import { Rating, review, stageOf } from '../src/engine/srs'
import { streakOf } from '../src/engine/stats'
import { DEFAULT_SETTINGS, getState, gradeOf, recordAnswer, resetAll } from '../src/engine/store'
import type { Persisted } from '../src/engine/store'

const lookup = { topics, itemById }
const NOW = new Date(2026, 9, 16, 9, 0).getTime()

function stateWith(days: string[]): Persisted {
  return {
    v: 1,
    createdAt: NOW,
    settings: { ...DEFAULT_SETTINGS },
    cards: {},
    log: [],
    days: Object.fromEntries(days.map((d) => [d, { sessions: 1, answered: 10, correct: 8, ms: 0, newItems: 0 }])),
    topics: {},
    plan: '',
    custom: [],
  }
}

describe('даты', () => {
  it('учебные сутки начинаются в 4 утра', () => {
    expect(dayKey(new Date(2026, 9, 16, 3, 59))).toBe('2026-10-15')
    expect(dayKey(new Date(2026, 9, 16, 4, 0))).toBe('2026-10-16')
    expect(new Date(endOfStudyDay(NOW)).getHours()).toBe(4)
    expect(addDays('2026-10-31', 1)).toBe('2026-11-01')
  })
})

describe('серия', () => {
  const today = dayKey(NOW)
  it('сегодня ещё не занимался — серия по вчерашний день', () => {
    expect(streakOf(stateWith([addDays(today, -1), addDays(today, -2)]), NOW)).toMatchObject({ days: 2, today: false })
  })
  it('один пропуск прощается', () => {
    const s = streakOf(stateWith([today, addDays(today, -1), addDays(today, -3), addDays(today, -4)]), NOW)
    expect(s).toMatchObject({ days: 4, frozen: 1 })
  })
  it('два пропуска подряд обнуляют', () => {
    expect(streakOf(stateWith([today, addDays(today, -3)]), NOW).days).toBe(1)
  })
})

describe('оценка ответа', () => {
  it('ошибка — Again, опечатка — Hard, выбор нового — Hard, ввод — Good', () => {
    const base = { itemId: 'x', ms: 3000, variant: 0 }
    expect(gradeOf({ ...base, format: 'type', ok: false }, undefined)).toBe(Rating.Again)
    expect(gradeOf({ ...base, format: 'type', ok: true, typo: true }, undefined)).toBe(Rating.Hard)
    expect(gradeOf({ ...base, format: 'choose', ok: true }, undefined)).toBe(Rating.Hard)
    expect(gradeOf({ ...base, format: 'type', ok: true, ms: 9000 }, undefined)).toBe(Rating.Good)
    expect(gradeOf({ ...base, format: 'tag', ok: false, score: 0.8 }, undefined)).toBe(Rating.Again)
  })
})

describe('занятие', () => {
  it('с чистого листа: знакомство с темой, новое выбором, потом вводом', () => {
    const plan = buildSession('daily', stateWith([]), lookup, NOW)
    expect(plan.steps[0]).toMatchObject({ kind: 'intro' })
    const tasks = plan.steps.filter((s) => s.kind === 'task')
    expect(tasks.length).toBe(DEFAULT_SETTINGS.newPerDay * 2)
    const first = tasks.slice(0, DEFAULT_SETTINGS.newPerDay)
    expect(first.every((t) => t.kind === 'task' && t.phase === 'new')).toBe(true)
    expect(tasks.filter((t) => t.kind === 'task' && t.phase === 'practice').length).toBe(DEFAULT_SETTINGS.newPerDay)
  })

  it('просроченное идёт в повторы, сначала самое забытое', () => {
    const s = stateWith([])
    const ids = [...itemById.keys()].slice(0, 5)
    const past = NOW - 10 * 86_400_000
    for (const id of ids) s.cards[id] = review(undefined, Rating.Good, past, 0.9)
    const plan = buildSession('daily', s, lookup, NOW)
    const reviews = plan.steps.filter((x) => x.kind === 'task' && x.phase === 'review')
    expect(reviews.length).toBe(5)
    expect(plan.reviews).toBe(5)
  })

  it('формат по стадии: новое — выбор, повтор — ввод, режимы order/choice фиксированы', () => {
    const gapItem = { id: 'a', skill: 's', variants: [] }
    const card = review(undefined, Rating.Good, NOW, 0.9)
    expect(formatFor(gapItem, undefined, 'new')).toBe('choose')
    expect(formatFor(gapItem, card, 'review')).toBe('type')
    expect(formatFor({ ...gapItem, mode: 'order' }, card, 'new')).toBe('order')
    expect(formatFor({ ...gapItem, mode: 'choice' }, card, 'review')).toBe('choice')
  })
})

describe('запись ответа', () => {
  it('первый ответ создаёт карточку, практика в тот же день расписание не трогает', () => {
    resetAll()
    const id = [...itemById.keys()][0]!
    recordAnswer({ itemId: id, format: 'choose', ok: true, ms: 2000, variant: 0 }, NOW)
    const first = getState().cards[id]!
    expect(first.reps).toBe(1)
    recordAnswer({ itemId: id, format: 'type', ok: true, ms: 2000, variant: 1, practice: true }, NOW + 60_000)
    const after = getState().cards[id]!
    expect(after.reps).toBe(1)
    expect(after.prod).toEqual([dayKey(NOW)])
    expect(stageOf(after)).toBe('learning')
    expect(getState().days[dayKey(NOW)]).toMatchObject({ answered: 2, correct: 2, newItems: 1 })
  })
})

describe('исправления после ревью', () => {
  it('подсказка с неверным ответом — Again; верно с подсказкой — Hard', () => {
    const base = { itemId: 'x', ms: 3000, variant: 0, format: 'type' as const }
    expect(gradeOf({ ...base, ok: false, hint: true }, undefined)).toBe(Rating.Again)
    expect(gradeOf({ ...base, ok: true, hint: true }, undefined)).toBe(Rating.Hard)
  })

  it('проверка темы не создаёт карточек и не тратит квоту нового', () => {
    resetAll()
    const id = [...itemById.keys()][1]!
    recordAnswer({ itemId: id, format: 'type', ok: true, ms: 2000, variant: 0, check: true }, NOW)
    expect(getState().cards[id]).toBeUndefined()
    expect(getState().days[dayKey(NOW)]?.newItems).toBe(0)
  })

  it('после ошибки следующий повтор — снова выбор', () => {
    resetAll()
    const id = [...itemById.keys()][2]!
    recordAnswer({ itemId: id, format: 'type', ok: false, ms: 2000, variant: 0 }, NOW)
    const rec = getState().cards[id]!
    expect(rec.fail).toBe(true)
    expect(formatFor({ id, skill: 's', variants: [] }, rec, 'review')).toBe('choose')
  })
})

describe('опечатка или грамматика', async () => {
  const { isTypo } = await import('../src/engine/check')
  it('окончания и удвоение — не опечатка', () => {
    expect(isTypo('lives', ['lived'])).toBe(false)
    expect(isTypo('biger', ['bigger'])).toBe(false)
    expect(isTypo('stoped', ['stopped'])).toBe(false)
    expect(isTypo('happyer', ['happier'], ['happyer'])).toBe(false)
  })
  it('буква в середине длинного слова — опечатка', () => {
    expect(isTypo('beautfiul', ['beautiful'])).toBe(false)
    expect(isTypo('intresting', ['interesting'])).toBe(true)
    expect(isTypo('comfortible', ['comfortable'])).toBe(true)
  })
})

describe('проверка недели', async () => {
  const { examDue } = await import('../src/engine/stats')
  it('не раньше недели занятий и 20 начатых навыков', () => {
    const s = stateWith([dayKey(NOW)])
    for (const id of [...itemById.keys()].slice(0, 25)) s.cards[id] = review(undefined, Rating.Good, NOW, 0.9)
    expect(examDue(s, NOW)).toBe(false)
    s.days[addDays(dayKey(NOW), -8)] = { sessions: 1, answered: 10, correct: 8, ms: 0, newItems: 0 }
    expect(examDue(s, NOW)).toBe(true)
  })
})
