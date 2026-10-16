import type { TopicBody } from '../types'

export default {
  summary: 'some- — в утверждении, any- — в вопросе и после not, no- — уже отрицание, every- — все. Окончания: -body и -one, -thing, -where.',
  ref: [
    { kind: 'visual', visual: { id: 'indef-grid' }, caption: 'Четыре приставки на три окончания: люди, вещи, места' },
    {
      kind: 'rule',
      title: 'Четыре приставки',
      text: 'some- — «кто-то, что-то» в утверждении. any- — в вопросе и после not. no- — уже отрицание, not не нужен. every- — «все, всё, везде». Окончания: -body и -one — люди, -thing — вещи, -where — места.',
      examples: [
        { s: 'Somebody_P left_V a_D bag_N here_R .', tr: 'Кто-то оставил здесь сумку.' },
        { s: 'Did_A you_P see_V anything_P ?', tr: 'Ты что-нибудь видел?' },
        { s: 'Nobody_P answered_V the_D phone_N .', tr: 'Никто не ответил на звонок.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Только одно отрицание',
      text: 'В русском отрицаний может быть много, в английском — одно на предложение. Либо not + any-, либо no- без not: I didn’t see anything = I saw nothing. Нельзя: I didn’t see nothing.',
      examples: [
        { s: 'I_P didn’t_A see_V anybody_P .', tr: 'Я никого не видел.' },
        { s: 'I_P saw_V nobody_P .', tr: 'Я никого не видел.' },
        { s: 'Tom_N knows_V nothing_P about_I it_P .', tr: 'Том ничего об этом не знает.' },
      ],
    },
    {
      kind: 'rule',
      title: 'every- — единственное число',
      text: 'Everybody и everything значат «все» и «всё», но глагол стоит в единственном числе: Everybody is here, Everything looks fine, Everyone likes her.',
      examples: [
        { s: 'Everybody_P is_V here_R .', tr: 'Все здесь.' },
        { s: 'Everything_P looks_V fine_J .', tr: 'Всё выглядит нормально.' },
        { s: 'Everyone_P likes_V Anna_N .', tr: 'Анну все любят.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Никто_P ничего_P не_X сказал_V .',
      en: 'Nobody_P said_V anything_P .',
      note: 'В русском отрицаний три: никто, ничего и не. В английском одно: его несёт nobody, а дальше стоит anything. Если отрицание уже есть, второе добавлять нельзя.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I_P don’t_A know_V nothing_P .', right: 'I_P don’t_A know_V anything_P .', note: 'После don’t — any-: anything, а не nothing.' },
        { wrong: 'Nobody_P didn’t_A come_V .', right: 'Nobody_P came_V .', note: 'Nobody уже отрицание, поэтому not не нужен.' },
        { wrong: 'Everybody_P are_V happy_J .', right: 'Everybody_P is_V happy_J .', note: 'every- — единственное число: everybody is.' },
        { wrong: 'Did_A you_P meet_V nobody_P ?', right: 'Did_A you_P meet_V anybody_P ?', note: 'В вопросе — any-: anybody, а не nobody.' },
        { wrong: 'I_P can’t_A find_V my_P keys_N nowhere_R .', right: 'I_P can’t_A find_V my_P keys_N anywhere_R .', note: 'Одно отрицание: can’t … anywhere.' },
      ],
    },
  ],
  items: [
    {
      id: 'indefinite.somebody',
      skill: 'somebody (someone) — кто-то, в утверждении',
      focus: 'some.body',
      why: 'Утверждение о каком-то человеке — some-. someone значит то же, что somebody.',
      variants: [
        { s: '[Somebody_P] ate_V my_P sandwich_N !', tr: 'Кто-то съел мой бутерброд!', options: ['Anybody', 'Nobody'], accept: ['Someone'] },
        { s: 'There_P is_V [somebody_P] at_I the_D door_N .', tr: 'У двери кто-то есть.', options: ['anybody', 'nobody'], accept: ['someone'] },
        { s: 'I_P met_V [somebody_P] famous_J on_I the_D train_N .', tr: 'В поезде я встретил кого-то известного.', options: ['anybody', 'nobody'], accept: ['someone'] },
      ],
    },
    {
      id: 'indefinite.something',
      skill: 'something — что-то, в утверждении',
      focus: 'some.thing',
      why: 'Утверждение о какой-то вещи — something. В вопросе и после not будет anything.',
      variants: [
        { s: 'There_P is_V [something_P] in_I your_P hair_N .', tr: 'У тебя что-то в волосах.', options: ['anything', 'nothing'] },
        { s: 'Kate_N bought_V [something_P] nice_J for_I her_P mum_N .', tr: 'Кейт купила маме что-то красивое.', options: ['anything', 'nothing'] },
        { s: 'I_P have_V [something_P] to_X tell_V you_P .', tr: 'Мне нужно тебе кое-что сказать.', options: ['anything', 'nothing'] },
      ],
    },
    {
      id: 'indefinite.somewhere',
      skill: 'somewhere — где-то, в утверждении',
      focus: 'some.where',
      why: 'Утверждение о каком-то месте — somewhere. -where отвечает на вопрос «где?».',
      variants: [
        { s: 'I_P left_V my_P umbrella_N [somewhere_R] in_I the_D office_N .', tr: 'Я где-то в офисе оставил свой зонт.', options: ['anywhere', 'nowhere'] },
        { s: 'Tom_N lives_V [somewhere_R] near_I the_D park_N .', tr: 'Том живёт где-то рядом с парком.', options: ['anywhere', 'nowhere'] },
        { s: 'I_P saw_V that_D man_N [somewhere_R] yesterday_R .', tr: 'Я вчера где-то видел того человека.', options: ['anywhere', 'nowhere'] },
      ],
    },
    {
      id: 'indefinite.anybody',
      skill: 'anybody (anyone) — в вопросе и после not',
      focus: 'any.body',
      why: 'В вопросе и после not про человека — any-: anybody или anyone.',
      variants: [
        { s: 'I_P didn’t_A tell_V [anybody_P] about_I the_D party_N .', tr: 'Я никому не рассказал о вечеринке.', options: ['nobody', 'somebody'], accept: ['anyone'] },
        { s: 'Is_V there_P [anybody_P] at_I home_N ?', tr: 'Дома кто-нибудь есть?', options: ['nobody', 'everybody'], accept: ['anyone', 'somebody', 'someone'] },
        { s: 'We_P can’t_A see_V [anybody_P] in_I the_D garden_N .', tr: 'В саду никого не видно.', options: ['nobody', 'somebody'], accept: ['anyone'] },
      ],
    },
    {
      id: 'indefinite.anything',
      skill: 'anything — в вопросе и после not',
      focus: 'any.thing',
      why: 'В вопросе и после not про вещь — anything. Не nothing: отрицание уже есть.',
      variants: [
        { s: 'She_P doesn’t_A want_V [anything_P] to_X eat_V .', tr: 'Она ничего не хочет есть.', options: ['nothing', 'something'] },
        { s: 'Do_A you_P need_V [anything_P] from_I the_D shop_N ?', tr: 'Тебе что-нибудь нужно из магазина?', options: ['nothing', 'everything'], accept: ['something'] },
        { s: 'Tom_N didn’t_A buy_V [anything_P] at_I the_D market_N .', tr: 'Том ничего не купил на рынке.', options: ['nothing', 'something'] },
      ],
    },
    {
      id: 'indefinite.anywhere',
      skill: 'anywhere — в вопросе и после not',
      focus: 'any.where',
      why: 'В вопросе и после not про место — anywhere. «Нигде» по-английски — not … anywhere.',
      variants: [
        { s: 'We_P didn’t_A go_V [anywhere_R] on_I Sunday_N .', tr: 'В воскресенье мы никуда не ходили.', options: ['nowhere', 'somewhere'] },
        { s: 'Can_A you_P see_V my_P glasses_N [anywhere_R] ?', tr: 'Ты не видишь где-нибудь мои очки?', options: ['nowhere', 'everywhere'], accept: ['somewhere'] },
        { s: 'You_P can’t_A buy_V coffee_N [anywhere_R] on_I this_D street_N .', tr: 'На этой улице нигде нельзя купить кофе.', options: ['nowhere', 'somewhere'] },
      ],
    },
    {
      id: 'indefinite.nobody',
      skill: 'nobody (no one) — никто, без not',
      focus: 'no.body',
      why: 'Nobody уже значит «никто», второе отрицание не нужно. no one значит то же самое.',
      variants: [
        { s: '[Nobody_P] called_V me_P yesterday_R .', tr: 'Мне вчера никто не звонил.', options: ['Anybody', 'Somebody'], accept: ['No one'] },
        { s: 'There_P is_V [nobody_P] in_I the_D office_N today_R .', tr: 'Сегодня в офисе никого нет.', options: ['anybody', 'somebody'], accept: ['no one'] },
        { s: '[Nobody_P] knows_V the_D answer_N .', tr: 'Никто не знает ответа.', options: ['Anybody', 'Everybody'], accept: ['No one'] },
      ],
    },
    {
      id: 'indefinite.nothing',
      skill: 'nothing — ничего, без not',
      focus: 'no.thing',
      why: 'Nothing уже значит «ничего», поэтому not рядом не ставим.',
      variants: [
        { s: 'There_P is_V [nothing_P] in_I the_D fridge_N .', tr: 'В холодильнике ничего нет.', options: ['anything', 'something'] },
        { s: 'I_P heard_V [nothing_P] because_C the_D music_N was_V so_R loud_J .', tr: 'Я ничего не слышал, потому что музыка была такой громкой.', options: ['anything', 'something'] },
        { s: 'She_P said_V [nothing_P] and_C left_V .', tr: 'Она ничего не сказала и ушла.', options: ['anything', 'something'] },
      ],
    },
    {
      id: 'indefinite.nowhere',
      skill: 'nowhere — нигде, некуда, без not',
      focus: 'no.where',
      why: 'Nowhere уже значит «нигде» или «некуда». Частый вариант: nowhere to sit, nowhere to park.',
      variants: [
        { s: 'There_P is_V [nowhere_R] to_X park_V near_I the_D station_N .', tr: 'Рядом с вокзалом негде припарковаться.', options: ['anywhere', 'somewhere'] },
        { s: 'We_P have_V [nowhere_R] to_X sit_V .', tr: 'Нам негде сесть.', options: ['anywhere', 'somewhere'] },
        { s: 'I_P have_V [nowhere_R] to_X put_V my_P bike_N .', tr: 'Мне некуда поставить велосипед.', options: ['anywhere', 'somewhere'] },
      ],
    },
    {
      id: 'indefinite.everybody',
      skill: 'everybody (everyone) — все',
      focus: 'every.body',
      why: 'Речь обо всех людях — every-. everyone значит то же, что everybody.',
      variants: [
        { s: '[Everybody_P] wants_V to_X sit_V near_I the_D window_N .', tr: 'Все хотят сесть у окна.', options: ['Nobody', 'Somebody'], accept: ['Everyone'] },
        { s: 'Is_V [everybody_P] ready_J ?', tr: 'Все готовы?', options: ['nobody', 'somebody'], accept: ['everyone'] },
        { s: '[Everybody_P] in_I our_P class_N has_V a_D tablet_N .', tr: 'У всех в нашем классе есть планшет.', options: ['Nobody', 'Somebody'], accept: ['Everyone'] },
      ],
    },
    {
      id: 'indefinite.everything',
      skill: 'everything — всё',
      focus: 'every.thing',
      why: 'Речь обо всех вещах сразу — everything. Глагол в единственном числе.',
      variants: [
        { s: '[Everything_P] is_V ready_J for_I the_D party_N .', tr: 'Всё готово к вечеринке.', options: ['Nothing', 'Something'] },
        { s: 'Anna_N knows_V [everything_P] about_I computers_N .', tr: 'Анна знает всё о компьютерах.', options: ['nothing', 'something'] },
        { s: 'I_P bought_V [everything_P] on_I the_D list_N .', tr: 'Я купил всё из списка.', options: ['nothing', 'something'] },
      ],
    },
    {
      id: 'indefinite.everywhere',
      skill: 'everywhere — везде',
      focus: 'every.where',
      why: 'Речь обо всех местах сразу — везде, повсюду: everywhere.',
      variants: [
        { s: 'I_P looked_V [everywhere_R] for_I my_P phone_N .', tr: 'Я искал свой телефон везде.', options: ['nowhere', 'somewhere'] },
        { s: 'There_P are_V tourists_N [everywhere_R] in_I summer_N .', tr: 'Летом туристы повсюду.', options: ['nowhere', 'anywhere'] },
        { s: 'Kate_N has_V friends_N [everywhere_R] .', tr: 'У Кейт друзья повсюду.', options: ['nowhere', 'anywhere'] },
      ],
    },
    {
      id: 'indefinite.double-negative',
      skill: 'Одно отрицание: not + any-, не not + no-',
      focus: 'any',
      why: 'Если в предложении уже есть not или nobody, дальше ставится any-. Два отрицания подряд по-английски не бывает.',
      variants: [
        { s: 'I_P don’t_A know_V [anything_P] about_I football_N .', tr: 'Я ничего не знаю о футболе.', options: ['nothing', 'something'] },
        { s: 'Nobody_P ate_V [anything_P] at_I the_D party_N .', tr: 'На вечеринке никто ничего не ел.', options: ['nothing', 'something'] },
        { s: 'Max_N can’t_A find_V his_P wallet_N [anywhere_R] .', tr: 'Макс нигде не может найти свой кошелёк.', options: ['nowhere', 'somewhere'] },
      ],
    },
    {
      id: 'indefinite.every-agree',
      skill: 'everybody, everything — глагол в единственном числе',
      focus: 'every',
      why: 'every- по смыслу «все», но грамматически один: everybody is, everything looks, everyone speaks.',
      variants: [
        { s: 'Everybody_P [is_V] at_I work_N today_R .', tr: 'Сегодня все на работе.', options: ['are'] },
        { s: 'Everything_P on_I the_D menu_N [looks_V] good_J .', tr: 'Всё в меню выглядит вкусно.', options: ['look'] },
        { s: 'Everyone_P in_I my_P team_N [speaks_V] English_N .', tr: 'Все в моей команде говорят по-английски.', options: ['speak'] },
      ],
    },
    {
      id: 'indefinite.order',
      mode: 'order',
      skill: 'Собрать предложение с some-, any-, no-, every-',
      focus: 'any',
      why: 'Неопределённое местоимение стоит там же, где обычное существительное: подлежащее перед глаголом, дополнение после.',
      variants: [
        { s: 'Nobody_P told_V me_P anything_P .', tr: 'Мне никто ничего не сказал.', options: ['nothing'] },
        { s: 'Did_A you_P buy_V anything_P in_I town_N ?', tr: 'Ты что-нибудь купил в городе?', options: ['nothing'] },
        { s: 'Everything_P in_I this_D shop_N is_V cheap_J .', tr: 'Всё в этом магазине дешёвое.', options: ['are'] },
      ],
    },
    {
      id: 'indefinite.pick',
      mode: 'pick',
      skill: 'Найти слово: человек, вещь или место',
      focus: 'some',
      why: '-body и -one заменяют людей, -thing — вещи, -where — места.',
      variants: [
        { s: '{Someone_P} is_A waiting_V at_I the_D door_N .', q: 'Найди слово, которое заменяет человека.', model: 'Tom_N saw_V {nobody_P} there_R .' },
        { s: 'There_P is_V {nothing_P} in_I the_D box_N .', q: 'Найди слово, которое заменяет вещь.', model: 'I_P want_V {something_P} sweet_J .' },
        { s: 'Let_V +’s_P go_V {somewhere_R} warm_J this_D winter_N .', q: 'Найди слово, которое заменяет место.', model: 'Kate_N has_V {nowhere_R} to_X go_V .' },
      ],
    },
    {
      id: 'indefinite.graph',
      mode: 'graph',
      skill: 'Неопределённое местоимение — подлежащее или дополнение',
      focus: 'some',
      why: 'Nobody, somebody — подлежащее (кто?). Anything, something — дополнение (что?). В русском «не» — частица при глаголе.',
      variants: [
        { s: 'Nobody_P said_V anything_P .', tr: 'Никто ничего не сказал.', graph: '1>2 subj, 3>2 obj' },
        { s: 'Никто_P ничего_P не_X сказал_V .', lang: 'ru', tr: 'Nobody said anything.', graph: '1>4 subj, 2>4 obj, 3>4 part' },
        { s: 'Somebody_P took_V my_P bag_N .', tr: 'Кто-то взял мою сумку.', graph: '1>2 subj, 3>4 attr, 4>2 obj' },
      ],
    },
  ],
} satisfies TopicBody
