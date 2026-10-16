import type { ReactNode } from 'react'
import { Glyph } from '../../ui/Glyph'
import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'
import { PLACE_SCENES } from './scenes'
import type { PlaceId } from './scenes'
import { BLANK, SceneCell, SceneSvg, withGap } from './shared'

// Предлоги времени: тот же образ, что в местах. at — точка, on — поверхность-день, in — контейнер-период.
// Масштабы вложены друг в друга: момент внутри дня внутри месяца. no-prep — слова без предлога.

type LevelId = 'in' | 'on' | 'at'

interface Level {
  id: LevelId
  ru: string
  scene: PlaceId
  ex: string[]
}

const LV_IN: Level = { id: 'in', ru: 'период', scene: 'in', ex: ['in_I June_N', 'in_I 2020_M', 'in_I the_D morning_N', 'in_I summer_N'] }
const LV_ON: Level = { id: 'on', ru: 'день', scene: 'on', ex: ['on_I Monday_N', 'on_I 3~May_N', 'on_I my_D birthday_N'] }
const LV_AT: Level = { id: 'at', ru: 'момент', scene: 'at', ex: ['at_I 5_M o’clock_R', 'at_I night_N', 'at_I the_D weekend_N'] }
const LEVELS: Level[] = [LV_IN, LV_ON, LV_AT]

const NO_PREP = ['yesterday_R', 'tomorrow_R', 'next_J week_N', 'last_J year_N', 'this_D morning_N', 'every_D day_N']

const FOCUS_KEYS: string[] = [...LEVELS.map((l) => l.id), 'no-prep']

function Chips({ items, quiz, dim, limit }: { items: string[]; quiz: boolean; dim: boolean; limit?: number }) {
  return (
    <ul className="vspt-ex">
      {items.slice(0, limit).map((src) => (
        <li key={src}>
          <Sentence source={quiz ? withGap(src) : src} paint={dim ? 'none' : 'all'} gap={BLANK} />
        </li>
      ))}
    </ul>
  )
}

export function PrepTime({ focus, compact, quiz }: VisualProps) {
  const key = focus && FOCUS_KEYS.includes(focus) ? focus : undefined
  const isQuiz = Boolean(quiz)
  // quiz: названия и предлоги в примерах спрятаны у всех уровней — иначе ответ угадывается исключением
  const hide = (_id: string) => isQuiz
  const state = (id: string) => ({ lit: key === id, dim: Boolean(key) && key !== id })

  if (compact) {
    if (key === 'no-prep') return <div className="vs" data-pos="prep" data-compact><NoPrep lit={false} dim={false} hidden={hide('no-prep')} /></div>
    const shown = key ? LEVELS.filter((l) => l.id === key) : LEVELS
    const single = shown.length === 1
    return (
      <div className="vs" data-pos="prep" data-compact>
        <div className="vsp-grid" data-n={shown.length}>
          {shown.map((l) => (
            <SceneCell
              key={l.id}
              name={l.id}
              ru={l.ru}
              lit={state(l.id).lit}
              dim={false}
              hidden={hide(l.id)}
              compact={single}
              slim={!single}
              extra={single ? <Chips items={l.ex} quiz={hide(l.id)} dim={false} limit={3} /> : undefined}
            >
              <SceneSvg label={`${l.id}: ${l.ru}`} decor>
                {PLACE_SCENES[l.scene]()}
              </SceneSvg>
            </SceneCell>
          ))}
        </div>
      </div>
    )
  }

  const level = (l: Level, depth: number, inner?: ReactNode) => {
    const { lit, dim } = state(l.id)
    const hidden = hide(l.id)
    return (
      <div className="vspt-lv" data-d={depth} data-lit={lit || undefined} data-dim={dim || undefined}>
        <div className="vspt-head">
          <SceneSvg label={`${l.id}: ${l.ru}`} dim={dim} decor>
            {PLACE_SCENES[l.scene]()}
          </SceneSvg>
          <div className="vsp-captext vspt-title">
            <span className="vsp-name">
              <Glyph pos="prep" size={16} tone={dim ? 'current' : 'pos'} />
              {hidden ? '?' : l.id}
            </span>
            {!hidden && <span className="vsp-ru">{l.ru}</span>}
          </div>
        </div>
        <Chips items={l.ex} quiz={hidden} dim={dim} />
        {inner}
      </div>
    )
  }

  return (
    <div className="vs vt" data-pos="prep" role="group" aria-label="Предлоги времени: in — период, on — день, at — момент; внутри периода лежит день, внутри дня момент">
      {level(LV_IN, 0, level(LV_ON, 1, level(LV_AT, 2)))}
      <NoPrep {...state('no-prep')} hidden={hide('no-prep')} />
    </div>
  )
}

function NoPrep({ lit, dim, hidden }: { lit: boolean; dim: boolean; hidden: boolean }) {
  return (
    <div className="vspt-lv vspt-np" data-d={0} data-lit={lit || undefined} data-dim={dim || undefined}>
      <div className="vspt-head">
        <span className="vspt-null" aria-hidden="true">
          {hidden ? '?' : '∅'}
        </span>
        <div className="vsp-captext vspt-title">{!hidden && <span className="vsp-name vspt-npname">без предлога</span>}</div>
      </div>
      <ul className="vspt-ex">
        {NO_PREP.map((src) => (
          <li key={src}>
            <Sentence source={hidden ? `[∅_I] ${src}` : src} paint={dim ? 'none' : 'all'} gap={BLANK} />
          </li>
        ))}
      </ul>
    </div>
  )
}
