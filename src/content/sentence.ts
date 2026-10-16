import type { Pos } from './types'

// Мини-разметка предложений. Пример: "I_P saw_V [him_P] at_I the_D station_N yesterday_R ."
// - слова через пробел; часть речи — суффикс _X: N noun, P pronoun, D determiner/article, M numeral, J adjective,
//   V verb, A auxiliary/modal, R adverb, I preposition, C conjunction, X particle (not, to, не, бы);
//   без суффикса — нейтральное слово. Русские предложения размечаются так же: Мама_N мыла_V раму_N .
// - ~ склеивает несколько слов в один токен: in~front~of_I, have~been_A
// - [ ] — пропуск (ответ) для режима gap: [him_P]. Ровно один токен, многословный — через ~
// - { } — подсвеченная цель без пропуска (для режима choice): She_P runs_V {fast_R}.
// - + в начале — без пробела перед токеном: It_P +'s_A, don't пишется слитно: don't_A
// - знаки .,!?;: в конце слова отделяются сами: yesterday_R.

export const POS_CODES: Record<string, Pos> = {
  N: 'noun',
  P: 'pron',
  D: 'det',
  M: 'num',
  J: 'adj',
  V: 'verb',
  A: 'aux',
  R: 'adv',
  I: 'prep',
  C: 'conj',
  X: 'part',
}

export interface Token {
  text: string
  pos?: Pos
  gap?: boolean
  /** Подсвеченная цель вопроса (не пропуск). */
  mark?: boolean
  punct?: boolean
  /** Без пробела перед токеном. */
  join?: boolean
}

const TRAILING = /[.,!?;:…”"»)]+$/
const LEADING = /^[“"«(]+/
const WORD = /^(\+)?([[{])?(.+?)(?:_([A-Z]))?([\]}])?$/

export class SentenceError extends Error {}

export function parseSentence(source: string): Token[] {
  const tokens: Token[] = []
  const chunks = source.trim().split(/\s+/).filter(Boolean)
  for (const raw of chunks) {
    let chunk = raw
    const lead = chunk.match(LEADING)
    if (lead) {
      tokens.push({ text: lead[0], punct: true })
      chunk = chunk.slice(lead[0].length)
    }
    let trail = ''
    const t = chunk.match(TRAILING)
    // Закрывающая скобка пропуска может стоять перед пунктуацией: [him_P].
    if (t && t.index !== undefined && t.index > 0) {
      trail = t[0]
      chunk = chunk.slice(0, t.index)
    }
    if (chunk) tokens.push(parseWord(chunk, raw))
    if (trail) tokens.push({ text: trail, punct: true, join: true })
  }
  // Первая пунктуация в начале строки не может «прилипать».
  if (tokens[0]) tokens[0].join = false
  return tokens
}

function parseWord(chunk: string, raw: string): Token {
  if (/^[.,!?;:…]+$/.test(chunk)) return { text: chunk, punct: true, join: true }
  const m = chunk.match(WORD)
  if (!m) throw new SentenceError(`Не разобрать «${raw}»`)
  const [, plus, open, body, code, close] = m
  if (!body) throw new SentenceError(`Пустое слово в «${raw}»`)
  if ((open === '[') !== (close === ']') || (open === '{') !== (close === '}')) {
    throw new SentenceError(`Скобки не закрыты в «${raw}»`)
  }
  if (/[[\]{}_]/.test(body)) throw new SentenceError(`Лишние символы в «${raw}»`)
  const token: Token = { text: body.replace(/~/g, ' ') }
  if (code) {
    const pos = POS_CODES[code]
    if (!pos) throw new SentenceError(`Неизвестная часть речи _${code} в «${raw}»`)
    token.pos = pos
  }
  if (open === '[') token.gap = true
  if (open === '{') token.mark = true
  if (plus) token.join = true
  return token
}

/** Текст предложения с правильными пробелами. gapAs подставляется вместо пропуска. */
export function renderText(tokens: Token[], gapAs?: string): string {
  let out = ''
  tokens.forEach((tok, i) => {
    const text = tok.gap && gapAs !== undefined ? gapAs : tok.text
    const afterOpen = i > 0 && tokens[i - 1]?.punct && LEADING.test(tokens[i - 1]!.text)
    if (i > 0 && !tok.join && !afterOpen) out += ' '
    out += text
  })
  return out
}

export function gapToken(tokens: Token[]): Token | undefined {
  return tokens.find((t) => t.gap)
}

export function countGaps(tokens: Token[]): number {
  return tokens.filter((t) => t.gap).length
}

/** Плитки для сборки предложения: слова без пунктуации, «прилипшие» токены (+'s) — в одной плитке. */
export function tilesOf(tokens: Token[]): string[] {
  const tiles: string[] = []
  for (const tok of tokens) {
    if (tok.punct) continue
    if (tok.join && tiles.length) tiles[tiles.length - 1] += tok.text
    else tiles.push(tok.text)
  }
  return tiles
}

/** Пунктуация в конце предложения, чтобы показать её после собранных плиток. */
export function trailingPunct(tokens: Token[]): string {
  const last = tokens[tokens.length - 1]
  return last?.punct ? last.text : ''
}
