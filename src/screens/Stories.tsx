import { TOPICS } from '../content/catalog'
import { storiesByTopic, storiesFor } from '../illustrations'
import { Label, Person, Prop, PROPS, Scene } from '../illustrations/kit'
import type { Pose } from '../illustrations/kit'
import { StoryPlayer } from '../illustrations/StoryPlayer'
import { Sentence } from '../ui/Sentence'

// Dev-страницы: #/stories — все истории; #/stories/<тема>?s=<история>&f=<кадр> — один кадр для скриншота; #/kit — набор.
export function Stories({ topic, s, f }: { topic?: string; s?: number; f?: number }) {
  if (topic && s !== undefined && f !== undefined) {
    const story = storiesFor(topic)[s]
    const frame = story?.frames[f]
    if (!story || !frame) return <main className="page">Нет такого кадра</main>
    return (
      <main className="page">
        <section className="card">
          <p className="small muted">
            {story.title} · кадр {f + 1}/{story.frames.length}
          </p>
          {frame.scene}
          {frame.en && (
            <p className="story-en">
              <Sentence source={frame.en} paint="target" lang={frame.lang ?? 'en'} />
            </p>
          )}
          <p className="story-ru">{frame.ru}</p>
        </section>
      </main>
    )
  }
  const ids = TOPICS.map((t) => t.id).filter((id) => storiesByTopic.has(id) && (!topic || id === topic))
  const total = [...storiesByTopic.values()].reduce((n, list) => n + list.length, 0)
  return (
    <main className="page">
      <header className="page-head">
        <h1 className="page-title">Картинки-истории</h1>
        <p className="page-sub">
          Тем с историями: {storiesByTopic.size} из {TOPICS.length}, историй: {total}. <a href="#/stories">Все</a> · <a href="#/kit">Набор</a>
        </p>
      </header>
      {ids.map((id) => (
        <section key={id} className="section">
          <h2 className="section-title">
            <a href={`#/stories/${id}`}>{TOPICS.find((t) => t.id === id)?.title}</a>
          </h2>
          {storiesFor(id).map((story) => (
            <div key={story.id} className="card">
              <StoryPlayer story={story} />
              <span className="small faint">{story.id} · focus: {story.focus?.join(', ') ?? '—'}</span>
            </div>
          ))}
        </section>
      ))}
    </main>
  )
}

const POSES: Pose[] = ['stand', 'walk', 'run', 'sit', 'point', 'think', 'talk', 'wave', 'hold', 'give', 'look', 'sleep']

export function Kit() {
  const names = Object.keys(PROPS)
  return (
    <main className="page">
      <header className="page-head">
        <h1 className="page-title">Набор для картинок</h1>
        <p className="page-sub">Предметов: {names.length}, поз: {POSES.length}</p>
      </header>
      <section className="card">
        <Scene label="Позы человечка">
          {POSES.map((p, i) => (
            <g key={p}>
              <Person x={28 + (i % 6) * 52} y={i < 6 ? 84 : 168} pose={p} tone={(i % 4) as 0 | 1 | 2 | 3} hair={i % 2 ? 'long' : 'short'} hl={p === 'point'} />
              <Label x={28 + (i % 6) * 52} y={i < 6 ? 98 : 186} size={10} muted>
                {p}
              </Label>
            </g>
          ))}
        </Scene>
      </section>
      <section className="card kit-grid">
        {names.map((name) => (
          <div key={name} className="kit-cell">
            <Scene label={name} ground={false}>
              <Prop name={name} x={160} y={150} s={2.4} />
            </Scene>
            <span className="small">
              {name} <span className="faint">{PROPS[name]!.ru}</span>
            </span>
          </div>
        ))}
      </section>
    </main>
  )
}
