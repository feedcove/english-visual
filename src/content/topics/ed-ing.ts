import type { TopicBody } from '../types'

export default {
  summary: 'Человек чувствует — bored (-ed). Вещь или событие вызывает чувство — boring (-ing).',
  ref: [
    { kind: 'visual', visual: { id: 'ed-ing', focus: 'ed' }, caption: 'Источник чувства (-ing) → человек, который его испытывает (-ed)' },
    {
      kind: 'rule',
      title: 'Человек чувствует: -ed',
      text: 'Прилагательное на -ed говорит, что чувствует человек: I am bored — мне скучно. Оно часто стоит после be, feel, look.',
      examples: [
        { s: 'I_P am_V bored_J .', tr: 'Мне скучно.' },
        { s: 'She_P felt_V tired_J .', tr: 'Она чувствовала усталость.' },
        { s: 'We_P are_V excited_J .', tr: 'Мы в восторге.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Вещь вызывает: -ing',
      text: 'Прилагательное на -ing говорит, что вызывает чувство: the film is boring — фильм скучный. Так описывают вещи, события, новости, а иногда и людей.',
      examples: [
        { s: 'The_D film_N is_V boring_J .', tr: 'Фильм скучный.' },
        { s: 'It_P was_V a_D tiring_J day_N .', tr: 'Это был утомительный день.' },
        { s: 'That_D is_V surprising_J news_N .', tr: 'Это удивительная новость.' },
      ],
    },
    {
      kind: 'table',
      title: 'Пары, которые стоит знать',
      head: ['Человек чувствует: -ed', 'Вещь вызывает: -ing'],
      rows: [
        ['bored_J', 'boring_J'],
        ['interested_J', 'interesting_J'],
        ['tired_J', 'tiring_J'],
        ['excited_J', 'exciting_J'],
        ['surprised_J', 'surprising_J'],
        ['confused_J', 'confusing_J'],
        ['embarrassed_J', 'embarrassing_J'],
        ['worried_J', 'worrying_J'],
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Мне_P скучно_R : фильм_N скучный_J .',
      en: 'I_P +’m_V bored_J : the_D film_N is_V boring_J .',
      note: 'В русском два разных слова: «скучно» (мне) и «скучный» (фильм). В английском корень один, а окончание показывает, кто чувствует (-ed) и что вызывает чувство (-ing).',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I_P +’m_V boring_J .', right: 'I_P +’m_V bored_J .', note: 'Скучно мне — bored. boring — это я сам скучный.' },
        { wrong: 'The_D film_N was_V bored_J .', right: 'The_D film_N was_V boring_J .', note: 'Фильм вызывает скуку — boring.' },
        { wrong: 'I_P +’m_V interesting_J in_I music_N .', right: 'I_P +’m_V interested_J in_I music_N .', note: 'Меня интересует — interested in.' },
        { wrong: 'We_P are_V very_R exciting_J about_I the_D trip_N .', right: 'We_P are_V very_R excited_J about_I the_D trip_N .', note: 'Мы испытываем чувство — excited.' },
        { wrong: 'It_P was_V a_D tired_J day_N .', right: 'It_P was_V a_D tiring_J day_N .', note: 'День утомляет — tiring.' },
      ],
    },
    { kind: 'tip', text: 'Проверка: спроси «кто чувствует?» — это -ed. Спроси «что вызывает чувство?» — это -ing.' },
  ],
  items: [
    {
      id: 'ed-ing.bored-boring',
      skill: 'bored — мне скучно, boring — скучный',
      focus: 'ed',
      why: 'Кому скучно — bored. Что скучное — boring.',
      variants: [
        { s: 'I_P am_V [bored_J] in_I this_D lesson_N .', tr: 'Мне скучно на этом уроке.', options: ['boring', 'bore'], why: 'Мне скучно, я испытываю чувство — bored.' },
        { s: 'This_D book_N is_V so_R [boring_J] that_C I_P can’t_A finish_V it_P .', tr: 'Эта книга такая скучная, что я не могу её дочитать.', options: ['bored', 'bore'], why: 'Книга вызывает скуку — boring.' },
        { s: 'Max_N was_V [bored_J] , so_C he_P checked_V his_P phone_N .', tr: 'Максу было скучно, поэтому он проверил телефон.', options: ['boring', 'bore'], why: 'Максу скучно, он чувствует скуку — bored.' },
      ],
    },
    {
      id: 'ed-ing.interested-interesting',
      skill: 'interested — интересуется, interesting — интересный',
      focus: 'ing',
      why: 'Кого интересует — interested (in). Что интересное — interesting.',
      variants: [
        { s: 'Anna_N is_V [interested_J] in_I old_J films_N .', tr: 'Анна интересуется старыми фильмами.', options: ['interesting', 'interest'], why: 'Анну что-то интересует — interested in.' },
        { s: 'That_D was_V an_D [interesting_J] talk_N about_I London_N .', tr: 'Это был интересный доклад о Лондоне.', options: ['interested', 'interest'], why: 'Доклад вызывает интерес — interesting.' },
        { s: 'I_P find_V his_P stories_N very_R [interesting_J] .', tr: 'Его рассказы кажутся мне очень интересными.', options: ['interested', 'interest'], why: 'Рассказы вызывают интерес — interesting.' },
      ],
    },
    {
      id: 'ed-ing.tired-tiring',
      skill: 'tired — усталый, tiring — утомительный',
      focus: 'ing',
      why: 'Кто устал — tired. Что утомляет — tiring.',
      variants: [
        { s: 'I_P +’m_V [tired_J] after_I a_D long_J day_N .', tr: 'Я устал после долгого дня.', options: ['tiring', 'tire'], why: 'Я чувствую усталость — tired.' },
        { s: 'Driving_N at_I night_N is_V very_R [tiring_J] .', tr: 'Ездить ночью очень утомительно.', options: ['tired', 'tire'], why: 'Езда утомляет — tiring.' },
        { s: 'The_D long_J walk_N was_V [tiring_J] .', tr: 'Долгая прогулка была утомительной.', options: ['tired', 'tire'], why: 'Прогулка утомляет — tiring.' },
      ],
    },
    {
      id: 'ed-ing.excited-exciting',
      skill: 'excited — в восторге, exciting — захватывающий',
      focus: 'ed',
      why: 'Кто в восторге — excited. Что захватывает — exciting.',
      variants: [
        { s: 'Tom_N is_V [excited_J] about_I the_D trip_N .', tr: 'Том в восторге от предстоящей поездки.', options: ['exciting', 'excite'], why: 'Том испытывает восторг — excited.' },
        { s: 'The_D match_N was_V really_R [exciting_J] .', tr: 'Матч был по-настоящему захватывающим.', options: ['excited', 'excite'], why: 'Матч вызывает волнение — exciting.' },
        { s: 'The_D kids_N are_V [excited_J] because_C it_P is_A snowing_V .', tr: 'Дети в восторге, потому что идёт снег.', options: ['exciting', 'excite'], why: 'Дети испытывают восторг — excited.' },
      ],
    },
    {
      id: 'ed-ing.surprised-surprising',
      skill: 'surprised — удивлён, surprising — удивительный',
      focus: 'ing',
      why: 'Кто удивлён — surprised. Что удивительно — surprising.',
      variants: [
        { s: 'I_P was_V [surprised_J] to_X see_V Anna_N at_I the_D party_N .', tr: 'Я удивился, увидев Анну на вечеринке.', options: ['surprising', 'surprise'], why: 'Я испытываю удивление — surprised.' },
        { s: 'It_P is_V [surprising_J] that_C the_D shop_N is_V closed_J .', tr: 'Удивительно, что магазин закрыт.', options: ['surprised', 'surprise'], why: 'Факт вызывает удивление — surprising.' },
        { s: 'Her_P answer_N was_V quite_R [surprising_J] .', tr: 'Её ответ был довольно неожиданным.', options: ['surprised', 'surprise'], why: 'Ответ вызывает удивление — surprising.' },
      ],
    },
    {
      id: 'ed-ing.confused-confusing',
      skill: 'confused — запутался, confusing — запутанный',
      focus: 'ed',
      why: 'Кто запутался — confused. Что запутывает — confusing.',
      variants: [
        { s: 'I_P +’m_V [confused_J] : which_D train_N do_A I_P take_V ?', tr: 'Я запутался: на какой поезд мне садиться?', options: ['confusing', 'confuse'], why: 'Я растерян — confused.' },
        { s: 'The_D instructions_N are_V very_R [confusing_J] .', tr: 'Инструкции очень запутанные.', options: ['confused', 'confuse'], why: 'Инструкции запутывают — confusing.' },
        { s: 'The_D tourists_N were_V [confused_J] by_I the_D signs_N .', tr: 'Туристы были озадачены указателями.', options: ['confusing', 'confuse'], why: 'Туристы растеряны — confused.' },
      ],
    },
    {
      id: 'ed-ing.embarrassed-embarrassing',
      skill: 'embarrassed — смущён, embarrassing — неловкий',
      focus: 'ing',
      why: 'Кому неловко — embarrassed. Что неловкое — embarrassing.',
      variants: [
        { s: 'Kate_N felt_V [embarrassed_J] when_C she_P forgot_V his_P name_N .', tr: 'Кейт стало неловко, когда она забыла его имя.', options: ['embarrassing', 'embarrass'], why: 'Кейт смутилась — embarrassed.' },
        { s: 'It_P was_V an_D [embarrassing_J] mistake_N .', tr: 'Это была неловкая ошибка.', options: ['embarrassed', 'embarrass'], why: 'Ошибка ставит в неловкое положение — embarrassing.' },
        { s: 'My_P dad’s_N jokes_N are_V so_R [embarrassing_J] !', tr: 'От шуток моего папы так неловко!', options: ['embarrassed', 'embarrass'], why: 'Шутки вызывают неловкость — embarrassing.' },
      ],
    },
    {
      id: 'ed-ing.worried-worrying',
      skill: 'worried — встревожен, worrying — тревожный',
      focus: 'ed',
      why: 'Кто волнуется — worried. Что тревожит — worrying.',
      variants: [
        { s: 'Anna_N is_V [worried_J] about_I her_P exam_N .', tr: 'Анна волнуется из-за экзамена.', options: ['worrying', 'worry'], why: 'Анна тревожится — worried.' },
        { s: 'The_D news_N about_I the_D delay_N is_V [worrying_J] .', tr: 'Новость о задержке вызывает тревогу.', options: ['worried', 'worry'], why: 'Новость тревожит — worrying.' },
        { s: 'Don’t_A look_V so_R [worried_J] , it_P +’s_V only_R a_D test_N .', tr: 'Не делай такое встревоженное лицо, это всего лишь тест.', options: ['worrying', 'worry'], why: 'Лицо человека, который тревожится — worried.' },
      ],
    },
  ],
} satisfies TopicBody
