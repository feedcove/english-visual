#!/usr/bin/env node
// Скриншот страницы на заданной ширине через Chrome DevTools Protocol (headless Chrome не умеет окно уже ~500 px).
// node tools/shot.mjs <url> <out.png> [width=390] [height=900] [--full]
import { spawn } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const [url, out, w = '390', h = '900', ...flags] = process.argv.slice(2)
if (!url || !out) {
  console.error('usage: node tools/shot.mjs <url> <out.png> [width] [height] [--full]')
  process.exit(2)
}
const full = flags.includes('--full')
const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const port = 9300 + Math.floor(Math.random() * 600)
const profile = mkdtempSync(join(tmpdir(), 'shot-'))
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank'], {
  stdio: 'ignore',
})

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let target
for (let i = 0; i < 50 && !target; i++) {
  await sleep(150)
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json()
    target = list.find((t) => t.type === 'page')
  } catch {}
}
if (!target) {
  chrome.kill()
  throw new Error('Chrome не запустился')
}

const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise((r) => ws.addEventListener('open', r, { once: true }))
let id = 0
const pending = new Map()
ws.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data)
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg)
    pending.delete(msg.id)
  }
})
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const n = ++id
    pending.set(n, (m) => (m.error ? reject(new Error(m.error.message)) : resolve(m.result)))
    ws.send(JSON.stringify({ id: n, method, params }))
  })

const width = Number(w)
const height = Number(h)
await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 2, mobile: width < 768 })
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'dark' }] })
await send('Page.enable')
await send('Page.navigate', { url })
await sleep(2500)
const errors = await send('Runtime.evaluate', {
  expression: `JSON.stringify({ overflow: document.documentElement.scrollWidth > innerWidth, sw: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight })`,
  returnByValue: true,
})
let clip
if (full) {
  const { h: fullH } = JSON.parse(errors.result.value)
  clip = { x: 0, y: 0, width, height: Math.min(fullH, 8000), scale: 1 }
}
const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: full, ...(clip ? { clip } : {}) })
writeFileSync(out, Buffer.from(shot.data, 'base64'))
console.log(out, errors.result.value)
ws.close()
chrome.kill()
