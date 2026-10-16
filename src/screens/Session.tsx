import { useEffect, useRef, useState } from 'react'
import { itemById, topics } from '../content'
import type { Topic } from '../content/types'
import { dayKey } from '../engine/dates'
import { seeded } from '../engine/random'
import { buildSession } from '../engine/session'
import type { SessionKind, Step } from '../engine/session'
import { stageOf } from '../engine/srs'
import { streakOf } from '../engine/stats'
import { finishSession, getState, markKnown, recordAnswer, startTopic, useStore } from '../engine/store'
import type { Answer } from '../engine/store'
import { Exercise } from '../exercises/Exercise'
import { Feedback } from '../exercises/Feedback'
import { SpeedRound } from '../exercises/SpeedRound'
import type { SpeedResult } from '../exercises/SpeedRound'
import type { Result } from '../exercises/types'
import { href, navigate } from '../router'
import { Button, Progress } from '../ui/kit'
import { Icon } from '../ui/icons'
import { Sentence } from '../ui/Sentence'
import { storiesFor } from '../illustrations'
import { StoryPlayer } from '../illustrations/StoryPlayer'
import { Visual } from '../visuals'

const lookup = { topics, itemById }
const MAX_RETRIES = 2
const CHECK_PASS = 5 / 6

interface Done {
  itemId: string
  ok: boolean
}

export function Session({ kind, topicId }: { kind: SessionKind; topicId?: string }) {
  const store = useStore()
  const [plan] = useState(() => buildSession(kind, getState(), lookup, Date.now(), topicId))
  const [queue, setQueue] = useState<Step[]>(plan.steps)
  const [index, setIndex] = useState(0)
  const [result, setResult] = useState<Result | null>(null)
  const [log, setLog] = useState<Done[]>([])
  const [speed, setSpeed] = useState<SpeedResult | undefined>()
  const [finished, setFinished] = useState(plan.steps.length === 0)
  const retries = useRef(new Map<string, number>())
  // Ответ записывается при переходе дальше: до этого его можно пометить как опечатку.
  const pending = useRef<Answer | null>(null)
  const started = useRef(performance.now())
  const sessionStart = useRef(Date.now())
  const stagesBefore = useRef(new Map(Object.entries(getState().cards).map(([id, c]) => [id, stageOf(c)])))

  const step = queue[index]
  const seed = `${dayKey()}:${index}:${step?.kind === 'task' ? step.itemId : ''}`

  const commit = () => {
    if (pending.current) recordAnswer(pending.current)
    pending.current = null
  }
  // Ушёл из занятия сразу после ответа (крестик, другая вкладка) — ответ всё равно записывается.
  useEffect(() => commit, [])

  // «Дальше» может прийти и с клавиатуры, и кликом — переходим один раз на шаг.
  const advanced = useRef(-1)
  const next = () => {
    if (advanced.current === index) return
    advanced.current = index
    commit()
    setResult(null)
    started.current = performance.now()
    if (index + 1 >= queue.length) complete()
    else setIndex(index + 1)
  }

  const complete = (speedResult = speed) => {
    commit()
    const first = log.filter((l, i, a) => a.findIndex((x) => x.itemId === l.itemId) === i)
    finishSession({ speed: speedResult, exam: kind === 'exam' ? { n: first.length, ok: first.filter((l) => l.ok).length } : undefined })
    if (kind === 'check' && plan.topicId) {
      const topic = topics.find((t) => t.id === plan.topicId)
      const score = log.length ? log.filter((l) => l.ok).length / log.length : 0
      if (topic && score >= CHECK_PASS) {
        markKnown(
          topic.items.map((i) => i.id),
          new Set(log.filter((l) => !l.ok).map((l) => l.itemId)),
          score,
          topic.id,
        )
      } else if (topic) startTopic(topic.id)
    }
    setFinished(true)
  }

  const answer = (r: Result) => {
    if (step?.kind !== 'task') return
    const ms = performance.now() - started.current
    pending.current = { itemId: step.itemId, format: step.format, ok: r.ok, score: r.score, ms, variant: step.variant, hint: r.hint, practice: step.practice, check: kind === 'check', layout: layoutFor(step, seed) }
    setResult(r)
    setLog((l) => [...l, { itemId: step.itemId, ok: r.ok }])
    // Ошибка возвращается через 3–5 заданий другим предложением (не в проверке темы).
    if (!r.ok && step.phase !== 'check' && kind !== 'exam') {
      const n = retries.current.get(step.itemId) ?? 0
      if (n < MAX_RETRIES) {
        retries.current.set(step.itemId, n + 1)
        const entry = itemById.get(step.itemId)
        const variants = entry?.item.variants.length ?? 1
        const retry: Step = { ...step, phase: 'retry', practice: true, variant: (step.variant + 1) % variants }
        setQueue((q) => {
          // Не дальше скоростного раунда: после него занятие заканчивается.
          const speedAt = q.findIndex((x, i) => i > index && x.kind === 'speed')
          const limit = speedAt === -1 ? q.length : speedAt
          const at = Math.min(limit, index + 4)
          return [...q.slice(0, at), retry, ...q.slice(at)]
        })
      }
    }
  }

  const typoFix = () => {
    if (step?.kind !== 'task' || !result || !pending.current) return
    // Опечатка: в расписание уходит «трудно» вместо «не помню», повтор в этом занятии остаётся.
    pending.current = { ...pending.current, ok: true, typo: true }
    setResult({ ...result, typo: false, ok: true })
    setLog((l) => l.map((x, i) => (i === l.length - 1 ? { ...x, ok: true } : x)))
  }

  const total = queue.length
  const progress = finished ? 1 : index / Math.max(1, total)

  if (finished) {
    return (
      <Summary
        kind={kind}
        log={log}
        speed={speed}
        topicId={plan.topicId}
        minutes={Math.max(1, Math.round((Date.now() - sessionStart.current) / 60000))}
        improved={log.filter((l, i, a) => a.findIndex((x) => x.itemId === l.itemId) === i && stageOf(store.cards[l.itemId]) !== stagesBefore.current.get(l.itemId)).length}
        empty={plan.steps.length === 0}
      />
    )
  }

  return (
    <main className="session">
      <header className="session-head">
        <a className="k-ctl icon" data-variant="ghost" href={href({ name: 'today' })} aria-label="Закончить">
          <Icon name="close" />
        </a>
        <Progress value={progress} label="Прогресс занятия" />
        <span className="session-count">
          {Math.min(index + 1, total)}/{total}
        </span>
      </header>
      <div className="session-body" key={index}>
        {step?.kind === 'intro' && <TopicIntro topicId={step.topicId} onStart={() => (startTopic(step.topicId), next())} />}
        {step?.kind === 'speed' && (
          <SpeedRound
            items={step.itemIds.flatMap((id) => (itemById.get(id) ? [itemById.get(id)!.item] : []))}
            seed={seed}
            onFinish={(r) => {
              setSpeed(r)
              complete(r)
            }}
          />
        )}
        {step?.kind === 'task' && <TaskView step={step} seed={seed} result={result} exam={kind === 'exam'} onAnswer={answer} onNext={next} onTypo={typoFix} />}
      </div>
    </main>
  )
}

