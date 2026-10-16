import type { TopicBody } from '../types'

// Пары RU/EN с одинаковой раскраской. В items английское предложение s, русский перевод tr.

const Q = 'Для этого слова в русском переводе нет пары. Что это?'
const ART = 'артикль (a, the)'
const BE = 'be (am, is, are)'
const DO = 'do / does / did'
const THERE = 'there'
const IT = 'it'

export default {
  summary: 'Цвета русского и английского предложения почти совпадают. Лишние слова в английском: артикль, be, do, there, it. В русском их роль играют окончание и порядок слов.',
  ref: [
    { kind: 'visual', visual: { id: 'pos-bridge', focus: 'same' }, caption: 'Одинаковые роли соединены линиями, слова без пары подсвечены' },
    {
      kind: 'rule',
      title: 'Цвета совпадают, слова нет',
      text: 'Смысловые слова в двух языках раскрашены одинаково: кто, что делает, с чем. Мама передвинула стол — Mum moved the table. Разница в служебных словах: у английского их больше, и они обязательны.',
      examples: [
        { s: 'Mum_N moved_V the_D table_N .', tr: 'Мама передвинула стол.' },
        { s: 'My_P sister_N works_V in_I a_D bank_N .', tr: 'Моя сестра работает в банке.' },
      ],
    },
    {
      kind: 'table',
      title: 'Есть в английском, нет в русском',
      head: ['Английский', 'Что это', 'В русском'],
      rows: [
        ['a_D / the_D', 'артикль', 'нет слова: «книга» — это и a book, и the book'],
        ['am_V / is_V / are_V', 'be (связка)', 'нет: «Я рад», «Он врач» без слова между'],
        ['do_A / does_A / did_A', 'вопрос и отрицание', 'нет: вопрос — интонация, отрицание — «не»'],
        ['there_P', 'место для «есть»', '«есть» часто опускают: «В комнате стол»'],
        ['it_P', 'подлежащее без смысла', 'нет: «Холодно» без подлежащего'],
      ],
    },
    {
      kind: 'rule',
      title: 'there и it',
      text: 'There is говорит, что что-то есть в каком-то месте: There is a lift in our building. It нужен, когда «некому» делать: погода, время, оценка. «Холодно» по-английски — It is cold, с подлежащим it.',
      examples: [
        { s: 'There_P is_V a_D lift_N in_I our_P building_N .', tr: 'В нашем доме есть лифт.' },
        { s: 'It_P is_V cold_J today_R .', tr: 'Сегодня холодно.' },
        { s: 'It_P +’s_V nice_J to_X see_V you_P .', tr: 'Приятно тебя видеть.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Окончание или предлог и порядок',
      text: 'В русском роль слова показывает окончание: Анне, ножом, брата. В английском её берёт предлог (to Anna, with a knife), ’s (brother’s) или порядок слов. Кто стоит перед глаголом — тот делает, кто после — тот получает.',
      examples: [
        { s: 'I_P sent_V a_D message_N to_I Anna_N .', tr: 'Я отправил сообщение Анне.' },
        { s: 'The_D cat_N chases_V the_D dog_N .', tr: 'Кошка гоняет собаку.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Это_P книга_N моего_P брата_N .',
      en: 'This_P is_V my_P brother’s_N book_N .',
      note: 'Окончание «брата» в английском стало ’s, и владелец встал перед вещью. Связки в русском нет, в английском добавилось is.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'She_P doctor_N .', right: 'She_P is_V a_D doctor_N .', note: 'Нужны be и артикль: в русском их нет.' },
        { wrong: 'You_P like_V tea_N ?', right: 'Do_A you_P like_V tea_N ?', note: 'В русском вопрос — интонация, в английском нужен do.' },
        { wrong: 'In_I the_D room_N is_V a_D table_N .', right: 'There_P is_V a_D table_N in_I the_D room_N .', note: '«В комнате есть стол» — обычно there is.' },
        { wrong: 'I_P gave_V book_N Mum_N .', right: 'I_P gave_V Mum_N the_D book_N .', note: 'Падежа нет, порядок: кому, потом что.' },
      ],
    },
    { kind: 'tip', text: 'Переведи английское предложение по словам. Слово без пары в русском — чаще всего одно из пяти: a / the, be, do, there или it.' },
  ],
  items: [
    {
      id: 'pos-bridge.tag-pair',
      mode: 'tag',
      skill: 'Раскраска одна: английское предложение и его перевод',
      focus: 'same',
      why: 'Смысловые слова красим одинаково на обоих языках: сущ. — сущ., глагол — глагол, наречие — наречие.',
      variants: [
        { s: 'My_P brother_N lives_V in_I a_D small_J flat_N .', tr: 'Мой брат живёт в маленькой квартире.' },
        { s: 'We_P often_R visit_V our_P friends_N .', tr: 'Мы часто навещаем наших друзей.' },
        { s: 'The_D new_J teacher_N speaks_V slowly_R .', tr: 'Новый учитель говорит медленно.' },
      ],
    },
    {
      id: 'pos-bridge.graph-pair',
      mode: 'graph',
      skill: 'Один смысл — один граф на любом языке',
      focus: 'same',
      why: 'Подлежащее и дополнение висят на сказуемом так же, как в русском; артикль и прилагательное — на существительном.',
      variants: [
        { s: 'Папа_N открыл_V окно_N .', lang: 'ru', tr: 'Dad opened the window.', graph: '1>2 subj, 3>2 obj' },
        { s: 'Dad_N opened_V the_D window_N .', tr: 'Папа открыл окно.', graph: '1>2 subj, 3>4 attr, 4>2 obj' },
        { s: 'Anna_N bought_V a_D new_J bag_N .', tr: 'Анна купила новую сумку.', graph: '1>2 subj, 3>5 attr, 4>5 attr, 5>2 obj' },
      ],
    },
    {
      id: 'pos-bridge.article',
      mode: 'choice',
      skill: 'Артикль a / the — слова без пары в русском',
      focus: 'article',
      why: 'В русском нет артиклей: «книга» — это a book или the book. В английском перед существительным он почти всегда нужен.',
      variants: [
        { s: 'She_P is_V {a_D} doctor_N .', tr: 'Она врач.', q: Q, answer: ART, options: [BE, DO, THERE] },
        { s: 'I_P bought_V {a_D} new_J phone_N .', tr: 'Я купил новый телефон.', q: Q, answer: ART, options: [BE, IT, THERE] },
        { s: '{The_D} shop_N is_V closed_J .', tr: 'Магазин закрыт.', q: Q, answer: ART, options: [DO, IT, THERE] },
      ],
    },
    {
      id: 'pos-bridge.be',
      mode: 'choice',
      skill: 'be (am, is, are) — связка, которой нет в русском',
      focus: 'be',
      why: 'В русском «Я готов» без связки. В английском глагол be обязателен: I am ready, they are at work.',
      variants: [
        { s: 'He_P {is_V} thirty_M .', tr: 'Ему тридцать.', q: Q, answer: BE, options: [ART, DO, IT] },
        { s: 'They_P {are_V} at_I work_N .', tr: 'Они на работе.', q: Q, answer: BE, options: [ART, DO, THERE] },
        { s: 'I_P {am_V} ready_J .', tr: 'Я готов.', q: Q, answer: BE, options: [ART, DO, IT] },
      ],
    },
    {
      id: 'pos-bridge.do',
      mode: 'choice',
      skill: 'do / does / did — помощник вопроса, которого нет в русском',
      focus: 'aux',
      why: 'В русском вопрос задают интонацией. В английском в вопросе Present и Past Simple нужен do, does или did перед подлежащим.',
      variants: [
        { s: '{Do_A} you_P like_V tea_N ?', tr: 'Ты любишь чай?', q: Q, answer: DO, options: [BE, ART, IT] },
        { s: '{Did_A} you_P call_V Anna_N ?', tr: 'Ты звонил Анне?', q: Q, answer: DO, options: [BE, ART, THERE] },
        { s: '{Does_A} he_P live_V here_R ?', tr: 'Он здесь живёт?', q: Q, answer: DO, options: [BE, ART, IT] },
      ],
    },
    {
      id: 'pos-bridge.there',
      mode: 'choice',
      skill: 'there is / are — английское «есть», которое мы не переводим',
      focus: 'there',
      why: '«В доме есть лифт» — There is a lift. There указывает на место, перевода у него нет.',
      variants: [
        { s: '{There_P} is_V a_D café_N near_I my_P office_N .', tr: 'Рядом с моим офисом есть кафе.', q: Q, answer: THERE, options: [IT, ART, BE] },
        { s: '{There_P} are_V two_M beds_N in_I the_D room_N .', tr: 'В комнате две кровати.', q: Q, answer: THERE, options: [IT, DO, BE] },
        { s: '{There_P} isn’t_V any_D bread_N at_I home_N .', tr: 'Дома нет хлеба.', q: Q, answer: THERE, options: [IT, DO, ART] },
      ],
    },
    {
      id: 'pos-bridge.it',
      mode: 'choice',
      skill: 'it в It is cold — подлежащее, которого нет в русском',
      focus: 'there',
      why: 'В русском «Холодно» без подлежащего. В английском предложение без подлежащего невозможно: It is cold.',
      variants: [
        { s: '{It_P} is_V windy_J today_R .', tr: 'Сегодня ветрено.', q: Q, answer: IT, options: [THERE, ART, DO] },
        { s: '{It_P} +’s_V late_J .', tr: 'Уже поздно.', q: Q, answer: IT, options: [THERE, ART, DO] },
        { s: '{It_P} is_V sunny_J in_I Rome_N .', tr: 'В Риме солнечно.', q: Q, answer: IT, options: [THERE, ART, DO] },
      ],
    },
    {
      id: 'pos-bridge.gap-be',
      skill: 'Вставить связку be: am, is или are',
      focus: 'be',
      why: 'С I — am, с he, she, it и одним предметом — is, с you, we, they и несколькими — are.',
      variants: [
        { s: 'I_P [am_V] hungry_J .', tr: 'Я голоден.', options: ['is', 'are'] },
        { s: 'My_P parents_N [are_V] on_I holiday_N .', tr: 'Мои родители в отпуске.', options: ['is', 'am'] },
        { s: 'Anna_N [is_V] in_I the_D kitchen_N .', tr: 'Анна на кухне.', options: ['am', 'are'] },
      ],
    },
    {
      id: 'pos-bridge.gap-do',
      skill: 'Вставить do, does или did',
      focus: 'aux',
      why: 'С he, she, it — does. Для прошлого — did. После вспомогательного глагол не меняется.',
      variants: [
        { s: '[Do_A] you_P work_V at_I weekends_N ?', tr: 'Ты работаешь по выходным?', options: ['Are', 'Does'] },
        { s: 'He_P [doesn’t_A] drink_V coffee_N .', tr: 'Он не пьёт кофе.', options: ['don’t', 'isn’t'] },
        { s: '[Did_A] she_P call_V you_P yesterday_R ?', tr: 'Она звонила тебе вчера?', options: ['Does', 'Was'] },
      ],
    },
    {
      id: 'pos-bridge.gap-there',
      skill: 'Вставить there там, где русский говорит «есть»',
      focus: 'there',
      why: 'Что-то есть в месте — There is / There are. It и this здесь не подходят.',
      variants: [
        { s: '[There_P] are_V three_M chairs_N here_R .', tr: 'Здесь три стула.', options: ['It', 'This'] },
        { s: '[There_P] is_V no_D milk_N in_I the_D fridge_N .', tr: 'В холодильнике нет молока.', options: ['It', 'This'] },
        { s: 'Is_V [there_P] a_D bank_N in_I this_D street_N ?', tr: 'На этой улице есть банк?', options: ['it', 'that'] },
      ],
    },
    {
      id: 'pos-bridge.gap-it',
      skill: 'Вставить it в безличное предложение',
      focus: 'there',
      why: 'Погода, время, дата и оценка («приятно», «легко») — безличные предложения. По-английски подлежащее — it.',
      variants: [
        { s: '[It_P] is_V Monday_N today_R .', tr: 'Сегодня понедельник.', options: ['There', 'He'] },
        { s: '[It_P] +’s_V dark_J outside_R .', tr: 'На улице темно.', options: ['There', 'This'] },
        { s: '[It_P] is_V easy_J to_X find_V the_D hotel_N .', tr: 'Отель легко найти.', options: ['He', 'There'] },
      ],
    },
    {
      id: 'pos-bridge.case-prep',
      skill: 'Падежное окончание в русском — предлог в английском',
      focus: 'case',
      why: 'Тому — to Tom, ножом — with a knife, фильма — of the film. Окончание заменяется отдельным предлогом.',
      variants: [
        { s: 'Kate_N gave_V the_D keys_N [to_I] Tom_N .', tr: 'Кейт отдала ключи Тому.', options: ['at', 'in'] },
        { s: 'Ben_N cuts_V the_D bread_N [with_I] a_D knife_N .', tr: 'Бен режет хлеб ножом.', options: ['by', 'in'] },
        { s: 'The_D end_N [of_I] the_D film_N was_V sad_J .', tr: 'Конец фильма был грустным.', options: ['from', 'at'] },
      ],
    },
    {
      id: 'pos-bridge.poss-s',
      skill: 'Чьё? в русском — окончание, в английском — ’s',
      focus: 'case',
      why: 'Книга Анны — Anna’s book, машина брата — brother’s car. К тому, кому принадлежит, добавляется ’s.',
      variants: [
        { s: 'This_P is_V [Anna’s_N] book_N .', tr: 'Это книга Анны.', options: ['Anna', 'Annas'] },
        { s: 'That_P is_V my_P [brother’s_N] car_N .', tr: 'Это машина моего брата.', options: ['brother', 'brothers'] },
        { s: 'Where_R is_V the_D [teacher’s_N] phone_N ?', tr: 'Где телефон учителя?', options: ['teacher', 'teachers'] },
      ],
    },
    {
      id: 'pos-bridge.order-case',
      mode: 'order',
      skill: 'Порядок слов вместо падежа: кто делает, потом кого',
      focus: 'order',
      why: 'В русском роль видна по окончанию. В английском подлежащее стоит перед глаголом, дополнение — после.',
      variants: [
        { s: 'The_D teacher_N thanked_V the_D boy_N .', tr: 'Учитель поблагодарил мальчика.' },
        { s: 'Tom_N helps_V Anna_N .', tr: 'Том помогает Анне.' },
        { s: 'My_P boss_N called_V Max_N .', tr: 'Мой начальник позвонил Максу.' },
      ],
    },
    {
      id: 'pos-bridge.have-there',
      mode: 'choice',
      skill: '«Есть»: у кого — have, где — there is',
      focus: 'there',
      why: '«У Тома есть машина» — Tom has a car. «В саду есть скамейка» — There is a bench in the garden.',
      variants: [
        { s: 'У_I Тома_N есть_V машина_N .', lang: 'ru', q: 'Как это сказать по-английски?', answer: 'Tom has a car.', options: ['At Tom is a car.', 'There is a car Tom.'] },
        { s: 'В_I саду_N есть_V скамейка_N .', lang: 'ru', q: 'Как это сказать по-английски?', answer: 'There is a bench in the garden.', options: ['In the garden has a bench.', 'It is a bench in the garden.'] },
        { s: 'У_I нас_P есть_V время_N .', lang: 'ru', q: 'Как это сказать по-английски?', answer: 'We have time.', options: ['At us is time.', 'There is time at us.'] },
      ],
    },
  ],
} satisfies TopicBody
