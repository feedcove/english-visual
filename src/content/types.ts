// Модель контента. Тема = паспорт (catalog.ts) + справочник (ref) + атомарные навыки (items) для тренажёра.
// Предложения пишутся в мини-разметке, см. src/content/sentence.ts.

/** Часть речи. Красим по функции в предложении — одинаково для английского и русского. */
export type Pos = 'noun' | 'pron' | 'det' | 'num' | 'adj' | 'verb' | 'aux' | 'adv' | 'prep' | 'conj' | 'part'

/**
 * Связь в графе предложения (упрощённые Universal Dependencies + русские школьные вопросы).
 * Корень (сказуемое) в разметке не пишется — это слово без хозяина.
 */
export type Rel =
  | 'subj' // подлежащее: кто? что?
  | 'obj' // дополнение: кого? что? кому? чем?
  | 'compl' // именная часть после be/seem: кто? какой? (She is a doctor)
  | 'attr' // определение: какой? чей? сколько? (артикли и определители тоже сюда)
  | 'adv' // обстоятельство: где? когда? как? почему?
  | 'aux' // вспомогательный глагол при смысловом
  | 'part' // частица: not, to, не, бы
  | 'prep' // предлог — висит на своём существительном
  | 'cc' // сочинительный союз — висит на втором однородном
  | 'conj' // однородный член — висит на первом
  | 'mark' // подчинительный союз (because, when, что) — висит на глаголе придаточного

export type Lang = 'en' | 'ru'

export type Level = 'A1' | 'A2' | 'B1' | 'B2'

export type AreaId = 'words' | 'pronouns' | 'nouns' | 'verbs' | 'describe' | 'prepositions' | 'sentence'

export interface Area {
  id: AreaId
  title: string
  pos?: Pos
}

/** Ссылка на визуальную схему: id из src/visuals/catalog.ts + что в ней подсветить. */
export interface VisualRef {
  id: string
  focus?: string
}

export interface Variant {
  /**
   * Предложение в разметке (src/content/sentence.ts).
   * gap — ровно один пропуск [ответ]; order — без пропусков; choice — можно {цель} или вовсе без s, если есть visual;
   * tag и graph — все слова с частью речи; pick — правильные слова помечены {так}.
   */
  s?: string
  /** Язык s. По умолчанию en. */
  lang?: Lang
  /** Перевод: для en — по-русски, для ru — по-английски. Обязателен для gap, order, tag, graph. */
  tr?: string
  /** Только для choice: правильный вариант. В gap ответ — это пропуск в s. */
  answer?: string
  /** Неверные варианты для выбора (без правильного ответа). */
  options?: string[]
  /** gap: другие верные ответы при вводе; order: другие верные порядки целым предложением. order: options — лишние плитки. */
  accept?: string[]
  /** Вопрос над заданием, если одного предложения мало: «Какое время на схеме?» */
  q?: string
  /** Схема как подсказка в самом задании (например, тайм-лайн времени). */
  visual?: VisualRef
  /**
   * Только graph: связи «слово > хозяин отношение» через запятую, слова нумеруются с 1 без пунктуации.
   * "Mum_N moved_V the_D table_N ." → "1>2 subj, 3>4 attr, 4>2 obj". Каждое слово, кроме корня, — ровно один раз.
   */
  graph?: string
  /** order: исходные короткие предложения, которые нужно склеить в s (sentence combining). */
  from?: string[]
  /** pick: образец с {целью} — «найди слово с той же ролью, что выделенное здесь». */
  model?: string
  /** Короткое объяснение после ответа. Если нет — берётся item.why. */
  why?: string
}

/**
 * Навык — единица расписания повторений (FSRS). Варианты — разные предложения на одно правило,
 * чтобы при повторе запоминалось правило, а не конкретная фраза.
 * - gap: пропуск; новый навык — выбор из вариантов, окрепший — ввод с клавиатуры
 * - order: собрать предложение из плиток (порядок слов)
 * - choice: только выбор (когда вводить нечего: часть речи, время по схеме)
 * - tag: раскрасить каждое слово предложения по части речи
 * - graph: собрать граф предложения — сказуемое, подлежащее, к какому слову относится остальное
 * - pick: найти слово (или все слова) в предложении: «найди прилагательное», «та же роль, что в образце»
 */
export interface Item {
  id: string
  skill: string
  mode?: 'gap' | 'order' | 'choice' | 'tag' | 'graph' | 'pick'
  /** Что подсветить на главной схеме темы при разборе ответа. */
  focus?: string
  why?: string
  level?: Level
  variants: Variant[]
}

/** Пример в справочнике: s — в разметке на языке lang, tr — перевод. */
export interface Example {
  s: string
  tr: string
  lang?: Lang
}

export type RefBlock =
  | { kind: 'visual'; visual: VisualRef; caption?: string }
  | { kind: 'rule'; title: string; text: string; examples?: Example[] }
  | { kind: 'table'; title?: string; head: string[]; rows: string[][]; lang?: Lang }
  /** Как это в русском: ru и en — в разметке. */
  | { kind: 'contrast'; title?: string; ru: string; en: string; note: string }
  | { kind: 'mistakes'; items: { wrong: string; right: string; note?: string }[] }
  | { kind: 'tip'; text: string }

/** Паспорт темы. Живёт в src/content/catalog.ts; порядок массива = рекомендуемый путь. */
export interface TopicMeta {
  id: string
  area: AreaId
  title: string
  titleEn: string
  level: Level
  /** Главная схема темы: показывается в карточке темы и при разборе ответов. */
  visual: string
  /** Границы темы для авторов: что входит, чего не трогать (это у соседей). */
  scope: string
  /** Сколько навыков ожидается — ориентир для автора и для прогресса. */
  size: number
  /** Тема переносится из старого тренажёра. */
  source?: 'old-trainer'
}

/** Содержимое темы: файл src/content/topics/<id>.ts, export default. */
export interface TopicBody {
  /** Одна строка: в чём суть темы. */
  summary: string
  ref: RefBlock[]
  items: Item[]
}

export type Topic = TopicMeta & TopicBody

/** Своё предложение, разобранное парсером (CoNLL-U → разметка). Черновик: парсер может ошибаться. */
export interface CustomSentence {
  id: string
  s: string
  graph: string
  lang: Lang
  /** Исходный текст предложения. */
  text: string
  addedAt: number
}
