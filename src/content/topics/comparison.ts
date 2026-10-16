import type { TopicBody } from '../types'

export default {
  summary: 'Короткие: taller, the tallest. Длинные: more expensive, the most expensive. Особые: better, worse. Сравниваем через than и as … as.',
  ref: [
    { kind: 'visual', visual: { id: 'comparison-steps', focus: 'er' }, caption: 'Три ступени: обычная форма, сравнительная (чем?), превосходная (самый)' },
    {
      kind: 'rule',
      title: 'Короткие: +er и +est',
      text: 'Прилагательное из одного слога получает -er и -est: tall → taller → the tallest. На -e добавляем только -r (nice → nicer). После короткой гласной согласная удваивается (big → bigger), -y → -ier (happy → happier). Сравниваем двух через than.',
      examples: [
        { s: 'Tom_N is_V taller_J than_C Kate_N .', tr: 'Том выше Кейт.' },
        { s: 'Today_N is_V hotter_J than_C yesterday_R .', tr: 'Сегодня жарче, чем вчера.' },
        { s: 'Anna_N is_V the_D happiest_J person_N I_P know_V .', tr: 'Анна — самый счастливый человек из всех, кого я знаю.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Длинные: more и most',
      text: 'Длинное прилагательное (два слога и больше, кроме слов на -y) не меняется. Перед ним ставим more и most: more expensive, the most interesting. Для «менее» есть less: less crowded.',
      examples: [
        { s: 'This_D hotel_N is_V more_R expensive_J than_C that_D one_P .', tr: 'Этот отель дороже того.' },
        { s: 'This_D is_V the_D most_R popular_J café_N in_I town_N .', tr: 'Это самое популярное кафе в городе.' },
        { s: 'This_D café_N is_V less_R busy_J .', tr: 'В этом кафе меньше народу.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Особые и «такой же, как»',
      text: 'good → better → the best, bad → worse → the worst, far → further → the furthest. «Такой же, как» — as … as, «не такой, как» — not as … as: Anna is as tall as Tom.',
      examples: [
        { s: 'My_P English_N is_V better_J than_C yours_P .', tr: 'Мой английский лучше твоего.' },
        { s: 'Anna_N is_V as_R tall_J as_C Tom_N .', tr: 'Анна такая же высокая, как Том.' },
        { s: 'Monday_N is_V the_D worst_J day_N of_I the_D week_N .', tr: 'Понедельник — худший день недели.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Он_P выше_J меня_P .',
      en: 'He_P is_V taller_J than_C me_P .',
      note: 'В русском «выше меня» — родительный падеж, слова «чем» нет. В английском после сравнительной формы нужен than: taller than me.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'My_P brother_N is_V more_R tall_J than_C me_P .', right: 'My_P brother_N is_V taller_J than_C me_P .', note: 'Короткое прилагательное: -er, а не more.' },
        { wrong: 'This_D is_V more_R better_J .', right: 'This_D is_V better_J .', note: 'better — уже сравнительная форма, more не нужно.' },
        { wrong: 'She_P is_V the_D most_R tallest_J girl_N .', right: 'She_P is_V the_D tallest_J girl_N .', note: 'Одно средство: либо most, либо -est.' },
        { wrong: 'Tom_N is_V older_J that_C Kate_N .', right: 'Tom_N is_V older_J than_C Kate_N .', note: '«Чем» — than, а не that и не then.' },
        { wrong: 'This_D film_N is_V interestinger_J .', right: 'This_D film_N is_V more_R interesting_J .', note: 'Длинное прилагательное: more, а не -er.' },
        { wrong: 'Tom_N is_V as_R tall_J than_C Max_N .', right: 'Tom_N is_V as_R tall_J as_C Max_N .', note: 'as … as — пара, than сюда не подходит.' },
      ],
    },
    { kind: 'tip', text: 'Проверка: считай слоги. Один слог (tall, big) — -er / -est. На -y (happy) — -ier / -iest. Два и больше (expensive, careful) — more / most.' },
  ],
  items: [
    {
      id: 'comparison.er-short',
      skill: 'Короткое прилагательное + er: tall → taller',
      focus: 'er',
      why: 'Одному слогу даём -er и сравниваем через than: taller than. Формы more tall нет.',
      variants: [
        { s: 'Tom_N is_V [taller_J] than_C his_P brother_N .', tr: 'Том выше своего брата.', options: ['more tall', 'tallest'] },
        { s: 'This_D bag_N is_V [cheaper_J] than_C that_D one_P .', tr: 'Эта сумка дешевле той.', options: ['more cheap', 'cheapest'] },
        { s: 'Kate_N is_V [younger_J] than_C her_P sister_N .', tr: 'Кейт младше своей сестры.', options: ['more young', 'youngest'] },
      ],
    },
    {
      id: 'comparison.er-e',
      skill: 'Слово на -e: только +r (nice → nicer)',
      focus: 'er',
      why: 'Если слово уже кончается на -e, добавляем только -r: wide → wider. Второе e не нужно.',
      variants: [
        { s: 'This_D street_N is_V [wider_J] than_C ours_P .', tr: 'Эта улица шире нашей.', options: ['wideer', 'more wide'] },
        { s: 'My_P new_J room_N is_V [larger_J] than_C my_P old_J one_P .', tr: 'Моя новая комната больше старой.', options: ['largeer', 'more large'], accept: ['bigger'] },
        { s: 'The_D weather_N is_V [nicer_J] today_R than_C yesterday_R .', tr: 'Сегодня погода приятнее, чем вчера.', options: ['niceer', 'more nice'] },
      ],
    },
    {
      id: 'comparison.er-double',
      skill: 'big → bigger: согласная удваивается',
      focus: 'er',
      why: 'После короткой гласной одна согласная удваивается: big → bigger, hot → hotter, thin → thinner.',
      variants: [
        { s: 'London_N is_V [bigger_J] than_C Paris_N .', tr: 'Лондон больше Парижа.', options: ['biger', 'more big'] },
        { s: 'It_P is_V [hotter_J] in_I Spain_N than_C in_I England_N .', tr: 'В Испании жарче, чем в Англии.', options: ['hoter', 'more hot'] },
        { s: 'This_D laptop_N is_V [thinner_J] than_C that_D one_P .', tr: 'Этот ноутбук тоньше того.', options: ['thiner', 'more thin'] },
      ],
    },
    {
      id: 'comparison.y-ier',
      skill: 'Слово на -y: y → ier (happy → happier)',
      focus: 'er',
      why: 'На -y: меняем y на i и добавляем -er. happy → happier, easy → easier, busy → busier.',
      variants: [
        { s: 'Anna_N is_V [happier_J] now_R than_C last_J year_N .', tr: 'Анна сейчас счастливее, чем в прошлом году.', options: ['happyer', 'more happy'] },
        { s: 'The_D test_N was_V [easier_J] than_C I_P thought_V .', tr: 'Тест оказался легче, чем я думал.', options: ['easyer', 'more easy'] },
        { s: 'The_D city_N centre_N is_V [busier_J] at_I the_D weekend_N .', tr: 'В выходные в центре города больше народу.', options: ['busyer', 'more busy'] },
      ],
    },
    {
      id: 'comparison.more-long',
      skill: 'Длинное прилагательное: more + прилагательное',
      focus: 'more',
      why: 'Длинные прилагательные не меняются, перед ними ставим more: more expensive, more popular.',
      variants: [
        { s: 'This_D course_N is_V [more_R] useful_J than_C the_D last_J one_P .', tr: 'Этот курс полезнее прошлого.', options: ['most', 'very'] },
        { s: 'Football_N is_V [more_R] popular_J than_C tennis_N here_R .', tr: 'Здесь футбол популярнее тенниса.', options: ['most', 'very'] },
        { s: 'Her_P new_J book_N is_V [more_R] difficult_J than_C her_P last_J one_P .', tr: 'Её новая книга сложнее прошлой.', options: ['most', 'very'] },
      ],
    },
    {
      id: 'comparison.short-or-long',
      skill: 'Выбор: -er для коротких, more для длинных',
      focus: 'more',
      why: 'Один слог — -er (faster). Длинное слово (comfortable, interesting) — more. Считай слоги.',
      variants: [
        { s: 'Your_P flat_N is_V [more~comfortable_J] than_C mine_P .', tr: 'Твоя квартира удобнее моей.', options: ['comfortabler', 'most comfortable'] },
        { s: 'The_D train_N is_V [faster_J] than_C the_D bus_N .', tr: 'Поезд быстрее автобуса.', options: ['more fast', 'fastest'] },
        { s: 'This_D book_N is_V [more~interesting_J] than_C the_D film_N .', tr: 'Эта книга интереснее фильма.', options: ['interestinger', 'most interesting'] },
      ],
    },
    {
      id: 'comparison.than',
      skill: 'После сравнительной степени — than («чем»)',
      focus: 'than',
      why: 'Двух сравниваем через than: older than, harder than. then значит «потом», а that — «тот, что».',
      variants: [
        { s: 'Tom_N is_V older_J [than_C] Kate_N .', tr: 'Том старше Кейт.', options: ['that', 'then'] },
        { s: 'This_D test_N was_V harder_J [than_C] the_D last_J one_P .', tr: 'Этот тест был сложнее прошлого.', options: ['then', 'as'] },
        { s: 'Trains_N here_R are_V more_R expensive_J [than_C] buses_N .', tr: 'Поезда здесь дороже автобусов.', options: ['that', 'from'] },
      ],
    },
    {
      id: 'comparison.good-better',
      skill: 'good → better → the best',
      focus: 'irregular',
      why: 'У good сравнительная форма особая: better. Форм gooder и more good не бывает.',
      variants: [
        { s: 'This_D cake_N is_V [better_J] than_C the_D last_J one_P .', tr: 'Этот торт лучше прошлого.', options: ['gooder', 'more good'] },
        { s: 'Kate_N is_V [better_J] at_I maths_N than_C Tom_N .', tr: 'Кейт лучше Тома разбирается в математике.', options: ['gooder', 'more good'] },
        { s: 'I_P feel_V [better_J] today_R .', tr: 'Сегодня я чувствую себя лучше.', options: ['gooder', 'more good'] },
      ],
    },
    {
      id: 'comparison.bad-worse',
      skill: 'bad → worse → the worst',
      focus: 'irregular',
      why: 'У bad сравнительная форма особая: worse. Форм badder и more bad не бывает.',
      variants: [
        { s: 'The_D weather_N is_V [worse_J] than_C yesterday_R .', tr: 'Погода хуже, чем вчера.', options: ['badder', 'more bad'] },
        { s: 'My_P Spanish_N is_V [worse_J] than_C my_P English_N .', tr: 'Мой испанский хуже моего английского.', options: ['badder', 'more bad'] },
        { s: 'The_D traffic_N is_V [worse_J] in_I the_D morning_N .', tr: 'Утром пробки хуже.', options: ['badder', 'more bad'] },
      ],
    },
    {
      id: 'comparison.far-further',
      skill: 'far → further (farther) → the furthest',
      focus: 'irregular',
      why: 'far меняется особо: further или farther. Формы farer нет.',
      variants: [
        { s: 'The_D airport_N is_V [further_J] from_I here_R than_C the_D station_N .', tr: 'Аэропорт дальше отсюда, чем вокзал.', options: ['farer', 'more far'], accept: ['farther'] },
        { s: 'My_P office_N is_V [further_J] from_I home_N than_C yours_P .', tr: 'Мой офис дальше от дома, чем твой.', options: ['farer', 'more far'], accept: ['farther'] },
        { s: 'Which_P is_V [further_J] from_I London_N , Leeds_N or_C Glasgow_N ?', tr: 'Что дальше от Лондона: Лидс или Глазго?', options: ['farer', 'more far'], accept: ['farther'] },
      ],
    },
    {
      id: 'comparison.est-short',
      skill: 'Самый: the + прилагательное + est',
      focus: 'er',
      why: 'Самый из многих — the и -est: the cheapest, the tallest. Две вещи сравнивают на -er.',
      variants: [
        { s: 'This_D is_V the_D [cheapest_J] shop_N in_I town_N .', tr: 'Это самый дешёвый магазин в городе.', options: ['cheaper', 'most cheap'] },
        { s: 'Anna_N is_V the_D [tallest_J] girl_N in_I our_P class_N .', tr: 'Анна — самая высокая девочка в нашем классе.', options: ['taller', 'most tall'] },
        { s: 'It_P was_V the_D [hottest_J] day_N of_I the_D year_N .', tr: 'Это был самый жаркий день в году.', options: ['hotter', 'most hot'] },
      ],
    },
    {
      id: 'comparison.the-most',
      skill: 'Самый для длинных: the most + прилагательное',
      focus: 'more',
      why: 'Для длинных прилагательных «самый» — the most: the most careful. more нужно для «более».',
      variants: [
        { s: 'Anna_N is_V the_D [most_R] careful_J driver_N in_I our_P office_N .', tr: 'Анна — самый осторожный водитель в нашем офисе.', options: ['more', 'much'] },
        { s: 'This_D is_V the_D [most_R] beautiful_J park_N in_I the_D city_N .', tr: 'Это самый красивый парк в городе.', options: ['more', 'much'] },
        { s: 'This_D is_V the_D [most_R] popular_J restaurant_N in_I our_P street_N .', tr: 'Это самый популярный ресторан на нашей улице.', options: ['more', 'much'] },
      ],
    },
    {
      id: 'comparison.as-as',
      skill: 'as … as — «такой же, как»',
      focus: 'as',
      why: 'Равенство — пара as … as: as tall as. Здесь не нужны ни than, ни like.',
      variants: [
        { s: 'Anna_N is_V as_R tall_J [as_C] her_P brother_N .', tr: 'Анна такая же высокая, как её брат.', options: ['than', 'like'] },
        { s: 'My_P new_J phone_N is_V as_R fast_J [as_C] yours_P .', tr: 'Мой новый телефон такой же быстрый, как твой.', options: ['than', 'like'] },
        { s: 'The_D hotel_N was_V as_R good_J [as_C] we_P hoped_V .', tr: 'Отель оказался таким хорошим, как мы надеялись.', options: ['than', 'like'] },
      ],
    },
    {
      id: 'comparison.as-as-order',
      mode: 'order',
      skill: 'Собрать: (not) as … as',
      focus: 'as',
      why: 'Схема: подлежащее + be + as + прилагательное + as + с кем сравниваем. С not — «не такой, как».',
      variants: [
        { s: 'The_D bus_N isn’t_V as_R fast_J as_C the_D train_N .', tr: 'Автобус не такой быстрый, как поезд.' },
        { s: 'Kate_N is_V as_R busy_J as_C her_P boss_N .', tr: 'Кейт так же занята, как её начальник.', accept: ['her boss is as busy as Kate.'] },
        { s: 'This_D flat_N isn’t_V as_R big_J as_C our_P old_J one_P .', tr: 'Эта квартира не такая большая, как наша старая.' },
      ],
    },
    {
      id: 'comparison.less',
      skill: 'less + прилагательное — «менее»',
      focus: 'less',
      why: 'less ставим перед прилагательным и получаем «менее»: less crowded. lesser и least здесь не подходят.',
      variants: [
        { s: 'The_D bus_N is_V [less_R] crowded_J than_C the_D train_N .', tr: 'В автобусе менее людно, чем в поезде.', options: ['lesser', 'least'] },
        { s: 'This_D exercise_N is_V [less_R] difficult_J than_C the_D last_J one_P .', tr: 'Это упражнение менее сложное, чем прошлое.', options: ['lesser', 'fewer'] },
        { s: 'My_P new_J job_N is_V [less_R] interesting_J than_C the_D old_J one_P .', tr: 'Моя новая работа менее интересная, чем старая.', options: ['least', 'lesser'] },
      ],
    },
    {
      id: 'comparison.order-comparative',
      mode: 'order',
      skill: 'Собрать: кто + глагол + сравнительная форма + than',
      focus: 'than',
      why: 'Порядок такой: кто, глагол, сравнительная форма, than, с кем сравниваем.',
      variants: [
        { s: 'My_P sister_N is_V older_J than_C me_P .', tr: 'Моя сестра старше меня.' },
        { s: 'Anna_N cooks_V better_R than_C her_P husband_N .', tr: 'Анна готовит лучше своего мужа.' },
        { s: 'This_D chair_N is_V more_R comfortable_J than_C that_D one_P .', tr: 'Этот стул удобнее того.' },
      ],
    },
    {
      id: 'comparison.order-superlative',
      mode: 'order',
      skill: 'Собрать: the + самый + существительное + in …',
      focus: 'er',
      why: 'Самый из группы: the, превосходная форма, существительное, in и группа. Сравниваем не двух, а многих.',
      variants: [
        { s: 'This_D is_V the_D best_J pizza_N in_I town_N .', tr: 'Это лучшая пицца в городе.' },
        { s: 'It_P is_V the_D most_R expensive_J hotel_N in_I London_N .', tr: 'Это самый дорогой отель в Лондоне.' },
        { s: 'Kate_N is_V the_D youngest_J girl_N in_I our_P team_N .', tr: 'Кейт — самая молодая девушка в нашей команде.' },
      ],
    },
  ],
} satisfies TopicBody
