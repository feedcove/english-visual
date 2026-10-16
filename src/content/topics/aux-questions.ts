import type { TopicBody } from '../types'

export default {
  summary: 'Вопрос строится перестановкой: вспомогательный глагол (be, can, will, have или do / does / did) идёт перед подлежащим.',
  ref: [
    { kind: 'visual', visual: { id: 'aux-formula', focus: 'question' }, caption: 'Третья строка: вспомогательный глагол выходит вперёд, подлежащее и глагол остаются на местах' },
    {
      kind: 'rule',
      title: 'Вспомогательный — перед подлежащим',
      text: 'В утверждении: You can swim. В вопросе вспомогательный глагол (be, can, will, have) выходит вперёд: Can you swim? Одной интонацией вопрос не строим — нужна перестановка.',
      examples: [
        { s: 'Can_A you_P swim_V ?', tr: 'Ты умеешь плавать?' },
        { s: 'Are_V you_P ready_J ?', tr: 'Ты готов?' },
        { s: 'Have_A you_P seen_V this_D film_N ?', tr: 'Ты видел этот фильм?' },
      ],
    },
    {
      kind: 'rule',
      title: 'Нет вспомогательного — do / does / did',
      text: 'В Present Simple и Past Simple вспомогательного нет, поэтому ставим do, does или did. do — для I, you, we, they; does — для he, she, it; did — для прошлого. Глагол после них без окончаний.',
      examples: [
        { s: 'Do_A you_P like_V jazz_N ?', tr: 'Ты любишь джаз?' },
        { s: 'Does_A she_P work_V here_R ?', tr: 'Она здесь работает?' },
        { s: 'Did_A they_P arrive_V on_I time_N ?', tr: 'Они приехали вовремя?' },
      ],
    },
    {
      kind: 'rule',
      title: 'Вопросительное слово — в самое начало',
      text: 'Who, what, where, when, why, how ставим первым словом. Дальше обычный порядок вопроса: вспомогательный — подлежащее — глагол.',
      examples: [
        { s: 'Where_R does_A she_P work_V ?', tr: 'Где она работает?' },
        { s: 'What_D time_N does_A the_D film_N start_V ?', tr: 'Во сколько начинается фильм?' },
        { s: 'Why_R did_A you_P leave_V early_R ?', tr: 'Почему ты ушёл рано?' },
      ],
    },
    {
      kind: 'rule',
      title: 'Who — подлежащее: без do. Короткий ответ',
      text: 'Если who или what само подлежащее, порядок как в утверждении, без do: Who lives here? What happened? Короткий ответ повторяет вспомогательный: Do you like tea? — Yes, I do. Can he swim? — No, he can’t.',
      examples: [
        { s: 'Who_P lives_V here_R ?', tr: 'Кто здесь живёт?' },
        { s: 'Do_A you_P like_V tea_N ? — Yes, I_P do_A .', tr: 'Ты любишь чай? — Да.' },
        { s: 'Can_A he_P swim_V ? — No, he_P can’t_A .', tr: 'Он умеет плавать? — Нет.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Ты_P любишь_V чай_N ?',
      en: 'Do_A you_P like_V tea_N ?',
      note: 'По-русски вопрос делает интонация, порядок слов тот же. В английском нужна перестановка, а если вспомогательного нет, берём do / does / did — в русском для них пары нет.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'Like_V you_P tea_N ?', right: 'Do_A you_P like_V tea_N ?', note: 'Нужен do, а глагол остаётся на месте.' },
        { wrong: 'Does_A she_P works_V here_R ?', right: 'Does_A she_P work_V here_R ?', note: 'После does глагол без -s.' },
        { wrong: 'Where_R she_P works_V ?', right: 'Where_R does_A she_P work_V ?', note: 'После where нужен вспомогательный.' },
        { wrong: 'Did_A you_P saw_V Tom_N ?', right: 'Did_A you_P see_V Tom_N ?', note: 'После did — первая форма глагола.' },
        { wrong: 'Who_P does_A live_V here_R ?', right: 'Who_P lives_V here_R ?', note: 'Who как подлежащее — без does.' },
      ],
    },
  ],
  items: [
    {
      id: 'aux-questions.be',
      skill: 'С be вопрос — перестановкой: Are you…? Is she…?',
      focus: 'question',
      why: 'С be вопрос делаем перестановкой: be перед подлежащим. Do здесь не нужен.',
      variants: [
        { s: '[Are_V] you_P tired_J ?', tr: 'Ты устал?', options: ['Do', 'Is'] },
        { s: '[Is_V] Anna_N at_I home_N ?', tr: 'Анна дома?', options: ['Does', 'Are'] },
        { s: '[Are_V] your_P parents_N at_I work_N ?', tr: 'Твои родители на работе?', options: ['Do', 'Is'] },
      ],
    },
    {
      id: 'aux-questions.do',
      skill: 'Do — вопрос для I, you, we, they',
      focus: 'do-support',
      why: 'В Present Simple для I, you, we, they вопрос начинается с do.',
      variants: [
        { s: '[Do_A] you_P work_V on_I Saturdays_N ?', tr: 'Ты работаешь по субботам?', options: ['Does', 'Are'] },
        { s: '[Do_A] they_P live_V near_I here_R ?', tr: 'Они живут недалеко отсюда?', options: ['Does', 'Are'] },
        { s: '[Do_A] we_P need_V a_D visa_N for_I Turkey_N ?', tr: 'Нам нужна виза в Турцию?', options: ['Does', 'Are'] },
      ],
    },
    {
      id: 'aux-questions.does',
      skill: 'Does — вопрос для he, she, it',
      focus: 'do-support',
      why: 'Для he, she, it и одного предмета вопрос начинается с does.',
      variants: [
        { s: '[Does_A] she_P speak_V French_N ?', tr: 'Она говорит по-французски?', options: ['Do', 'Is'] },
        { s: '[Does_A] your_P brother_N play_V football_N ?', tr: 'Твой брат играет в футбол?', options: ['Do', 'Is'] },
        { s: '[Does_A] this_D bus_N go_V to_I the_D airport_N ?', tr: 'Этот автобус едет в аэропорт?', options: ['Do', 'Is'] },
      ],
    },
    {
      id: 'aux-questions.v1-after-does',
      skill: 'После do / does глагол без -s',
      focus: 'do-support',
      why: 'Окончание -s берёт на себя does, поэтому смысловой глагол остаётся в первой форме.',
      variants: [
        { s: 'Does_A he_P [work_V] on_I Sundays_N ?', tr: 'Он работает по воскресеньям?', options: ['works', 'working'] },
        { s: 'Does_A Kate_N [live_V] near_I the_D station_N ?', tr: 'Кейт живёт рядом со станцией?', options: ['lives', 'living'] },
        { s: 'Does_A your_P son_N [play_V] the_D guitar_N ?', tr: 'Твой сын играет на гитаре?', options: ['plays', 'playing'] },
      ],
    },
    {
      id: 'aux-questions.did',
      skill: 'Did — вопрос о прошлом',
      focus: 'do-support',
      why: 'Для прошлого в вопросе нужен did, для всех лиц одинаково.',
      variants: [
        { s: '[Did_A] you_P call_V Tom_N yesterday_R ?', tr: 'Ты вчера звонил Тому?', options: ['Do', 'Were'] },
        { s: '[Did_A] the_D train_N arrive_V on_I time_N this_D morning_N ?', tr: 'Поезд сегодня утром пришёл вовремя?', options: ['Do', 'Was'] },
        { s: '[Did_A] Anna_N finish_V the_D report_N on_I Friday_N ?', tr: 'Анна закончила отчёт в пятницу?', options: ['Do', 'Was'] },
      ],
    },
    {
      id: 'aux-questions.v1-after-did',
      skill: 'После did глагол в первой форме: Did you see…?',
      focus: 'do-support',
      why: 'Прошедшее время уже показывает did, поэтому глагол остаётся в первой форме: buy, а не bought.',
      variants: [
        { s: 'Did_A she_P [buy_V] a_D new_J phone_N ?', tr: 'Она купила новый телефон?', options: ['bought', 'buys'] },
        { s: 'Did_A they_P [win_V] the_D match_N ?', tr: 'Они выиграли матч?', options: ['won', 'wins'] },
        { s: 'Did_A you_P [send_V] the_D email_N ?', tr: 'Ты отправил письмо?', options: ['sent', 'sending'] },
      ],
    },
    {
      id: 'aux-questions.modal',
      skill: 'can, will, should сами идут вперёд, do не нужен',
      focus: 'question',
      why: 'Модальный глагол сам выходит перед подлежащим. Ни do, ни be рядом с ним не нужны.',
      variants: [
        { s: '[Will_A] it_P rain_V tomorrow_R ?', tr: 'Завтра будет дождь?', options: ['Is', 'Do'] },
        { s: '[Can_A] your_P sister_N drive_V ?', tr: 'Твоя сестра умеет водить машину?', options: ['Is', 'Do'] },
        { s: '[Should_A] we_P wait_V for_I Max_N ?', tr: 'Нам стоит подождать Макса?', options: ['Are', 'Does'] },
      ],
    },
    {
      id: 'aux-questions.wh-aux',
      skill: 'Wh-слово + do / does / did + подлежащее + глагол',
      focus: 'wh',
      why: 'После вопросительного слова идёт обычный порядок вопроса. Вспомогательный глагол по времени и лицу: does для she, did для прошлого.',
      variants: [
        { s: 'Where_R [does_A] your_P sister_N live_V ?', tr: 'Где живёт твоя сестра?', options: ['do', 'is'] },
        { s: 'How_R often_R [does_A] Tom_N go_V to_I the_D gym_N ?', tr: 'Как часто Том ходит в спортзал?', options: ['do', 'is'] },
        { s: 'When_R [did_A] you_P get_V home_R ?', tr: 'Когда ты вернулся домой?', options: ['do', 'were'] },
      ],
    },
    {
      id: 'aux-questions.wh-word',
      skill: 'Выбрать вопросительное слово: where, when, why, who',
      focus: 'wh',
      why: 'Where — место, when — время, why — причина, who — человек.',
      variants: [
        { s: '[Where_R] do_A you_P live_V ?', tr: 'Где ты живёшь?', options: ['When', 'Who'] },
        { s: '[When_R] does_A the_D shop_N open_V ?', tr: 'Когда открывается магазин?', options: ['Where', 'Why'] },
        { s: '[Why_R] do_A you_P study_V English_N ?', tr: 'Почему ты учишь английский?', options: ['Who', 'When'] },
      ],
    },
    {
      id: 'aux-questions.subject',
      skill: 'Who / What как подлежащее — без do',
      focus: 'wh',
      why: 'Когда спрашиваем о подлежащем, вспомогательный не нужен: порядок как в утверждении, глагол стоит сразу за who.',
      variants: [
        { s: 'Who_P [lives_V] in_I that_D big_J house_N ?', tr: 'Кто живёт в том большом доме?', options: ['live', 'living'] },
        { s: 'What_P [happened_V] to_I your_P car_N ?', tr: 'Что случилось с твоей машиной?', options: ['happen', 'happens'] },
        { s: 'Who_P [called_V] you_P last_J night_N ?', tr: 'Кто звонил тебе вчера вечером?', options: ['call', 'calls'] },
      ],
    },
    {
      id: 'aux-questions.short-answer',
      skill: 'Короткий ответ повторяет вспомогательный: Yes, I do.',
      focus: 'short',
      why: 'В коротком ответе повторяем вспомогательный из вопроса: Do…? → I do, Does…? → he doesn’t, Is…? → it is.',
      variants: [
        { s: 'Do_A you_P drink_V coffee_N ? — Yes, I_P [do_A] .', tr: 'Ты пьёшь кофе? — Да.', options: ['am', 'did'] },
        { s: 'Does_A Tom_N play_V tennis_N ? — No, he_P [doesn’t_A] .', tr: 'Том играет в теннис? — Нет.', options: ['isn’t', 'don’t'] },
        { s: 'Is_V the_D shop_N open_J ? — Yes, it_P [is_V] .', tr: 'Магазин открыт? — Да.', options: ['does', 'has'] },
      ],
    },
    {
      id: 'aux-questions.pick-question',
      mode: 'choice',
      skill: 'Выбрать правильный вопрос из трёх',
      focus: 'question',
      why: 'Нужен вспомогательный перед подлежащим, а смысловой глагол остаётся после подлежащего в первой форме.',
      variants: [
        { q: 'Как сказать: «Ты здесь работаешь?»', answer: 'Do you work here?', options: ['Work you here?', 'Does you work here?'] },
        { q: 'Как сказать: «Где живёт Том?»', answer: 'Where does Tom live?', options: ['Where Tom lives?', 'Where lives Tom?'] },
        { q: 'Как сказать: «Ты видел Анну?»', answer: 'Did you see Anna?', options: ['Did you saw Anna?', 'Saw you Anna?'] },
      ],
    },
    {
      id: 'aux-questions.order-do',
      mode: 'order',
      skill: 'Собрать вопрос: Do / Does + кто + глагол',
      focus: 'do-support',
      why: 'Порядок: do или does, потом подлежащее, потом глагол без окончаний.',
      variants: [
        { s: 'Do_A you_P live_V near_I the_D office_N ?', tr: 'Ты живёшь рядом с офисом?', options: ['does', 'are'] },
        { s: 'Do_A they_P speak_V English_N at_I work_N ?', tr: 'Они говорят по-английски на работе?', options: ['does', 'are'] },
        { s: 'Does_A your_P boss_N drive_V to_I work_N ?', tr: 'Твой начальник ездит на работу на машине?', options: ['do', 'is'] },
      ],
    },
    {
      id: 'aux-questions.order-wh',
      mode: 'order',
      skill: 'Собрать вопрос: Wh-слово + do / does / did + кто + глагол',
      focus: 'wh',
      why: 'Вопросительное слово — первое, дальше вспомогательный, подлежащее и глагол.',
      variants: [
        { s: 'Where_R does_A Kate_N work_V ?', tr: 'Где работает Кейт?', options: ['do', 'is'] },
        { s: 'What_D time_N does_A the_D bank_N close_V ?', tr: 'Во сколько закрывается банк?', options: ['do', 'is'] },
        { s: 'Why_R did_A you_P come_V home_R early_R ?', tr: 'Почему ты пришёл домой рано?', options: ['do', 'were'] },
      ],
    },
    {
      id: 'aux-questions.order-be-modal',
      mode: 'order',
      skill: 'Собрать вопрос с be, can, will',
      focus: 'question',
      why: 'Be и модальные глаголы идут перед подлежащим сами, без do.',
      variants: [
        { s: 'Can_A you_P help_V me_P with_I this_D form_N ?', tr: 'Ты можешь помочь мне с этой анкетой?', options: ['do', 'are'] },
        { s: 'Is_V your_P brother_N a_D teacher_N ?', tr: 'Твой брат учитель?', options: ['does', 'are'] },
        { s: 'Will_A you_P be_V at_I home_N tonight_R ?', tr: 'Ты будешь дома сегодня вечером?', options: ['do', 'are'] },
      ],
    },
    {
      id: 'aux-questions.order-have',
      mode: 'order',
      skill: 'Собрать вопрос с have: Have you…? Has she…?',
      focus: 'question',
      why: 'Have и has здесь вспомогательные: идут перед подлежащим, а за подлежащим — третья форма глагола.',
      variants: [
        { s: 'Have_A you_P read_V this_D book_N ?', tr: 'Ты читал эту книгу?', options: ['has', 'are'] },
        { s: 'Has_A Anna_N called_V you_P yet_R ?', tr: 'Анна тебе уже звонила?', options: ['did', 'does'] },
        { s: 'Have_A you_P ever_R been_V to_I London_N ?', tr: 'Ты когда-нибудь бывал в Лондоне?', options: ['did', 'do'] },
      ],
    },
  ],
} satisfies TopicBody
