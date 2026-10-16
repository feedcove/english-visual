import { useEffect, useMemo, useRef, useState } from 'react'
import { gapToken, parseSentence } from '../content/sentence'
import type { Item } from '../content/types'
import { sameAnswer } from '../engine/check'
import { seeded, shuffle } from '../engine/random'
import { median } from '../engine/stats'
import { Button } from '../ui/kit'
import { Sentence } from '../ui/Sentence'
import { GapSlot } from './Choose'
import { useKeys } from './useKeys'

const DURATION = 45_000

interface Card {
  id: string
  s?: string
  q?: string
  answer: string
  options: [string, string]
  lang: 'en' | 'ru'
}

function toCard(item: Item, rng: () => number): Card | null {
  const v = item.variants[Math.floor(rng() * item.variants.length)]
  if (!v?.options?.length) return null
  const answer = item.mode === 'choice' ? v.answer : gapToken(parseSentence(v.s ?? ''))?.text
  if (!answer) return null
  const wrong = v.options[0]!
  return { id: item.id, s: v.s, q: v.q, answer, options: rng() < 0.5 ? [answer, wrong] : [wrong, answer], lang: v.lang ?? 'en' }
}

export interface SpeedResult {
  n: number
  ok: number
  median: number
}

/** 45 секунд быстрых решений из двух вариантов на знакомом материале: тренирует автоматизм, меряет скорость. */
export function SpeedRound({ items, seed, onFinish }: { items: Item[]; seed: string; onFinish: (r: SpeedResult) => void }) {
  const cards = useMemo(() => {
    const rng = seeded(seed)
    return shuffle(items, rng)
      .map((i) => toCard(i, rng))
      .filter((c): c is Card => c !== null)
  }, [items, seed])
  const [started, setStarted] = useState(false)
  const [index, setIndex] = useState(0)
  const [left, setLeft] = useState(DURATION)
  const [flash, setFlash] = useState<'right' | 'wrong' | null>(null)
  const times = useRef<number[]>([])
  const correct = useRef(0)
  const shownAt = useRef(0)
  const finished = useRef(false)

  const finish = () => {
    if (finished.current) return
    finished.current = true
    onFinish({ n: times.current.length, ok: correct.current, median: Math.round(median(times.current)) })
  }

  useEffect(() => {
    if (!started) return
    const t0 = performance.now()
    shownAt.current = t0
    const timer = window.setInterval(() => {
      const rest = DURATION - (performance.now() - t0)
      setLeft(Math.max(0, rest))
      if (rest <= 0) {
        window.clearInterval(timer)
        finish()
      }
    }, 100)
    return () => window.clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started])

  const card = cards[index % Math.max(1, cards.length)]
  const answer = (o: string) => {
    if (!started || !card || flash || finished.current) return
    const ok = sameAnswer(o, card.answer)
    times.current.push(performance.now() - shownAt.current)
    if (ok) correct.current++
    setFlash(ok ? 'right' : 'wrong')
    window.setTimeout(
      () => {
        setFlash(null)
        shownAt.current = performance.now()
        if (index + 1 >= cards.length * 2) finish()
        else setIndex(index + 1)
      },
      ok ? 160 : 650,
    )
  }
  useKeys({ '1': () => card && answer(card.options[0]), '2': () => card && answer(card.options[1]), ArrowLeft: () => card && answer(card.options[0]), ArrowRight: () => card && answer(card.options[1]) }, started)

  if (!started) {
    return (
      <div className="ex speed-intro">
        <p className="ex-q ex-q-big">Скоростной раунд</p>
        <p className="muted">45 секунд, выбор из двух. Отвечай быстро, не задумываясь: так знание становится автоматическим. На расписание повторов раунд не влияет.</p>
        <Button variant="solid" size="lg" block onClick={() => setStarted(true)}>
          Поехали
        </Button>
      </div>
    )
  }
  if (!card) return null
  const tokens = card.s ? parseSentence(card.s) : []
  return (
    <div className="ex speed" data-flash={flash ?? undefined}>
      <div className="speed-bar" style={{ ['--left' as string]: `${(left / DURATION) * 100}%` }} />
      <p className="speed-count">{correct.current} верно</p>
      {card.q && <p className="ex-q">{card.q}</p>}
      {tokens.length > 0 && (
        <p className="ex-sentence">
          <Sentence tokens={tokens} lang={card.lang} paint="target" gap={<GapSlot />} />
        </p>
      )}
      <div className="speed-options">
        {card.options.map((o, i) => (
          <button key={`${index}-${o}`} type="button" className="ex-option speed-option" onClick={() => answer(o)}>
            <span className="ex-key">{i === 0 ? '←' : '→'}</span>
            <span className="ex-option-text">{o}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
