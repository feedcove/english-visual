import type { TopicBody } from '../types'

export default {
  summary: 'am / is / are + глагол с -ing: действие идёт прямо сейчас или в эти дни. «Как обычно» — Present Simple, «как сейчас» — Present Continuous.',
  ref: [
    { kind: 'visual', visual: { id: 'timeline', focus: 'present.cont' }, caption: 'Волнистый отрезок вокруг NOW: действие уже идёт и ещё не закончилось' },
    {
      kind: 'rule',
      title: 'am / is / are + глагол с -ing',
      text: 'Действие идёт прямо сейчас или в эти дни. Подсказки: now, at the moment, today, this week, Look!, Listen! Отрицание: not после be. Вопрос: be выходит вперёд.',
      examples: [
        { s: 'I_P am_A cooking_V dinner_N now_R .', tr: 'Сейчас я готовлю ужин.' },
        { s: 'She_P isn’t_A working_V today_R .', tr: 'Сегодня она не работает.' },
        { s: 'Are_A they_P waiting_V for_I us_P ?', tr: 'Они нас ждут?' },
      ],
    },
    {
      kind: 'rule',
      title: 'Правописание -ing',
      text: 'Обычно просто -ing: work → working. Конечная -e пропадает: make → making. Если слог ударный и кончается на одну гласную и одну согласную, согласную удваиваем: sit → sitting, run → running. -ie → -ying: lie → lying.',
      examples: [
        { s: 'He_P is_A making_V tea_N .', tr: 'Он заваривает чай.' },
        { s: 'The_D dog_N is_A sitting_V by_I the_D door_N .', tr: 'Собака сидит у двери.' },
        { s: 'Look_V ! A_D cat_N is_A lying_V on_I our_P car_N .', tr: 'Смотри! На нашей машине лежит кошка.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Привычка или «сейчас»',
      text: 'Present Simple — как обычно, Continuous — как сейчас или временно. I work in a bank — это моя работа. I’m working from home this week — только на этой неделе. Глаголы know, like, want обычно не бывают в Continuous.',
      examples: [
        { s: 'I_P work_V in_I a_D bank_N .', tr: 'Я работаю в банке.' },
        { s: 'I_P +’m_A working_V from_I home_N this_D week_N .', tr: 'На этой неделе я работаю из дома.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Сейчас_R он_P спит_V .',
      en: 'He_P is_A sleeping_V now_R .',
      note: 'В русском одно настоящее время на «обычно» и на «сейчас». В английском для «прямо сейчас» нужны be + -ing, а для «обычно» — Present Simple: He sleeps eight hours.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I_P reading_V now_R .', right: 'I_P am_A reading_V now_R .', note: 'Нужен be: am / is / are.' },
        { wrong: 'She_P is_A work_V today_R .', right: 'She_P is_A working_V today_R .', note: 'После be — глагол с -ing.' },
        { wrong: 'He_P is_A makeing_V tea_N .', right: 'He_P is_A making_V tea_N .', note: 'Конечная -e пропадает: making.' },
        { wrong: 'He_P is_A siting_V here_R .', right: 'He_P is_A sitting_V here_R .', note: 'Удваиваем согласную: sitting.' },
        { wrong: 'Look_V ! It_P rains_V .', right: 'Look_V ! It_P is_A raining_V .', note: 'Look! — подсказка Continuous.' },
        { wrong: 'Do_A you_P working_V today_R ?', right: 'Are_A you_P working_V today_R ?', note: 'Вопрос: be вперёд, не do.' },
      ],
    },
    { kind: 'tip', text: 'Рядом с -ing должен стоять am, is или are. Нет be — нет Continuous. Видишь now, at the moment, Look! — выбирай be + -ing.' },
  ],
  items: [
    {
      id: 'present-continuous.be-form',
      skill: 'am / is / are перед -ing — по лицу',
      focus: 'present.cont',
      why: 'I — am; he, she, it и одно имя — is; you, we, they и множественное число — are.',
      variants: [
        { s: 'I_P [am_A] waiting_V for_I a_D call_N .', tr: 'Я жду звонка.', options: ['is', 'are'] },
        { s: 'Anna_N [is_A] cooking_V dinner_N now_R .', tr: 'Анна сейчас готовит ужин.', options: ['are', 'am'] },
        { s: 'The_D children_N [are_A] playing_V in_I the_D garden_N .', tr: 'Дети играют в саду.', options: ['is', 'am'] },
      ],
    },
    {
      id: 'present-continuous.ing-form',
      skill: 'После be — глагол с -ing, не основа и не с -s',
      focus: 'present.cont',
      why: 'Continuous = be + глагол с -ing: is talking, are waiting. Ни talks, ни talk после be не ставим.',
      variants: [
        { s: 'Tom_N is_A [talking_V] on_I the_D phone_N .', tr: 'Том разговаривает по телефону.', options: ['talks', 'talk'], accept: ['speaking'] },
        { s: 'We_P are_A [waiting_V] for_I the_D bus_N .', tr: 'Мы ждём автобус.', options: ['wait', 'waits'] },
        { s: 'My_P sister_N is_A [reading_V] a_D magazine_N .', tr: 'Моя сестра читает журнал.', options: ['reads', 'read'] },
      ],
    },
    {
      id: 'present-continuous.required-be',
      mode: 'choice',
      skill: 'Без be Continuous не бывает: She is working',
      focus: 'present.cont',
      why: 'Для Continuous нужны обе части: be + глагол с -ing. Одного -ing мало, одного be — тоже.',
      variants: [
        { q: 'Какой вариант верный?', answer: 'She is working now.', options: ['She working now.', 'She is work now.'] },
        { q: 'Какой вариант верный?', answer: 'They are watching TV.', options: ['They watching TV.', 'They are watch TV.'] },
        { q: 'Какой вариант верный?', answer: 'I am making coffee.', options: ['I making coffee.', 'I am make coffee.'] },
      ],
    },
    {
      id: 'present-continuous.spell-e',
      skill: 'Конечная -e пропадает: make → making',
      focus: 'present.cont',
      why: 'Если глагол кончается на -e, она пропадает перед -ing: make → making, write → writing, come → coming.',
      variants: [
        { s: 'She_P is_A [making_V] a_D cake_N .', tr: 'Она печёт торт.', options: ['makeing', 'make'] },
        { s: 'We_P are_A [writing_V] an_D email_N .', tr: 'Мы пишем письмо.', options: ['writeing', 'writting'] },
        { s: 'Look_V ! The_D bus_N is_A [coming_V] .', tr: 'Смотри! Автобус подъезжает.', options: ['comeing', 'come'] },
      ],
    },
    {
      id: 'present-continuous.spell-double',
      skill: 'Удвоение согласной: sit → sitting, run → running',
      focus: 'present.cont',
      why: 'Короткий глагол с одной гласной и одной согласной в конце удваивает согласную: sit → sitting, run → running, stop → stopping.',
      variants: [
        { s: 'The_D cat_N is_A [sitting_V] on_I the_D sofa_N .', tr: 'Кошка сидит на диване.', options: ['siting', 'sit'] },
        { s: 'He_P is_A [running_V] in_I the_D park_N .', tr: 'Он бегает в парке.', options: ['runing', 'run'], accept: ['jogging'] },
        { s: 'The_D bus_N is_A [stopping_V] at_I the_D corner_N .', tr: 'Автобус останавливается на углу.', options: ['stoping', 'stop'] },
      ],
    },
    {
      id: 'present-continuous.spell-ie',
      skill: 'lie → lying, tie → tying',
      focus: 'present.cont',
      why: 'Глаголы на -ie меняют ie на y: lie → lying, tie → tying. Форм lieing и tieing нет.',
      variants: [
        { s: 'Max_N is_A [lying_V] on_I the_D grass_N .', tr: 'Макс лежит на траве.', options: ['lieing', 'lie'] },
        { s: 'Why_R are_A you_P [lying_V] on_I the_D floor_N ?', tr: 'Почему ты лежишь на полу?', options: ['lieing', 'lie'] },
        { s: 'She_P is_A [tying_V] her_P shoes_N .', tr: 'Она завязывает шнурки.', options: ['tieing', 'tie'] },
      ],
    },
    {
      id: 'present-continuous.now',
      skill: 'now, at the moment, Look! — подсказки Continuous',
      focus: 'present.cont',
      why: 'Look!, Listen!, now, at the moment говорят о том, что идёт прямо сейчас. Это be + -ing, а не Present Simple.',
      variants: [
        { s: 'Look_V ! It_P [is~snowing_V] .', tr: 'Смотри! Идёт снег.', options: ['snows', 'snow'] },
        { s: 'Anna_N [is~talking_V] to_I a_D customer_N at_I the_D moment_N .', tr: 'Сейчас Анна разговаривает с клиентом.', options: ['talks', 'talk'], accept: ['is speaking'] },
        { s: 'Listen_V ! Someone_P [is~knocking_V] at_I the_D door_N .', tr: 'Слушай! Кто-то стучит в дверь.', options: ['knocks', 'knock'] },
      ],
    },
    {
      id: 'present-continuous.vs-habit',
      skill: 'Every day, usually — Present Simple, а не Continuous',
      focus: 'present.simple',
      why: 'Повторяющееся (every day, usually) — Present Simple. Continuous — только то, что идёт сейчас или временно.',
      variants: [
        { s: 'I_P usually_R [walk_V] to_I work_N , but_C today_R I_P +’m_A taking_V the_D bus_N .', tr: 'Обычно я хожу на работу пешком, но сегодня еду на автобусе.', options: ['am walking', 'walking'] },
        { s: 'Anna_N [drinks_V] tea_N every_D morning_N , but_C now_R she_P +’s_A drinking_V coffee_N .', tr: 'Каждое утро Анна пьёт чай, но сейчас она пьёт кофе.', options: ['is drinking', 'drink'] },
        { s: 'My_P dad_N [cooks_V] dinner_N every_D Sunday_N .', tr: 'Каждое воскресенье папа готовит ужин.', options: ['is cooking', 'cooking'] },
      ],
    },
    {
      id: 'present-continuous.temporary',
      skill: 'Временно, в эти дни: this week, at the moment',
      focus: 'present.cont',
      why: 'То, что идёт в эти дни и скоро изменится (this week, this month, at the moment), — Continuous.',
      variants: [
        { s: 'My_P brother_N [is~staying_V] with_I us_P this_D week_N .', tr: 'На этой неделе мой брат живёт у нас.', options: ['stays', 'stay'] },
        { s: 'Kate_N [is~working_V] from_I home_N this_D month_N .', tr: 'В этом месяце Кейт работает из дома.', options: ['works', 'work'] },
        { s: 'Tom_N [is~learning_V] to_X drive_V at_I the_D moment_N .', tr: 'Сейчас Том учится водить машину.', options: ['learns', 'learn'] },
      ],
    },
    {
      id: 'present-continuous.getting',
      skill: 'Перемены: It is getting dark, getting better',
      focus: 'present.cont',
      why: 'Continuous с get + прилагательное показывает, что что-то постепенно меняется: is getting dark.',
      variants: [
        { s: 'It_P is_A [getting_V] dark_J now_R .', tr: 'Уже темнеет.', options: ['get', 'gets'] },
        { s: 'The_D room_N is_A [getting_V] cold_J .', tr: 'В комнате становится холодно.', options: ['get', 'gets'], accept: ['becoming'] },
        { s: 'My_P English_N is_A [getting_V] better_J .', tr: 'Мой английский становится лучше.', options: ['get', 'gets'], accept: ['becoming'] },
      ],
    },
    {
      id: 'present-continuous.question',
      skill: 'Вопрос: Am / Is / Are вперёд, глагол с -ing остаётся',
      focus: 'present.cont',
      why: 'Вопрос — перестановкой be и подлежащего: You are working → Are you working? Без do.',
      variants: [
        { s: '[Are_A] you_P watching_V this_D film_N ?', tr: 'Ты смотришь этот фильм?', options: ['Do', 'Is'] },
        { s: '[Is_A] it_P raining_V ?', tr: 'Идёт дождь?', options: ['Does', 'Are'] },
        { s: '[Are_A] your_P parents_N enjoying_V the_D trip_N ?', tr: 'Твоим родителям нравится поездка?', options: ['Do', 'Is'] },
      ],
    },
    {
      id: 'present-continuous.neg',
      skill: 'Отрицание: isn’t / aren’t / am not + -ing',
      focus: 'present.cont',
      why: 'not (или isn’t, aren’t) ставится после be: She isn’t working. I am not working. Без don’t.',
      variants: [
        { s: 'My_P boss_N [isn’t_A] wearing_V a_D tie_N today_R .', tr: 'Сегодня мой начальник не в галстуке.', options: ['doesn’t', 'aren’t'] },
        { s: 'We_P [aren’t_A] waiting_V for_I Tom_N .', tr: 'Мы не ждём Тома.', options: ['isn’t', 'don’t'] },
        { s: 'I_P am_A [not_X] using_V the_D car_N today_R .', tr: 'Сегодня я не пользуюсь машиной.', options: ['no', 'don’t'] },
      ],
    },
    {
      id: 'present-continuous.wh',
      skill: 'What / Where / Why + am / is / are + -ing',
      focus: 'present.cont',
      why: 'Вопросительное слово идёт перед be: What are you doing? Where is Tom going?',
      variants: [
        { s: 'What_P [are_A] you_P doing_V ?', tr: 'Что ты делаешь?', options: ['do', 'is'] },
        { s: 'Where_R [is_A] Tom_N going_V ?', tr: 'Куда идёт Том?', options: ['does', 'are'] },
        { s: 'Why_R [are_A] they_P waiting_V outside_R ?', tr: 'Почему они ждут на улице?', options: ['do', 'is'] },
      ],
    },
    {
      id: 'present-continuous.order',
      mode: 'order',
      skill: 'Собрать: подлежащее + be + глагол с -ing',
      focus: 'present.cont',
      why: 'Порядок: кто — am / is / are — глагол с -ing — остальное.',
      variants: [
        { s: 'We_P are_A having_V a_D great_J time_N .', tr: 'Мы отлично проводим время.', options: ['have', 'is'] },
        { s: 'My_P sister_N is_A studying_V in_I the_D library_N .', tr: 'Моя сестра занимается в библиотеке.', options: ['study', 'are'] },
        { s: 'The_D children_N aren’t_A sleeping_V .', tr: 'Дети не спят.', options: ['isn’t', 'sleep'] },
      ],
    },
    {
      id: 'present-continuous.order-q',
      mode: 'order',
      skill: 'Собрать вопрос: (слово) + be + подлежащее + -ing',
      focus: 'present.cont',
      why: 'Порядок: вопросительное слово — be — кто — глагол с -ing.',
      variants: [
        { s: 'What_P are_A you_P reading_V ?', tr: 'Что ты читаешь?', options: ['do', 'is'] },
        { s: 'Is_A Anna_N working_V from_I home_N today_R ?', tr: 'Анна сегодня работает из дома?', options: ['does', 'are'] },
        { s: 'Are_A you_P listening_V to_I me_P ?', tr: 'Ты меня слушаешь?', options: ['do', 'is'] },
      ],
    },
    {
      id: 'present-continuous.pick-aux',
      mode: 'pick',
      skill: 'Найти be в Continuous: он вспомогательный',
      focus: 'present.cont',
      why: 'В Continuous am / is / are — вспомогательный глагол (он несёт лицо), а смысл у глагола с -ing.',
      variants: [
        { s: 'Tom_N {is_A} washing_V the_D car_N .', tr: 'Том моет машину.', q: 'Найди вспомогательный глагол', model: 'She_P {is_A} sleeping_V .' },
        { s: 'The_D girls_N {are_A} singing_V in_I the_D kitchen_N .', tr: 'Девочки поют на кухне.', q: 'Найди вспомогательный глагол', model: 'We_P {are_A} waiting_V .' },
        { s: 'I_P {am_A} reading_V a_D book_N .', tr: 'Я читаю книгу.', q: 'Найди вспомогательный глагол', model: 'It_P {is_A} raining_V .' },
      ],
    },
  ],
} satisfies TopicBody
