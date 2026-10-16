import type { TopicBody } from '../types'

export default {
  summary: 'Какой? — прилагательное (quick). Как? — наречие (quickly). После be, seem, feel, sound — всё равно прилагательное.',
  ref: [
    { kind: 'visual', visual: { id: 'adj-adv', focus: 'adj' }, caption: 'Прилагательное цепляется к существительному, наречие — к глаголу' },
    {
      kind: 'rule',
      title: 'Какой? — прилагательное',
      text: 'Прилагательное описывает существительное: a quick answer. Оно стоит и после be, seem, feel, sound, look (в смысле «выглядит»): She looks happy. Слово описывает человека, а не действие, поэтому -ly не нужно.',
      examples: [
        { s: 'She_P gave_V me_P a_D quick_J answer_N .', tr: 'Она дала мне быстрый ответ.' },
        { s: 'You_P look_V tired_J .', tr: 'Ты выглядишь уставшим.' },
        { s: 'That_D sounds_V great_J .', tr: 'Звучит здорово.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Как? — наречие',
      text: 'Наречие описывает глагол: She answered quickly. Обычно оно получается из прилагательного добавлением -ly: slow → slowly. Если слово кончается на -y, то -y → -ily (easy → easily), на -le — меняется на -ly (gentle → gently).',
      examples: [
        { s: 'She_P answered_V quickly_R .', tr: 'Она ответила быстро.' },
        { s: 'He_P won_V easily_R .', tr: 'Он легко выиграл.' },
        { s: 'She_P spoke_V gently_R .', tr: 'Она говорила мягко.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Особые: good — well, fast, hard',
      text: 'good (какой?) — прилагательное, well (как?) — наречие. fast, hard, late, early одинаковы в обеих ролях: a fast car, drives fast. Но hardly значит «почти не», а lately — «в последнее время»: это другие слова.',
      examples: [
        { s: 'He_P is_V a_D good_J driver_N .', tr: 'Он хороший водитель.' },
        { s: 'He_P drives_V well_R .', tr: 'Он хорошо водит машину.' },
        { s: 'I_P can_A hardly_R hear_V you_P .', tr: 'Я почти не слышу тебя.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Мне_P холодно_R .',
      en: 'I_P +’m_V cold_J .',
      note: 'В русском «холодно» похоже на наречие, а человек стоит в дательном падеже: «мне». В английском состояние описывает прилагательное после be: I am cold, а не coldly.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'She_P sings_V beautiful_J .', right: 'She_P sings_V beautifully_R .', note: 'Как поёт? Это наречие, нужно -ly.' },
        { wrong: 'He_P plays_V tennis_N good_J .', right: 'He_P plays_V tennis_N well_R .', note: 'Как играет? — well, а не good.' },
        { wrong: 'Tom_N seems_V nervously_R .', right: 'Tom_N seems_V nervous_J .', note: 'После seem, feel, look — прилагательное.' },
        { wrong: 'He_P works_V hardly_R .', right: 'He_P works_V hard_R .', note: 'hardly — «почти не». «Усердно» — hard.' },
        { wrong: 'We_P arrived_V lately_R .', right: 'We_P arrived_V late_R .', note: 'lately — «в последнее время».' },
        { wrong: 'He_P drives_V fastly_R .', right: 'He_P drives_V fast_R .', note: 'У fast нет формы с -ly.' },
      ],
    },
    { kind: 'tip', text: 'Проверка вопросом: «какой?» — прилагательное, «как?» — наречие. После be, seem, feel, sound вопрос всегда «какой?».' },
  ],
  items: [
    {
      id: 'adj-adv.adj-before-noun',
      skill: 'Перед существительным — прилагательное: a careful driver',
      focus: 'adj',
      why: 'Какой водитель? Осторожный. Слово при существительном — прилагательное, без -ly.',
      variants: [
        { s: 'She_P is_V a_D [careful_J] driver_N .', tr: 'Она осторожный водитель.', options: ['carefully', 'carelessly'] },
        { s: 'We_P had_V a_D [quiet_J] weekend_N at_I home_N .', tr: 'У нас были тихие выходные дома.', options: ['quietly', 'quickly'] },
        { s: 'It_P was_V a_D [slow_J] journey_N .', tr: 'Это была медленная поездка.', options: ['slowly', 'badly'] },
      ],
    },
    {
      id: 'adj-adv.adv-verb',
      skill: 'При глаголе — наречие: sings beautifully',
      focus: 'adv',
      why: 'Как поёт? Слово описывает действие, поэтому нужно наречие с -ly.',
      variants: [
        { s: 'She_P sings_V [beautifully_R] .', tr: 'Она красиво поёт.', options: ['beautiful', 'beauty'] },
        { s: 'Please_R drive_V [carefully_R] .', tr: 'Пожалуйста, езжайте осторожно.', options: ['careful', 'care'] },
        { s: 'The_D teacher_N explained_V the_D rules_N [clearly_R] .', tr: 'Учитель понятно объяснил правила.', options: ['clear', 'clearness'] },
      ],
    },
    {
      id: 'adj-adv.linking',
      skill: 'После seem, feel, sound — прилагательное, не -ly',
      focus: 'linking',
      why: 'После seem, feel, sound слово описывает человека или вещь, а не действие. Значит, прилагательное.',
      variants: [
        { s: 'Tom_N seems_V [nervous_J] today_R .', tr: 'Том сегодня кажется нервным.', options: ['nervously', 'nerves'] },
        { s: 'Anna_N feels_V [safe_J] in_I this_D street_N .', tr: 'Анна чувствует себя в безопасности на этой улице.', options: ['safely', 'safety'] },
        { s: 'That_D idea_N sounds_V [great_J] .', tr: 'Эта идея звучит здорово.', options: ['greatly', 'well'] },
      ],
    },
    {
      id: 'adj-adv.ly-basic',
      skill: 'Наречие = прилагательное + -ly: quiet → quietly',
      focus: 'ly',
      why: 'К прилагательному добавляем -ly: quiet → quietly, polite → politely (буква e остаётся).',
      variants: [
        { s: 'Anna_N is_V a_D quiet_J girl_N . She_P speaks_V [quietly_R] .', tr: 'Анна — тихая девочка. Она говорит тихо.', options: ['quietely', 'quiet'] },
        { s: 'Our_P boss_N is_V polite_J . He_P answers_V [politely_R] .', tr: 'Наш начальник вежливый. Он отвечает вежливо.', options: ['politly', 'polite'] },
        { s: 'It_P was_V a_D sudden_J change_N . The_D weather_N changed_V [suddenly_R] .', tr: 'Это была резкая перемена. Погода внезапно изменилась.', options: ['suddenlly', 'sudden'] },
      ],
    },
    {
      id: 'adj-adv.ly-y-ily',
      skill: 'Слово на -y: y → ily (easy → easily)',
      focus: 'ly',
      why: 'Если прилагательное кончается на -y, меняем y на i и добавляем -ly: easy → easily, happy → happily.',
      variants: [
        { s: 'The_D test_N was_V easy_J . Tom_N passed_V it_P [easily_R] .', tr: 'Тест был лёгким. Том сдал его легко.', options: ['easyly', 'easy'] },
        { s: 'Max_N is_V happy_J . He_P smiled_V [happily_R] .', tr: 'Макс счастлив. Он счастливо улыбнулся.', options: ['happyly', 'happy'] },
        { s: 'Kate_N was_V angry_J . She_P answered_V [angrily_R] .', tr: 'Кейт была сердита. Она ответила сердито.', options: ['angryly', 'angry'] },
      ],
    },
    {
      id: 'adj-adv.ly-le',
      skill: 'Слово на -le: le → ly (gentle → gently)',
      focus: 'ly',
      why: 'У прилагательных на -le конец меняется на -ly: gentle → gently, simple → simply, comfortable → comfortably.',
      variants: [
        { s: 'Anna_N is_V a_D gentle_J teacher_N . She_P speaks_V [gently_R] .', tr: 'Анна — мягкая учительница. Она говорит мягко.', options: ['gentlely', 'gentle'] },
        { s: 'The_D rules_N are_V simple_J . Tom_N explained_V them_P [simply_R] .', tr: 'Правила простые. Том объяснил их просто.', options: ['simplely', 'simple'] },
        { s: 'This_D sofa_N is_V comfortable_J . You_P can_A sit_V [comfortably_R] .', tr: 'Этот диван удобный. На нём можно удобно сидеть.', options: ['comfortablely', 'comfortable'] },
      ],
    },
    {
      id: 'adj-adv.good-adj',
      skill: 'good — прилагательное (какой?): a good film',
      focus: 'irregular',
      why: 'good отвечает на вопрос «какой?» и стоит при существительном. «Как?» — это well.',
      variants: [
        { s: 'That_D was_V a_D [good_J] film_N .', tr: 'Это был хороший фильм.', options: ['well', 'nicely'] },
        { s: 'She_P is_V a_D [good_J] cook_N .', tr: 'Она хороший повар.', options: ['well', 'gooder'] },
        { s: 'Tom_N has_V a_D [good_J] job_N .', tr: 'У Тома хорошая работа.', options: ['well', 'kindly'] },
      ],
    },
    {
      id: 'adj-adv.well-adv',
      skill: 'well — наречие (как?): plays well',
      focus: 'irregular',
      why: 'У good наречие особое: well. good при глаголе не ставят, а goodly — не наречие.',
      variants: [
        { s: 'She_P plays_V the_D guitar_N [well_R] .', tr: 'Она хорошо играет на гитаре.', options: ['good', 'goodly'] },
        { s: 'You_P speak_V English_N really_R [well_R] .', tr: 'Ты очень хорошо говоришь по-английски.', options: ['good', 'gooder'] },
        { s: 'Did_A you_P sleep_V [well_R] last_J night_N ?', tr: 'Ты хорошо спал прошлой ночью?', options: ['good', 'goodly'] },
      ],
    },
    {
      id: 'adj-adv.fast-same',
      skill: 'fast — и прилагательное, и наречие, без -ly',
      focus: 'irregular',
      why: 'fast не меняется: a fast car и runs fast. Формы fastly в английском нет.',
      variants: [
        { s: 'Tom_N runs_V very_R [fast_R] .', tr: 'Том бегает очень быстро.', options: ['fastly', 'quick'] },
        { s: 'Please_R don’t_A drive_V so_R [fast_R] !', tr: 'Пожалуйста, не води так быстро!', options: ['fastly', 'fastily'] },
        { s: 'Anna_N types_V really_R [fast_R] .', tr: 'Анна печатает очень быстро.', options: ['fastly', 'quick'] },
      ],
    },
    {
      id: 'adj-adv.hard-adv',
      skill: 'hard — наречие «усердно, сильно», без -ly',
      focus: 'irregular',
      why: 'works hard — работает усердно. Слово hard остаётся таким же. Не путай с hardly («почти не»).',
      variants: [
        { s: 'Anna_N works_V [hard_R] every_D day_N .', tr: 'Анна усердно работает каждый день.', options: ['hardly', 'hardy'] },
        { s: 'Tom_N studied_V [hard_R] for_I the_D exam_N .', tr: 'Том усердно готовился к экзамену.', options: ['hardly', 'hardily'] },
        { s: 'It_P was_A raining_V [hard_R] .', tr: 'Шёл сильный дождь.', options: ['hardly', 'strongly'], accept: ['heavily'] },
      ],
    },
    {
      id: 'adj-adv.hardly',
      skill: 'hardly — «почти не», не «усердно»',
      focus: 'irregular',
      why: 'hardly — почти не, с трудом: I can hardly hear you. «Усердно» по-английски — hard.',
      variants: [
        { s: 'I_P can_A [hardly_R] hear_V you_P .', tr: 'Я почти не слышу тебя.', options: ['hard', 'hardy'] },
        { s: 'There_P is_V [hardly_R] any_D milk_N left_J .', tr: 'Молока почти не осталось.', options: ['hard', 'nearly'] },
        { s: 'I_P [hardly_R] know_V him_P .', tr: 'Я его почти не знаю.', options: ['hard', 'hardy'] },
      ],
    },
    {
      id: 'adj-adv.late-early',
      skill: 'late, early — «поздно, рано» без -ly; lately — «в последнее время»',
      focus: 'irregular',
      why: 'late и early — и прилагательное, и наречие. lately значит «в последнее время», а не «поздно».',
      variants: [
        { s: 'We_P arrived_V [late_R] because~of_I the_D traffic_N .', tr: 'Мы приехали поздно из-за пробок.', options: ['lately', 'latly'] },
        { s: 'Tom_N always_R gets_V up_R [early_R] .', tr: 'Том всегда встаёт рано.', options: ['earlily', 'earlyly'] },
        { s: 'Anna_N called_V me_P [late_R] at_I night_N .', tr: 'Анна позвонила мне поздно вечером.', options: ['lately', 'latly'] },
      ],
    },
    {
      id: 'adj-adv.ly-adjective',
      mode: 'pick',
      skill: 'friendly, lovely, lonely — прилагательные, хоть и на -ly',
      focus: 'adj',
      why: 'friendly, lovely, lonely, ugly — прилагательные: они отвечают «какой?». Не всякое слово на -ly — наречие.',
      variants: [
        { s: 'Our_P neighbours_N are_V very_R {friendly_J} .', tr: 'Наши соседи очень дружелюбные.', q: 'Найди прилагательное (какой?).' },
        { s: 'She_P gave_V me_P a_D {lovely_J} present_N .', tr: 'Она подарила мне чудесный подарок.', q: 'Найди прилагательное (какой?).' },
        { s: 'Max_N feels_V {lonely_J} in_I London_N .', tr: 'Максу одиноко в Лондоне.', q: 'Найди прилагательное (какой?).' },
      ],
    },
    {
      id: 'adj-adv.pick-adv',
      mode: 'pick',
      skill: 'Найти наречие — слово про действие, отвечает «как?»',
      focus: 'adv',
      why: 'Наречие описывает действие и отвечает «как?». Прилагательное описывает предмет и отвечает «какой?».',
      variants: [
        { s: 'Anna_N answered_V the_D question_N {quickly_R} .', tr: 'Анна быстро ответила на вопрос.', q: 'Найди наречие (как?).' },
        { s: 'The_D bus_N moved_V {slowly_R} through_I the_D town_N .', tr: 'Автобус медленно двигался по городу.', q: 'Найди наречие (как?).' },
        { s: 'My_P brother_N works_V {hard_R} but_C sleeps_V {badly_R} .', tr: 'Мой брат усердно работает, но плохо спит.', q: 'Найди все наречия (как?).' },
      ],
    },
  ],
} satisfies TopicBody
