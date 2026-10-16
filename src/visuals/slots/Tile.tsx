import type { ReactNode } from 'react'
import { Glyph } from '../../ui/Glyph'
import type { Pos } from '../../content/types'

interface TileProps {
  /** Часть речи: цвет и форма. Без неё плитка нейтральная. */
  pos?: Pos
  /** Роль слова в строке: S, V, aux, mid… Пусто — подпись скрыта. */
  role?: ReactNode
  word: ReactNode
  on?: boolean
  dim?: boolean
  /** Слово, которого нет в исходной фразе (do-support) или пустой слот. */
  ghost?: boolean
  empty?: boolean
  tileRef?: (el: HTMLElement | null) => void
}

/** Плитка-слот: роль сверху (с формой части речи), слово снизу. */
export function Tile({ pos, role, word, on, dim, ghost, empty, tileRef }: TileProps) {
  return (
    <span ref={tileRef} className="vsl-tile" data-pos={pos} data-on={on || undefined} data-dim={dim || undefined} data-ghost={ghost || undefined} data-empty={empty || undefined}>
      <span className="vsl-role">
        {pos && <Glyph pos={pos} size={12} />}
        {role}
      </span>
      <b className="vsl-word">{word}</b>
    </span>
  )
}
