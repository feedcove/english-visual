import type { Item, Topic, Variant } from '../content/types'
import type { Format } from '../engine/store'

export interface Result {
  ok: boolean
  /** Доля верного для tag / graph / pick. */
  score?: number
  /** Что ответил человек — для разбора. */
  given?: string
  /** Ответ отличается от верного на одну букву. */
  typo?: boolean
  /** Брал подсказку. */
  hint?: boolean
}

export interface ExerciseProps {
  item: Item
  variant: Variant
  topic: Topic
  format: Format
  /** Стабильное зерно перемешивания вариантов ответа. */
  seed: string
  colorHints: boolean
  /** Проверка недели: без подсказок. */
  noHints?: boolean
  /** Как показать предложение с графом: лесенкой или строкой (личный A/B-замер). */
  layout?: 'cascade' | 'block'
  /** Задание уже отвечено — показать зафиксированное состояние. */
  done?: Result
  onDone: (result: Result) => void
}
