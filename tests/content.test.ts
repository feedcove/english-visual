import { describe, expect, it } from 'vitest'
import { TOPICS } from '../src/content/catalog'
import { topicBodies, topics } from '../src/content'
import { buildGraph } from '../src/content/graph'
import { countGaps, gapToken, parseSentence, tilesOf } from '../src/content/sentence'
import type { Item, RefBlock, Topic, Variant, VisualRef } from '../src/content/types'
import { sameAnswer } from '../src/engine/check'
import { isVisualId, VISUALS } from '../src/visuals/catalog'

// Валидатор контента: `npm run validate`. Сообщения — по-русски, с id навыка, чтобы автор сразу нашёл место.

const catalogIds = new Set(TOPICS.map((t) => t.id))

function checkVisual(ref: VisualRef, where: string, errors: string[]) {
  if (!isVisualId(ref.id)) return void errors.push(`${where}: нет схемы «${ref.id}»`)
  const keys: readonly string[] = VISUALS[ref.id].focus
  if (ref.focus && !keys.includes(ref.focus)) errors.push(`${where}: у схемы ${ref.id} нет focus «${ref.focus}»`)
}

function parse(s: string, where: string, errors: string[]) {
  try {
    return parseSentence(s)
  } catch (e) {
    errors.push(`${where}: ${(e as Error).message}`)
    return null
  }
}

function checkVariant(item: Item, v: Variant, n: number, errors: string[]) {
  const where = `${item.id} #${n + 1}`
  const mode = item.mode ?? 'gap'
  if (v.visual) checkVisual(v.visual, where, errors)
  if (v.why && v.why.length > 180) errors.push(`${where}: why длиннее 180 символов`)
  if (v.options && new Set(v.options.map((o) => o.toLowerCase())).size !== v.options.length) {
    errors.push(`${where}: повторяются варианты`)
  }
  const tokens = v.s ? parse(v.s, where, errors) : null

  if (mode === 'gap') {
    if (!v.s || !tokens) return void (v.s || errors.push(`${where}: gap без s`))
    if (countGaps(tokens) !== 1) return void errors.push(`${where}: в gap нужен ровно один пропуск [ ]`)
    const gap = gapToken(tokens)!
    if (!gap.pos) errors.push(`${where}: у пропуска нет части речи (_X)`)
    if (!v.options?.length) errors.push(`${where}: нет options (неверных вариантов) для режима выбора`)
    for (const o of v.options ?? []) if (sameAnswer(o, gap.text)) errors.push(`${where}: вариант «${o}» совпадает с ответом`)
    if (!v.tr) errors.push(`${where}: нет перевода tr`)
    if (v.answer) errors.push(`${where}: answer только для choice, в gap ответ — пропуск`)
  }
  if (mode === 'order') {
    if (!v.s || !tokens) return void (v.s || errors.push(`${where}: order без s`))
    if (countGaps(tokens) > 0) errors.push(`${where}: в order не бывает пропусков`)
    if (tilesOf(tokens).length < 3) errors.push(`${where}: в order меньше 3 плиток`)
    if (!v.tr) errors.push(`${where}: нет перевода tr`)
    for (const f of v.from ?? []) parse(f, `${where} from`, errors)
    // Другой верный порядок может использовать и лишние плитки (options): они тоже лежат в наборе.
    const pool = [...tilesOf(tokens), ...(v.options ?? [])].map((t) => t.toLowerCase())
    for (const a of v.accept ?? []) {
      const alt = parse(a, `${where} accept`, errors)
      if (!alt) continue
      const left = [...pool]
      for (const tile of tilesOf(alt).map((t) => t.toLowerCase())) {
        const at = left.indexOf(tile)
        if (at === -1) {
          errors.push(`${where}: accept «${a}»: плитки «${tile}» нет в наборе`)
          break
        }
        left.splice(at, 1)
      }
    }
  }
  if (mode === 'choice') {
    if (!v.answer) errors.push(`${where}: в choice нужен answer`)
    if (!v.options?.length) errors.push(`${where}: в choice нужны options`)
    if (!v.s && !v.visual && !v.q) errors.push(`${where}: в choice нужен s, visual или q`)
    if (tokens && countGaps(tokens) > 0) errors.push(`${where}: в choice вместо [пропуска] используй {цель}`)
    for (const o of v.options ?? []) if (v.answer && sameAnswer(o, v.answer)) errors.push(`${where}: вариант «${o}» совпадает с ответом`)
  }
  if (mode === 'tag' || mode === 'graph') {
    if (!v.s || !tokens) return void (v.s || errors.push(`${where}: ${mode} без s`))
    if (countGaps(tokens) > 0) errors.push(`${where}: в ${mode} не бывает пропусков`)
    const words = tokens.filter((t) => !t.punct)
    const untagged = words.filter((t) => !t.pos).map((t) => t.text)
    if (untagged.length) errors.push(`${where}: без части речи: ${untagged.join(', ')}`)
    if (!v.tr) errors.push(`${where}: нет перевода tr`)
  }
  if (mode === 'pick') {
    if (!v.s || !tokens) return void (v.s || errors.push(`${where}: pick без s`))
    if (!v.q) errors.push(`${where}: в pick нужен q — что искать`)
    if (!tokens.some((t) => t.mark)) errors.push(`${where}: в pick отметь верные слова {так}`)
    if (countGaps(tokens) > 0) errors.push(`${where}: в pick не бывает пропусков`)
    if (v.model) {
      const m = parse(v.model, `${where} model`, errors)
      if (m && m.filter((t) => t.mark).length !== 1) errors.push(`${where}: в model ровно одна {цель}`)
    }
  }
  if (mode === 'graph' && !v.graph) errors.push(`${where}: нет graph`)
  if (v.graph) {
    // graph бывает у graph, а у pick и choice — чтобы показать предложение лесенкой.
    if (mode === 'gap' || mode === 'order') errors.push(`${where}: graph не нужен в режиме ${mode}`)
    else if (tokens) {
      try {
        buildGraph(tokens, v.graph)
      } catch (e) {
        errors.push(`${where}: граф: ${(e as Error).message}`)
      }
      const untagged = tokens.filter((t) => !t.punct && !t.pos).map((t) => t.text)
      if (untagged.length) errors.push(`${where}: в предложении с graph нужны части речи у всех слов: ${untagged.join(', ')}`)
    }
  }
}

