import { useMemo, useState } from 'react'
import { buildGraph, RELS } from '../content/graph'
import { parseSentence } from '../content/sentence'
import type { Rel } from '../content/types'
import { seeded, shuffle } from '../engine/random'
import { Cascade } from '../ui/Cascade'
import { Sentence } from '../ui/Sentence'
import { SentenceGraph } from '../visuals/graph/SentenceGraph'
import { Prompt } from './Prompt'
import type { ExerciseProps } from './types'

interface Step {
  q: string
  /** Индекс слова-ответа (в graph.words). */
  answer: number
  /** Слово, о котором спрашиваем «к чему относится». */
  about?: number
  rel?: Rel
}

const ASK_RELS: Rel[] = ['obj', 'attr', 'adv', 'compl']

/** Собери граф: сказуемое → подлежащее → к какому слову относится ещё одно-два слова. */
export function Graph({ variant, seed, noHints, done, onDone }: ExerciseProps) {
  const tokens = useMemo(() => parseSentence(variant.s ?? ''), [variant.s])
  const graph = useMemo(() => buildGraph(tokens, variant.graph ?? ''), [tokens, variant.graph])
  const steps = useMemo<Step[]>(() => {
    const out: Step[] = [{ q: 'Найди сказуемое: что делает? что происходит?', answer: graph.root }]
    const subj = graph.edges.find((e) => e.rel === 'subj')
    if (subj) out.push({ q: 'Найди подлежащее: кто? что?', answer: subj.dep })
    const pool = shuffle(
      graph.edges.filter((e) => ASK_RELS.includes(e.rel)),
      seeded(seed),
    ).slice(0, 2)
    for (const e of pool) {
      out.push({ q: `К какому слову относится «${graph.words[e.dep]!.text}»?`, answer: e.head, about: e.dep, rel: e.rel })
    }
    return out
  }, [graph, seed])

  const [index, setIndex] = useState(0)
  const [results, setResults] = useState<boolean[]>([])
  const [flash, setFlash] = useState<{ word: number; ok: boolean } | null>(null)

  const tapToken = (tokenIdx: number) => {
    if (done || flash) return
    const word = graph.tokenIndex.indexOf(tokenIdx)
    if (word < 0) return
    const step = steps[index]!
    const ok = word === step.answer
    const nextResults = [...results, ok]
    setResults(nextResults)
    setFlash({ word: step.answer, ok })
    window.setTimeout(
      () => {
        setFlash(null)
        if (index + 1 < steps.length) setIndex(index + 1)
        else {
          const right = nextResults.filter(Boolean).length
          onDone({ ok: right === steps.length, score: right / steps.length, given: '' })
        }
      },
      ok ? 450 : 1100,
    )
  }

  const step = steps[Math.min(index, steps.length - 1)]!
  const lang = variant.lang ?? 'en'
  const selectedTokens = [
    ...(flash ? [graph.tokenIndex[flash.word]!] : []),
    ...(step.about !== undefined && !done ? [graph.tokenIndex[step.about]!] : []),
  ]

  if (done) {
    return (
      <div className="ex">
        <Prompt variant={variant} fallback="Граф предложения" />
        <SentenceGraph source={variant.s ?? ''} graph={variant.graph ?? ''} lang={lang} view="tree" />
        <SentenceGraph source={variant.s ?? ''} graph={variant.graph ?? ''} lang={lang} view="members" />
        <Cascade source={variant.s ?? ''} graph={variant.graph ?? ''} lang={lang} />
        {variant.tr && <p className="ex-tr">{variant.tr}</p>}
      </div>
    )
  }

  return (
    <div className="ex">
      <Prompt variant={variant} fallback="Собери граф предложения" />
      <div className="ex-steps" aria-label="Шаги">
        {steps.map((_, i) => (
          <span key={i} className="ex-step" data-state={i < results.length ? (results[i] ? 'right' : 'wrong') : i === index ? 'now' : undefined} />
        ))}
      </div>
      <p className="ex-q ex-q-big">{step.q}</p>
      {step.rel && !noHints && <p className="ex-hint">Подсказка: оно отвечает на вопрос «{RELS[step.rel].question}»</p>}
      <p className="ex-sentence ex-pick" data-flash={flash ? (flash.ok ? 'right' : 'wrong') : undefined}>
        <Sentence tokens={tokens} lang={lang} paint="none" selected={selectedTokens} onWord={tapToken} />
      </p>
      {variant.tr && <p className="ex-tr">{variant.tr}</p>}
    </div>
  )
}
