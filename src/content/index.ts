import { TOPICS } from './catalog'
import { CUSTOM_TOPIC_ID } from './custom'
import type { Item, Topic, TopicBody } from './types'

// Темы подхватываются автоматически: файл src/content/topics/<id>.ts с export default TopicBody.
const modules = import.meta.glob<{ default: TopicBody }>('./topics/*.ts', { eager: true })

const bodies = new Map<string, TopicBody>()
for (const [path, mod] of Object.entries(modules)) {
  const id = path.slice('./topics/'.length, -'.ts'.length)
  bodies.set(id, mod.default)
}

/** Только темы, у которых уже есть содержимое, в порядке рекомендуемого пути. */
export const topics: Topic[] = TOPICS.flatMap((meta) => {
  const body = bodies.get(meta.id)
  return body ? [{ ...meta, ...body }] : []
})

export const topicById = new Map(topics.map((t) => [t.id, t]))

export const itemById = new Map<string, { item: Item; topic: Topic }>(
  topics.flatMap((topic) => topic.items.map((item) => [item.id, { item, topic }] as const)),
)

export { bodies as topicBodies }

/**
 * Тема «Мои предложения» строится из прогресса пользователя. Регистрируем её в общих списках на месте,
 * чтобы занятия, прогресс и справочник видели её так же, как обычные темы.
 */
export function setCustomTopic(topic: Topic | null) {
  const at = topics.findIndex((t) => t.id === CUSTOM_TOPIC_ID)
  if (at !== -1) {
    for (const item of topics[at]!.items) itemById.delete(item.id)
    topics.splice(at, 1)
    topicById.delete(CUSTOM_TOPIC_ID)
  }
  if (!topic) return
  topics.push(topic)
  topicById.set(topic.id, topic)
  for (const item of topic.items) itemById.set(item.id, { item, topic })
}
