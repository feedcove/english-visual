#!/usr/bin/env node
// После vite build собирает dist/grammar.html: один файл со встроенными JS, CSS и иконкой.
// Открывается двойным кликом (file://) без сервера и без интернета. Офлайн-кеш (service worker) там не нужен.
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = new URL('../dist/', import.meta.url).pathname
let html = readFileSync(join(dist, 'index.html'), 'utf8')

html = html.replace(/<script type="module" crossorigin src="\.\/(assets\/[^"]+\.js)"><\/script>/, (_, file) => {
  const js = readFileSync(join(dist, file), 'utf8').replace(/<\/script/gi, '<\\/script')
  return `<script type="module">${js}</script>`
})
html = html.replace(/<link rel="stylesheet" crossorigin href="\.\/(assets\/[^"]+\.css)">/, (_, file) => `<style>${readFileSync(join(dist, file), 'utf8')}</style>`)
const icon = readFileSync(join(dist, 'icon.svg'), 'utf8')
html = html.replace(/<link rel="icon" href="\.\/icon\.svg"[^>]*>/, `<link rel="icon" href="data:image/svg+xml,${encodeURIComponent(icon)}">`)
html = html.replace(/\s*<link rel="manifest"[^>]*>/, '').replace(/\s*<link rel="apple-touch-icon"[^>]*>/, '')

if (/\.\/assets\/|\.\/icon\.svg/.test(html)) throw new Error('остались внешние ссылки на assets')
writeFileSync(join(dist, 'grammar.html'), html)
console.log(`dist/grammar.html ${(html.length / 1024).toFixed(0)} КБ`)
