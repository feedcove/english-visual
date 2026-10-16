const CACHE = 'english-dyykud'
const FILES = ["./","./assets/index-CjO-v0g0.js","./assets/index-aapIAAO5.css"]
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
