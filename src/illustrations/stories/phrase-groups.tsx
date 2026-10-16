import { Arrow, Frame, Person, Prop, Scene } from '../kit'
import { Chip, Tie } from '../kit/extra/words'
import type { TopicStories } from '../types'

// Группа слов — рамка вокруг слова и всех, кто на нём висит: NP вокруг существительного, PP — предлог с его NP,
// VP — глагол с дополнением. Цвет рамки — часть речи главного слова группы.

export default [
  {
    id: 'phrase-groups.frame-around',
    title: 'Группа слов — рамка вокруг слова и его признаков',
    focus: ['groups', 'attr', 'prep', 'root'],
    frames: [
      {
        scene: (
          <Scene label="Рамка NP вокруг машины и висящих на ней слов the, old, red">
            <Frame x={74} y={34} w={172} h={142} pos="noun" label="NP" />
            <Prop name="car" x={160} y={168} s={2.2} />
            <Chip x={110} y={70}>
              the
            </Chip>
            <Chip x={160} y={70}>
              old
            </Chip>
            <Chip x={210} y={70}>
              red
            </Chip>
            <Tie from={[116, 84]} to={[132, 104]} />
            <Tie from={[160, 84]} to={[160, 102]} />
            <Tie from={[204, 84]} to={[190, 104]} />
          </Scene>
        ),
        en: 'I_P like_V {the~old~red~car_N} .',
        ru: 'Возьми существительное и всё, что на нём висит, — получится NP. Рамка держится за главное слово: car.',
      },
      {
        scene: (
          <Scene label="Рамка PP вокруг предлога in и группы a small house; Anna стоит снаружи">
            <Person x={44} y={168} pose="stand" hair="long" tone={1} s={1.4} />
            <Frame x={104} y={34} w={200} h={142} pos="prep" label="PP" />
            <Prop name="house" x={236} y={168} s={2.2} />
            <Chip x={134} y={70}>
              in
            </Chip>
            <Chip x={176} y={70}>
              a
            </Chip>
            <Chip x={238} y={70}>
              small
            </Chip>
            <Tie from={[134, 84]} to={[196, 116]} />
            <Tie from={[176, 84]} to={[212, 96]} />
            <Tie from={[238, 84]} to={[236, 94]} />
          </Scene>
        ),
        en: 'Anna_N lives_V {in~a~small~house_I} .',
        ru: 'PP — предлог вместе со своей NP: in и a small house в одной рамке. Anna в неё не входит.',
      },
      {
        scene: (
          <Scene label="Рамка VP вокруг стрелки reads и книги a long book; Anna стоит снаружи">
            <Person x={44} y={168} pose="stand" hair="long" tone={1} s={1.4} />
            <Frame x={92} y={34} w={216} h={142} pos="verb" label="VP" />
            <Arrow from={[108, 136]} to={[188, 136]} tone="ink" label="reads" bend={-8} />
            <Prop name="book" x={250} y={168} s={1.9} />
            <Chip x={222} y={70}>
              a
            </Chip>
            <Chip x={274} y={70}>
              long
            </Chip>
            <Tie from={[222, 84]} to={[240, 124]} />
            <Tie from={[274, 84]} to={[262, 124]} />
          </Scene>
        ),
        en: 'Anna_N {reads~a~long~book_V} .',
        ru: 'VP — глагол и всё, что от него зависит: reads, дополнение book и его a long. Подлежащее — вне VP.',
      },
    ],
  },
  {
    id: 'phrase-groups.s-np-vp',
    title: 'Предложение — две группы: кто (NP) и что с ним (VP)',
    focus: ['groups', 'subj', 'root'],
    frames: [
      {
        scene: (
          <Scene label="Левая рамка NP вокруг мужчины в чёрном пальто — длинное подлежащее; правая группа ещё без выделения" ground={false}>
            <Frame x={8} y={26} w={146} h={148} pos="noun" label="NP" />
            <Frame x={170} y={26} w={142} h={148} />
            <Person x={80} y={158} pose="stand" tone={3} s={1.2} />
            <Chip x={80} y={46} size={12}>
              black coat
            </Chip>
            <Tie from={[80, 58]} to={[80, 66]} />
            <Arrow from={[180, 132]} to={[228, 132]} tone="ink" bend={-6} />
            <Person x={276} y={158} pose="stand" flip tone={2} s={1.2} />
          </Scene>
        ),
        en: '{The~man~in~the~black~coat_N} is_V my_P uncle_N .',
        ru: 'Подлежащее может быть длинным: мужчина в чёрном пальто — одна NP. Она кончается прямо перед глаголом.',
      },
      {
        scene: (
          <Scene label="Теперь выделена правая группа VP: стрелка is к дяде; левая NP без выделения" ground={false}>
            <Frame x={8} y={26} w={146} h={148} />
            <Frame x={170} y={26} w={142} h={148} pos="verb" label="VP" />
            <Person x={80} y={158} pose="stand" tone={3} s={1.2} />
            <Chip x={80} y={46} size={12}>
              black coat
            </Chip>
            <Tie from={[80, 58]} to={[80, 66]} />
            <Arrow from={[180, 132]} to={[228, 132]} tone="ink" label="is" bend={-6} />
            <Person x={276} y={158} pose="stand" flip tone={2} s={1.2} />
            <Chip x={252} y={46} size={12}>
              my uncle
            </Chip>
            <Tie from={[262, 58]} to={[272, 66]} />
          </Scene>
        ),
        en: 'The_D man_N in_I the_D black_J coat_N {is~my~uncle_V} .',
        ru: 'Всё, что начинается с глагола, — вторая группа: VP. Предложение S = NP + VP.',
      },
    ],
  },
  {
    id: 'phrase-groups.telescope',
    title: 'I saw the man with the telescope: к кому прицепилась рамка',
    focus: ['groups', 'prep'],
    frames: [
      {
        scene: (
          <Scene label="Телескоп в руках у говорящего: рамка PP with the telescope прицеплена к стрелке saw">
            <Person x={44} y={168} pose="look" s={1.4} />
            <Arrow from={[84, 40]} to={[232, 40]} tone="ink" label="saw" bend={-10} />
            <Frame x={86} y={76} w={92} h={98} pos="prep" label="PP" />
            <Chip x={132} y={100} size={12}>
              with
            </Chip>
            <Prop name="telescope" x={132} y={166} s={1.5} />
            <Tie from={[132, 76]} to={[132, 42]} />
            <Person x={268} y={168} pose="stand" flip tone={1} s={1.4} />
          </Scene>
        ),
        en: 'I_P saw_V the_D man_N {with~the~telescope_I} .',
        ru: 'Телескоп у меня: группа with the telescope висит на глаголе saw — я увидел мужчину в телескоп.',
      },
      {
        scene: (
          <Scene label="Телескоп у мужчины: рамка PP with the telescope прицеплена к man">
            <Person x={44} y={168} pose="look" s={1.4} />
            <Arrow from={[84, 40]} to={[232, 40]} tone="ink" label="saw" bend={-10} />
            <Frame x={160} y={76} w={96} h={98} pos="prep" label="PP" />
            <Chip x={208} y={100} size={12}>
              with
            </Chip>
            <Prop name="telescope" x={208} y={166} s={1.5} />
            <Person x={286} y={168} pose="stand" flip tone={1} s={1.4} />
            <Tie from={[256, 106]} to={[276, 106]} />
          </Scene>
        ),
        en: 'I_P saw_V the_D man_N {with~the~telescope_I} .',
        ru: 'Телескоп у мужчины: та же группа теперь висит на man. Слова те же, граф другой.',
      },
    ],
  },
] satisfies TopicStories
