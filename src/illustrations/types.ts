import type { ReactElement } from 'react'

// Картинки-истории: короткие «комиксы» из 2–4 кадров, которые показывают, что, почему и как работает правило.
// Сцены рисуются из набора src/illustrations/kit (фигуры, предметы, стрелки), подписи — в мини-разметке.

export interface Frame {
  /** SVG-сцена: <Scene>…</Scene> из kit. */
  scene: ReactElement
  /** Подпись по-английски в разметке (src/content/sentence.ts); {цель} подсвечивается. */
  en?: string
  /** Подпись по-русски: что видно и почему. Одна-две короткие фразы. */
  ru: string
  /** Язык en-подписи, если это русское предложение (по-русски так…). */
  lang?: 'en' | 'ru'
}

export interface Story {
  id: string
  /** Заголовок-вопрос или правило: «Почему him, а не he?» */
  title: string
  /** Ключи схемы темы (VISUALS[topic.visual].focus), которые история объясняет: по ним разбор ошибки находит историю. */
  focus?: string[]
  frames: Frame[]
}

/** Файл src/illustrations/stories/<topic-id>.tsx: export default Story[]. */
export type TopicStories = Story[]
