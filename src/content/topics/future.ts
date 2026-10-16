import type { TopicBody } from '../types'

export default {
  summary: 'will — решаю сейчас, обещаю, предсказываю. going to — план или видны признаки. Present Continuous — договорились на время.',
  ref: [
    { kind: 'visual', visual: { id: 'future-forms', focus: 'will' }, caption: 'Три способа сказать о будущем: решение сейчас, план и договорённость' },
    {
      kind: 'rule',
      title: 'will: решаю сейчас, обещаю, думаю',
      text: 'will + глагол без to, для всех лиц одинаково (I’ll, she’ll, won’t). Так говорят, когда решение принято прямо в момент речи, когда обещают или предлагают помощь и когда предсказывают (I think…).',
      examples: [
        { s: 'The_D phone_N is_A ringing_V . — I_P +’ll_A get_V it_P !', tr: 'Телефон звонит. — Я возьму!' },
        { s: 'I_P will_A help_V you_P , I_P promise_V .', tr: 'Я помогу тебе, обещаю.' },
        { s: 'I_P think_V it_P will_A rain_V tomorrow_R .', tr: 'Думаю, завтра будет дождь.' },
      ],
    },
    {
      kind: 'rule',
      title: 'going to: план и видимые признаки',
      text: 'am / is / are going to + глагол. Это план, который уже есть в голове, или вывод по тому, что видно сейчас: тучи, бледное лицо, пустой бак.',
      examples: [
        { s: 'I_P +’m_A going~to_A learn_V French_N .', tr: 'Я собираюсь выучить французский.' },
        { s: 'Look_V at_I those_D clouds_N ! It_P +’s_A going~to_A rain_V .', tr: 'Посмотри на тучи! Сейчас пойдёт дождь.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Present Continuous: уже договорились',
      text: 'am / is / are + -ing и время: встреча назначена, билет куплен. Нужен конкретный момент (at six, on Friday), иначе непонятно, что речь о будущем.',
      examples: [
        { s: 'I_P +’m_A meeting_V Tom_N at_I six_M .', tr: 'Я встречаюсь с Томом в шесть.' },
        { s: 'We_P are_A flying_V to_I Rome_N on_I Friday_N .', tr: 'В пятницу мы летим в Рим.' },
      ],
    },
    {
      kind: 'rule',
      title: 'После when, if — Present Simple',
      text: 'О будущем после when, if, as soon as, before ставим Present Simple, не will. will остаётся только в главной части.',
      examples: [
        { s: 'When_C I_P get_V home_R , I_P +’ll_A call_V you_P .', tr: 'Когда я приду домой, я позвоню тебе.' },
        { s: 'If_C it_P rains_V , we_P will_A stay_V at_I home_N .', tr: 'Если пойдёт дождь, мы останемся дома.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Когда_C я_P приду_V домой_R , я_P позвоню_V .',
      en: 'When_C I_P get_V home_R , I_P +’ll_A call_V .',
      note: 'В русском оба глагола стоят в будущем: приду, позвоню. В английском после when стоит Present Simple (get), а will остаётся только в главной части.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'When_C I_P will_A get_V home_R , I_P +’ll_A call_V you_P .', right: 'When_C I_P get_V home_R , I_P +’ll_A call_V you_P .', note: 'После when — Present Simple.' },
        { wrong: 'Look_V ! It_P will_A rain_V .', right: 'Look_V ! It_P +’s_A going~to_A rain_V .', note: 'Признаки уже видны — going to.' },
        { wrong: 'I_P will_A to_X call_V you_P .', right: 'I_P will_A call_V you_P .', note: 'После will — глагол без to.' },
        { wrong: 'I_P don’t_A will_A come_V .', right: 'I_P won’t_A come_V .', note: 'Отрицание — won’t, без don’t.' },
      ],
    },
  ],
  items: [
    {
      id: 'future.will-form',
      skill: 'will + глагол без to и без -s',
      focus: 'will',
      why: 'will одинаков для всех лиц, а после него глагол стоит в начальной форме: she will call, не will calls.',
      variants: [
        { s: 'Anna_N will_A [call_V] you_P tomorrow_R .', tr: 'Анна позвонит тебе завтра.', options: ['calls', 'to call'] },
        { s: 'I_P think_V Tom_N will_A [like_V] this_D gift_N .', tr: 'Думаю, Тому понравится этот подарок.', options: ['likes', 'to like'] },
        { s: 'They_P will_A [be_V] late_J again_R .', tr: 'Они опять опоздают.', options: ['are', 'been'] },
      ],
    },
    {
      id: 'future.will-negative',
      skill: 'Отрицание: won’t + глагол',
      focus: 'will',
      why: 'will not сокращается до won’t. Отрицание только одно: won’t, без don’t.',
      variants: [
        { s: 'I_P [won’t_A] be_V late_J . I_P promise_V .', tr: 'Я не опоздаю. Обещаю.', options: ['don’t', 'not'] },
        { s: 'The_D shop_N [won’t_A] be_V open_J tomorrow_R .', tr: 'Магазин завтра не будет работать.', options: ['doesn’t', 'isn’t'] },
        { s: 'He_P [won’t_A] forget_V your_P birthday_N .', tr: 'Он не забудет про твой день рождения.', options: ['isn’t', 'haven’t'] },
      ],
    },
    {
      id: 'future.will-question',
      skill: 'Вопрос: Will + подлежащее + глагол',
      focus: 'will',
      why: 'В вопросе will идёт перед подлежащим. Do и Does не нужны.',
      variants: [
        { s: '[Will_A] you_P help_V me_P with_I this_D box_N ?', tr: 'Поможешь мне с этой коробкой?', options: ['Are', 'Does'] },
        { s: '[Will_A] it_P rain_V tomorrow_R ?', tr: 'Завтра будет дождь?', options: ['Is', 'Has'] },
        { s: 'When_R [will_A] they_P arrive_V ?', tr: 'Когда они приедут?', options: ['are', 'have'] },
      ],
    },
    {
      id: 'future.will-decision',
      skill: 'will — решение принято прямо сейчас',
      focus: 'will',
      why: 'Решаешь в момент разговора, заранее не думал — will. Так отвечают на новость или просьбу.',
      variants: [
        { s: 'Someone_P is_V at_I the_D door_N . — I_P [will_A] open_V it_P !', tr: 'Кто-то пришёл. — Я открою!', options: ['won’t', 'would'] },
        { s: 'Oh no , we_P have_V no_D milk_N . — I_P [will_A] buy_V some_P now_R .', tr: 'Ой, у нас нет молока. — Я сейчас куплю.', options: ['won’t', 'would'] },
        { s: 'This_D bag_N is_V heavy_J . — I_P [will_A] carry_V it_P .', tr: 'Эта сумка тяжёлая. — Я понесу её.', options: ['won’t', 'would'] },
      ],
    },
    {
      id: 'future.will-promise',
      skill: 'will — обещание и предложение помощи',
      focus: 'will',
      why: 'Обещаем и предлагаем помощь через will: I promise I’ll call. Заранее готового плана тут нет.',
      variants: [
        { s: 'I_P promise_V I_P [will_A] call_V you_P tonight_R .', tr: 'Обещаю, я позвоню тебе сегодня вечером.', options: ['won’t', 'would'] },
        { s: 'Don’t_A worry_V . I_P [will_A] pay_V for_I the_D tickets_N .', tr: 'Не волнуйся. Я заплачу за билеты.', options: ['won’t', 'would'] },
        { s: 'We_P promise_V we_P [will_A] write_V to_I you_P every_D week_N .', tr: 'Мы обещаем, что будем писать тебе каждую неделю.', options: ['won’t', 'would'] },
      ],
    },
    {
      id: 'future.will-prediction',
      skill: 'will — предсказание, мнение: I think…, I’m sure…',
      focus: 'will',
      why: 'После I think, I’m sure, I expect о будущем говорим will. Это мнение, а не факт из того, что видно сейчас.',
      variants: [
        { s: 'I_P think_V it_P [will_A] be_V sunny_J tomorrow_R .', tr: 'Думаю, завтра будет солнечно.', options: ['won’t', 'would'] },
        { s: 'Kate_N is_V clever_J . She_P [will_A] pass_V the_D exam_N , I_P +’m_V sure_J .', tr: 'Кейт умная. Она сдаст экзамен, я уверен.', options: ['won’t', 'would'] },
        { s: 'I_P +’m_V sure_J you_P [will_A] love_V the_D new_J flat_N .', tr: 'Уверен, тебе понравится новая квартира.', options: ['won’t', 'shall'] },
      ],
    },
    {
      id: 'future.going-form',
      skill: 'am / is / are going to + глагол: be по лицу',
      focus: 'going-to',
      why: 'Перед going to нужна форма be по подлежащему: I am, she is, we are. Без be фраза не работает.',
      variants: [
        { s: 'I_P [am_A] going~to_A paint_V the_D kitchen_N .', tr: 'Я собираюсь покрасить кухню.', options: ['is', 'are'] },
        { s: 'Anna_N [is_A] going~to_A study_V law_N .', tr: 'Анна собирается изучать право.', options: ['am', 'are'] },
        { s: 'We_P [are_A] going~to_A visit_V my_P parents_N at_I the_D weekend_N .', tr: 'В выходные мы собираемся навестить моих родителей.', options: ['is', 'am'] },
      ],
    },
    {
      id: 'future.going-neg-question',
      skill: 'Вопрос и отрицание: Are you going to…? / isn’t going to',
      focus: 'going-to',
      why: 'Вопрос и отрицание строятся на be: Are you going to…? She isn’t going to… will и do тут лишние.',
      variants: [
        { s: '[Are_A] you_P going~to_A buy_V a_D new_J phone_N ?', tr: 'Ты собираешься купить новый телефон?', options: ['Do', 'Will'] },
        { s: 'Max_N [isn’t_A] going~to_A come_V to_I the_D party_N .', tr: 'Макс не собирается идти на вечеринку.', options: ['doesn’t', 'won’t'] },
        { s: 'What_P [are_A] you_P going~to_A do_V tonight_R ?', tr: 'Что ты собираешься делать сегодня вечером?', options: ['will', 'do'] },
      ],
    },
    {
      id: 'future.going-plan',
      skill: 'going to — план, который уже есть',
      focus: 'going-to',
      why: 'Если решение принято раньше, до разговора, говорим going to. Рядом обычно есть подготовка: купил, накопил, решил.',
      variants: [
        { s: 'I_P have_A already_R decided_V . I_P +’m_A [going~to_A] sell_V my_P car_N .', tr: 'Я уже решил. Я собираюсь продать машину.', options: ['will', 'go to'] },
        { s: 'We_P have_A bought_V the_D paint_N . We_P are_A [going~to_A] paint_V the_D hall_N tomorrow_R .', tr: 'Мы купили краску. Завтра мы собираемся красить прихожую.', options: ['will', 'go to'] },
        { s: 'Tom_N has_A saved_V some_D money_N . He_P is_A [going~to_A] buy_V a_D bike_N .', tr: 'Том накопил денег. Он собирается купить велосипед.', options: ['will', 'go to'] },
      ],
    },
    {
      id: 'future.going-evidence',
      skill: 'going to — признаки видны уже сейчас',
      focus: 'going-to',
      why: 'Мы видим причину прямо сейчас: небо, лицо, кружка на краю стола. Поэтому going to: «вот-вот случится».',
      variants: [
        { s: 'Look_V at_I the_D sky_N ! It_P +’s_A [going~to_A] snow_V .', tr: 'Посмотри на небо! Сейчас пойдёт снег.', options: ['will', 'go to'] },
        { s: 'Careful_J ! You_P +’re_A [going~to_A] fall_V !', tr: 'Осторожно! Ты сейчас упадёшь!', options: ['will', 'go to'] },
        { s: 'Tom_N is_V very_R tired_J . I_P think_V he_P +’s_A [going~to_A] fall_V asleep_J .', tr: 'Том очень устал. Кажется, он сейчас уснёт.', options: ['will', 'go to'] },
      ],
    },
    {
      id: 'future.pres-cont',
      skill: 'Present Continuous + время: договорённость',
      focus: 'pres-cont',
      why: 'Встреча или поездка уже назначена, время названо: am meeting, are flying. Это am / is / are + -ing.',
      variants: [
        { s: 'I_P +’m_A [having_V] lunch_N with_I Anna_N at_I one_M .', tr: 'В час я обедаю с Анной.', options: ['have', 'has'] },
        { s: 'We_P are_A [flying_V] to_I Dublin_N on_I Friday_N .', tr: 'В пятницу мы летим в Дублин.', options: ['fly', 'flies'] },
        { s: 'Tom_N is_A [starting_V] his_P new_J job_N on_I Monday_N .', tr: 'Том выходит на новую работу в понедельник.', options: ['start', 'starts'] },
      ],
    },
    {
      id: 'future.choice-form',
      mode: 'choice',
      skill: 'Какая форма: решение сейчас, план или признаки',
      focus: 'going-to',
      why: 'will — решаю сейчас. going to — план или признаки. Present Continuous — договорились на время.',
      variants: [
        { s: 'The_D phone_N is_A ringing_V . — I_P {will_A} answer_V it_P !', q: 'Почему здесь will?', answer: 'Решаю прямо сейчас', options: ['Давно спланировано', 'Признаки уже видны'] },
        { s: 'Hurry_V up_R ! We_P +’re_A {going~to_A} miss_V the_D bus_N .', q: 'Почему здесь going to?', answer: 'Признаки уже видны', options: ['Решаю прямо сейчас', 'Договорились на время'] },
        { s: 'We_P +’re_A {having_V} dinner_N with_I Kate_N on_I Saturday_N .', q: 'Почему здесь Present Continuous?', answer: 'Договорились на конкретное время', options: ['Решаю прямо сейчас', 'Просто предсказание'] },
        { s: 'I_P have_A booked_V a_D course_N . I_P +’m_A {going~to_A} learn_V Spanish_N .', q: 'Почему здесь going to?', answer: 'План уже есть', options: ['Решаю прямо сейчас', 'Договорились на время'] },
      ],
    },
    {
      id: 'future.when-present',
      skill: 'После when, if, as soon as — Present Simple',
      focus: 'will',
      why: 'О будущем после when, if, as soon as, before глагол стоит в Present Simple. will здесь не ставим.',
      variants: [
        { s: 'When_C Tom_N [comes_V] back_R , we_P will_A have_V dinner_N .', tr: 'Когда Том вернётся, мы поужинаем.', options: ['will come', 'came'] },
        { s: 'If_C the_D weather_N [is_V] nice_J , we_P will_A go_V to_I the_D beach_N .', tr: 'Если погода будет хорошая, мы поедем на пляж.', options: ['will be', 'was'] },
        { s: 'I_P +’ll_A text_V you_P as~soon~as_C I_P [arrive_V] .', tr: 'Я напишу тебе, как только приеду.', options: ['will arrive', 'arrived'] },
      ],
    },
    {
      id: 'future.when-main',
      skill: 'В главной части — will: If you study, you will pass',
      focus: 'will',
      why: 'Придаточная часть (if, when, before) — Present Simple, а главная часть о будущем — will + глагол.',
      variants: [
        { s: 'If_C you_P study_V hard_R , you_P [will_A] pass_V the_D test_N .', tr: 'Если будешь усердно заниматься, сдашь тест.', options: ['are', 'do'] },
        { s: 'When_C Anna_N gets_V home_R , she_P [will_A] cook_V dinner_N .', tr: 'Когда Анна придёт домой, она приготовит ужин.', options: ['does', 'is'] },
        { s: 'Before_C we_P leave_V , I_P [will_A] lock_V the_D door_N .', tr: 'Перед тем как мы уйдём, я запру дверь.', options: ['am', 'have'] },
      ],
    },
    {
      id: 'future.order',
      mode: 'order',
      skill: 'Собрать: will / going to / won’t + глагол',
      focus: 'will',
      why: 'Подлежащее, потом will (или am / is / are going to), потом глагол в начальной форме.',
      variants: [
        { s: 'I_P will_A call_V you_P tomorrow_R .', tr: 'Я позвоню тебе завтра.', accept: ['tomorrow I will call you'], options: ['to'] },
        { s: 'They_P are_A going~to_A sell_V their_P house_N .', tr: 'Они собираются продать дом.', options: ['will'] },
        { s: 'She_P won’t_A be_V at_I the_D party_N .', tr: 'Её не будет на вечеринке.', options: ['doesn’t'] },
      ],
    },
    {
      id: 'future.graph',
      mode: 'graph',
      skill: 'Граф: will висит на глаголе (aux), won’t тоже',
      focus: 'will',
      why: 'Корень — смысловой глагол в начальной форме. will помогает ему (aux), подлежащее и дополнение висят на нём.',
      variants: [
        { s: 'Tom_N will_A call_V Anna_N .', tr: 'Том позвонит Анне.', graph: '1>3 subj, 2>3 aux, 4>3 obj' },
        { s: 'We_P will_A visit_V the_D museum_N .', tr: 'Мы посетим музей.', graph: '1>3 subj, 2>3 aux, 4>5 attr, 5>3 obj' },
        { s: 'She_P won’t_A buy_V this_D bag_N .', tr: 'Она не купит эту сумку.', graph: '1>3 subj, 2>3 aux, 4>5 attr, 5>3 obj' },
      ],
    },
  ],
} satisfies TopicBody
