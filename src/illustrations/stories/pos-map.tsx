import { Arrow, Frame, Label, Person, Prop, Scene } from '../kit'
import { Ask, Chip, Tie } from '../kit/extra/words'
import type { TopicStories } from '../types'

// Части речи картинкой: существительное — предмет, прилагательное — метка на предмете, глагол — стрелка,
// наречие — метка на стрелке, предлог — связка между предметами, союз — скрепка между двумя сценами.
// Выделено цветом одно: та часть речи, о которой кадр.

export default [
  {
    id: 'pos-map.build-up',
    title: 'Предмет, признак, действие: как слова собираются в картинку',
    focus: ['noun', 'adj', 'verb', 'adv', 'questions'],
    frames: [
      {
        scene: (
          <Scene label="Собака — предмет, на который можно показать пальцем">
            <Prop name="dog" x={160} y={168} s={2.6} hl pos="noun" />
            <Label x={160} y={191} pos="noun" size={15}>
              dog
            </Label>
          </Scene>
        ),
        en: 'I_P can_A see_V a_D {dog_N} .',
        ru: 'Предмет: на него можно показать пальцем. Кто? что? — существительное.',
      },
      {
        scene: (
          <Scene label="На собаке висит метка «big»: признак предмета">
            <Prop name="dog" x={150} y={168} s={2.5} />
            <Chip x={128} y={46} pos="adj">
              big
            </Chip>
            <Tie from={[128, 62]} to={[128, 98]} />
            <Ask x={166} y={51} anchor="start">
              какая?
            </Ask>
          </Scene>
        ),
        en: 'It_P is_V a_D {big_J} dog_N .',
        ru: 'Признак висит на предмете, как метка, и отвечает «какой?». Это прилагательное.',
      },
      {
        scene: (
          <Scene label="Стрелка от собаки вперёд: действие «runs»">
            <Prop name="dog" x={86} y={168} s={2.3} />
            <Arrow from={[158, 124]} to={[298, 124]} tone="action" label="runs" bend={-14} />
          </Scene>
        ),
        en: 'The_D big_J dog_N {runs_V} .',
        ru: 'Действие — стрелка: она начинается у того, кто делает. Что делает? — глагол.',
      },
      {
        scene: (
          <Scene label="На стрелке бега висит метка «fast»: признак действия">
            <Prop name="dog" x={86} y={168} s={2.3} />
            <Arrow from={[158, 124]} to={[298, 124]} tone="ink" label="runs" bend={-14} />
            <Chip x={226} y={62} pos="adv">
              fast
            </Chip>
            <Tie from={[226, 78]} to={[226, 112]} />
            <Ask x={266} y={67} anchor="start">
              как?
            </Ask>
          </Scene>
        ),
        en: 'The_D big_J dog_N runs_V {fast_R} .',
        ru: 'Метка теперь на стрелке, а не на предмете: как бежит? Признак действия — наречие.',
      },
    ],
  },
  {
    id: 'pos-map.same-word',
    title: 'Одно слово fast: метка на предмете или на стрелке?',
    focus: ['adj', 'adv', 'questions'],
    frames: [
      {
        scene: (
          <Scene label="Метка fast висит на машине: какая машина?">
            <Prop name="car" x={160} y={168} s={2.6} />
            <Chip x={160} y={48} pos="adj">
              fast
            </Chip>
            <Tie from={[160, 64]} to={[160, 92]} />
            <Ask x={206} y={53} anchor="start">
              какая?
            </Ask>
          </Scene>
        ),
        en: 'Ben_N has_V a_D {fast_J} car_N .',
        ru: 'fast на предмете отвечает «какая машина?» — прилагательное.',
      },
      {
        scene: (
          <Scene label="Метка fast висит на стрелке движения: как едет?">
            <Prop name="car" x={66} y={168} s={2} />
            <Arrow from={[126, 134]} to={[292, 134]} tone="ink" label="drives" bend={-14} />
            <Chip x={212} y={72} pos="adv">
              fast
            </Chip>
            <Tie from={[212, 88]} to={[212, 122]} />
            <Ask x={254} y={77} anchor="start">
              как?
            </Ask>
          </Scene>
        ),
        en: 'Ben_N drives_V {fast_R} .',
        ru: 'То же fast, но на стрелке-действии: как едет? — наречие. В русском «быстрая» и «быстро» отличаются окончанием, в английском — только местом.',
      },
      {
        scene: (
          <Scene label="Одно и то же слово fast на машине и на стрелке; различает только место">
            <Prop name="car" x={62} y={168} s={1.9} />
            <Chip x={62} y={72}>
              fast
            </Chip>
            <Tie from={[62, 88]} to={[62, 108]} />
            <Arrow from={[120, 136]} to={[294, 136]} tone="ink" label="goes" bend={-14} />
            <Chip x={214} y={74} pos="adv">
              fast
            </Chip>
            <Tie from={[214, 90]} to={[214, 124]} />
          </Scene>
        ),
        en: 'A_D fast_J car_N goes_V {fast_R} .',
        ru: 'Слово одно, а роль по месту: на предмете — какая? (прилагательное), на стрелке — как? (наречие).',
      },
    ],
  },
  {
    id: 'pos-map.link-words',
    title: 'Предлог и союз: связки',
    focus: ['prep', 'conj'],
    frames: [
      {
        scene: (
          <Scene label="Кошка в коробке; плашка «in» связывает кошку с коробкой">
            <Prop name="cat" x={104} y={132} s={1.6} />
            <Prop name="box" x={104} y={168} s={2.2} />
            <Chip x={252} y={92} pos="prep">
              in
            </Chip>
            <Tie from={[236, 84]} to={[130, 104]} />
            <Tie from={[240, 106]} to={[146, 146]} />
          </Scene>
        ),
        en: 'The_D cat_N is_V {in_I} the_D box_N .',
        ru: 'Предлог связывает два предмета и говорит, как они расположены. Сам он ничего не называет: in без коробки ничего не значит.',
      },
      {
        scene: (
          <Scene label="Две сцены — чай у него и кофе у неё — соединены скрепкой «and»" ground={false}>
            <Frame x={10} y={34} w={140} h={140} />
            <Frame x={170} y={34} w={140} h={140} />
            <Person x={48} y={158} pose="stand" s={1.15} />
            <Prop name="tea" x={110} y={158} s={1.5} />
            <Person x={208} y={158} pose="stand" hair="long" tone={1} s={1.15} />
            <Prop name="coffee" x={272} y={158} s={1.5} />
            <Chip x={160} y={100} pos="conj">
              and
            </Chip>
          </Scene>
        ),
        en: 'I_P like_V tea_N {and_C} Kate_N likes_V coffee_N .',
        ru: 'Союз скрепляет две целые сцены, а не предметы внутри одной: у каждой свой глагол.',
      },
    ],
  },
] satisfies TopicStories
