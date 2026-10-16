import type { TopicBody } from '../types'

// Дерево артиклей: 1) понятно, какой именно? да → the; 2) нет → один исчисляемый? да → a; нет → без артикля.
// Ноль-артикль в ответе — режим choice (answer «без артикля»), в gap бывают только a и the.

const ZERO = 'без артикля'
const Q_ART = 'Какой артикль нужен перед выделенным словом?'

export default {
  summary: 'the — когда понятно, какой именно; a — один из многих; без артикля — вообще (мн. ч., неисчисляемое) и в устойчивых выражениях.',
  ref: [
    { kind: 'visual', visual: { id: 'article-tree', focus: 'q-known' }, caption: 'Два вопроса по порядку: понятно ли, какой именно? Если нет — это один предмет?' },
    {
      kind: 'rule',
      title: 'the — понятно, какой именно',
      text: 'the ставим, когда собеседник понимает, о каком предмете речь: о нём уже говорили, он один на всех (the sun), он рядом в ситуации (Pass the salt) или он «самый-самый» (the best).',
      examples: [
        { s: 'I_P bought_V a_D bike_N . The_D bike_N is_V red_J .', tr: 'Я купил велосипед. Велосипед красный.' },
        { s: 'The_D sun_N is_V hot_J today_R .', tr: 'Сегодня солнце жаркое.' },
        { s: 'This_P is_V the_D best_J café_N in_I town_N .', tr: 'Это лучшее кафе в городе.' },
      ],
    },
    {
      kind: 'rule',
      title: 'a / an — один из многих',
      text: 'Первое упоминание или «какой-нибудь один»: a bike, a problem. Профессия тоже a: She is a doctor. Только перед исчисляемым существительным в единственном числе: «a cats» и «a water» не бывает.',
      examples: [
        { s: 'Tom_N has_V a_D dog_N .', tr: 'У Тома есть собака.' },
        { s: 'She_P is_V a_D doctor_N .', tr: 'Она врач.' },
        { s: 'Is_V there_P a_D bank_N near_I here_R ?', tr: 'Здесь рядом есть банк?' },
      ],
    },
    {
      kind: 'rule',
      title: 'Без артикля — вообще и в устойчивых фразах',
      text: 'Про всех и всё сразу: множественное число и неисчисляемые (I like cats, Music helps me relax). Плюс устойчивые сочетания: go to bed, at home, by bus, have lunch, play football, а также France и London.',
      examples: [
        { s: 'I_P like_V cats_N .', tr: 'Я люблю кошек.' },
        { s: 'Music_N helps_V me_P relax_V .', tr: 'Музыка помогает мне расслабиться.' },
        { s: 'We_P go_V to_I work_N by_I bus_N .', tr: 'Мы ездим на работу на автобусе.' },
      ],
    },
    {
      kind: 'table',
      title: 'Устойчивые случаи: без артикля и с артиклем',
      head: ['Без артикля', 'С артиклем'],
      rows: [
        ['go_V to_I bed_N', 'go_V to_I the_D cinema_N'],
        ['at_I home_N', 'at_I the_D station_N'],
        ['by_I bus_N', 'on_I the_D bus_N'],
        ['have_V lunch_N', 'have_V a_D quick_J lunch_N'],
        ['play_V football_N', 'play_V the_D guitar_N'],
        ['France_N , London_N', 'the_D UK_N , the_D Thames_N'],
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Я_P купил_V машину_N . Машина_N красная_J .',
      en: 'I_P bought_V a_D car_N . The_D car_N is_V red_J .',
      note: 'В русском новое и известное различают порядком слов и интонацией. В английском для этого есть слова: новое — a, уже известное — the.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'She_P is_V doctor_N .', right: 'She_P is_V a_D doctor_N .', note: 'Профессия: a, хотя по-русски артикля нет.' },
        { wrong: 'I_P like_V the_D cats_N .', right: 'I_P like_V cats_N .', note: 'Про всех кошек вообще — без артикля.' },
        { wrong: 'I_P play_V piano_N .', right: 'I_P play_V the_D piano_N .', note: 'Инструменты — с the, игры — без: play chess.' },
        { wrong: 'I_P go_V to_I the_D bed_N at_I ten_M .', right: 'I_P go_V to_I bed_N at_I ten_M .', note: 'go to bed — устойчивое, без артикля.' },
        { wrong: 'I_P go_V to_I work_N by_I the_D bus_N .', right: 'I_P go_V to_I work_N by_I bus_N .', note: 'by + транспорт — без артикля.' },
        { wrong: 'He_P lives_V in_I UK_N .', right: 'He_P lives_V in_I the_D UK_N .', note: 'the UK, the USA, the Netherlands — с the.' },
      ],
    },
  ],
  items: [
    {
      id: 'articles.first-mention',
      skill: 'Первое упоминание — a: We live in a flat',
      focus: 'a',
      why: 'Предмет назвали впервые, он «один из многих» — a. Дальше про него скажут the.',
      variants: [
        { s: 'We_P live_V in_I [a_D] small_J flat_N in_I Leeds_N . The_D flat_N has_V two_M bedrooms_N .', tr: 'Мы живём в маленькой квартире в Лидсе. В квартире две спальни.', options: ['the', 'an'] },
        { s: 'Max_N found_V [a_D] wallet_N in_I the_D park_N . The_D wallet_N was_V empty_J .', tr: 'Макс нашёл в парке кошелёк. Кошелёк был пустой.', options: ['the', 'an'] },
        { s: 'Kate_N watched_V [a_D] film_N last_J night_N . The_D film_N was_V very_R funny_J .', tr: 'Вчера вечером Кейт посмотрела фильм. Фильм был очень смешной.', options: ['the', 'an'] },
      ],
    },
    {
      id: 'articles.repeat-mention',
      skill: 'Повторное упоминание — the: a bike … the bike',
      focus: 'q-known',
      why: 'О предмете уже говорили, понятно какой именно — the.',
      variants: [
        { s: 'Lucy_N got_V a_D letter_N and_C a_D parcel_N today_R . [The_D] parcel_N is_V from_I her_P aunt_N .', tr: 'Сегодня Люси получила письмо и посылку. Посылка от её тёти.', options: ['A', 'An'] },
        { s: 'I_P met_V a_D man_N on_I the_D train_N . [The_D] man_N was_A reading_V a_D book_N .', tr: 'В поезде я встретил мужчину. Мужчина читал книгу.', options: ['A', 'An'] },
        { s: 'Kate_N ordered_V a_D pizza_N and_C a_D salad_N . [The_D] salad_N was_V great_J .', tr: 'Кейт заказала пиццу и салат. Салат был отличный.', options: ['A', 'An'] },
      ],
    },
    {
      id: 'articles.unique',
      skill: 'Единственный в мире — the: the sun, the sky, the moon',
      focus: 'q-known',
      why: 'Солнце, небо, луна, Земля — такой предмет один на всех, поэтому the.',
      variants: [
        { s: 'Look_V at_I [the_D] sky_N ! It_P +’s_V full_J of_I stars_N .', tr: 'Посмотри на небо! Оно всё в звёздах.', options: ['a', 'an'] },
        { s: '[The_D] moon_N is_V very_R bright_J tonight_R .', tr: 'Сегодня вечером луна очень яркая.', options: ['A', 'An'] },
        { s: 'The_D Earth_N goes_V round_I [the_D] sun_N .', tr: 'Земля вращается вокруг Солнца.', options: ['a', 'an'] },
      ],
    },
    {
      id: 'articles.situation',
      skill: 'Ясно из ситуации — the: Pass the salt',
      focus: 'q-known',
      why: 'Мы оба видим, о какой вещи речь (соль на столе, свет в комнате, дверь рядом), поэтому the.',
      variants: [
        { s: 'Can_A you_P pass_V me_P [the_D] salt_N , please_R ?', tr: 'Передай мне соль, пожалуйста.', options: ['a', 'an'] },
        { s: 'It_P +’s_V dark_J in_I the_D room_N . Please_R turn_V on_R [the_D] light_N .', tr: 'В комнате темно. Включи свет, пожалуйста.', options: ['a', 'an'] },
        { s: 'Please_R shut_V [the_D] door_N . The_D baby_N is_A sleeping_V .', tr: 'Закрой, пожалуйста, дверь. Ребёнок спит.', options: ['a', 'an'] },
      ],
    },
    {
      id: 'articles.profession',
      skill: 'Профессия — a: She is a doctor',
      focus: 'a',
      why: 'Кем человек работает — один из многих врачей, водителей, официантов: a. По-русски артикля нет, по-английски он обязателен.',
      variants: [
        { s: 'Tom_N is_V [a_D] mechanic_N . He_P fixes_V cars_N .', tr: 'Том — автомеханик. Он чинит машины.', options: ['the', 'an'] },
        { s: 'What_P does_A your_P sister_N do_V ? — She_P +’s_V [a_D] nurse_N .', tr: 'Кем работает твоя сестра? — Она медсестра.', options: ['the', 'an'] },
        { s: 'Before_I this_D job_N , Ben_N was_V [a_D] waiter_N .', tr: 'До этой работы Бен был официантом.', options: ['the', 'an'] },
      ],
    },
    {
      id: 'articles.there-is-a',
      skill: 'There is a …: что-то есть, но не знаем, какое',
      focus: 'q-single',
      why: 'Сообщаем, что предмет существует. Это один исчисляемый предмет, и он новый для собеседника, поэтому a.',
      variants: [
        { s: 'Is_V there_P [a_D] post~office_N near_I here_R ?', tr: 'Здесь рядом есть почта?', options: ['the', 'an'] },
        { s: 'There_P +’s_V [a_D] problem_N with_I my_P laptop_N .', tr: 'С моим ноутбуком проблема.', options: ['the', 'an'] },
        { s: 'There_P is_V [a_D] note_N for_I you_P on_I the_D table_N .', tr: 'Для тебя на столе записка.', options: ['the', 'an'] },
      ],
    },
    {
      id: 'articles.want-a',
      skill: 'Один предмет вообще, «какой-нибудь» — a: I need a pen',
      focus: 'q-single',
      why: 'Исчисляемое в единственном числе не стоит без артикля. Нужен любой один предмет, а не конкретный, поэтому a.',
      variants: [
        { s: 'Tom_N wants_V [a_D] new_J bike_N for_I his_P birthday_N .', tr: 'Том хочет новый велосипед на день рождения.', options: ['the', 'an'] },
        { s: 'I_P need_V [a_D] pen_N . Do_A you_P have_V one_P ?', tr: 'Мне нужна ручка. У тебя есть?', options: ['the', 'an'] },
        { s: 'I_P +’m_A looking_V for_I [a_D] cheap_J hotel_N in_I London_N .', tr: 'Я ищу недорогую гостиницу в Лондоне.', options: ['the', 'an'] },
      ],
    },
    {
      id: 'articles.a-per',
      skill: 'a = «в» при частоте и цене: twice a week, £2 a kilo',
      focus: 'a',
      why: 'При частоте и цене a значит «на каждую единицу»: раз в неделю, за килограмм. Можно сказать и per.',
      variants: [
        { s: 'We_P have_V English_N lessons_N twice_R [a_D] week_N .', tr: 'У нас уроки английского два раза в неделю.', options: ['the', 'an'], accept: ['per'] },
        { s: 'Apples_N cost_V two_M pounds_N [a_D] kilo_N .', tr: 'Яблоки стоят два фунта за килограмм.', options: ['the', 'an'], accept: ['per'] },
        { s: 'Anna_N phones_V her_P mother_N once_R [a_D] day_N .', tr: 'Анна звонит маме раз в день.', options: ['the', 'an'], accept: ['per'] },
      ],
    },
    {
      id: 'articles.what-a',
      skill: 'What a …! — a после What',
      focus: 'a',
      why: 'В восклицании про один предмет: What + a + прилагательное + существительное. Артикль после What, перед прилагательным.',
      variants: [
        { s: 'What_D [a_D] nice_J surprise_N !', tr: 'Какой приятный сюрприз!', options: ['the', 'an'] },
        { s: 'What_D [a_D] long_J queue_N !', tr: 'Какая длинная очередь!', options: ['the', 'an'] },
        { s: 'What_D [a_D] beautiful_J view_N !', tr: 'Какой красивый вид!', options: ['the', 'an'] },
      ],
    },
    {
      id: 'articles.plural-general',
      mode: 'choice',
      skill: 'Множественное число вообще — без артикля: I like cats',
      focus: 'zero',
      why: 'Говорим про всех сразу, в общем смысле — артикль не нужен: I like cats. the cats — это конкретные кошки.',
      variants: [
        { s: 'Anna_N loves_V {flowers_N} .', tr: 'Анна любит цветы.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
        { s: '{Dogs_N} are_V usually_R friendly_J .', tr: 'Собаки обычно дружелюбные.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
        { s: 'I_P don’t_A like_V {spiders_N} .', tr: 'Я не люблю пауков.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
      ],
    },
    {
      id: 'articles.uncountable-general',
      mode: 'choice',
      skill: 'Неисчисляемое вообще — без артикля: Kate loves chocolate',
      focus: 'zero',
      why: 'Сахар, кофе, шоколад в общем смысле — масса без артикля и без -s: I love chocolate.',
      variants: [
        { s: '{Sugar_N} is_V bad_J for_I your_P teeth_N .', tr: 'Сахар вреден для зубов.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
        { s: 'Tom_N never_R drinks_V {coffee_N} .', tr: 'Том никогда не пьёт кофе.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
        { s: 'Kate_N loves_V {chocolate_N} .', tr: 'Кейт любит шоколад.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
      ],
    },
    {
      id: 'articles.superlative',
      skill: 'the + превосходная степень: the best, the highest',
      focus: 'the',
      why: 'Самый-самый может быть только один, поэтому понятно какой: the best, the highest, the most expensive.',
      variants: [
        { s: 'Kate_N is_V [the_D] best_J player_N in_I our_P team_N .', tr: 'Кейт — лучший игрок в нашей команде.', options: ['a', 'an'] },
        { s: 'Everest_N is_V [the_D] highest_J mountain_N in_I the_D world_N .', tr: 'Эверест — самая высокая гора в мире.', options: ['a', 'an'] },
        { s: 'This_P is_V [the_D] most_R expensive_J hotel_N in_I London_N .', tr: 'Это самая дорогая гостиница в Лондоне.', options: ['a', 'an'] },
      ],
    },
    {
      id: 'articles.go-to-bed',
      mode: 'choice',
      skill: 'go to bed / school / work — без артикля',
      focus: 'fixed',
      why: 'Когда место называют по привычному назначению (спать, учиться, работать), артикля нет: go to bed, go to school, go to work.',
      variants: [
        { s: 'Tom_N goes_V to_I {bed_N} at_I eleven_M .', tr: 'Том ложится спать в одиннадцать.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
        { s: 'The_D children_N go_V to_I {school_N} every_D day_N .', tr: 'Дети ходят в школу каждый день.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
        { s: 'Max_N goes_V to_I {work_N} at_I eight_M .', tr: 'Макс идёт на работу в восемь.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
      ],
    },
    {
      id: 'articles.at-home',
      mode: 'choice',
      skill: 'at home, at work, in bed — без артикля',
      focus: 'fixed',
      why: 'at home, at work, in bed — устойчивые сочетания: «дома», «на работе», «в постели». Артикль не нужен.',
      variants: [
        { s: 'I_P +’m_V at_I {home_N} today_R .', tr: 'Сегодня я дома.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
        { s: 'Anna_N is_V at_I {work_N} until_I six_M .', tr: 'Анна на работе до шести.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
        { s: 'Dad_N is_V still_R in_I {bed_N} .', tr: 'Папа ещё в постели.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
      ],
    },
    {
      id: 'articles.by-transport',
      mode: 'choice',
      skill: 'by bus / car / train / plane — без артикля',
      focus: 'fixed',
      why: 'by + вид транспорта — без артикля: by bus, by car. Конкретный автобус — on the bus.',
      variants: [
        { s: 'Anna_N goes_V to_I London_N by_I {train_N} .', tr: 'Анна ездит в Лондон на поезде.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
        { s: 'I_P don’t_A go_V to_I the_D office_N by_I {car_N} .', tr: 'В офис я на машине не езжу.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
        { s: 'They_P travelled_V to_I Spain_N by_I {plane_N} .', tr: 'Они летели в Испанию на самолёте.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
      ],
    },
    {
      id: 'articles.meals',
      mode: 'choice',
      skill: 'have breakfast / lunch / dinner — без артикля',
      focus: 'fixed',
      why: 'Названия приёмов пищи — без артикля: have breakfast, cook dinner.',
      variants: [
        { s: 'We_P usually_R have_V {breakfast_N} at_I eight_M .', tr: 'Мы обычно завтракаем в восемь.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
        { s: 'What_D time_N do_A you_P have_V {lunch_N} ?', tr: 'Во сколько ты обедаешь?', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
        { s: 'Tom_N cooks_V {dinner_N} on_I Fridays_N .', tr: 'По пятницам Том готовит ужин.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
      ],
    },
    {
      id: 'articles.meal-adj',
      skill: 'Еда с описанием — a: a lovely dinner, a big breakfast',
      focus: 'a',
      why: 'С прилагательным приём пищи становится «одним из многих»: a big breakfast, a lovely dinner. Без прилагательного артикля нет.',
      variants: [
        { s: 'We_P had_V [a_D] lovely_J dinner_N yesterday_R .', tr: 'Вчера у нас был чудесный ужин.', options: ['the', 'an'] },
        { s: 'Tom_N always_R has_V [a_D] big_J breakfast_N .', tr: 'Том всегда плотно завтракает.', options: ['the', 'an'] },
        { s: 'We_P had_V [a_D] nice_J lunch_N by_I the_D river_N .', tr: 'Мы хорошо пообедали у реки.', options: ['the', 'an'] },
      ],
    },
    {
      id: 'articles.instruments',
      skill: 'play the piano / guitar / violin — музыкальный инструмент с the',
      focus: 'fixed',
      why: 'Музыкальные инструменты — с the: play the piano. Игры и спорт — без артикля: play football.',
      variants: [
        { s: 'Anna_N plays_V [the_D] piano_N very_R well_R .', tr: 'Анна очень хорошо играет на пианино.', options: ['a', 'an'] },
        { s: 'My_P son_N is_A learning_V to_X play_V [the_D] guitar_N .', tr: 'Мой сын учится играть на гитаре.', options: ['a', 'an'] },
        { s: 'Can_A you_P play_V [the_D] violin_N ?', tr: 'Ты умеешь играть на скрипке?', options: ['a', 'an'] },
      ],
    },
    {
      id: 'articles.sports',
      mode: 'choice',
      skill: 'play football / tennis / chess — игры без артикля',
      focus: 'fixed',
      why: 'Спорт и игры — без артикля: play football, play chess. С the только инструменты: play the piano.',
      variants: [
        { s: 'Tom_N plays_V {football_N} on_I Sundays_N .', tr: 'По воскресеньям Том играет в футбол.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
        { s: 'Do_A you_P play_V {tennis_N} ?', tr: 'Ты играешь в теннис?', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
        { s: 'My_P dad_N and_C I_P play_V {chess_N} in_I the_D evenings_N .', tr: 'Мы с папой играем в шахматы по вечерам.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
      ],
    },
    {
      id: 'articles.places-the',
      skill: 'go to the cinema / theatre / gym — с the',
      focus: 'fixed',
      why: 'Места досуга в городе — с the: go to the cinema, the theatre, the gym. Не путай с go to bed / school / work — там артикля нет.',
      variants: [
        { s: 'On_I Fridays_N we_P go_V to_I [the_D] cinema_N .', tr: 'По пятницам мы ходим в кино.', options: ['a', 'an'] },
        { s: 'Would_A you_P like_V to_X go_V to_I [the_D] theatre_N on_I Saturday_N ?', tr: 'Хочешь сходить в театр в субботу?', options: ['a', 'an'] },
        { s: 'Anna_N goes_V to_I [the_D] gym_N after_I work_N .', tr: 'Анна ходит в спортзал после работы.', options: ['a', 'an'] },
      ],
    },
    {
      id: 'articles.names-zero',
      mode: 'choice',
      skill: 'Страны, города, улицы, люди — без артикля: France, London',
      focus: 'zero',
      why: 'Имена людей, города, большинство стран и улицы — без артикля: France, London, Oxford Street, Scotland.',
      variants: [
        { s: 'We_P +’re_A going_V to_I {France_N} in_I July_N .', tr: 'В июле мы едем во Францию.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
        { s: 'My_P office_N is_V on_I {Oxford~Street_N} .', tr: 'Мой офис на Оксфорд-стрит.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
        { s: 'Kate_N lives_V in_I {Scotland_N} .', tr: 'Кейт живёт в Шотландии.', q: Q_ART, answer: ZERO, options: ['a', 'the'] },
      ],
    },
    {
      id: 'articles.names-the',
      skill: 'the UK, the USA, the Netherlands, the Thames, the Alps',
      focus: 'the',
      why: 'С the: страны-объединения и во мн. числе (the UK, the USA, the Netherlands), реки, моря, горные цепи (the Thames, the Alps).',
      variants: [
        { s: 'Tom_N works_V in_I [the_D] UK_N .', tr: 'Том работает в Великобритании.', options: ['a', 'an'] },
        { s: '[The_D] Thames_N flows_V through_I London_N .', tr: 'Темза протекает через Лондон.', options: ['A', 'An'] },
        { s: 'Amsterdam_N is_V in_I [the_D] Netherlands_N .', tr: 'Амстердам находится в Нидерландах.', options: ['a', 'an'] },
      ],
    },
    {
      id: 'articles.tree',
      mode: 'choice',
      skill: 'Выбрать по дереву: the, a или без артикля',
      focus: 'q-known',
      why: 'Понятно, какой именно, — the. Нет, и это один исчисляемый предмет, — a. Много или масса вообще — без артикля.',
      variants: [
        { s: 'We_P stayed_V in_I a_D small_J hotel_N . We_P loved_V {hotel_N} .', tr: 'Мы остановились в маленькой гостинице. Гостиница нам очень понравилась.', q: Q_ART, answer: 'the', options: ['a', ZERO], why: 'Про гостиницу уже говорили — понятно какую: the.' },
        { s: 'There_P is_V {cat_N} in_I the_D garden_N .', tr: 'В саду кошка.', q: Q_ART, answer: 'a', options: ['the', ZERO], why: 'Кошка новая, одна и исчисляемая: a.' },
        { s: 'Kate_N never_R eats_V {meat_N} .', tr: 'Кейт никогда не ест мясо.', q: Q_ART, answer: ZERO, options: ['a', 'the'], why: 'Мясо вообще, неисчисляемое: без артикля.' },
      ],
    },
    {
      id: 'articles.order',
      mode: 'order',
      skill: 'Артикль стоит первым в группе: a very old car',
      focus: 'q-single',
      why: 'Артикль открывает группу существительного: a very old car, a big office. Между артиклем и существительным — прилагательное.',
      variants: [
        { s: 'Tom_N has_V a_D very_R old_J car_N .', tr: 'У Тома очень старая машина.', options: ['an'] },
        { s: 'Max_N works_V in_I a_D big_J office_N .', tr: 'Макс работает в большом офисе.', options: ['an'] },
        { s: 'What_D a_D lovely_J day_N !', tr: 'Какой чудесный день!', options: ['the'] },
      ],
    },
    {
      id: 'articles.find-article',
      mode: 'pick',
      skill: 'Найти артикли в предложении',
      focus: 'the',
      why: 'Артикли a, an, the — это определители (D). Они открывают группу существительного и всегда стоят перед ним.',
      variants: [
        { s: 'Tom_N has_V {a_D} dog_N . {The_D} dog_N is_V old_J .', tr: 'У Тома есть собака. Собака старая.', q: 'Найди артикли.' },
        { s: '{The_D} keys_N are_V on_I {the_D} table_N .', tr: 'Ключи на столе.', q: 'Найди артикли.' },
        { s: 'She_P works_V in_I {a_D} bank_N in_I {the_D} city_N centre_N .', tr: 'Она работает в банке в центре города.', q: 'Найди артикли.' },
      ],
    },
  ],
} satisfies TopicBody
