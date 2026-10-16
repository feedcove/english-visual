import { useMemo, useState } from 'react'
import { POS, POS_ORDER, FAMILIES } from '../content/pos'
import type { Family } from '../content/pos'
import { parseSentence } from '../content/sentence'
import type { Pos } from '../content/types'
import { Glyph } from '../ui/Glyph'
import { Button } from '../ui/kit'
import { Prompt } from './Prompt'
import type { ExerciseProps } from './types'
import { useKeys } from './useKeys'

/** Раскрась предложение: каждому слову — часть речи. Слова идут по очереди, к любому можно вернуться. */
export function Tag({ item, variant, showSkill, done, onDone }: ExerciseProps) {
  const tokens = useMemo(() => parseSentence(variant.s ?? ''), [variant.s])
  const words = useMemo(() => tokens.map((t, i) => ({ t, i })).filter((w) => !w.t.punct), [tokens])
  const [marks, setMarks] = useState<Record<number, Pos>>({})
  const [active, setActive] = useState(words[0]?.i ?? 0)

  const assign = (pos: Pos) => {
    if (done) return
    const next = { ...marks, [active]: pos }
    setMarks(next)
    const after = words.find((w) => w.i > active && !next[w.i]) ?? words.find((w) => !next[w.i])
    if (after) setActive(after.i)
  }
  const complete = words.every((w) => marks[w.i])
  const check = () => {
    if (done || !complete) return
    const right = words.filter((w) => marks[w.i] === w.t.pos).length
    onDone({ ok: right === words.length, score: right / words.length, given: JSON.stringify(marks) })
  }
  useKeys({ Enter: check, ...Object.fromEntries(POS_ORDER.map((p, n) => [n < 9 ? String(n + 1) : '', () => assign(p)]).filter(([k]) => k)) }, !done)

  const given: Record<number, Pos> = done?.given ? JSON.parse(done.given) : marks
  const families: Family[] = ['things', 'actions', 'links']
  return (
    <div className="ex">
      <Prompt item={item} variant={variant} showSkill={showSkill} fallback="Определи часть речи каждого слова" />
      <p className="ex-sentence ex-words" lang={variant.lang ?? 'en'}>
        {tokens.map((t, i) => {
          if (t.punct) return <span key={i}>{t.text}</span>
          const mine = given[i]
          const wrong = done && mine !== t.pos
          return (
            <button
              key={i}
              type="button"
              className="ex-word"
              data-active={!done && i === active ? true : undefined}
              data-pos={done ? t.pos : mine}
              data-wrong={wrong || undefined}
              disabled={Boolean(done)}
              onClick={() => setActive(i)}
            >
              <span className="ex-word-text">{t.text}</span>
              <span className="ex-word-tag">
                {done ? (
                  <>
                    <Glyph pos={t.pos!} size={12} />
                    {POS[t.pos!].short}
                  </>
                ) : mine ? (
                  <>
                    <Glyph pos={mine} size={12} />
                    {POS[mine].short}
                  </>
                ) : (
                  '·'
                )}
              </span>
            </button>
          )
        })}
      </p>
      {variant.tr && <p className="ex-tr">{variant.tr}</p>}
      {!done && (
        <>
          <div className="pos-palette">
            {families.map((f) => (
              <div key={f} className="pos-family">
                <span className="pos-family-name">{FAMILIES[f].ru}</span>
                <div className="pos-family-buttons">
                  {POS_ORDER.filter((p) => POS[p].family === f).map((p) => (
                    <button key={p} type="button" className="pos-btn" data-pos={p} onClick={() => assign(p)}>
                      <Glyph pos={p} size={14} />
                      <span>{POS[p].ru}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button variant="solid" size="lg" block disabled={!complete} onClick={check}>
            Проверить
          </Button>
        </>
      )}
    </div>
  )
}
