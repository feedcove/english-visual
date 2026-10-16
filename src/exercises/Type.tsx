import { useEffect, useMemo, useRef, useState } from 'react'
import { gapToken, parseSentence } from '../content/sentence'
import { isTypo, matchesAny } from '../engine/check'
import { Button } from '../ui/kit'
import { Sentence } from '../ui/Sentence'
import { GapSlot } from './Choose'
import { Prompt } from './Prompt'
import type { ExerciseProps } from './types'

/** Воспроизведение: впиши слово в пропуск. Сокращения и регистр не важны: isn't = is not. */
export function Type({ variant, colorHints, noHints, done, onDone }: ExerciseProps) {
  const tokens = useMemo(() => parseSentence(variant.s ?? ''), [variant.s])
  const gap = gapToken(tokens)
  const answers = useMemo(() => [gap?.text ?? '', ...(variant.accept ?? [])], [gap, variant.accept])
  const [value, setValue] = useState('')
  const [hint, setHint] = useState(false)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!done) input.current?.focus({ preventScroll: true })
  }, [done])

  const submit = (given = value) => {
    if (done) return
    const ok = matchesAny(given, answers)
    onDone({ ok, given, hint, typo: !ok && given.trim() !== '' && isTypo(given, answers, variant.options) })
  }

  const first = (gap?.text ?? '').slice(0, 1)
  return (
    <div className="ex">
      <Prompt variant={variant} fallback="Впиши слово" />
      <p className="ex-sentence">
        <Sentence
          tokens={tokens}
          lang={variant.lang ?? 'en'}
          paint={colorHints ? 'target' : 'none'}
          gap={<GapSlot pos={colorHints ? gap?.pos : undefined} text={done ? gap?.text : value || undefined} />}
        />
      </p>
      {variant.tr && <p className="ex-tr">{variant.tr}</p>}
      <form
        className="ex-type"
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <label className="k-field ex-field" data-variant="surface" data-size="lg">
          <input
            ref={input}
            value={done ? (done.given ?? '') : value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={hint ? `${first}…` : 'ответ'}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="done"
            lang="en"
            disabled={Boolean(done)}
            aria-label="Ответ"
          />
        </label>
        {!done && (
          <div className="ex-actions">
            <Button variant="solid" size="lg" type="submit" disabled={!value.trim()} className="grow">
              Проверить
            </Button>
            {!noHints && (
              <Button variant="soft" size="lg" onClick={() => setHint(true)} disabled={hint}>
                Подсказка
              </Button>
            )}
            <Button variant="ghost" size="lg" onClick={() => submit('')}>
              Не помню
            </Button>
          </div>
        )}
      </form>
    </div>
  )
}
