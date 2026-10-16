import type { ReactNode } from 'react'
import { parseSentence } from '../content/sentence'
import type { Token } from '../content/sentence'
import type { Lang } from '../content/types'

export type Paint = 'none' | 'target' | 'all'

interface Props {
  source?: string
  tokens?: Token[]
  /** none — без цвета; target — только пропуск и {цель} (по умолчанию в заданиях); all — разбор всех слов. */
  paint?: Paint
  /** Что показать вместо пропуска. Без gap пропуск показывается своим словом. */
  gap?: ReactNode
  lang?: Lang
  /** Индексы токенов, которые подсветить рамкой (выбор в разборе). */
  selected?: number[]
  onWord?: (index: number) => void
  className?: string
}

/** Предложение из разметки: слова раскрашены по частям речи, цвет дублируется подчёркиванием. */
export function Sentence({ source, tokens, paint = 'target', gap, lang = 'en', selected, onWord, className }: Props) {
  const list = tokens ?? (source ? parseSentence(source) : [])
  return (
    <span className={`sentence ${className ?? ''}`} lang={lang}>
      {list.map((tok, i) => {
        const space = i > 0 && !tok.join && !isOpening(list[i - 1]) ? ' ' : ''
        if (tok.punct) return <span key={i}>{space}{tok.text}</span>
        if (tok.gap && gap !== undefined) return <span key={i}>{space}{gap}</span>
        const painted = paint === 'all' || (paint === 'target' && (tok.gap || tok.mark))
        const cls = ['w', painted && tok.pos ? 'w-pos' : '', tok.gap || tok.mark ? 'w-target' : '', selected?.includes(i) ? 'w-sel' : '']
          .filter(Boolean)
          .join(' ')
        const word = (
          <span className={cls} data-pos={painted ? tok.pos : undefined}>
            {tok.text}
          </span>
        )
        return (
          <span key={i}>
            {space}
            {onWord ? (
              <button type="button" className="w-btn" onClick={() => onWord(i)}>
                {word}
              </button>
            ) : (
              word
            )}
          </span>
        )
      })}
    </span>
  )
}

function isOpening(tok: Token | undefined): boolean {
  return Boolean(tok?.punct && /^[“"«(]+$/.test(tok.text))
}