/** Предложение с графом в pick и choice показываем то лесенкой, то строкой — чтобы честно сравнить на себе. */
function layoutFor(step: Step, seed: string): 'cascade' | 'block' | undefined {
  if (step.kind !== 'task' || (step.format !== 'pick' && step.format !== 'choice')) return undefined
  const variant = itemById.get(step.itemId)?.item.variants[step.variant]
  if (!variant?.graph) return undefined
  return seeded(`layout:${seed}`)() < 0.5 ? 'cascade' : 'block'
}

function TaskView({ step, seed, result, exam, onAnswer, onNext, onTypo }: { step: Extract<Step, { kind: 'task' }>; seed: string; result: Result | null; exam: boolean; onAnswer: (r: Result) => void; onNext: () => void; onTypo: () => void }) {
  const { settings } = useStore()
  const entry = itemById.get(step.itemId)
  if (!entry) return null
  const { item, topic } = entry
  const variant = item.variants[step.variant] ?? item.variants[0]!
  return (
    <>
      {(step.phase === 'new' || step.phase === 'retry' || step.phase === 'check') && (
        <p className="session-phase">{step.phase === 'new' ? `Новое · ${topic.title}` : step.phase === 'retry' ? 'Ещё раз, другое предложение' : exam ? 'Проверка недели · без подсказок' : `Проверка · ${topic.title}`}</p>
      )}
      <Exercise
        item={item}
        variant={variant}
        topic={topic}
        format={step.format}
        seed={seed}
        colorHints={settings.colorHints && !exam}
        layout={layoutFor(step, seed)}
        noHints={exam}
        done={result ?? undefined}
        onDone={onAnswer}
      />
      {result && (
        <Feedback
          item={item}
          variant={variant}
          topic={topic}
          format={step.format}
          result={result}
          voice={{ on: settings.voice, name: settings.voiceName, rate: settings.rate }}
          onNext={onNext}
          onTypo={result.typo ? onTypo : undefined}
        />
      )}
    </>
  )
}

