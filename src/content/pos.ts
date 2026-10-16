import type { Pos } from './types'

// Части речи: подписи, вопросы и формы-глифы. Цвета — в src/styles/pos.css (из движка UI-кита).
// Семьи кодируются формой: предметы — угловатые, действия — круглые, связки — линии.

export type Glyph = 'square' | 'square-o' | 'triangle' | 'triangle-o' | 'diamond' | 'circle' | 'ring' | 'dot' | 'arch' | 'bars' | 'tick'

export type Family = 'things' | 'actions' | 'links'

export interface PosMeta {
  code: string
  en: string
  ru: string
  short: string
  /** Школьный вопрос, по которому узнаём часть речи. */
  q: string
  family: Family
  glyph: Glyph
}

export const POS: Record<Pos, PosMeta> = {
  noun: { code: 'N', en: 'noun', ru: 'существительное', short: 'сущ.', q: 'кто? что?', family: 'things', glyph: 'square' },
  pron: { code: 'P', en: 'pronoun', ru: 'местоимение', short: 'мест.', q: 'вместо кого? чего?', family: 'things', glyph: 'square-o' },
  det: { code: 'D', en: 'article / determiner', ru: 'артикль, определитель', short: 'опр.', q: 'какой именно? который?', family: 'things', glyph: 'triangle' },
  num: { code: 'M', en: 'numeral', ru: 'числительное', short: 'числ.', q: 'сколько? который по счёту?', family: 'things', glyph: 'triangle-o' },
  adj: { code: 'J', en: 'adjective', ru: 'прилагательное', short: 'прил.', q: 'какой? чей?', family: 'things', glyph: 'diamond' },
  verb: { code: 'V', en: 'verb', ru: 'глагол', short: 'глаг.', q: 'что делать? что делает?', family: 'actions', glyph: 'circle' },
  aux: { code: 'A', en: 'auxiliary / modal', ru: 'вспомогательный, модальный', short: 'всп.', q: 'помогает глаголу: время, вопрос, «можно», «надо»', family: 'actions', glyph: 'ring' },
  adv: { code: 'R', en: 'adverb', ru: 'наречие', short: 'нар.', q: 'как? где? когда? насколько?', family: 'actions', glyph: 'dot' },
  prep: { code: 'I', en: 'preposition', ru: 'предлог', short: 'предл.', q: 'связывает слово с другим: в, на, у', family: 'links', glyph: 'arch' },
  conj: { code: 'C', en: 'conjunction', ru: 'союз', short: 'союз', q: 'соединяет слова и предложения: и, но, потому что', family: 'links', glyph: 'bars' },
  part: { code: 'X', en: 'particle', ru: 'частица', short: 'част.', q: 'добавляет оттенок: не, бы, ли; not, to', family: 'links', glyph: 'tick' },
}

export const POS_ORDER: Pos[] = ['noun', 'pron', 'det', 'num', 'adj', 'verb', 'aux', 'adv', 'prep', 'conj', 'part']

export const FAMILIES: Record<Family, { ru: string; hint: string }> = {
  things: { ru: 'предметы', hint: 'угловатые фигуры: называют и уточняют предмет' },
  actions: { ru: 'действия', hint: 'круглые фигуры: действие и его признаки' },
  links: { ru: 'связки', hint: 'линии: сами ничего не называют, связывают' },
}
