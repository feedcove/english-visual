import type { Graph } from './graph'
import type { Rel } from './types'

// «Лесенка» (по мотивам visual-syntactic text formatting): предложение режется на фразы,
// отступ показывает, к чему фраза относится. Строится из графа предложения.

/** Отношения, которые открывают свою фразу. Остальные (attr, aux, part, prep, cc, mark) живут во фразе хозяина. */
const PHRASE: Rel[] = ['subj', 'obj', 'compl', 'adv', 'conj']

export interface CascadeLine {
  /** Индексы слов (в graph.words) по порядку. */
  words: number[]
  level: number
  /** Отношение главного слова фразы; у сказуемого — undefined. */
  rel?: Rel
}

export interface CascadeOptions {
  /** Склеивать соседние фразы одной клаузы, пока строка не длиннее этого числа символов (в VSTF 10–35). 0 — не склеивать. */
  maxChars?: number
}

const VERBISH = new Set(['verb', 'aux'])
const CLAUSE_RELS: Rel[] = ['adv', 'obj', 'attr', 'conj', 'subj']

export function cascade(graph: Graph, { maxChars = 24 }: CascadeOptions = {}): CascadeLine[] {
  const n = graph.words.length
  const relOf = new Array<Rel | undefined>(n)
  for (const e of graph.edges) relOf[e.dep] = e.rel
  const isHead = (i: number) => i === graph.root || PHRASE.includes(relOf[i]!)

  // Фраза слова — ближайший предок (или само слово), открывающий фразу.
  const phraseOf = (i: number): number => {
    let cur = i
    while (!isHead(cur)) cur = graph.heads[cur]!
    return cur
  }

  // Уровень фразы: сказуемое 1, подлежащее на уровень левее хозяина, однородные — наравне, прочее — правее.
  const levelMemo = new Map<number, number>()
  const levelOf = (head: number): number => {
    if (levelMemo.has(head)) return levelMemo.get(head)!
    let level = 1
    if (head !== graph.root) {
      const parent = phraseOf(graph.heads[head]!)
      const base = levelOf(parent)
      const rel = relOf[head]
      level = rel === 'subj' ? Math.max(0, base - 1) : rel === 'conj' ? base : base + 1
    }
    levelMemo.set(head, level)
    return level
  }

  // Строки — непрерывные куски одной фразы (вопросы и инверсия дают несколько кусков).
  const lines: CascadeLine[] = []
  for (let i = 0; i < n; i++) {
    const head = phraseOf(i)
    const last = lines[lines.length - 1]
    if (last && phraseOf(last.words[0]!) === head) last.words.push(i)
    else lines.push({ words: [i], level: levelOf(head), rel: head === graph.root ? undefined : relOf[head] })
  }
  if (!maxChars) return lines

  // Клауза слова — ближайший глагольный предок, который сам начинает клаузу (корень или придаточное).
  const clauseOf = (i: number): number => {
    let cur = i
    while (cur !== graph.root) {
      const pos = graph.words[cur]!.pos
      if (pos && VERBISH.has(pos) && CLAUSE_RELS.includes(relOf[cur]!)) return cur
      cur = graph.heads[cur]!
    }
    return graph.root
  }
  const textLen = (words: number[]) => words.reduce((sum, w) => sum + graph.words[w]!.text.length + 1, -1)
  const merged: CascadeLine[] = []
  for (const line of lines) {
    const prev = merged[merged.length - 1]
    const sameClause = prev && clauseOf(prev.words[0]!) === clauseOf(line.words[0]!)
    if (prev && sameClause && textLen([...prev.words, ...line.words]) <= maxChars) {
      prev.words.push(...line.words)
      prev.level = Math.min(prev.level, line.level)
      if (prev.rel === 'subj' || line.rel === undefined) prev.rel = line.rel ?? prev.rel
    } else merged.push({ ...line, words: [...line.words] })
  }
  return merged
}
