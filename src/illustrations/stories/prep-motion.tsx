import { Arrow, Frame, Label, Many, Person, Prop, Scene } from '../kit'
import type { TopicStories } from '../types'

// Предлоги движения: пунктирная стрелка (Arrow tone="motion") — путь, ориентир серый, выделен предлог (цвет prep).
// Одна и та же сцена меняет только путь стрелки относительно ориентира: к нему, внутрь, наружу, сквозь, поперёк, вдоль, мимо.

export default [
  {
    id: 'prep-motion.to-into-out',
    title: 'to, into, out of: к цели, внутрь, наружу',
    focus: ['to', 'into', 'out-of'],
    frames: [
      {
        scene: (
          <Scene label="Кошка бежит к коробке: пунктирная стрелка заканчивается у стенки коробки">
            <Prop name="cat" x={50} y={168} s={1.5} />
            <Prop name="box" x={232} y={168} s={2} hl pos="prep" />
            <Arrow from={[88, 146]} to={[182, 146]} tone="motion" bend={-6} />
            <Label x={135} y={130} size={13} pos="prep">
              to
            </Label>
          </Scene>
        ),
        en: 'The_D cat_N runs_V {to_I} the_D box_N .',
        ru: 'Стрелка дошла до коробки и остановилась снаружи. Движение к цели — to.',
      },
      {
        scene: (
          <Scene label="Кошка прыгает в коробку: стрелка идёт дугой и заканчивается внутри коробки">
            <Prop name="cat" x={50} y={168} s={1.5} />
            <Prop name="box" x={232} y={168} s={2} hl pos="prep" />
            <Arrow from={[84, 112]} to={[228, 108]} tone="motion" bend={-62} />
            <Label x={156} y={52} size={13} pos="prep">
              into
            </Label>
          </Scene>
        ),
        en: 'The_D cat_N jumps_V {into_I} the_D box_N .',
        ru: 'Стрелка перешла границу и осталась внутри. Из «снаружи» в «внутри» — into.',
      },
      {
        scene: (
          <Scene label="Кошка в коробке; стрелка выходит изнутри коробки наружу, влево">
            <Prop name="cat" x={232} y={132} s={1.5} />
            <Prop name="box" x={232} y={168} s={2} hl pos="prep" />
            <Arrow from={[206, 104]} to={[86, 152]} tone="motion" bend={-40} />
            <Label x={128} y={92} size={13} pos="prep">
              out of
            </Label>
          </Scene>
        ),
        en: 'The_D cat_N jumps_V {out~of_I} the_D box_N .',
        ru: 'Теперь стрелка начинается внутри и уходит за границу. Изнутри наружу — out of.',
      },
    ],
  },
  {
    id: 'prep-motion.path',
    title: 'through, across, along, past: путь относительно ориентира',
    focus: ['through', 'across', 'along', 'past'],
    frames: [
      {
        scene: (
          <Scene label="Машина слева, туннель в центре; стрелка проходит сквозь туннель и выходит справа">
            <Prop name="car" x={44} y={168} s={1.3} />
            <Prop name="tunnel" x={186} y={168} s={2.4} hl pos="prep" />
            <Arrow from={[78, 150]} to={[300, 150]} tone="motion" />
            <Label x={186} y={64} size={13} pos="prep">
              through
            </Label>
          </Scene>
        ),
        en: 'We_P drove_V {through_I} the_D tunnel_N .',
        ru: 'Стрелка входит с одной стороны и выходит с другой — внутри объёма. Сквозь — through.',
      },
      {
        scene: (
          <Scene label="Человек стоит на левом берегу реки; стрелка дугой перелетает реку на правый берег">
            <g data-pos="prep" className="st-hl">
              <rect x="104" y="164" width="112" height="26" className="st-thing" />
              <path d="M114 177 q6 -5 12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0 t12 0" className="st-line" />
            </g>
            <Person x={62} y={168} pose="walk" s={1.4} />
            <Arrow from={[92, 100]} to={[252, 156]} tone="motion" bend={-38} />
            <Label x={176} y={84} size={13} pos="prep">
              across
            </Label>
          </Scene>
        ),
        en: 'Ben_N walked_V {across_I} the_D river_N .',
        ru: 'Стрелка ложится поперёк реки: с одного берега на другой. Поперёк — across.',
      },
      {
        scene: (
          <Scene label="Длинный забор; стрелка идёт параллельно ему, вдоль всей длины">
            <Person x={40} y={168} pose="walk" s={1.4} />
            {[108, 181, 254].map((x) => (
              <Prop key={x} name="fence" x={x} y={168} s={1.35} hl pos="prep" />
            ))}
            <Arrow from={[76, 114]} to={[300, 114]} tone="motion" />
            <Label x={188} y={102} size={13} pos="prep">
              along
            </Label>
          </Scene>
        ),
        en: 'Anna_N walked_V {along_I} the_D fence_N .',
        ru: 'Стрелка идёт рядом с длинным предметом и повторяет его линию. Вдоль — along.',
      },
      {
        scene: (
          <Scene label="Магазин в центре; стрелка проходит перед ним и продолжается дальше, не заходя">
            <Person x={40} y={168} pose="walk" s={1.4} />
            <Prop name="shop" x={176} y={168} s={1.5} hl pos="prep" />
            <Arrow from={[74, 182]} to={[304, 182]} tone="motion" />
            <Label x={272} y={172} size={13} pos="prep">
              past
            </Label>
          </Scene>
        ),
        en: 'Tom_N walked_V {past_I} the_D shop_N .',
        ru: 'Стрелка коснулась ориентира сбоку и пошла дальше, не остановившись. Мимо — past.',
      },
    ],
  },
  {
    id: 'prep-motion.traps',
    title: 'Ловушки: home, on the bus, into the car, arrive in / at',
    focus: ['to', 'off', 'into', 'out-of'],
    frames: [
      {
        scene: (
          <Scene label="Человек идёт к дому; на стрелке зачёркнуто to, под домом подпись home">
            <Person x={44} y={168} pose="walk" s={1.4} />
            <Prop name="house" x={250} y={168} s={2.2} />
            <Arrow from={[88, 130]} to={[198, 130]} tone="motion" />
            <Label x={143} y={116} size={18} muted>
              to
            </Label>
            <path d="M128 110 L158 110" className="st-cross" />
            <Label x={250} y={190} size={16} pos="adv">
              home
            </Label>
          </Scene>
        ),
        en: 'I_P go_V {home_R} after_I work_N .',
        ru: 'По-русски «домой» — без предлога, и в английском home тоже без to: это наречие.',
      },
      {
        scene: (
          <Scene label="Человек поднимается в большой автобус; стрелка ведёт на подножку, подпись on">
            <Person x={50} y={168} pose="walk" s={1.4} />
            <Prop name="bus" x={224} y={168} s={2.4} hl pos="prep" />
            <Arrow from={[92, 124]} to={[176, 126]} tone="motion" bend={-18} />
            <Label x={128} y={104} size={13} pos="prep">
              on
            </Label>
          </Scene>
        ),
        en: 'Lucy_N got_V {on_I} the_D bus_N .',
        ru: 'В большой транспорт, где ходят и стоят (автобус, поезд, самолёт), садятся get on, выходят get off.',
      },
      {
        scene: (
          <Scene label="Человек садится в маленькую машину; стрелка уходит внутрь, подпись into">
            <Person x={50} y={168} pose="walk" s={1.4} />
            <Prop name="car" x={224} y={168} s={2.6} hl pos="prep" />
            <Arrow from={[92, 120]} to={[212, 118]} tone="motion" bend={-24} />
            <Label x={152} y={86} size={13} pos="prep">
              into
            </Label>
          </Scene>
        ),
        en: 'Max_N got_V {into_I} the_D car_N .',
        ru: 'В машину и такси садятся внутрь — get into, выходят get out of.',
      },
      {
        scene: (
          <Scene label="Слева большой город London: стрелка входит в него; справа маленькая станция, приглушена">
            <Frame x={14} y={62} w={176} h={106} pos="prep" />
            <Many name="house" n={3} x={48} y={162} gap={46} s={0.9} />
            <Label x={152} y={86} size={15}>
              London
            </Label>
            <Prop name="plane" x={52} y={44} s={1} />
            <Arrow from={[84, 46]} to={[124, 112]} tone="motion" bend={-14} />
            <Label x={78} y={104} size={13} pos="prep">
              in
            </Label>
            <Prop name="station" x={256} y={168} s={1.5} dim />
            <Label x={256} y={190} size={13} muted>
              at the station
            </Label>
          </Scene>
        ),
        en: 'We_P arrived_V {in_I} London_N .',
        ru: 'Приехать в город — arrive in, на станцию или в аэропорт (в точку) — arrive at. Но никогда не arrive to.',
      },
    ],
  },
] satisfies TopicStories
