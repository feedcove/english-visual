import { useEffect, useMemo } from 'react'
import { setCustomTopic } from './content'
import { customTopic } from './content/custom'
import { getStatus, loadStore, useStore } from './engine/store'
import { href, routeVersion, useRoute } from './router'
import type { Route } from './router'
import { Gallery } from './screens/Gallery'
import { Method } from './screens/Method'
import { Mine } from './screens/Mine'
import { Kit, Stories } from './screens/Stories'
import { ProgressScreen } from './screens/Progress'
import { Session } from './screens/Session'
import { Settings } from './screens/Settings'
import { Today } from './screens/Today'
import { TopicScreen } from './screens/Topic'
import { Topics } from './screens/Topics'
import { Icon, Logo } from './ui/icons'
import type { IconName } from './ui/icons'

loadStore()

const TABS: { route: Route; label: string; icon: IconName; match: Route['name'][] }[] = [
  { route: { name: 'today' }, label: 'Сегодня', icon: 'today', match: ['today'] },
  { route: { name: 'topics' }, label: 'Темы', icon: 'topics', match: ['topics', 'topic', 'mine'] },
  { route: { name: 'progress' }, label: 'Прогресс', icon: 'progress', match: ['progress'] },
  { route: { name: 'settings' }, label: 'Настройки', icon: 'settings', match: ['settings', 'method'] },
]

export function App() {
  const route = useRoute()
  const { custom } = useStore()
  // Свои предложения становятся обычной темой до того, как отрисуются экраны.
  useMemo(() => setCustomTopic(customTopic(custom)), [custom])
  useEffect(() => {
    document.documentElement.dataset.route = route.name
  }, [route.name])
  const inSession = route.name === 'session'
  return (
    <div className="app" data-session={inSession || undefined}>
      {!inSession && <Nav route={route} />}
      <div className="app-main">
        {getStatus() !== 'ok' && !inSession && (
          <p className="storage-warning" role="alert">
            {getStatus() === 'memory'
              ? 'Браузер не даёт сохранять прогресс: занятия работают, но после закрытия вкладки пропадут. Сохрани копию в «Настройках».'
              : 'Сохранённый прогресс был повреждён и отложен в сторону; начинаем с чистого листа.'}
          </p>
        )}
        <Screen route={route} />
      </div>
    </div>
  )
}

function Screen({ route }: { route: Route }) {
  switch (route.name) {
    case 'today':
      return <Today />
    case 'topics':
      return <Topics />
    case 'topic':
      return <TopicScreen id={route.id} />
    case 'session':
      return <Session key={`${route.kind}:${route.topic ?? ''}:${routeVersion}`} kind={route.kind} topicId={route.topic} />
    case 'progress':
      return <ProgressScreen />
    case 'settings':
      return <Settings />
    case 'method':
      return <Method />
    case 'mine':
      return <Mine />
    case 'stories':
      return <Stories topic={route.topic} s={route.s} f={route.f} />
    case 'kit':
      return <Kit />
    case 'gallery':
      return <Gallery only={route.id} focus={route.focus} view={route.view} />
  }
}

function Nav({ route }: { route: Route }) {
  return (
    <nav className="nav glass" aria-label="Разделы">
      <a className="nav-brand" href={href({ name: 'today' })}>
        <Logo />
        <span>Грамматика в цвете</span>
      </a>
      {TABS.map((t) => {
        const active = t.match.includes(route.name)
        return (
          <a key={t.label} className="nav-item" href={href(t.route)} aria-current={active ? 'page' : undefined}>
            <Icon name={t.icon} />
            <span>{t.label}</span>
          </a>
        )
      })}
    </nav>
  )
}
