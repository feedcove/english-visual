import type { Area, AreaId, TopicMeta } from './types'

export const AREAS: Record<AreaId, Area> = {
  words: { id: 'words', title: 'Части речи' },
  pronouns: { id: 'pronouns', title: 'Местоимения', pos: 'pron' },
  nouns: { id: 'nouns', title: 'Существительные и артикли', pos: 'noun' },
  verbs: { id: 'verbs', title: 'Глаголы и времена', pos: 'verb' },
  describe: { id: 'describe', title: 'Прилагательные и наречия', pos: 'adj' },
  prepositions: { id: 'prepositions', title: 'Предлоги', pos: 'prep' },
  sentence: { id: 'sentence', title: 'Предложение', pos: 'aux' },
}

export const AREA_ORDER: AreaId[] = ['words', 'pronouns', 'nouns', 'verbs', 'describe', 'prepositions', 'sentence']

// Порядок = рекомендуемый путь: сначала то, что ломает любое предложение (местоимения, be, артикли),
// дальше времена и описание. Темы разных разделов чередуются.
export const TOPICS: TopicMeta[] = [
  {
    id: 'pos-ru', area: 'words', title: 'Части речи в русском', titleEn: 'Parts of speech in Russian', level: 'A1', visual: 'pos-shapes', size: 24,
    scope: 'Русские предложения (lang ru): узнать часть речи по вопросу и роли — существительное (кто? что?), прилагательное и причастие (какой? — красим adj), числительное (num), местоимение (pron), глагол (что делать?), деепричастие (что делая? — красим adv), наречие (как? где? когда?), предлог (I), союз (C), частица (не, бы, ли, же — X). Ловушки: хорошо (наречие) vs хороший; краткое прилагательное (он рад — adj); предлог vs приставка (в доме / входит); что, как, когда — союз или местоимение/наречие. Режимы tag (раскрась всё) и choice (часть речи выделенного слова).',
  },
  {
    id: 'pos-map', area: 'words', title: 'Части речи в английском', titleEn: 'Parts of speech', level: 'A1', visual: 'pos-shapes', size: 20,
    scope: 'Узнать часть речи слова в английском предложении: noun, pronoun, determiner/article, numeral, adjective, verb, auxiliary/modal, adverb, preposition, conjunction, particle (not, to). Режимы choice («Какая часть речи у выделенного слова?») и tag. Одно и то же слово в разных ролях (a fast car / run fast, a book / book a table, that — det / pron / conj). Без правил употребления — только роль.',
  },
  {
    id: 'pos-bridge', area: 'words', title: 'Один цвет — два языка', titleEn: 'Russian ↔ English', level: 'A1', visual: 'pos-bridge', size: 14,
    scope: 'Параллельные пары RU/EN с одинаковой раскраской: какие слова есть в английском, но нет в русском (артикли, вспомогательные do / be / have, there, it в It is cold), как падежное окончание превращается в предлог или порядок слов (книга брата → my brother’s book, дать маме → give Mum), «есть» → have / there is. Режимы choice (какого слова нет в русском переводе?) и gap. Подробные правила тем не дублировать.',
  },
  {
    id: 'pron-personal', area: 'pronouns', title: 'I или me', titleEn: 'Subject and object pronouns', level: 'A1', visual: 'pron-grid', size: 16,
    scope: 'Подлежащее (I, you, he, she, it, we, they) и дополнение (me, you, him, her, it, us, them): перед глаголом и после глагола или предлога. it для вещей и животных (ловушка: стол — он). you = ты и вы. Без притяжательных и возвратных.',
  },
  {
    id: 'be-present', area: 'verbs', title: 'to be: am, is, are', titleEn: 'The verb be', level: 'A1', visual: 'be-forms', size: 14,
    scope: 'am / is / are и was / were, отрицание (isn’t, aren’t, wasn’t), вопрос перестановкой (Are you…? Was it…?), сокращения. Ловушка русского: связка «есть» опускается, а в английском be обязателен (She is a doctor, I am hungry, It is cold). Без there is и без Continuous.',
  },
  {
    id: 'sentence-graph', area: 'words', title: 'Граф предложения', titleEn: 'Sentence graph', level: 'A2', visual: 'sentence-graph', size: 20,
    scope: 'Члены предложения и связи в русском и английском (lang ru и en вперемешку, короткие предложения 3–7 слов). Режим graph: найди сказуемое → подлежащее → к какому слову относится выделенное слово и на какой вопрос отвечает. Школьные подчёркивания. Одинаковый граф у пары «Мама передвинула стол / Mum moved the table», артикль — определение при существительном, вспомогательный — при сказуемом. Без придаточных предложений.',
  },
  {
    id: 'a-an', area: 'nouns', title: 'a или an', titleEn: 'A or an', level: 'A1', visual: 'a-an', size: 12,
    scope: 'Выбор a / an только по первому ЗВУКУ следующего слова, включая прилагательное перед существительным (an old car, a big apple). Ловушки: a university, a European, a one-day trip, an hour, an honest man, an MP, an X-ray. Без вопроса, нужен ли артикль вообще.',
  },
  {
    id: 'noun-plural', area: 'nouns', title: 'Множественное число', titleEn: 'Plural nouns', level: 'A1', visual: 'plural-rules', size: 14,
    scope: 'Образование: +s, +es, y → ies (но day → days), f/fe → ves, особые (man/men, woman/women, child/children, person/people, foot/feet, tooth/teeth, mouse/mice), одинаковые (sheep, fish), только мн. ч. (trousers, glasses, scissors). Согласование people are / police are. Без исчисляемости.',
  },
  {
    id: 'there-is', area: 'sentence', title: 'there is / there are', titleEn: 'There is / there are', level: 'A1', visual: 'there-it', size: 12,
    scope: 'Сообщить о наличии: There is a… / There are some… / There isn’t any… / Is there…? there was / were. Выбор there is или it is. Согласование с первым существительным. Ловушка русского: «В комнате есть стол» → There is a table in the room (не In the room is a table).',
  },
  {
    id: 'pron-possessive', area: 'pronouns', title: 'my или mine', titleEn: 'Possessive adjectives and pronouns', level: 'A1', visual: 'pron-grid', size: 16,
    scope: 'Перед существительным: my, your, his, her, its, our, their. Вместо существительного: mine, yours, his, hers, ours, theirs. his / her — по владельцу, а не по предмету (ловушка «свой»: She loves her brother). its ≠ it’s. Whose? Без ’s у существительных.',
  },
  {
    id: 'possessive-s', area: 'nouns', title: 'Anna’s, parents’ и of', titleEn: 'Possessive ’s', level: 'A2', visual: 'possessive-s', size: 10,
    scope: 'Anna’s bag, my parents’ house, the children’s room, James’s / James’ car, of для вещей (the end of the film, the top of the page), двойной владелец (Tom and Kate’s flat). Ловушка русского: «машина брата» → my brother’s car.',
  },
  {
    id: 'present-simple', area: 'verbs', title: 'Present Simple', titleEn: 'Present simple', level: 'A1', visual: 'verb-person', size: 18,
    scope: 'Привычки, факты, расписания. -s у he / she / it (+es, y → ies, have → has), do / does в вопросе и отрицании, после does глагол без -s. Маркеры always, usually, every day, on Mondays. Сравнение с Continuous — НЕ здесь.',
  },
  {
    id: 'aux-questions', area: 'sentence', title: 'Вопросы', titleEn: 'Questions', level: 'A1', visual: 'aux-formula', size: 16,
    scope: 'Порядок (Wh) + aux + S + V: Do you…? Where does she…? Did they…? Are you…? Can he…? Have you…? Вопросы к подлежащему без do (Who lives here? What happened?). Короткие ответы (Yes, I do. No, she isn’t). Ловушка русского: вопрос интонацией без перестановки.',
  },
  {
    id: 'aux-negatives', area: 'sentence', title: 'Отрицания', titleEn: 'Negatives', level: 'A1', visual: 'aux-formula', size: 12,
    scope: 'not сразу после первого вспомогательного: don’t / doesn’t / didn’t + V1, isn’t / aren’t / wasn’t, can’t, haven’t, won’t. Одно отрицание на предложение: I don’t know anything / I know nothing (не I don’t know nothing). Ловушка русского: двойное отрицание «никто ничего не знает».',
  },
  {
    id: 'articles', area: 'nouns', title: 'a, the или без артикля', titleEn: 'Articles', level: 'A2', visual: 'article-tree', size: 24,
    scope: 'Дерево выбора: the — понятно, какой именно (уже упоминали, единственный, из ситуации, the + superlative); a / an — один из многих, первое упоминание, профессия (She is a doctor); ∅ — мн. ч. и неисчисляемые в общем смысле (I like cats, Water is important). Устойчивые: go to school / to bed / home, by bus, at work, have breakfast, play the piano / play football. Контекст в 1–2 предложениях, чтобы ответ был однозначным. Без выбора a / an.',
  },
  {
    id: 'countable', area: 'nouns', title: 'Исчисляемые и неисчисляемые', titleEn: 'Countable and uncountable', level: 'A2', visual: 'count-mass', size: 14,
    scope: 'Неисчисляемые без a и -s: information, advice, news (is), furniture, luggage, money, work, homework, bread, water, weather. Порция: a piece of advice, a cup of coffee, a slice of bread. Ловушки русского: «советы, новости, деньги» — во мн. ч. в русском. Без much / many (это quantifiers).',
  },
  {
    id: 'quantifiers', area: 'nouns', title: 'some, any, much, many', titleEn: 'Quantifiers', level: 'A2', visual: 'quant-scale', size: 18,
    scope: 'some (утверждение, просьба, предложение: Would you like some tea?) / any (вопрос, после not), much / many / a lot of (much и many чаще в вопросах и отрицаниях), few / a few, little / a little, How much / How many. Без some-body / any-thing (это indefinite).',
  },
  {
    id: 'present-continuous', area: 'verbs', title: 'Present Continuous', titleEn: 'Present continuous', level: 'A1', visual: 'timeline', size: 16,
    scope: 'am / is / are + V-ing: прямо сейчас, временно (this week), изменения. Правописание -ing (make → making, sit → sitting, lie → lying). Противопоставление Present Simple: I work here / I’m working now; маркеры now, at the moment, look!, today. Глаголы состояния — только упомянуть, подробно в теме stative.',
  },
  {
    id: 'word-order', area: 'sentence', title: 'Порядок слов', titleEn: 'Word order', level: 'A2', visual: 'word-train', size: 14,
    scope: 'Режим order: собрать предложение из плиток. S — V — O — M — P — T (She speaks English well. We met them in Paris last year). Дополнение не отделяется от глагола (I like football very much, не I like very much football). Ловушка русского: свободный порядок слов. Без вопросов и места наречий частоты.',
  },
  {
    id: 'phrase-groups', area: 'words', title: 'Группы слов: от Хомского к графу', titleEn: 'Phrases: NP, VP, PP', level: 'B1', visual: 'sentence-graph', size: 10,
    scope: 'Группа = слово и всё, что от него зависит в графе: NP (группа существительного: the old red car), VP (глагол с дополнениями), PP (предлог + NP: in the big room). Дерево Хомского S → NP VP как те же группы. Режим choice: какая группа выделена, где кончается группа подлежащего (длинное подлежащее перед глаголом: The man in the black coat is my uncle). Неоднозначность «I saw the man with the telescope» — 1 навык. focus = groups.',
  },
  {
    id: 'prep-place', area: 'prepositions', title: 'Предлоги места', titleEn: 'Prepositions of place', level: 'A1', visual: 'prep-place', size: 16,
    scope: 'in (внутри: in the box, in London, in the car), on (на поверхности: on the table, on the wall, on the bus), at (точка: at the door, at the bus stop, at home, at work), under, above / over, next to, between, behind, in front of, opposite. Без движения и без времени.',
  },
  {
    id: 'prep-time', area: 'prepositions', title: 'Предлоги времени', titleEn: 'Prepositions of time', level: 'A2', visual: 'prep-time', size: 16,
    scope: 'at (часы, at night, at the weekend — британский вариант, at Christmas), on (дни и даты: on Monday, on 5 May, on Monday morning), in (месяцы, годы, сезоны, in the morning, in two days), без предлога: last / next / this / every (next week, every day). Ловушка: on Monday morning, но in the morning. Без for / since / during.',
  },
  {
    id: 'past-simple', area: 'verbs', title: 'Past Simple', titleEn: 'Past simple', level: 'A2', visual: 'timeline', size: 18,
    scope: 'Законченное действие в прошлом: -ed (правописание: stop → stopped, study → studied, live → lived), did в вопросе и отрицании + V1 (Did you see? I didn’t go), маркеры yesterday, ago, last week, in 2019, when I was a child. Неправильные — только частые (went, saw, had); вся таблица — в irregular-verbs.',
  },
  {
    id: 'irregular-verbs', area: 'verbs', title: 'Неправильные глаголы', titleEn: 'Irregular verbs', level: 'A2', visual: 'verb-forms', size: 40,
    scope: 'Один навык = один частый глагол (be, have, do, go, get, make, say, see, take, come, give, know, think, find, tell, become, leave, feel, bring, begin, keep, hold, write, stand, hear, let, mean, set, meet, run, pay, sit, speak, lie, lead, read, grow, lose, fall, send, build, understand, draw, break, spend, cut, rise, drive, buy, wear, choose…). Варианты: V2 в предложении Past Simple и V3 в Present Perfect / пассиве. focus = узор (aaa, abb, abc, aba).',
  },
  {
    id: 'demonstratives', area: 'pronouns', title: 'this, that, these, those', titleEn: 'Demonstratives', level: 'A1', visual: 'near-far', size: 10,
    scope: 'Близко / далеко × одно / много: this book, these books, that house, those houses; как местоимение (This is my sister. Is that yours?), по телефону (This is Anna). Согласование these are / this is.',
  },
  {
    id: 'adv-position', area: 'describe', title: 'Где стоит наречие', titleEn: 'Adverb position', level: 'A2', visual: 'adv-slots', size: 14,
    scope: 'Частота (always, usually, often, sometimes, rarely, never) — перед смысловым глаголом, но после am / is / are и после первого вспомогательного (She has never been…, I can always…). Образ действия, место, время — в конце (She sings beautifully). Режимы gap и order. Без образования -ly.',
  },
  {
    id: 'adj-adv', area: 'describe', title: 'quick или quickly', titleEn: 'Adjective or adverb', level: 'A2', visual: 'adj-adv', size: 14,
    scope: 'Прилагательное описывает существительное и стоит после be / look / feel / sound / seem (She looks happy), наречие описывает глагол (She sings happily). Образование -ly (easy → easily, gentle → gently), исключения good → well, fast, hard, late, early. hard ≠ hardly. Без места наречия в предложении.',
  },
  {
    id: 'comparison', area: 'describe', title: 'Степени сравнения', titleEn: 'Comparatives and superlatives', level: 'A2', visual: 'comparison-steps', size: 16,
    scope: 'Короткие: -er / -est (big → bigger, happy → happier, nice → nicer), длинные: more / most, неправильные (good, bad, far), than, the + superlative, as … as, not as … as, less. Ловушки: more better, the most biggest, than me.',
  },
  {
    id: 'pron-reflexive', area: 'pronouns', title: 'myself и each other', titleEn: 'Reflexive pronouns', level: 'B1', visual: 'pron-grid', size: 10,
    scope: 'myself, yourself, himself, herself, itself, ourselves, yourselves, themselves: действие на себя (I cut myself), «сам» (I did it myself), by myself = один. Глаголы БЕЗ себя, в отличие от русского «-ся»: wash, dress, feel, relax, meet (не relax yourself). each other = друг друга.',
  },
  {
    id: 'indefinite', area: 'pronouns', title: 'somebody, anything, nowhere', titleEn: 'Indefinite pronouns', level: 'A2', visual: 'indef-grid', size: 14,
    scope: 'some- / any- / no- / every- + -body (-one) / -thing / -where. some — утверждение, any — вопрос и после not, no — уже отрицание (Nobody came, I saw nothing), every — все (everybody is, единственное число глагола). Ловушка русского: «Никто ничего не сказал» → Nobody said anything.',
  },
  {
    id: 'past-continuous', area: 'verbs', title: 'Past Continuous', titleEn: 'Past continuous', level: 'A2', visual: 'timeline', size: 12,
    scope: 'was / were + V-ing: процесс в момент прошлого (At 8 pm I was cooking), фон для события (I was walking when it started to rain), while. Противопоставление Past Simple: длинный фон vs короткое событие.',
  },
  {
    id: 'present-perfect', area: 'verbs', title: 'Present Perfect', titleEn: 'Present perfect', level: 'B1', visual: 'pp-vs-ps', size: 22,
    scope: 'have / has + V3: опыт (Have you ever…? never), результат сейчас (I’ve lost my keys), just / already / yet, since / for с длящимся состоянием (I have lived here for ten years). Главное — противопоставление Past Simple (yesterday, ago, in 2019, when → Past Simple). Ловушки русского: «Я живу здесь 10 лет» → I have lived; I have seen him yesterday — ошибка.',
  },
  {
    id: 'future', area: 'verbs', title: 'Будущее: will, going to', titleEn: 'Future forms', level: 'A2', visual: 'future-forms', size: 16,
    scope: 'will — решение в момент речи, обещание, предсказание (I think it will rain); going to — план и намерение, признаки уже видны (Look at the clouds! It’s going to rain); Present Continuous — договорённость с временем (I’m meeting Tom at six). После when / if / as soon as о будущем — Present Simple (When I get home, I’ll call you).',
  },
  {
    id: 'modals', area: 'verbs', title: 'Модальные глаголы', titleEn: 'Modal verbs', level: 'B1', visual: 'modal-scale', size: 18,
    scope: 'can / could (умение, разрешение, просьба), must / have to (обязанность), mustn’t (нельзя) ≠ don’t have to (не обязательно), should (совет), may / might (возможно), must / can’t (логический вывод: He must be tired). После модального — инфинитив без to, без -s (She can swim). Ловушки: She cans, I must to go.',
  },
  {
    id: 'prep-motion', area: 'prepositions', title: 'Предлоги движения', titleEn: 'Prepositions of movement', level: 'A2', visual: 'prep-motion', size: 14,
    scope: 'to, into, out of, onto, off, through, across, along, up, down, past, towards, from. Ловушки: go home (без to), arrive in a city / at a station (не arrive to), get on / off the bus, get into / out of the car.',
  },
  {
    id: 'conjunctions', area: 'sentence', title: 'Союзы', titleEn: 'Conjunctions', level: 'A2', visual: 'conj-links', size: 12,
    scope: 'and, but, or, so, because, although, when, if: соединить две мысли по смыслу. so (следствие) ≠ because (причина). although + полное предложение (although it was cold). Без времени после when / if (это в future).',
  },
  {
    id: 'clear-sentence', area: 'sentence', title: 'Ясное предложение', titleEn: 'Clear sentences', level: 'B1', visual: 'sentence-graph', size: 12,
    scope: 'Принцип Уильямса («Style: Lessons in Clarity and Grace») как эвристика, не закон: действующее лицо — в подлежащее, действие — в глагол, без отглагольных существительных и пустых глаголов (carry out, make an assessment of; осуществлять, производить проверку). Пары EN и RU (канцелярит Чуковского): «Проведение проверки документов осуществляется бухгалтером» → «Бухгалтер проверяет документы». Режимы: choice «какой вариант яснее и почему», pick «найди действие, спрятанное в существительном», order с from — собрать ясное предложение из тройки «кто → что делает → что». Отметить, что номинализация иногда уместна (термин, сжатие).',
  },
  {
    id: 'cascade-reading', area: 'sentence', title: 'Чтение лесенкой', titleEn: 'Reading long sentences', level: 'B1', visual: 'cascade', size: 14,
    scope: 'Длинные предложения 12–22 слов уровня B1 с одним-двумя придаточными (when, because, that, who, which, although, if) и предложными группами. У каждого варианта полный graph (придаточное: его сказуемое висит на сказуемом главного как adv или obj, союз — mark к сказуемому придаточного; who/which — подлежащее придаточного, придаточное висит на определяемом существительном как attr). Режимы: pick («Найди сказуемое главной части», «Кто выполняет действие?») и choice (вопрос на понимание: кто что сделал, когда, почему). Приложение само показывает вариант лесенкой или строкой.',
  },
  {
    id: 'ed-ing', area: 'describe', title: 'bored или boring', titleEn: '-ed and -ing adjectives', level: 'B1', visual: 'ed-ing', size: 8,
    scope: 'Пары -ed / -ing: bored / boring, interested / interesting, tired / tiring, excited / exciting, surprised / surprising, confused / confusing, embarrassed / embarrassing, worried / worrying. -ed — что чувствует человек, -ing — что вызывает чувство.',
  },
  {
    id: 'adj-order', area: 'describe', title: 'Порядок прилагательных', titleEn: 'Adjective order', level: 'B1', visual: 'adj-order', size: 8,
    scope: 'opinion — size — age — shape — colour — origin — material — purpose — существительное: a nice big old house, a small black leather bag. Только 2–3 прилагательных подряд, частые слова. Режимы order и gap.',
  },
  {
    id: 'stative', area: 'verbs', title: 'Глаголы состояния', titleEn: 'Stative verbs', level: 'B1', visual: 'state-action', size: 24, source: 'old-trainer',
    scope: 'Перенос и переработка колоды stative из старого тренажёра: state-глаголы (know, like, want, need, believe, own, belong, seem, understand, prefer, mean) обычно не в Continuous; двойные значения (think, have, see, taste, smell, look, feel, be) — state vs action. Роль -ing без be (A box containing documents).',
  },
  {
    id: 'past-perfect', area: 'verbs', title: 'Past Perfect', titleEn: 'Past perfect', level: 'B1', visual: 'timeline', size: 12,
    scope: 'had + V3: действие раньше другого действия в прошлом (When I arrived, the film had started). Противопоставление Past Simple в последовательности событий (When I arrived, the film started = началось при мне). by the time, already, before.',
  },
  {
    id: 'tense-map', area: 'verbs', title: 'Карта времён', titleEn: 'Tense map', level: 'B1', visual: 'tense-map', size: 16, source: 'old-trainer',
    scope: 'Обзор 12 времён (3 времени × 4 аспекта) на основе 16 карточек tenses старого тренажёра (без future-in-the-past): узнать время по схеме-оси (variant.visual = timeline с quiz) и по предложению. Режим choice. Правила отдельных времён не дублировать — только узнавание и формула.',
  },
  {
    id: 'phrasal', area: 'verbs', title: 'Фразовые глаголы', titleEn: 'Phrasal verbs', level: 'B1', visual: 'phrasal-particles', size: 30, source: 'old-trainer',
    scope: 'Перенос и переработка 50 фразовых глаголов старого тренажёра в 30 навыков: значение (выбор глагола по смыслу), частица (look ___ the word → up), разделяемость (turn it off, не turn off it). focus = частица.',
  },
]

export const TOPIC_IDS = TOPICS.map((t) => t.id)
