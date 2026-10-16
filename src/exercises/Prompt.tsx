import type { Variant } from '../content/types'

/** Строка-задание над упражнением. Навык до ответа не называем: он часто содержит сам ответ (him — после глагола). */
export function Prompt({ variant, fallback }: { variant: Variant; fallback: string }) {
  return (
    <div className="ex-prompt">
      <p className="ex-q">{variant.q ?? fallback}</p>
    </div>
  )
}
