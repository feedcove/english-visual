import type { TopicBody } from '../types'

export default {
  summary: 'Несколько прилагательных идут по порядку: мнение, размер, возраст, форма, цвет, происхождение, материал, назначение, потом существительное.',
  ref: [
    { kind: 'visual', visual: { id: 'adj-order', focus: 'opinion' }, caption: 'Слоты перед существительным: слева мнение, справа назначение' },
    {
      kind: 'rule',
      title: 'Порядок: от мнения к назначению',
      text: 'Если перед существительным несколько прилагательных, они идут по порядку: мнение, размер, возраст, форма, цвет, происхождение, материал, назначение. Мнение — дальше всех, а материал и назначение — у самого существительного: a lovely big old house.',
      examples: [
        { s: 'We_P live_V in_I a_D lovely_J big_J old_J house_N .', tr: 'Мы живём в симпатичном большом старом доме.' },
        { s: 'She_P has_V a_D small_J black_J leather_N bag_N .', tr: 'У неё маленькая чёрная кожаная сумка.' },
        { s: 'Anna_N has_V a_D beautiful_J long_J white_J dress_N .', tr: 'У Анны красивое длинное белое платье.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Хватает двух-трёх прилагательных',
      text: 'Обычно ставят два, редко три прилагательных. Чаще всего встречаются мнение, размер, возраст и цвет: a nice big flat, a big black car. Запятая между прилагательными разных типов не нужна.',
      examples: [
        { s: 'We_P have_V a_D nice_J big_J flat_N .', tr: 'У нас хорошая большая квартира.' },
        { s: 'Tom_N drives_V a_D big_J black_J car_N .', tr: 'Том ездит на большой чёрной машине.' },
        { s: 'I_P need_V new_J running_N shoes_N .', tr: 'Мне нужны новые кроссовки для бега.' },
      ],
    },
    {
      kind: 'table',
      title: 'Восемь слотов по порядку',
      head: ['Слот', 'Примеры'],
      rows: [
        ['1. Мнение', 'lovely_J nice_J horrible_J'],
        ['2. Размер', 'big_J small_J little_J'],
        ['3. Возраст', 'old_J new_J young_J'],
        ['4. Форма', 'round_J square_J oval_J'],
        ['5. Цвет', 'red_J black_J white_J'],
        ['6. Происхождение', 'Italian_J Swiss_J Chinese_J'],
        ['7. Материал', 'wooden_J woollen_J plastic_J'],
        ['8. Назначение', 'dining_N sports_N walking_N'],
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Старый_J большой_J красивый_J дом_N .',
      en: 'A_D lovely_J big_J old_J house_N .',
      note: 'В русском прилагательные можно переставлять: «старый большой дом» и «большой старый дом» звучат одинаково. В английском порядок почти закреплён: an old big house — ошибка.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'We_P have_V an_D old_J big_J house_N .', right: 'We_P have_V a_D big_J old_J house_N .', note: 'Размер раньше возраста.' },
        { wrong: 'She_P has_V a_D wooden_J small_J table_N .', right: 'She_P has_V a_D small_J wooden_J table_N .', note: 'Материал стоит ближе всего к существительному.' },
        { wrong: 'He_P drives_V an_D Italian_J red_J car_N .', right: 'He_P drives_V a_D red_J Italian_J car_N .', note: 'Цвет раньше происхождения.' },
        { wrong: 'I_P bought_V a_D black_J nice_J jacket_N .', right: 'I_P bought_V a_D nice_J black_J jacket_N .', note: 'Мнение всегда первым.' },
      ],
    },
    { kind: 'tip', text: 'Мнемоника OSASCOMP: Opinion, Size, Age, Shape, Colour, Origin, Material, Purpose. На практике чаще нужны первые четыре: мнение, размер, возраст, цвет.' },
  ],
  items: [
    {
      id: 'adj-order.opinion-first',
      skill: 'Мнение (nice, lovely) — первым, перед размером и возрастом',
      focus: 'opinion',
      why: 'Мнение (lovely, nice, horrible) стоит первым, потом размер и возраст: lovely little modern.',
      variants: [
        { s: 'She_P lives_V in_I a_D [lovely~little~modern_J] flat_N .', tr: 'Она живёт в симпатичной маленькой современной квартире.', options: ['modern little lovely', 'little lovely modern'] },
        { s: 'I_P bought_V a_D [nice~big~new_J] jacket_N .', tr: 'Я купил хорошую большую новую куртку.', options: ['new big nice', 'big new nice'] },
        { s: 'We_P stayed_V in_I a_D [horrible~big~new_J] hotel_N .', tr: 'Мы остановились в ужасном большом новом отеле.', options: ['new big horrible', 'big horrible new'] },
      ],
    },
    {
      id: 'adj-order.size',
      mode: 'order',
      skill: 'Размер — перед возрастом и цветом: a big old sofa',
      focus: 'size',
      why: 'Размер (big, small) стоит раньше возраста и цвета: a big old sofa, a small red hat.',
      variants: [
        { s: 'We_P have_V a_D big_J old_J sofa_N .', tr: 'У нас большой старый диван.' },
        { s: 'She_P wore_V a_D small_J red_J hat_N .', tr: 'На ней была маленькая красная шляпка.' },
        { s: 'Ben_N has_V a_D small_J white_J dog_N .', tr: 'У Бена маленькая белая собака.' },
      ],
    },
    {
      id: 'adj-order.age',
      skill: 'Возраст (old, new) — перед цветом и материалом',
      focus: 'age',
      why: 'Возраст стоит раньше цвета и материала: new brown wooden, old red woollen.',
      variants: [
        { s: 'There_P is_V a_D [new~brown~wooden_J] chair_N in_I the_D hall_N .', tr: 'В холле стоит новый коричневый деревянный стул.', options: ['brown new wooden', 'wooden new brown'] },
        { s: 'She_P bought_V a_D [modern~white~plastic_J] bin_N .', tr: 'Она купила современное белое пластиковое мусорное ведро.', options: ['white modern plastic', 'plastic modern white'] },
        { s: 'I_P love_V my_P [old~red~woollen_J] scarf_N .', tr: 'Я люблю свой старый красный шерстяной шарф.', options: ['red old woollen', 'woollen old red'] },
      ],
    },
    {
      id: 'adj-order.shape',
      skill: 'Форма (round, square) — после размера, перед цветом',
      focus: 'shape',
      why: 'Форма идёт после размера и перед цветом или материалом: small round wooden.',
      variants: [
        { s: 'We_P have_V a_D [small~round~wooden_J] table_N .', tr: 'У нас маленький круглый деревянный стол.', options: ['round small wooden', 'wooden small round'] },
        { s: 'He_P gave_V me_P a_D [large~square~blue_J] envelope_N .', tr: 'Он дал мне большой квадратный синий конверт.', options: ['square large blue', 'blue large square'] },
        { s: 'I_P need_V a_D [big~round~white_J] plate_N .', tr: 'Мне нужна большая круглая белая тарелка.', options: ['round big white', 'white big round'] },
      ],
    },
    {
      id: 'adj-order.colour',
      mode: 'order',
      skill: 'Цвет — перед происхождением и материалом',
      focus: 'colour',
      why: 'Цвет стоит раньше происхождения и материала: a red Italian car, a black leather jacket.',
      variants: [
        { s: 'She_P has_V a_D red_J Italian_J car_N .', tr: 'У неё красная итальянская машина.' },
        { s: 'Tom_N bought_V a_D black_J leather_N jacket_N .', tr: 'Том купил чёрную кожаную куртку.' },
        { s: 'She_P wears_V a_D blue_J cotton_N shirt_N .', tr: 'Она носит синюю хлопковую рубашку.' },
      ],
    },
    {
      id: 'adj-order.origin',
      skill: 'Происхождение (Swiss, Greek) — перед материалом',
      focus: 'origin',
      why: 'Происхождение (откуда?) идёт после мнения и размера, но раньше материала: small Swiss wooden.',
      variants: [
        { s: 'He_P has_V a_D [small~Swiss~wooden_J] clock_N .', tr: 'У него небольшие швейцарские деревянные часы.', options: ['Swiss small wooden', 'wooden small Swiss'] },
        { s: 'She_P wears_V a_D [lovely~Greek~silver_J] ring_N .', tr: 'Она носит красивое греческое серебряное кольцо.', options: ['Greek lovely silver', 'silver lovely Greek'] },
        { s: 'I_P need_V a_D [cheap~Japanese~plastic_J] watch_N .', tr: 'Мне нужны дешёвые японские пластиковые часы.', options: ['Japanese cheap plastic', 'plastic cheap Japanese'] },
      ],
    },
    {
      id: 'adj-order.material',
      mode: 'order',
      skill: 'Материал — прямо перед существительным',
      focus: 'material',
      why: 'Материал (из чего?) стоит почти у самого существительного: a big woollen hat, а не a woollen big hat.',
      variants: [
        { s: 'He_P wore_V a_D big_J woollen_J hat_N .', tr: 'На нём была большая шерстяная шапка.' },
        { s: 'We_P need_V a_D big_J plastic_J bag_N .', tr: 'Нам нужен большой пластиковый пакет.' },
        { s: 'Max_N has_V an_D old_J wooden_J desk_N .', tr: 'У Макса старый деревянный стол.' },
      ],
    },
    {
      id: 'adj-order.purpose',
      mode: 'order',
      skill: 'Назначение (sports, dining) — последним, у существительного',
      focus: 'purpose',
      why: 'Слово «для чего?» (sports, washing, walking) стоит ближе всех к существительному: a blue sports bag.',
      variants: [
        { s: 'She_P bought_V a_D small_J blue_J sports_N bag_N .', tr: 'Она купила маленькую синюю спортивную сумку.' },
        { s: 'Anna_N bought_V a_D new_J washing_N machine_N .', tr: 'Анна купила новую стиральную машину.' },
        { s: 'Max_N is_A wearing_V his_P new_J walking_N boots_N .', tr: 'На Максе его новые походные ботинки.' },
      ],
    },
  ],
} satisfies TopicBody
