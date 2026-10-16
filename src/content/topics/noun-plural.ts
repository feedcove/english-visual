import type { TopicBody } from '../types'

export default {
  summary: 'Обычно к существительному добавляют -s. После s, x, ch, sh — -es, после согласной + y — -ies. Есть особые слова: men, children, people.',
  ref: [
    { kind: 'visual', visual: { id: 'plural-rules', focus: 's' }, caption: 'Лента правил: смотри на конец слова' },
    {
      kind: 'rule',
      title: '-s и -es',
      text: 'К большинству слов просто добавляем -s: cat → cats, book → books. После s, x, ch, sh добавляем -es, и слышен лишний слог: bus → buses, box → boxes, watch → watches, dish → dishes.',
      examples: [
        { s: 'Anna_N has_V four_M boxes_N .', tr: 'У Анны четыре коробки.' },
        { s: 'There_P are_V two_M buses_N and_C three_M taxis_N .', tr: 'Там стоят два автобуса и три такси.' },
      ],
    },
    {
      kind: 'rule',
      title: 'y, f и o в конце',
      text: 'Согласная + y → -ies: city → cities. Гласная + y → просто -s: day → days. На f / fe часто → -ves: knife → knives, shelf → shelves. На o: tomato → tomatoes, но photo → photos, piano → pianos.',
      examples: [
        { s: 'I_P visited_V two_M cities_N .', tr: 'Я побывал в двух городах.' },
        { s: 'We_P had_V five_M days_N in_I Rome_N .', tr: 'У нас было пять дней в Риме.' },
        { s: 'The_D knives_N are_V in_I the_D drawer_N .', tr: 'Ножи лежат в ящике.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Особые формы',
      text: 'Часть слов меняется не по правилам: man → men, woman → women, child → children, person → people, foot → feet, tooth → teeth, mouse → mice. Sheep, fish и deer не меняются вообще: one sheep, two sheep.',
      examples: [
        { s: 'Three_M men_N and_C two_M women_N work_V here_R .', tr: 'Здесь работают трое мужчин и две женщины.' },
        { s: 'The_D children_N saw_V some_D sheep_N .', tr: 'Дети увидели овец.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Только множественное число',
      text: 'Парные предметы всегда стоят во множественном числе: trousers, jeans, glasses, scissors. К ним подходят are и these / those. Слова people и police тоже множественные: the police are here.',
      examples: [
        { s: 'My_P jeans_N are_V new_J .', tr: 'Мои джинсы новые.' },
        { s: 'The_D people_N next~door_R are_V friendly_J .', tr: 'Соседи дружелюбные.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'На_I столе_N три_M книги_N .',
      en: 'There_P are_V three_M books_N on_I the_D table_N .',
      note: 'В русском форма зависит от числа: одна книга, две книги, пять книг. В английском проще: один предмет без -s, а любое другое количество — с -s: one book, two books, five books.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'two_M childs_N', right: 'two_M children_N', note: 'Child — особая форма: children.' },
        { wrong: 'two_M womans_N', right: 'two_M women_N', note: 'Man → men, woman → women.' },
        { wrong: 'two_M citys_N', right: 'two_M cities_N', note: 'Согласная + y → ies.' },
        { wrong: 'Twenty_M sheeps_N', right: 'Twenty_M sheep_N', note: 'Sheep не меняется.' },
        { wrong: 'My_P trousers_N is_V new_J .', right: 'My_P trousers_N are_V new_J .', note: 'Trousers — только множественное число.' },
        { wrong: 'The_D police_N is_V here_R .', right: 'The_D police_N are_V here_R .', note: 'Police — множественное число.' },
      ],
    },
  ],
  items: [
    {
      id: 'noun-plural.s',
      skill: 'Обычное правило: +s — book → books',
      focus: 's',
      why: 'Большинство существительных просто получают -s: cat → cats, bag → bags, book → books.',
      variants: [
        { s: 'I_P bought_V three_M [books_N] yesterday_R .', tr: 'Вчера я купил три книги.', options: ['book', 'bookes'] },
        { s: 'There_P are_V two_M [bags_N] under_I the_D table_N .', tr: 'Под столом две сумки.', options: ['bag', 'bages'] },
        { s: 'Anna_N has_V five_M [cats_N] .', tr: 'У Анны пять кошек.', options: ['cat', 'cates'] },
      ],
    },
    {
      id: 'noun-plural.es',
      skill: 'После s, x, ch, sh — +es: box → boxes',
      focus: 'es',
      why: 'После s, x, ch, sh добавляем -es: так слышно окончание. Box → boxes, watch → watches.',
      variants: [
        { s: 'We_P need_V six_M [boxes_N] for_I the_D move_N .', tr: 'Нам нужно шесть коробок для переезда.', options: ['boxs', 'box'] },
        {
          s: 'There_P are_V two_M [buses_N] to_I the_D city_N centre_N .',
          tr: 'В центр города идут два автобуса.',
          options: ['buss', 'bus'],
        },
        { s: 'She_P collects_V old_J [watches_N] .', tr: 'Она коллекционирует старые часы.', options: ['watchs', 'watch'] },
      ],
    },
    {
      id: 'noun-plural.es-o',
      skill: 'tomato → tomatoes, potato → potatoes: после o — +es',
      focus: 'es',
      why: 'После o часто нужно -es: tomatoes, potatoes, heroes. Но photo → photos, piano → pianos.',
      variants: [
        { s: 'Kate_N bought_V some_D [tomatoes_N] at_I the_D market_N .', tr: 'Кейт купила на рынке помидоры.', options: ['tomatos', 'tomatoe'] },
        { s: 'We_P had_V roast_J [potatoes_N] for_I dinner_N .', tr: 'На ужин у нас была запечённая картошка.', options: ['potatos', 'potatoe'] },
        { s: 'The_D film_N has_V three_M [heroes_N] .', tr: 'В фильме три героя.', options: ['heros', 'heroe'] },
      ],
    },
    {
      id: 'noun-plural.o-s',
      skill: 'photo → photos, piano → pianos: тут только +s',
      focus: 's',
      why: 'Короткие и «международные» слова на o берут просто -s: photos, pianos, kilos.',
      variants: [
        { s: 'I_P took_V a~lot~of_D [photos_N] on_I holiday_N .', tr: 'В отпуске я наснимал много фотографий.', options: ['photoes', 'photo'] },
        { s: 'There_P are_V two_M [pianos_N] in_I the_D school_N .', tr: 'В школе два пианино.', options: ['pianoes', 'piano'] },
        { s: 'I_P bought_V two_M [kilos_N] of_I apples_N .', tr: 'Я купил два килограмма яблок.', options: ['kiloes', 'kilo'] },
      ],
    },
    {
      id: 'noun-plural.ies',
      skill: 'Согласная + y → ies: city → cities',
      focus: 'ies',
      why: 'Если перед y стоит согласная, y меняется на -ies: city → cities, story → stories.',
      variants: [
        { s: 'London_N and_C Paris_N are_V big_J [cities_N] .', tr: 'Лондон и Париж — большие города.', options: ['citys', 'cityes'] },
        { s: 'There_P are_V two_M [babies_N] in_I the_D photo_N .', tr: 'На фото два малыша.', options: ['babys', 'babyes'] },
        { s: 'The_D children_N love_V [stories_N] .', tr: 'Дети любят сказки.', options: ['storys', 'story'] },
      ],
    },
    {
      id: 'noun-plural.ys',
      skill: 'Гласная + y → просто +s: day → days, key → keys',
      focus: 's',
      why: 'Если перед y стоит гласная (a, e, o), y не меняется: day → days, key → keys, boy → boys.',
      variants: [
        { s: 'We_P stayed_V there_R for_I five_M [days_N] .', tr: 'Мы пробыли там пять дней.', options: ['daies', 'dayes'] },
        { s: 'I_P lost_V my_P [keys_N] again_R .', tr: 'Я опять потерял ключи.', options: ['kies', 'keyes'] },
        { s: 'The_D two_M [boys_N] are_V in_I the_D garden_N .', tr: 'Оба мальчика в саду.', options: ['boies', 'boyes'] },
      ],
    },
    {
      id: 'noun-plural.ves',
      skill: 'f / fe → ves: knife → knives, shelf → shelves',
      focus: 'ves',
      why: 'Многие слова на f / fe меняют окончание на -ves: knife → knives, shelf → shelves, leaf → leaves.',
      variants: [
        { s: 'We_P need_V new_J [knives_N] for_I the_D kitchen_N .', tr: 'Нам нужны новые ножи для кухни.', options: ['knifes', 'knifs'] },
        { s: 'Put_V the_D books_N on_I the_D [shelves_N] .', tr: 'Поставь книги на полки.', options: ['shelfs', 'shelfes'] },
        { s: 'Autumn_N is_V here_R . The_D [leaves_N] are_V yellow_J .', tr: 'Пришла осень. Листья жёлтые.', options: ['leafs', 'leafes'] },
      ],
    },
    {
      id: 'noun-plural.man-woman',
      skill: 'man → men, woman → women',
      focus: 'irregular',
      why: 'Man и woman меняют гласную: men, women. Окончания -s нет.',
      variants: [
        { s: 'Three_M [men_N] are_A waiting_V outside_R .', tr: 'Трое мужчин ждут снаружи.', options: ['mans', 'mens'] },
        { s: 'Two_M [women_N] work_V in_I our_P office_N .', tr: 'В нашем офисе работают две женщины.', options: ['womans', 'womens'] },
        { s: 'The_D [men_N] in_I the_D photo_N are_V my_P uncles_N .', tr: 'Мужчины на фото — мои дяди.', options: ['mans', 'mens'] },
      ],
    },
    {
      id: 'noun-plural.children',
      skill: 'child → children',
      focus: 'irregular',
      why: 'Child — особый случай: children, а не childs.',
      variants: [
        { s: 'Anna_N has_V three_M [children_N] .', tr: 'У Анны трое детей.', options: ['childs', 'childes'] },
        { s: 'The_D [children_N] are_V in_I the_D park_N .', tr: 'Дети в парке.', options: ['childs', 'childrens'] },
        { s: 'We_P took_V the_D [children_N] to_I the_D zoo_N .', tr: 'Мы повели детей в зоопарк.', options: ['childs', 'childrens'] },
      ],
    },
    {
      id: 'noun-plural.people',
      skill: 'person → people (people — уже множественное число)',
      focus: 'irregular',
      why: 'Множественное от person — people. Это слово уже множественное, -s не нужен.',
      variants: [
        { s: 'There_P are_V five_M [people_N] in_I the_D queue_N .', tr: 'В очереди пять человек.', options: ['person', 'peoples'] },
        { s: 'Ten_M [people_N] came_V to_I the_D party_N .', tr: 'На вечеринку пришло десять человек.', options: ['person', 'peoples'] },
        { s: 'Four_M [people_N] live_V in_I our_P flat_N .', tr: 'В нашей квартире живут четыре человека.', options: ['person', 'peoples'] },
      ],
    },
    {
      id: 'noun-plural.vowel-change',
      skill: 'foot → feet, tooth → teeth, mouse → mice',
      focus: 'irregular',
      why: 'Эти слова меняют гласную внутри: feet, teeth, mice. Окончания -s нет.',
      variants: [
        { s: 'My_P [feet_N] are_V cold_J .', tr: 'У меня замёрзли ноги.', options: ['foots', 'feets'] },
        { s: 'Brush_V your_P [teeth_N] twice_R a_D day_N .', tr: 'Чисти зубы два раза в день.', options: ['tooths', 'teeths'] },
        { s: 'Our_P cat_N caught_V two_M [mice_N] .', tr: 'Наш кот поймал двух мышей.', options: ['mouses', 'mices'] },
      ],
    },
    {
      id: 'noun-plural.same-form',
      skill: 'sheep, deer, fish — не меняются',
      focus: 'same',
      why: 'Sheep, deer и fish одинаковые в единственном и во множественном числе: one sheep, two sheep.',
      variants: [
        { s: 'There_P are_V twenty_M [sheep_N] in_I the_D field_N .', tr: 'В поле двадцать овец.', options: ['sheeps', 'sheepes'] },
        { s: 'We_P saw_V some_D [deer_N] in_I the_D park_N .', tr: 'В парке мы видели нескольких оленей.', options: ['deers', 'deeres'] },
        { s: 'Tom_N caught_V three_M [fish_N] .', tr: 'Том поймал трёх рыб.', options: ['fishs'] },
      ],
    },
    {
      id: 'noun-plural.plural-only',
      skill: 'jeans, glasses, scissors — только мн. ч.: are',
      focus: 'irregular',
      why: 'Парные предметы (jeans, trousers, glasses, scissors) всегда во множественном числе: они are, а не is.',
      variants: [
        { s: 'Your_P new_J jeans_N [are_V] very_R nice_J .', tr: 'Твои новые джинсы очень красивые.', options: ['is'] },
        { s: 'Where_R [are_V] my_P glasses_N ?', tr: 'Где мои очки?', options: ['is'] },
        { s: 'These_D scissors_N [are_V] very_R sharp_J .', tr: 'Эти ножницы очень острые.', options: ['is'] },
      ],
    },
    {
      id: 'noun-plural.people-police',
      skill: 'people и police — глагол во мн. ч.: are',
      focus: 'irregular',
      why: 'People и police — множественное число, хотя -s нет: the people are, the police are.',
      variants: [
        { s: 'These_D people_N [are_V] my_P colleagues_N .', tr: 'Эти люди — мои коллеги.', options: ['is'] },
        { s: 'People_N [are_V] very_R friendly_J here_R .', tr: 'Люди здесь очень дружелюбные.', options: ['is'] },
        { s: 'The_D police_N [are_V] near_I the_D station_N .', tr: 'Полиция возле вокзала.', options: ['is'] },
      ],
    },
    {
      id: 'noun-plural.order',
      mode: 'order',
      skill: 'Собрать: число + существительное во мн. ч.',
      focus: 's',
      why: 'После числа (two, three, six) существительное стоит во множественном числе.',
      variants: [
        { s: 'I_P need_V two_M new_J brushes_N .', tr: 'Мне нужны две новые щётки.', options: ['brush', 'brushs'] },
        { s: 'We_P have_V two_M children_N .', tr: 'У нас двое детей.', options: ['childs', 'child'] },
        { s: 'Ben_N has_V two_M dogs_N .', tr: 'У Бена две собаки.', options: ['dog', 'doges'] },
      ],
    },
    {
      id: 'noun-plural.pick-plural',
      mode: 'pick',
      skill: 'Найти существительное во множественном числе',
      focus: 's',
      why: 'Множественное число видно по окончанию (-s, -es, -ies) или по особой форме (children, men).',
      variants: [
        {
          s: 'Anna_N bought_V two_M {tomatoes_N} and_C a_D lemon_N .',
          q: 'Найди существительное во множественном числе',
          tr: 'Анна купила два помидора и лимон.',
          model: 'Tom_N has_V three_M {pens_N} .',
        },
        {
          s: 'The_D {children_N} are_A playing_V football_N .',
          q: 'Найди существительное во множественном числе',
          tr: 'Дети играют в футбол.',
          model: 'The_D {men_N} are_V at_I the_D door_N .',
        },
        {
          s: 'Lucy_N put_V the_D {books_N} on_I the_D shelf_N .',
          q: 'Найди существительное во множественном числе',
          tr: 'Люси поставила книги на полку.',
          model: 'Max_N sold_V his_P {bikes_N} .',
        },
      ],
    },
  ],
} satisfies TopicBody
