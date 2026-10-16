import { Sentence } from '../../ui/Sentence'
import type { VisualProps } from '../types'
import { PLACE_SCENES } from './scenes'
import type { PlaceId } from './scenes'
import { BLANK, SceneCell, SceneSvg, withGap } from './shared'

// Предлоги места: сетка мини-сцен «шар — ориентир». Фокус — id предлога из каталога.

const PLACES: { id: PlaceId; name: string; ru: string; ex: string }[] = [
  { id: 'in', name: 'in', ru: 'в, внутри', ex: 'in_I the_D box_N' },
  { id: 'on', name: 'on', ru: 'на (касается)', ex: 'on_I the_D table_N' },
  { id: 'at', name: 'at', ru: 'у, в точке', ex: 'at_I the_D door_N' },
  { id: 'under', name: 'under', ru: 'под', ex: 'under_I the_D bed_N' },
  { id: 'above', name: 'above', ru: 'над (over)', ex: 'above_I the_D shelf_N' },
  { id: 'next-to', name: 'next to', ru: 'рядом с', ex: 'next~to_I the_D bank_N' },
  { id: 'between', name: 'between', ru: 'между', ex: 'between_I two_M trees_N' },
  { id: 'behind', name: 'behind', ru: 'позади', ex: 'behind_I the_D tree_N' },
  { id: 'in-front-of', name: 'in front of', ru: 'перед', ex: 'in~front~of_I the_D bank_N' },
  { id: 'opposite', name: 'opposite', ru: 'напротив', ex: 'opposite_I the_D bank_N' },
]

// Мини-версия без focus: три главных предлога места.
const BASIC: PlaceId[] = ['in', 'on', 'at']

export function PrepPlace({ focus, compact, quiz }: VisualProps) {
  const picked = PLACES.find((p) => p.id === focus)
  const list = compact ? (picked ? [picked] : PLACES.filter((p) => BASIC.includes(p.id))) : PLACES
  const single = compact && list.length === 1

  return (
    <div className="vs" data-pos="prep" data-compact={compact || undefined}>
      <div className="vsp-grid" data-n={compact ? list.length : undefined} data-wide={compact ? undefined : 5}>
        {list.map((p) => {
          const lit = Boolean(picked) && p.id === picked?.id
          const dim = Boolean(picked) && !lit
          // quiz: названия спрятаны у всех сцен — иначе ответ угадывается методом исключения
          const hidden = Boolean(quiz)
          return (
            <SceneCell
              key={p.id}
              name={p.name}
              ru={p.ru}
              lit={lit}
              dim={dim}
              hidden={hidden}
              compact={single}
              slim={compact && !single}
              extra={single ? <Sentence source={hidden ? withGap(p.ex) : p.ex} paint="all" gap={BLANK} className="vsp-ex" /> : undefined}
            >
              <SceneSvg label={hidden ? 'Шар и ориентир: подберите предлог места' : `${p.name}: ${p.ru}`} dim={dim}>
                {PLACE_SCENES[p.id]()}
              </SceneSvg>
            </SceneCell>
          )
        })}
      </div>
    </div>
  )
}
