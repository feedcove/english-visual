import type { TopicBody } from '../types'

export default {
  summary: 'Чья вещь: владелец идёт первым и получает ’s — Anna’s bag. Для вещей чаще of: the end of the film.',
  ref: [
    { kind: 'visual', visual: { id: 'possessive-s', focus: 's' }, caption: 'Чей? Сначала владелец с ’s, потом вещь' },
    {
      kind: 'rule',
      title: 'Один владелец: имя + ’s',
      text: 'К одному владельцу добавляем ’s и ставим его перед вещью: Anna’s bag. По-русски наоборот — «сумка Анны». В английском сначала владелец, потом вещь.',
      examples: [
        { s: 'This_P is_V Anna’s_N bag_N .', tr: 'Это сумка Анны.' },
        { s: 'Where_R is_V my_P brother’s_N car_N ?', tr: 'Где машина моего брата?' },
      ],
    },
    {
      kind: 'rule',
      title: 'Мн. число и имена на -s',
      text: 'Если слово уже кончается на -s, ставим только апостроф: my parents’ house. Мн. число без -s (children, men, women) берёт ’s: the children’s room. Имя на -s: James’s car или James’ car — оба варианта верны.',
      examples: [
        { s: 'I_P love_V my_P parents’_N garden_N .', tr: 'Я люблю сад моих родителей.' },
        { s: 'This_P is_V the_D children’s_N room_N .', tr: 'Это детская комната.' },
        { s: 'Is_V this_P James’s_N car_N ?', tr: 'Это машина Джеймса?' },
      ],
    },
    {
      kind: 'rule',
      title: 'Вещи — of, общая вещь — один ’s',
      text: 'Для вещей и мест обычно of: the end of the film, the top of the page. ’s — для людей и животных. Если предмет один на двоих, ’s ставим только у последнего: Tom and Kate’s flat.',
      examples: [
        { s: 'We_P missed_V the_D end_N of_I the_D film_N .', tr: 'Мы пропустили конец фильма.' },
        { s: 'Tom_N and_C Kate’s_N flat_N is_V small_J .', tr: 'Квартира Тома и Кейт маленькая.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Это_P машина_N моего_P брата_N .',
      en: 'It_P is_V my_P brother’s_N car_N .',
      note: 'В русском владелец стоит после вещи и меняет форму (брата). В английском владелец идёт перед вещью и получает ’s: my brother’s car.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'the_D car_N of_I my_P brother_N', right: 'my_P brother’s_N car_N', note: 'Для людей: владелец + ’s, а не of.' },
        { wrong: 'my_P brother_N car_N', right: 'my_P brother’s_N car_N', note: 'Без ’s слова «брат» и «машина» не связаны.' },
        { wrong: 'my_P parents’s_N house_N', right: 'my_P parents’_N house_N', note: 'После -s — только апостроф.' },
        { wrong: 'the_D childrens_N room_N', right: 'the_D children’s_N room_N', note: 'Children без -s, поэтому ’s.' },
        { wrong: 'the_D room’s_N middle_N', right: 'the_D middle_N of_I the_D room_N', note: 'Для вещей и мест обычно of.' },
        { wrong: 'Tom’s_N and_C Kate’s_N flat_N', right: 'Tom_N and_C Kate’s_N flat_N', note: 'Одна общая квартира: ’s только у второго.' },
      ],
    },
    { kind: 'tip', text: 'Задай к вещи вопрос «чей?». Ответ — владелец: Whose bag? — Anna’s. Владелец стоит перед вещью, и на нём ’s.' },
  ],
  items: [
    {
      id: 'possessive-s.one-owner',
      skill: 'Один владелец: имя + ’s — Anna’s bag',
      focus: 's',
      why: 'Владелец идёт первым, к нему добавляем ’s: Anna’s bag — сумка Анны.',
      variants: [
        { s: 'Is_V this_P [Tom’s_N] phone_N ?', tr: 'Это телефон Тома?', options: ['Tom', 'Toms', 'Toms’'] },
        { s: 'Where_R is_V [Kate’s_N] office_N ?', tr: 'Где офис Кейт?', options: ['Kate', 'Kates', 'Kates’'] },
        { s: 'My_P [sister’s_N] husband_N is_V a_D teacher_N .', tr: 'Муж моей сестры — учитель.', options: ['sister', 'sisters', 'sisters’'] },
      ],
    },
    {
      id: 'possessive-s.order-trap',
      mode: 'order',
      skill: 'Сначала владелец, потом вещь: «машина брата» = brother’s car',
      focus: 's',
      why: 'По-русски вещь идёт первой: машина брата. По-английски наоборот: владелец + ’s, потом вещь.',
      variants: [
        { s: 'This_P is_V my_P uncle’s_N car_N .', tr: 'Это машина моего дяди.', options: ['of', 'uncles'] },
        { s: 'I_P like_V Anna’s_N new_J flat_N .', tr: 'Мне нравится новая квартира Анны.', options: ['of', 'Annas'] },
        { s: 'Where_R is_V your_P mother’s_N phone_N ?', tr: 'Где телефон твоей мамы?', options: ['of', 'mothers'] },
      ],
    },
    {
      id: 'possessive-s.plural-owners',
      skill: 'Владельцев несколько (-s): только апостроф — parents’',
      focus: 's-plural',
      why: 'Если слово уже кончается на -s, добавляем только апостроф: my parents’ house.',
      variants: [
        { s: 'This_P is_V my_P [parents’_N] house_N .', tr: 'Это дом моих родителей.', options: ['parents', 'parent’s', 'parents’s'] },
        { s: 'These_P are_V my_P [friends’_N] bikes_N .', tr: 'Это велосипеды моих друзей.', options: ['friends', 'friend’s', 'friends’s'] },
        {
          s: 'We_P go_V to_I our_P [grandparents’_N] house_N at_I the_D weekend_N .',
          tr: 'По выходным мы ездим в дом бабушки и дедушки.',
          options: ['grandparents', 'grandparent’s', 'grandparents’s'],
        },
      ],
    },
    {
      id: 'possessive-s.irregular-plural',
      skill: 'Мн. ч. без -s: children’s, men’s, women’s — с ’s',
      focus: 'irregular-plural',
      why: 'Слова children, men, women не кончаются на -s, поэтому добавляем ’s, как к одному владельцу.',
      variants: [
        { s: 'The_D [children’s_N] toys_N are_V everywhere_R .', tr: 'Детские игрушки повсюду.', options: ['childrens', 'childrens’', 'children’'] },
        { s: 'The_D shop_N sells_V [men’s_N] shoes_N .', tr: 'В магазине продают мужскую обувь.', options: ['mens', 'mens’', 'men’'] },
        { s: 'The_D [women’s_N] team_N won_V again_R .', tr: 'Женская команда снова победила.', options: ['womens', 'womens’', 'women’'] },
      ],
    },
    {
      id: 'possessive-s.ends-s',
      skill: 'Имя на -s: James’s и James’ — оба верны',
      focus: 's',
      why: 'К имени на -s можно добавить ’s или только апостроф: James’s car = James’ car.',
      variants: [
        { s: '[James’s_N] dog_N is_V very_R friendly_J .', tr: 'Собака Джеймса очень дружелюбная.', options: ['James', 'Jame’s'], accept: ['James’'] },
        {
          s: 'Chris_N lives_V next~door_R . Do_A you_P know_V [Chris’s_N] sister_N ?',
          tr: 'Крис живёт по соседству. Ты знаешь его сестру?',
          options: ['Chris', 'Chriss’'],
          accept: ['Chris’'],
        },
        { s: 'We_P are_V at_I [Mr~Jones’s_N] house_N .', tr: 'Мы в доме мистера Джонса.', options: ['Mr Jones', 'Mr Joness’'], accept: ['Mr Jones’'] },
      ],
    },
    {
      id: 'possessive-s.of-things',
      skill: 'Для вещей — of: the end of the film',
      focus: 'of',
      why: 'Для вещей и мест обычно of: the end of the film, the top of the page. ’s — для людей и животных.',
      variants: [
        { s: 'I_P didn’t_A like_V the_D end_N [of_I] the_D book_N .', tr: 'Мне не понравился конец книги.', options: ['from', 'to'] },
        { s: 'Write_V your_P name_N at_I the_D top_N [of_I] the_D page_N .', tr: 'Напиши имя вверху страницы.', options: ['from', 'to'] },
        { s: 'There_P is_V a_D table_N in_I the_D middle_N [of_I] the_D room_N .', tr: 'Посреди комнаты стоит стол.', options: ['from', 'to'] },
      ],
    },
    {
      id: 'possessive-s.double-owner',
      skill: 'Общая вещь: Tom and Kate’s flat — ’s только у второго',
      focus: 's',
      why: 'Если вещь одна на двоих, ’s ставим только после последнего владельца: Mum and Dad’s car.',
      variants: [
        { s: 'Ben_N and_C [Anna’s_N] son_N is_V five_M .', tr: 'Сыну Бена и Анны пять лет.', options: ['Anna', 'Annas'] },
        { s: 'Mum_N and_C [Dad’s_N] car_N is_V very_R old_J .', tr: 'Машина мамы и папы очень старая.', options: ['Dad', 'Dads'] },
        { s: 'We_P went_V to_I Max_N and_C [Lucy’s_N] wedding_N .', tr: 'Мы были на свадьбе Макса и Люси.', options: ['Lucy', 'Lucys'] },
      ],
    },
    {
      id: 'possessive-s.choose-form',
      mode: 'choice',
      skill: 'Выбрать верную форму: «сумка Анны», «комната детей»',
      focus: 's',
      variants: [
        {
          q: 'Как сказать «сумка Анны»?',
          answer: 'Anna’s bag',
          options: ['bag Anna', 'Annas bag', 'bag of Anna'],
          why: 'Владелец идёт первым и получает ’s: Anna’s bag.',
        },
        {
          q: 'Как сказать «ключи моих родителей»?',
          answer: 'my parents’ keys',
          options: ['my parent’s keys', 'my parents’s keys', 'my keys parents'],
          why: 'Parents уже на -s, поэтому только апостроф. Parent’s — это один родитель.',
        },
        {
          q: 'Как сказать «комната детей»?',
          answer: 'the children’s room',
          options: ['the childrens’ room', 'the children room', 'the child’s room'],
          why: 'Children без -s, поэтому ’s. The child’s room — комната одного ребёнка.',
        },
        {
          q: 'Как сказать «конец фильма»?',
          answer: 'the end of the film',
          options: ['the film end', 'the end film', 'the end of film'],
          why: 'Для вещей — of, и артикль остаётся: the end of the film.',
        },
      ],
    },
    {
      id: 'possessive-s.graph',
      mode: 'graph',
      skill: 'Anna’s — определение: отвечает на вопрос «чей?»',
      focus: 's',
      why: 'Слово с ’s описывает вещь, как прилагательное: оно отвечает «чей?» и висит на вещи.',
      variants: [
        { s: 'Anna’s_N bag_N is_V red_J .', tr: 'Сумка Анны красная.', graph: '1>2 attr, 2>3 subj, 4>3 compl' },
        { s: 'My_P parents’_N house_N is_V big_J .', tr: 'Дом моих родителей большой.', graph: '1>2 attr, 2>3 attr, 3>4 subj, 5>4 compl' },
        { s: 'Tom_N likes_V Kate’s_N new_J bike_N .', tr: 'Тому нравится новый велосипед Кейт.', graph: '1>2 subj, 3>5 attr, 4>5 attr, 5>2 obj' },
      ],
    },
    {
      id: 'possessive-s.pick-owner',
      mode: 'pick',
      skill: 'Найти слово, которое отвечает на «чей?»',
      focus: 's',
      why: 'Слово с ’s называет владельца и стоит перед вещью: Tom’s phone.',
      variants: [
        {
          s: 'This_P is_V {Tom’s_N} new_J phone_N .',
          q: 'Найди владельца: чей предмет?',
          tr: 'Это новый телефон Тома.',
          model: 'Is_V that_P {Anna’s_N} bag_N ?',
        },
        {
          s: 'I_P like_V my_P {brother’s_N} car_N .',
          q: 'Найди владельца: чей предмет?',
          tr: 'Мне нравится машина моего брата.',
          model: 'We_P met_V {Lucy’s_N} sister_N .',
        },
        {
          s: 'The_D {children’s_N} room_N is_V on_I the_D left_N .',
          q: 'Найди владельца: чей предмет?',
          tr: 'Детская комната слева.',
          model: 'Our_P {neighbours’_N} garden_N is_V big_J .',
        },
      ],
    },
  ],
} satisfies TopicBody
