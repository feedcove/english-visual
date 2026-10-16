import { useEffect, useState } from 'react'
import { parseSentence, renderText } from '../content/sentence'
import type { Item, Topic, Variant } from '../content/types'
import type { Format } from '../engine/store'
import { speak } from '../engine/tts'
import { storyForFocus } from '../illustrations'
import { StoryPlayer } from '../illustrations/StoryPlayer'
import { href } from '../router'
import { Button } from '../ui/kit'
import { Icon } from '../ui/icons'
import { Sentence } from '../ui/Sentence'
import { Visual } from '../visuals'
import type { Result } from './types'
import { useKeys } from './useKeys'

interface Props {
  item: Item
  variant: Variant
  topic: Topic
  format: Format
  result: Result
  voice: { on: boolean; name?: string; rate: number }
  onNext: () => void
  onTypo?: () => void
}

/** Разбор сразу после ответа: верно ли, правильный вариант целиком в цвете, одна строка «почему» и схема с подсветкой. */
export function Feedback({ item, variant, topic, format, result, voice, onNext, onTypo }: Props) {
  const lang = variant.lang ?? 'en'
  const text = variant.s ? renderText(parseSentence(variant.s)) : ''
  const why = variant.why ?? item.why
  const partial = result.score !== undefined && result.score > 0 && result.score < 1
  const story = storyForFocus(topic.id, item.focus)
  // После ошибки картинка-объяснение раскрыта сразу, после верного ответа — по кнопке.
  const [showStory, setShowStory] = useState(!result.ok)

  useEffect(() => {
    if (voice.on && text && lang === 'en') speak(text, { voiceName: voice.name, rate: voice.rate })
  }, [voice.on, voice.name, voice.rate, text, lang])

  useKeys({ Enter: onNext, ' ': onNext })

  const showSentence = format === 'choose' || format === 'type' || format === 'order' || (format === 'choice' && variant.s)
  const showVisual = format !== 'graph'
  return (
    <section className="fb" data-ok={result.ok || undefined} aria-live="polite">
      <div className="fb-status">
        <span className="fb-icon">
          <Icon name={result.ok ? 'check' : 'cross'} />
        </span>
        <span className="fb-title">{result.ok ? 'Верно' : partial ? `Частично: ${Math.round((result.score ?? 0) * 100)}%` : result.typo ? 'Почти: похоже на опечатку' : 'Неверно'}</span>
      </div>
      {showSentence && text && (
        <div className="fb-sentence">
          <p>
            <Sentence source={variant.s} paint="all" lang={lang} />
          </p>
          {lang === 'en' && (
            <Button variant="ghost" size="sm" icon={<Icon name="speaker" />} aria-label="Послушать" onClick={() => speak(text, { voiceName: voice.name, rate: voice.rate })} />
          )}
        </div>
      )}
      {!result.ok && result.given && (format === 'type' || format === 'order') && (
        <p className="fb-given">
          Твой ответ: <s>{result.given}</s>
        </p>
      )}
      {format === 'choice' && !result.ok && variant.answer && (
        <p className="fb-given">
          Ответ: <b>{variant.answer}</b>
        </p>
      )}
      <p className="fb-skill">{item.skill}</p>
      {why && <p className="fb-why">{why}</p>}
      {story && showStory && <StoryPlayer story={story} compact />}
      {showVisual && item.focus && !(story && showStory) && <Visual id={topic.visual} focus={item.focus} compact />}
      {story && !showStory && (
        <button type="button" className="fb-story" onClick={() => setShowStory(true)}>
          <Icon name="play" /> Почему — картинкой
        </button>
      )}
      <div className="fb-actions">
        {result.typo && onTypo && (
          <Button variant="soft" size="lg" onClick={onTypo}>
            Это опечатка
          </Button>
        )}
        <Button variant="solid" size="lg" className="grow" onClick={onNext} autoFocus>
          Дальше
        </Button>
      </div>
      <a className="fb-ref" href={href({ name: 'topic', id: topic.id })}>
        <Icon name="book" /> {topic.title}
      </a>
    </section>
  )
}