function checkRef(topic: Topic, block: RefBlock, n: number, errors: string[]) {
  const where = `${topic.id} ref #${n + 1}`
  switch (block.kind) {
    case 'visual':
      return checkVisual(block.visual, where, errors)
    case 'rule':
      if (block.text.length > 420) errors.push(`${where}: правило длиннее 420 символов — разбей`)
      return block.examples?.forEach((e, i) => parse(e.s, `${where} пример ${i + 1}`, errors))
    case 'table':
      return block.rows.forEach((row, r) => {
        if (row.length !== block.head.length) errors.push(`${where}: строка ${r + 1} не совпадает с шапкой`)
        row.forEach((cell) => parse(cell, `${where} ячейка`, errors))
      })
    case 'contrast':
      parse(block.ru, where, errors)
      return void parse(block.en, where, errors)
    case 'mistakes':
      return block.items.forEach((m) => {
        parse(m.wrong, `${where} wrong`, errors)
        parse(m.right, `${where} right`, errors)
      })
    case 'tip':
      return
  }
}

describe('контент', () => {
  it('у каждого файла темы есть паспорт в catalog.ts', () => {
    const orphans = [...topicBodies.keys()].filter((id) => !catalogIds.has(id))
    expect(orphans, 'файлы без паспорта').toEqual([])
  })

  it('схемы тем существуют', () => {
    const bad = TOPICS.filter((t) => !isVisualId(t.visual)).map((t) => `${t.id}: ${t.visual}`)
    expect(bad).toEqual([])
  })

  it('id навыков уникальны и начинаются с id темы', () => {
    const seen = new Set<string>()
    const errors: string[] = []
    for (const topic of topics)
      for (const item of topic.items) {
        if (!item.id.startsWith(`${topic.id}.`)) errors.push(`${item.id}: нужен префикс ${topic.id}.`)
        if (seen.has(item.id)) errors.push(`${item.id}: повтор`)
        seen.add(item.id)
      }
    expect(errors).toEqual([])
  })

  for (const topic of topics) {
    it(`тема ${topic.id}`, () => {
      const errors: string[] = []
      if (!topic.summary) errors.push('нет summary')
      if (!topic.ref.some((b) => b.kind === 'rule')) errors.push('в справочнике нет ни одного rule')
      if (topic.items.length < Math.ceil(topic.size * 0.6)) {
        errors.push(`навыков ${topic.items.length}, ожидается около ${topic.size}`)
      }
      topic.ref.forEach((b, i) => checkRef(topic, b, i, errors))
      const focusKeys: readonly string[] = isVisualId(topic.visual) ? VISUALS[topic.visual].focus : []
      for (const item of topic.items) {
        if (!item.skill || item.skill.length > 80) errors.push(`${item.id}: skill пустой или длиннее 80`)
        if (item.focus && !focusKeys.includes(item.focus)) errors.push(`${item.id}: у ${topic.visual} нет focus «${item.focus}»`)
        const mode = item.mode ?? 'gap'
        if ((mode === 'gap' || mode === 'order' || mode === 'pick') && item.variants.length < 2) errors.push(`${item.id}: нужно хотя бы 2 варианта`)
        if (!item.variants.length) errors.push(`${item.id}: нет вариантов`)
        item.variants.forEach((v, n) => checkVariant(item, v, n, errors))
      }
      expect(errors).toEqual([])
    })
  }
})
