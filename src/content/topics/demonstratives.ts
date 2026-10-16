import type { TopicBody } from '../types'

export default {
  summary: 'this / these — рядом, that / those — далеко. this и that — один предмет, these и those — несколько.',
  ref: [
    { kind: 'visual', visual: { id: 'near-far' }, caption: 'Два вопроса: близко или далеко, один или много' },
    {
      kind: 'rule',
      title: 'Расстояние и число',
      text: 'this (один) и these (несколько) — предмет рядом с тобой. that (один) и those (несколько) — предмет далеко. Слово стоит перед существительным и совпадает с ним по числу: this book, these books.',
      examples: [
        { s: 'This_D coffee_N is_V hot_J .', tr: 'Этот кофе горячий.' },
        { s: 'I_P like_V these_D shoes_N .', tr: 'Мне нравятся вот эти туфли.' },
        { s: 'That_D house_N over~there_R is_V old_J .', tr: 'Вон тот дом старый.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Без существительного',
      text: 'Эти слова могут стоять и сами: This is my sister. Is that yours? What are those? Глагол согласуется по числу: this is, that is, these are, those are.',
      examples: [
        { s: 'This_P is_V my_P sister_N .', tr: 'Это моя сестра.' },
        { s: 'Are_V these_P your_P keys_N ?', tr: 'Это твои ключи?' },
        { s: 'What_P is_V that_P ?', tr: 'Что это там?' },
      ],
    },
    {
      kind: 'rule',
      title: 'По телефону и при знакомстве',
      text: 'В британском английском о себе по телефону говорят this: Hello, this is Anna. О собеседнике — that: Is that Tom? Так же знакомят людей: Mum, this is Ben.',
      examples: [
        { s: 'Hello , this_P is_V Anna_N .', tr: 'Алло, это Анна.' },
        { s: 'Is_V that_P Mr~Smith_N ?', tr: 'Это мистер Смит?' },
        { s: 'Kate_N , this_P is_V Ben_N .', tr: 'Кейт, это Бен.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Это_P мои_P братья_N .',
      en: 'These_P are_V my_P brothers_N .',
      note: 'В русском «это» одно на всех и глагола нет. В английском this и these различают число, и нужен глагол: this is, these are. Расстояние тоже важно: рядом this, далеко that.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'This_D books_N are_V new_J .', right: 'These_D books_N are_V new_J .', note: 'Книг несколько — these, а не this.' },
        { wrong: 'These_P is_V my_P keys_N .', right: 'These_P are_V my_P keys_N .', note: 'these и those — множественное число: are.' },
        { wrong: 'I_P like_V that_D shoes_N .', right: 'I_P like_V those_D shoes_N .', note: 'Туфли — много, поэтому those, а не that.' },
        { wrong: 'Hello , that_P is_V Anna_N .', right: 'Hello , this_P is_V Anna_N .', note: 'По телефону о себе — this is.' },
        { wrong: 'It_P is_V my_P sister_N .', right: 'This_P is_V my_P sister_N .', note: 'Знакомя с человеком, говори this is, а не it is.' },
      ],
    },
    { kind: 'tip', text: 'Проверка: покажи пальцем. Предмет рядом — this / these, далеко — that / those. Предметов несколько — these / those.' },
  ],
  items: [
    {
      id: 'demonstratives.this',
      skill: 'this — один предмет рядом',
      focus: 'this',
      why: 'Один предмет, и он рядом с говорящим — this.',
      variants: [
        { s: '[This_D] chair_N here_R is_V free_J .', tr: 'Вот этот стул свободен.', options: ['That', 'These'] },
        { s: 'Look_V at_I [this_D] photo_N in_I my_P hand_N !', tr: 'Посмотри на эту фотографию у меня в руке!', options: ['that', 'those'] },
        { s: '[This_D] bag_N on_I my_P shoulder_N is_V very_R heavy_J .', tr: 'Эта сумка у меня на плече очень тяжёлая.', options: ['That', 'These'] },
      ],
    },
    {
      id: 'demonstratives.these',
      skill: 'these — несколько предметов рядом',
      focus: 'these',
      why: 'Предметов несколько, и они рядом — these. Существительное во множественном числе.',
      variants: [
        { s: 'I_P +’m_A wearing_V [these_D] shoes_N today_R .', tr: 'Сегодня на мне вот эти туфли.', options: ['those', 'this'] },
        { s: 'Try_V [these_D] apples_N here_R — they_P +’re_V sweet_J !', tr: 'Попробуй вот эти яблоки — они сладкие!', options: ['those', 'this'] },
        { s: 'Are_V [these_D] gloves_N here_R yours_P ?', tr: 'Вот эти перчатки — твои?', options: ['those', 'this'] },
      ],
    },
    {
      id: 'demonstratives.that',
      skill: 'that — один предмет далеко',
      focus: 'that',
      why: 'Один предмет, и он далеко от говорящего — that.',
      variants: [
        { s: 'Look_V at_I [that_D] bird_N in_I the_D tree_N over~there_R !', tr: 'Смотри, вон та птица на дереве!', options: ['this', 'those'] },
        { s: 'Excuse_V me_P , how_R much_R is_V [that_D] jacket_N in_I the_D window_N ?', tr: 'Простите, сколько стоит вон та куртка в витрине?', options: ['this', 'those'] },
        { s: '[That_D] building_N over~there_R is_V our_P office_N .', tr: 'Вон то здание — наш офис.', options: ['This', 'Those'] },
      ],
    },
    {
      id: 'demonstratives.those',
      skill: 'those — несколько предметов далеко',
      focus: 'those',
      why: 'Предметов несколько, и они далеко — those. Существительное во множественном числе.',
      variants: [
        { s: '[Those_D] children_N over~there_R are_V my_P cousins_N .', tr: 'Вон те дети — мои двоюродные братья и сёстры.', options: ['These', 'That'] },
        { s: 'Do_A you_P like_V [those_D] shoes_N in_I the_D window_N ?', tr: 'Тебе нравятся вон те туфли в витрине?', options: ['these', 'that'] },
        { s: 'Who_P are_V [those_D] people_N over~there_R ?', tr: 'Кто вон те люди?', options: ['these', 'that'] },
      ],
    },
    {
      id: 'demonstratives.agree',
      skill: 'this / that — is, these / those — are',
      focus: 'these',
      why: 'this и that — один предмет, глагол is. these и those — несколько, глагол are.',
      variants: [
        { s: 'These_D shoes_N [are_V] comfortable_J .', tr: 'Эти туфли удобные.', options: ['is'] },
        { s: 'That_D film_N [is_V] very_R long_J .', tr: 'Тот фильм очень длинный.', options: ['are'] },
        { s: 'Those_D keys_N on_I the_D table_N [are_V] mine_P .', tr: 'Вон те ключи на столе — мои.', options: ['is'] },
      ],
    },
    {
      id: 'demonstratives.intro',
      skill: 'This is… — представляем человека рядом',
      focus: 'this',
      why: 'Знакомя людей, говорим this is, а не it is и не that is.',
      variants: [
        { s: 'Mum_N , [this_P] is_V my_P colleague_N , Ben_N .', tr: 'Мам, это мой коллега Бен.', options: ['that', 'it'] },
        { s: 'Dad_N , [this_P] is_V my_P friend_N Lucy_N . She_P works_V with_I me_P .', tr: 'Пап, это моя подруга Люси. Она работает со мной.', options: ['That', 'It'] },
        { s: 'Anna_N , [this_P] is_V Max_N . He_P +’s_V my_P new_J neighbour_N .', tr: 'Анна, это Макс. Он мой новый сосед.', options: ['that', 'it'] },
      ],
    },
    {
      id: 'demonstratives.phone',
      skill: 'По телефону о себе: This is Anna',
      focus: 'this',
      why: 'По телефону о себе говорят this is (другу можно и it’s: Hi, it’s Tom), а о собеседнике спрашивают Is that Tom?',
      variants: [
        { s: 'Hello , [this_P] is_V Anna_N speaking_V .', tr: 'Алло, говорит Анна.', options: ['that', 'these'] },
        { s: 'Hello , [this_P] is_V Ben_N from_I the_D bank_N .', tr: 'Здравствуйте, вас беспокоит Бен из банка.', options: ['that', 'these'], accept: ['It'] },
        { s: 'Hi , Kate_N ! [This_P] is_V Tom_N . Can_A you_P talk_V now_R ?', tr: 'Привет, Кейт! Это Том. Ты можешь сейчас говорить?', options: ['That', 'These'], accept: ['It'] },
      ],
    },
    {
      id: 'demonstratives.alone',
      skill: 'Без существительного: What’s that? Is this yours?',
      focus: 'that',
      why: 'Слово без существительного тоже согласуется по расстоянию и числу: this / that — один, these / those — несколько.',
      variants: [
        { s: 'What_P +’s_V [that_P] over~there_R ? — I_P don’t_A know_V .', tr: 'Что вон там? — Не знаю.', options: ['those', 'it'] },
        { s: 'Look_V what_P I_P found_V ! Is_V [this_P] yours_P ?', tr: 'Смотри, что я нашёл! Это твоё?', options: ['that', 'these'] },
        { s: 'Here_R you_P are_V . Are_V [these_P] your_P glasses_N ?', tr: 'Вот, держи. Это твои очки?', options: ['those', 'this'] },
      ],
    },
    {
      id: 'demonstratives.choose',
      mode: 'choice',
      skill: 'Выбрать this / that / these / those по картинке',
      focus: 'this',
      why: 'Два вопроса: рядом или далеко? Один предмет или несколько?',
      variants: [
        { q: 'Ты держишь в руке одну чашку: «… coffee is hot».', answer: 'This', options: ['That', 'These', 'Those'] },
        { q: 'Несколько людей стоят далеко от тебя: «… people are my friends».', answer: 'Those', options: ['This', 'That', 'These'] },
        { q: 'Один дом стоит далеко, ты показываешь на него: «… house is mine».', answer: 'That', options: ['This', 'These', 'Those'] },
      ],
    },
    {
      id: 'demonstratives.order',
      mode: 'order',
      skill: 'Собрать: this / that / these / those в предложении',
      focus: 'those',
      why: 'Слово-указатель стоит перед существительным. В вопросе Is that…? на первом месте глагол.',
      variants: [
        { s: 'Is_V that_P your_P brother_N over~there_R ?', tr: 'Вон тот — твой брат?', options: ['this'], accept: ['Is_V that_P over~there_R your_P brother_N ?'] },
        { s: 'These_D biscuits_N are_V very_R good_J .', tr: 'Это печенье очень вкусное.', options: ['is'] },
        { s: 'Where_R did_A you_P buy_V those_D boots_N ?', tr: 'Где ты купил вон те ботинки?', options: ['these'] },
      ],
    },
    {
      id: 'demonstratives.pick',
      mode: 'pick',
      skill: 'Найти слово-указатель: этот, тот',
      focus: 'this',
      why: 'this, that, these, those показывают, о каком предмете речь: этот, тот, эти, те.',
      variants: [
        { s: 'Do_A you_P like_V {those_D} pictures_N ?', q: 'Найди слово, которое показывает, о каких картинах речь.', model: 'Look_V at_I {these_D} flowers_N !' },
        { s: '{That_D} man_N works_V in_I our_P office_N .', q: 'Найди слово-указатель («тот, этот»).', model: 'I_P know_V {this_D} man_N .' },
        { s: 'Anna_N bought_V {these_D} cups_N in_I Paris_N .', q: 'Найди слово-указатель («эти, те»).', model: 'Tom_N wants_V {that_D} car_N .' },
      ],
    },
    {
      id: 'demonstratives.graph',
      mode: 'graph',
      skill: 'this / that перед существительным — определение',
      focus: 'those',
      why: 'Слово-указатель отвечает «какой?» и висит на существительном как определение.',
      variants: [
        { s: 'This_D bag_N is_V heavy_J .', tr: 'Эта сумка тяжёлая.', graph: '1>2 attr, 2>3 subj, 4>3 compl' },
        { s: 'Anna_N likes_V that_D red_J dress_N .', tr: 'Анне нравится то красное платье.', graph: '1>2 subj, 3>5 attr, 4>5 attr, 5>2 obj' },
        { s: 'I_P want_V these_D books_N .', tr: 'Я хочу эти книги.', graph: '1>2 subj, 3>4 attr, 4>2 obj' },
      ],
    },
  ],
} satisfies TopicBody
