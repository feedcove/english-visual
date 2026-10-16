import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { gapToken, parseSentence } from '../content/sentence'
import { sameAnswer } from '../engine/check'
import { seeded, shuffle } from '../engine/random'
import { Cascade } from '../ui/Cascade'
import { Sentence } from '../ui/Sentence'
import { Icon } from '../ui/icons'
import { Visual } from '../visuals'
import { Prompt } from './Prompt'
import type { ExerciseProps } from './types'
import { useKeys } from './useKeys'

/** Выбор из вариантов: пропуск (format choose) или вопрос с ответом (format choice). */
export function Choose({ variant, format, seed, colorHints, layout, done, onDone }: ExerciseProps) {
  const tokens = useMemo(() => (variant.s ? parseSentence(variant.s) : []), [variant.s])
  const gap = gapToken(tokens)
  const answer = format === 'choice' ? (variant.answer ?? '') : (gap?.text ?? '')
  const options = useMemo(
    () => shuffle([answer, ...(variant.options ?? [])], seeded(seed)),
    [answer, variant.options, seed],
  )
  const chosen = done?.given

  const choose = (o: string) => {
    if (done) return
    onDone({ ok: sameAnswer(o, answer), given: o })
  }
  useKeys(Object.fromEntries(options.map((o, i) => [String(i + 1), () => choose(o)])), !done)

  const lang = variant.lang ?? 'en'
  return (
    <div className="ex">
      <Prompt variant={variant} fallback={format === 'choice' ? 'Выбери ответ' : 'Вставь слово'} />
      {variant.visual && <Visual id={variant.visual.id} focus={variant.visual.focus} quiz />}
      {layout === 'cascade' && variant.graph && tokens.length > 0 && (
        <Cascade source={variant.s ?? ''} graph={variant.graph} lang={lang} paint={colorHints ? 'target' : 'none'} labels={Boolean(done)} />
      )}
      {!(layout === 'cascade' && variant.graph) && tokens.length > 0 && (
        <p className="ex-sentence">
          <Sentence
            tokens={tokens}
            lang={lang}
            paint={colorHints ? 'target' : 'none'}
            gap={<GapSlot pos={colorHints ? gap?.pos : undefined} text={done ? answer : undefined} />}
          />
        </p>
      )}
      {variant.tr && format !== 'choice' && <p className="ex-tr">{variant.tr}</p>}
      <div className="ex-options" role="group" aria-label="Варианты ответа">
        {options.map((o, i) => {
          const isAnswer = sameAnswer(o, answer)
          const state = done ? (isAnswer ? 'right' : chosen !== undefined && sameAnswer(o, chosen) ? 'wrong' : 'idle') : 'idle'
          return (
            <button key={o} type="button" className="ex-option" data-state={state} disabled={Boolean(done)} onClick={() => choose(o)}>
              <span className="ex-key">{i + 1}</span>
              <span className="ex-option-text">{o}</span>
              {state === 'right' && <Icon name="check" />}
              {state === 'wrong' && <Icon name="cross" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function GapSlot({ pos, text, children }: { pos?: string; text?: string; children?: ReactNode }) {
  return (
    <span className="gap" data-pos={pos} data-filled={text ? true : undefined}>
      {children ?? text ?? '    '}
    </span>
  )
}
