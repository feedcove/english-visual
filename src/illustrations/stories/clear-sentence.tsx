import { Arrow, Frame, Label, Many, Person, Prop, Scene } from '../kit'
import type { TopicStories } from '../types'

// Ясное предложение (совет Уильямса, не закон): кто делает — подлежащее, что делает — глагол = стрелка.
// Ясно: человек — стрелка-глагол — предмет. Туманно: действие «застыло» в существительное (рамка цветом noun),
// а стрелка стала слабой (пунктир: is done by, carried out, осуществляется).

const DOCS = { name: 'paper', n: 3, gap: 26, s: 1.4 } as const

export default [
  {
    id: 'clear-sentence.who-does-what',
    title: 'Кто что делает: действие — глагол, а не существительное',
    focus: ['root', 'subj', 'obj'],
    frames: [
      {
        scene: (
          <Scene label="Бухгалтер, стрелка-действие checks и стопка документов: кто, что делает, что">
            <Person x={62} y={168} pose="stand" s={1.5} />
            <Many {...DOCS} x={214} y={168} />
            <Arrow from={[102, 96]} to={[198, 104]} tone="action" label="checks" bend={-14} />
            <Label x={62} y={190} size={13} muted>
              the accountant
            </Label>
            <Label x={238} y={190} size={13} muted>
              the documents
            </Label>
          </Scene>
        ),
        en: 'The_D accountant_N {checks_V} the_D documents_N .',
        ru: 'Кто → что делает → что: герой в подлежащем, действие — глагол-стрелка. Понятно с первого взгляда.',
      },
      {
        scene: (
          <Scene label="Документы спрятаны под рамкой checking; бухгалтер далеко справа, к рамке ведёт слабая пунктирная стрелка is done by">
            <Frame x={20} y={92} w={132} h={76} pos="noun" label="checking" />
            <Many {...DOCS} x={50} y={162} />
            <Person x={262} y={168} pose="stand" flip s={1.5} />
            <Arrow from={[228, 108]} to={[160, 118]} tone="dim" dashed bend={10} />
            <Label x={192} y={90} size={12} muted>
              is done by
            </Label>
            <Label x={262} y={190} size={13} muted>
              the accountant
            </Label>
          </Scene>
        ),
        en: 'The_D {checking_N} of_I the_D documents_N is_A done_V by_I the_D accountant_N .',
        ru: 'Действие застыло в существительном checking, а герой спрятан в конце. Читателю надо догадываться, кто что сделал.',
      },
      {
        scene: (
          <Scene label="Бухгалтер слева; слабая стрелка carried out ведёт к рамке a check, дальше документы">
            <Person x={44} y={168} pose="stand" s={1.4} />
            <Arrow from={[76, 84]} to={[134, 84]} tone="action" dashed />
            <Label x={105} y={106} size={12} pos="verb">
              carried out
            </Label>
            <Frame x={140} y={62} w={72} h={42} />
            <Label x={176} y={87} size={13}>
              a check
            </Label>
            <Many {...DOCS} x={232} y={168} />
            <Label x={44} y={190} size={13} muted>
              Anna
            </Label>
          </Scene>
        ),
        en: 'Anna_N {carried~out_V} a_D check_N of_I the_D documents_N .',
        ru: 'Пустой глагол carried out не делает дела, всё действие — в слове check. Верни его в глагол: Anna checked the documents.',
      },
    ],
  },
  {
    id: 'clear-sentence.ru-officialese',
    title: 'Канцелярит: «осуществляется» → «проверяет»',
    focus: ['root', 'subj'],
    frames: [
      {
        scene: (
          <Scene label="Над документами башня из двух блоков Проведение и проверки; бухгалтер справа, к башне идёт слабая пунктирная стрелка осуществляется">
            <Many {...DOCS} x={36} y={168} />
            <g data-pos="noun">
              <Frame x={22} y={64} w={104} h={30} pos="noun" />
              <Label x={74} y={85} size={13} pos="noun">
                проверки
              </Label>
            </g>
            <Frame x={22} y={30} w={104} h={30} />
            <Label x={74} y={51} size={13} muted>
              Проведение
            </Label>
            <Person x={262} y={168} pose="stand" flip s={1.5} />
            <Arrow from={[232, 100]} to={[136, 84]} tone="dim" dashed bend={-10} />
            <Label x={184} y={120} size={12} muted>
              осуществляется
            </Label>
            <Label x={262} y={190} size={13} muted>
              бухгалтером
            </Label>
          </Scene>
        ),
        en: 'Проведение_N {проверки_N} документов_N осуществляется_V бухгалтером_N .',
        lang: 'ru',
        ru: 'Действие «проверить» застряло в существительных, а «осуществляется» ничего не делает. Бухгалтер — в самом конце.',
      },
      {
        scene: (
          <Scene label="Бухгалтер, стрелка-действие проверяет и стопка документов">
            <Person x={62} y={168} pose="stand" s={1.5} />
            <Many {...DOCS} x={214} y={168} />
            <Arrow from={[102, 96]} to={[198, 104]} tone="action" bend={-14} />
            <Label x={150} y={82} size={13} pos="verb">
              проверяет
            </Label>
            <Label x={62} y={190} size={13} muted>
              бухгалтер
            </Label>
            <Label x={238} y={190} size={13} muted>
              документы
            </Label>
          </Scene>
        ),
        en: 'Бухгалтер_N {проверяет_V} документы_N .',
        lang: 'ru',
        ru: 'Снова «кто → что делает → что»: три слова вместо пяти. Так же и по-английски.',
      },
    ],
  },
  {
    id: 'clear-sentence.noun-ok',
    title: 'Когда существительное уместно',
    focus: ['root'],
    frames: [
      {
        scene: (
          <Scene label="Том думает, стрелка decided ведёт к двери: он решил уйти">
            <Person x={62} y={168} pose="think" s={1.5} />
            <Prop name="door" x={240} y={168} s={1.8} />
            <Arrow from={[106, 84]} to={[212, 100]} tone="action" bend={-16} />
            <Label x={159} y={72} size={13} pos="verb">
              decided
            </Label>
            <Label x={62} y={190} size={13} muted>
              Tom
            </Label>
            <Label x={240} y={190} size={13} muted>
              to leave
            </Label>
          </Scene>
        ),
        en: 'Tom_N {decided_V} to_X leave_V .',
        ru: 'Сначала действие называем глаголом: кто, что сделал.',
      },
      {
        scene: (
          <Scene label="Решение Тома уже известно: оно в рамке the decision с кольцом; от него стрелка surprised к двум людям">
            <Frame x={18} y={92} w={116} h={76} pos="noun" label="the decision" />
            <Prop name="door" x={76} y={162} s={1.2} />
            <Arrow from={[142, 124]} to={[212, 124]} tone="action" bend={-6} />
            <Label x={177} y={110} size={13} pos="verb">
              surprised
            </Label>
            <Person x={238} y={168} flip s={1.1} tone={1} />
            <Person x={284} y={168} flip s={1.1} hair="long" tone={2} />
            <Label x={261} y={190} size={13} muted>
              us
            </Label>
          </Scene>
        ),
        en: 'The_D {decision_N} surprised_V us_P .',
        ru: 'Решение уже названо, теперь это короткий ярлык. Существительное уместно, когда речь о нём уже была: совет, а не закон.',
      },
    ],
  },
] satisfies TopicStories
