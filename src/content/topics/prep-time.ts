import type { TopicBody } from '../types'

export default {
  summary: 'at — точное время, on — день и дата, in — период (месяц, год, сезон, часть дня). Отдельно: at night, at the weekend, on time, in time.',
  ref: [
    { kind: 'visual', visual: { id: 'prep-time', focus: 'at' }, caption: 'at — точка (часы), on — день, in — период. Чем длиннее отрезок, тем «шире» предлог' },
    {
      kind: 'rule',
      title: 'at, on, in: час, день, период',
      text: 'at — точное время: at 7.30, at midday. on — день: on Monday, on 5 May, on my birthday. in — период: in June, in 2024, in summer, in the morning, а ещё «через» срок: in two days.',
      examples: [
        { s: 'The_D concert_N starts_V at_I 8.30_M .', tr: 'Концерт начинается в 8.30.' },
        { s: 'We_P have_V an_D exam_N on_I Thursday_N .', tr: 'У нас экзамен в четверг.' },
        { s: 'Tom_N was_A born_V in_I 1990_M .', tr: 'Том родился в 1990 году.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Блоки: at night, at the weekend',
      text: 'Эти сочетания не выводятся из схемы, учи их целиком: at night, at the weekend (так говорят в Британии), at Christmas, at Easter. Рядом ещё два блока: on time — вовремя, по расписанию; in time (to, for) — успеть, до начала.',
      examples: [
        { s: 'The_D city_N is_V beautiful_J at_I night_N .', tr: 'Ночью город очень красивый.' },
        { s: 'The_D bus_N was_V on_I time_N today_R .', tr: 'Сегодня автобус пришёл вовремя.' },
        { s: 'We_P got_V there_R in_I time_N to_X see_V the_D start_N .', tr: 'Мы успели к началу.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Ловушка: on Monday morning, но in the morning',
      text: 'Если назван день, то и часть дня идёт с on: on Monday morning, on Friday evening. Без названия дня — in the morning, in the evening. «Ночью» — обычно at night.',
      examples: [
        { s: 'Ben_N is_V free_J on_I Friday_N afternoon_N .', tr: 'В пятницу днём Бен свободен.' },
        { s: 'I_P read_V the_D news_N in_I the_D morning_N .', tr: 'Утром я читаю новости.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Без предлога: last, next, this, every',
      text: 'Перед last, next, this, every предлога нет: last week, next year, this summer, every day. Если добавишь in или on, получится ошибка.',
      examples: [
        { s: 'We_P went_V to_I Paris_N last_J year_N .', tr: 'В прошлом году мы ездили в Париж.' },
        { s: 'Kate_N goes_V swimming_V every_D Sunday_N .', tr: 'Кейт ходит плавать каждое воскресенье.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Я_P приду_V в_I пятницу_N .',
      en: 'I_P +’ll_A come_V on_I Friday_N .',
      note: 'По-русски «в» подходит почти всегда: в пятницу, в июне, в шесть. В английском предлог зависит от того, что названо: час — at, день — on, месяц — in.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'See_V you_P in_I Friday_N !', right: 'See_V you_P on_I Friday_N !', note: 'День недели — on.' },
        { wrong: 'We_P met_V at_I June_N .', right: 'We_P met_V in_I June_N .', note: 'Месяц — in.' },
        { wrong: 'I_P work_V in_I night_N .', right: 'I_P work_V at_I night_N .', note: 'Ночью — at night.' },
        { wrong: 'I_P saw_V her_P in_I Monday_N morning_N .', right: 'I_P saw_V her_P on_I Monday_N morning_N .', note: 'День и часть дня вместе — on.' },
        { wrong: 'I_P saw_V him_P in_I last_J week_N .', right: 'I_P saw_V him_P last_J week_N .', note: 'Перед last, next, every предлога нет.' },
        { wrong: 'I_P get_V up_R in_I seven_M .', right: 'I_P get_V up_R at_I seven_M .', note: 'Час на часах — at.' },
      ],
    },
  ],
  items: [
    {
      id: 'prep-time.at-clock',
      skill: 'at — час на часах: at 7.30, at six',
      focus: 'at',
      why: 'Точное время на часах — at: at 7.30, at six, at half past nine.',
      variants: [
        { s: 'The_D film_N starts_V [at_I] 7.30_M .', tr: 'Фильм начинается в 7.30.', options: ['on', 'in'] },
        { s: 'My_P train_N leaves_V [at_I] half~past~nine_M .', tr: 'Мой поезд отправляется в половине десятого.', options: ['on', 'in'] },
        { s: 'Tom_N gets_V up_R [at_I] six_M .', tr: 'Том встаёт в шесть.', options: ['on', 'in'] },
      ],
    },
    {
      id: 'prep-time.on-day',
      skill: 'on — день недели: on Monday, on Saturdays',
      focus: 'on',
      why: 'День недели — on: on Friday. Во множественном числе — «по субботам»: on Saturdays.',
      variants: [
        { s: 'I_P play_V football_N [on_I] Saturdays_N .', tr: 'Я играю в футбол по субботам.', options: ['at', 'in'] },
        { s: 'Anna_N has_V a_D meeting_N [on_I] Tuesday_N .', tr: 'У Анны встреча во вторник.', options: ['at', 'in'] },
        { s: 'Are_V you_P free_J [on_I] Friday_N ?', tr: 'Ты свободен в пятницу?', options: ['at', 'in'] },
      ],
    },
    {
      id: 'prep-time.on-date',
      skill: 'on — дата и особый день: on 5 May, on my birthday',
      focus: 'on',
      why: 'Дата и конкретный день — on: on 12 June, on my birthday, on 25 December.',
      variants: [
        { s: 'My_P birthday_N is_V [on_I] 12~June_N .', tr: 'День рождения у меня 12 июня.', options: ['at', 'in'] },
        { s: 'We_P always_R have_V a_D party_N [on_I] my_P birthday_N .', tr: 'Мы всегда устраиваем вечеринку в мой день рождения.', options: ['at', 'in'] },
        { s: 'The_D shop_N is_V closed_J [on_I] 25~December_N .', tr: 'Магазин закрыт 25 декабря.', options: ['at', 'in'] },
      ],
    },
    {
      id: 'prep-time.in-month-year',
      skill: 'in — месяц и год: in June, in 2018',
      focus: 'in',
      why: 'Месяц и год — период, поэтому in: in June, in 2018.',
      variants: [
        { s: 'Our_P holiday_N starts_V [in_I] August_N .', tr: 'Наш отпуск начинается в августе.', options: ['on', 'at'] },
        { s: 'We_P bought_V this_D flat_N [in_I] 2018_M .', tr: 'Мы купили эту квартиру в 2018 году.', options: ['on', 'at'] },
        { s: 'Kate_N moved_V to_I London_N [in_I] March_N .', tr: 'Кейт переехала в Лондон в марте.', options: ['on', 'at'] },
      ],
    },
    {
      id: 'prep-time.in-season',
      skill: 'in — время года: in summer, in winter',
      focus: 'in',
      why: 'Сезон — период, поэтому in: in summer, in winter. Допустимо и in the summer.',
      variants: [
        { s: 'It_P is_V very_R hot_J here_R [in_I] summer_N .', tr: 'Летом здесь очень жарко.', options: ['on', 'at'] },
        { s: 'Leaves_N fall_V from_I the_D trees_N [in_I] autumn_N .', tr: 'Осенью листья падают с деревьев.', options: ['on', 'at'] },
        { s: 'It_P is_V cold_J and_C dark_J [in_I] winter_N .', tr: 'Зимой холодно и темно.', options: ['on', 'at'] },
      ],
    },
    {
      id: 'prep-time.in-part-of-day',
      skill: 'in the morning / afternoon / evening',
      focus: 'in',
      why: 'Утро, день и вечер без названия дня — in the morning, in the afternoon, in the evening.',
      variants: [
        { s: 'I_P usually_R drink_V coffee_N [in_I] the_D morning_N .', tr: 'Утром я обычно пью кофе.', options: ['on', 'at'] },
        { s: 'Tom_N plays_V tennis_N [in_I] the_D afternoon_N .', tr: 'Том играет в теннис днём.', options: ['on', 'at'] },
        { s: 'We_P often_R watch_V TV_N [in_I] the_D evening_N .', tr: 'Вечером мы часто смотрим телевизор.', options: ['on', 'at'] },
      ],
    },
    {
      id: 'prep-time.on-day-part',
      skill: 'on Monday morning — день и часть дня: on',
      focus: 'on',
      why: 'Назван день — предлог on и для части дня: on Monday morning, on Friday evening.',
      variants: [
        { s: 'I_P have_V a_D lesson_N [on_I] Monday_N morning_N .', tr: 'В понедельник утром у меня урок.', options: ['in', 'at'] },
        { s: 'We_P are_A going_V to_I the_D cinema_N [on_I] Saturday_N evening_N .', tr: 'В субботу вечером мы идём в кино.', options: ['in', 'at'] },
        { s: 'Max_N called_V me_P [on_I] Sunday_N afternoon_N .', tr: 'Макс позвонил мне в воскресенье днём.', options: ['in', 'at'] },
      ],
    },
    {
      id: 'prep-time.in-duration',
      skill: 'in two days — «через» срок',
      focus: 'in',
      why: 'in + срок = «через столько-то»: in two days, in ten minutes, in a week.',
      variants: [
        { s: 'The_D parcel_N will_A arrive_V [in_I] two_M days_N .', tr: 'Посылка придёт через два дня.', options: ['on', 'at'] },
        { s: 'The_D train_N leaves_V [in_I] ten_M minutes_N .', tr: 'Поезд отходит через десять минут.', options: ['on', 'at'] },
        { s: 'Kate_N will_A be_V back_R [in_I] a_D week_N .', tr: 'Кейт вернётся через неделю.', options: ['on', 'at'] },
      ],
    },
    {
      id: 'prep-time.no-prep',
      mode: 'choice',
      skill: 'last, next, this, every — без предлога',
      focus: 'no-prep',
      why: 'Перед last, next, this, every предлога нет: last year, next week, every day.',
      variants: [
        {
          q: 'Выбери верное предложение: «Мы вернёмся на следующей неделе».',
          answer: 'We will be back next week.',
          options: ['We will be back in next week.', 'We will be back on next week.'],
        },
        {
          q: 'Выбери верное предложение: «Я вижу его каждый день».',
          answer: 'I see him every day.',
          options: ['I see him in every day.', 'I see him at every day.'],
        },
        {
          q: 'Выбери верное предложение: «Я пришёл на эту работу в прошлом году».',
          answer: 'I started this job last year.',
          options: ['I started this job in last year.', 'I started this job on last year.'],
        },
      ],
    },
    {
      id: 'prep-time.chunk-at-night',
      skill: 'at night — ночью (но in the morning)',
      why: 'Ночь — особый случай: at night. Остальные части суток — in the morning, in the evening.',
      variants: [
        { s: 'I_P sleep_V well_R [at_I] night_N .', tr: 'Ночью я хорошо сплю.', options: ['in', 'on'] },
        { s: 'It_P is_V quiet_J here_R [at_I] night_N .', tr: 'Здесь ночью тихо.', options: ['in', 'on'] },
        { s: 'Tom_N never_R drinks_V coffee_N [at_I] night_N .', tr: 'Том никогда не пьёт кофе ночью.', options: ['in', 'on'] },
      ],
    },
    {
      id: 'prep-time.chunk-at-weekend',
      skill: 'at the weekend — в выходные (по-британски)',
      why: 'В Британии говорят at the weekend, не on the weekend (так говорят в США).',
      variants: [
        { s: 'What_P do_A you_P do_V [at_I] the_D weekend_N ?', tr: 'Что ты делаешь в выходные?', options: ['on', 'in'] },
        { s: 'We_P usually_R visit_V my_P parents_N [at_I] the_D weekend_N .', tr: 'В выходные мы обычно ездим к моим родителям.', options: ['on', 'in'] },
        { s: 'Anna_N is_V busy_J [at_I] the_D weekend_N .', tr: 'Анна занята в выходные.', options: ['on', 'in'] },
      ],
    },
    {
      id: 'prep-time.chunk-at-christmas',
      skill: 'at Christmas, at Easter — праздники: at',
      why: 'Праздник как период — at: at Christmas, at Easter, at New Year. Конкретный день — on Christmas Day.',
      variants: [
        { s: 'We_P always_R visit_V Grandma_N [at_I] Christmas_N .', tr: 'На Рождество мы всегда навещаем бабушку.', options: ['on', 'in'] },
        { s: 'Many_D shops_N are_V closed_J [at_I] Easter_N .', tr: 'На Пасху многие магазины закрыты.', options: ['on', 'in'] },
        { s: 'What_P are_A you_P doing_V [at_I] New~Year_N ?', tr: 'Что ты делаешь на Новый год?', options: ['on', 'in'] },
      ],
    },
    {
      id: 'prep-time.chunk-on-time',
      skill: 'on time — вовремя, по расписанию',
      why: 'on time — не опоздав, точно по расписанию. Всегда on, без the.',
      variants: [
        { s: 'The_D train_N arrived_V [on_I] time_N .', tr: 'Поезд пришёл точно по расписанию.', options: ['at', 'by'] },
        { s: 'Our_P meeting_N started_V [on_I] time_N .', tr: 'Наша встреча началась вовремя.', options: ['at', 'by'] },
        { s: 'Tom_N is_V never_R late_J . He_P is_V always_R [on_I] time_N .', tr: 'Том никогда не опаздывает. Он всегда приходит вовремя.', options: ['at', 'by'] },
      ],
    },
    {
      id: 'prep-time.chunk-in-time',
      skill: 'in time (to) — успеть, до начала',
      why: 'in time (to, for) — успеть, пока не поздно. Не путай с on time — точно по расписанию.',
      variants: [
        { s: 'We_P got_V to_I the_D station_N [in_I] time_N to_X catch_V the_D train_N .', tr: 'Мы добрались до вокзала и успели на поезд.', options: ['on', 'at'] },
        { s: 'Run_V ! You_P +’ll_A still_R be_V [in_I] time_N to_X see_V the_D end_N .', tr: 'Беги! Ещё успеешь увидеть конец.', options: ['on', 'at'] },
        { s: 'Lucy_N got_V to_I the_D cinema_N [in_I] time_N to_X buy_V popcorn_N .', tr: 'Люси пришла в кино и ещё успела купить попкорн.', options: ['on', 'at'] },
      ],
    },
    {
      id: 'prep-time.order',
      mode: 'order',
      skill: 'Собрать предложение: что — когда',
      why: 'Время обычно в конце: сначала час (at), потом день (on): at nine on Monday.',
      variants: [
        {
          s: 'We_P start_V work_N at_I nine_M on_I Monday_N .',
          tr: 'В понедельник мы начинаем работать в девять.',
          accept: ['We start work on Monday at nine .'],
          options: ['in', 'every'],
        },
        { s: 'The_D bank_N opens_V at_I ten_M in_I the_D morning_N .', tr: 'Банк открывается в десять утра.', options: ['on', 'evening'] },
        { s: 'Tom_N will_A arrive_V on_I Friday_N evening_N .', tr: 'Том приедет в пятницу вечером.', options: ['in', 'at'] },
      ],
    },
  ],
} satisfies TopicBody
