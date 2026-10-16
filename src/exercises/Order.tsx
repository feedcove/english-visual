import { useMemo, useState } from 'react'
import { parseSentence, tilesOf, trailingPunct } from '../content/sentence'
import { canonical } from '../engine/check'
import { seeded, shuffle } from '../engine/random'
import { Button } from '../ui/kit'
import { Sentence } from '../ui/Sentence'
import { Prompt } from './Prompt'
import type { ExerciseProps } from './types'
import { useKeys } from './useKeys'

interface Tile {
  id: number
  text: string
}

/** Сборка предложения из плиток. С variant.from — склейка двух коротких фраз в одну (sentence combining). */
export function Order({ item, variant, seed, showSkill, done, onDone }: ExerciseProps) {
  const tokens = useMemo(() => parseSentence(variant.s ?? ''), [variant.s])
  const target = useMemo(() => tilesOf(tokens), [tokens])
  const punct = trailingPunct(tokens)
  const accepted = useMemo(
    () => [target, ...(variant.accept ?? []).map((a) => tilesOf(parseSentence(a)))].map((t) => canonical(t.join(' '))),
    [target, variant.accept],
  )
  const pool: Tile[] = useMemo(() => {
    const words = [...target, ...(variant.options ?? [])]
    // Первую плитку не выдаём заглавной буквой, кроме I и имён (существительных).
    const firstPos = tokens.find((t) => !t.punct)?.pos
    const display = words.map((w, i) => (i === 0 && w !== 'I' && firstPos !== 'noun' ? w.charAt(0).toLowerCase() + w.slice(1) : w))
    return shuffle(
      display.map((text, id) => ({ id, text })),
      seeded(seed),
    )
  }, [target, tokens, variant.options, seed])
  const [placed, setPlaced] = useState<Tile[]>([])

  const check = () => {
    if (done || !placed.length) return
    const built = canonical(placed.map((t) => t.text).join(' '))
    onDone({ ok: accepted.includes(built), given: placed.map((t) => t.text).join(' ') })
  }
  useKeys({ Enter: check, Backspace: () => setPlaced((p) => p.slice(0, -1)) }, !done)

  const free = pool.filter((t) => !placed.includes(t))
  return (
    <div className="ex">
      <Prompt item={item} variant={variant} showSkill={showSkill} fallback={variant.from ? 'Склей в одно предложение' : 'Собери предложение'} />
      {variant.from && (
        <div className="ex-from">
          {variant.from.map((f) => (
            <p key={f}>
              <Sentence source={f} paint="none" />
            </p>
          ))}
        </div>
      )}
      {variant.tr && <p className="ex-tr">{variant.tr}</p>}
      <div className="ex-line" aria-label="Собранное предложение" data-empty={!placed.length || undefined}>
        {done ? (
          <span className="ex-built">{done.given}{punct}</span>
        ) : (
          placed.map((t) => (
            <button key={t.id} type="button" className="tile" data-placed onClick={() => setPlaced((p) => p.filter((x) => x !== t))}>
              {t.text}
            </button>
          ))
        )}
        {!done && placed.length > 0 && <span className="ex-punct">{punct}</span>}
      </div>
      {!done && (
        <>
          <div className="ex-pool">
            {free.map((t) => (
              <button key={t.id} type="button" className="tile" onClick={() => setPlaced((p) => [...p, t])}>
                {t.text}
              </button>
            ))}
          </div>
          <div className="ex-actions">
            <Button variant="solid" size="lg" className="grow" disabled={!placed.length} onClick={check}>
              Проверить
            </Button>
            <Button variant="soft" size="lg" disabled={!placed.length} onClick={() => setPlaced([])}>
              Сбросить
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
