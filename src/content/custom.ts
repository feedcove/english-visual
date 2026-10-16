import type { CustomSentence, Item, Topic } from './types'

export const CUSTOM_TOPIC_ID = 'mine'

/** «Мои предложения»: каждое своё предложение даёт два навыка — граф и раскраску частей речи. */
export function customTopic(sentences: CustomSentence[]): Topic | null {
  if (!sentences.length) return null
  const items: Item[] = sentences.flatMap((c) => {
    const variant = { s: c.s, graph: c.graph, lang: c.lang, tr: c.text }
    return [
      { id: `${CUSTOM_TOPIC_ID}.${c.id}.graph`, mode: 'graph', skill: `Граф: ${short(c.text)}`, variants: [variant] },
      { id: `${CUSTOM_TOPIC_ID}.${c.id}.tag`, mode: 'tag', skill: `Части речи: ${short(c.text)}`, variants: [{ ...variant, graph: undefined }] },
    ] satisfies Item[]
  })
  return {
    id: CUSTOM_TOPIC_ID,
    area: 'words',
    title: 'Мои предложения',
    titleEn: 'My sentences',
    level: 'B1',
    visual: 'sentence-graph',
    scope: '',
    size: items.length,
    summary: 'Свои предложения, разобранные парсером: граф и части речи. Разбор автоматический — это черновик, он может ошибаться.',
    ref: [],
    items,
  }
}

function short(text: string): string {
  return text.length > 48 ? `${text.slice(0, 46)}…` : text
}
