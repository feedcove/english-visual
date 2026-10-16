import type { TopicBody } from '../types'

// Группы слов (NP, VP, PP) как поддеревья графа; связь с деревом составляющих Хомского.

const NP = 'NP — группа существительного'
const VP = 'VP — группа глагола'
const PP = 'PP — предлог и его группа'

export default {
  summary: 'Группа — это слово и всё, что на нём висит: NP вокруг существительного, VP вокруг глагола, PP — предлог с его NP.',
  ref: [
    { kind: 'visual', visual: { id: 'sentence-graph', focus: 'groups' }, caption: 'Рамки вокруг поддеревьев: NP, VP и PP — те же группы, что в дереве Хомского' },
    {
      kind: 'rule',
      title: 'Группа — слово и всё, что на нём висит',
      text: 'Возьми слово из графа и всё, что от него зависит, — получится группа. Вокруг существительного это NP, вокруг глагола — VP, предлог со своей NP — PP. Это форма, а не роль: NP может быть и подлежащим, и дополнением.',
      examples: [
        { s: 'the_D old_J red_J car_N', tr: 'старая красная машина (NP)' },
        { s: 'reads_V a_D long_J book_N', tr: 'читает длинную книгу (VP)' },
        { s: 'in_I the_D big_J room_N', tr: 'в большой комнате (PP)' },
      ],
    },
    {
      kind: 'rule',
      title: 'S → NP VP: дерево Хомского',
      text: 'Предложение S делится на две группы: NP (подлежащее) и VP (сказуемое со всем, что за ним). Длинное подлежащее — тоже одна NP, пока не встретится глагол. Граница проходит прямо перед ним.',
      examples: [
        { s: 'Tom_N lives_V in_I London_N .', tr: 'Том живёт в Лондоне.' },
        { s: 'The_D man_N in_I the_D black_J coat_N is_V my_P uncle_N .', tr: 'Мужчина в чёрном пальто — мой дядя.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Одна фраза — два дерева',
      text: 'Фраза I saw the man with the telescope понимается двумя способами. Если with the telescope висит на saw — телескоп был у меня. Если на man — он был у мужчины. Слова те же, граф разный.',
      examples: [
        { s: 'I_P saw_V the_D man_N with_I the_D telescope_N .', tr: 'Я смотрел в телескоп и увидел мужчину.' },
        { s: 'I_P saw_V the_D man_N with_I the_D telescope_N .', tr: 'Я увидел мужчину, у которого был телескоп.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Мужчина_N в_I чёрном_J пальто_N живёт_V здесь_R .',
      en: 'The_D man_N in_I the_D black_J coat_N lives_V here_R .',
      note: 'Группа подлежащего та же: мужчина в чёрном пальто. В русском нет артиклей, а порядок внутри групп свободнее, но предлог по-прежнему собирает свою группу: в чёрном пальто.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'Подлежащее — одно слово man', right: 'Подлежащее — вся NP: The man in the black coat', note: 'Всё, что висит на man, входит в подлежащее.' },
        { wrong: 'Предлог — отдельное слово, без своей группы', right: 'Предлог собирает группу со словами после него: in the garden', note: 'PP = предлог + NP; вся PP висит на глаголе или существительном.' },
        { wrong: 'VP — только глагол', right: 'VP — глагол и всё, что от него зависит: reads a long book', note: 'Дополнение и PP входят в VP.' },
        { wrong: 'NP, VP, PP — подлежащее, сказуемое, дополнение', right: 'NP, VP, PP — группы слов, роль они получают в предложении', note: 'NP бывает и подлежащим, и дополнением.' },
      ],
    },
    { kind: 'tip', text: 'Проверка группы: замени её одним местоимением. The man in the black coat → he. Подошло — это одна NP, и это целиком подлежащее.' },
  ],
  items: [
    {
      id: 'phrase-groups.np',
      mode: 'pick',
      skill: 'NP — существительное со всем, что при нём: a big red bag',
      focus: 'groups',
      why: 'NP — существительное вместе с артиклем и описаниями. Они вместе отвечают на «что?».',
      variants: [
        { s: 'Tom_N bought_V {a_D} {big_J} {red_J} {bag_N} .', tr: 'Том купил большую красную сумку.', q: 'Выдели NP — то, что купил Том' },
        { s: 'My_P sister_N has_V {a_D} {tiny_J} {white_J} {cat_N} .', tr: 'У моей сестры крошечная белая кошка.', q: 'Выдели NP — то, что есть у сестры' },
        { s: 'Max_N cooked_V {a_D} {tasty_J} {dinner_N} .', tr: 'Макс приготовил вкусный ужин.', q: 'Выдели NP — то, что приготовил Макс' },
      ],
    },
    {
      id: 'phrase-groups.vp',
      mode: 'pick',
      skill: 'VP — глагол и всё, что от него зависит',
      focus: 'groups',
      why: 'VP — сказуемое со всем после подлежащего: дополнение, обстоятельства, вспомогательный.',
      variants: [
        { s: 'Anna_N {is_A} {reading_V} {a_D} {long_J} {book_N} .', tr: 'Анна читает длинную книгу.', q: 'Выдели VP — глагол со всем, что от него зависит' },
        { s: 'Our_P neighbours_N {live_V} {in_I} {a_D} {small_J} {flat_N} .', tr: 'Наши соседи живут в маленькой квартире.', q: 'Выдели VP — глагол со всем, что от него зависит' },
        { s: 'Ben_N {will_A} {visit_V} {his_P} {aunt_N} {tomorrow_R} .', tr: 'Бен завтра навестит свою тётю.', q: 'Выдели VP — глагол со всем, что от него зависит' },
      ],
    },
    {
      id: 'phrase-groups.pp',
      mode: 'pick',
      skill: 'PP — предлог вместе со своей NP: in a small office',
      focus: 'prep',
      why: 'PP = предлог + NP. Предлог не стоит один: он тянет за собой всю группу существительного.',
      variants: [
        { s: 'Anna_N works_V {in_I} {a_D} {small_J} {office_N} .', tr: 'Анна работает в маленьком офисе.', q: 'Выдели PP — предлог с его группой' },
        { s: 'The_D shoes_N are_V {behind_I} {the_D} {door_N} .', tr: 'Обувь стоит за дверью.', q: 'Выдели PP — предлог с его группой' },
        { s: 'We_P have_V lunch_N {after_I} {the_D} {meeting_N} .', tr: 'Мы обедаем после совещания.', q: 'Выдели PP — предлог с его группой' },
      ],
    },
    {
      id: 'phrase-groups.label',
      mode: 'choice',
      skill: 'Назвать группу: NP, VP или PP',
      focus: 'groups',
      why: 'Смотри на главное слово группы: существительное — NP, глагол — VP, предлог — PP.',
      variants: [
        { s: 'Kate_N lives_V {in_I} {a_D} {big_J} {house_N} .', tr: 'Кейт живёт в большом доме.', q: 'Какая группа выделена?', answer: PP, options: [NP, VP], why: 'Группа начинается с предлога in, значит это PP.' },
        { s: '{The_D} {new_J} {teacher_N} speaks_V English_N .', tr: 'Новый учитель говорит по-английски.', q: 'Какая группа выделена?', answer: NP, options: [VP, PP], why: 'Главное слово — teacher, существительное, значит NP.' },
        { s: 'Tom_N {drinks_V} {black_J} {coffee_N} .', tr: 'Том пьёт чёрный кофе.', q: 'Какая группа выделена?', answer: VP, options: [NP, PP], why: 'Главное слово — drinks, глагол: вместе с дополнением получается VP.' },
      ],
    },
    {
      id: 'phrase-groups.inside',
      mode: 'pick',
      skill: 'Внутри PP есть NP: предлог + (артикль, прилагательное, существительное)',
      focus: 'groups',
      why: 'PP содержит NP: если убрать предлог, останется группа существительного.',
      variants: [
        { s: 'Tom_N is_A waiting_V in_I {a_D} {long_J} {queue_N} .', tr: 'Том стоит в длинной очереди.', q: 'Выдели NP внутри PP (без предлога)' },
        { s: 'Anna_N will_A wait_V at_I {the_D} {main_J} {entrance_N} .', tr: 'Анна будет ждать у главного входа.', q: 'Выдели NP внутри PP (без предлога)' },
        { s: 'Lucy_N is_A talking_V to_I {her_P} {new_J} {boss_N} .', tr: 'Люси разговаривает с новым начальником.', q: 'Выдели NP внутри PP (без предлога)' },
      ],
    },
    {
      id: 'phrase-groups.long-subj',
      mode: 'pick',
      skill: 'Длинное подлежащее — одна NP: всё до глагола',
      focus: 'groups',
      why: 'Подлежащее — вся NP до глагола: PP висит на главном существительном и входит в подлежащее.',
      variants: [
        { s: '{The_D} {man_N} {in_I} {the_D} {grey_J} {suit_N} is_V my_P boss_N .', tr: 'Мужчина в сером костюме — мой начальник.', q: 'Выдели всё подлежащее — NP перед глаголом' },
        { s: '{The_D} {girl_N} {with_I} {the_D} {red_J} {bag_N} works_V here_R .', tr: 'Девушка с красной сумкой работает здесь.', q: 'Выдели всё подлежащее — NP перед глаголом' },
        { s: '{Our_P} {neighbours_N} {from_I} {the_D} {top_J} {floor_N} are_V very_R noisy_J .', tr: 'Наши соседи с верхнего этажа очень шумные.', q: 'Выдели всё подлежащее — NP перед глаголом' },
      ],
    },
    {
      id: 'phrase-groups.subj-boundary',
      mode: 'choice',
      skill: 'Где кончается подлежащее: перед глаголом после группы',
      focus: 'subj',
      why: 'Последнее слово подлежащего — то, что стоит прямо перед глаголом, но не сам глагол.',
      variants: [
        { s: 'The_D woman_N with_I the_D small_J dog_N lives_V here_R .', tr: 'Женщина с маленькой собакой живёт здесь.', q: 'Какое слово — последнее в группе подлежащего?', answer: 'dog', options: ['woman', 'lives'] },
        { s: 'The_D boys_N from_I my_P class_N play_V football_N .', tr: 'Мальчики из моего класса играют в футбол.', q: 'Какое слово — последнее в группе подлежащего?', answer: 'class', options: ['boys', 'play'] },
        { s: 'The_D lady_N behind_I the_D desk_N is_V our_P manager_N .', tr: 'Женщина за столом — наш менеджер.', q: 'Какое слово — последнее в группе подлежащего?', answer: 'desk', options: ['lady', 'is'] },
      ],
    },
    {
      id: 'phrase-groups.s-parts',
      mode: 'choice',
      skill: 'Предложение S = NP + VP; VP = глагол + NP или PP',
      focus: 'groups',
      why: 'Дерево Хомского: S делится на NP и VP, а VP — на глагол и его дополнение (NP) или PP.',
      variants: [
        { s: 'Lucy_N works_V in_I a_D bank_N .', tr: 'Люси работает в банке.', q: 'Из каких двух групп состоит предложение S?', answer: 'NP + VP', options: ['VP + PP', 'NP + PP'], why: 'Lucy — NP, works in a bank — VP. PP in a bank внутри VP.' },
        { s: 'The_D new_J manager_N {speaks_V} {three_M} {languages_N} .', tr: 'Новый менеджер говорит на трёх языках.', q: 'Из чего состоит выделенная VP?', answer: 'глагол + NP', options: ['глагол + PP', 'NP + PP'] },
        { s: 'Ben_N {sat_V} {on_I} {the_D} {sofa_N} .', tr: 'Бен сел на диван.', q: 'Из чего состоит выделенная VP?', answer: 'глагол + PP', options: ['глагол + NP', 'NP + PP'] },
      ],
    },
    {
      id: 'phrase-groups.pp-attach',
      mode: 'choice',
      skill: 'PP цепляется к глаголу или к существительному: два дерева',
      focus: 'groups',
      why: 'Одна PP висит либо на глаголе (как «чем?»), либо на существительном (как «какой?»): от этого зависит смысл.',
      variants: [
        { s: 'I_P saw_V the_D man_N {with_I} {the_D} {telescope_N} .', tr: 'Я увидел мужчину с телескопом.', q: 'Я смотрел в телескоп. К какому слову относится PP with the telescope?', answer: 'saw (глагол)', options: ['man (существительное)', 'I (местоимение)'] },
        { s: 'I_P saw_V the_D man_N {with_I} {the_D} {telescope_N} .', tr: 'Я увидел мужчину с телескопом.', q: 'У мужчины был телескоп. К какому слову относится PP with the telescope?', answer: 'man (существительное)', options: ['saw (глагол)', 'I (местоимение)'] },
        { s: 'Tom_N photographed_V the_D girl_N {with_I} {a_D} {camera_N} .', tr: 'Том сфотографировал девушку с камерой.', q: 'Том снимал камерой. К какому слову относится PP with a camera?', answer: 'photographed (глагол)', options: ['girl (существительное)', 'Tom (подлежащее)'] },
      ],
    },
    {
      id: 'phrase-groups.subtree',
      mode: 'pick',
      skill: 'Группа в графе: слово и всё, что на нём висит',
      focus: 'groups',
      why: 'Начни с главного слова и собери всё, что на нём висит: артикль, прилагательное, усилитель. Это его группа.',
      variants: [
        { s: '{A_D} {very_R} {tall_J} {man_N} was_A waiting_V outside_R .', tr: 'Снаружи ждал очень высокий мужчина.', q: 'Выдели слово man и всё, что на нём висит', why: 'very висит на tall, tall — на man, a — на man. Все четыре слова — одна NP.' },
        { s: '{Мой_P} {старый_J} {друг_N} живёт_V здесь_R .', lang: 'ru', tr: 'My old friend lives here.', q: 'Выдели слово друг и всё, что на нём висит' },
        { s: '{Эта_P} {красная_J} {сумка_N} стоит_V дорого_R .', lang: 'ru', tr: 'This red bag is expensive.', q: 'Выдели слово сумка и всё, что на нём висит' },
      ],
    },
  ],
} satisfies TopicBody
