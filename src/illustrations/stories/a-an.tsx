import { Bubble, Frame, Label, Person, Prop, Scene } from '../kit'
import { Part } from '../kit/extra/nouns'
import type { TopicStories } from '../types'

// a / an: решает первый ЗВУК слова, а не буква. Человек произносит слово, звук — в пузыре речи.
// Выделен артикль (det) в подписи слова. Вторая история: артикль смотрит на слово сразу за ним (a big apple, an old car).

/** Человек говорит слово: в пузыре — его первый звук, под пузырём — гласный он или согласный. */
function Say({ sound, tag }: { sound: string; tag: string }) {
  return (
    <>
      <Person x={46} y={168} pose="talk" s={1.5} />
      <Bubble x={124} y={50} w={112} h={58} tail="left">
        <Label x={124} y={61} size={30} weight={700}>
          {sound}
        </Label>
      </Bubble>
      <Label x={158} y={106} size={12} muted>
        {tag}
      </Label>
    </>
  )
}

/** Пояснение над предметом справа: две строки по 12. */
function Note({ a, b }: { a: string; b?: string }) {
  return (
    <>
      <Label x={254} y={44} size={12} muted>
        {a}
      </Label>
      {b && (
        <Label x={254} y={60} size={12} muted>
          {b}
        </Label>
      )}
    </>
  )
}

export default [
  {
    id: 'a-an.sound',
    title: 'a или an: слушай первый звук, а не смотри на букву',
    focus: ['a', 'an'],
    frames: [
      {
        scene: (
          <Scene label="Человек говорит «cat»: первый звук «к» — согласный, поэтому a cat">
            <Say sound="/k/" tag="согласный звук" />
            <Prop name="cat" x={254} y={168} s={1.8} />
            <Label x={254} y={192} size={20}>
              <Part pos="det">a</Part> cat
            </Label>
          </Scene>
        ),
        en: 'I_P have_V {a_D} cat_N .',
        ru: 'Слышим «к» — согласный звук. Перед согласным звуком — a.',
      },
      {
        scene: (
          <Scene label="Человек говорит «apple»: первый звук «э» — гласный, поэтому an apple">
            <Say sound="/æ/" tag="гласный звук" />
            <Prop name="apple" x={254} y={168} s={1.8} />
            <Label x={254} y={192} size={20}>
              <Part pos="det">an</Part> apple
            </Label>
          </Scene>
        ),
        en: 'I_P have_V {an_D} apple_N .',
        ru: 'Слышим «э» — гласный звук. Перед гласным звуком — an.',
      },
      {
        scene: (
          <Scene label="Слово university начинается с буквы u, но звучит «ю»: согласный звук, поэтому a university">
            <Say sound="/juː/" tag="согласный звук" />
            <Note a="пишем u," b="слышим «ю»" />
            <Prop name="university" x={254} y={168} s={1.6} />
            <Label x={254} y={192} size={20}>
              <Part pos="det">a</Part> university
            </Label>
          </Scene>
        ),
        en: 'Lucy_N studies_V at_I {a_D} university_N .',
        ru: 'Пишем u, но слышим «ю», то есть «й» + «у»: первый звук согласный. Поэтому a, а не an.',
      },
      {
        scene: (
          <Scene label="Слово hour начинается с буквы h, но она молчит: слышно «ау», гласный звук, поэтому an hour">
            <Say sound="/aʊ/" tag="гласный звук" />
            <Note a="пишем h," b="но она молчит" />
            <Prop name="clock-wall" x={254} y={168} s={1.7} />
            <Label x={254} y={192} size={20}>
              <Part pos="det">an</Part> hour
            </Label>
          </Scene>
        ),
        en: 'We_P waited_V for_I {an_D} hour_N .',
        ru: 'Буква h первая, но её не слышно: слышим «ау». Первый звук гласный — an.',
      },
    ],
  },
  {
    id: 'a-an.next-word',
    title: 'a big apple, но an old car: артикль смотрит на соседнее слово',
    focus: ['a', 'an'],
    frames: [
      {
        scene: (
          <Scene label="Рядом с артиклем стоит apple: первый звук гласный, поэтому an apple">
            <Bubble x={179} y={34} w={80} h={36} tail="left">
              <Label x={179} y={44} size={20} weight={700}>
                /æ/
              </Label>
            </Bubble>
            <Frame x={140} y={62} w={78} h={36} />
            <Label x={136} y={88} anchor="end" size={26}>
              <Part pos="det">an</Part>
            </Label>
            <Label x={146} y={88} anchor="start" size={26}>
              apple
            </Label>
            <Prop name="apple" x={160} y={168} s={1.4} />
          </Scene>
        ),
        en: 'Anna_N has_V {an_D} apple_N .',
        ru: 'Сразу за артиклем идёт apple, он начинается на «э» — гласный. Значит, an.',
      },
      {
        scene: (
          <Scene label="Между артиклем и apple встало big: рядом с артиклем теперь «б», согласный звук, поэтому a big apple">
            <Bubble x={134} y={34} w={70} h={36} tail="left">
              <Label x={134} y={44} size={20} weight={700}>
                /b/
              </Label>
            </Bubble>
            <Frame x={108} y={62} w={52} h={36} />
            <Label x={104} y={88} anchor="end" size={26}>
              <Part pos="det">a</Part>
            </Label>
            <Label x={114} y={88} anchor="start" size={26}>
              big
            </Label>
            <Label x={170} y={88} anchor="start" size={26} muted>
              apple
            </Label>
            <Prop name="apple" x={160} y={168} s={1.7} />
          </Scene>
        ),
        en: 'Anna_N has_V {a_D} big_J apple_N .',
        ru: 'Яблоко то же, но рядом с артиклем теперь big — «б», согласный звук. Артикль меняется на a.',
      },
      {
        scene: (
          <Scene label="Слово old начинается с гласного звука, а car — с согласного; артикль смотрит на old, поэтому an old car">
            <Bubble x={155} y={34} w={76} h={36} tail="left">
              <Label x={155} y={44} size={20} weight={700}>
                /əʊ/
              </Label>
            </Bubble>
            <Frame x={129} y={62} w={52} h={36} />
            <Label x={125} y={88} anchor="end" size={26}>
              <Part pos="det">an</Part>
            </Label>
            <Label x={135} y={88} anchor="start" size={26}>
              old
            </Label>
            <Label x={185} y={88} anchor="start" size={26} muted>
              car
            </Label>
            <Prop name="car" x={160} y={168} s={1.6} />
          </Scene>
        ),
        en: 'Tom_N drives_V {an_D} old_J car_N .',
        ru: 'Решает слово сразу за артиклем, а не существительное: old начинается с гласного звука, car — с согласного. Поэтому an old car.',
      },
    ],
  },
] satisfies TopicStories
