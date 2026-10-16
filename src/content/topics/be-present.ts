import type { TopicBody } from '../types'

export default {
  summary: 'am, is, are в настоящем и was, were в прошлом. Глагол be нужен всегда; отрицание — not после него, вопрос — be на первое место.',
  ref: [
    { kind: 'visual', visual: { id: 'be-forms', focus: 'is' }, caption: 'Форма be зависит от лица: I am, he / she / it is, you / we / they are. В прошлом — was и were' },
    {
      kind: 'rule',
      title: 'am, is, are: форма зависит от лица',
      text: 'С I — am. С he, she, it, а также с одним именем или одной вещью — is. С you, we, they и со всем во множественном числе — are. you всегда с are, даже если это одно «ты».',
      examples: [
        { s: 'I_P am_V a_D teacher_N .', tr: 'Я учитель.' },
        { s: 'Anna_N is_V at_I home_N .', tr: 'Анна дома.' },
        { s: 'My_P parents_N are_V on_I holiday_N .', tr: 'Мои родители в отпуске.' },
      ],
    },
    {
      kind: 'rule',
      title: 'was и were — прошедшее время',
      text: 'С I, he, she, it и с одним именем — was. С you, we, they и во множественном числе — were. Так же, как в настоящем, только you здесь тоже всегда were.',
      examples: [
        { s: 'I_P was_V late_J yesterday_R .', tr: 'Вчера я опоздал.' },
        { s: 'We_P were_V in_I Paris_N last_J week_N .', tr: 'На прошлой неделе мы были в Париже.' },
        { s: 'It_P was_V cold_J this_D morning_N .', tr: 'Сегодня утром было холодно.' },
      ],
    },
    {
      kind: 'rule',
      title: 'not и вопрос: be без do',
      text: 'Отрицание: not стоит после be (is not, чаще isn’t). Вопрос: be выходит вперёд, перед подлежащим. Вспомогательный do здесь не нужен. После I в отрицании — только I’m not.',
      examples: [
        { s: 'She_P isn’t_V at_I work_N .', tr: 'Её нет на работе.' },
        { s: 'Are_V you_P tired_J ?', tr: 'Ты устал?' },
        { s: 'I_P +’m_V not_X ready_J .', tr: 'Я не готов.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Она_P врач_N .',
      en: 'She_P is_V a_D doctor_N .',
      note: 'В русском «есть» в настоящем времени не говорят: «Она врач». В английском be нужен всегда, а перед профессией ещё и артикль a.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'She_P a_D doctor_N .', right: 'She_P is_V a_D doctor_N .', note: 'В русском «есть» опускают, а be в английском обязателен.' },
        { wrong: 'I_P have_V thirty_M years_N .', right: 'I_P am_V thirty_M .', note: 'Возраст — с be, а не с have.' },
        { wrong: 'She_P doesn’t_A at_I home_N .', right: 'She_P isn’t_V at_I home_N .', note: 'Отрицание с be — без do: isn’t.' },
        { wrong: 'Do_A you_P tired_J ?', right: 'Are_V you_P tired_J ?', note: 'Вопрос с be — перестановкой, без do.' },
        { wrong: 'They_P was_V late_J .', right: 'They_P were_V late_J .', note: 'they, we, you — were, не was.' },
        { wrong: 'Is_V cold_J today_R .', right: 'It_P is_V cold_J today_R .', note: 'Подлежащее нужно всегда: безличное it.' },
      ],
    },
    { kind: 'tip', text: 'В английском предложении без глагола не бывает. Не нашёл глагол — поставь am, is или are между тем, о ком говорим, и тем, что о нём сказано.' },
  ],
  items: [
    {
      id: 'be-present.am',
      skill: 'I — am',
      focus: 'am',
      why: 'С I всегда am: I am tired, I am at home.',
      variants: [
        { s: 'I_P [am_V] very_R tired_J today_R .', tr: 'Сегодня я очень устал.', options: ['is', 'are'] },
        { s: 'Hi , I_P [am_V] Ben_N , the_D new_J manager_N .', tr: 'Привет, я Бен, новый менеджер.', options: ['is', 'are'] },
        { s: 'I_P [am_V] at_I the_D bus~stop_N now_R .', tr: 'Сейчас я на остановке.', options: ['are', 'be'] },
      ],
    },
    {
      id: 'be-present.is',
      skill: 'he / she / it и одно имя — is',
      focus: 'is',
      why: 'Один человек или одна вещь (he, she, it, Anna, the shop) — is.',
      variants: [
        { s: 'My_P brother_N [is_V] a_D chef_N .', tr: 'Мой брат повар.', options: ['am', 'are'] },
        { s: 'She_P [is_V] from_I Leeds_N .', tr: 'Она из Лидса.', options: ['are', 'am'] },
        { s: 'The_D shop_N [is_V] closed_J on_I Sundays_N .', tr: 'По воскресеньям магазин закрыт.', options: ['are', 'am'] },
      ],
    },
    {
      id: 'be-present.are',
      skill: 'you / we / they и множественное число — are',
      focus: 'are',
      why: 'you, we, they и «много» (neighbours, Tom and Kate) — are. you тоже are, даже если это одно «ты».',
      variants: [
        { s: 'You_P [are_V] right_J .', tr: 'Ты прав.', options: ['is', 'am'] },
        { s: 'Our_P neighbours_N [are_V] very_R friendly_J .', tr: 'Наши соседи очень дружелюбные.', options: ['is', 'am'] },
        { s: 'Tom_N and_C Kate_N [are_V] colleagues_N .', tr: 'Том и Кейт коллеги.', options: ['is', 'am'] },
      ],
    },
    {
      id: 'be-present.required',
      mode: 'choice',
      skill: 'be нельзя пропускать: She is a doctor',
      focus: 'is',
      why: 'В русском «есть» опускается, в английском be нужен всегда: Anna is a nurse.',
      variants: [
        { q: 'Какой вариант верный?', answer: 'Anna is a nurse.', options: ['Anna a nurse.', 'Anna nurse.'] },
        { q: 'Какой вариант верный?', answer: 'We are late.', options: ['We late.', 'We be late.'] },
        { q: 'Какой вариант верный?', answer: 'It is very hot today.', options: ['Very hot today.', 'It very hot today.'] },
      ],
    },
    {
      id: 'be-present.age-feel',
      skill: 'Возраст и состояние — с be: I am 30, I am cold',
      focus: 'is',
      why: 'Возраст, голод, холод в английском выражаются через be, а не через have: I am hungry, I am seven.',
      variants: [
        { s: 'My_P daughter_N [is_V] seven_M years_N old_J .', tr: 'Моей дочери семь лет.', options: ['has', 'have'] },
        { s: 'My_P son_N [is_V] hungry_J .', tr: 'Мой сын хочет есть.', options: ['has', 'have'] },
        { s: 'We_P [are_V] cold_J . Close_V the_D window_N , please_R .', tr: 'Нам холодно. Закрой окно, пожалуйста.', options: ['have', 'has'], accept: ['feel'] },
      ],
    },
    {
      id: 'be-present.it-dummy',
      skill: 'Погода, время: подлежащее it (It is cold)',
      focus: 'is',
      why: 'Подлежащее обязательно, даже если по-русски его нет: «Холодно» — It is cold.',
      variants: [
        { s: '[It_P] is_V very_R cold_J today_R .', tr: 'Сегодня очень холодно.', options: ['There', 'Here'] },
        { s: '[It_P] is_V seven~o’clock_N .', tr: 'Сейчас семь часов.', options: ['There', 'This'] },
        { s: 'In_I Rome_N [it_P] is_V sunny_J and_C warm_J .', tr: 'В Риме солнечно и тепло.', options: ['there', 'here'] },
      ],
    },
    {
      id: 'be-present.not',
      skill: 'Отрицание с be: not после am / is / are',
      focus: 'negative',
      why: 'Отрицание — not сразу после be. Не no и не don’t.',
      variants: [
        { s: 'I_P am_V [not_X] hungry_J .', tr: 'Я не голоден.', options: ['no', 'don’t'] },
        { s: 'Tom_N is_V [not_X] at_I home_N .', tr: 'Тома нет дома.', options: ['no', 'don’t'] },
        { s: 'We_P are_V [not_X] late_J .', tr: 'Мы не опаздываем.', options: ['no', 'don’t'] },
      ],
    },
    {
      id: 'be-present.isnt',
      skill: 'isn’t — he / she / it, aren’t — you / we / they',
      focus: 'negative',
      why: 'isn’t = is not, для одного; aren’t = are not, для you, we, they и множественного числа.',
      variants: [
        { s: 'My_P sister_N [isn’t_V] at_I work_N today_R .', tr: 'Сегодня моей сестры нет на работе.', options: ['aren’t', 'doesn’t'] },
        { s: 'These_D shoes_N [aren’t_V] expensive_J .', tr: 'Эти туфли недорогие.', options: ['isn’t', 'doesn’t'] },
        { s: 'You_P [aren’t_V] late_J . The_D film_N starts_V at_I eight_M .', tr: 'Ты не опоздал. Фильм начинается в восемь.', options: ['isn’t', 'don’t'] },
      ],
    },
    {
      id: 'be-present.question',
      skill: 'Вопрос с be: be стоит перед подлежащим',
      focus: 'question',
      why: 'Вопрос — перестановкой: You are ready → Are you ready? Без do.',
      variants: [
        { s: '[Is_V] your_P sister_N at_I home_N ?', tr: 'Твоя сестра дома?', options: ['Does', 'Are'] },
        { s: '[Are_V] you_P ready_J for_I the_D test_N ?', tr: 'Ты готов к контрольной?', options: ['Do', 'Is'] },
        { s: '[Am_V] I_P late_J ?', tr: 'Я опоздал?', options: ['Do', 'Are'] },
      ],
    },
    {
      id: 'be-present.order-q',
      mode: 'order',
      skill: 'Собрать вопрос с be',
      focus: 'question',
      why: 'Сначала be, потом подлежащее: Is your brother a student? Вопросительное слово — ещё раньше.',
      variants: [
        { s: 'Is_V your_P brother_N a_D student_N ?', tr: 'Твой брат студент?', options: ['does', 'are'] },
        { s: 'Where_R are_V your_P keys_N ?', tr: 'Где твои ключи?', options: ['do', 'is'] },
        { s: 'Are_V they_P at_I the_D station_N ?', tr: 'Они на вокзале?', options: ['do', 'is'] },
      ],
    },
    {
      id: 'be-present.wh',
      skill: 'Where / What / How + be: Where is…? How are…?',
      focus: 'question',
      why: 'После вопросительного слова be тоже идёт перед подлежащим: Where is the station? How are you?',
      variants: [
        { s: 'Where_R [is_V] the_D station_N ?', tr: 'Где вокзал?', options: ['are', 'does'] },
        { s: 'How_R [are_V] you_P today_R ?', tr: 'Как ты сегодня?', options: ['is', 'do'] },
        { s: 'What_P [is_V] your_P name_N ?', tr: 'Как тебя зовут?', options: ['are', 'does'] },
      ],
    },
    {
      id: 'be-present.was',
      skill: 'was — I, he, she, it в прошлом',
      focus: 'was',
      why: 'В прошлом с I, he, she, it и с одним именем — was.',
      variants: [
        { s: 'I_P [was_V] at_I the_D gym_N yesterday_R .', tr: 'Вчера я был в спортзале.', options: ['were', 'am'] },
        { s: 'The_D film_N [was_V] really_R good_J .', tr: 'Фильм был действительно хорош.', options: ['were', 'is'] },
        { s: 'Anna_N [was_V] on_I holiday_N last_J week_N .', tr: 'На прошлой неделе Анна была в отпуске.', options: ['were', 'is'] },
      ],
    },
    {
      id: 'be-present.were',
      skill: 'were — you / we / they и множественное число в прошлом',
      focus: 'were',
      why: 'В прошлом с you, we, they и со множественным числом — were. you всегда were.',
      variants: [
        { s: 'We_P [were_V] very_R tired_J after_I the_D trip_N .', tr: 'После поездки мы очень устали.', options: ['was', 'are'] },
        { s: 'You_P [were_V] right_J about_I the_D weather_N .', tr: 'Ты был прав насчёт погоды.', options: ['was', 'are'] },
        { s: 'The_D children_N [were_V] in_I the_D garden_N .', tr: 'Дети были в саду.', options: ['was', 'are'] },
      ],
    },
    {
      id: 'be-present.past-neg',
      skill: 'wasn’t / weren’t — отрицание в прошлом',
      focus: 'negative',
      why: 'wasn’t = was not (I, he, she, it), weren’t = were not (you, we, they). Без didn’t.',
      variants: [
        { s: 'I_P [wasn’t_V] at_I home_N yesterday_R .', tr: 'Вчера меня не было дома.', options: ['weren’t', 'didn’t'] },
        { s: 'The_D trains_N [weren’t_V] on_I time_N this_D morning_N .', tr: 'Сегодня утром поезда опаздывали.', options: ['wasn’t', 'didn’t'] },
        { s: 'It_P [wasn’t_V] a_D good_J idea_N .', tr: 'Это была неудачная идея.', options: ['weren’t', 'didn’t'] },
      ],
    },
    {
      id: 'be-present.past-question',
      skill: 'Was / Were + подлежащее: вопрос в прошлом',
      focus: 'question',
      why: 'Вопрос в прошлом — тоже перестановкой: Was the hotel expensive? Were you there? Без did.',
      variants: [
        { s: '[Was_V] the_D hotel_N expensive_J ?', tr: 'Отель был дорогим?', options: ['Were', 'Did'] },
        { s: '[Were_V] you_P at_I the_D party_N on_I Saturday_N ?', tr: 'Ты был на вечеринке в субботу?', options: ['Was', 'Did'] },
        { s: 'Where_R [were_V] you_P last_J night_N ?', tr: 'Где ты был вчера вечером?', options: ['was', 'did'] },
      ],
    },
    {
      id: 'be-present.contractions',
      mode: 'choice',
      skill: 'Сокращения: I’m, he’s, she’s, we’re, they’re',
      focus: 'is',
      why: 'Сокращение пишется через апостроф: am → ’m, is → ’s, are → ’re. Без апострофа слова нет.',
      variants: [
        { q: 'Как сказать коротко «She is tired»?', answer: 'She’s tired.', options: ['Shes tired.', 'She’is tired.'] },
        { q: 'Как сказать коротко «They are at home»?', answer: 'They’re at home.', options: ['Theyre at home.', 'They’s at home.'] },
        { q: 'Как сказать коротко «I am late»?', answer: 'I’m late.', options: ['Im late.', 'I’am late.'] },
      ],
    },
  ],
} satisfies TopicBody
