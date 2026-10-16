import type { TopicBody } from '../types'

export default {
  summary: 'in — внутри, on — на поверхности, at — у точки; под, над, рядом, между, за, перед, напротив. Плюс блоки, которые не вычисляются по картинке: at home, in the car, on the bus, on the phone.',
  ref: [
    { kind: 'visual', visual: { id: 'prep-place', focus: 'in' }, caption: 'Три главных: in — внутри, on — на поверхности, at — в точке. Остальные показывают положение рядом' },
    {
      kind: 'rule',
      title: 'in, on, at: внутри, на, у точки',
      text: 'in — внутри чего-то со «стенками»: in the bag, in the kitchen, in London. on — на поверхности, касаясь её: on the table, on the wall. at — место как точка, где ждут или встречаются: at the door, at the bus stop, at the station.',
      examples: [
        { s: 'The_D milk_N is_V in_I the_D fridge_N .', tr: 'Молоко в холодильнике.' },
        { s: 'Your_P keys_N are_V on_I the_D shelf_N .', tr: 'Твои ключи на полке.' },
        { s: 'I_P +’ll_A meet_V you_P at_I the_D station_N .', tr: 'Встречу тебя на вокзале.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Положение рядом: under, above, between…',
      text: 'under — под, above (или over) — над, не касаясь. next to — рядом, between — между двумя, behind — за, in front of — перед, opposite — напротив, лицом к лицу.',
      examples: [
        { s: 'The_D dog_N is_V under_I the_D table_N .', tr: 'Собака под столом.' },
        { s: 'The_D lamp_N is_V between_I the_D bed_N and_C the_D window_N .', tr: 'Лампа стоит между кроватью и окном.' },
        { s: 'The_D bakery_N is_V opposite_I the_D cinema_N .', tr: 'Пекарня напротив кинотеатра.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Блоки, которые учат целиком',
      text: 'Часть сочетаний не выводится из картинки: at home, at work, at school (без the). В маленьком транспорте сидят in the car, in a taxi, а в большом ходят on the bus, on the train, on a plane. Ещё: on the phone, on TV, on the left, in the middle, in a photo, in the newspaper.',
      examples: [
        { s: 'My_P dad_N is_V at_I work_N .', tr: 'Мой папа на работе.' },
        { s: 'Ben_N always_R sleeps_V on_I the_D bus_N .', tr: 'Бен всегда спит в автобусе.' },
        { s: 'I_P heard_V it_P on_I the_D radio_N .', tr: 'Я услышал это по радио.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Он_P на_I кухне_N .',
      en: 'He_P is_V in_I the_D kitchen_N .',
      note: 'Русское «на» — не всегда on: на кухне = in the kitchen, на вокзале = at the station. Выбирай предлог по картинке (внутри, поверхность, точка), а не по русскому слову.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'Max_N is_V on_I the_D kitchen_N .', right: 'Max_N is_V in_I the_D kitchen_N .', note: 'Русское «на кухне» — это in the kitchen.' },
        { wrong: 'I_P +’m_V in_I the_D bus_N .', right: 'I_P +’m_V on_I the_D bus_N .', note: 'Автобус, поезд, самолёт — on.' },
        { wrong: 'She_P is_V in_I the_D work_N .', right: 'She_P is_V at_I work_N .', note: 'Работа, дом, школа — at и без the.' },
        { wrong: 'I_P saw_V him_P in_I the_D bus~stop_N .', right: 'I_P saw_V him_P at_I the_D bus~stop_N .', note: 'Остановка — это точка: at.' },
        { wrong: 'I_P read_V it_P on_I the_D newspaper_N .', right: 'I_P read_V it_P in_I the_D newspaper_N .', note: 'Газета, книга, фото — in.' },
      ],
    },
    { kind: 'tip', text: 'Представь картинку. Предмет внутри коробки — in. Лежит на поверхности — on. Стоит у точки на карте — at. Для привычных блоков картинка не нужна: просто запомни пару.' },
  ],
  items: [
    {
      id: 'prep-place.in-inside',
      skill: 'in — внутри чего-то: in the bag, in the kitchen',
      focus: 'in',
      why: 'Внутри чего-то со «стенками» — in: in the bag, in the kitchen, in a drawer.',
      variants: [
        { s: 'The_D keys_N are_V [in_I] my_P bag_N .', tr: 'Ключи у меня в сумке.', options: ['on', 'at'], accept: ['inside'] },
        { s: 'Anna_N is_V [in_I] the_D kitchen_N .', tr: 'Анна на кухне.', options: ['on', 'at'] },
        { s: 'Tom_N keeps_V his_P passport_N [in_I] a_D drawer_N .', tr: 'Том хранит паспорт в ящике.', options: ['on', 'at'], accept: ['inside'] },
      ],
    },
    {
      id: 'prep-place.in-city',
      skill: 'in — город, страна: in Leeds, in Spain',
      focus: 'in',
      why: 'Город и страна — как «коробка» побольше: in Leeds, in Spain. У точки на пути (вокзал, аэропорт) — at.',
      variants: [
        { s: 'My_P brother_N lives_V [in_I] Leeds_N .', tr: 'Мой брат живёт в Лидсе.', options: ['at', 'on'] },
        { s: 'We_P spent_V our_P holiday_N [in_I] Spain_N .', tr: 'Мы провели отпуск в Испании.', options: ['at', 'on'] },
        { s: 'Kate_N works_V [in_I] Bristol_N .', tr: 'Кейт работает в Бристоле.', options: ['at', 'on'] },
      ],
    },
    {
      id: 'prep-place.on-surface',
      skill: 'on — на поверхности: on the table, on the wall',
      focus: 'on',
      why: 'Лежит или висит на поверхности и касается её — on: on the table, on the wall, on the sofa.',
      variants: [
        { s: 'Your_P phone_N is_V [on_I] the_D table_N .', tr: 'Твой телефон на столе.', options: ['in', 'at'] },
        { s: 'There_P is_V a_D picture_N [on_I] the_D wall_N .', tr: 'На стене висит картина.', options: ['in', 'at'] },
        { s: 'The_D cat_N is_A sleeping_V [on_I] the_D sofa_N .', tr: 'Кошка спит на диване.', options: ['in', 'at'] },
      ],
    },
    {
      id: 'prep-place.at-point',
      skill: 'at — место как точка: at the door, at the bus stop',
      focus: 'at',
      why: 'Место как точка, где ждут или встречаются, — at: at the door, at the bus stop, at the traffic lights.',
      variants: [
        { s: 'Wait_V for_I me_P [at_I] the_D bus~stop_N .', tr: 'Подожди меня на остановке.', options: ['in', 'on'] },
        { s: 'Someone_P is_V [at_I] the_D door_N .', tr: 'Кто-то у двери.', options: ['in', 'on'] },
        { s: 'Tom_N is_A waiting_V [at_I] the_D traffic~lights_N .', tr: 'Том ждёт у светофора.', options: ['in', 'on'] },
      ],
    },
    {
      id: 'prep-place.under',
      skill: 'under — под чем-то',
      focus: 'under',
      why: 'under — под чем-то: under the bed, under a tree.',
      variants: [
        { s: 'The_D cat_N is_V [under_I] the_D bed_N .', tr: 'Кошка под кроватью.', options: ['on', 'above'] },
        { s: 'Your_P shoes_N are_V [under_I] the_D chair_N .', tr: 'Твои туфли под стулом.', options: ['on', 'above'] },
        { s: 'Tom_N parked_V his_P car_N [under_I] a_D tree_N .', tr: 'Том поставил машину под деревом.', options: ['on', 'above'] },
      ],
    },
    {
      id: 'prep-place.above-over',
      skill: 'above, over — над чем-то, не касаясь',
      focus: 'above',
      why: 'above и over — над чем-то, без касания. Если предмет касается поверхности — on.',
      variants: [
        { s: 'The_D clock_N is_V [above_I] the_D door_N .', tr: 'Часы над дверью.', options: ['under', 'on'], accept: ['over'] },
        { s: 'A_D plane_N is_A flying_V [over_I] our_P house_N .', tr: 'Над нашим домом летит самолёт.', options: ['under', 'at'], accept: ['above'] },
        { s: 'Lucy_N has_V a_D shelf_N [above_I] her_P desk_N .', tr: 'У Люси над столом полка.', options: ['under', 'at'], accept: ['over'] },
      ],
    },
    {
      id: 'prep-place.next-to',
      skill: 'next to — рядом, вплотную',
      focus: 'next-to',
      why: 'next to — рядом, вплотную: next to me, next to the window. Тот же смысл у beside.',
      variants: [
        { s: 'Sit_V [next~to_I] me_P , please_R .', tr: 'Сядь рядом со мной, пожалуйста.', options: ['between', 'opposite'], accept: ['beside', 'near'] },
        { s: 'The_D bank_N is_V [next~to_I] the_D post~office_N .', tr: 'Банк рядом с почтой.', options: ['between', 'behind'], accept: ['beside', 'near'] },
        { s: 'My_P desk_N is_V [next~to_I] the_D window_N .', tr: 'Мой стол рядом с окном.', options: ['between', 'behind'], accept: ['beside', 'near'] },
      ],
    },
    {
      id: 'prep-place.between',
      skill: 'between — между двумя',
      focus: 'between',
      why: 'between — между двумя предметами или людьми: between Tom and Anna.',
      variants: [
        { s: 'The_D café_N is_V [between_I] the_D bank_N and_C the_D library_N .', tr: 'Кафе между банком и библиотекой.', options: ['under', 'behind'] },
        { s: 'Tom_N is_A sitting_V [between_I] Anna_N and_C Kate_N .', tr: 'Том сидит между Анной и Кейт.', options: ['opposite', 'under'] },
        { s: 'There_P is_V a_D small_J garden_N [between_I] the_D two_M houses_N .', tr: 'Между двумя домами есть небольшой сад.', options: ['under', 'above'] },
      ],
    },
    {
      id: 'prep-place.behind',
      skill: 'behind — за чем-то, сзади',
      focus: 'behind',
      why: 'behind — за чем-то, сзади. Противоположное — in front of.',
      variants: [
        { s: 'The_D garden_N is_V [behind_I] the_D house_N .', tr: 'Сад за домом.', options: ['under', 'in front of'] },
        { s: 'Who_P is_A standing_V [behind_I] you_P ?', tr: 'Кто стоит за тобой?', options: ['between', 'in front of'] },
        { s: 'Tom_N hid_V the_D present_N [behind_I] the_D sofa_N .', tr: 'Том спрятал подарок за диваном.', options: ['on', 'between'] },
      ],
    },
    {
      id: 'prep-place.in-front-of',
      skill: 'in front of — перед чем-то, спереди',
      focus: 'in-front-of',
      why: 'in front of — перед чем-то, спереди. Три слова, но это один предлог.',
      variants: [
        { s: 'Wait_V for_I me_P [in~front~of_I] the_D cinema_N .', tr: 'Подожди меня перед кинотеатром.', options: ['behind', 'between'] },
        { s: 'There_P is_V a_D big_J tree_N [in~front~of_I] our_P house_N .', tr: 'Перед нашим домом большое дерево.', options: ['behind', 'above'] },
        { s: 'The_D teacher_N is_A standing_V [in~front~of_I] the_D class_N .', tr: 'Учитель стоит перед классом.', options: ['behind', 'under'] },
      ],
    },
    {
      id: 'prep-place.opposite',
      skill: 'opposite — напротив, лицом к лицу',
      focus: 'opposite',
      why: 'opposite — напротив, через улицу или стол. Не путай с next to — рядом.',
      variants: [
        { s: 'The_D supermarket_N is_V [opposite_I] the_D station_N .', tr: 'Супермаркет напротив вокзала.', options: ['next to', 'behind'] },
        { s: 'Anna_N sat_V [opposite_I] me_P at_I the_D table_N .', tr: 'Анна сидела напротив меня за столом.', options: ['next to', 'behind'] },
        { s: 'Our_P school_N is_V [opposite_I] the_D park_N .', tr: 'Наша школа напротив парка.', options: ['between', 'under'] },
      ],
    },
    {
      id: 'prep-place.chunk-at-home',
      skill: 'at home, at work, at university — блок с at, без the',
      why: 'Устойчивые блоки: at home, at work, at university. Артикля нет, предлог — at.',
      variants: [
        { s: 'Is_V your_P dad_N [at_I] home_N ?', tr: 'Твой папа дома?', options: ['in', 'on'] },
        { s: 'Kate_N is_V [at_I] work_N until_I six_M .', tr: 'Кейт на работе до шести.', options: ['in', 'on'] },
        { s: 'My_P sister_N is_V [at_I] university_N now_R .', tr: 'Моя сестра сейчас учится в университете.', options: ['in', 'on'] },
      ],
    },
    {
      id: 'prep-place.chunk-in-car',
      skill: 'in the car, in a taxi — маленький транспорт: in',
      why: 'В маленьком транспорте сидят «внутри»: in the car, in a taxi, in a van.',
      variants: [
        { s: 'The_D children_N are_A sitting_V [in_I] the_D car_N .', tr: 'Дети сидят в машине.', options: ['on', 'at'] },
        { s: 'We_P came_V home_R [in_I] a_D taxi_N .', tr: 'Мы приехали домой на такси.', options: ['on', 'by'] },
        { s: 'My_P dad_N always_R sings_V [in_I] the_D car_N .', tr: 'Мой папа всегда поёт в машине.', options: ['on', 'at'] },
      ],
    },
    {
      id: 'prep-place.chunk-on-bus',
      skill: 'on the bus, on the train, on a plane — большой транспорт: on',
      why: 'Автобус, поезд, самолёт — on: внутри можно встать и пройти по салону. Машина и такси — in.',
      variants: [
        { s: 'I_P usually_R read_V [on_I] the_D train_N .', tr: 'Я обычно читаю в поезде.', options: ['in', 'at'] },
        { s: 'There_P were_V a~lot~of_D people_N [on_I] the_D bus_N .', tr: 'В автобусе было много людей.', options: ['in', 'at'] },
        { s: 'Max_N slept_V [on_I] the_D plane_N .', tr: 'Макс спал в самолёте.', options: ['in', 'at'] },
      ],
    },
    {
      id: 'prep-place.chunk-left-right',
      skill: 'on the left, on the right, in the middle — устойчивые блоки',
      why: 'Стороны — on the left / on the right, середина — in the middle (of). Запомни блоком.',
      variants: [
        { s: 'The_D shop_N is_V [on_I] the_D left_N .', tr: 'Магазин слева.', options: ['in', 'at'] },
        { s: 'Our_P flat_N is_V [on_I] the_D right_N .', tr: 'Наша квартира справа.', options: ['in', 'at'] },
        { s: 'The_D box_N is_V [in_I] the_D middle_N of_I the_D room_N .', tr: 'Коробка посреди комнаты.', options: ['on', 'at'] },
      ],
    },
    {
      id: 'prep-place.chunk-on-phone',
      skill: 'on the phone, on TV, on the internet — канал связи: on',
      why: 'Канал связи или передачи — on: on the phone, on TV, on the radio, on the internet.',
      variants: [
        { s: 'Anna_N is_V [on_I] the_D phone_N .', tr: 'Анна разговаривает по телефону.', options: ['in', 'at'] },
        { s: 'I_P watched_V a_D good_J film_N [on_I] TV_N last_J night_N .', tr: 'Вчера вечером я смотрел хороший фильм по телевизору.', options: ['in', 'at'] },
        { s: 'You_P can_A find_V everything_P [on_I] the_D internet_N .', tr: 'Всё можно найти в интернете.', options: ['in', 'at'] },
      ],
    },
    {
      id: 'prep-place.chunk-in-photo',
      skill: 'in a photo, in the newspaper, in a book — картинка и текст: in',
      why: 'Изображение и текст — как «внутри»: in the photo, in the newspaper, in a book.',
      variants: [
        { s: 'Who_P is_V the_D woman_N [in_I] this_D photo_N ?', tr: 'Кто эта женщина на фото?', options: ['on', 'at'] },
        { s: 'I_P read_V about_I it_P [in_I] the_D newspaper_N .', tr: 'Я прочитал об этом в газете.', options: ['on', 'at'] },
        { s: 'There_P are_V a~lot~of_D pictures_N [in_I] this_D book_N .', tr: 'В этой книге много картинок.', options: ['on', 'at'] },
      ],
    },
    {
      id: 'prep-place.order',
      mode: 'order',
      skill: 'Собрать предложение: кто или что — где',
      why: 'Сначала подлежащее и глагол, потом место: The cat is sleeping under the table.',
      variants: [
        { s: 'The_D bike_N is_V behind_I the_D garage_N .', tr: 'Велосипед стоит за гаражом.', options: ['on', 'opposite'] },
        { s: 'Tom_N lives_V in_I a_D flat_N next~to_I the_D station_N .', tr: 'Том живёт в квартире рядом с вокзалом.', options: ['at', 'between'] },
        { s: 'Lucy_N sits_V between_I Max_N and_C Ben_N .', tr: 'Люси сидит между Максом и Беном.', accept: ['Lucy sits between Ben and Max .'], options: ['opposite', 'under'] },
      ],
    },
  ],
} satisfies TopicBody
