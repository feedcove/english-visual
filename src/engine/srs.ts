import { createEmptyCard, fsrs, generatorParameters, Rating, State } from 'ts-fsrs'
import type { Card, Grade } from 'ts-fsrs'
import { dayKey } from './dates'

// Расписание повторений: FSRS-6 (ts-fsrs). Повторы внутри дня ведёт сама сессия,
// поэтому short-term шаги выключены: FSRS получает одну оценку на навык в день.

export { Rating, State }
export type { Grade }

/** Сохраняемая карточка: поля FSRS (даты числами) + лестница форматов. */
export interface CardRec {
  due: number
  s: number
  d: number
  sd: number
  ls: number
  reps: number
  lapses: number
  st: State
  lr?: number
  /** Дни, когда навык верно воспроизведён (ввод, сборка, разбор) — для статуса «освоено». */
  prod: string[]
  /** Последний показанный вариант: следующий раз берём другой. */
  last?: number
  /** Когда навык впервые показан. */
  seen: number
  /** Последний оценённый ответ был ошибкой: в следующий раз начать снова с узнавания. */
  fail?: boolean
}

export function scheduler(retention: number) {
  return fsrs(generatorParameters({ request_retention: retention, maximum_interval: 365, enable_fuzz: true, enable_short_term: false }))
}

function toCard(r: CardRec): Card {
  return {
    due: new Date(r.due),
    stability: r.s,
    difficulty: r.d,
    elapsed_days: 0,
    scheduled_days: r.sd,
    learning_steps: r.ls,
    reps: r.reps,
    lapses: r.lapses,
    state: r.st,
    last_review: r.lr === undefined ? undefined : new Date(r.lr),
  }
}

function fromCard(c: Card, prev?: CardRec): CardRec {
  return {
    due: c.due.getTime(),
    s: c.stability,
    d: c.difficulty,
    sd: c.scheduled_days,
    ls: c.learning_steps,
    reps: c.reps,
    lapses: c.lapses,
    st: c.state,
    lr: c.last_review?.getTime(),
    prod: prev?.prod ?? [],
    last: prev?.last,
    seen: prev?.seen ?? Date.now(),
    fail: prev?.fail,
  }
}

export function newCard(now: number): CardRec {
  return { ...fromCard(createEmptyCard(new Date(now))), seen: now }
}

export function review(rec: CardRec | undefined, grade: Grade, now: number, retention: number): CardRec {
  const base = rec ?? newCard(now)
  const next = scheduler(retention).next(toCard(base), new Date(now), grade)
  return fromCard(next.card, base)
}

export function retrievability(rec: CardRec, now: number, retention: number): number {
  if (rec.st === State.New) return 0
  return scheduler(retention).get_retrievability(toCard(rec), new Date(now), false)
}

/** Отметить верное воспроизведение (храним 5 последних разных дней). */
export function markProductive(rec: CardRec, now: number): CardRec {
  const key = dayKey(now)
  if (rec.prod.includes(key)) return rec
  return { ...rec, prod: [...rec.prod, key].slice(-5) }
}

export type Stage = 'new' | 'learning' | 'review' | 'solid'

/** Стадия навыка: «освоено» — устойчивость от 21 дня и два верных воспроизведения в разные дни. */
export function stageOf(rec: CardRec | undefined): Stage {
  if (!rec || rec.st === State.New) return 'new'
  if (rec.s >= 21 && rec.prod.length >= 2) return 'solid'
  if (rec.s >= 7) return 'review'
  return 'learning'
}

export const STAGE_LABEL: Record<Stage, string> = {
  new: 'новое',
  learning: 'в работе',
  review: 'закрепляется',
  solid: 'освоено',
}
