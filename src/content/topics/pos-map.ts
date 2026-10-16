import type { TopicBody } from '../types'

// Части речи в английском: узнать роль слова в предложении. Ответы choice — русские названия частей речи.

const Q = 'Какая часть речи у выделенного слова?'
const NOUN = 'существительное'
const PRON = 'местоимение'
const DET = 'артикль / определитель'
const NUM = 'числительное'
const ADJ = 'прилагательное'
const VERB = 'глагол'
const AUX = 'вспомогательный / модальный'
const ADV = 'наречие'
const PREP = 'предлог'
const CONJ = 'союз'
const PART = 'частица'

export default {
  summary: 'Часть речи определяет роль слова в предложении, а не само слово: fast бывает и прилагательным, и наречием.',
  ref: [
    { kind: 'visual', visual: { id: 'pos-shapes', focus: 'questions' }, caption: 'Цвет и форма = часть речи. Узнаём по вопросу и по соседним словам' },
    {
      kind: 'rule',
      title: 'Часть речи — это роль',
      text: 'Одно и то же слово в разных предложениях может быть разной частью речи. fast в a fast car — прилагательное (какая?), а в drives fast — наречие (как?). Поэтому всегда смотри на соседей.',
      examples: [
        { s: 'Ben_N has_V a_D fast_J car_N .', tr: 'У Бена быстрая машина.' },
        { s: 'Ben_N drives_V fast_R .', tr: 'Бен быстро ездит.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Узнаём по соседям',
      text: 'После a / the — существительное (или прилагательное перед ним). Слово при существительном на вопрос «какой?» — прилагательное, при глаголе на вопрос «как?» — наречие. Предлог (in, on, with) всегда ведёт к существительному. Перед глаголом to — частица.',
      examples: [
        { s: 'The_D new_J teacher_N speaks_V clearly_R .', tr: 'Новая учительница говорит чётко.' },
        { s: 'Anna_N works_V with_I children_N .', tr: 'Анна работает с детьми.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Как мы размечаем спорные слова',
      text: 'my, his, her — местоимения (как «мой», «его» в русском). not и to перед глаголом — частицы. There в There is — местоимение. Be в She is a doctor — смысловой глагол, а в She is working — вспомогательный.',
      examples: [
        { s: 'My_P brother_N is_V a_D doctor_N .', tr: 'Мой брат — врач.' },
        { s: 'He_P is_A not_X working_V today_R .', tr: 'Сегодня он не работает.' },
        { s: 'There_P is_V a_D shop_N here_R .', tr: 'Здесь есть магазин.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Быстрая_J машина_N едет_V быстро_R .',
      en: 'A_D fast_J car_N goes_V fast_R .',
      note: 'В русском прилагательное и наречие различаются окончанием: быстрая / быстро. В английском слово одно — fast, и роль видна только по месту: перед существительным или после глагола. Артиклей в русском нет совсем.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'She_P drives_V careful_J .', right: 'She_P drives_V carefully_R .', note: 'Как водит? Это наречие, а не прилагательное.' },
        { wrong: 'He_P works_V hardly_R .', right: 'He_P works_V hard_R .', note: 'hardly значит «едва ли»; «усердно» — hard.' },
        { wrong: 'I_P feel_V happily_R .', right: 'I_P feel_V happy_J .', note: 'После feel, look, be спрашиваем «какой?» — прилагательное.' },
      ],
    },
    { kind: 'tip', text: 'Быстрая проверка: перед словом можно поставить the — существительное. «Какой?» — прилагательное, «как?» — наречие. Слово ведёт к существительному («в, на, с») — предлог.' },
  ],
  items: [
    {
      id: 'pos-map.noun',
      mode: 'choice',
      skill: 'Существительное называет предмет, человека, место',
      focus: 'noun',
      why: 'Существительное отвечает на «кто? что?» и обычно стоит после a / the, my или прилагательного.',
      variants: [
        { s: 'My_P {boss_N} drives_V a_D black_J car_N .', tr: 'Мой начальник ездит на чёрной машине.', q: Q, answer: NOUN, options: [PRON, ADJ] },
        { s: 'Anna_N bought_V a_D {ticket_N} for_I the_D train_N .', tr: 'Анна купила билет на поезд.', q: Q, answer: NOUN, options: [VERB, ADJ] },
        { s: '{Tom_N} lives_V in_I Leeds_N .', tr: 'Том живёт в Лидсе.', q: Q, answer: NOUN, options: [PRON, ADJ], why: 'Имя человека — тоже существительное (Tom, Leeds пишутся с большой буквы).' },
      ],
    },
    {
      id: 'pos-map.pron',
      mode: 'choice',
      skill: 'Местоимение стоит вместо существительного: she, him, who',
      focus: 'pron',
      why: 'Местоимение заменяет существительное и не называет предмет само: she вместо Kate, him вместо Tom.',
      variants: [
        { s: 'Kate_N is_V tired_J , so_C {she_P} stays_V at_I home_N .', tr: 'Кейт устала, поэтому она остаётся дома.', q: Q, answer: PRON, options: [NOUN, DET] },
        { s: 'I_P don’t_A know_V {him_P} .', tr: 'Я его не знаю.', q: Q, answer: PRON, options: [NOUN, ADV] },
        { s: '{Who_P} is_V that_D man_N ?', tr: 'Кто этот мужчина?', q: Q, answer: PRON, options: [NOUN, ADV], why: 'Who — вопросительное местоимение: оно спрашивает «кто?» вместо существительного.' },
      ],
    },
    {
      id: 'pos-map.det',
      mode: 'choice',
      skill: 'Артикль и определитель стоят перед существительным: a, the, this, every',
      focus: 'det',
      why: 'a, the, this, every всегда ведут за собой существительное и уточняют, о каком предмете речь.',
      variants: [
        { s: 'Tom_N bought_V {a_D} new_J phone_N .', tr: 'Том купил новый телефон.', q: Q, answer: DET, options: [NUM, ADJ], why: 'a — неопределённый артикль («один из многих»), а не числительное.' },
        { s: 'I_P like_V {this_D} song_N .', tr: 'Мне нравится эта песня.', q: Q, answer: DET, options: [PRON, ADJ], why: 'this перед существительным — определитель. Без существительного (Who is this?) оно было бы местоимением.' },
        { s: '{Every_D} student_N has_V a_D laptop_N .', tr: 'У каждого студента есть ноутбук.', q: Q, answer: DET, options: [ADJ, PRON] },
      ],
    },
    {
      id: 'pos-map.num',
      mode: 'choice',
      skill: 'Числительное отвечает на «сколько?» и «который по счёту?»',
      focus: 'num',
      why: 'two, five — количественные, third, first — порядковые числительные: сколько? который по счёту?',
      variants: [
        { s: 'We_P have_V {two_M} children_N .', tr: 'У нас двое детей.', q: Q, answer: NUM, options: [ADJ, DET] },
        { s: 'My_P office_N is_V on_I the_D {third_M} floor_N .', tr: 'Мой офис на третьем этаже.', q: Q, answer: NUM, options: [ADJ, NOUN], why: 'third — порядковое числительное: который по счёту? Оно не прилагательное.' },
        { s: 'Lucy_N bought_V {five_M} apples_N .', tr: 'Люси купила пять яблок.', q: Q, answer: NUM, options: [NOUN, ADV] },
      ],
    },
    {
      id: 'pos-map.adj',
      mode: 'choice',
      skill: 'Прилагательное отвечает «какой?»: перед существительным или после be',
      focus: 'adj',
      why: 'Прилагательное описывает существительное: a new car (перед ним) или The soup is hot (после be).',
      variants: [
        { s: 'We_P live_V in_I a_D {quiet_J} street_N .', tr: 'Мы живём на тихой улице.', q: Q, answer: ADJ, options: [NOUN, ADV] },
        { s: 'The_D soup_N is_V {hot_J} .', tr: 'Суп горячий.', q: Q, answer: ADJ, options: [ADV, VERB], why: 'После is спрашиваем «какой суп?» — hot отвечает на этот вопрос, значит прилагательное.' },
        { s: 'My_P flat_N is_V {small_J} but_C comfortable_J .', tr: 'Моя квартира маленькая, но удобная.', q: Q, answer: ADJ, options: [ADV, NOUN] },
      ],
    },
    {
      id: 'pos-map.verb',
      mode: 'choice',
      skill: 'Глагол называет действие или состояние: work, have, is',
      focus: 'verb',
      why: 'Смысловой глагол — главное слово сказуемого. Если в предложении глагол один, даже is — смысловой.',
      variants: [
        { s: 'Anna_N {works_V} in_I a_D shop_N .', tr: 'Анна работает в магазине.', q: Q, answer: VERB, options: [NOUN, AUX] },
        { s: 'My_P brother_N {is_V} a_D teacher_N .', tr: 'Мой брат — учитель.', q: Q, answer: VERB, options: [AUX, NOUN], why: 'Других глаголов нет, значит is здесь смысловой («является»), а не вспомогательный.' },
        { s: 'We_P {watched_V} a_D good_J film_N .', tr: 'Мы посмотрели хороший фильм.', q: Q, answer: VERB, options: [NOUN, ADJ] },
      ],
    },
    {
      id: 'pos-map.aux',
      mode: 'choice',
      skill: 'Вспомогательный и модальный стоят перед глаголом: do, will, can, is + -ing',
      focus: 'aux',
      why: 'Вспомогательный глагол сам смысла не несёт: он помогает другому глаголу (вопрос, отрицание, время, «могу»).',
      variants: [
        { s: 'I_P {don’t_A} like_V coffee_N .', tr: 'Я не люблю кофе.', q: Q, answer: AUX, options: [PART, ADV], why: 'don’t = do + not. do помогает построить отрицание, а смысл несёт like.' },
        { s: 'Anna_N {can_A} speak_V French_N .', tr: 'Анна умеет говорить по-французски.', q: Q, answer: AUX, options: [VERB, ADV] },
        { s: 'We_P {will_A} call_V you_P later_R .', tr: 'Мы вам позвоним позже.', q: Q, answer: AUX, options: [VERB, ADJ], why: 'will показывает будущее, а действие называет call.' },
      ],
    },
    {
      id: 'pos-map.adv',
      mode: 'choice',
      skill: 'Наречие отвечает «как? где? когда?» и не меняется',
      focus: 'adv',
      why: 'Наречие описывает действие (speaks well) или усиливает признак (very tired). К существительному наречие не относится.',
      variants: [
        { s: 'She_P speaks_V English_N {well_R} .', tr: 'Она хорошо говорит по-английски.', q: Q, answer: ADV, options: [ADJ, NOUN], why: 'Говорит как? — well. Прилагательное good описывало бы существительное.' },
        { s: 'Tom_N {usually_R} takes_V the_D bus_N .', tr: 'Том обычно ездит на автобусе.', q: Q, answer: ADV, options: [ADJ, VERB] },
        { s: 'Lucy_N is_V {very_R} tired_J .', tr: 'Люси очень устала.', q: Q, answer: ADV, options: [ADJ, NOUN], why: 'very усиливает прилагательное tired: насколько устала? Это наречие.' },
      ],
    },
    {
      id: 'pos-map.prep',
      mode: 'choice',
      skill: 'Предлог связывает существительное со словом перед ним: in, on, with',
      focus: 'prep',
      why: 'Предлог не стоит один: за ним всегда идёт существительное или местоимение (on the table, with them).',
      variants: [
        { s: 'The_D keys_N are_V {on_I} the_D table_N .', tr: 'Ключи на столе.', q: Q, answer: PREP, options: [ADV, CONJ] },
        { s: 'I_P live_V {with_I} my_P parents_N .', tr: 'Я живу с родителями.', q: Q, answer: PREP, options: [CONJ, ADV] },
        { s: 'This_D present_N is_V {for_I} you_P .', tr: 'Этот подарок для тебя.', q: Q, answer: PREP, options: [PART, ADV] },
      ],
    },
    {
      id: 'pos-map.conj',
      mode: 'choice',
      skill: 'Союз соединяет слова и части предложения: and, but, because',
      focus: 'conj',
      why: 'Союз ничего не называет, а связывает: and — «и», but — «но», because — «потому что».',
      variants: [
        { s: 'Tom_N {and_C} Kate_N are_V colleagues_N .', tr: 'Том и Кейт — коллеги.', q: Q, answer: CONJ, options: [PREP, PRON] },
        { s: 'I_P like_V tea_N , {but_C} I_P don’t_A like_V coffee_N .', tr: 'Я люблю чай, но не люблю кофе.', q: Q, answer: CONJ, options: [ADV, PREP] },
        { s: 'We_P stayed_V at_I home_N {because_C} it_P was_V cold_J .', tr: 'Мы остались дома, потому что было холодно.', q: Q, answer: CONJ, options: [PREP, ADV] },
      ],
    },
    {
      id: 'pos-map.part',
      mode: 'choice',
      skill: 'Частицы: not (отрицание) и to перед глаголом',
      focus: 'part',
      why: 'not и to перед глаголом сами ничего не называют, а добавляют оттенок: отрицание или начальную форму глагола.',
      variants: [
        { s: 'She_P does_A {not_X} like_V fish_N .', tr: 'Она не любит рыбу.', q: Q, answer: PART, options: [ADV, AUX] },
        { s: 'I_P want_V {to_X} learn_V English_N .', tr: 'Я хочу выучить английский.', q: Q, answer: PART, options: [PREP, ADV], why: 'to перед глаголом — частица, как русское «не» и «бы». Предлогом to бывает только перед существительным.' },
        { s: 'Max_N will_A {not_X} wait_V .', tr: 'Макс не будет ждать.', q: Q, answer: PART, options: [ADV, PREP] },
      ],
    },
    {
      id: 'pos-map.fast',
      mode: 'choice',
      skill: 'fast, hard, late: прилагательное (какой?) или наречие (как?)',
      focus: 'adv',
      why: 'Слово то же, роль разная. Спроси: «какой?» (при существительном или после be) — прилагательное; «как?» (при глаголе) — наречие.',
      variants: [
        { s: 'Kate_N likes_V {fast_J} cars_N .', tr: 'Кейт любит быстрые машины.', q: Q, answer: ADJ, options: [ADV, NOUN], why: 'Какие машины? — fast. Слово описывает существительное, значит прилагательное.' },
        { s: 'Lucy_N works_V {hard_R} .', tr: 'Люси усердно работает.', q: Q, answer: ADV, options: [ADJ, NOUN], why: 'Работает как? — hard описывает глагол, значит наречие. Форма hardly — другое слово («едва ли»).' },
        { s: 'The_D train_N is_V {late_J} .', tr: 'Поезд опаздывает.', q: Q, answer: ADJ, options: [ADV, VERB], why: 'После is спрашиваем «какой поезд?» — late отвечает, значит прилагательное. В arrived late было бы наречие.' },
      ],
    },
    {
      id: 'pos-map.noun-verb',
      mode: 'choice',
      skill: 'book, call, water: существительное или глагол — по соседям',
      focus: 'verb',
      why: 'После a / the, my или прилагательного — существительное. После can, will, to или подлежащего — глагол.',
      variants: [
        { s: 'Can_A you_P {book_V} a_D table_N ?', tr: 'Ты можешь забронировать столик?', q: Q, answer: VERB, options: [NOUN, ADJ], why: 'После can идёт глагол. Существительное book («книга») после can не стоит.' },
        { s: 'Tom_N gave_V me_P a_D {call_N} yesterday_R .', tr: 'Том вчера мне позвонил.', q: Q, answer: NOUN, options: [VERB, ADJ], why: 'Перед словом стоит a — значит, это существительное: «звонок».' },
        { s: 'Anna_N will_A {water_V} the_D plants_N .', tr: 'Анна польёт растения.', q: Q, answer: VERB, options: [NOUN, ADJ], why: 'После will идёт глагол: water здесь «поливать», а не «вода».' },
      ],
    },
    {
      id: 'pos-map.that',
      mode: 'choice',
      skill: 'that: определитель (that man), местоимение (that is) или союз (think that)',
      focus: 'det',
      why: 'that + существительное — определитель; that само по себе — местоимение; that между двумя частями предложения — союз.',
      variants: [
        { s: 'I_P like_V {that_D} jacket_N .', tr: 'Мне нравится та куртка.', q: Q, answer: DET, options: [PRON, CONJ], why: 'За that идёт существительное jacket, поэтому that уточняет его — определитель.' },
        { s: 'What_P is_V {that_P} ?', tr: 'Что это?', q: Q, answer: PRON, options: [DET, CONJ], why: 'За that нет существительного: оно стоит вместо него — местоимение («это»).' },
        { s: 'I_P think_V {that_C} Tom_N is_V right_J .', tr: 'Я думаю, что Том прав.', q: Q, answer: CONJ, options: [PRON, DET], why: 'that соединяет две части предложения (как русское «что») — союз.' },
      ],
    },
    {
      id: 'pos-map.like',
      mode: 'choice',
      skill: 'like: глагол («любить») или предлог («как», «похожий на»)',
      focus: 'prep',
      why: 'like перед существительным в значении «как» — предлог. Если like значит «любить» и меняется (likes), это глагол.',
      variants: [
        { s: 'We_P {like_V} this_D café_N .', tr: 'Нам нравится это кафе.', q: Q, answer: VERB, options: [PREP, NOUN], why: 'like = «нравиться»: у него есть подлежащее We, и другого глагола нет. Это глагол.' },
        { s: 'She_P looks_V {like_I} her_P mother_N .', tr: 'Она похожа на маму.', q: Q, answer: PREP, options: [VERB, ADV], why: 'Здесь like — «как, похоже на». Оно связывает she с her mother, и глагол уже есть — looks.' },
        { s: 'He_P sings_V {like_I} a_D professional_N .', tr: 'Он поёт как профессионал.', q: Q, answer: PREP, options: [VERB, ADV] },
      ],
    },
    {
      id: 'pos-map.to',
      mode: 'choice',
      skill: 'to: частица перед глаголом или предлог перед существительным',
      focus: 'part',
      why: 'to + глагол (to go) — частица. to + существительное или местоимение (to the station, to him) — предлог.',
      variants: [
        { s: 'We_P want_V {to_X} go_V home_R .', tr: 'Мы хотим пойти домой.', q: Q, answer: PART, options: [PREP, CONJ], why: 'За to идёт глагол go — частица.' },
        { s: 'Anna_N walks_V {to_I} the_D station_N .', tr: 'Анна ходит на станцию пешком.', q: Q, answer: PREP, options: [PART, ADV], why: 'За to идёт существительное station с артиклем — предлог.' },
        { s: 'Max_N tried_V {to_X} open_V the_D door_N .', tr: 'Макс попытался открыть дверь.', q: Q, answer: PART, options: [PREP, ADV] },
      ],
    },
    {
      id: 'pos-map.be-have',
      mode: 'choice',
      skill: 'be и have: смысловой глагол, если один; иначе вспомогательный',
      focus: 'aux',
      why: 'Нет другого глагола — be / have смысловые. Стоят перед другим глаголом (is reading) — вспомогательные.',
      variants: [
        { s: 'Anna_N {is_V} a_D nurse_N .', tr: 'Анна — медсестра.', q: Q, answer: VERB, options: [AUX, NOUN], why: 'Другого глагола нет, is — единственный и значит «является».' },
        { s: 'Anna_N {is_A} reading_V a_D book_N .', tr: 'Анна читает книгу.', q: Q, answer: AUX, options: [VERB, NOUN], why: 'Смысл несёт reading, а is только помогает показать «происходит сейчас».' },
        { s: 'We_P {have_V} a_D big_J flat_N .', tr: 'У нас большая квартира.', q: Q, answer: VERB, options: [AUX, ADJ], why: 'Другого глагола нет: have здесь смысловой («иметь»).' },
        { s: 'We_P {have_A} finished_V the_D project_N .', tr: 'Мы закончили проект.', q: Q, answer: AUX, options: [VERB, ADJ], why: 'Смысл несёт finished, а have только помогает построить Present Perfect — вспомогательный.' },
      ],
    },
    {
      id: 'pos-map.ly',
      mode: 'choice',
      skill: 'Слово на -ly не всегда наречие: friendly, lovely — прилагательные',
      focus: 'adj',
      why: 'Проверяй по роли, а не по окончанию: friendly и lovely отвечают «какой?» (прилагательные), quickly — «как?» (наречие).',
      variants: [
        { s: 'Our_P neighbour_N is_V very_R {friendly_J} .', tr: 'Наш сосед очень дружелюбный.', q: Q, answer: ADJ, options: [ADV, NOUN], why: 'Какой сосед? — friendly. Несмотря на -ly, это прилагательное.' },
        { s: 'The_D bus_N came_V {quickly_R} .', tr: 'Автобус приехал быстро.', q: Q, answer: ADV, options: [ADJ, NOUN] },
        { s: 'This_D is_V a_D {lovely_J} room_N .', tr: 'Это прекрасная комната.', q: Q, answer: ADJ, options: [ADV, NOUN], why: 'Какая комната? — lovely. Описывает существительное, значит прилагательное.' },
      ],
    },
    {
      id: 'pos-map.pick-adj',
      mode: 'pick',
      skill: 'Найти все прилагательные в предложении',
      focus: 'adj',
      why: 'Прилагательные отвечают на «какой?» и описывают существительное. Остальные слова — не они.',
      variants: [
        { s: 'The_D {old_J} house_N has_V a_D {big_J} garden_N .', tr: 'У старого дома большой сад.', q: 'Найди все прилагательные' },
        { s: 'Tom_N bought_V a_D {red_J} jacket_N and_C {warm_J} gloves_N .', tr: 'Том купил красную куртку и тёплые перчатки.', q: 'Найди все прилагательные' },
        { s: 'The_D soup_N is_V {hot_J} and_C {tasty_J} .', tr: 'Суп горячий и вкусный.', q: 'Найди все прилагательные' },
      ],
    },
    {
      id: 'pos-map.pick-same',
      mode: 'pick',
      skill: 'Найти слово той же части речи, что в образце',
      focus: 'questions',
      why: 'Сравни роль, а не значение: у слов могут быть разные смыслы, но та же часть речи.',
      variants: [
        { model: 'She_P speaks_V {slowly_R} .', s: 'Tom_N {always_R} arrives_V at_I nine_M .', tr: 'Том всегда приходит в девять.', q: 'Найди слово той же части речи, что выделено в образце', why: 'slowly и always — наречия: отвечают «как?» и «как часто?» при глаголе.' },
        { model: 'I_P live_V {in_I} Leeds_N .', s: 'The_D shoes_N are_V {under_I} the_D bed_N .', tr: 'Туфли под кроватью.', q: 'Найди слово той же части речи, что выделено в образце', why: 'in и under — предлоги: они ведут к существительному.' },
        { model: 'Kate_N {can_A} swim_V .', s: 'Max_N {must_A} leave_V now_R .', tr: 'Макс должен уйти сейчас.', q: 'Найди слово той же части речи, что выделено в образце', why: 'can и must — модальные глаголы: они стоят перед смысловым глаголом.' },
      ],
    },
    {
      id: 'pos-map.tag-basic',
      mode: 'tag',
      skill: 'Раскрасить простое предложение целиком',
      focus: 'questions',
      why: 'Иди слева направо и у каждого слова спрашивай: кто? какой? что делает? как? где?',
      variants: [
        { s: 'My_P sister_N works_V in_I a_D big_J bank_N .', tr: 'Моя сестра работает в большом банке.' },
        { s: 'Tom_N and_C Kate_N often_R visit_V their_P friends_N .', tr: 'Том и Кейт часто навещают своих друзей.' },
        { s: 'We_P don’t_A have_V any_D milk_N today_R .', tr: 'Сегодня у нас нет молока.' },
      ],
    },
    {
      id: 'pos-map.tag-mixed',
      mode: 'tag',
      skill: 'Раскрасить предложение со словами в разных ролях',
      focus: 'questions',
      why: 'Смотри на роль: book после can — глагол, hard после works — наречие, isn’t перед going — вспомогательный.',
      variants: [
        { s: 'I_P can_A book_V a_D table_N for_I two_M people_N .', tr: 'Я могу забронировать столик на двоих.' },
        { s: 'She_P works_V hard_R because_C she_P wants_V to_X buy_V a_D house_N .', tr: 'Она усердно работает, потому что хочет купить дом.' },
        { s: 'That_D woman_N is_V very_R tired_J , but_C she_P isn’t_A going_V home_R .', tr: 'Та женщина очень устала, но не идёт домой.' },
      ],
    },
  ],
} satisfies TopicBody
