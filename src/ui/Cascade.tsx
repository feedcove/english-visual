import { useMemo } from 'react'
import { cascade } from '../content/cascade'
import { buildGraph } from '../content/graph'
import { parseSentence } from '../content/sentence'
import type { Lang, Rel } from '../content/types'

// Короткие подписи ролей: длинный школьный вопрос не помещается рядом с фразой на телефоне.
const SHORT: Partial<Record<Rel, string>> = {
  subj: 'кто? что?',
  obj: 'кого? что?',
  compl: 'кто? какой?',
  attr: 'какой?',
  adv: 'обстоятельство',
  conj: 'и ещё',
}

interface Props {
  source: string
  graph: string
  lang?: Lang
  /** Подписывать роль фразы справа (кто? что? где?). */
  labels?: boolean
  /** all — раскрасить все слова; target — только {цели}; none — без цвета. */
  paint?: 'all' | 'target' | 'none'
  /** Клик по слову: индекс токена (как в Sentence). */
  onWord?: (tokenIndex: number) => void
  /** Выделенные токены (по индексу токена). */
  selected?: number[]
}

/** Предложение «лесенкой»: одна фраза — одна строка, отступ показывает, к чему она относится. */
export function Cascade({ source, graph, lang = 'en', labels = true, paint = 'all', onWord, selected }: Props) {
  const { tokens, g, lines } = useMemo(() => {
    const tokens = parseSentence(source)
    const g = buildGraph(tokens, graph)
    return { tokens, g, lines: cascade(g) }
  }, [source, graph])
  // Пунктуация после слова (запятая, точка) остаётся в строке этого слова.
  const trailing = (ti: number) => {
    let out = ''
    for (let k = ti + 1; k < tokens.length && tokens[k]!.punct; k++) out += tokens[k]!.text
    return out
  }
  return (
    <div className="cascade" lang={lang} role="group" aria-label="Предложение лесенкой">
      {lines.map((line, i) => (
        <p key={i} className="cascade-line" style={{ ['--lvl' as string]: line.level }}>
          <span className="cascade-text">
            {line.words.map((w, j) => {
              const ti = g.tokenIndex[w]!
              const tok = tokens[ti]!
              const glue = j > 0 && !tok.join ? ' ' : ''
              const painted = paint === 'all' || (paint === 'target' && tok.mark)
              const cls = ['w', painted && tok.pos ? 'w-pos' : '', tok.mark && paint !== 'none' ? 'w-target' : '', selected?.includes(ti) ? 'w-sel' : ''].filter(Boolean).join(' ')
              const word = (
                <span className={cls} data-pos={painted ? tok.pos : undefined}>
                  {tok.text}
                </span>
              )
              return (
                <span key={w}>
                  {glue}
                  {onWord ? (
                    <button type="button" className="w-btn" onClick={() => onWord(ti)}>
                      {word}
                    </button>
                  ) : (
                    word
                  )}
                  {trailing(ti)}
                </span>
              )
            })}
          </span>
          {labels && <span className="cascade-role">{line.rel ? (SHORT[line.rel] ?? '') : 'что делает?'}</span>}
        </p>
      ))}
    </div>
  )
}
