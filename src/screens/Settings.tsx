import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { canSpeak, englishVoices, speak } from '../engine/tts'
import { exportJson, importJson, resetAll, setPlan, setSettings, useStore } from '../engine/store'
import type { Settings as S } from '../engine/store'
import { href } from '../router'
import { Icon } from '../ui/icons'
import { Button, Segmented, Switch } from '../ui/kit'

export function Settings() {
  const state = useStore()
  const s = state.settings
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [message, setMessage] = useState('')
  const file = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const load = () => setVoices(englishVoices())
    load()
    if (canSpeak()) speechSynthesis.addEventListener?.('voiceschanged', load)
    return () => {
      if (canSpeak()) speechSynthesis.removeEventListener?.('voiceschanged', load)
    }
  }, [])

  const download = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `grammar-progress-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(a.href)
    setMessage('Копия сохранена в «Загрузки».')
  }

  const restore = async (f: File) => {
    const text = await f.text()
    if (!confirm('Заменить весь текущий прогресс данными из файла?')) return
    setMessage(importJson(text) ? 'Прогресс восстановлен.' : 'Файл не подошёл: это не копия прогресса этого приложения.')
  }

  return (
    <main className="page">
      <header className="page-head">
        <h1 className="page-title">Настройки</h1>
      </header>

      <section className="section">
        <h2 className="section-title">Занятие</h2>
        <div className="k-group k-list card-list">
          <Row label="Длина занятия" hint="Повторы, одна новая тема и скоростной раунд">
            <Segmented<string>
              value={String(s.minutes)}
              onChange={(v) => setSettings({ minutes: Number(v) as S['minutes'] })}
              options={[
                { value: '10', label: '10 мин' },
                { value: '15', label: '15 мин' },
              ]}
            />
          </Row>
          <Row label="Новых навыков в день" hint="Меньше — легче держать повторы">
            <Segmented<string>
              value={String(s.newPerDay)}
              onChange={(v) => setSettings({ newPerDay: Number(v) })}
              options={['3', '6', '9'].map((v) => ({ value: v, label: v }))}
            />
          </Row>
          <Row label="Целевое удержание" hint="Выше — надёжнее, но больше повторов">
            <Segmented<string>
              value={String(s.retention)}
              onChange={(v) => setSettings({ retention: Number(v) as S['retention'] })}
              options={[
                { value: '0.85', label: '85%' },
                { value: '0.9', label: '90%' },
                { value: '0.95', label: '95%' },
              ]}
            />
          </Row>
          <Row label="Подсказка цветом" hint="Пропуск окрашен в цвет нужной части речи">
            <Switch checked={s.colorHints} onChange={(v) => setSettings({ colorHints: v })} label="Подсказка цветом" />
          </Row>
          <Row label="Скрыть серию дней" hint="Если серия давит, а не помогает">
            <Switch checked={s.hideStreak} onChange={(v) => setSettings({ hideStreak: v })} label="Скрыть серию" />
          </Row>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Голос</h2>
        <div className="k-group k-list card-list">
          <Row label="Озвучивать ответ" hint={canSpeak() ? 'Системный голос, работает без интернета' : 'Браузер не поддерживает озвучку'}>
            <Switch checked={s.voice} onChange={(v) => setSettings({ voice: v })} label="Озвучивать" />
          </Row>
          {voices.length > 0 && (
            <Row label="Голос" hint="Британские — с en-GB">
              <select className="k-select" value={s.voiceName ?? ''} onChange={(e) => setSettings({ voiceName: e.target.value || undefined })}>
                <option value="">Авто (британский)</option>
                {voices.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} · {v.lang}
                  </option>
                ))}
              </select>
            </Row>
          )}
          <Row label="Скорость речи">
            <Segmented<string>
              value={String(s.rate)}
              onChange={(v) => {
                setSettings({ rate: Number(v) })
                speak('This is how fast I speak.', { voiceName: s.voiceName, rate: Number(v) })
              }}
              options={[
                { value: '0.8', label: 'медленно' },
                { value: '0.95', label: 'обычно' },
                { value: '1.1', label: 'быстро' },
              ]}
            />
          </Row>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Привычка</h2>
        <div className="card">
          <label className="small muted" htmlFor="plan-settings">
            План «если — то»: конкретное время и действие-триггер
          </label>
          <label className="k-field" data-variant="surface">
            <input id="plan-settings" defaultValue={state.plan} onBlur={(e) => setPlan(e.target.value.trim())} placeholder="Если я налил кофе — открываю тренажёр" />
          </label>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Мои данные</h2>
        <div className="card">
          <p className="small muted">Прогресс хранится только в этом браузере. На iPhone и Mac он свой — переноси копией. Сохраняй копию раз в неделю.</p>
          <div className="wrap">
            <Button variant="soft" onClick={download}>
              Сохранить копию
            </Button>
            <Button variant="soft" onClick={() => file.current?.click()}>
              Восстановить из файла
            </Button>
            <Button
              variant="soft"
              tone="danger"
              onClick={() => {
                if (confirm('Стереть весь прогресс? Это нельзя отменить.')) resetAll()
              }}
            >
              Сбросить всё
            </Button>
          </div>
          <input ref={file} type="file" accept="application/json,.json" hidden onChange={(e) => e.target.files?.[0] && restore(e.target.files[0])} />
          {message && (
            <p className="small" role="status">
              {message}
            </p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="k-group k-list card-list">
          <a className="k-row" href={href({ name: 'method' })}>
            <span className="k-row-icon">
              <Icon name="info" />
            </span>
            <span className="k-row-text">
              <span className="k-text" data-style="callout">
                Как устроено обучение
              </span>
              <span className="k-text" data-style="footnote" data-level2="secondary">
                Методика и исследования 2020–2026
              </span>
            </span>
            <Icon name="next" />
          </a>
          <a className="k-row" href={href({ name: 'gallery' })}>
            <span className="k-row-icon">
              <Icon name="topics" />
            </span>
            <span className="k-row-text">
              <span className="k-text" data-style="callout">
                Все схемы
              </span>
            </span>
            <Icon name="next" />
          </a>
        </div>
      </section>
    </main>
  )
}

function Row({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="k-row settings-row">
      <span className="k-row-text">
        <span className="k-text" data-style="callout">
          {label}
        </span>
        {hint && (
          <span className="k-text" data-style="footnote" data-level2="secondary">
            {hint}
          </span>
        )}
      </span>
      <span className="settings-control">{children}</span>
    </div>
  )
}