function TopicIntro({ topicId, onStart }: { topicId: string; onStart: () => void }) {
  const topic = topics.find((t) => t.id === topicId) as Topic | undefined
  if (!topic) return null
  const rules = topic.ref.filter((b) => b.kind === 'rule').slice(0, 2)
  return (
    <div className="intro">
      <p className="session-phase">Новая тема · {topic.level}</p>
      <h1 className="page-title">{topic.title}</h1>
      <p className="intro-summary">{topic.summary}</p>
      {storiesFor(topic.id)[0] && <StoryPlayer story={storiesFor(topic.id)[0]!} />}
      <Visual id={topic.visual} />
      {rules.map((r) =>
        r.kind === 'rule' ? (
          <div key={r.title} className="intro-rule">
            <h2 className="k-text" data-style="headline">
              {r.title}
            </h2>
            <p className="muted">{r.text}</p>
            {r.examples?.slice(0, 2).map((e) => (
              <p key={e.s} className="intro-example">
                <Sentence source={e.s} paint="all" lang={e.lang ?? 'en'} />
                <span className="faint"> — {e.tr}</span>
              </p>
            ))}
          </div>
        ) : null,
      )}
      <div className="ex-actions">
        <Button variant="solid" size="lg" className="grow" onClick={onStart}>
          Начать практику
        </Button>
        <Button variant="soft" size="lg" onClick={() => navigate({ name: 'session', kind: 'check', topic: topic.id })}>
          Уже знаю
        </Button>
      </div>
    </div>
  )
}

function Summary({ kind, log, speed, topicId, minutes, improved, empty }: { kind: SessionKind; log: Done[]; speed?: SpeedResult; topicId?: string; minutes: number; improved: number; empty: boolean }) {
  const state = useStore()
  const first = log.filter((l, i, a) => a.findIndex((x) => x.itemId === l.itemId) === i)
  const right = first.filter((l) => l.ok).length
  const accuracy = first.length ? Math.round((right / first.length) * 100) : 0
  const streak = streakOf(state)
  const mistakes = [...new Set(log.filter((l) => !l.ok).map((l) => l.itemId))]
  const topic = topicId ? topics.find((t) => t.id === topicId) : undefined
  const passed = kind === 'check' && topic && state.topics[topic.id]?.checkScore !== undefined && (state.topics[topic.id]?.checkScore ?? 0) >= CHECK_PASS

  if (empty) {
    return (
      <main className="page">
        <div className="k-empty">
          <div className="k-empty-icon">
            <Icon name="check" />
          </div>
          <div className="k-empty-text">
            <p className="k-text" data-style="headline">
              На сейчас всё
            </p>
            <p className="k-text muted">Повторы на сегодня сделаны, новое добавится завтра. Можно пройти любую тему в «Темах».</p>
          </div>
          <a className="k-ctl" data-variant="solid" data-size="lg" href={href({ name: 'topics' })}>
            К темам
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="page summary">
      <header className="page-head">
        <p className="session-phase">{kind === 'check' ? 'Проверка темы' : kind === 'exam' ? 'Проверка недели' : 'Занятие закончено'}</p>
        <h1 className="page-title">{kind === 'check' ? (passed ? 'Тема засчитана' : 'Тему стоит пройти') : `${accuracy}% с первого раза`}</h1>
        {kind === 'check' && topic && (
          <p className="page-sub">
            {passed ? 'Навыки темы ушли на длинный интервал: повторим примерно через неделю.' : `«${topic.title}» добавлена в план — начнём с неё в следующем занятии.`}
          </p>
        )}
      </header>
      <div className="stat-grid">
        <Stat value={first.length} label="заданий" />
        <Stat value={`${minutes} мин`} label="время" />
        <Stat value={improved} label="навыков продвинулось" />
        {!state.settings.hideStreak && <Stat value={streak.days} label={plural(streak.days, 'день подряд', 'дня подряд', 'дней подряд')} />}
        {speed && <Stat value={`${speed.ok}/${speed.n}`} label={`скорость, ${(speed.median / 1000).toFixed(1)} с на ответ`} />}
      </div>
      {mistakes.length > 0 && (
        <section className="section">
          <h2 className="section-title">Над чем поработать</h2>
          <div className="k-group k-list" data-level="1" style={{ background: 'var(--lv)' }}>
            {mistakes.slice(0, 6).map((id) => {
              const e = itemById.get(id)
              if (!e) return null
              return (
                <a key={id} className="k-row" href={href({ name: 'topic', id: e.topic.id })}>
                  <span className="k-row-icon">
                    <Icon name="book" />
                  </span>
                  <span className="k-row-text">
                    <span className="k-text" data-style="callout">
                      {e.item.skill}
                    </span>
                    <span className="k-text" data-style="footnote" data-level2="secondary">
                      {e.topic.title}
                    </span>
                  </span>
                  <Icon name="next" />
                </a>
              )
            })}
          </div>
        </section>
      )}
      <div className="ex-actions">
        <a className="k-ctl grow" data-variant="solid" data-size="lg" href={href({ name: 'today' })}>
          Готово
        </a>
        {kind === 'check' && topic && !passed ? (
          <a className="k-ctl" data-variant="soft" data-size="lg" href={href({ name: 'session', kind: 'topic', topic: topic.id })}>
            Учить тему
          </a>
        ) : (
          <a className="k-ctl" data-variant="soft" data-size="lg" href={href({ name: 'session', kind: 'short' })}>
            Ещё 5 минут
          </a>
        )}
      </div>
    </main>
  )
}

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="stat">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export function plural(n: number, one: string, few: string, many: string): string {
  const m10 = n % 10
  const m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}
