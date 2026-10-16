import type { TopicBody } from '../types'

export default {
  summary: 'was / were + глагол с -ing: в нужный момент прошлого действие уже шло. Длинный фон — Past Continuous, короткое событие поверх него — Past Simple.',
  ref: [
    { kind: 'visual', visual: { id: 'timeline', focus: 'past.cont' }, caption: 'Волнистый отрезок вокруг момента в прошлом: действие шло, а не просто случилось' },
    {
      kind: 'rule',
      title: 'was / were + глагол с -ing',
      text: 'С I, he, she, it и одним именем — was, с you, we, they и множественным числом — were. Дальше глагол с -ing. Отрицание: wasn’t / weren’t. Вопрос: Was / Were выходит вперёд. Правописание -ing — как в Present Continuous.',
      examples: [
        { s: 'I_P was_A cooking_V dinner_N .', tr: 'Я готовил ужин.' },
        { s: 'They_P weren’t_A listening_V .', tr: 'Они не слушали.' },
        { s: 'Were_A you_P sleeping_V ?', tr: 'Ты спал?' },
      ],
    },
    {
      kind: 'rule',
      title: 'Процесс в момент прошлого',
      text: 'Past Continuous говорит: в этот момент прошлого действие уже шло. Когда оно началось и закончилось — неважно. «В восемь я как раз готовил» — At eight I was cooking.',
      examples: [
        { s: 'At_I nine_M last_J night_N I_P was_A watching_V TV_N .', tr: 'Вчера в девять вечера я смотрел телевизор.' },
        { s: 'What_P were_A you_P doing_V at_I six_M ?', tr: 'Что ты делал в шесть?' },
      ],
    },
    {
      kind: 'rule',
      title: 'Фон и событие',
      text: 'Длинное действие (фон) — Past Continuous, короткое событие, которое его прервало, — Past Simple: I was walking home when it started to rain. while (пока) вводит длящийся фон, часто — второй процесс, который шёл одновременно.',
      examples: [
        { s: 'I_P was_A walking_V home_R when_C it_P started_V to_X rain_V .', tr: 'Я шёл домой, когда начался дождь.' },
        { s: 'While_C Kate_N was_A driving_V , I_P was_A looking_V at_I the_D map_N .', tr: 'Пока Кейт вела машину, я смотрел на карту.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Я_P готовил_V ужин_N , когда_C позвонил_V Том_N .',
      en: 'I_P was_A cooking_V dinner_N when_C Tom_N rang_V .',
      note: 'В русском оба глагола стоят в одной форме (готовил, позвонил), а процесс и событие различаются по смыслу. Английский показывает это формой: was cooking — процесс, rang — событие.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I_P cooking_V dinner_N at_I eight_M .', right: 'I_P was_A cooking_V dinner_N at_I eight_M .', note: 'Нужен was / were перед -ing.' },
        { wrong: 'They_P was_A watching_V TV_N .', right: 'They_P were_A watching_V TV_N .', note: 'they, we, you — were.' },
        { wrong: 'Did_A you_P sleeping_V ?', right: 'Were_A you_P sleeping_V ?', note: 'Вопрос: Was / Were вперёд, не Did.' },
        { wrong: 'I_P didn’t_A listening_V .', right: 'I_P wasn’t_A listening_V .', note: 'Отрицание: wasn’t / weren’t + -ing.' },
        { wrong: 'He_P was_A runing_V .', right: 'He_P was_A running_V .', note: 'Удваиваем согласную: running.' },
      ],
    },
    { kind: 'tip', text: 'Два глагола в одном предложении: тот, что «шёл», — was / were + -ing, а тот, что «случился» посреди этого, — просто Past Simple.' },
  ],
  items: [
    {
      id: 'past-continuous.be-form',
      skill: 'was — I, he, she, it; were — you, we, they',
      focus: 'past.cont',
      why: 'was — для одного (I, he, she, it, одно имя), were — для you, we, they и множественного числа.',
      variants: [
        { s: 'I_P [was_A] sleeping_V at_I ten_M .', tr: 'В десять я спал.', options: ['were', 'am'] },
        { s: 'Anna_N [was_A] talking_V to_I the_D manager_N .', tr: 'Анна разговаривала с менеджером.', options: ['were', 'is'] },
        { s: 'The_D children_N [were_A] playing_V in_I the_D street_N .', tr: 'Дети играли на улице.', options: ['was', 'are'] },
      ],
    },
    {
      id: 'past-continuous.ing-form',
      skill: 'После was / were — глагол с -ing',
      focus: 'past.cont',
      why: 'Past Continuous = was / were + глагол с -ing. Ни drove, ни drive после was ставить нельзя.',
      variants: [
        { s: 'Tom_N was_A [driving_V] to_I work_N .', tr: 'Том ехал на работу.', options: ['drove', 'drive'], accept: ['going'] },
        { s: 'We_P were_A [having_V] dinner_N .', tr: 'Мы ужинали.', options: ['had', 'have'], accept: ['eating'] },
        { s: 'She_P was_A [reading_V] on_I the_D train_N .', tr: 'Она читала в поезде.', options: ['read', 'reads'] },
      ],
    },
    {
      id: 'past-continuous.at-time',
      skill: 'В нужный момент прошлого действие шло: At eight I was cooking',
      focus: 'past.cont',
      why: 'Если называем момент в прошлом и говорим, что действие в нём уже шло, нужен Past Continuous: was / were + -ing.',
      variants: [
        { s: 'At_I eight_M last_J night_N I_P [was~cooking_V] dinner_N .', tr: 'Вчера в восемь вечера я как раз готовил ужин.', options: ['were cooking', 'was cook'], accept: ['was making'] },
        { s: 'At_I six_M this_D morning_N Kate_N [was~running_V] in_I the_D park_N .', tr: 'Сегодня в шесть утра Кейт как раз бегала в парке.', options: ['were running', 'was run'], accept: ['was jogging'] },
        { s: 'At_I nine_M the_D children_N [were~sleeping_V] .', tr: 'В девять дети уже спали.', options: ['was sleeping', 'are sleeping'] },
      ],
    },
    {
      id: 'past-continuous.background',
      skill: 'Фон: I was walking home when it started to rain',
      focus: 'past.cont',
      why: 'Действие шло и было прервано — это фон, Past Continuous: was walking, а событие после when — Past Simple.',
      variants: [
        { s: 'I_P [was~walking_V] to_I work_N when_C I_P saw_V Ben_N .', tr: 'Я шёл на работу, когда увидел Бена.', options: ['were walking', 'was walk'], accept: ['was going'] },
        { s: 'Tom_N [was~watching_V] TV_N when_C the_D lights_N went_V out_R .', tr: 'Том смотрел телевизор, когда погас свет.', options: ['were watching', 'was watch'] },
        { s: 'We_P [were~waiting_V] for_I the_D bus_N when_C Anna_N arrived_V .', tr: 'Мы ждали автобус, когда пришла Анна.', options: ['was waiting', 'were wait'] },
      ],
    },
    {
      id: 'past-continuous.event',
      skill: 'Событие поверх фона — Past Simple, не -ing',
      focus: 'past.simple',
      why: 'Короткое событие, которое прервало фон, — Past Simple: when I arrived, не when I was arriving.',
      variants: [
        { s: 'Tom_N was_A sleeping_V when_C I_P [arrived_V] .', tr: 'Том спал, когда я пришёл.', options: ['arriving', 'arrive'], accept: ['came'] },
        { s: 'She_P was_A crossing_V the_D road_N when_C she_P [saw_V] Tom_N .', tr: 'Она переходила дорогу, когда увидела Тома.', options: ['seeing', 'sees'] },
        { s: 'We_P were_A having_V lunch_N when_C the_D power_N [went_V] off_R .', tr: 'Мы обедали, когда отключили электричество.', options: ['going', 'goes'] },
      ],
    },
    {
      id: 'past-continuous.while',
      skill: 'while — «пока», после него длящееся действие',
      focus: 'past.cont',
      why: 'while соединяет с фоном, который шёл: while I was shopping. when тоже возможно, но не during (после него идёт существительное).',
      variants: [
        { s: 'I_P met_V Anna_N [while_C] I_P was_A shopping_V .', tr: 'Я встретил Анну, пока ходил по магазинам.', options: ['during', 'because'], accept: ['when'] },
        { s: '[While_C] Ben_N was_A cleaning_V the_D flat_N , Lucy_N was_A doing_V the_D shopping_N .', tr: 'Пока Бен убирал квартиру, Люси ходила за покупками.', options: ['During', 'Because'], accept: ['When'] },
        { s: 'Tom_N called_V [while_C] we_P were_A having_V lunch_N .', tr: 'Том позвонил, пока мы обедали.', options: ['during', 'because'], accept: ['when'] },
      ],
    },
    {
      id: 'past-continuous.neg',
      skill: 'wasn’t / weren’t + -ing — отрицание',
      focus: 'past.cont',
      why: 'Отрицание — wasn’t / weren’t перед глаголом с -ing. Не didn’t.',
      variants: [
        { s: 'I_P [wasn’t_A] listening_V to_I the_D teacher_N .', tr: 'Я не слушал учителя.', options: ['weren’t', 'didn’t'] },
        { s: 'They_P [weren’t_A] working_V at_I that_D time_N .', tr: 'В то время они не работали.', options: ['wasn’t', 'didn’t'] },
        { s: 'It_P [wasn’t_A] raining_V when_C we_P left_V .', tr: 'Когда мы вышли, дождя не было.', options: ['weren’t', 'didn’t'] },
      ],
    },
    {
      id: 'past-continuous.question',
      skill: 'Was / Were вперёд: вопрос с -ing',
      focus: 'past.cont',
      why: 'Вопрос — перестановкой: You were sleeping → Were you sleeping? Не Did.',
      variants: [
        { s: '[Were_A] you_P sleeping_V at_I midnight_N ?', tr: 'Ты спал в полночь?', options: ['Was', 'Did'] },
        { s: '[Was_A] Tom_N working_V yesterday_R afternoon_N ?', tr: 'Том вчера днём работал?', options: ['Were', 'Did'] },
        { s: '[Were_A] the_D children_N making_V a_D noise_N ?', tr: 'Дети шумели?', options: ['Was', 'Did'] },
      ],
    },
    {
      id: 'past-continuous.wh',
      skill: 'What / Where / Who + was / were + -ing',
      focus: 'past.cont',
      why: 'Вопросительное слово идёт перед was / were: What were you doing? Where was Anna going?',
      variants: [
        { s: 'What_P [were_A] you_P doing_V at_I nine_M ?', tr: 'Что ты делал в девять?', options: ['did', 'was'] },
        { s: 'Where_R [was_A] Anna_N going_V ?', tr: 'Куда шла Анна?', options: ['did', 'were'] },
        { s: 'Who_P [was_A] he_P talking_V to_I ?', tr: 'С кем он разговаривал?', options: ['did', 'were'] },
      ],
    },
    {
      id: 'past-continuous.role',
      mode: 'choice',
      skill: 'Различить фон (процесс) и событие',
      focus: 'past.cont',
      why: 'Фон длится — was / were + -ing. Событие короткое и прерывает фон — Past Simple.',
      variants: [
        { s: 'I_P was_A {cooking_V} when_C Tom_N arrived_V .', q: 'Что выделено: процесс (фон) или короткое событие?', answer: 'процесс (фон)', options: ['короткое событие', 'привычка'] },
        { s: 'Kate_N was_A running_V when_C she_P {dropped_V} her_P bag_N .', q: 'Что выделено: процесс (фон) или короткое событие?', answer: 'короткое событие', options: ['процесс (фон)', 'привычка'] },
        { s: 'The_D phone_N {rang_V} while_C I_P was_A having_V a_D shower_N .', q: 'Что выделено: процесс (фон) или короткое событие?', answer: 'короткое событие', options: ['процесс (фон)', 'привычка'] },
      ],
    },
    {
      id: 'past-continuous.order',
      mode: 'order',
      skill: 'Собрать: фон + when / while + событие',
      focus: 'past.cont',
      why: 'Сначала фон (was / were + -ing), потом when или while и второе действие.',
      variants: [
        { s: 'I_P was_A reading_V when_C she_P called_V .', tr: 'Я читал, когда она позвонила.', accept: ['when she called I was reading'], options: ['were', 'read'] },
        { s: 'Kate_N was_A driving_V when_C her_P phone_N rang_V .', tr: 'Кейт вела машину, когда зазвонил её телефон.', accept: ['when her phone rang Kate was driving'], options: ['were', 'drove'] },
        { s: 'We_P were_A watching_V TV_N while_C Anna_N was_A cooking_V .', tr: 'Мы смотрели телевизор, пока Анна готовила.', accept: ['while Anna was cooking We were watching TV'], options: ['was', 'watch'] },
      ],
    },
    {
      id: 'past-continuous.order-q',
      mode: 'order',
      skill: 'Собрать вопрос: (слово) + was / were + подлежащее + -ing',
      focus: 'past.cont',
      why: 'Порядок: вопросительное слово — was / were — кто — глагол с -ing.',
      variants: [
        { s: 'Were_A they_P listening_V to_I music_N ?', tr: 'Они слушали музыку?', options: ['did', 'was'] },
        { s: 'What_P was_A Kate_N cooking_V ?', tr: 'Что готовила Кейт?', options: ['did', 'were'] },
        { s: 'Was_A it_P snowing_V when_C you_P got_V up_R ?', tr: 'Когда ты встал, шёл снег?', options: ['did', 'were'] },
      ],
    },
  ],
} satisfies TopicBody
