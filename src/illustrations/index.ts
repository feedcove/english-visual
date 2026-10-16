import type { Story, TopicStories } from './types'

// Истории подхватываются сами: src/illustrations/stories/<topic-id>.tsx c export default Story[].
const modules = import.meta.glob<{ default: TopicStories }>('./stories/*.tsx', { eager: true })

export const storiesByTopic = new Map<string, Story[]>()
for (const [path, mod] of Object.entries(modules)) {
  const id = path.slice('./stories/'.length, -'.tsx'.length)
  storiesByTopic.set(id, mod.default)
}

export function storiesFor(topicId: string): Story[] {
  return storiesByTopic.get(topicId) ?? []
}

/** История для разбора ошибки: та, что объясняет focus навыка, иначе первая в теме. */
export function storyForFocus(topicId: string, focus?: string): Story | undefined {
  const list = storiesFor(topicId)
  if (!focus) return list[0]
  const exact = list.find((s) => s.focus?.includes(focus))
  // Составной ключ (obj.he) объясняется и историей про его часть (obj или he).
  const part = list.find((s) => focus.split('.').some((p) => s.focus?.includes(p)))
  return exact ?? part ?? list[0]
}
