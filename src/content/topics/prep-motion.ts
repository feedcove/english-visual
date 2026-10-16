import type { TopicBody } from '../types'

export default {
  summary: 'to — к цели, into / out of — внутрь и наружу, onto / off — на и с, через, вдоль, мимо, к. Ловушки: go home без to, arrive in London / at the station, get on the bus, get into the car.',
  ref: [
    { kind: 'visual', visual: { id: 'prep-motion', focus: 'to' }, caption: 'Стрелка движения относительно ориентира: куда, откуда, сквозь, мимо' },
    {
      kind: 'rule',
      title: 'to, into, out of, from: куда и откуда',
      text: 'to — к цели: go to school. into — через границу внутрь: jump into the water. out of — наружу: come out of the house. from — откуда: a train from Paris.',
      examples: [
        { s: 'Lucy_N goes_V to_I the_D gym_N on_I Mondays_N .', tr: 'Люси ходит в спортзал по понедельникам.' },
        { s: 'Ben_N walked_V into_I the_D room_N .', tr: 'Бен вошёл в комнату.' },
        { s: 'Kate_N took_V the_D keys_N out~of_I her_P bag_N .', tr: 'Кейт достала ключи из сумки.' },
      ],
    },
    {
      kind: 'rule',
      title: 'onto, off, up, down: поверхность и уровень',
      text: 'onto — на поверхность, off — с поверхности. up — вверх по лестнице, холму, дереву; down — вниз. После них стоит существительное, поэтому это предлоги.',
      examples: [
        { s: 'Put_V the_D box_N onto_I the_D shelf_N .', tr: 'Поставь коробку на полку.' },
        { s: 'Anna_N took_V a_D book_N off_I the_D shelf_N .', tr: 'Анна сняла книгу с полки.' },
        { s: 'We_P walked_V down_I the_D hill_N .', tr: 'Мы спустились с холма.' },
      ],
    },
    {
      kind: 'rule',
      title: 'through, across, along, past, towards: путь',
      text: 'through — сквозь (тоннель, лес). across — поперёк (дорога, река). along — вдоль (улица, берег). past — мимо. towards — в сторону цели, ещё не дойдя.',
      examples: [
        { s: 'We_P drove_V through_I the_D city~centre_N .', tr: 'Мы проехали через центр города.' },
        { s: 'Anna_N ran_V across_I the_D street_N .', tr: 'Анна перебежала улицу.' },
        { s: 'Ben_N walked_V past_I the_D café_N .', tr: 'Бен прошёл мимо кафе.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Ловушки: home, arrive, get on / off',
      text: 'go home, come home, get home — без to: home здесь наречие. arrive in London, arrive at the station, не arrive to. На автобус, поезд, самолёт садятся get on и выходят get off; в машину и такси — get into и get out of.',
      examples: [
        { s: 'We_P went_V home_R by_I taxi_N .', tr: 'Мы поехали домой на такси.' },
        { s: 'Max_N arrived_V at_I the_D hotel_N at_I nine_M .', tr: 'Макс приехал в гостиницу в девять.' },
        { s: 'Lucy_N got_V on_I the_D train_N in_I Leeds_N .', tr: 'Люси села на поезд в Лидсе.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Я_P иду_V домой_R .',
      en: 'I_P +’m_A going_V home_R .',
      note: 'По-русски «домой» — одно слово, без предлога. В английском то же: home без to. А «иду в магазин» — I’m going to the shop.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I_P go_V to_I home_R .', right: 'I_P go_V home_R .', note: 'home — без to.' },
        { wrong: 'We_P arrived_V to_I London_N .', right: 'We_P arrived_V in_I London_N .', note: 'Город — arrive in, станция — arrive at.' },
        { wrong: 'We_P got_V into_I the_D train_N .', right: 'We_P got_V on_I the_D train_N .', note: 'Автобус, поезд — get on и get off.' },
        { wrong: 'Walk_V through_I the_D road_N .', right: 'Walk_V across_I the_D road_N .', note: 'Дорогу переходят across.' },
      ],
    },
  ],
  items: [
    {
      id: 'prep-motion.to',
      skill: 'to — к цели: go to work, drive to the station',
      focus: 'to',
      why: 'to — к цели, куда идём или едем: to work, to the shop, to the station.',
      variants: [
        { s: 'I_P walk_V [to_I] work_N every_D day_N .', tr: 'Я хожу на работу пешком каждый день.', options: ['into', 'at'] },
        { s: 'Anna_N is_A going_V [to_I] the_D shop_N .', tr: 'Анна идёт в магазин.', options: ['in', 'at'] },
        { s: 'Can_A you_P drive_V me_P [to_I] the_D station_N ?', tr: 'Ты можешь отвезти меня на вокзал?', options: ['at', 'in'] },
      ],
    },
    {
      id: 'prep-motion.home',
      skill: 'go home, come home, get home — без to',
      why: 'home здесь наречие («домой»), поэтому предлог не нужен: go home, come home, get home.',
      variants: [
        { s: 'I_P usually_R get_V [home_R] at_I six_M .', tr: 'Я обычно прихожу домой в шесть.', options: ['to home', 'at home'] },
        { s: 'It_P is_V late_J . I_P want_V to_X go_V [home_R] .', tr: 'Уже поздно. Я хочу домой.', options: ['to home', 'at home'] },
        { s: 'Tom_N came_V [home_R] very_R late_J .', tr: 'Том пришёл домой очень поздно.', options: ['to home', 'in home'] },
      ],
    },
    {
      id: 'prep-motion.into',
      skill: 'into — внутрь, через границу',
      focus: 'into',
      why: 'into — движение внутрь: into the water, into the bag, into the kitchen.',
      variants: [
        { s: 'Tom_N jumped_V [into_I] the_D water_N .', tr: 'Том прыгнул в воду.', options: ['onto', 'out of'], accept: ['in'] },
        { s: 'Kate_N put_V her_P phone_N [into_I] her_P bag_N .', tr: 'Кейт положила телефон в сумку.', options: ['onto', 'out of'], accept: ['in'] },
        { s: 'A_D bird_N flew_V [into_I] our_P kitchen_N .', tr: 'В нашу кухню влетела птица.', options: ['onto', 'out of'] },
      ],
    },
    {
      id: 'prep-motion.out-of',
      skill: 'out of — наружу, изнутри',
      focus: 'out-of',
      why: 'out of — движение изнутри наружу: out of the house, out of your pockets. Три слова — один предлог.',
      variants: [
        { s: 'The_D dog_N ran_V [out~of_I] the_D house_N .', tr: 'Собака выбежала из дома.', options: ['into', 'off'] },
        { s: 'Take_V your_P hands_N [out~of_I] your_P pockets_N !', tr: 'Вынь руки из карманов!', options: ['off', 'into'] },
        { s: 'The_D teacher_N came_V [out~of_I] the_D classroom_N .', tr: 'Учитель вышел из класса.', options: ['into', 'off'] },
      ],
    },
    {
      id: 'prep-motion.onto-off',
      skill: 'onto — на поверхность, off — с поверхности',
      focus: 'onto',
      why: 'onto — на поверхность (с движением), off — с неё. В onto часто можно сказать просто on.',
      variants: [
        { s: 'The_D cat_N jumped_V [onto_I] the_D table_N .', tr: 'Кошка запрыгнула на стол.', options: ['into', 'off'], accept: ['on'] },
        { s: 'A_D cup_N fell_V [off_I] the_D table_N .', tr: 'Чашка упала со стола.', options: ['out of', 'onto'], accept: ['from'], why: 'off — движение с поверхности: упало со стола, сняла с полки.' },
        { s: 'Max_N climbed_V [onto_I] the_D roof_N .', tr: 'Макс залез на крышу.', options: ['into', 'off'], accept: ['on'] },
      ],
    },
    {
      id: 'prep-motion.get-on-off',
      skill: 'get on / get off — автобус, поезд, самолёт, велосипед',
      why: 'Садишься на автобус, поезд, самолёт, велосипед — get on, выходишь — get off.',
      variants: [
        { s: 'We_P got_V [on_I] the_D bus_N outside_I the_D station_N .', tr: 'Мы сели на автобус у вокзала.', options: ['into', 'in'] },
        { s: 'Get_V [off_I] the_D bus_N at_I the_D next_J stop_N .', tr: 'Выйди из автобуса на следующей остановке.', options: ['out of', 'from'] },
        { s: 'Anna_N got_V [on_I] her_P bike_N and_C rode_V away_R .', tr: 'Анна села на велосипед и уехала.', options: ['into', 'in'] },
      ],
    },
    {
      id: 'prep-motion.get-into-out-of',
      skill: 'get into / get out of — машина, такси, фургон',
      why: 'В машину, такси, фургон садятся get into и выходят get out of. Вместо into часто говорят get in.',
      variants: [
        { s: 'Tom_N got_V [into_I] the_D car_N and_C drove_V away_R .', tr: 'Том сел в машину и уехал.', options: ['on', 'off'], accept: ['in'] },
        { s: 'Anna_N got_V [out~of_I] the_D taxi_N outside_I the_D hotel_N .', tr: 'Анна вышла из такси у гостиницы.', options: ['off', 'from'] },
        { s: 'The_D builders_N got_V [into_I] their_P van_N and_C left_V .', tr: 'Строители сели в свой фургон и уехали.', options: ['on', 'off'], accept: ['in'] },
      ],
    },
    {
      id: 'prep-motion.through',
      skill: 'through — сквозь, через (тоннель, лес)',
      focus: 'through',
      why: 'through — путь сквозь что-то, со «стенами» вокруг: тоннель, лес, окно.',
      variants: [
        { s: 'The_D train_N goes_V [through_I] a_D long_J tunnel_N .', tr: 'Поезд идёт через длинный тоннель.', options: ['across', 'along'] },
        { s: 'We_P walked_V [through_I] the_D forest_N .', tr: 'Мы шли через лес.', options: ['over', 'along'] },
        { s: 'Light_N comes_V [through_I] the_D window_N .', tr: 'Свет проходит через окно.', options: ['across', 'along'] },
      ],
    },
    {
      id: 'prep-motion.across',
      skill: 'across — поперёк (дорога, река)',
      focus: 'across',
      why: 'across — с одной стороны на другую: дорогу, реку, море переходят и пересекают across.',
      variants: [
        { s: 'Be_V careful_J when_C you_P walk_V [across_I] the_D road_N .', tr: 'Будь осторожен, когда переходишь дорогу.', options: ['through', 'along'] },
        { s: 'Tom_N swam_V [across_I] the_D river_N .', tr: 'Том переплыл реку.', options: ['through', 'along'] },
        { s: 'We_P flew_V [across_I] the_D Atlantic_N .', tr: 'Мы перелетели через Атлантику.', options: ['through', 'along'], accept: ['over'] },
      ],
    },
    {
      id: 'prep-motion.along',
      skill: 'along — вдоль (улица, берег, река)',
      focus: 'along',
      why: 'along — вдоль чего-то длинного: улицы, берега, реки.',
      variants: [
        { s: 'We_P walked_V [along_I] the_D beach_N .', tr: 'Мы шли вдоль пляжа.', options: ['across', 'through'] },
        { s: 'Walk_V [along_I] this_D street_N and_C turn_V left_R .', tr: 'Идите по этой улице и поверните налево.', options: ['across', 'through'] },
        { s: 'There_P are_V trees_N [along_I] the_D river_N .', tr: 'Вдоль реки растут деревья.', options: ['across', 'through'] },
      ],
    },
    {
      id: 'prep-motion.up-down',
      skill: 'up — вверх по, down — вниз по',
      focus: 'up',
      why: 'up — движение вверх (лестница, холм, дерево), down — вниз. С существительным это предлоги.',
      variants: [
        { s: 'Tom_N ran_V [up_I] the_D stairs_N .', tr: 'Том взбежал по лестнице.', options: ['down', 'off'] },
        { s: 'Max_N rode_V his_P bike_N [down_I] the_D hill_N .', tr: 'Макс съехал на велосипеде с холма.', options: ['up', 'off'], why: 'down — движение вниз по склону или лестнице: down the hill, down the stairs.' },
        { s: 'The_D cat_N climbed_V [up_I] the_D tree_N .', tr: 'Кошка залезла на дерево.', options: ['down', 'off'] },
      ],
    },
    {
      id: 'prep-motion.past',
      skill: 'past — мимо',
      focus: 'past',
      why: 'past — проходишь рядом и не останавливаешься: мимо банка, мимо дома.',
      variants: [
        { s: 'The_D bus_N goes_V [past_I] my_P house_N .', tr: 'Автобус проезжает мимо моего дома.', options: ['through', 'along'] },
        { s: 'Walk_V [past_I] the_D bank_N and_C turn_V right_R .', tr: 'Пройдите мимо банка и поверните направо.', options: ['across', 'through'] },
        { s: 'Tom_N ran_V [past_I] me_P without_I a_D word_N .', tr: 'Том пробежал мимо меня, не сказав ни слова.', options: ['across', 'through'] },
      ],
    },
    {
      id: 'prep-motion.towards',
      skill: 'towards — в сторону, по направлению к',
      focus: 'towards',
      why: 'towards — в сторону цели, ещё не дойдя до неё. Американцы пишут toward.',
      variants: [
        { s: 'A_D man_N is_A walking_V [towards_I] us_P .', tr: 'К нам идёт мужчина.', options: ['past', 'through'], accept: ['toward'] },
        { s: 'The_D car_N was_A coming_V [towards_I] me_P fast_R .', tr: 'Машина быстро ехала прямо на меня.', options: ['past', 'from'], accept: ['toward'] },
        { s: 'The_D plane_N is_A flying_V [towards_I] the_D mountains_N .', tr: 'Самолёт летит в сторону гор.', options: ['past', 'from'], accept: ['toward'] },
      ],
    },
    {
      id: 'prep-motion.from',
      skill: 'from — откуда: from Paris, from work',
      focus: 'from',
      why: 'from — откуда идём или едем: from Paris, from work, from the shop.',
      variants: [
        { s: 'I_P walk_V home_R [from_I] work_N .', tr: 'С работы домой я хожу пешком.', options: ['to', 'off'] },
        { s: 'This_D train_N comes_V [from_I] Paris_N .', tr: 'Этот поезд идёт из Парижа.', options: ['to', 'into'] },
        { s: 'Tom_N came_V back_R [from_I] the_D shop_N with_I some_D milk_N .', tr: 'Том вернулся из магазина с молоком.', options: ['to', 'into'] },
      ],
    },
    {
      id: 'prep-motion.arrive',
      skill: 'arrive in (город) / arrive at (станция) — не to',
      why: 'После arrive нет to: arrive in London, in Italy, но arrive at the station, at the airport.',
      variants: [
        { s: 'Our_P train_N arrives_V [at_I] Victoria~Station_N at_I ten_M .', tr: 'Наш поезд прибывает на вокзал Виктория в десять.', options: ['in', 'to'] },
        { s: 'We_P arrived_V [in_I] London_N at_I noon_N .', tr: 'Мы приехали в Лондон в полдень.', options: ['to', 'at'] },
        { s: 'When_R did_A you_P arrive_V [at_I] the_D airport_N ?', tr: 'Когда ты приехал в аэропорт?', options: ['in', 'to'] },
      ],
    },
    {
      id: 'prep-motion.order',
      mode: 'order',
      skill: 'Собрать предложение: кто — куда',
      why: 'Путь идёт после глагола, по порядку движения: along the river to the station.',
      variants: [
        { s: 'Tom_N walked_V along_I the_D river_N to_I the_D station_N .', tr: 'Том шёл вдоль реки к вокзалу.', options: ['across', 'into'], accept: ['Tom walked to the station along the river'] },
        { s: 'We_P got_V off_I the_D bus_N and_C walked_V past_I the_D bank_N .', tr: 'Мы вышли из автобуса и прошли мимо банка.', options: ['on', 'through'] },
        { s: 'The_D cat_N jumped_V off_I the_D table_N and_C ran_V out~of_I the_D room_N .', tr: 'Кошка спрыгнула со стола и выбежала из комнаты.', options: ['onto', 'into'] },
      ],
    },
  ],
} satisfies TopicBody
