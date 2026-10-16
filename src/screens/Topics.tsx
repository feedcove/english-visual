import { useMemo, useState } from 'react'
import { AREA_ORDER, AREAS, TOPICS } from '../content/catalog'
import { topicById } from '../content'
import { POS } from '../content/pos'
import { topicProgress } from '../engine/stats'
import { useStore } from '../engine/store'
import { href } from '../router'
import { Glyph } from '../ui/Glyph'
import { Icon } from '../ui/icons'
import { Progress } from '../ui/kit'

/** Карта тем по разделам: прогресс считается по стадиям навыков (FSRS + воспроизведение), а не по просмотрам. */
export function Topics() {
  const state = useStore()
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const matches = useMemo(() => {
    if (!q) return null
    return new Set(
      TOPICS.filter((meta) => {
        const t = topicById.get(meta.id)
        const hay = [meta.title, meta.titleEn, t?.summary, ...(t?.items.map((i) => i.skill) ?? []), ...(t?.ref.map((b) => (b.kind === 'rule' ? `${b.title} ${b.text}` : '')) ?? [])]
          .join(' ')
          .toLowerCase()
        return hay.includes(q)
      }).map((m) => m.id),
    )
  }, [q])

  return (
    <main className="page">
      <header className="page-head">
        <h1 className="page-title">Темы</h1>
        <p className="page-sub">Справочник и карта прогресса. Цвет полосы — сколько навыков темы уже держится в памяти.</p>
      </header>
      <label className="k-field search" data-variant="surface">
        <Icon name="search" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск: артикли, since, him…" aria-label="Поиск по темам" />
      </label>
      {!q && (
        <a className="card mine-card" href={href({ name: 'mine' })}>
          <span className="k-text" data-style="headline">
            Мои предложения
          </span>
          <span className="small muted">Свой текст графом и лесенкой: вставь разбор парсера и тренируй его как тему</span>
        </a>
      )}
      {AREA_ORDER.map((areaId) => {
        const area = AREAS[areaId]
        const metas = TOPICS.filter((t) => t.area === areaId && (!matches || matches.has(t.id)))
        if (!metas.length) return null
        return (
          <section key={areaId} className="section">
            <h2 className="section-title row">
              {area.pos && <Glyph pos={area.pos} size={14} />}
              {area.title}
              {area.pos && <span className="faint">· {POS[area.pos].en}</span>}
            </h2>
            <div className="k-group k-list card-list">
              {metas.map((meta) => {
                const topic = topicById.get(meta.id)
                const p = topic ? topicProgress(state, topic) : null
                const content = (
                  <>
                    <span className="topic-level">{meta.level}</span>
                    <span className="k-row-text">
                      <span className="k-text" data-style="callout">
                        {meta.title}
                      </span>
                      {p ? <Progress value={p.value} label={`Прогресс: ${meta.title}`} /> : <span className="k-text small faint">готовится</span>}
                    </span>
                    {p ? (
                      <span className="small muted">
                        {p.counts.solid + p.counts.review}/{p.total}
                      </span>
                    ) : (
                      <span />
                    )}
                  </>
                )
                return topic ? (
                  <a key={meta.id} className="k-row" href={href({ name: 'topic', id: meta.id })}>
                    {content}
                  </a>
                ) : (
                  <div key={meta.id} className="k-row" aria-disabled="true">
                    {content}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
      {matches && matches.size === 0 && <p className="muted">Ничего не нашлось.</p>}
    </main>
  )
}
