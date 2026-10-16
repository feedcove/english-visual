import { useState } from 'react'
import { parseConllu } from '../content/conllu'
import type { ParsedSentence } from '../content/conllu'
import { CUSTOM_TOPIC_ID } from '../content/custom'
import type { Lang } from '../content/types'
import { addCustom, removeCustom, useStore } from '../engine/store'
import { href } from '../router'
import { Cascade } from '../ui/Cascade'
import { Icon } from '../ui/icons'
import { Button, Segmented } from '../ui/kit'
import { SentenceGraph } from '../visuals/graph/SentenceGraph'

const UDPIPE = 'https://lindat.mff.cuni.cz/services/udpipe/'

/** Свой текст → граф и задания. Разбор делает внешний парсер (UDPipe, spaCy) в формате CoNLL-U; приложение только рисует и тренирует. */
export function Mine() {
  const { custom } = useStore()
  const [lang, setLang] = useState<Lang>('ru')
  const [input, setInput] = useState('')
  const [preview, setPreview] = useState<ParsedSentence[]>([])
  const [error, setError] = useState('')

  const parse = () => {
    setError('')
    try {
      const parsed = parseConllu(input, lang)
      if (!parsed.length) setError('Не нашёл ни одного предложения. Нужен вывод в формате CoNLL-U: строки с номерами слов и табуляцией.')
      setPreview(parsed)
    } catch (e) {
      setPreview([])
      setError(`Разбор не сошёлся: ${(e as Error).message}. Проверь, что скопирован весь вывод.`)
    }
  }

  return (
    <main className="page">
      <a className="back" href={href({ name: 'topics' })}>
        <Icon name="back" /> Темы
      </a>
      <header className="page-head">
        <h1 className="page-title">Мои предложения</h1>
        <p className="page-sub">Разбери свой текст графом и лесенкой и тренируй его как обычную тему: найди сказуемое, подлежащее, раскрась части речи.</p>
      </header>

      <section className="card">
        <h2 className="k-text" data-style="headline">
          Где взять разбор
        </h2>
        <ol className="mine-steps">
          <li>
            Открой{' '}
            <a href={UDPIPE} target="_blank" rel="noreferrer">
              UDPipe (LINDAT)
            </a>
            , вставь свой текст, выбери модель <b>russian-syntagrus</b> или <b>english-ewt</b>, нажми Process.
          </li>
          <li>
            Во вкладке результата выбери формат <b>CoNLL-U</b>, скопируй всё и вставь ниже.
          </li>
          <li>
            На Mac можно без сайта: <code>python3 tools/parse.py</code> со spaCy (см. README).
          </li>
        </ol>
        <p className="small muted">Разбор автоматический и может ошибаться, особенно с предлогами и придаточными. Считай его черновиком и сверяй со схемой.</p>
      </section>

      <section className="card">
        <Segmented<Lang>
          value={lang}
          onChange={setLang}
          options={[
            { value: 'ru', label: 'Русский' },
            { value: 'en', label: 'English' },
          ]}
        />
        <textarea className="mine-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder={'# text = Мама мыла раму.\n1\tМама\tмама\tNOUN\t…'} spellCheck={false} />
        <div className="row">
          <Button variant="solid" disabled={!input.trim()} onClick={parse}>
            Разобрать
          </Button>
          {preview.length > 0 && (
            <Button
              variant="soft"
              onClick={() => {
                addCustom(preview.map((p) => ({ s: p.s, graph: p.graph, lang: p.lang, text: p.text })))
                setPreview([])
                setInput('')
              }}
            >
              Добавить в тренажёр: {preview.length}
            </Button>
          )}
        </div>
        {error && (
          <p className="small" style={{ color: 'var(--danger-text)' }} role="alert">
            {error}
          </p>
        )}
        {preview.map((p) => (
          <div key={p.s} className="mine-preview">
            <Cascade source={p.s} graph={p.graph} lang={p.lang} />
            <SentenceGraph source={p.s} graph={p.graph} lang={p.lang} view="tree" />
          </div>
        ))}
      </section>

      {custom.length > 0 && (
        <section className="section">
          <div className="row-between">
            <h2 className="section-title">Сохранено: {custom.length}</h2>
            <a className="k-ctl" data-variant="solid" data-size="sm" href={href({ name: 'session', kind: 'topic', topic: CUSTOM_TOPIC_ID })}>
              Тренировать
            </a>
          </div>
          <div className="k-group k-list card-list">
            {custom.map((c) => (
              <div key={c.id} className="k-row">
                <span className="topic-level">{c.lang.toUpperCase()}</span>
                <span className="k-row-text">
                  <span className="k-text" data-style="callout">
                    {c.text}
                  </span>
                </span>
                <Button variant="ghost" size="sm" aria-label="Удалить" icon={<Icon name="close" />} onClick={() => removeCustom(c.id)} />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
