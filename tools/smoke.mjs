#!/usr/bin/env node
// Смоук-тест в headless Chrome: проходит утреннее занятие целиком с чистым прогрессем,
// отвечает то верно, то неверно, проверяет итог, экраны и отсутствие ошибок в консоли.
// node tools/smoke.mjs [baseUrl=http://localhost:5173] [outDir]
import { mkdirSync } from 'node:fs'
import { launch, sleep } from './cdp.mjs'

const base = process.argv[2] ?? 'http://localhost:5173'
const out = process.argv[3] ?? '/tmp/english-smoke'
mkdirSync(out, { recursive: true })

const b = await launch({ width: Number(process.env.SMOKE_WIDTH ?? 390), height: 860 })
const fail = (msg) => {
  console.error('FAIL', msg)
  b.close()
  process.exit(1)
}

await b.goto(`${base}/#/`)
await b.shot(`${out}/01-today.png`)
const hasStart = await b.evaluate(`!!document.querySelector('a[href="#/session/daily"]')`)
if (!hasStart) fail('на «Сегодня» нет кнопки «Начать»')
await b.evaluate(`document.querySelector('a[href="#/session/daily"]').click()`)
await sleep(500)

// Один шаг занятия: смотрим, что на экране, и действуем как человек.
const STEP = `(() => {
  const q = (s) => document.querySelector(s)
  const qa = (s) => [...document.querySelectorAll(s)]
  const byText = (sel, t) => qa(sel).find((e) => e.textContent.trim().startsWith(t))
  if (q('.summary') || q('.k-empty')) return 'summary'
  const next = byText('button', 'Дальше')
  if (next) { next.click(); return 'next' }
  const intro = byText('button', 'Начать практику')
  if (intro) { intro.click(); return 'intro' }
  const go = byText('button', 'Поехали')
  if (go) { go.click(); return 'speed-start' }
  if (q('.speed')) { const o = qa('.speed-option'); o[Math.floor(Math.random()*o.length)]?.click(); return 'speed' }
  const opts = qa('.ex-option:not([disabled])')
  if (opts.length) { opts[Math.floor(Math.random() * opts.length)].click(); return 'choose' }
  const input = q('.ex-field input:not([disabled])')
  if (input) {
    const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
    set.call(input, Math.random() < 0.5 ? 'him' : 'they')
    input.dispatchEvent(new Event('input', { bubbles: true }))
    q('.ex-type button[type=submit]')?.click()
    return 'type'
  }
  const tiles = qa('.ex-pool .tile')
  if (tiles.length) { tiles.forEach((t) => t.click()); return 'tiles' }
  const check = byText('button', 'Проверить')
  if (check && !check.disabled) { check.click(); return 'check' }
  const pos = qa('.pos-btn')
  if (pos.length) { pos[Math.floor(Math.random() * pos.length)].click(); return 'tag' }
  const words = qa('.ex-pick .w-btn')
  if (words.length) { words[Math.floor(Math.random() * words.length)].click(); return 'pick' }
  return 'unknown:' + (q('main')?.className ?? '')
})()`

const seen = {}
let shots = 0
for (let i = 0; i < 200; i++) {
  const action = await b.evaluate(STEP)
  seen[action] = (seen[action] ?? 0) + 1
  if (action === 'summary') break
  if (action.startsWith('unknown')) {
    await b.shot(`${out}/stuck.png`)
    fail(`непонятный экран: ${action}`)
  }
  if ((action === 'choose' || action === 'type' || action === 'check') && shots < 4) {
    await sleep(250)
    await b.shot(`${out}/1${shots}-${action}.png`, true)
    shots++
  }
  await sleep(action === 'speed' ? 700 : action === 'next' ? 250 : 350)
}
if (!(await b.evaluate(`!!document.querySelector('.summary, .k-empty')`))) fail('занятие не дошло до итога')
await b.shot(`${out}/20-summary.png`, true)

