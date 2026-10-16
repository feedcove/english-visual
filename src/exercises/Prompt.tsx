import type { Item, Variant } from '../content/types'

/** Строка-задание над упражнением. Тема навыка показывается только при знакомстве — в повторах её не подсказываем. */
export function Prompt({ item, variant, showSkill, fallback }: { item: Item; variant: Variant; showSkill?: boolean; fallback: string }) {
  return (
    <div className="ex-prompt">
      <p className="ex-q">{variant.q ?? fallback}</p>
      {showSkill && <p className="ex-skill">{item.skill}</p>}
    </div>
  )
}
