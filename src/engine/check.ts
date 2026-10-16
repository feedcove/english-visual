// Проверка ответа без сервера: нормализация строки + эквивалентность сокращений.

const CONTRACTIONS: [RegExp, string][] = [
  [/\bwon't\b/g, 'will not'],
  [/\bshan't\b/g, 'shall not'],
  [/\bcan't\b/g, 'can not'],
  [/\bcannot\b/g, 'can not'],
  [/\bain't\b/g, 'am not'],
  [/\b(\w+)n't\b/g, '$1 not'],
  [/\bi'm\b/g, 'i am'],
  [/\b(you|we|they)'re\b/g, '$1 are'],
  [/\b(i|you|we|they|he|she|it|there|that)'ve\b/g, '$1 have'],
  [/\b(i|you|we|they|he|she|it|there|that)'ll\b/g, '$1 will'],
  [/\b(i|you|we|they|he|she|it)'d\b/g, '$1 would'],
  [/\b(he|she|it|there|that|what|where|who|here)'s\b/g, '$1 is'],
]

/** Строка для сравнения: регистр, апострофы, пробелы, конечная пунктуация. */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[‘’ʼ`´]/g, "'")
    .replace(/[“”«»]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\s*[.!?,;:]+$/g, '')
}

/** Нормализация + развёрнутые сокращения: «isn't» = «is not». */
export function canonical(input: string): string {
  let s = normalize(input)
  for (const [re, to] of CONTRACTIONS) s = s.replace(re, to)
  return s.replace(/\s+/g, ' ').trim()
}

export function sameAnswer(a: string, b: string): boolean {
  return canonical(a) === canonical(b)
}

export function matchesAny(input: string, answers: string[]): boolean {
  const c = canonical(input)
  return c.length > 0 && answers.some((a) => canonical(a) === c)
}

/**
 * Похоже на опечатку: одна буква в длинном слове, но не там, где живёт грамматика.
 * Не опечатка: совпадение с неверным вариантом, правка в последних трёх буквах (окончания -s, -ed, -er)
 * и лишняя/пропущенная удвоенная буква (bigger / biger, stopped / stoped).
 */
export function isTypo(input: string, answers: string[], wrong: string[] = []): boolean {
  const c = canonical(input)
  if (wrong.some((w) => canonical(w) === c)) return false
  return answers.some((a) => {
    const t = canonical(a)
    if (t.length < 6 || levenshtein(c, t) !== 1) return false
    const at = editPosition(c, t)
    if (at >= Math.min(c.length, t.length) - 3) return false
    const longer = c.length > t.length ? c : t
    if (c.length !== t.length && (longer[at] === longer[at - 1] || longer[at] === longer[at + 1])) return false
    return true
  })
}

function editPosition(a: string, b: string): number {
  let i = 0
  while (i < a.length && i < b.length && a[i] === b[i]) i++
  return i
}

function levenshtein(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 1) return 2
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0]!
    prev[0] = i
    for (let j = 1; j <= b.length; j++) {
      const up = prev[j]!
      prev[j] = Math.min(prev[j]! + 1, prev[j - 1]! + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1))
      diag = up
    }
  }
  return prev[b.length]!
}
