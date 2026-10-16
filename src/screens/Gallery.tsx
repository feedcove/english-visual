import { useState } from 'react'
import { VISUALS } from '../visuals/catalog'
import type { VisualId } from '../visuals/catalog'
import { Visual, visualRegistry } from '../visuals'
import { Segmented } from '../ui/kit'

// Dev-страница #/gallery: все схемы с переключением focus / compact / quiz. Нужна для разработки схем.
export function Gallery({ only, focus, view }: { only?: string; focus?: string; view?: string }) {
  // #/gallery/<id>?focus=<ключ>&view=compact|quiz — одна схема без органов управления, для скриншотов.
  if (only && (focus !== undefined || view)) {
    return (
      <main className="page">
        <section className="card">
          <Visual id={only} focus={focus || undefined} compact={view === 'compact'} quiz={view === 'quiz'} />
        </section>
      </main>
    )
  }
  const ids = (Object.keys(VISUALS) as VisualId[]).filter((id) => !only || id === only)
  const done = ids.filter((id) => visualRegistry.has(id)).length
  return (
    <main className="page">
      <header className="page-head">
        <h1 className="page-title">Схемы</h1>
        <p className="page-sub">
          Готово {done} из {ids.length}. <a href="#/gallery">Все</a>
        </p>
      </header>
      {ids.map((id) => (
        <GalleryItem key={id} id={id} />
      ))}
    </main>
  )
}

function GalleryItem({ id }: { id: VisualId }) {
  const spec = VISUALS[id]
  const [focus, setFocus] = useState<string>('')
  const [view, setView] = useState<'full' | 'compact' | 'quiz'>('full')
  return (
    <section className="card gallery-item" id={id}>
      <div className="row-between">
        <h2 className="k-text" data-style="headline">
          <a href={`#/gallery/${id}`}>{spec.title}</a>
        </h2>
        <span className="small faint">{id}</span>
      </div>
      <p className="gallery-desc">{spec.desc}</p>
      <Segmented
        value={view}
        onChange={setView}
        options={[
          { value: 'full', label: 'Полная' },
          { value: 'compact', label: 'Мини' },
          { value: 'quiz', label: 'Вопрос' },
        ]}
      />
      <div className="wrap">
        {['', ...spec.focus].map((key) => (
          <button
            key={key || 'none'}
            type="button"
            className="k-ctl chip k-down"
            data-variant="soft"
            data-size="sm"
            data-selected={focus === key || undefined}
            aria-pressed={focus === key}
            onClick={() => setFocus(key)}
          >
            {key || 'без focus'}
          </button>
        ))}
      </div>
      <Visual id={id} focus={focus || undefined} compact={view === 'compact'} quiz={view === 'quiz'} />
    </section>
  )
}
