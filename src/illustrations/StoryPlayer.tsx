import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Icon } from '../ui/icons'
import { Sentence } from '../ui/Sentence'
import './story.css'
import type { Story } from './types'

interface Props {
  story: Story
  /** В разборе ответа: без заголовка, плотнее. */
  compact?: boolean
  start?: number
}

/** Картинка-история: кадры листаются тапом по картинке, стрелками или точками. Сама не листается — темп задаёт человек. */
export function StoryPlayer({ story, compact, start = 0 }: Props) {
  const [i, setI] = useState(Math.min(start, story.frames.length - 1))
  const frame = story.frames[i]!
  const last = story.frames.length - 1
  const go = (n: number) => setI(Math.max(0, Math.min(last, n)))
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      e.stopPropagation()
      go(i + 1)
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      e.stopPropagation()
      go(i - 1)
    }
  }
  return (
    <section className="story" data-compact={compact || undefined} aria-roledescription="история в картинках" aria-label={story.title} tabIndex={0} onKeyDown={onKey}>
      {!compact && <h3 className="story-title">{story.title}</h3>}
      <button type="button" className="story-scene" key={i} onClick={() => go(i < last ? i + 1 : 0)} aria-label={i < last ? 'Следующий кадр' : 'С начала'}>
        {frame.scene}
      </button>
      <div className="story-caption" aria-live="polite">
        {frame.en && (
          <p className="story-en">
            <Sentence source={frame.en} paint="target" lang={frame.lang ?? 'en'} />
          </p>
        )}
        <p className="story-ru">{frame.ru}</p>
      </div>
      {story.frames.length > 1 && (
        <div className="story-nav">
          <button type="button" className="story-arrow" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Предыдущий кадр">
            <Icon name="back" />
          </button>
          <div className="story-dots" role="tablist" aria-label="Кадры">
            {story.frames.map((_, n) => (
              <button key={n} type="button" role="tab" aria-selected={n === i} aria-label={`Кадр ${n + 1}`} className="story-dot" data-on={n === i || undefined} onClick={() => go(n)} />
            ))}
          </div>
          <button type="button" className="story-arrow" onClick={() => go(i + 1)} disabled={i === last} aria-label="Следующий кадр">
            <Icon name="next" />
          </button>
        </div>
      )}
    </section>
  )
}
