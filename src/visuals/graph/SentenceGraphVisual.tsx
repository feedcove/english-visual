import { useState } from 'react'
import { RELS } from '../../content/graph'
import type { Rel } from '../../content/types'
import { Segmented } from '../../ui/kit'
import type { VisualProps } from '../types'
import { SentenceGraph, useSentenceGraph } from './SentenceGraph'
import type { GraphView, SentenceGraphProps } from './SentenceGraph'

// Схема «Граф предложения»: пара RU/EN с одним и тем же графом. Вид переключается, focus подсвечивает отношение или вид.

interface Sample {
  ru: { source: string; graph: string }
  en: { source: string; graph: string }
}

const SAMPLES = {
  base: {
    ru: { source: 'Мама_N передвинула_V старый_J стол_N', graph: '1>2 subj, 3>4 attr, 4>2 obj' },
    en: { source: 'Mum_N moved_V the_D old_J table_N', graph: '1>2 subj, 3>5 attr, 4>5 attr, 5>2 obj' },
  },
  compl: {
    ru: { source: 'Мама_N была_V врачом_N', graph: '1>2 subj, 3>2 compl' },
    en: { source: 'Mum_N was_V a_D doctor_N', graph: '1>2 subj, 3>4 attr, 4>2 compl' },
  },
  adv: {
    ru: { source: 'Мама_N вчера_R передвинула_V стол_N', graph: '1>3 subj, 2>3 adv, 4>3 obj' },
    en: { source: 'Mum_N moved_V the_D table_N yesterday_R', graph: '1>2 subj, 3>4 attr, 4>2 obj, 5>2 adv' },
  },
  aux: {
    ru: { source: 'Мама_N не_X будет_A двигать_V стол_N', graph: '1>4 subj, 2>4 part, 3>4 aux, 5>4 obj' },
    en: { source: 'Mum_N will_A not_X move_V the_D table_N', graph: '1>4 subj, 2>4 aux, 3>4 part, 5>6 attr, 6>4 obj' },
  },
  prep: {
    ru: { source: 'Мама_N передвинула_V стол_N в_I комнату_N', graph: '1>2 subj, 3>2 obj, 4>5 prep, 5>2 adv' },
    en: { source: 'Mum_N moved_V the_D table_N into_I the_D room_N', graph: '1>2 subj, 3>4 attr, 4>2 obj, 5>7 prep, 6>7 attr, 7>2 adv' },
  },
  coord: {
    ru: { source: 'Мама_N передвинула_V стол_N и_C стул_N', graph: '1>2 subj, 3>2 obj, 4>5 cc, 5>3 conj' },
    en: { source: 'Mum_N moved_V the_D table_N and_C the_D chair_N', graph: '1>2 subj, 3>4 attr, 4>2 obj, 5>7 cc, 6>7 attr, 7>4 conj' },
  },
  mark: {
    ru: { source: 'Мама_N сказала_V, что_C стол_N был_V старым_J', graph: '1>2 subj, 3>5 mark, 4>5 subj, 5>2 obj, 6>5 compl' },
    en: { source: 'Mum_N said_V that_C the_D table_N was_V old_J', graph: '1>2 subj, 3>6 mark, 4>5 attr, 5>6 subj, 6>2 obj, 7>6 compl' },
  },
} satisfies Record<string, Sample>

type SampleId = keyof typeof SAMPLES

/** Какой пример показывает отношение: в базовой паре есть только подлежащее, дополнение и определение. */
const SAMPLE_FOR: Partial<Record<string, SampleId>> = {
  compl: 'compl',
  adv: 'adv',
  aux: 'aux',
  part: 'aux',
  prep: 'prep',
  cc: 'coord',
  conj: 'coord',
  mark: 'mark',
}

const VIEWS: { value: GraphView; label: string }[] = [
  { value: 'tree', label: 'Дерево' },
  { value: 'members', label: 'Члены' },
  { value: 'groups', label: 'Группы' },
]

function viewFor(focus?: string): GraphView {
  return focus === 'members' || focus === 'groups' ? focus : 'tree'
}

function isRel(key?: string): key is Rel {
  return Boolean(key) && Object.hasOwn(RELS, key!)
}

function Lang({ lang, text, focus, view, hideLabels, quiz, compact }: { lang: 'ru' | 'en'; text: Sample['ru']; focus?: string; view: GraphView; hideLabels?: boolean; quiz?: boolean; compact?: boolean }) {
  const parsed = useSentenceGraph(text.source, text.graph)
  const highlight: SentenceGraphProps['highlight'] = isRel(focus) ? { rel: focus } : focus === 'root' && parsed.graph ? { word: parsed.graph.root } : undefined
  return (
    <div className="sgv-lang">
      {!compact && (
        <span className="sgv-tag" lang="ru">
          {lang === 'ru' ? 'по-русски' : 'по-английски'}
        </span>
      )}
      <SentenceGraph source={text.source} graph={text.graph} lang={lang} view={view} highlight={highlight} hideLabels={hideLabels} quiz={quiz} compact={compact} />
    </div>
  )
}

export function SentenceGraphVisual({ focus, compact, quiz }: VisualProps) {
  const sample = SAMPLES[(focus && SAMPLE_FOR[focus]) || 'base']
  const [pick, setPick] = useState<{ focus?: string; view: GraphView }>({ view: viewFor(focus) })
  const view = pick.focus === focus ? pick.view : viewFor(focus)
  const fixed = Boolean(compact || quiz)
  return (
    <div className="sgv" data-compact={compact || undefined}>
      {!fixed && (
        <Segmented<GraphView> value={view} onChange={(v) => setPick({ focus, view: v })} options={VIEWS} block label="Вид схемы" />
      )}
      {compact ? (
        <Lang lang="en" text={sample.en} focus={focus} view={view} compact />
      ) : (
        <>
          <Lang lang="ru" text={sample.ru} focus={focus} view={view} quiz={quiz} />
          <Lang lang="en" text={sample.en} focus={focus} view={view} quiz={quiz} />
        </>
      )}
    </div>
  )
}
