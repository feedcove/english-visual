import type { TopicBody } from '../types'

export default {
  summary: 'had + третья форма: действие, которое случилось раньше другого действия в прошлом.',
  ref: [
    { kind: 'visual', visual: { id: 'timeline', focus: 'past.perf' }, caption: 'Два момента в прошлом: сначала действие с had + V3, потом то, о чём рассказываем' },
    {
      kind: 'rule',
      title: 'had + третья форма',
      text: 'had одинаково для всех лиц: I had, she had, they had. Дальше V3, как в Present Perfect (finished, gone, seen). Отрицание — hadn’t, вопрос — Had вперёд.',
      examples: [
        { s: 'I_P had_A finished_V by_I six_M .', tr: 'К шести я уже закончил.' },
        { s: 'She_P hadn’t_A eaten_V , so_C she_P was_V hungry_J .', tr: 'Она не ела, поэтому была голодна.' },
        { s: 'Had_A you_P met_V Tom_N before_R ?', tr: 'Ты раньше встречал Тома?' },
      ],
    },
    {
      kind: 'rule',
      title: 'Раньше или по порядку',
      text: 'Рассказываем о прошлом и оглядываемся ещё дальше назад: то, что было раньше, — had + V3, рассказ — Past Simple. Если события идут подряд, оба глагола в Past Simple.',
      examples: [
        { s: 'When_C I_P arrived_V , the_D film_N had_A started_V .', tr: 'Когда я пришёл, фильм уже шёл.' },
        { s: 'When_C I_P arrived_V , the_D film_N started_V .', tr: 'Когда я пришёл, начался фильм.' },
      ],
    },
    {
      kind: 'rule',
      title: 'already, before, by the time',
      text: 'Подсказки: already (уже), before (раньше), never … before (до этого никогда), by the time (к тому времени как). Они показывают, что мы оглядываемся назад от прошлого момента.',
      examples: [
        { s: 'By~the~time_C we_P got_V there_R , the_D shop_N had_A closed_V .', tr: 'К тому времени как мы пришли, магазин закрылся.' },
        { s: 'I_P had_A never_R flown_V before_R .', tr: 'Раньше я никогда не летал.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Когда_C я_P пришёл_V , фильм_N уже_R начался_V .',
      en: 'When_C I_P arrived_V , the_D film_N had_A already_R started_V .',
      note: 'В русском оба глагола в прошедшем, а порядок понятен по слову «уже». В английском «раньше другого» показывает форма: had + V3.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'When_C I_P arrived_V , the_D film_N already_R started_V .', right: 'When_C I_P arrived_V , the_D film_N had_A already_R started_V .', note: 'Фильм начался раньше — нужен had + V3.' },
        { wrong: 'She_P had_A went_V home_R .', right: 'She_P had_A gone_V home_R .', note: 'После had — третья форма: gone.' },
        { wrong: 'He_P said_V that_C he_P has_A seen_V it_P .', right: 'He_P said_V that_C he_P had_A seen_V it_P .', note: 'Пересказ в прошлом: has → had.' },
        { wrong: 'I_P had_A seen_V him_P yesterday_R .', right: 'I_P saw_V him_P yesterday_R .', note: 'Без второго прошлого момента Past Perfect не нужен.' },
      ],
    },
  ],
  items: [
    {
      id: 'past-perfect.form-had',
      skill: 'had — для всех лиц: I had, she had, they had',
      focus: 'past.perf',
      why: 'В Past Perfect had не меняется: ни has, ни have. Меняется только V3 после него.',
      variants: [
        { s: 'She_P [had_A] already_R left_V when_C I_P called_V .', tr: 'Она уже ушла, когда я позвонил.', options: ['has', 'have'] },
        { s: 'They_P [had_A] eaten_V before_C we_P arrived_V .', tr: 'Они поели до того, как мы приехали.', options: ['have', 'has'] },
        { s: 'I_P [had_A] never_R seen_V snow_N before_I that_D winter_N .', tr: 'До той зимы я никогда не видел снега.', options: ['have', 'did'] },
      ],
    },
    {
      id: 'past-perfect.form-v3',
      skill: 'После had — третья форма: started, gone, written',
      focus: 'past.perf',
      why: 'После had ставим V3. went, wrote — вторая форма, а нужны gone, written.',
      variants: [
        { s: 'When_C we_P got_V to_I the_D cinema_N , the_D film_N had_A [started_V] .', tr: 'Когда мы дошли до кинотеатра, фильм уже начался.', options: ['start', 'starting'] },
        { s: 'He_P was_V sad_J because_C his_P friends_N had_A [gone_V] home_R .', tr: 'Ему было грустно, потому что друзья ушли домой.', options: ['went', 'go'] },
        { s: 'She_P had_A [written_V] the_D report_N before_C the_D meeting_N started_V .', tr: 'Она написала отчёт ещё до начала совещания.', options: ['wrote', 'write'] },
      ],
    },
    {
      id: 'past-perfect.negative-question',
      skill: 'Отрицание и вопрос: hadn’t + V3, Had + подлежащее + V3',
      focus: 'past.perf',
      why: 'Отрицание строим на hadn’t, вопрос начинаем с Had. Did и didn’t рядом с V3 не нужны.',
      variants: [
        { s: 'We_P [hadn’t_A] booked_V a_D room_N , so_C we_P slept_V in_I the_D car_N .', tr: 'Мы не забронировали номер, поэтому спали в машине.', options: ['haven’t', 'didn’t'] },
        { s: '[Had_A] you_P met_V Anna_N before_I the_D party_N ?', tr: 'Ты встречал Анну до вечеринки?', options: ['Did', 'Do'] },
        { s: 'He_P [hadn’t_A] seen_V the_D sign_N , so_C he_P drove_V past_R .', tr: 'Он не заметил знак и проехал мимо.', options: ['hasn’t', 'didn’t'] },
      ],
    },
    {
      id: 'past-perfect.earlier-action',
      skill: 'Раньше другого прошлого — had + V3',
      focus: 'past.perf',
      why: 'Было два прошлых действия. То, что случилось раньше, ставим в Past Perfect, а второе — в Past Simple.',
      variants: [
        { s: 'When_C Tom_N got_V to_I the_D station_N , the_D train_N [had_A] already_R left_V .', tr: 'Когда Том пришёл на вокзал, поезд уже ушёл.', options: ['has', 'was'] },
        { s: 'I_P was_V late_J because_C I_P [had_A] missed_V the_D bus_N .', tr: 'Я опоздал, потому что пропустил автобус.', options: ['have', 'did'] },
        { s: 'Max_N was_V angry_J . Someone_P [had_A] taken_V his_P seat_N .', tr: 'Макс злился. Кто-то занял его место.', options: ['has', 'have'] },
      ],
    },
    {
      id: 'past-perfect.ps-sequence',
      skill: 'События подряд — оба в Past Simple',
      focus: 'past.simple',
      why: 'Одно действие идёт сразу за другим — оба в Past Simple. Past Perfect нужен, только если одно было раньше.',
      variants: [
        { s: 'When_C the_D rain_N stopped_V , we_P [went_V] out_R .', tr: 'Когда дождь кончился, мы вышли на улицу.', options: ['had gone', 'go'] },
        { s: 'When_C Anna_N opened_V the_D door_N , the_D cat_N [ran_V] out_R .', tr: 'Когда Анна открыла дверь, кот выскочил на улицу.', options: ['had run', 'run'] },
        { s: 'As~soon~as_C he_P saw_V me_P , he_P [waved_V] .', tr: 'Как только он меня увидел, он помахал.', options: ['had waved', 'wave'] },
      ],
    },
    {
      id: 'past-perfect.which-first',
      mode: 'choice',
      skill: 'Что случилось раньше: had + V3 против Past Simple',
      focus: 'past.perf',
      why: 'had + V3 — действие уже случилось к тому моменту. Два Past Simple подряд — события идут друг за другом.',
      variants: [
        { s: 'When_C I_P arrived_V , the_D film_N {had_A} started_V .', q: 'Что произошло раньше?', answer: 'Фильм начался', options: ['Я пришёл'] },
        { s: 'When_C I_P arrived_V , the_D film_N {started_V} .', q: 'Что произошло раньше?', answer: 'Я пришёл', options: ['Фильм начался'] },
        { s: 'When_C we_P phoned_V , Kate_N {had_A} left_V .', q: 'Что произошло раньше?', answer: 'Кейт ушла', options: ['Мы позвонили'] },
        { s: 'When_C Tom_N rang_V the_D bell_N , Kate_N {opened_V} the_D door_N .', q: 'Что произошло раньше?', answer: 'Том позвонил в дверь', options: ['Кейт открыла дверь'] },
      ],
    },
    {
      id: 'past-perfect.already',
      skill: 'already — «уже», между had и V3',
      focus: 'past.perf',
      why: 'already показывает, что к тому моменту всё уже случилось. Стоит между had и V3.',
      variants: [
        { s: 'We_P arrived_V late_R . The_D meeting_N had_A [already_R] begun_V .', tr: 'Мы приехали поздно. Совещание уже началось.', options: ['yet', 'ever'] },
        { s: 'When_C I_P called_V Anna_N , she_P had_A [already_R] eaten_V .', tr: 'Когда я позвонил Анне, она уже поела.', options: ['yet', 'ever'] },
        { s: 'It_P was_V only_R seven_M , but_C Ben_N had_A [already_R] gone_V to_I work_N .', tr: 'Было только семь, но Бен уже ушёл на работу.', options: ['yet', 'ever'] },
      ],
    },
    {
      id: 'past-perfect.never-before',
      skill: 'never … before — «до этого никогда не»',
      focus: 'past.perf',
      why: 'had never + V3 + before — до того момента такого опыта не было. never уже отрицание, not не нужен.',
      variants: [
        { s: 'It_P was_V my_P first_M flight_N . I_P had_A [never_R] flown_V before_R .', tr: 'Это был мой первый полёт. Раньше я никогда не летал.', options: ['ever', 'always'] },
        { s: 'Anna_N had_A [never_R] met_V a_D famous_J person_N before_I that_D day_N .', tr: 'До того дня Анна никогда не встречала знаменитостей.', options: ['ever', 'always'] },
        { s: 'We_P had_A [never_R] been_V to_I Spain_N , so_C everything_P was_V new_J .', tr: 'Мы раньше никогда не были в Испании, поэтому всё было новым.', options: ['ever', 'always'] },
      ],
    },
    {
      id: 'past-perfect.by-the-time',
      skill: 'by the time + Past Simple, в главной части — had + V3',
      focus: 'past.perf',
      why: 'by the time — «к тому времени как». После него Past Simple, а то, что уже случилось к этому моменту, — had + V3.',
      variants: [
        { s: 'By~the~time_C we_P arrived_V , everyone_P [had_A] left_V .', tr: 'К тому времени как мы приехали, все уже ушли.', options: ['has', 'did'] },
        { s: 'By~the~time_C I_P got_V home_R , the_D kids_N [had_A] gone_V to_I bed_N .', tr: 'К тому времени как я пришёл домой, дети уже легли спать.', options: ['have', 'were'] },
        { s: 'Max_N had_A finished_V his_P work_N by~the~time_C I_P [arrived_V] .', tr: 'Макс закончил работу к тому времени, как я пришёл.', options: ['arrive', 'arrives'] },
      ],
    },
    {
      id: 'past-perfect.reported',
      skill: 'Пересказ в прошлом: said that he had…',
      focus: 'past.perf',
      why: 'Рассказываем в прошлом о том, что случилось ещё раньше: said that he had lost. Present Perfect превращается в had + V3.',
      variants: [
        { s: 'Tom_N said_V that_C he_P [had_A] lost_V his_P phone_N .', tr: 'Том сказал, что потерял телефон.', options: ['did', 'was'] },
        { s: 'Anna_N told_V me_P that_C she_P [had_A] seen_V the_D film_N before_R .', tr: 'Анна сказала мне, что уже видела этот фильм.', options: ['did', 'was'] },
        { s: 'I_P realised_V that_C I_P [had_A] left_V my_P keys_N at_I home_N .', tr: 'Я понял, что оставил ключи дома.', options: ['did', 'was'] },
      ],
    },
    {
      id: 'past-perfect.order',
      mode: 'order',
      skill: 'Собрать: had + already / never + V3',
      focus: 'past.perf',
      why: 'Порядок как в Present Perfect: подлежащее, had, наречие, V3. В вопросе had идёт первым.',
      variants: [
        { s: 'The_D film_N had_A already_R started_V .', tr: 'К тому времени фильм уже начался.', accept: ['The film had started already'], options: ['has'] },
        { s: 'We_P hadn’t_A met_V before_R .', tr: 'Мы раньше не встречались.', options: ['didn’t'] },
        { s: 'Had_A you_P met_V Anna_N before_R ?', tr: 'Ты раньше встречал Анну?', options: ['Did'] },
      ],
    },
    {
      id: 'past-perfect.graph',
      mode: 'graph',
      skill: 'Граф: had висит на смысловом глаголе (aux)',
      focus: 'past.perf',
      why: 'Корень — смысловой глагол в V3. had помогает ему (aux), остальные слова висят на нём или на своём существительном.',
      variants: [
        { s: 'He_P had_A finished_V his_P work_N .', tr: 'Он закончил работу.', graph: '1>3 subj, 2>3 aux, 4>5 attr, 5>3 obj' },
        { s: 'We_P had_A already_R eaten_V .', tr: 'Мы уже поели.', graph: '1>4 subj, 2>4 aux, 3>4 adv' },
        { s: 'The_D bus_N had_A already_R left_V .', tr: 'Автобус уже ушёл.', graph: '1>2 attr, 2>5 subj, 3>5 aux, 4>5 adv' },
      ],
    },
  ],
} satisfies TopicBody
