import type { TopicBody } from '../types'

export default {
  summary: 'Исчисляемое можно посчитать: an apple, two apples. Неисчисляемое — масса: bread, advice, money. У него нет a / an и нет -s.',
  ref: [
    { kind: 'visual', visual: { id: 'count-mass', focus: 'mass' }, caption: 'Две корзины: отдельные фигурки и сплошная масса' },
    {
      kind: 'rule',
      title: 'Можно посчитать по штукам?',
      text: 'Исчисляемые существительные — то, что считают по штукам: an apple, two apples. Неисчисляемые — масса или понятие: water, bread, advice. У них нет a / an и нет -s. Вместо a берём some. Проверка: не звучит с a или two (a bread, two advices) — слово неисчисляемое.',
      examples: [
        { s: 'I_P ate_V an_D apple_N and_C some_D bread_N .', tr: 'Я съел яблоко и немного хлеба.' },
        { s: 'I_P bought_V two_M lemons_N and_C some_D rice_N .', tr: 'Я купил два лимона и немного риса.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Ловушки русского',
      text: 'По-русски «советы», «новости», «деньги» — множественное число. По-английски advice, news, money — единственное, без -s: The news is good. Слова information и furniture тоже легко «умножить» по ошибке: informations и furnitures — неверно.',
      examples: [
        { s: 'The_D news_N is_V good_J .', tr: 'Новости хорошие.' },
        { s: 'Where_R is_V my_P money_N ?', tr: 'Где мои деньги?' },
      ],
    },
    {
      kind: 'rule',
      title: 'Порции',
      text: 'Неисчисляемое считают порциями: a piece of advice, a piece of news, a cup of coffee, a loaf of bread, a bottle of water. Считаем порции, а не само слово: two pieces of advice, three cups of coffee.',
      examples: [
        { s: 'Let_V me_P give_V you_P a_D piece_N of_I advice_N .', tr: 'Позволь дать тебе совет.' },
        { s: 'Two_M cups_N of_I coffee_N , please_R .', tr: 'Две чашки кофе, пожалуйста.' },
      ],
    },
    {
      kind: 'table',
      title: 'Штучное слово и «масса»',
      head: ['Исчисляемое', 'Неисчисляемое'],
      rows: [
        ['a_D job_N', 'work_N'],
        ['a_D suitcase_N', 'luggage_N'],
        ['a_D chair_N', 'furniture_N'],
        ['a_D coin_N', 'money_N'],
        ['a_D fact_N', 'information_N'],
        ['a_D suggestion_N', 'advice_N'],
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Новости_N сегодня_R хорошие_J .',
      en: 'The_D news_N is_V good_J today_R .',
      note: 'В русском «новости» — множественное число: они хорошие. В английском news — единственное число, поэтому is, а не are.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'She_P gave_V me_P an_D advice_N .', right: 'She_P gave_V me_P some_D advice_N .', note: 'Advice без a / an. Один совет: a piece of advice.' },
        { wrong: 'The_D news_N are_V good_J .', right: 'The_D news_N is_V good_J .', note: 'News — единственное число.' },
        { wrong: 'Where_R are_V my_P money_N ?', right: 'Where_R is_V my_P money_N ?', note: 'Money — единственное число.' },
        { wrong: 'I_P need_V some_D informations_N .', right: 'I_P need_V some_D information_N .', note: 'У information нет -s.' },
        { wrong: 'I_P have_V a_D work_N .', right: 'I_P have_V a_D job_N .', note: 'Должность — a job. Work не считается.' },
        { wrong: 'Our_P luggages_N are_V heavy_J .', right: 'Our_P luggage_N is_V heavy_J .', note: 'Luggage — единственное число, без -s.' },
      ],
    },
  ],
  items: [
    {
      id: 'countable.advice',
      skill: 'advice — не считается: ни a, ни -s',
      focus: 'mass',
      why: 'Advice — «масса»: нельзя сказать an advice или advices. Один совет — a piece of advice.',
      variants: [
        { s: 'My_P dad_N always_R gives_V me_P good_J [advice_N] .', tr: 'Папа всегда даёт мне хорошие советы.', options: ['advices', 'advise'] },
        { s: 'I_P need_V your_P [advice_N] .', tr: 'Мне нужен твой совет.', options: ['advices', 'advise'] },
        { s: 'Thank_V you_P for_I the_D [advice_N] .', tr: 'Спасибо за совет.', options: ['advices', 'advise'] },
      ],
    },
    {
      id: 'countable.information',
      skill: 'information — без -s и без a',
      focus: 'mass',
      why: 'Information не считается: нет informations и an information. Один факт — a piece of information.',
      variants: [
        {
          s: 'This_D leaflet_N has_V useful_J [information_N] about_I the_D museum_N .',
          tr: 'В этой брошюре есть полезная информация о музее.',
          options: ['informations', 'an information'],
        },
        { s: 'Can_A you_P give_V me_P some_D [information_N] ?', tr: 'Не могли бы вы дать мне информацию?', options: ['informations', 'an information'] },
        { s: 'We_P found_V the_D [information_N] online_R .', tr: 'Мы нашли информацию в интернете.', options: ['informations', 'an information'] },
      ],
    },
    {
      id: 'countable.news',
      skill: 'news — единственное число: The news is good',
      focus: 'mass',
      why: 'News выглядит как множественное, но это единственное число: the news is, а не are.',
      variants: [
        { s: 'The_D news_N from_I Kate_N [is_V] very_R good_J .', tr: 'Новости от Кейт очень хорошие.', options: ['are'] },
        { s: 'The_D news_N about_I the_D match_N [is_V] great_J .', tr: 'Новости о матче отличные.', options: ['are'] },
        { s: '[Is_V] the_D news_N at_I six_M ?', tr: 'Новости в шесть?', options: ['Are'] },
      ],
    },
    {
      id: 'countable.money',
      skill: 'money — единственное число: Where is my money?',
      focus: 'mass',
      why: 'Money не считается и не имеет множественного числа. По-русски «деньги» — мн. ч., по-английски money is.',
      variants: [
        { s: 'My_P money_N [is_V] in_I the_D bank_N .', tr: 'Мои деньги в банке.', options: ['are'] },
        { s: 'Where_R [is_V] the_D money_N ?', tr: 'Где деньги?', options: ['are'] },
        { s: 'The_D money_N [was_V] on_I the_D table_N .', tr: 'Деньги лежали на столе.', options: ['were'] },
      ],
    },
    {
      id: 'countable.furniture-luggage',
      skill: 'furniture, luggage — без -s и без a',
      focus: 'mass',
      why: 'Furniture и luggage не считаются: нет furnitures и a luggage. Считают порциями: a piece of furniture.',
      variants: [
        { s: 'We_P need_V some_D new_J [furniture_N] for_I the_D flat_N .', tr: 'Нам нужна новая мебель для квартиры.', options: ['furnitures', 'a furniture'] },
        {
          s: 'Our_P [luggage_N] is_V still_R at_I the_D airport_N .',
          tr: 'Наш багаж всё ещё в аэропорту.',
          options: ['luggages', 'a luggage'],
          accept: ['baggage'],
        },
        { s: 'The_D hotel_N has_V nice_J [furniture_N] .', tr: 'В отеле хорошая мебель.', options: ['furnitures', 'a furniture'] },
      ],
    },
    {
      id: 'countable.homework-work',
      skill: 'homework, work — без a и -s',
      focus: 'mass',
      why: 'Homework и work (работа вообще) не считаются: a lot of homework, не homeworks.',
      variants: [
        { s: 'I_P have_V a~lot~of_D [homework_N] today_R .', tr: 'У меня сегодня много домашних заданий.', options: ['homeworks', 'a homework'] },
        { s: 'Tom_N has_V a~lot~of_D [work_N] to_X do_V this_D week_N .', tr: 'У Тома на этой неделе много работы.', options: ['works', 'a work'] },
        { s: 'Ben_N did_V his_P [homework_N] before_I dinner_N .', tr: 'Бен сделал уроки до ужина.', options: ['homeworks', 'a homework'] },
      ],
    },
    {
      id: 'countable.weather-bread',
      skill: 'weather, bread, rice — не считаются',
      focus: 'mass',
      why: 'Weather, bread, rice — «масса»: нет a weather и breads. Порцию называют отдельно: a loaf of bread.',
      variants: [
        { s: 'The_D [weather_N] is_V lovely_J today_R .', tr: 'Сегодня чудесная погода.', options: ['weathers', 'whether'] },
        { s: 'We_P need_V [bread_N] and_C milk_N .', tr: 'Нам нужны хлеб и молоко.', options: ['breads', 'a bread'] },
        { s: 'There_P is_V some_D [rice_N] in_I the_D cupboard_N .', tr: 'В шкафу есть рис.', options: ['rices', 'rise'] },
      ],
    },
    {
      id: 'countable.piece',
      skill: 'a piece of advice / news / furniture',
      focus: 'piece',
      why: 'Неисчисляемое слово считают порциями: a piece of advice, a piece of news, a piece of furniture.',
      variants: [
        {
          s: 'Can_A I_P give_V you_P a_D [piece_N] of_I advice_N ?',
          tr: 'Можно дам тебе один совет?',
          options: ['part', 'pair'],
          accept: ['bit'],
        },
        {
          s: 'I_P have_V a_D [piece_N] of_I good_J news_N .',
          tr: 'У меня есть хорошая новость.',
          options: ['part', 'pair'],
          accept: ['bit'],
        },
        {
          s: 'That_D table_N is_V a_D nice_J [piece_N] of_I furniture_N .',
          tr: 'Этот стол — красивый предмет мебели.',
          options: ['part', 'pair'],
          accept: ['bit'],
        },
      ],
    },
    {
      id: 'countable.container',
      skill: 'Порция еды и жидкости: a cup of tea, a loaf of bread',
      focus: 'piece',
      why: 'Еду и жидкости считают ёмкостями и порциями: a cup, a glass, a bottle, a loaf, a slice.',
      variants: [
        {
          s: 'Would_A you_P like_V a_D [cup_N] of_I tea_N ?',
          tr: 'Хочешь чашку чая?',
          options: ['glass', 'bottle'],
          accept: ['mug'],
        },
        { s: 'Anna_N bought_V a_D [loaf_N] of_I bread_N .', tr: 'Анна купила буханку хлеба.', options: ['slice', 'piece'] },
        { s: 'Can_A I_P have_V a_D [bottle_N] of_I water_N , please_R ?', tr: 'Можно бутылку воды, пожалуйста?', options: ['cup', 'piece'] },
      ],
    },
    {
      id: 'countable.job-work',
      skill: 'Работа-должность — a job (а не a work)',
      focus: 'count',
      why: 'Work — работа вообще, не считается. Конкретная работа, должность — a job: a new job, two jobs.',
      variants: [
        { s: 'Anna_N has_V a_D new_J [job_N] at_I the_D bank_N .', tr: 'У Анны новая работа в банке.', options: ['work', 'works'] },
        { s: 'He_P is_A looking_V for_I a_D [job_N] in_I London_N .', tr: 'Он ищет работу в Лондоне.', options: ['work', 'works'] },
        { s: 'It_P is_V only_R a_D part-time_J [job_N] , but_C Tom_N likes_V it_P .', tr: 'Это всего лишь подработка, но Тому нравится.', options: ['work', 'works'] },
      ],
    },
    {
      id: 'countable.some-not-a',
      skill: 'Неисчисляемое: some, а не a / an',
      focus: 'mass',
      why: 'Перед неисчисляемым существительным нет a / an. Можно some: some bread, some milk, some advice.',
      variants: [
        { s: 'I_P +’d_A like_V [some_D] bread_N , please_R .', tr: 'Мне, пожалуйста, хлеба.', options: ['a', 'an'] },
        { s: 'There_P is_V [some_D] milk_N in_I the_D fridge_N .', tr: 'В холодильнике есть молоко.', options: ['a', 'an'] },
        { s: 'Tom_N lent_V me_P [some_D] money_N .', tr: 'Том одолжил мне денег.', options: ['a', 'an'] },
      ],
    },
    {
      id: 'countable.russian-plural',
      mode: 'order',
      skill: 'Русское мн. ч. ≠ английское: советы, новости, деньги',
      focus: 'mass',
      why: 'В русском «советы», «новости», «деньги» — мн. ч. В английском эти слова единственного числа и без -s.',
      variants: [
        { s: 'She_P gave_V me_P good_J advice_N .', tr: 'Она дала мне хорошие советы.', options: ['advices', 'an'] },
        { s: 'The_D news_N was_V a_D big_J surprise_N .', tr: 'Новости стали большим сюрпризом.', options: ['were'] },
        { s: 'Her_P money_N is_V in_I her_P bag_N .', tr: 'Её деньги в сумке.', options: ['are', 'moneys'] },
      ],
    },
    {
      id: 'countable.sort',
      mode: 'choice',
      skill: 'Отличить исчисляемое от неисчисляемого',
      focus: 'count',
      variants: [
        {
          s: 'We_P need_V four_M {chairs_N} .',
          q: 'Исчисляемое или неисчисляемое?',
          answer: 'исчисляемое',
          options: ['неисчисляемое'],
          why: 'Chair можно посчитать: a chair, four chairs.',
        },
        {
          s: 'Ben_N asked_V for_I {advice_N} .',
          q: 'Исчисляемое или неисчисляемое?',
          answer: 'неисчисляемое',
          options: ['исчисляемое'],
          why: 'Advice — масса: нет an advice и advices. Считаем порциями: a piece of advice.',
        },
        {
          s: 'Our_P {furniture_N} is_V old_J .',
          q: 'Исчисляемое или неисчисляемое?',
          answer: 'неисчисляемое',
          options: ['исчисляемое'],
          why: 'Furniture — масса: нет furnitures. Один предмет — a piece of furniture.',
        },
        {
          s: 'Tom_N has_V two_M {suitcases_N} .',
          q: 'Исчисляемое или неисчисляемое?',
          answer: 'исчисляемое',
          options: ['неисчисляемое'],
          why: 'Suitcase можно посчитать: a suitcase, two suitcases. А luggage — нельзя.',
        },
      ],
    },
    {
      id: 'countable.pick-mass',
      mode: 'pick',
      skill: 'Найти неисчисляемое существительное',
      focus: 'mass',
      why: 'Неисчисляемое слово не получает a / an и -s: bread, advice, furniture.',
      variants: [
        {
          s: 'Anna_N bought_V {bread_N} and_C two_M apples_N .',
          q: 'Найди неисчисляемое существительное',
          tr: 'Анна купила хлеб и два яблока.',
          model: 'Ben_N bought_V {milk_N} and_C six_M eggs_N .',
        },
        {
          s: 'Tom_N needs_V {advice_N} and_C a_D new_J laptop_N .',
          q: 'Найди неисчисляемое существительное',
          tr: 'Тому нужны совет и новый ноутбук.',
          model: 'Kate_N wants_V a_D map_N and_C some_D {information_N} .',
        },
        {
          s: 'We_P bought_V new_J {furniture_N} and_C three_M lamps_N .',
          q: 'Найди неисчисляемое существительное',
          tr: 'Мы купили новую мебель и три лампы.',
          model: 'Our_P {luggage_N} and_C two_M bikes_N are_V in_I the_D car_N .',
        },
      ],
    },
  ],
} satisfies TopicBody
