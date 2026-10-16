import { describe, expect, it } from 'vitest'
import { TOPICS } from '../src/content/catalog'
import { parseSentence } from '../src/content/sentence'
import { storiesByTopic } from '../src/illustrations'
import { isVisualId, VISUALS } from '../src/visuals/catalog'

// Валидатор картинок-историй (docs/illustrations.md).

describe('картинки-истории', () => {
  it('файлы историй названы по существующим темам', () => {
    const ids = new Set(TOPICS.map((t) => t.id))
    expect([...storiesByTopic.keys()].filter((id) => !ids.has(id))).toEqual([])
  })

  for (const [topicId, stories] of storiesByTopic) {
    it(`истории темы ${topicId}`, () => {
      const errors: string[] = []
      const meta = TOPICS.find((t) => t.id === topicId)!
      const keys: readonly string[] = isVisualId(meta.visual) ? VISUALS[meta.visual].focus : []
      const seen = new Set<string>()
      if (stories.length < 1 || stories.length > 3) errors.push(`историй ${stories.length}, нужно 1–3`)
      for (const story of stories) {
        if (!story.id.startsWith(`${topicId}.`)) errors.push(`${story.id}: нужен префикс ${topicId}.`)
        if (seen.has(story.id)) errors.push(`${story.id}: повтор id`)
        seen.add(story.id)
        if (story.frames.length < 2 || story.frames.length > 4) errors.push(`${story.id}: кадров ${story.frames.length}, нужно 2–4`)
        for (const f of story.focus ?? []) if (!keys.includes(f)) errors.push(`${story.id}: у схемы ${meta.visual} нет focus «${f}»`)
        story.frames.forEach((frame, n) => {
          const where = `${story.id} кадр ${n + 1}`
          if (!frame.ru || frame.ru.length > 220) errors.push(`${where}: ru пустой или длиннее 220`)
          if (!frame.en) return
          try {
            const marks = parseSentence(frame.en).filter((t) => t.mark).length
            if (marks !== 1) errors.push(`${where}: в en нужна ровно одна {цель}, сейчас ${marks}`)
          } catch (e) {
            errors.push(`${where}: ${(e as Error).message}`)
          }
        })
      }
      expect(errors).toEqual([])
    })
  }
})
