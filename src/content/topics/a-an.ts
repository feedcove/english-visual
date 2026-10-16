import type { TopicBody } from '../types'

export default {
  summary: 'Выбор a или an зависит от первого ЗВУКА следующего слова: согласный звук — a, гласный звук — an.',
  ref: [
    { kind: 'visual', visual: { id: 'a-an', focus: 'an' }, caption: 'Две дорожки: смотри на первый звук, а не на первую букву' },
    {
      kind: 'rule',
      title: 'Звук решает, не буква',
      text: 'Перед согласным звуком ставим a, перед гласным звуком — an. Произнеси слово вслух и вслушайся в самый первый звук: cat — «к», apple — «э».',
      examples: [
        { s: 'It_P is_V a_D big_J apple_N .', tr: 'Это большое яблоко.' },
        { s: 'It_P is_V an_D old_J apple_N .', tr: 'Это старое яблоко.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Смотри на ближайшее слово',
      text: 'Артикль ставят перед тем словом, которое идёт сразу за ним. Если между артиклем и существительным есть прилагательное, выбор делает оно: an umbrella, но a big umbrella.',
      examples: [
        { s: 'Anna_N has_V an_D umbrella_N .', tr: 'У Анны есть зонт.' },
        { s: 'Anna_N has_V a_D big_J umbrella_N .', tr: 'У Анны есть большой зонт.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Ловушки: буква обманывает',
      text: 'Немое h читается как гласный: an hour, an honest man. Буква u со звуком «ю» — согласный: a university, a useful app. Слово one начинается с согласного звука /w/ («у» в «уан»): a one-day trip. Сокращения читают по буквам: an SMS, но a TV.',
      examples: [
        { s: 'We_P waited_V for_I an_D hour_N .', tr: 'Мы ждали час.' },
        { s: 'Lucy_N studies_V at_I a_D university_N .', tr: 'Люси учится в университете.' },
      ],
    },
    {
      kind: 'table',
      title: 'Первый звук слова',
      head: ['Слово', 'Первый звук', 'Артикль'],
      rows: [
        ['hour_N', '/aʊ/ — гласный', 'an_D hour_N'],
        ['honest_J', '/ɒ/ — гласный', 'an_D honest_J man_N'],
        ['university_N', '/juː/ — согласный', 'a_D university_N'],
        ['European_J', '/jʊ/ — согласный', 'a_D European_J city_N'],
        ['one-day_J', '/wʌn/ — согласный', 'a_D one-day_J trip_N'],
        ['SMS_N', '/es/ — гласный', 'an_D SMS_N'],
        ['TV_N', '/tiː/ — согласный', 'a_D TV_N'],
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'У_I меня_P есть_V старая_J машина_N .',
      en: 'I_P have_V an_D old_J car_N .',
      note: 'В русском артиклей нет. В английском перед «одним из многих» стоит a или an, и выбор делает звук ближайшего слова: a car, но an old car.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'a_D hour_N', right: 'an_D hour_N', note: 'h не читается: первый звук гласный.' },
        { wrong: 'an_D university_N', right: 'a_D university_N', note: 'Начало слова — «ю», это согласный звук.' },
        { wrong: 'a_D old_J car_N', right: 'an_D old_J car_N', note: 'Смотри на слово сразу после артикля: old.' },
        { wrong: 'an_D big_J apple_N', right: 'a_D big_J apple_N', note: 'Ближайшее слово big начинается на согласный.' },
        { wrong: 'an_D one-day_J trip_N', right: 'a_D one-day_J trip_N', note: 'One читается «уан»: первый звук согласный.' },
      ],
    },
  ],
  items: [
    {
      id: 'a-an.a-consonant',
      skill: 'a — перед согласным звуком',
      focus: 'a',
      why: 'Слово начинается с согласного звука — ставим a: a cat, a pen, a driver.',
      variants: [
        { s: 'There_P is_V [a_D] cat_N on_I the_D sofa_N .', tr: 'На диване сидит кошка.', options: ['an', 'the'] },
        { s: 'Tom_N works_V as_I [a_D] driver_N .', tr: 'Том работает водителем.', options: ['an'] },
        { s: 'Can_A I_P have_V [a_D] glass_N of_I water_N , please_R ?', tr: 'Можно стакан воды, пожалуйста?', options: ['an'] },
      ],
    },
    {
      id: 'a-an.an-vowel',
      skill: 'an — перед гласным звуком',
      focus: 'an',
      why: 'Слово начинается с гласного звука — ставим an: an apple, an umbrella, an orange.',
      variants: [
        { s: 'She_P eats_V [an_D] apple_N every_D day_N .', tr: 'Она каждый день ест яблоко.', options: ['a'] },
        { s: 'There_P is_V [an_D] umbrella_N by_I the_D door_N .', tr: 'У двери стоит зонт.', options: ['a', 'the'] },
        { s: 'Max_N has_V [an_D] orange_N for_I lunch_N .', tr: 'У Макса на обед апельсин.', options: ['a'] },
      ],
    },
    {
      id: 'a-an.next-word',
      skill: 'Смотри на слово после артикля: a big apple, an old apple',
      focus: 'an',
      why: 'Артикль подстраивается под ближайшее слово. Прилагательное между артиклем и существительным меняет выбор.',
      variants: [
        { s: 'It_P is_V [an_D] old_J car_N .', tr: 'Это старая машина.', options: ['a'] },
        { s: 'Anna_N bought_V [a_D] big_J umbrella_N .', tr: 'Анна купила большой зонт.', options: ['an'] },
        { s: 'It_P was_V [an_D] easy_J test_N .', tr: 'Это был лёгкий тест.', options: ['a'] },
      ],
    },
    {
      id: 'a-an.silent-h',
      skill: 'an — перед немым h: an hour, an honest man, an honour',
      focus: 'an',
      why: 'Буква h не читается, первый звук гласный: an hour /aʊə/, an honest /ɒnɪst/.',
      variants: [
        { s: 'The_D film_N lasts_V [an_D] hour_N .', tr: 'Фильм идёт час.', options: ['a', 'the'] },
        { s: 'Ben_N is_V [an_D] honest_J man_N .', tr: 'Бен — честный человек.', options: ['a'] },
        { s: 'It_P is_V [an_D] honour_N to_X meet_V you_P .', tr: 'Для меня честь познакомиться с вами.', options: ['a'] },
      ],
    },
    {
      id: 'a-an.sounded-h',
      skill: 'a — перед h, которое читается: a hotel, a holiday',
      focus: 'a',
      why: 'Здесь h произносится, первый звук согласный: a hotel, a horse, a holiday.',
      variants: [
        { s: 'We_P stayed_V at_I [a_D] hotel_N near_I the_D beach_N .', tr: 'Мы жили в отеле у пляжа.', options: ['an'] },
        { s: 'Kate_N has_V [a_D] horse_N .', tr: 'У Кейт есть лошадь.', options: ['an'] },
        { s: 'I_P need_V [a_D] holiday_N !', tr: 'Мне нужен отпуск!', options: ['an'] },
      ],
    },
    {
      id: 'a-an.u-sound',
      skill: 'a — перед u со звуком «ю»: a university, a useful app',
      focus: 'a',
      why: 'Слово начинается со звука «ю» /j/, а это согласный: a university, a European, a useful app.',
      variants: [
        { s: 'Lucy_N studies_V at_I [a_D] university_N in_I Leeds_N .', tr: 'Люси учится в университете в Лидсе.', options: ['an'] },
        { s: 'Paris_N is_V [a_D] European_J city_N .', tr: 'Париж — европейский город.', options: ['an'] },
        { s: 'This_P is_V [a_D] useful_J app_N .', tr: 'Это полезное приложение.', options: ['an'] },
      ],
    },
    {
      id: 'a-an.one-sound',
      skill: 'a — перед one: a one-way ticket, a one-day trip',
      focus: 'a',
      why: 'One читается «уан»: первый звук /w/ — согласный. Поэтому a one-day trip, а не an.',
      variants: [
        { s: 'I_P need_V [a_D] one-way_J ticket_N to_I Bath_N .', tr: 'Мне нужен билет в один конец до Бата.', options: ['an'] },
        { s: 'We_P went_V on_I [a_D] one-day_J trip_N to_I York_N .', tr: 'Мы съездили в Йорк на один день.', options: ['an'] },
        { s: 'Anna_N booked_V [a_D] one-week_J course_N in_I Spain_N .', tr: 'Анна записалась на недельный курс в Испании.', options: ['an'] },
      ],
    },
    {
      id: 'a-an.letters-an',
      skill: 'an — перед буквами с гласным названием: an SMS, an LED',
      focus: 'an',
      why: 'Буквы F, H, L, M, N, R, S, X называют с гласного звука: «эс-эм-эс», «эл-и-ди». Поэтому an.',
      variants: [
        { s: 'Anna_N sent_V me_P [an_D] SMS_N .', tr: 'Анна прислала мне SMS.', options: ['a'] },
        { s: 'I_P bought_V [an_D] LED_N lamp_N for_I the_D kitchen_N .', tr: 'Я купил светодиодную лампу для кухни.', options: ['a'] },
        { s: 'They_P drive_V [an_D] SUV_N .', tr: 'Они ездят на внедорожнике.', options: ['a'] },
      ],
    },
    {
      id: 'a-an.letters-a',
      skill: 'a — перед буквами с согласным названием: a TV, a PC, a USB',
      focus: 'a',
      why: 'TV читается «ти-ви», USB — «ю-эс-би»: первый звук согласный, значит a.',
      variants: [
        { s: 'We_P have_V [a_D] TV_N in_I the_D kitchen_N .', tr: 'У нас на кухне есть телевизор.', options: ['an'] },
        { s: 'Ben_N uses_V [a_D] PC_N at_I work_N .', tr: 'На работе Бен пользуется ПК.', options: ['an'] },
        { s: 'I_P need_V [a_D] USB_N cable_N .', tr: 'Мне нужен USB-кабель.', options: ['an'] },
      ],
    },
    {
      id: 'a-an.job',
      skill: 'Перед профессией: a teacher, an engineer — тоже по звуку',
      focus: 'an',
      why: 'Профессию называют с a / an, а выбор делает тот же первый звук: a pilot, an engineer.',
      variants: [
        { s: 'My_P brother_N is_V [an_D] engineer_N .', tr: 'Мой брат — инженер.', options: ['a'] },
        { s: 'Kate_N is_V [a_D] pilot_N .', tr: 'Кейт — пилот.', options: ['an'] },
        { s: 'Mr~Smith_N is_V [an_D] electrician_N .', tr: 'Мистер Смит — электрик.', options: ['a'] },
      ],
    },
    {
      id: 'a-an.sound-sort',
      mode: 'choice',
      skill: 'Отличить слова на an от слов на a по звуку',
      focus: 'an',
      variants: [
        {
          q: 'Перед каким словом нужен an?',
          answer: 'hour',
          options: ['house', 'hotel'],
          why: 'В hour h молчит, первый звук гласный: an hour. В house и hotel h читается: a house, a hotel.',
        },
        {
          q: 'Перед каким словом нужен an?',
          answer: 'umbrella',
          options: ['university', 'uniform'],
          why: 'Umbrella начинается с гласного: an umbrella. University и uniform — со звука «ю»: a university.',
        },
        {
          q: 'Перед каким словом нужен a?',
          answer: 'European',
          options: ['egg', 'orange'],
          why: 'European начинается со звука «ю»: a European. Egg и orange — с гласного: an egg, an orange.',
        },
        {
          q: 'Перед каким словом нужен an?',
          answer: 'honest',
          options: ['happy', 'hungry'],
          why: 'В honest h молчит: an honest man. В happy и hungry h читается: a happy man.',
        },
      ],
    },
    {
      id: 'a-an.order',
      mode: 'order',
      skill: 'Собрать: артикль перед нужным словом',
      focus: 'a',
      why: 'Артикль стоит прямо перед словом, по первому звуку которого его выбирают.',
      variants: [
        { s: 'She_P has_V an_D old_J umbrella_N .', tr: 'У неё старый зонт.', options: ['a'] },
        { s: 'He_P bought_V a_D one-way_J ticket_N .', tr: 'Он купил билет в один конец.', options: ['an'] },
        { s: 'The_D bus_N takes_V an_D hour_N .', tr: 'Автобус едет час.', options: ['a'] },
      ],
    },
    {
      id: 'a-an.pick-next',
      mode: 'pick',
      skill: 'Найти слово, по звуку которого выбирают a / an',
      focus: 'an',
      why: 'Артикль подстраивается под слово, которое стоит сразу за ним, а не под существительное в конце.',
      variants: [
        {
          s: 'Max_N ate_V an_D {orange_N} .',
          q: 'Найди слово, по звуку которого выбран артикль',
          tr: 'Макс съел апельсин.',
          model: 'Kate_N bought_V a_D {pen_N} .',
        },
        {
          s: 'Anna_N has_V a_D {big_J} apple_N .',
          q: 'Найди слово, по звуку которого выбран артикль',
          tr: 'У Анны большое яблоко.',
          model: 'Tom_N has_V an_D {old_J} bike_N .',
        },
        {
          s: 'It_P is_V an_D {easy_J} question_N .',
          q: 'Найди слово, по звуку которого выбран артикль',
          tr: 'Это простой вопрос.',
          model: 'Lucy_N has_V a_D {new_J} umbrella_N .',
        },
      ],
    },
  ],
} satisfies TopicBody
