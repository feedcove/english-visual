// Каталог схем — единственный источник id и ключей подсветки (focus).
// Компоненты лежат в src/visuals/<family>/, контент ссылается на схемы только по этим id.
// Валидатор контента проверяет item.focus и variant.visual.focus по этим спискам.

const PERSONS = ['i', 'you', 'he', 'she', 'it', 'we', 'they'] as const
const PRON_FORMS = ['subj', 'obj', 'poss', 'posspron', 'refl'] as const
const TIMES = ['past', 'present', 'future'] as const
const ASPECTS = ['simple', 'cont', 'perf', 'perfcont'] as const
const QUANT = ['some', 'any', 'no', 'every'] as const
const KINDS = ['body', 'thing', 'where'] as const

const cross = (a: readonly string[], b: readonly string[]) => a.flatMap((x) => b.map((y) => `${x}.${y}`))
const tenseKeys = [...cross(TIMES, ASPECTS), ...TIMES, ...ASPECTS]

export type Family = 'grid' | 'slots' | 'timeline' | 'spatial' | 'sets' | 'graph'

export interface VisualSpec {
  family: Family
  title: string
  /** Что рисует схема — ТЗ для компонента и подсказка авторам контента. */
  desc: string
  focus: readonly string[]
}

export const VISUALS = {
  'pos-shapes': {
    family: 'sets',
    title: 'Части речи: формы и цвета',
    desc: 'Три семьи. Предметы (угловатые фигуры): noun ■, pron □, det ▾, num #, adj ◆. Действия (круглые): verb ●, aux ○, adv •. Служебные связки: prep ⌒, conj =, part ‘. У каждой фигуры — английское и русское название, вопрос (кто? что? / какой? / что делает? / как? где?) и пример на двух языках. Ключ ru показывает русские примеры и русские вопросы.',
    focus: ['noun', 'pron', 'det', 'num', 'adj', 'verb', 'aux', 'adv', 'prep', 'conj', 'part', 'ru', 'questions'],
  },
  'pos-bridge': {
    family: 'graph',
    title: 'Один цвет — два языка',
    desc: 'Два предложения одно под другим: русское и английское, слова раскрашены по частям речи, одинаковые роли соединены линиями. Подсвечены «лишние» в английском слова (артикль, вспомогательный, be, there) и то, что в русском делает окончание, а в английском — предлог или порядок слов.',
    focus: ['same', 'article', 'aux', 'be', 'case', 'order', 'there'],
  },
  cascade: {
    family: 'graph',
    title: 'Лесенка',
    desc: 'Одно длинное предложение двумя способами: обычной строкой и «лесенкой» (одна фраза — одна строка, отступ показывает, к чему фраза относится; подлежащее левее сказуемого, дополнения и обстоятельства правее). Строится из графа предложения компонентом Cascade.',
    focus: ['cascade', 'block'],
  },
  'sentence-graph': {
    family: 'graph',
    title: 'Граф предложения',
    desc: 'Сказуемое наверху в центре, от него стрелки к подлежащему, дополнению, обстоятельствам; от существительных — к определениям. На каждой стрелке — школьный вопрос (кто? что? какой? где?). Слова в строке подчёркнуты по членам предложения: подлежащее — одна черта, сказуемое — две, дополнение — пунктир, определение — волнистая, обстоятельство — точка-тире, служебные — без линии. Вид «группы»: рамки поддеревьев как NP / VP / PP из дерева Хомского.',
    focus: ['root', 'subj', 'obj', 'compl', 'attr', 'adv', 'aux', 'part', 'prep', 'cc', 'conj', 'mark', 'members', 'groups'],
  },
  'pron-grid': {
    family: 'grid',
    title: 'Сетка местоимений',
    desc: 'Строки — лица (I, you, he, she, it, we, they), столбцы — формы: subj (I), obj (me), poss (my + сущ.), posspron (mine), refl (myself). Над столбцами — где стоит форма: перед глаголом / после глагола и предлога / перед существительным / вместо существительного / «сам себя». Ключи: форма, лицо или форма.лицо.',
    focus: [...PRON_FORMS, ...PERSONS, ...cross(PRON_FORMS, PERSONS)],
  },
  'be-forms': {
    family: 'grid',
    title: 'Глагол to be',
    desc: 'Сетка лицо × время: I am / was; he, she, it is / was; you, we, they are / were. Справа — отрицание (isn’t, aren’t, wasn’t) и вопрос (перестановка: Is he…?).',
    focus: ['am', 'is', 'are', 'was', 'were', 'negative', 'question'],
  },
  'verb-person': {
    family: 'grid',
    title: 'Present Simple по лицам',
    desc: 'I / you / we / they work; he / she / it work+s. Правила окончания: +s, +es (go → goes, watch → watches), y → ies (study → studies). Под таблицей вспомогательные do / does для вопроса и отрицания: после does глагол без -s.',
    focus: ['base', 's', 'es', 'ies', 'do', 'does', 'have-has'],
  },
  'near-far': {
    family: 'grid',
    title: 'this / that / these / those',
    desc: 'Сетка 2 × 2: близко / далеко × одно / много. Человечек и предметы на разном расстоянии.',
    focus: ['this', 'that', 'these', 'those'],
  },
  'indef-grid': {
    family: 'grid',
    title: 'some- / any- / no- / every-',
    desc: 'Сетка 4 × 3: строки some / any / no / every, столбцы -body (люди), -thing (вещи), -where (места). Подписи: some — в утверждении, any — в вопросе и после not, no — уже отрицание (без not), every — все.',
    focus: [...QUANT, ...KINDS, ...cross(QUANT, KINDS)],
  },
  'word-train': {
    family: 'slots',
    title: 'Порядок слов: поезд',
    desc: 'Вагоны слева направо: S (кто) — V (что делает) — O (что, кого) — M (как) — P (где) — T (когда). Время можно перецепить в начало. Цвета вагонов — по частям речи главного слова.',
    focus: ['S', 'V', 'O', 'M', 'P', 'T'],
  },
  'adv-slots': {
    family: 'slots',
    title: 'Место наречия',
    desc: 'Строка слотов: [front] S [mid] V O [end]. Наречия частоты (always, often, never) — mid: перед смысловым глаголом, но ПОСЛЕ am / is / are и после первого вспомогательного. Образ действия, место, время — end. Степени (very, really) — перед прилагательным.',
    focus: ['front', 'mid', 'mid-be', 'end', 'before-adj'],
  },
  'aux-formula': {
    family: 'slots',
    title: 'Формула: утверждение, отрицание, вопрос',
    desc: 'Три строки слотов с вспомогательным глаголом как «двигателем»: S + aux + V; S + aux + not + V; (Wh) + aux + S + V? Если вспомогательного нет — подставляем do / does / did. Короткий ответ: Yes, I do. / No, she doesn’t.',
    focus: ['statement', 'negative', 'question', 'wh', 'short', 'do-support'],
  },
  'adj-order': {
    family: 'slots',
    title: 'Порядок прилагательных',
    desc: 'Слоты перед существительным: opinion — size — age — shape — colour — origin — material — purpose — СУЩЕСТВИТЕЛЬНОЕ. Пример: a lovely little old round red Italian wooden dining table (показать 2–3 слота, остальные пустые).',
    focus: ['opinion', 'size', 'age', 'shape', 'colour', 'origin', 'material', 'purpose'],
  },
  timeline: {
    family: 'timeline',
    title: 'Время на оси',
    desc: 'Одна ось: прошлое — NOW — будущее. Simple = точка или повтор точек, Continuous = волнистый отрезок вокруг момента, Perfect = точка до момента + стрелка к нему, Perfect Continuous = отрезок, доходящий до момента. Для past/future момент — свой маркер на оси. С quiz скрывает название времени и формулу.',
    focus: tenseKeys,
  },
  'tense-map': {
    family: 'timeline',
    title: 'Карта 12 времён',
    desc: 'Сетка 3 × 4: столбцы past / present / future, строки simple / continuous / perfect / perfect continuous. В каждой ячейке мини-ось с тем же символом аспекта, что в timeline, и формула чипами (have + V3).',
    focus: tenseKeys,
  },
  'pp-vs-ps': {
    family: 'timeline',
    title: 'Present Perfect или Past Simple',
    desc: 'Две оси одна над другой. Past Simple: событие в закрытом отрезке прошлого (yesterday, ago, last week, in 2019). Present Perfect: событие где-то до NOW, важен результат сейчас (ever, never, just, already, yet, since, for). Маркеры — чипами у своей оси.',
    focus: ['ps', 'pp', 'since', 'for', 'markers-ps', 'markers-pp'],
  },
  'future-forms': {
    family: 'timeline',
    title: 'Будущее: will / going to / Present Continuous',
    desc: 'Ось с NOW. will — решение в момент речи или предсказание (облачко мысли на NOW); going to — план или признаки уже есть (стрелка из NOW к событию); Present Continuous — договорённость (календарь у события).',
    focus: ['will', 'going-to', 'pres-cont'],
  },
  'prep-place': {
    family: 'spatial',
    title: 'Предлоги места',
    desc: 'Сцены «траектор — ориентир»: маленький цветной шар относительно серого ориентира. in — внутри коробки, on — на поверхности, at — у точки, under, above / over, next to, between, behind, in front of, opposite. Подпись у каждой сцены.',
    focus: ['in', 'on', 'at', 'under', 'above', 'next-to', 'between', 'behind', 'in-front-of', 'opposite'],
  },
  'prep-time': {
    family: 'spatial',
    title: 'Предлоги времени',
    desc: 'Тот же образ, что в местах: at = точка (at 5 o’clock, at night, at the weekend), on = поверхность-день (on Monday, on 3 May, on my birthday), in = контейнер-период (in June, in 2020, in the morning, in summer). Вложенные масштабы: точка внутри дня внутри месяца.',
    focus: ['at', 'on', 'in', 'no-prep'],
  },
  'prep-motion': {
    family: 'spatial',
    title: 'Предлоги движения',
    desc: 'Траектория шара стрелкой относительно ориентира: to, into, out of, onto, off, through, across, along, up, down, past, towards, from.',
    focus: ['to', 'into', 'out-of', 'onto', 'off', 'through', 'across', 'along', 'up', 'down', 'past', 'towards', 'from'],
  },
  'article-tree': {
    family: 'sets',
    title: 'Дерево артиклей',
    desc: 'Вопрос 1: понятно, какой именно? (уже говорили / единственный / ясно из ситуации) → да: THE. Нет → вопрос 2: исчисляемое в единственном числе? → да: A / AN; нет (мн. ч. или неисчисляемое) → без артикля (∅, для количества — some). Сбоку: устойчивые случаи (go to school, by bus, at home).',
    focus: ['q-known', 'q-single', 'the', 'a', 'zero', 'fixed'],
  },
  'a-an': {
    family: 'sets',
    title: 'a или an — по звуку',
    desc: 'Две дорожки по ПЕРВОМУ ЗВУКУ слова, не по букве: a + согласный звук (a cat, a university /ju/, a one-way ticket), an + гласный звук (an apple, an hour /aʊ/, an MP). Транскрипция первого звука крупно.',
    focus: ['a', 'an'],
  },
  'plural-rules': {
    family: 'sets',
    title: 'Множественное число',
    desc: 'Лента правил: +s (cat → cats), +es после s, x, ch, sh и часто o (box → boxes), согласная + y → ies (city → cities), f / fe → ves (knife → knives), особые (man → men, child → children, mouse → mice), одинаковые (sheep, fish).',
    focus: ['s', 'es', 'ies', 'ves', 'irregular', 'same'],
  },
  'count-mass': {
    family: 'sets',
    title: 'Исчисляемые и неисчисляемые',
    desc: 'Две корзины. Исчисляемые — отдельные фигурки (a / an, -s, many, few, how many). Неисчисляемые — масса, жидкость в сосуде (без a / an и -s, much, little, how much). Мост: a piece of advice, a cup of tea, a loaf of bread.',
    focus: ['count', 'mass', 'piece'],
  },
  'quant-scale': {
    family: 'sets',
    title: 'Шкала количества',
    desc: 'Шкала от 0 до «все» в две строки: исчисляемые (no, a few / few, some / any, many, a lot of, all) и неисчисляемые (no, a little / little, some / any, much, a lot of, all). few / little = мало (негатив), a few / a little = немного (позитив).',
    focus: ['no', 'few', 'a-few', 'little', 'a-little', 'some', 'any', 'many', 'much', 'a-lot', 'all'],
  },
  'there-it': {
    family: 'sets',
    title: 'there is или it is',
    desc: 'Слева — there is / are: сообщаем, что что-то ЕСТЬ где-то (новое, часто с a / some). Справа — it is: описываем то, о чём уже знаем, погода, время, расстояние. Мост: There is a cat in the garden. It is black.',
    focus: ['there', 'it', 'there-plural'],
  },
  'adj-adv': {
    family: 'sets',
    title: 'Прилагательное или наречие',
    desc: 'Прилагательное ◆ цепляется к существительному или стоит после be / look / feel (a quick answer, she is quick). Наречие • цепляется к глаголу (answer quickly). Образование -ly и исключения: good → well, fast → fast, hard → hard, late → late.',
    focus: ['adj', 'adv', 'ly', 'irregular', 'linking'],
  },
  'comparison-steps': {
    family: 'sets',
    title: 'Степени сравнения',
    desc: 'Три ступени высотой: positive — comparative — superlative. Ряды: короткие (+er / +est, big → bigger, happy → happier), длинные (more / most), неправильные (good / better / best, bad / worse / worst, far / further / furthest). Рядом: as … as (равные столбики) и less / least.',
    focus: ['er', 'more', 'irregular', 'as', 'less', 'than'],
  },
  'modal-scale': {
    family: 'sets',
    title: 'Модальные глаголы',
    desc: 'Две шкалы. Уверенность: must (почти точно) — should — may / might / could (возможно) — can’t (точно нет). Обязанность и совет: must / have to — should (совет) — don’t have to (не обязательно) — mustn’t (нельзя). Отдельно: can / could — умение и разрешение. После модального — глагол без to.',
    focus: ['must', 'have-to', 'should', 'can', 'could', 'may', 'might', 'cant', 'mustnt', 'dont-have-to'],
  },
  'verb-forms': {
    family: 'sets',
    title: 'Три формы глагола',
    desc: 'V1 — V2 (Past Simple) — V3 (Perfect, пассив). Группы по узору: regular (work — worked — worked), AAA (cut — cut — cut), ABB (buy — bought — bought), ABC (write — wrote — written), ABA (come — came — come).',
    focus: ['regular', 'aaa', 'abb', 'abc', 'aba', 'v2', 'v3'],
  },
  'state-action': {
    family: 'sets',
    title: 'Глаголы состояния и действия',
    desc: 'Состояние (know, like, want, need, own, believe, seem) — обычно не в Continuous. Действие (work, read, cook) — Continuous можно. Двойные: think, have, see, taste — в значении действия Continuous возможен (I’m having lunch, но I have a car).',
    focus: ['state', 'action', 'both'],
  },
  'phrasal-particles': {
    family: 'sets',
    title: 'Частицы фразовых глаголов',
    desc: 'Карта частиц со значением-образом: up (вверх, до конца), down (вниз, меньше), out (наружу, до конца, выяснить), off (прочь, выключить), on (дальше, включить, надеть), in (внутрь), back (обратно), over (заново, через), away (прочь). Под каждой 1–2 глагола.',
    focus: ['up', 'down', 'out', 'off', 'on', 'in', 'back', 'over', 'away', 'separable'],
  },
  'conj-links': {
    family: 'sets',
    title: 'Союзы-связки',
    desc: 'Связка между двумя блоками-предложениями, у каждой своя стрелка смысла: and (+), but (против), or (выбор), so (следствие), because (причина), although (вопреки), when (время), if (условие).',
    focus: ['and', 'but', 'or', 'so', 'because', 'although', 'when', 'if'],
  },
  'ed-ing': {
    family: 'sets',
    title: '-ed или -ing',
    desc: 'Фильм (источник) → человек (чувство). -ing описывает то, что вызывает чувство (The film is boring), -ed — что чувствует человек (I am bored).',
    focus: ['ed', 'ing'],
  },
  'possessive-s': {
    family: 'sets',
    title: 'Притяжательный ’s',
    desc: 'Чей? Anna’s bag (один владелец + ’s), my parents’ house (мн. ч. на -s + ’), the children’s toys (особое мн. ч. + ’s), the end of the film (для вещей чаще of).',
    focus: ['s', 's-plural', 'irregular-plural', 'of'],
  },
} as const satisfies Record<string, VisualSpec>

export type VisualId = keyof typeof VISUALS

export function isVisualId(id: string): id is VisualId {
  return Object.hasOwn(VISUALS, id)
}
