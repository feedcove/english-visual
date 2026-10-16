import type { Token } from './sentence'
import type { Rel } from './types'

// Граф предложения: у каждого слова, кроме корня-сказуемого, ровно один хозяин и одно отношение.
// Разметка: "1>2 subj, 3>4 attr, 4>2 obj" — номера слов с 1, пунктуация не считается.

export const RELS: Record<Rel, { ru: string; question: string; member: Member }> = {
  subj: { ru: 'подлежащее', question: 'кто? что?', member: 'subject' },
  obj: { ru: 'дополнение', question: 'кого? что? кому?', member: 'object' },
  compl: { ru: 'часть сказуемого', question: 'кто? какой? (после be)', member: 'predicate' },
  attr: { ru: 'определение', question: 'какой? чей? сколько?', member: 'attribute' },
  adv: { ru: 'обстоятельство', question: 'где? когда? как? почему?', member: 'adverbial' },
  aux: { ru: 'вспомогательный глагол', question: 'помогает сказуемому', member: 'predicate' },
  part: { ru: 'частица', question: 'оттенок: не, бы, to', member: 'service' },
  prep: { ru: 'предлог', question: 'связывает слово с хозяином', member: 'service' },
  cc: { ru: 'союз', question: 'соединяет однородные', member: 'service' },
  conj: { ru: 'однородный член', question: 'то же, что и первый', member: 'same' },
  mark: { ru: 'союз придаточного', question: 'вводит часть предложения', member: 'service' },
}

/** Член предложения — для школьных подчёркиваний. same — как у слова, к которому присоединён. */
export type Member = 'subject' | 'predicate' | 'object' | 'attribute' | 'adverbial' | 'service' | 'same'

export const MEMBERS: Record<Exclude<Member, 'same'>, { ru: string; line: string }> = {
  subject: { ru: 'подлежащее', line: 'одна черта' },
  predicate: { ru: 'сказуемое', line: 'две черты' },
  object: { ru: 'дополнение', line: 'пунктир' },
  attribute: { ru: 'определение', line: 'волнистая' },
  adverbial: { ru: 'обстоятельство', line: 'точка-тире' },
  service: { ru: 'служебное слово', line: 'без линии' },
}

export interface Edge {
  /** Индекс зависимого слова (с 0, в массиве words). */
  dep: number
  head: number
  rel: Rel
}

export interface Graph {
  words: Token[]
  /** Индекс в words → индекс в исходном массиве токенов. */
  tokenIndex: number[]
  root: number
  edges: Edge[]
  /** head по индексу слова; у корня -1. */
  heads: number[]
}

export class GraphError extends Error {}

export function buildGraph(tokens: Token[], spec: string): Graph {
  const tokenIndex: number[] = []
  tokens.forEach((t, i) => {
    if (!t.punct) tokenIndex.push(i)
  })
  const words = tokenIndex.map((i) => tokens[i]!)
  const n = words.length
  const heads = new Array<number>(n).fill(-2)
  const edges: Edge[] = []
  for (const part of spec.split(',').map((p) => p.trim()).filter(Boolean)) {
    const m = part.match(/^(\d+)>(\d+)\s+([a-z]+)$/)
    if (!m) throw new GraphError(`Не разобрать связь «${part}»`)
    const dep = Number(m[1]) - 1
    const head = Number(m[2]) - 1
    const rel = m[3] as Rel
    if (!Object.hasOwn(RELS, rel)) throw new GraphError(`Неизвестное отношение «${rel}»`)
    if (dep < 0 || dep >= n || head < 0 || head >= n) throw new GraphError(`Номер вне предложения в «${part}» (слов ${n})`)
    if (dep === head) throw new GraphError(`Слово ссылается само на себя в «${part}»`)
    if (heads[dep] !== -2) throw new GraphError(`У слова ${dep + 1} два хозяина`)
    heads[dep] = head
    edges.push({ dep, head, rel })
  }
  const roots = heads.flatMap((h, i) => (h === -2 ? [i] : []))
  if (roots.length !== 1) {
    throw new GraphError(`Корней ${roots.length} (${roots.map((r) => words[r]?.text).join(', ')}): нужен ровно один — сказуемое`)
  }
  const root = roots[0]!
  heads[root] = -1
  for (let i = 0; i < n; i++) {
    const seen = new Set<number>()
    let cur = i
    while (cur !== -1) {
      if (seen.has(cur)) throw new GraphError(`Цикл через слово ${i + 1}`)
      seen.add(cur)
      cur = heads[cur]!
    }
  }
  return { words, tokenIndex, root, edges, heads }
}

/** Член предложения слова с учётом однородных: conj наследует роль первого однородного. */
export function memberOf(graph: Graph, word: number): Exclude<Member, 'same'> {
  if (word === graph.root) return 'predicate'
  const edge = graph.edges.find((e) => e.dep === word)
  if (!edge) return 'service'
  const member = RELS[edge.rel].member
  return member === 'same' ? memberOf(graph, edge.head) : member
}

/** Группа слов (поддерево): слово и всё, что от него зависит. Так из графа получаются NP / VP / PP. */
export function subtree(graph: Graph, word: number): number[] {
  const out = [word]
  for (const e of graph.edges) if (e.head === word) out.push(...subtree(graph, e.dep))
  return out.sort((a, b) => a - b)
}
