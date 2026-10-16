import { parseSentence, renderText } from '../content/sentence'
import type { RefBlock, Topic } from '../content/types'
import { speak } from '../engine/tts'
import { useStore } from '../engine/store'
import { Visual } from '../visuals'
import { Icon } from './icons'
import { Sentence } from './Sentence'

/** Справочник темы: схема, правила с примерами (с озвучкой), таблицы, «как в русском», ловушки. */
export function RefBlocks({ topic }: { topic: Topic }) {
  return (
    <div className="ref">
      {topic.ref.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  )
}

function Say({ s, lang = 'en' }: { s: string; lang?: 'en' | 'ru' }) {
  const { settings } = useStore()
  if (lang !== 'en') return null
  return (
    <button type="button" className="say" aria-label="Послушать" onClick={() => speak(renderText(parseSentence(s)), { voiceName: settings.voiceName, rate: settings.rate })}>
      <Icon name="speaker" />
    </button>
  )
}

function Block({ block }: { block: RefBlock }) {
  switch (block.kind) {
    case 'visual':
      return (
        <figure className="ref-visual card">
          <Visual id={block.visual.id} focus={block.visual.focus} />
          {block.caption && <figcaption className="small muted">{block.caption}</figcaption>}
        </figure>
      )
    case 'rule':
      return (
        <section className="ref-rule">
          <h3 className="k-text" data-style="headline">
            {block.title}
          </h3>
          <p className="ref-text">{block.text}</p>
          {block.examples && (
            <ul className="ref-examples">
              {block.examples.map((e) => (
                <li key={e.s}>
                  <span className="ref-example-en">
                    <Sentence source={e.s} paint="all" lang={e.lang ?? 'en'} />
                    <Say s={e.s} lang={e.lang} />
                  </span>
                  <span className="ref-example-tr">{e.tr}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )
    case 'table':
      return (
        <section className="ref-table-wrap">
          {block.title && (
            <h3 className="k-text" data-style="headline">
              {block.title}
            </h3>
          )}
          <div className="ref-table-scroll">
            <table className="ref-table">
              <thead>
                <tr>
                  {block.head.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (
                      <td key={c}>
                        <Sentence source={cell} paint="all" lang={block.lang ?? 'en'} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )
    case 'contrast':
      return (
        <section className="ref-contrast card">
          <h3 className="section-title">{block.title ?? 'Как в русском'}</h3>
          <p className="ref-pair">
            <span className="ref-lang">RU</span>
            <Sentence source={block.ru} paint="all" lang="ru" />
          </p>
          <p className="ref-pair">
            <span className="ref-lang">EN</span>
            <Sentence source={block.en} paint="all" />
            <Say s={block.en} />
          </p>
          <p className="ref-text">{block.note}</p>
        </section>
      )
    case 'mistakes':
      return (
        <section className="ref-mistakes">
          <h3 className="section-title">Ловушки</h3>
          <ul>
            {block.items.map((m) => (
              <li key={m.wrong}>
                <p className="ref-wrong">
                  <Icon name="cross" /> <Sentence source={m.wrong} paint="none" />
                </p>
                <p className="ref-right">
                  <Icon name="check" /> <Sentence source={m.right} paint="all" />
                </p>
                {m.note && <p className="small muted">{m.note}</p>}
              </li>
            ))}
          </ul>
        </section>
      )
    case 'tip':
      return (
        <p className="ref-tip">
          <Icon name="info" /> <span>{block.text}</span>
        </p>
      )
  }
}
