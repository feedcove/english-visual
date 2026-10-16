import { useMemo, useState } from 'react'
import { parseSentence } from '../content/sentence'
import { Cascade } from '../ui/Cascade'
import { Sentence } from '../ui/Sentence'
import { Prompt } from './Prompt'
import type { ExerciseProps } from './types'

const MAX_ERRORS = 2

/** Найди слово: верные слова помечены {так} в разметке. С образцом — «та же роль, что выделенное». */
export function Pick({ item, variant, showSkill, layout, done, onDone }: ExerciseProps) {
  const tokens = useMemo(() => parseSentence(variant.s ?? ''), [variant.s])
  const targets = useMemo(() => tokens.flatMap((t, i) => (t.mark ? [i] : [])), [tokens])
  // В задании цель не подсвечиваем: убираем пометку из отображаемых токенов.
  const shown = useMemo(() => tokens.map((t) => ({ ...t, mark: false })), [tokens])
  const [found, setFound] = useState<number[]>([])
  const [misses, setMisses] = useState<number[]>([])

  const tap = (i: number) => {
    if (done || found.includes(i) || misses.includes(i) || tokens[i]?.punct) return
    if (targets.includes(i)) {
      const next = [...found, i]
      setFound(next)
      if (next.length === targets.length) onDone({ ok: misses.length === 0, score: next.length / (next.length + misses.length), given: '' })
    } else {
      const next = [...misses, i]
      setMisses(next)
      if (next.length >= MAX_ERRORS) onDone({ ok: false, score: found.length / (targets.length + next.length), given: '' })
    }
  }

  return (
    <div className="ex">
      <Prompt item={item} variant={variant} showSkill={showSkill} fallback="Найди слово" />
      {variant.model && (
        <p className="ex-model">
          <span className="ex-model-label">Образец</span>
          <Sentence source={variant.model} paint="target" lang={variant.lang ?? 'en'} />
        </p>
      )}
      {layout === 'cascade' && variant.graph ? (
        <div className="ex-pick">
          <Cascade source={variant.s ?? ''} graph={variant.graph} lang={variant.lang ?? 'en'} paint={done ? 'target' : 'none'} labels={Boolean(done)} selected={done ? undefined : found} onWord={done ? undefined : tap} />
        </div>
      ) : (
        <p className="ex-sentence ex-pick">
          <Sentence
            tokens={done ? tokens : shown}
            lang={variant.lang ?? 'en'}
            paint={done ? 'target' : 'none'}
            selected={done ? undefined : found}
            onWord={done ? undefined : tap}
          />
        </p>
      )}
      {!done && misses.length > 0 && (
        <p className="ex-hint" role="status">
          Не то слово: {misses.map((i) => tokens[i]?.text).join(', ')}. Осталось попыток: {MAX_ERRORS - misses.length}
        </p>
      )}
      {variant.tr && <p className="ex-tr">{variant.tr}</p>}
      {targets.length > 1 && !done && (
        <p className="ex-hint">
          Найдено {found.length} из {targets.length}
        </p>
      )}
    </div>
  )
}
