import type { TopicBody } from '../types'

export default {
  summary: 'Союз — стрелка смысла между двумя мыслями: and (плюс), but (наоборот), or (выбор), so (результат), because (причина), although (вопреки).',
  ref: [
    { kind: 'visual', visual: { id: 'conj-links', focus: 'because' }, caption: 'Каждый союз — связка между двумя блоками, у каждой своя стрелка смысла' },
    {
      kind: 'rule',
      title: 'and, but, or',
      text: 'and добавляет, but противопоставляет, or даёт выбор. Они стоят между двумя словами или двумя предложениями: I like tea but I don’t like coffee.',
      examples: [
        { s: 'I_P bought_V bread_N and_C milk_N .', tr: 'Я купил хлеб и молоко.' },
        { s: 'The_D flat_N is_V small_J but_C cosy_J .', tr: 'Квартира маленькая, но уютная.' },
        { s: 'Would_A you_P like_V tea_N or_C coffee_N ?', tr: 'Ты будешь чай или кофе?' },
      ],
    },
    {
      kind: 'rule',
      title: 'so и because — стрелки в разные стороны',
      text: 'so — результат: сначала причина, потом следствие («поэтому»). because — причина: сначала результат, потом причина («потому что»). Оба сразу не ставим: либо so, либо because.',
      examples: [
        { s: 'It_P was_A raining_V , so_C we_P stayed_V at_I home_N .', tr: 'Шёл дождь, поэтому мы остались дома.' },
        { s: 'We_P stayed_V at_I home_N because_C it_P was_A raining_V .', tr: 'Мы остались дома, потому что шёл дождь.' },
      ],
    },
    {
      kind: 'rule',
      title: 'although, when, if',
      text: 'although — «хотя», после него полное предложение, и but не нужен. when — «когда», if — «если». Часть с although, when или if может стоять и в начале, и в конце; в начале после неё ставим запятую.',
      examples: [
        { s: 'Although_C it_P was_V cold_J , we_P went_V swimming_V .', tr: 'Хотя было холодно, мы пошли плавать.' },
        { s: 'I_P was_A cooking_V when_C the_D phone_N rang_V .', tr: 'Я готовил, когда зазвонил телефон.' },
        { s: 'Call_V me_P if_C you_P need_V help_N .', tr: 'Позвони мне, если нужна помощь.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Хотя_C было_V холодно_R , мы_P пошли_V плавать_V .',
      en: 'Although_C it_P was_V cold_J , we_P went_V swimming_V .',
      note: 'По-русски часто говорят «хотя… но…». В английском одно из двух: although или but, а вместе не нужны. После although стоит полное предложение с подлежащим и глаголом.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'Although_C it_P was_V cold_J , but_C we_P went_V out_R .', right: 'Although_C it_P was_V cold_J , we_P went_V out_R .', note: 'Although и but вместе не нужны.' },
        { wrong: 'Because_C it_P was_V late_J , so_C we_P left_V .', right: 'It_P was_V late_J , so_C we_P left_V .', note: 'Либо because, либо so.' },
        { wrong: 'Despite_I it_P was_V cold_J , we_P went_V out_R .', right: 'Although_C it_P was_V cold_J , we_P went_V out_R .', note: 'После despite — существительное, после although — предложение.' },
        { wrong: 'We_P stayed_V at_I home_N , so_C it_P was_A raining_V .', right: 'We_P stayed_V at_I home_N because_C it_P was_A raining_V .', note: 'Причину вводит because, а не so.' },
      ],
    },
    { kind: 'tip', text: 'so или because? Подставь «поэтому» — тогда so. Подставь «потому что» — тогда because.' },
  ],
  items: [
    {
      id: 'conjunctions.and',
      skill: 'and — добавить ещё одно',
      focus: 'and',
      why: 'And соединяет два слова или две мысли, которые идут вместе: рубашка и галстук.',
      variants: [
        { s: 'I_P bought_V a_D shirt_N [and_C] a_D tie_N .', tr: 'Я купил рубашку и галстук.', options: ['but', 'so'] },
        { s: 'She_P is_V clever_J [and_C] funny_J .', tr: 'Она умная и весёлая.', options: ['so', 'because'] },
        { s: 'We_P watched_V a_D film_N [and_C] ate_V pizza_N .', tr: 'Мы посмотрели фильм и поели пиццу.', options: ['so', 'because'] },
      ],
    },
    {
      id: 'conjunctions.but',
      skill: 'but — противопоставить, «но»',
      focus: 'but',
      why: 'But показывает, что вторая часть идёт против ожидания: отель старый, но чистый.',
      variants: [
        { s: 'The_D hotel_N was_V old_J [but_C] very_R clean_J .', tr: 'Отель был старый, но очень чистый.', options: ['or', 'so'] },
        { s: 'I_P like_V the_D job_N , [but_C] the_D salary_N is_V low_J .', tr: 'Мне нравится работа, но зарплата низкая.', options: ['so', 'or'] },
        { s: 'She_P studies_V hard_R , [but_C] her_P marks_N are_V poor_J .', tr: 'Она усердно учится, но оценки у неё плохие.', options: ['or', 'so'] },
      ],
    },
    {
      id: 'conjunctions.or',
      skill: 'or — выбор или «а то»',
      focus: 'or',
      why: 'Or даёт выбор: паста или рис. После приказа or значит «а то», «иначе».',
      variants: [
        { s: 'Do_A you_P want_V pasta_N [or_C] rice_N ?', tr: 'Ты будешь пасту или рис?', options: ['and', 'but'] },
        { s: 'We_P can_A walk_V [or_C] take_V the_D bus_N .', tr: 'Мы можем пойти пешком или поехать на автобусе.', options: ['so', 'but'] },
        { s: 'Hurry_V up_R , [or_C] we_P will_A miss_V the_D train_N .', tr: 'Поторопись, а то мы опоздаем на поезд.', options: ['and', 'but'] },
      ],
    },
    {
      id: 'conjunctions.so',
      skill: 'so — результат, «поэтому»',
      focus: 'so',
      why: 'So идёт после причины и вводит результат: шёл дождь, поэтому мы остались дома.',
      variants: [
        { s: 'The_D shop_N was_V closed_J , [so_C] we_P went_V home_R .', tr: 'Магазин был закрыт, поэтому мы пошли домой.', options: ['because', 'but'] },
        { s: 'I_P was_V hungry_J , [so_C] I_P made_V a_D sandwich_N .', tr: 'Я проголодался, поэтому сделал бутерброд.', options: ['because', 'although'] },
        { s: 'My_P phone_N was_V dead_J , [so_C] I_P couldn’t_A call_V you_P .', tr: 'Мой телефон сел, поэтому я не смог тебе позвонить.', options: ['because', 'although'] },
      ],
    },
    {
      id: 'conjunctions.because',
      skill: 'because — причина, «потому что»',
      focus: 'because',
      why: 'Because идёт перед причиной: мы остались дома, потому что шёл дождь.',
      variants: [
        { s: 'I_P took_V a_D taxi_N [because_C] I_P was_V late_J .', tr: 'Я взял такси, потому что опаздывал.', options: ['so', 'but'] },
        { s: 'She_P is_V happy_J [because_C] she_P passed_V her_P exam_N .', tr: 'Она счастлива, потому что сдала экзамен.', options: ['so', 'but'] },
        { s: 'He_P missed_V the_D bus_N [because_C] he_P woke_V up_R late_R .', tr: 'Он не успел на автобус, потому что проспал.', options: ['so', 'although'] },
      ],
    },
    {
      id: 'conjunctions.although',
      skill: 'although — «хотя», дальше целое предложение',
      focus: 'although',
      why: 'Although вводит то, что вопреки ожиданию, и после него полное предложение. Despite здесь не подходит: после него нужно существительное.',
      variants: [
        { s: '[Although_C] the_D food_N was_V cheap_J , it_P was_V very_R good_J .', tr: 'Хотя еда была дешёвая, она была очень вкусная.', options: ['Because', 'Despite'], accept: ['Though'] },
        { s: 'Tom_N went_V to_I work_N [although_C] he_P was_V tired_J .', tr: 'Том пошёл на работу, хотя устал.', options: ['because', 'despite'], accept: ['though'] },
        { s: 'She_P bought_V the_D shoes_N [although_C] they_P were_V expensive_J .', tr: 'Она купила туфли, хотя они были дорогие.', options: ['because', 'so'], accept: ['though'] },
      ],
    },
    {
      id: 'conjunctions.when',
      skill: 'when — «когда», время действия',
      focus: 'when',
      why: 'When вводит время: что происходило в тот момент. Для условия («если») нужен if.',
      variants: [
        { s: 'I_P was_A reading_V [when_C] Anna_N called_V .', tr: 'Я читал, когда позвонила Анна.', options: ['if', 'so'] },
        { s: 'Tom_N was_A sleeping_V [when_C] I_P arrived_V .', tr: 'Том спал, когда я приехал.', options: ['if', 'although'] },
        { s: '[When_C] I_P was_V ten_M , we_P moved_V to_I Bristol_N .', tr: 'Когда мне было десять, мы переехали в Бристоль.', options: ['If', 'So'] },
      ],
    },
    {
      id: 'conjunctions.if',
      skill: 'if — «если», условие',
      focus: 'if',
      why: 'If вводит условие: при каком условии что-то случится. Часть с if может стоять в начале или в конце.',
      variants: [
        { s: '[If_C] it_P rains_V tomorrow_R , we_P will_A stay_V at_I home_N .', tr: 'Если завтра будет дождь, мы останемся дома.', options: ['Although', 'Because'] },
        { s: 'I_P will_A help_V you_P [if_C] you_P ask_V me_P .', tr: 'Я помогу тебе, если ты меня попросишь.', options: ['but', 'although'] },
        { s: 'We_P can_A meet_V tomorrow_R [if_C] you_P are_V free_J .', tr: 'Мы можем встретиться завтра, если ты свободен.', options: ['but', 'although'] },
      ],
    },
    {
      id: 'conjunctions.combine-but',
      mode: 'order',
      skill: 'Склеить две фразы через but',
      focus: 'but',
      why: 'Вторая мысль идёт против первой — склеиваем через but.',
      variants: [
        {
          from: ['I_P like_V this_D jacket_N .', 'It_P is_V too_R expensive_J .'],
          s: 'I_P like_V this_D jacket_N , but_C it_P is_V too_R expensive_J .',
          tr: 'Мне нравится эта куртка, но она слишком дорогая.',
          options: ['so', 'or'],
        },
        {
          from: ['Kate_N works_V hard_R .', 'She_P doesn’t_A earn_V much_R .'],
          s: 'Kate_N works_V hard_R , but_C she_P doesn’t_A earn_V much_R .',
          tr: 'Кейт усердно работает, но зарабатывает немного.',
          options: ['so', 'or'],
        },
        {
          from: ['Tom_N is_V very_R tired_J .', 'He_P can’t_A sleep_V .'],
          s: 'Tom_N is_V very_R tired_J , but_C he_P can’t_A sleep_V .',
          tr: 'Том очень устал, но не может уснуть.',
          options: ['so', 'or'],
        },
      ],
    },
    {
      id: 'conjunctions.combine-so',
      mode: 'order',
      skill: 'Склеить две фразы через so: причина, потом результат',
      focus: 'so',
      why: 'Сначала причина, потом so и результат. Если сначала результат, нужен because.',
      variants: [
        {
          from: ['Anna_N was_V tired_J .', 'She_P went_V to_I bed_N early_R .'],
          s: 'Anna_N was_V tired_J , so_C she_P went_V to_I bed_N early_R .',
          tr: 'Анна устала, поэтому рано легла спать.',
          options: ['but', 'or'],
        },
        {
          from: ['Max_N forgot_V his_P umbrella_N .', 'He_P got_V wet_J .'],
          s: 'Max_N forgot_V his_P umbrella_N , so_C he_P got_V wet_J .',
          tr: 'Макс забыл зонт, поэтому промок.',
          options: ['but', 'or'],
        },
        {
          from: ['It_P was_V cold_J .', 'We_P wore_V our_P coats_N .'],
          s: 'It_P was_V cold_J , so_C we_P wore_V our_P coats_N .',
          tr: 'Было холодно, поэтому мы надели пальто.',
          options: ['but', 'or'],
        },
      ],
    },
    {
      id: 'conjunctions.combine-because',
      mode: 'order',
      skill: 'Склеить две фразы через because: результат, потом причина',
      focus: 'because',
      why: 'Сначала результат, потом because и причина. Фразу с because можно поставить и в начало.',
      variants: [
        {
          from: ['Lucy_N takes_V the_D train_N .', 'It_P is_V cheaper_J .'],
          s: 'Lucy_N takes_V the_D train_N because_C it_P is_V cheaper_J .',
          tr: 'Люси ездит на поезде, потому что так дешевле.',
          options: ['but', 'or'],
          accept: ['because it is cheaper Lucy takes the train'],
        },
        {
          from: ['Max_N is_A learning_V French_N .', 'He_P wants_V to_X work_V in_I Paris_N .'],
          s: 'Max_N is_A learning_V French_N because_C he_P wants_V to_X work_V in_I Paris_N .',
          tr: 'Макс учит французский, потому что хочет работать в Париже.',
          options: ['but', 'or'],
          accept: ['because he wants to work in Paris Max is learning French'],
        },
        {
          from: ['I_P cancelled_V the_D meeting_N .', 'My_P boss_N was_V away_R .'],
          s: 'I_P cancelled_V the_D meeting_N because_C my_P boss_N was_V away_R .',
          tr: 'Я отменил встречу, потому что моего начальника не было.',
          options: ['but', 'or'],
          accept: ['because my boss was away I cancelled the meeting'],
        },
      ],
    },
    {
      id: 'conjunctions.combine-although',
      mode: 'order',
      skill: 'Склеить две фразы через although: «хотя»',
      focus: 'although',
      why: 'Although вводит то, что вопреки ожиданию. Фразу с although можно поставить и в начало.',
      variants: [
        {
          from: ['Kate_N walked_V to_I work_N .', 'It_P was_A raining_V .'],
          s: 'Kate_N walked_V to_I work_N although_C it_P was_A raining_V .',
          tr: 'Кейт пошла на работу пешком, хотя шёл дождь.',
          options: ['because', 'so'],
          accept: ['although it was raining Kate walked to work'],
        },
        {
          from: ['I_P enjoyed_V the_D film_N .', 'It_P was_V very_R long_J .'],
          s: 'I_P enjoyed_V the_D film_N although_C it_P was_V very_R long_J .',
          tr: 'Мне понравился фильм, хотя он был очень длинный.',
          options: ['because', 'so'],
          accept: ['although it was very long I enjoyed the film'],
        },
        {
          from: ['Tom_N plays_V football_N .', 'He_P is_V fifty_M .'],
          s: 'Tom_N plays_V football_N although_C he_P is_V fifty_M .',
          tr: 'Том играет в футбол, хотя ему пятьдесят.',
          options: ['because', 'so'],
          accept: ['although he is fifty Tom plays football'],
        },
      ],
    },
  ],
} satisfies TopicBody
