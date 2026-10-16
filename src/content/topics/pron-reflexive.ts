import type { TopicBody } from '../types'

export default {
  summary: 'myself, yourself, himself… — действие возвращается к тому, кто его делает. each other — друг друга.',
  ref: [
    { kind: 'visual', visual: { id: 'pron-grid', focus: 'refl' }, caption: 'Последний столбец сетки: -self (один) и -selves (несколько)' },
    {
      kind: 'rule',
      title: 'Действие возвращается к тебе',
      text: 'Если подлежащее и дополнение — один человек, после глагола ставится форма на -self: myself, yourself, himself, herself, itself; во множественном числе -selves: ourselves, yourselves, themselves. Та же форма усиливает: I did it myself — «сам». by myself — «один».',
      examples: [
        { s: 'I_P looked_V at_I myself_P in_I the_D mirror_N .', tr: 'Я посмотрел на себя в зеркало.' },
        { s: 'I_P made_V this_D cake_N myself_P .', tr: 'Я сам испёк этот торт.' },
        { s: 'Tom_N lives_V by_I himself_P .', tr: 'Том живёт один.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Без -self, в отличие от русского',
      text: 'В русском много глаголов с «-ся»: мыться, одеваться, расслабляться, встречаться. В английском wash, dress, relax, feel, meet, hurry обходятся без -self: I washed before breakfast, Relax!, We met at six.',
      examples: [
        { s: 'Relax_V , Anna_N !', tr: 'Расслабься, Анна!' },
        { s: 'We_P met_V at_I six_M .', tr: 'Мы встретились в шесть.' },
        { s: 'I_P feel_V tired_J .', tr: 'Я чувствую себя усталым.' },
      ],
    },
    {
      kind: 'rule',
      title: 'each other — друг друга',
      text: 'Когда двое или больше действуют друг на друга, нужно each other: Tom and Kate help each other. Сравни с themselves: каждый — самому себе. Они посмотрели на себя в зеркало — themselves.',
      examples: [
        { s: 'Tom_N and_C Kate_N help_V each~other_P .', tr: 'Том и Кейт помогают друг другу.' },
        { s: 'We_P often_R call_V each~other_P .', tr: 'Мы часто звоним друг другу.' },
        { s: 'They_P looked_V at_I themselves_P in_I the_D mirror_N .', tr: 'Они посмотрели на себя в зеркало.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Я_P вижу_V себя_P в_I зеркале_N .',
      en: 'I_P see_V myself_P in_I the_D mirror_N .',
      note: 'В русском «себя» одно на всех лиц. В английском форма меняется: myself, yourself, himself, ourselves. А русскому «-ся» часто не соответствует вообще ничего: мыться — wash, встречаться — meet.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'Please_R relax_V yourself_P .', right: 'Please_R relax_V .', note: 'relax, wash, feel, meet — без -self.' },
        { wrong: 'We_P met_V ourselves_P at_I the_D station_N .', right: 'We_P met_V at_I the_D station_N .', note: 'Встретились — просто we met.' },
        { wrong: 'I_P feel_V myself_P happy_J .', right: 'I_P feel_V happy_J .', note: 'feel + прилагательное: «чувствую себя» без -self.' },
        { wrong: 'Tom_N and_C Kate_N love_V themselves_P .', right: 'Tom_N and_C Kate_N love_V each~other_P .', note: 'Друг друга — each other. themselves = каждый себя.' },
        { wrong: 'I_P did_V it_P by_I me_P .', right: 'I_P did_V it_P by_I myself_P .', note: 'После by («сам, один») — myself, не me.' },
      ],
    },
  ],
  items: [
    {
      id: 'pron-reflexive.myself',
      skill: 'myself — я делаю что-то с собой',
      focus: 'refl.i',
      why: 'Действие возвращается ко мне же — myself. Не me: me — это другой человек.',
      variants: [
        { s: 'I_P cut_V [myself_P] with_I a_D knife_N .', tr: 'Я порезался ножом.', options: ['me', 'my'] },
        { s: 'Let_V me_P introduce_V [myself_P] . I_P +’m_V Ben_N .', tr: 'Позвольте представиться. Я Бен.', options: ['me', 'mine'] },
        { s: 'I_P often_R talk_V to_I [myself_P] in_I the_D car_N .', tr: 'Я часто разговариваю сам с собой в машине.', options: ['me', 'my'] },
      ],
    },
    {
      id: 'pron-reflexive.yourself',
      skill: 'yourself — ты один, yourselves — вы несколько',
      focus: 'refl.you',
      why: 'Обращаешься к одному человеку — yourself, к нескольким — yourselves. -self в единственном, -selves во множественном.',
      variants: [
        { s: 'Anna_N , take_V care_N of_I [yourself_P] .', tr: 'Анна, береги себя.', options: ['you', 'yours'] },
        { s: 'Anna_N and_C Tom_N , did_A you_P paint_V the_D room_N [yourselves_P] ?', tr: 'Анна и Том, вы сами покрасили комнату?', options: ['yourself', 'themselves'] },
        { s: 'Mr~Smith_N , please_R introduce_V [yourself_P] to_I the_D team_N .', tr: 'Мистер Смит, представьтесь, пожалуйста, команде.', options: ['you', 'yourselves'] },
      ],
    },
    {
      id: 'pron-reflexive.himself-herself',
      skill: 'himself, herself, itself — он, она, оно',
      focus: 'refl.he',
      why: 'Форма зависит от того, кто делает действие: he — himself, she — herself, вещь — itself.',
      variants: [
        { s: 'Tom_N taught_V [himself_P] to_X play_V the_D guitar_N .', tr: 'Том сам научился играть на гитаре.', options: ['him', 'herself'] },
        { s: 'Anna_N bought_V [herself_P] a_D new_J coat_N .', tr: 'Анна купила себе новое пальто.', options: ['her', 'himself'] },
        { s: 'The_D heater_N turns_V [itself_P] off_R at_I night_N .', tr: 'Обогреватель сам выключается на ночь.', options: ['himself', 'it'] },
      ],
    },
    {
      id: 'pron-reflexive.plural',
      skill: 'ourselves, themselves — мы и они',
      focus: 'refl.we',
      why: 'Во множественном числе -self превращается в -selves: ourselves, yourselves, themselves.',
      variants: [
        { s: 'We_P really_R enjoyed_V [ourselves_P] at_I the_D concert_N .', tr: 'Нам очень понравилось на концерте.', options: ['us', 'ourself'] },
        { s: 'My_P parents_N built_V the_D garage_N [themselves_P] .', tr: 'Мои родители сами построили гараж.', options: ['them', 'theirselves'] },
        { s: 'Tom_N and_C Kate_N bought_V [themselves_P] a_D sofa_N .', tr: 'Том и Кейт купили себе диван.', options: ['them', 'theirs'] },
      ],
    },
    {
      id: 'pron-reflexive.emphasis',
      skill: '-self усиливает: «сам», «лично»',
      focus: 'refl',
      why: 'Форма на -self после слова или в конце предложения подчёркивает: я сам, он сам, мы сами.',
      variants: [
        { s: 'I_P painted_V the_D fence_N [myself_P] .', tr: 'Я сам покрасил забор.', options: ['me', 'my'] },
        { s: 'The_D manager_N [himself_P] answered_V my_P email_N .', tr: 'Менеджер сам ответил на моё письмо.', options: ['him', 'his'] },
        { s: 'Did_A you_P write_V this_D song_N [yourself_P] ?', tr: 'Ты сам написал эту песню?', options: ['you', 'your'] },
      ],
    },
    {
      id: 'pron-reflexive.by-myself',
      skill: 'by myself — один, без помощи',
      focus: 'refl',
      why: 'by + -self значит «один» или «без помощи». После by нужна форма на -self, не me и не her.',
      variants: [
        { s: 'I_P live_V by_I [myself_P] in_I a_D small_J flat_N .', tr: 'Я живу один в небольшой квартире.', options: ['me', 'my'] },
        { s: 'She_P went_V to_I the_D cinema_N by_I [herself_P] .', tr: 'Она пошла в кино одна.', options: ['her', 'hers'] },
        { s: 'Can_A you_P open_V this_D box_N by_I [yourself_P] ?', tr: 'Ты можешь открыть эту коробку сам?', options: ['you', 'yours'] },
      ],
    },
    {
      id: 'pron-reflexive.no-self',
      mode: 'choice',
      skill: 'relax, meet, feel — без -self',
      focus: 'refl',
      why: 'Русскому «-ся» (расслабиться, встретиться, чувствовать себя) в английском -self не соответствует: просто relax, meet, feel.',
      variants: [
        { q: 'Как сказать по-английски «Расслабься!»?', answer: 'Relax!', options: ['Relax yourself!', 'Relax you!'] },
        { q: 'Как сказать по-английски «Мы встретились в шесть»?', answer: 'We met at six.', options: ['We met ourselves at six.', 'We met us at six.'] },
        { q: 'Как сказать по-английски «Я чувствую себя усталым»?', answer: 'I feel tired.', options: ['I feel myself tired.', 'I feel me tired.'] },
      ],
    },
    {
      id: 'pron-reflexive.each-other',
      skill: 'each other — друг друга',
      focus: 'refl',
      why: 'Двое или больше действуют друг на друга — each other. themselves здесь не подходит: оно значит «каждый себя».',
      variants: [
        { s: 'Tom_N and_C Kate_N help_V [each~other_P] .', tr: 'Том и Кейт помогают друг другу.', options: ['themselves', 'ourselves'], accept: ['one another'] },
        { s: 'We_P don’t_A see_V [each~other_P] very_R often_R .', tr: 'Мы видимся не очень часто.', options: ['ourselves', 'themselves'], accept: ['one another'] },
        { s: 'The_D twins_N never_R argue_V with_I [each~other_P] .', tr: 'Близнецы никогда не спорят друг с другом.', options: ['themselves', 'theirs'], accept: ['one another'] },
      ],
    },
    {
      id: 'pron-reflexive.each-vs-self',
      skill: 'each other — друг друга, themselves — каждый себя',
      focus: 'refl.they',
      why: 'Если действие идёт от одного к другому — each other. Если каждый делает это с самим собой — themselves, ourselves.',
      variants: [
        { s: 'Tom_N and_C Kate_N look_V at_I [each~other_P] and_C smile_V .', tr: 'Том и Кейт смотрят друг на друга и улыбаются.', options: ['themselves', 'ourselves'], accept: ['one another'] },
        { s: 'The_D kids_N are_A looking_V at_I [themselves_P] in_I the_D mirror_N .', tr: 'Дети смотрят на себя в зеркало.', options: ['each other', 'one another'] },
        { s: 'We_P wrote_V [each~other_P] long_J emails_N .', tr: 'Мы писали друг другу длинные письма.', options: ['ourselves', 'us'], accept: ['one another'] },
      ],
    },
    {
      id: 'pron-reflexive.fixed',
      skill: 'enjoy, behave, make… at home — только с -self',
      focus: 'refl',
      why: 'Эти выражения держатся на -self: enjoy yourself («повеселись»), behave yourself («веди себя хорошо»), make yourself at home.',
      variants: [
        { s: 'Did_A you_P enjoy_V [yourself_P] at_I the_D party_N , Lucy_N ?', tr: 'Люси, тебе было весело на вечеринке?', options: ['you', 'yours'] },
        { s: 'Behave_V [yourself_P] , Max_N !', tr: 'Веди себя хорошо, Макс!', options: ['you', 'your'] },
        { s: 'Anna_N and_C Tom_N , please_R make_V [yourselves_P] at_I home_N .', tr: 'Анна и Том, чувствуйте себя как дома.', options: ['yourself', 'you'] },
      ],
    },
    {
      id: 'pron-reflexive.order',
      mode: 'order',
      skill: 'Собрать: действие возвращается к подлежащему',
      focus: 'refl',
      why: 'Форма на -self стоит после глагола: She bought herself a bag. by himself — в конце.',
      variants: [
        { s: 'She_P bought_V herself_P a_D new_J bag_N .', tr: 'Она купила себе новую сумку.', options: ['her'] },
        { s: 'They_P help_V each~other_P with_I their_P homework_N .', tr: 'Они помогают друг другу с домашним заданием.', options: ['themselves'] },
        { s: 'He_P made_V dinner_N by_I himself_P .', tr: 'Он приготовил ужин один.', options: ['him'] },
      ],
    },
    {
      id: 'pron-reflexive.pick',
      mode: 'pick',
      skill: 'Найти местоимение на -self или each other',
      focus: 'refl',
      why: 'Форма на -self возвращает действие к подлежащему, а each other связывает двух людей между собой.',
      variants: [
        { s: 'Ben_N hurt_V {himself_P} at_I the_D gym_N .', q: 'Найди слово, которое возвращает действие к подлежащему.', model: 'Anna_N made_V {herself_P} a_D cup_N of_I tea_N .' },
        { s: 'We_P introduced_V {ourselves_P} to_I the_D neighbours_N .', q: 'Найди слово, которое возвращает действие к подлежащему.', model: 'They_P enjoyed_V {themselves_P} at_I the_D party_N .' },
        { s: 'Tom_N and_C Kate_N like_V {each~other_P} .', q: 'Найди слово со значением «друг друга».', model: 'We_P call_V {each~other_P} every_D day_N .' },
      ],
    },
  ],
} satisfies TopicBody
