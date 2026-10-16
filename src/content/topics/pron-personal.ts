import type { TopicBody } from '../types'

// Эталонная тема: по ней пишутся остальные (docs/authoring.md).

export default {
  summary: 'Перед глаголом — I, he, she, we, they. После глагола и предлога — me, him, her, us, them.',
  ref: [
    { kind: 'visual', visual: { id: 'pron-grid', focus: 'obj' }, caption: 'Два первых столбца сетки: форма зависит от места в предложении' },
    {
      kind: 'rule',
      title: 'Место решает форму',
      text: 'Перед глаголом стоит форма подлежащего: I, he, she, we, they. После глагола и после предлога — форма дополнения: me, him, her, us, them. you и it не меняются.',
      examples: [
        { s: 'I_P like_V him_P .', tr: 'Он мне нравится.' },
        { s: 'He_P likes_V me_P .', tr: 'Я ему нравлюсь.' },
        { s: 'She_P is_V with_I us_P .', tr: 'Она с нами.' },
      ],
    },
    {
      kind: 'rule',
      title: 'it — для вещей',
      text: 'По-русски стол — «он», лампа — «она». В английском у вещей и у большинства животных нет рода: всегда it, а во множественном числе — they.',
      examples: [
        { s: 'Where_R is_V my_P phone_N ? I_P can’t_A find_V it_P .', tr: 'Где мой телефон? Не могу его найти.' },
        { s: 'I_P like_V these_D shoes_N . They_P are_V comfortable_J .', tr: 'Мне нравятся эти туфли. Они удобные.' },
      ],
    },
    {
      kind: 'rule',
      title: 'you — это и «ты», и «вы»',
      text: 'Одно слово на «ты», вежливое «вы» и «вы» для нескольких людей. Глагол всегда как у are: you are, you were.',
      examples: [{ s: 'Are_V you_P ready_J , Mr~Smith_N ?', tr: 'Вы готовы, мистер Смит?' }],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Его_P я_P знаю_V .',
      en: 'I_P know_V him_P .',
      note: 'В русском форма зависит от падежа (его, ему, им), а слова можно переставлять. В английском у местоимения всего две формы, и выбирает их место: перед глаголом — I, после — him.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'Me_P and_C Anna_N went_V home_R .', right: 'Anna_N and_C I_P went_V home_R .', note: 'В подлежащем — I, а себя называют вторым.' },
        { wrong: 'Help_V I_P !', right: 'Help_V me_P !', note: 'После глагола — me.' },
        { wrong: 'This_D is_V my_P new_J car_N . She_P is_V fast_J .', right: 'This_D is_V my_P new_J car_N . It_P is_V fast_J .', note: 'Машина — it.' },
        { wrong: 'Is_V cold_J today_R .', right: 'It_P is_V cold_J today_R .', note: 'Подлежащее обязательно, даже когда по-русски его нет.' },
      ],
    },
    { kind: 'tip', text: 'Проверка: подставь «я» или «меня». Подходит «я» — I, he, she. Подходит «меня, мне, мной» — me, him, her.' },
  ],
  items: [
    {
      id: 'pron-personal.i',
      skill: 'I — подлежащее, перед глаголом',
      focus: 'subj.i',
      why: 'Кто делает действие — I. Даже в паре: Anna and I.',
      variants: [
        { s: '[I_P] work_V in_I a_D bank_N .', tr: 'Я работаю в банке.', options: ['Me', 'My'] },
        { s: 'Anna_N and_C [I_P] are_V old_J friends_N .', tr: 'Мы с Анной давние друзья.', options: ['me', 'my'] },
        { s: 'Yesterday_R [I_P] went_V to_I the_D cinema_N .', tr: 'Вчера я ходил в кино.', options: ['me', 'my'] },
      ],
    },
    {
      id: 'pron-personal.me',
      skill: 'me — после глагола',
      focus: 'obj.i',
      why: 'Действие направлено на меня — me.',
      variants: [
        { s: 'Can_A you_P help_V [me_P] ?', tr: 'Ты можешь мне помочь?', options: ['I', 'my'] },
        { s: 'She_P called_V [me_P] yesterday_R .', tr: 'Она позвонила мне вчера.', options: ['I', 'my'] },
        { s: 'Please_R send_V [me_P] the_D photos_N .', tr: 'Пожалуйста, пришли мне фотографии.', options: ['I', 'mine'] },
      ],
    },
    {
      id: 'pron-personal.he',
      skill: 'he — подлежащее',
      focus: 'subj.he',
      variants: [
        { s: '[He_P] lives_V near_I the_D station_N .', tr: 'Он живёт рядом с вокзалом.', options: ['Him', 'His'] },
        { s: 'Where_R does_A [he_P] work_V ?', tr: 'Где он работает?', options: ['him', 'his'] },
        { s: 'Max_N is_V late_J because_C [he_P] missed_V the_D bus_N .', tr: 'Макс опаздывает, потому что опоздал на автобус.', options: ['him', 'his'] },
      ],
    },
    {
      id: 'pron-personal.him',
      skill: 'him — после глагола и предлога',
      focus: 'obj.he',
      variants: [
        { s: 'I_P don’t_A know_V [him_P] .', tr: 'Я его не знаю.', options: ['he', 'his'] },
        { s: 'We_P met_V [him_P] at_I the_D airport_N .', tr: 'Мы встретили его в аэропорту.', options: ['he', 'his'] },
        { s: 'Give_V this_D letter_N to_I [him_P] , please_R .', tr: 'Передай ему это письмо, пожалуйста.', options: ['he', 'his'] },
      ],
    },
    {
      id: 'pron-personal.she',
      skill: 'she — подлежащее',
      focus: 'subj.she',
      variants: [
        { s: '[She_P] speaks_V three_M languages_N .', tr: 'Она говорит на трёх языках.', options: ['Her', 'Hers'] },
        { s: 'Is_V [she_P] your_P sister_N ?', tr: 'Она твоя сестра?', options: ['her', 'hers'] },
        { s: 'Kate_N isn’t_V here_R . [She_P] is_V at_I work_N .', tr: 'Кейт здесь нет. Она на работе.', options: ['Her', 'Hers'] },
      ],
    },
    {
      id: 'pron-personal.her',
      skill: 'her — после глагола и предлога',
      focus: 'obj.she',
      variants: [
        { s: 'I_P see_V [her_P] every_D day_N .', tr: 'Я вижу её каждый день.', options: ['she', 'hers'] },
        { s: 'Can_A you_P call_V [her_P] later_R ?', tr: 'Можешь позвонить ей попозже?', options: ['she', 'hers'] },
        { s: 'This_D present_N is_V for_I [her_P] .', tr: 'Этот подарок для неё.', options: ['she', 'hers'] },
      ],
    },
    {
      id: 'pron-personal.we',
      skill: 'we — подлежащее',
      focus: 'subj.we',
      variants: [
        { s: '[We_P] are_V late_J again_R !', tr: 'Мы опять опаздываем!', options: ['Us', 'Our'] },
        { s: 'Shall_A [we_P] go_V now_R ?', tr: 'Пойдём сейчас?', options: ['us', 'our'] },
        { s: '[We_P] usually_R have_V lunch_N at_I one_M .', tr: 'Мы обычно обедаем в час.', options: ['Us', 'Our'] },
      ],
    },
    {
      id: 'pron-personal.us',
      skill: 'us — после глагола и предлога',
      focus: 'obj.we',
      variants: [
        { s: 'Join_V [us_P] for_I dinner_N !', tr: 'Поужинай с нами!', options: ['we', 'our'] },
        { s: 'They_P invited_V [us_P] to_I the_D party_N .', tr: 'Они пригласили нас на вечеринку.', options: ['we', 'our'] },
        { s: 'Our_P teacher_N gave_V [us_P] a_D test_N .', tr: 'Учитель дал нам контрольную.', options: ['we', 'ours'] },
      ],
    },
    {
      id: 'pron-personal.they',
      skill: 'they — подлежащее, и для людей, и для вещей',
      focus: 'subj.they',
      variants: [
        { s: '[They_P] live_V in_I Manchester_N .', tr: 'Они живут в Манчестере.', options: ['Them', 'Their'] },
        { s: 'Where_R are_V my_P keys_N ? [They_P] were_V on_I the_D table_N .', tr: 'Где мои ключи? Они лежали на столе.', options: ['It', 'Them'] },
        { s: 'The_D children_N are_V tired_J . [They_P] want_V to_X sleep_V .', tr: 'Дети устали. Они хотят спать.', options: ['It', 'Them'] },
      ],
      why: 'Несколько людей или вещей — they.',
    },
    {
      id: 'pron-personal.them',
      skill: 'them — после глагола и предлога',
      focus: 'obj.they',
      variants: [
        { s: 'I_P like_V these_D shoes_N . I_P +’ll_A buy_V [them_P] .', tr: 'Мне нравятся эти туфли. Я их куплю.', options: ['they', 'it'] },
        { s: 'Look_V at_I those_D birds_N ! Can_A you_P see_V [them_P] ?', tr: 'Посмотри на тех птиц! Видишь их?', options: ['they', 'their'] },
        { s: 'Tell_V [them_P] the_D truth_N .', tr: 'Скажи им правду.', options: ['they', 'their'] },
      ],
    },
    {
      id: 'pron-personal.it-things',
      skill: 'Вещь — it, даже если по-русски «он» или «она»',
      focus: 'it',
      why: 'У вещей в английском нет рода: стол, лампа, телефон — it.',
      variants: [
        { s: 'Where_R is_V my_P phone_N ? I_P can’t_A find_V [it_P] .', tr: 'Где мой телефон? Не могу его найти.', options: ['him', 'her'] },
        { s: 'I_P bought_V a_D new_J lamp_N . [It_P] is_V very_R bright_J .', tr: 'Я купил новую лампу. Она очень яркая.', options: ['She', 'He'] },
        { s: 'This_D table_N is_V old_J , but_C we_P love_V [it_P] .', tr: 'Этот стол старый, но мы его любим.', options: ['him', 'her'] },
      ],
    },
    {
      id: 'pron-personal.you',
      skill: 'you — и «ты», и «вы», в любом месте',
      focus: 'you',
      why: 'you не меняется: и «ты», и «вы», и «тебя», и «вам».',
      variants: [
        { s: 'Anna_N , are_V [you_P] ready_J ?', tr: 'Анна, ты готова?', options: ['your', 'yours'] },
        { s: 'Mr~Smith_N , can_A I_P help_V [you_P] ?', tr: 'Мистер Смит, чем могу вам помочь?', options: ['your', 'yours'] },
        { s: 'Children_N , I_P +’m_V proud_J of_I [you_P] .', tr: 'Дети, я горжусь вами.', options: ['your', 'yours'] },
      ],
    },
    {
      id: 'pron-personal.after-prep',
      skill: 'После предлога — me, him, her, us, them',
      focus: 'obj',
      why: 'После with, for, about, to — форма дополнения.',
      variants: [
        { s: 'Come_V with_I [me_P] !', tr: 'Пойдём со мной!', options: ['I', 'my'] },
        { s: 'We_P often_R talk_V about_I [them_P] .', tr: 'Мы часто говорим о них.', options: ['they', 'their'] },
        { s: 'Is_V this_D cake_N for_I [us_P] ?', tr: 'Этот торт для нас?', options: ['we', 'our'] },
      ],
    },
    {
      id: 'pron-personal.short',
      skill: 'В коротком ответе без глагола — me, him: Me too',
      focus: 'obj',
      why: 'Без глагола после местоимения говорят Me too, Not me, Who? — Him.',
      variants: [
        { s: 'I_P +’m_V hungry_J . — [Me_P] too_R .', tr: 'Я голоден. — Я тоже.', options: ['I', 'My'] },
        { s: 'Who_P broke_V the_D window_N ? — Not_X [me_P] !', tr: 'Кто разбил окно? — Не я!', options: ['I', 'my'] },
      ],
    },
    {
      id: 'pron-personal.replace',
      skill: 'Заменить существительное после глагола: him, her, it или them',
      focus: 'obj',
      why: 'Смотри, кого заменяем: мужчину — him, женщину — her, вещь — it, нескольких — them.',
      variants: [
        { s: 'My_P sister_N lives_V in_I Rome_N . I_P often_R visit_V [her_P] .', tr: 'Моя сестра живёт в Риме. Я часто к ней езжу.', options: ['him', 'them'] },
        { s: 'Tom_N and_C Kate_N are_V here_R . Can_A you_P see_V [them_P] ?', tr: 'Том и Кейт здесь. Видишь их?', options: ['him', 'her'] },
        { s: 'Our_P boss_N is_V nice_J . Everybody_P likes_V [him_P] .', tr: 'Наш начальник хороший. Он всем нравится.', options: ['it', 'them'] },
      ],
    },
    {
      id: 'pron-personal.order',
      mode: 'order',
      skill: 'Собрать: кто — делает — кого',
      focus: 'obj',
      why: 'Подлежащее перед глаголом, дополнение после: She asked me.',
      variants: [
        { s: 'She_P asked_V me_P about_I them_P .', tr: 'Она спросила меня о них.' },
        { s: 'We_P saw_V him_P with_I her_P .', tr: 'Мы видели его с ней.' },
        { s: 'They_P invited_V us_P to_I dinner_N .', tr: 'Они пригласили нас на ужин.' },
      ],
    },
  ],
} satisfies TopicBody
