import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Генерирует dist/sw.js со списком всех файлов сборки: приложение работает офлайн
// после первого открытия. Версия кеша = хеш списка, поэтому новая сборка вытесняет старую.
function offlineServiceWorker(): Plugin {
  return {
    name: 'offline-service-worker',
    apply: 'build',
    generateBundle(_options, bundle) {
      const assets = Object.keys(bundle).filter((name) => name !== 'sw.js')
      const files = ['./', ...assets.map((name) => `./${name}`)]
      const version = hash(files.join('|'))
      this.emitFile({
        type: 'asset',
        fileName: 'sw.js',
        source: serviceWorkerSource(version, files),
      })
    },
  }
}

function hash(input: string): string {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) h = Math.imul(h ^ input.charCodeAt(i), 16777619)
  return (h >>> 0).toString(36)
}

function serviceWorkerSource(version: string, files: string[]): string {
  return `const CACHE = 'english-${version}'
const FILES = ${JSON.stringify(files)}
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()))
})
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})
self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return
  if (request.mode === 'navigate') {
    event.respondWith(caches.match('./', { ignoreSearch: true }).then((hit) => hit || fetch(request)))
    return
  }
  event.respondWith(caches.match(request).then((hit) => hit || fetch(request)))
})
`
}

export default defineConfig({
  base: './',
  plugins: [react(), offlineServiceWorker()],
  build: {
    target: 'es2022',
    assetsInlineLimit: 0,
    // Один бандл намеренно: dist/grammar.html открывается через file://, где динамические импорты не работают.
    // Основной вес — контент 44 тем; в gzip около 350 КБ, после первого открытия всё берётся из офлайн-кеша.
    chunkSizeWarningLimit: 1600,
  },
})