// Тематические занятия: покрыть все форматы (раскраска, граф, поиск слова, плитки, выбор по схеме).
const topicList = (process.env.SMOKE_TOPICS ?? 'pos-ru,sentence-graph,word-order,tense-map,articles,pos-bridge,cascade-reading,clear-sentence').split(',').filter(Boolean)
for (const topic of topicList) {
  await b.goto(`${base}/#/session/topic?topic=${topic}`)
  for (let i = 0; i < 160; i++) {
    const action = await b.evaluate(STEP)
    seen[action] = (seen[action] ?? 0) + 1
    if (action === 'summary') break
    if (action.startsWith('unknown')) {
      await b.shot(`${out}/stuck-${topic}.png`)
      fail(`непонятный экран в теме ${topic}: ${action}`)
    }
    if (['tag', 'pick', 'tiles'].includes(action) && !seen[`shot-${action}`]) {
      seen[`shot-${action}`] = 1
      await sleep(200)
      await b.shot(`${out}/2-${action}-${topic}.png`, true)
    }
    await sleep(action === 'pick' ? 1200 : 300)
  }
  if (!(await b.evaluate(`!!document.querySelector('.summary, .k-empty')`))) fail(`тема ${topic} не дошла до итога`)
}

// «Мои предложения»: вставить CoNLL-U, разобрать, добавить и потренировать.
const CONLLU = ['# text = Мама не мыла эту раму.', '1\tМама\tмама\tNOUN\t_\t_\t3\tnsubj\t_\t_', '2\tне\tне\tPART\t_\t_\t3\tadvmod\t_\t_', '3\tмыла\tмыть\tVERB\t_\t_\t0\troot\t_\t_', '4\tэту\tэтот\tDET\t_\t_\t5\tdet\t_\t_', '5\tраму\tрама\tNOUN\t_\t_\t3\tobj\t_\tSpaceAfter=No', '6\t.\t.\tPUNCT\t_\t_\t3\tpunct\t_\t_'].join('\n')
await b.goto(`${base}/#/mine`)
await b.evaluate(`(() => {
  const ta = document.querySelector('.mine-input')
  const set = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set
  set.call(ta, ${JSON.stringify(CONLLU)})
  ta.dispatchEvent(new Event('input', { bubbles: true }))
})()`)
await sleep(200)
await b.evaluate(`[...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Разобрать').click()`)
await sleep(400)
if (!(await b.evaluate(`!!document.querySelector('.mine-preview .cascade')`))) fail('«Мои предложения»: нет предпросмотра лесенкой')
await b.shot(`${out}/4-mine-preview.png`, true)
await b.evaluate(`[...document.querySelectorAll('button')].find((x) => x.textContent.includes('Добавить в тренажёр')).click()`)
await sleep(400)
const saved = await b.evaluate(`JSON.parse(localStorage.getItem('ev:v1')).custom.length`)
if (saved !== 1) fail(`«Мои предложения»: сохранено ${saved}, ожидалось 1`)
await b.goto(`${base}/#/session/topic?topic=mine`)
for (let i = 0; i < 120; i++) {
  const action = await b.evaluate(STEP)
  seen[`mine-${action}`] = (seen[`mine-${action}`] ?? 0) + 1
  if (action === 'summary') break
  if (action.startsWith('unknown')) fail(`«Мои предложения»: непонятный экран ${action}`)
  await sleep(action === 'pick' ? 1200 : 300)
}
if (!(await b.evaluate(`!!document.querySelector('.summary, .k-empty')`))) fail('«Мои предложения»: занятие не дошло до итога')

for (const [name, path] of [['topics', '#/topics'], ['topic', '#/topic/pron-personal'], ['progress', '#/progress'], ['settings', '#/settings'], ['method', '#/method'], ['today-after', '#/']]) {
  await b.goto(`${base}/${path}`)
  const overflow = await b.evaluate('document.documentElement.scrollWidth > innerWidth')
  if (overflow) console.warn(`WARN горизонтальная прокрутка на ${name}`)
  await b.shot(`${out}/3-${name}.png`, true)
}
const stored = await b.evaluate(`(() => { const s = JSON.parse(localStorage.getItem('ev:v1') || 'null'); return s && { cards: Object.keys(s.cards).length, log: s.log.length, days: Object.keys(s.days) } })()`)
console.log('actions', JSON.stringify(seen))
console.log('stored', JSON.stringify(stored))
if (!stored || stored.cards === 0) fail('прогресс не сохранился')
if (b.errors.length) fail(`ошибки в консоли:\n${b.errors.join('\n')}`)
console.log('OK', out)
b.close()
