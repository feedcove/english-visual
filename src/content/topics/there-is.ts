import type { TopicBody } from '../types'

export default {
  summary: 'Сообщаем, что что-то есть: There is + один предмет, There are + несколько. О том, что уже известно, — it is.',
  ref: [
    { kind: 'visual', visual: { id: 'there-it', focus: 'there' }, caption: 'Слева — there is: «где-то что-то есть». Справа — it is: о том, что уже известно' },
    {
      kind: 'rule',
      title: 'There is — один, there are — несколько',
      text: 'Чтобы сказать, что что-то есть, начинаем с there. Дальше is или are — по существительному, которое стоит сразу за ним. Место называем в конце. Если перечисляем, ориентир — первое слово: There is a pen and two books.',
      examples: [
        { s: 'There_P is_V a_D table_N in_I the_D room_N .', tr: 'В комнате есть стол.' },
        { s: 'There_P are_V two_M chairs_N in_I the_D kitchen_N .', tr: 'На кухне два стула.' },
        { s: 'There_P is_V a_D pen_N and_C two_M books_N on_I the_D desk_N .', tr: 'На столе ручка и две книги.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Нет, вопрос, прошлое',
      text: 'Нет: There isn’t / There aren’t + any. Вопрос: be выходит вперёд — Is there…? Are there…? Короткий ответ: Yes, there is. / No, there isn’t. Прошлое: there was (один), there were (несколько).',
      examples: [
        { s: 'There_P aren’t_V any_D shops_N here_R .', tr: 'Здесь нет магазинов.' },
        { s: 'Is_V there_P a_D bank_N near_I here_R ?', tr: 'Здесь рядом есть банк?' },
        { s: 'There_P were_V five_M people_N at_I the_D meeting_N .', tr: 'На встрече было пять человек.' },
      ],
    },
    {
      kind: 'rule',
      title: 'There или it',
      text: 'There is — новость: что-то есть. It is — речь о том, что уже названо, а ещё о погоде, времени и расстоянии. Часто они идут парой: There is a cat in the garden. It is black.',
      examples: [
        { s: 'There_P is_V a_D cat_N in_I the_D garden_N . It_P is_V black_J .', tr: 'В саду кошка. Она чёрная.' },
        { s: 'It_P is_V cold_J today_R .', tr: 'Сегодня холодно.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'В_I комнате_N есть_V стол_N .',
      en: 'There_P is_V a_D table_N in_I the_D room_N .',
      note: 'По-русски сначала место, а предмет в конце. В английском впереди there, потом is, потом предмет и только потом место. Без there так не говорят.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'In_I the_D room_N is_V a_D table_N .', right: 'There_P is_V a_D table_N in_I the_D room_N .', note: 'Впереди there, место в конце.' },
        { wrong: 'There_P is_V two_M chairs_N in_I the_D kitchen_N .', right: 'There_P are_V two_M chairs_N in_I the_D kitchen_N .', note: 'Несколько предметов — are.' },
        { wrong: 'There_P isn’t_V no_D milk_N .', right: 'There_P isn’t_V any_D milk_N .', note: 'Одно отрицание: isn’t any или is no.' },
        { wrong: 'There_P is_V cold_J today_R .', right: 'It_P is_V cold_J today_R .', note: 'Погода — it is, а не there is.' },
      ],
    },
    { kind: 'tip', text: 'Хочешь сказать «где-то что-то есть» — начни с There is / There are, а место поставь в конец. Хочешь описать то, что уже названо, — it is.' },
  ],
  items: [
    {
      id: 'there-is.singular',
      skill: 'There is — когда предмет один',
      focus: 'there',
      why: 'За there стоит один предмет — значит is. Не has: «есть» по-английски передаёт there is.',
      variants: [
        { s: 'There_P [is_V] a_D post_N office_N near_I here_R .', tr: 'Здесь рядом есть почта.', options: ['are', 'has'] },
        { s: 'There_P [is_V] a_D big_J supermarket_N in_I our_P street_N .', tr: 'На нашей улице есть большой супермаркет.', options: ['are', 'has'] },
        { s: 'Look_V ! There_P [is_V] a_D cat_N on_I the_D roof_N .', tr: 'Смотри! На крыше кошка.', options: ['are', 'has'] },
      ],
    },
    {
      id: 'there-is.plural',
      skill: 'There are — когда предметов несколько',
      focus: 'there-plural',
      why: 'За there стоит несколько предметов — значит are.',
      variants: [
        { s: 'There_P [are_V] five_M computers_N in_I the_D office_N .', tr: 'В офисе пять компьютеров.', options: ['is', 'has'] },
        { s: 'There_P [are_V] some_D apples_N in_I the_D fridge_N .', tr: 'В холодильнике есть яблоки.', options: ['is', 'has'] },
        { s: 'There_P [are_V] a~lot~of_D shops_N in_I the_D centre_N .', tr: 'В центре много магазинов.', options: ['is', 'has'] },
      ],
    },
    {
      id: 'there-is.first-noun',
      skill: 'is или are — по первому предмету в списке',
      focus: 'there-plural',
      why: 'Согласуем с первым существительным после there: есть ноутбук и телефоны — is; чашки и тарелка — are.',
      variants: [
        { s: 'There_P [is_V] a_D laptop_N and_C two_M phones_N on_I the_D desk_N .', tr: 'На столе ноутбук и два телефона.', options: ['are', 'has'] },
        { s: 'There_P [are_V] two_M cups_N and_C a_D plate_N on_I the_D shelf_N .', tr: 'На полке две чашки и тарелка.', options: ['is', 'has'] },
        { s: 'There_P [is_V] a_D bag_N and_C two_M umbrellas_N in_I the_D hall_N .', tr: 'В прихожей сумка и два зонта.', options: ['are', 'has'] },
      ],
    },
    {
      id: 'there-is.not-any',
      skill: 'Нет: There isn’t / aren’t + any',
      focus: 'there',
      why: 'После isn’t / aren’t нужно any. Some и no здесь не подходят.',
      variants: [
        { s: 'There_P isn’t_V [any_D] milk_N in_I the_D fridge_N .', tr: 'В холодильнике нет молока.', options: ['some', 'no'] },
        { s: 'There_P aren’t_V [any_D] shops_N in_I our_P village_N .', tr: 'В нашей деревне нет магазинов.', options: ['some', 'no'] },
        { s: 'There_P isn’t_V [any_D] sugar_N in_I my_P tea_N .', tr: 'В моём чае нет сахара.', options: ['some', 'no'] },
      ],
    },
    {
      id: 'there-is.no',
      skill: 'There is no… — отрицание уже в слове no',
      focus: 'there',
      why: 'There is no = There isn’t any. Отрицание одно: no без isn’t, any без no.',
      variants: [
        { s: 'There_P is_V [no_D] bus_N on_I Sundays_N .', tr: 'По воскресеньям автобуса нет.', options: ['any', 'none'] },
        { s: 'There_P are_V [no_D] clean_J cups_N in_I the_D kitchen_N .', tr: 'На кухне нет чистых чашек.', options: ['any', 'none'] },
        { s: 'Sorry , there_P is_V [no_D] time_N today_R .', tr: 'Извини, сегодня времени нет.', options: ['any', 'none'] },
      ],
    },
    {
      id: 'there-is.question',
      skill: 'Вопрос: Is there…? Are there…?',
      focus: 'there',
      why: 'Вопрос: be выходит вперёд, there остаётся за ним. Do и does не нужны.',
      variants: [
        { s: '[Is_V] there_P a_D toilet_N on_I this_D floor_N ?', tr: 'На этом этаже есть туалет?', options: ['Are', 'Does'] },
        { s: '[Are_V] there_P any_D free_J seats_N on_I this_D train_N ?', tr: 'В этом поезде есть свободные места?', options: ['Is', 'Do'] },
        { s: '[Is_V] there_P a_D good_J restaurant_N near_I your_P hotel_N ?', tr: 'Рядом с твоим отелем есть хороший ресторан?', options: ['Are', 'Does'] },
      ],
    },
    {
      id: 'there-is.short-answer',
      skill: 'Короткий ответ: Yes, there is. / No, there isn’t.',
      focus: 'there',
      why: 'В коротком ответе повторяем there и be: there is, there isn’t, there are, there aren’t.',
      variants: [
        { s: 'Is_V there_P a_D shop_N here_R ? — Yes, there_P [is_V] .', tr: 'Здесь есть магазин? — Да, есть.', options: ['does', 'has'] },
        { s: 'Are_V there_P any_D eggs_N ? — No, there_P [aren’t_V] .', tr: 'Яйца есть? — Нет.', options: ['isn’t', 'don’t'] },
        { s: 'Is_V there_P a_D night_N bus_N ? — No, there_P [isn’t_V] .', tr: 'Ночной автобус есть? — Нет.', options: ['aren’t', 'doesn’t'] },
      ],
    },
    {
      id: 'there-is.past',
      skill: 'Прошлое: there was / there were',
      focus: 'there',
      why: 'В прошлом is → was, are → were. Один предмет — was, несколько — were.',
      variants: [
        { s: 'There_P [was_V] a_D long_J queue_N at_I the_D bank_N yesterday_R .', tr: 'Вчера в банке была длинная очередь.', options: ['were', 'is'] },
        { s: 'There_P [were_V] a~lot~of_D people_N at_I the_D party_N .', tr: 'На вечеринке было много людей.', options: ['was', 'are'] },
        { s: 'There_P [was_V] a_D problem_N with_I my_P laptop_N last_J night_N .', tr: 'Вчера вечером с моим ноутбуком была проблема.', options: ['were', 'is'] },
      ],
    },
    {
      id: 'there-is.place-first',
      skill: 'Место в начале — всё равно there is / there are',
      focus: 'there',
      why: 'Даже если начать с места, there остаётся: In the room there is a table. Без there предложение не получится.',
      variants: [
        { s: 'In_I our_P street_N [there_P] is_V a_D big_J park_N .', tr: 'На нашей улице есть большой парк.', options: ['it', 'they'] },
        { s: 'In_I my_P bag_N [there_P] are_V two_M bottles_N of_I water_N .', tr: 'В моей сумке две бутылки воды.', options: ['it', 'they'] },
        { s: 'On_I the_D shelf_N [there_P] is_V a_D lamp_N .', tr: 'На полке стоит лампа.', options: ['it', 'this'] },
      ],
    },
    {
      id: 'there-is.it-known',
      skill: 'Уже названное — it is, а не there is',
      focus: 'it',
      why: 'Когда предмет уже назван, говорим о нём it: There is a cat. It is black. Для вещей he и she не нужны.',
      variants: [
        { s: 'I_P bought_V a_D new_J phone_N . [It_P] is_V very_R fast_J .', tr: 'Я купил новый телефон. Он очень быстрый.', options: ['There', 'He'] },
        { s: 'There_P is_V a_D restaurant_N on_I the_D corner_N . [It_P] is_V Italian_J .', tr: 'На углу есть ресторан. Он итальянский.', options: ['There', 'He'] },
        { s: 'I_P like_V this_D jacket_N . [It_P] is_V warm_J .', tr: 'Мне нравится эта куртка. Она тёплая.', options: ['There', 'She'] },
      ],
    },
    {
      id: 'there-is.it-weather',
      skill: 'Погода, время, расстояние — it is',
      focus: 'it',
      why: 'Про погоду, время и расстояние говорим it is. There is тут не нужен: это не «что-то есть».',
      variants: [
        { s: '[It_P] is_V cold_J and_C windy_J today_R .', tr: 'Сегодня холодно и ветрено.', options: ['There', 'He'] },
        { s: '[It_P] is_V nearly_R midnight_N .', tr: 'Уже почти полночь.', options: ['There', 'He'] },
        { s: '[It_P] is_V thirty_M miles_N from_I here_R to_I Oxford_N .', tr: 'Отсюда до Оксфорда тридцать миль.', options: ['There', 'They'] },
      ],
    },
    {
      id: 'there-is.order-question',
      mode: 'order',
      skill: 'Собрать вопрос: be — there — что — где',
      focus: 'there',
      why: 'В вопросе be стоит перед there: Is there…? Are there…? Was there…?',
      variants: [
        { s: 'Is_V there_P a_D café_N near_I the_D station_N ?', tr: 'Рядом с вокзалом есть кафе?', options: ['does', 'it'] },
        { s: 'Are_V there_P any_D shops_N in_I your_P street_N ?', tr: 'На вашей улице есть магазины?', options: ['do', 'is'] },
        { s: 'Was_V there_P a_D problem_N with_I the_D train_N ?', tr: 'С поездом была проблема?', options: ['did', 'were'] },
      ],
    },
  ],
} satisfies TopicBody
