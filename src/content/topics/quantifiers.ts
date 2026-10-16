import type { TopicBody } from '../types'

// Шкала количества: some / any, many / much / a lot of, few / a few, little / a little, no, all.

export default {
  summary: 'some — в утверждениях и предложениях, any — в вопросах и после not; many — штуки, much — масса; a few / a little — хватает, few / little — мало.',
  ref: [
    { kind: 'visual', visual: { id: 'quant-scale', focus: 'some' }, caption: 'От «нет» до «все»: верхняя строка — штуки (many), нижняя — масса (much)' },
    {
      kind: 'rule',
      title: 'some и any',
      text: 'some — в утверждениях, предложениях и просьбах: Would you like some tea? any — в вопросах и после not: Do you have any questions? I don’t have any money. Без not и вопроса any значит «любой».',
      examples: [
        { s: 'She_P has_V some_D good_J ideas_N .', tr: 'У неё есть хорошие идеи.' },
        { s: 'Do_A you_P have_V any_D questions_N ?', tr: 'У вас есть вопросы?' },
        { s: 'We_P didn’t_A buy_V any_D bread_N .', tr: 'Мы не купили хлеба.' },
      ],
    },
    {
      kind: 'rule',
      title: 'many, much и a lot of',
      text: 'many — с исчисляемыми во множественном числе, much — с неисчисляемыми. Чаще всего они звучат в вопросах и отрицаниях: How many people? Not much time. В утверждении обычно a lot of: We have a lot of work.',
      examples: [
        { s: 'How_R many_D chairs_N do_A we_P need_V ?', tr: 'Сколько нам нужно стульев?' },
        { s: 'I_P don’t_A have_V much_D free_J time_N .', tr: 'У меня мало свободного времени.' },
        { s: 'They_P have_V a~lot~of_D customers_N .', tr: 'У них много клиентов.' },
      ],
    },
    {
      kind: 'rule',
      title: 'few / a few, little / a little',
      text: 'a few и a little — «несколько, немного, хватает». few и little без a — «мало, почти нет». few стоит со штучными словами, little — с неисчисляемыми: a few friends, little time.',
      examples: [
        { s: 'I_P have_V a~few_D friends_N here_R .', tr: 'У меня здесь есть несколько друзей.' },
        { s: 'We_P have_V little_D time_N .', tr: 'У нас мало времени.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'У_I него_P много_R друзей_N и_C много_R работы_N .',
      en: 'He_P has_V a~lot~of_D friends_N and_C a~lot~of_D work_N .',
      note: 'Русское «много» одно для штук и массы. В английском выбирают: many друзей, much работы, а в утверждении чаще a lot of для обоих.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I_P don’t_A have_V some_D money_N .', right: 'I_P don’t_A have_V any_D money_N .', note: 'После not — any.' },
        { wrong: 'How_R much_D people_N are_V there_P ?', right: 'How_R many_D people_N are_V there_P ?', note: 'Людей считают штуками — many.' },
        { wrong: 'I_P have_V much_D friends_N .', right: 'I_P have_V a~lot~of_D friends_N .', note: 'much — только с неисчисляемыми.' },
        { wrong: 'I_P have_V few_D time_N .', right: 'I_P have_V little_D time_N .', note: 'Время не считают штуками — little.' },
        { wrong: 'I_P haven’t_A no_D time_N .', right: 'I_P have_V no_D time_N .', note: 'no уже отрицание: не нужен ещё not.' },
      ],
    },
    { kind: 'tip', text: 'Про «мало»: few — штучное (few books), little — масса (little time). С a — хорошо, хватает (a few, a little); без a — плохо, не хватает.' },
  ],
  items: [
    {
      id: 'quantifiers.some-positive',
      skill: 'some — в утверждении: There is some bread',
      focus: 'some',
      why: 'В утверждении «какое-то количество» — some: и с исчисляемыми во мн. числе, и с неисчисляемыми.',
      variants: [
        { s: 'There_P is_V [some_D] bread_N on_I the_D table_N .', tr: 'На столе есть хлеб.', options: ['any', 'many'] },
        { s: 'Anna_N has_V [some_D] friends_N in_I Spain_N .', tr: 'У Анны есть друзья в Испании.', options: ['any', 'much'] },
        { s: 'I_P need_V [some_D] help_N with_I this_D email_N .', tr: 'Мне нужна помощь с этим письмом.', options: ['any', 'many'] },
      ],
    },
    {
      id: 'quantifiers.some-offer',
      skill: 'some — в предложении и просьбе: Would you like some tea?',
      focus: 'some',
      why: 'Предлагаем или просим и ждём «да» — some: Would you like some tea? Can I have some water?',
      variants: [
        { s: 'Would_A you_P like_V [some_D] tea_N ?', tr: 'Хочешь чаю?', options: ['any', 'much'] },
        { s: 'Can_A I_P have_V [some_D] water_N , please_R ?', tr: 'Можно мне воды, пожалуйста?', options: ['any', 'many'] },
        { s: 'Could_A you_P give_V me_P [some_D] paper_N ?', tr: 'Не могли бы вы дать мне бумаги?', options: ['any', 'many'] },
      ],
    },
    {
      id: 'quantifiers.any-question',
      skill: 'any — в вопросе: Do you have any …?',
      focus: 'any',
      why: 'Спрашиваем, есть ли вообще, и не знаем ответа — any.',
      variants: [
        { s: 'Do_A you_P have_V [any_D] brothers_N or_C sisters_N ?', tr: 'У тебя есть братья или сёстры?', options: ['some', 'much'] },
        { s: 'Is_V there_P [any_D] milk_N in_I the_D fridge_N ?', tr: 'В холодильнике есть молоко?', options: ['some', 'many'] },
        { s: 'Are_V there_P [any_D] good_J restaurants_N near_I here_R ?', tr: 'Тут рядом есть хорошие рестораны?', options: ['some', 'much'] },
      ],
    },
    {
      id: 'quantifiers.any-negative',
      skill: 'any — после not: I don’t have any',
      focus: 'any',
      why: 'После not, don’t, isn’t, haven’t — any: I don’t have any money. Some здесь не ставят.',
      variants: [
        { s: 'I_P don’t_A have_V [any_D] cash_N today_R .', tr: 'У меня сегодня нет наличных.', options: ['some', 'no'] },
        { s: 'There_P aren’t_V [any_D] chairs_N in_I the_D room_N .', tr: 'В комнате нет стульев.', options: ['some', 'no'] },
        { s: 'We_P haven’t_A got_V [any_D] time_N .', tr: 'У нас нет времени.', options: ['some', 'no'] },
      ],
    },
    {
      id: 'quantifiers.no',
      skill: 'no + существительное = «нет»: no time = not any time',
      focus: 'no',
      why: 'no уже содержит отрицание: We have no time = We don’t have any time. Не ставь рядом ещё один not.',
      variants: [
        { s: 'We_P have_V [no_D] time_N . Hurry_V up_R !', tr: 'У нас совсем нет времени. Поторопись!', options: ['any', 'some'] },
        { s: 'There_P is_V [no_D] milk_N left_J .', tr: 'Молока не осталось.', options: ['any', 'some'] },
        { s: 'He_P has_V [no_D] friends_N in_I this_D city_N .', tr: 'У него нет друзей в этом городе.', options: ['any', 'some'] },
      ],
    },
    {
      id: 'quantifiers.many',
      skill: 'many — штучное во мн. числе, в вопросе и после not',
      focus: 'many',
      why: 'С людьми и вещами, которых можно посчитать, — many: not many people, do you have many books?',
      variants: [
        { s: 'There_P aren’t_V [many_D] people_N here_R today_R .', tr: 'Сегодня здесь немного людей.', options: ['much', 'little'], accept: ['a lot of'] },
        { s: 'Do_A you_P have_V [many_D] books_N ?', tr: 'У тебя много книг?', options: ['much', 'little'], accept: ['a lot of'] },
        { s: 'Tom_N doesn’t_A know_V [many_D] people_N in_I London_N .', tr: 'В Лондоне Том знает не так много людей.', options: ['much', 'little'], accept: ['a lot of'] },
      ],
    },
    {
      id: 'quantifiers.much',
      skill: 'much — неисчисляемое, в вопросе и после not',
      focus: 'much',
      why: 'С массой, которую не посчитать штуками (деньги, время, сон), — much: not much money.',
      variants: [
        { s: 'I_P don’t_A have_V [much_D] money_N .', tr: 'У меня мало денег.', options: ['many', 'few'], accept: ['a lot of'] },
        { s: 'Is_V there_P [much_D] traffic_N in_I the_D morning_N ?', tr: 'Утром на дорогах много машин?', options: ['many', 'few'], accept: ['a lot of'] },
        { s: 'We_P didn’t_A get_V [much_D] sleep_N last_J night_N .', tr: 'Мы мало спали прошлой ночью.', options: ['many', 'few'], accept: ['a lot of'] },
      ],
    },
    {
      id: 'quantifiers.how-many',
      skill: 'How many + штучное во мн. числе',
      focus: 'many',
      why: 'Спрашиваем «сколько штук, человек» — How many + существительное во множественном числе.',
      variants: [
        { s: 'How_R [many_D] people_N are_V there_P in_I your_P team_N ?', tr: 'Сколько человек в твоей команде?', options: ['much', 'few'] },
        { s: 'How_R [many_D] eggs_N do_A we_P need_V ?', tr: 'Сколько нам нужно яиц?', options: ['much', 'few'] },
        { s: 'How_R [many_D] languages_N do_A you_P speak_V ?', tr: 'На скольких языках ты говоришь?', options: ['much', 'few'] },
      ],
    },
    {
      id: 'quantifiers.how-much',
      skill: 'How much + неисчисляемое',
      focus: 'much',
      why: 'Спрашиваем «сколько» о массе (вода, время, сахар) — How much + неисчисляемое существительное.',
      variants: [
        { s: 'How_R [much_D] water_N do_A you_P drink_V every_D day_N ?', tr: 'Сколько воды ты пьёшь каждый день?', options: ['many', 'few'] },
        { s: 'How_R [much_D] time_N do_A we_P have_V ?', tr: 'Сколько у нас времени?', options: ['many', 'few'] },
        { s: 'How_R [much_D] sugar_N do_A you_P want_V in_I your_P tea_N ?', tr: 'Сколько сахара тебе в чай?', options: ['many', 'few'] },
      ],
    },
    {
      id: 'quantifiers.a-lot-of',
      skill: 'a lot of — «много» в утверждении',
      focus: 'a-lot',
      why: 'В утверждении «много» чаще говорят a lot of (lots of), и со штучными словами, и с массой. much здесь почти не звучит, many в утверждении звучит книжно.',
      variants: [
        { s: 'We_P had_V [a~lot~of_D] rain_N in_I June_N .', tr: 'В июне было много дождей.', options: ['many', 'little'], accept: ['lots of'] },
        { s: 'Tom_N drinks_V [a~lot~of_D] coffee_N .', tr: 'Том пьёт много кофе.', options: ['many', 'few'], accept: ['lots of'] },
        { s: 'My_P brother_N reads_V [a~lot~of_D] books_N .', tr: 'Мой брат читает много книг.', options: ['much', 'few'], accept: ['lots of', 'many'] },
      ],
    },
    {
      id: 'quantifiers.a-few',
      skill: 'a few — несколько (штучное), это хватает',
      focus: 'a-few',
      why: 'a few — «несколько, пара», нормально. Только со штучными словами во множественном числе.',
      variants: [
        { s: 'I_P have_V [a~few_D] questions_N about_I the_D report_N .', tr: 'У меня есть несколько вопросов по отчёту.', options: ['few', 'a little'], accept: ['some'] },
        { s: 'Tom_N invited_V [a~few_D] friends_N for_I dinner_N .', tr: 'Том пригласил на ужин нескольких друзей.', options: ['few', 'a little'], accept: ['some'] },
        { s: 'We_P waited_V for_I [a~few_D] minutes_N and_C then_R left_V .', tr: 'Мы подождали несколько минут и ушли.', options: ['few', 'a little'] },
      ],
    },
    {
      id: 'quantifiers.few',
      skill: 'few (без a) — мало, почти нет (штучное)',
      focus: 'few',
      why: 'few без a — «мало, не хватает». Это жалоба или констатация нехватки. Со штучными словами во мн. числе.',
      variants: [
        { s: '[Few_D] people_N came_V to_I the_D meeting_N , so_C it_P ended_V early_R .', tr: 'На встречу пришло мало людей, поэтому она закончилась рано.', options: ['A few', 'Little'] },
        { s: 'There_P are_V [few_D] shops_N in_I our_P village_N , so_C we_P drive_V to_I town_N .', tr: 'В нашей деревне мало магазинов, поэтому мы ездим в город.', options: ['a few', 'little'] },
        { s: 'Max_N has_V [few_D] friends_N , so_C he_P often_R stays_V at_I home_N .', tr: 'У Макса мало друзей, поэтому он часто сидит дома.', options: ['a few', 'little'] },
      ],
    },
    {
      id: 'quantifiers.a-little',
      skill: 'a little — немного (неисчисляемое), это хватает',
      focus: 'a-little',
      why: 'a little — «немного, хватает». Только с неисчисляемыми: a little time, a little salt.',
      variants: [
        { s: 'Don’t_A worry_V — we_P still_R have_V [a~little_D] time_N .', tr: 'Не волнуйся — у нас ещё есть немного времени.', options: ['a few', 'little'], accept: ['some'] },
        { s: 'I_P speak_V [a~little_D] French_N .', tr: 'Я немного говорю по-французски.', options: ['a few', 'little'], accept: ['some'] },
        { s: 'Add_V [a~little_D] salt_N to_I the_D soup_N .', tr: 'Добавь в суп немного соли.', options: ['a few', 'little'], accept: ['some'] },
      ],
    },
    {
      id: 'quantifiers.little',
      skill: 'little (без a) — мало, почти нет (неисчисляемое)',
      focus: 'little',
      why: 'little без a — «мало, не хватает». Только с неисчисляемыми: little time, little money.',
      variants: [
        { s: 'Ben_N has_V [little_D] free_J time_N at_I the_D moment_N .', tr: 'Сейчас у Бена мало свободного времени.', options: ['a little', 'few'] },
        { s: 'There_P is_V [little_D] snow_N this_D winter_N .', tr: 'Этой зимой мало снега.', options: ['a little', 'few'] },
        { s: 'She_P has_V [little_D] money_N , so_C she_P walks_V to_I work_N .', tr: 'У неё мало денег, поэтому она ходит на работу пешком.', options: ['a little', 'few'] },
      ],
    },
    {
      id: 'quantifiers.all',
      skill: 'all — «все, весь»: all my friends, all day',
      focus: 'all',
      why: 'all + существительное во мн. числе или неисчисляемое: all my friends, all day. every требует единственного числа.',
      variants: [
        { s: '[All_D] my_P friends_N live_V in_I Leeds_N .', tr: 'Все мои друзья живут в Лидсе.', options: ['Every', 'Whole'] },
        { s: 'It_P rained_V [all_D] day_N yesterday_R .', tr: 'Вчера весь день шёл дождь.', options: ['every', 'whole'] },
        { s: 'Tom_N has_A read_V [all_D] the_D books_N on_I this_D shelf_N .', tr: 'Том прочитал все книги на этой полке.', options: ['every', 'whole'] },
      ],
    },
    {
      id: 'quantifiers.any-free',
      skill: 'any без not и вопроса — «любой»',
      focus: 'any',
      why: 'В утверждении any значит «любой, какой угодно»: any colour, any time.',
      variants: [
        { s: 'You_P can_A choose_V [any_D] colour_N you_P like_V .', tr: 'Можешь выбрать любой цвет, какой нравится.', options: ['some', 'no'] },
        { s: '[Any_D] teacher_N in_I this_D school_N can_A help_V you_P .', tr: 'Любой учитель в этой школе может тебе помочь.', options: ['Some', 'No'] },
        { s: 'Call_V me_P at_I [any_D] time_N .', tr: 'Звони мне в любое время.', options: ['some', 'no'] },
      ],
    },
    {
      id: 'quantifiers.order',
      mode: 'order',
      skill: 'Собрать вопрос: How many / How much + существительное',
      focus: 'many',
      why: 'How many или How much стоит в начале вместе с существительным, дальше обычный порядок вопроса.',
      variants: [
        { s: 'How_R many_D tickets_N do_A you_P want_V ?', tr: 'Сколько билетов вам нужно?', options: ['much'] },
        { s: 'How_R much_D milk_N is_V there_P ?', tr: 'Сколько там молока?', options: ['many'] },
        { s: 'How_R many_D days_N are_V there_P in_I February_N ?', tr: 'Сколько дней в феврале?', options: ['much'] },
      ],
    },
    {
      id: 'quantifiers.find',
      mode: 'pick',
      skill: 'Найти слова, которые отвечают на «сколько?»',
      focus: 'some',
      why: 'some, any, much, many, a few, a lot of, no — определители количества (D): они стоят перед существительным.',
      variants: [
        { s: 'I_P need_V {some_D} paper_N and_C {a~few_D} pens_N .', tr: 'Мне нужно немного бумаги и несколько ручек.', q: 'Найди слова, которые говорят «сколько».' },
        { s: 'We_P don’t_A have_V {much_D} time_N , but_C we_P have_V {a~lot~of_D} work_N .', tr: 'У нас мало времени, но много работы.', q: 'Найди слова, которые говорят «сколько».' },
        { s: 'Kate_N has_V {no_D} brothers_N but_C {a~lot~of_D} cousins_N .', tr: 'У Кейт нет братьев, но много двоюродных братьев и сестёр.', q: 'Найди слова, которые говорят «сколько».' },
      ],
    },
  ],
} satisfies TopicBody
