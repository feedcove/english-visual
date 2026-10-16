import { VISUALS, isVisualId } from './catalog'
import type { VisualComponent, VisualFamilyModule, VisualProps } from './types'

// Семьи схем подхватываются сами: src/visuals/<family>/index.ts(x) c export default { id: Component }.
const families = import.meta.glob<{ default: VisualFamilyModule }>('./*/index.{ts,tsx}', { eager: true })

export const visualRegistry = new Map<string, VisualComponent>()
for (const mod of Object.values(families)) {
  for (const [id, component] of Object.entries(mod.default)) {
    if (component) visualRegistry.set(id, component)
  }
}

interface Props extends VisualProps {
  id: string
}

/** Схема по id. Если компонента ещё нет — аккуратная заглушка с названием, чтобы экран не ломался. */
export function Visual({ id, ...props }: Props) {
  const Component = visualRegistry.get(id)
  if (Component) {
    return (
      <figure className="visual" data-visual={id} data-compact={props.compact || undefined}>
        <Component {...props} />
      </figure>
    )
  }
  return (
    <figure className="visual visual-missing" data-visual={id}>
      <figcaption>{isVisualId(id) ? VISUALS[id].title : id}</figcaption>
    </figure>
  )
}
