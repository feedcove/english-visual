import { AREAS } from '../content/catalog'
import { topicById } from '../content'
import { STAGE_LABEL, stageOf } from '../engine/srs'
import { topicProgress } from '../engine/stats'
import { useStore } from '../engine/store'
import { href } from '../router'
import { Glyph } from '../ui/Glyph'
import { Icon } from '../ui/icons'
import { Progress } from '../ui/kit'
import { RefBlocks } from '../ui/RefBlocks'

export function TopicScreen({ id }: { id: string }) {
  const state = useStore()
  const topic = topicById.get(id)
  if (!topic) {
    return (
      <main className="page">
        <a className="back" href={href({ name: 'topics' })}>
          <Icon name="back" /> Темы
        </a>
        <p className="muted">Эта тема ещё готовится.</p>
      </main>
    )
  }
  const area = AREAS[topic.area]
  const p = topicProgress(state, topic)
  const started = Boolean(state.topics[topic.id]?.startedAt) || topic.items.some((i) => state.cards[i.id])
  return (
    <main className="page topic">
      <a className="back" href={href({ name: 'topics' })}>
        <Icon name="back" /> Темы
      </a>
      <header className="page-head">
        <p className="page-sub row">
          {area.pos && <Glyph pos={area.pos} size={14} />}
          {area.title} · {topic.level}
        </p>
        <h1 className="page-title">{topic.title}</h1>
        <p className="faint">{topic.titleEn}</p>
        <p className="topic-summary">{topic.summary}</p>
      </header>
      <div className="card">
        <div className="row-between small">
          <span className="muted">
            Освоено {p.counts.solid}, закрепляется {p.counts.review}, в работе {p.counts.learning}, новых {p.counts.new}
          </span>
        </div>
        <Progress value={p.value} label="Прогресс темы" />
        <div className="row">
          <a className="k-ctl grow" data-variant="solid" data-size="lg" href={href({ name: 'session', kind: 'topic', topic: topic.id })}>
            {started ? 'Потренировать' : 'Начать тему'}
          </a>
          {!started && (
            <a className="k-ctl" data-variant="soft" data-size="lg" href={href({ name: 'session', kind: 'check', topic: topic.id })}>
              Уже знаю
            </a>
          )}
        </div>
      </div>
      <RefBlocks topic={topic} />
      <section className="section">
        <h2 className="section-title">Навыки темы</h2>
        <div className="k-group k-list card-list">
          {topic.items.map((item) => {
            const stage = stageOf(state.cards[item.id])
            return (
              <div key={item.id} className="k-row skill-row">
                <span className="stage-dot" data-stage={stage} aria-hidden="true" />
                <span className="k-row-text">
                  <span className="k-text" data-style="callout">
                    {item.skill}
                  </span>
                </span>
                <span className="small muted">{STAGE_LABEL[stage]}</span>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
