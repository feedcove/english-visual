import type { ComponentType } from 'react'
import type { VisualId } from './catalog'

export interface VisualProps {
  /** Ключ подсветки из VISUALS[id].focus. Подсвечен только он, остальное приглушено (одно выделение на экран). */
  focus?: string
  /** Мини-версия для разбора ответа: меньше высота, только нужная часть схемы, без длинных подписей. */
  compact?: boolean
  /** Схема как вопрос: скрыть названия и формулы, которые выдают ответ. */
  quiz?: boolean
}

export type VisualComponent = ComponentType<VisualProps>

/** Каждая семья схем экспортирует из src/visuals/<family>/index.ts: export default { 'id': Component }. */
export type VisualFamilyModule = Partial<Record<VisualId, VisualComponent>>
