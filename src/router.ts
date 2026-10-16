import { useEffect, useState } from 'react'
import type { SessionKind } from './engine/session'

// Маршрут живёт в hash: работает и с file://, и на статическом хостинге без настройки сервера.
export type Route =
  | { name: 'today' }
  | { name: 'topics' }
  | { name: 'topic'; id: string }
  | { name: 'session'; kind: SessionKind; topic?: string }
  | { name: 'progress' }
  | { name: 'settings' }
  | { name: 'method' }
  | { name: 'mine' }
  | { name: 'stories'; topic?: string; s?: number; f?: number }
  | { name: 'kit' }
  | { name: 'gallery'; id?: string; focus?: string; view?: string }

export function parseRoute(hash: string): Route {
  const [path = '', query = ''] = hash.replace(/^#\/?/, '').split('?')
  const parts = path.split('/').filter(Boolean)
  const params = new URLSearchParams(query)
  switch (parts[0]) {
    case 'topics':
      return { name: 'topics' }
    case 'topic':
      return parts[1] ? { name: 'topic', id: decodeURIComponent(parts[1]) } : { name: 'topics' }
    case 'session': {
      const kind = (parts[1] ?? 'daily') as SessionKind
      return { name: 'session', kind, topic: params.get('topic') ?? undefined }
    }
    case 'progress':
      return { name: 'progress' }
    case 'settings':
      return { name: 'settings' }
    case 'method':
      return { name: 'method' }
    case 'mine':
      return { name: 'mine' }
    case 'stories': {
      const num = (k: string) => (params.has(k) ? Number(params.get(k)) : undefined)
      return { name: 'stories', topic: parts[1], s: num('s'), f: num('f') }
    }
    case 'kit':
      return { name: 'kit' }
    case 'gallery':
      return { name: 'gallery', id: parts[1], focus: params.get('focus') ?? undefined, view: params.get('view') ?? undefined }
    default:
      return { name: 'today' }
  }
}

export function href(route: Route): string {
  switch (route.name) {
    case 'today':
      return '#/'
    case 'topic':
      return `#/topic/${encodeURIComponent(route.id)}`
    case 'session':
      return `#/session/${route.kind}${route.topic ? `?topic=${encodeURIComponent(route.topic)}` : ''}`
    case 'gallery':
      return `#/gallery${route.id ? `/${route.id}` : ''}`
    case 'stories':
      return `#/stories${route.topic ? `/${route.topic}` : ''}`
    default:
      return `#/${route.name}`
  }
}

export function navigate(route: Route, replace = false) {
  const next = href(route)
  if (replace) history.replaceState(null, '', next)
  else location.hash = next
  if (replace) window.dispatchEvent(new HashChangeEvent('hashchange'))
}

/** Номер перехода: новый переход на тот же адрес (например, ещё одно занятие) пересоздаёт экран. */
export let routeVersion = 0

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseRoute(location.hash))
  useEffect(() => {
    const onChange = () => {
      routeVersion++
      setRoute(parseRoute(location.hash))
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}
