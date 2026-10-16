import type { ReactNode } from 'react'
import { POS } from '../../content/pos'
import type { Pos } from '../../content/types'
import { Glyph } from '../../ui/Glyph'

// Общие кирпичи семьи sets2 (префикс vx2-): подпись части речи, плашка-слово, стрелка с вопросом, секция.

/** Ключ focus из списка допустимых; незнакомый ключ считается «без подсветки». */
export function pickFocus<K extends string>(focus: string | undefined, keys: readonly K[]): K | undefined {
  return keys.includes(focus as K) ? (focus as K) : undefined
}

export type Mark = 'on' | 'dim' | undefined

/** Состояние элемента при подсветке: нет focus — обычный вид; иначе выбранный горит, остальные приглушены. */
export function markOf(hasFocus: boolean, lit: boolean): Mark {
  return !hasFocus ? undefined : lit ? 'on' : 'dim'
}

export function markAttrs(m: Mark) {
  return { 'data-on': m === 'on' || undefined, 'data-dim': m === 'dim' || undefined }
}

/** Глиф + название части речи (цвет берётся из ближайшего data-pos). */
export function Tag({ pos, label, size = 14 }: { pos: Pos; label?: ReactNode; size?: number }) {
  return (
    <span className="vx2-tag" data-pos={pos}>
      <Glyph pos={pos} size={size} />
      {label ?? POS[pos].short}
    </span>
  )
}

interface PillProps {
  pos: Pos
  text: ReactNode
  /** Подпись части речи под словом. */
  cap?: ReactNode
  mark?: Mark
  /** Спрятать слово, показать «?». */
  mask?: boolean
}

/** Слово-плашка: форма части речи + слово цветом части речи + подпись под ним. */
export function Pill({ pos, text, cap, mark, mask }: PillProps) {
  return (
    <span className="vx2-pill" data-pos={pos} {...markAttrs(mark)}>
      <span className="vx2-pill-w">
        <Glyph pos={pos} size={13} />
        {mask ? <span className="vx2-q">?</span> : text}
      </span>
      {cap ? <span className="vx2-pill-cap">{cap}</span> : null}
    </span>
  )
}

/** Короткая стрелка с подписью-вопросом над ней. dir=left — стрелка к левому слову. */
export function Arrow({ label, dir = 'right', dashed }: { label?: ReactNode; dir?: 'left' | 'right'; dashed?: boolean }) {
  return (
    <span className="vx2-arrow" data-dir={dir}>
      <span className="vx2-arrow-l">{label}</span>
      <svg viewBox="0 0 40 10" aria-hidden="true">
        <path d="M1 5H36" strokeDasharray={dashed ? '3 3' : undefined} />
        <path d="M32 1.5 36.5 5 32 8.5" />
      </svg>
    </span>
  )
}

interface SecProps {
  pos: Pos
  title?: ReactNode
  hint?: ReactNode
  mark?: Mark
  /** Без заголовка (режим quiz и мини-версия). */
  bare?: boolean
  children: ReactNode
}

/** Блок схемы: подсвеченный — фон и обводка цвета части речи, остальные приглушены. */
export function Sec({ pos, title, hint, mark, bare, children }: SecProps) {
  return (
    <section className="vx2-sec" data-pos={pos} {...markAttrs(mark)}>
      {!bare && (
        <header className="vx2-sec-h">
          <Tag pos={pos} label={title} />
          {hint ? <span className="vx2-sec-hint">{hint}</span> : null}
        </header>
      )}
      {children}
    </section>
  )
}
