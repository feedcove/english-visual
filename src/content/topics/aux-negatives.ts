import type { TopicBody } from '../types'

export default {
  summary: 'Отрицание — это not сразу после первого вспомогательного глагола. Нет вспомогательного — берём don’t / doesn’t / didn’t. Отрицание в предложении одно.',
  ref: [
    { kind: 'visual', visual: { id: 'aux-formula', focus: 'negative' }, caption: 'Вторая строка: not встаёт сразу после вспомогательного глагола' },
    {
      kind: 'rule',
      title: 'not — после первого вспомогательного',
      text: 'Отрицание — это not сразу после be, can, will или have: is not, cannot, will not, have not. В речи сокращаем: isn’t, aren’t, wasn’t, can’t, won’t, haven’t.',
      examples: [
        { s: 'She_P isn’t_V at_I home_N .', tr: 'Её нет дома.' },
        { s: 'I_P can’t_A find_V my_P keys_N .', tr: 'Я не могу найти ключи.' },
        { s: 'We_P won’t_A be_V late_J .', tr: 'Мы не опоздаем.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Нет вспомогательного — do + not',
      text: 'В Present Simple и Past Simple вспомогательного нет, поэтому ставим do с not. don’t — для I, you, we, they; doesn’t — для he, she, it; didn’t — для прошлого. Глагол после них без окончаний.',
      examples: [
        { s: 'I_P don’t_A like_V coffee_N .', tr: 'Я не люблю кофе.' },
        { s: 'Tom_N doesn’t_A work_V here_R .', tr: 'Том здесь не работает.' },
        { s: 'We_P didn’t_A see_V the_D film_N .', tr: 'Мы не смотрели фильм.' },
      ],
    },
    {
      kind: 'rule',
      title: 'Одно отрицание на предложение',
      text: 'По-русски отрицаний может быть много: «никто ничего не знает». В английском отрицание одно. Либо don’t + anything / anybody: I don’t know anything. Либо глагол без not и слово с no: Nobody knows.',
      examples: [
        { s: 'I_P don’t_A know_V anything_P .', tr: 'Я ничего не знаю.' },
        { s: 'Nobody_P came_V to_I the_D meeting_N .', tr: 'На встречу никто не пришёл.' },
      ],
    },
    {
      kind: 'contrast',
      title: 'Как в русском',
      ru: 'Никто_P ничего_P не_X знает_V .',
      en: 'Nobody_P knows_V anything_P .',
      note: 'В русском отрицательное слово просит ещё «не» при глаголе: никто, ничего и не. В английском отрицание только одно: nobody само отрицает, поэтому рядом anything, а не nothing.',
    },
    {
      kind: 'mistakes',
      items: [
        { wrong: 'I_P don’t_A know_V nothing_P .', right: 'I_P don’t_A know_V anything_P .', note: 'Одно отрицание: don’t + anything.' },
        { wrong: 'He_P doesn’t_A likes_V tea_N .', right: 'He_P doesn’t_A like_V tea_N .', note: 'После doesn’t глагол без -s.' },
        { wrong: 'I_P didn’t_A went_V home_R .', right: 'I_P didn’t_A go_V home_R .', note: 'После didn’t — первая форма.' },
        { wrong: 'I_P don’t_A hungry_J .', right: 'I_P +’m_V not_X hungry_J .', note: 'С be: not после be, без do.' },
        { wrong: 'She_P not_X likes_V coffee_N .', right: 'She_P doesn’t_A like_V coffee_N .', note: 'Перед глаголом нужно doesn’t, а не просто not.' },
      ],
    },
    { kind: 'tip', text: 'Проверка: есть be, can, will или have — просто добавь not. Нет — бери do, does или did с not и оставь глагол без окончаний.' },
  ],
  items: [
    {
      id: 'aux-negatives.be',
      skill: 'С be: isn’t, aren’t — без do',
      focus: 'negative',
      why: 'С глаголом be отрицание делает not после be: isn’t, aren’t. Do не нужен.',
      variants: [
        { s: 'My_P brother_N [isn’t_V] a_D doctor_N .', tr: 'Мой брат не врач.', options: ['doesn’t', 'aren’t'] },
        { s: 'We_P [aren’t_V] late_J .', tr: 'Мы не опаздываем.', options: ['don’t', 'isn’t'] },
        { s: 'Anna_N and_C Kate_N [aren’t_V] here_R today_R .', tr: 'Анны и Кейт сегодня нет.', options: ['isn’t', 'don’t'] },
      ],
    },
    {
      id: 'aux-negatives.do-does',
      skill: 'don’t — для I, you, we, they; doesn’t — для he, she, it',
      focus: 'do-support',
      why: 'Don’t идёт с I, you, we, they и множественным числом; doesn’t — с he, she, it и одним предметом.',
      variants: [
        { s: 'Tom_N [doesn’t_A] like_V football_N .', tr: 'Том не любит футбол.', options: ['don’t', 'isn’t'] },
        { s: 'We_P [don’t_A] have_V a_D car_N .', tr: 'У нас нет машины.', options: ['doesn’t', 'aren’t'] },
        { s: 'My_P parents_N [don’t_A] watch_V TV_N .', tr: 'Мои родители не смотрят телевизор.', options: ['doesn’t', 'aren’t'] },
      ],
    },
    {
      id: 'aux-negatives.didnt',
      skill: 'didn’t — отрицание о прошлом',
      focus: 'do-support',
      why: 'Для прошлого ставим didn’t, для всех лиц одинаково.',
      variants: [
        { s: 'I_P [didn’t_A] watch_V the_D news_N yesterday_R .', tr: 'Вчера я не смотрел новости.', options: ['don’t', 'wasn’t'] },
        { s: 'She_P [didn’t_A] answer_V my_P message_N .', tr: 'Она не ответила на моё сообщение.', options: ['doesn’t', 'wasn’t'] },
        { s: 'We_P [didn’t_A] go_V out_R last_J night_N .', tr: 'Вчера вечером мы никуда не ходили.', options: ['don’t', 'weren’t'] },
      ],
    },
    {
      id: 'aux-negatives.v1-after-doesnt',
      skill: 'После don’t / doesn’t глагол без -s',
      focus: 'do-support',
      why: 'Окончание -s берёт на себя doesn’t, поэтому смысловой глагол остаётся в первой форме.',
      variants: [
        { s: 'She_P doesn’t_A [speak_V] Spanish_N .', tr: 'Она не говорит по-испански.', options: ['speaks', 'speaking'] },
        { s: 'Kate_N doesn’t_A [eat_V] meat_N .', tr: 'Кейт не ест мясо.', options: ['eats', 'eating'] },
        { s: 'He_P doesn’t_A [work_V] on_I Fridays_N .', tr: 'Он не работает по пятницам.', options: ['works', 'working'] },
      ],
    },
    {
      id: 'aux-negatives.v1-after-didnt',
      skill: 'После didn’t глагол в первой форме',
      focus: 'do-support',
      why: 'Прошедшее время уже показывает didn’t, поэтому глагол в первой форме: buy, а не bought.',
      variants: [
        { s: 'I_P didn’t_A [call_V] Anna_N yesterday_R .', tr: 'Вчера я не звонил Анне.', options: ['called', 'calling'] },
        { s: 'We_P didn’t_A [buy_V] a_D ticket_N .', tr: 'Мы не купили билет.', options: ['bought', 'buying'] },
        { s: 'They_P didn’t_A [come_V] to_I the_D meeting_N .', tr: 'Они не пришли на встречу.', options: ['came', 'comes'] },
      ],
    },
    {
      id: 'aux-negatives.modal',
      skill: 'can’t, won’t, shouldn’t — не после модального, без do',
      focus: 'negative',
      why: 'Модальный глагол сам берёт not. Do рядом с ним не нужен, а глагол остаётся в первой форме.',
      variants: [
        { s: 'I_P [can’t_A] open_V this_D door_N .', tr: 'Я не могу открыть эту дверь.', options: ['am not', 'haven’t'] },
        { s: 'You_P [shouldn’t_A] eat_V so_R much_D sugar_N .', tr: 'Тебе не стоит есть так много сахара.', options: ['aren’t', 'haven’t'] },
        { s: 'It_P [won’t_A] rain_V tomorrow_R .', tr: 'Завтра дождя не будет.', options: ['isn’t', 'didn’t'] },
      ],
    },
    {
      id: 'aux-negatives.have',
      skill: 'haven’t / hasn’t + третья форма глагола',
      focus: 'negative',
      why: 'С have не нужен do: haven’t ставим сразу перед третьей формой. Для he, she, it — hasn’t.',
      variants: [
        { s: 'We_P [haven’t_A] eaten_V yet_R .', tr: 'Мы ещё не ели.', options: ['don’t', 'aren’t'] },
        { s: 'She_P [hasn’t_A] called_V me_P yet_R .', tr: 'Она мне ещё не звонила.', options: ['doesn’t', 'didn’t'] },
        { s: 'I_P [haven’t_A] finished_V the_D report_N .', tr: 'Я не закончил отчёт.', options: ['don’t', 'didn’t'] },
      ],
    },
    {
      id: 'aux-negatives.imperative',
      skill: 'Запрет: Don’t + глагол',
      focus: 'do-support',
      why: 'Чтобы сказать «не делай», ставим don’t перед глаголом в первой форме. Подлежащее не нужно.',
      variants: [
        { s: '[Don’t_A] be_V late_J !', tr: 'Не опаздывай!', options: ['Not', 'Aren’t'] },
        { s: '[Don’t_A] touch_V that_P !', tr: 'Не трогай это!', options: ['Not', 'Doesn’t'] },
        { s: '[Don’t_A] worry_V , Anna_N .', tr: 'Не волнуйся, Анна.', options: ['Not', 'Aren’t'] },
      ],
    },
    {
      id: 'aux-negatives.any',
      skill: 'После not — any-: don’t know anything',
      focus: 'negative',
      why: 'Если в предложении уже есть don’t, то вместо nothing / nobody ставим anything / anybody. Отрицание одно.',
      variants: [
        { s: 'We_P don’t_A need_V [anything_P] today_R .', tr: 'Нам сегодня ничего не нужно.', options: ['nothing', 'something'] },
        { s: 'Tom_N doesn’t_A trust_V [anybody_P] .', tr: 'Том никому не доверяет.', options: ['nobody', 'somebody'], accept: ['anyone'] },
        { s: 'He_P didn’t_A say_V [anything_P] to_I me_P .', tr: 'Он мне ничего не сказал.', options: ['nothing', 'something'] },
      ],
    },
    {
      id: 'aux-negatives.no',
      skill: 'Без not — слово с no-: nobody, nothing, no',
      focus: 'negative',
      why: 'Nobody, nothing и no уже отрицают сами. Сказуемое при них без not и без don’t.',
      variants: [
        { s: 'I_P know_V [nothing_P] about_I cars_N .', tr: 'Я ничего не знаю о машинах.', options: ['anything', 'something'] },
        { s: '[Nobody_P] answered_V the_D phone_N .', tr: 'Никто не взял трубку.', options: ['Anybody', 'Everybody'], accept: ['No one'] },
        { s: 'She_P has_V [no_D] time_N today_R .', tr: 'Сегодня у неё нет времени.', options: ['any', 'none'] },
      ],
    },
    {
      id: 'aux-negatives.order',
      mode: 'order',
      skill: 'Собрать отрицание: кто — aux + not — глагол',
      focus: 'negative',
      why: 'Порядок: подлежащее, вспомогательный с not, смысловой глагол в первой форме.',
      variants: [
        { s: 'She_P doesn’t_A like_V coffee_N .', tr: 'Она не любит кофе.', options: ['don’t', 'not'] },
        { s: 'We_P didn’t_A see_V the_D match_N .', tr: 'Мы не смотрели матч.', options: ['don’t', 'not'] },
        { s: 'They_P aren’t_V at_I home_N .', tr: 'Их нет дома.', options: ['don’t', 'not'] },
      ],
    },
    {
      id: 'aux-negatives.pick-negative',
      mode: 'choice',
      skill: 'Выбрать верное отрицание: одно «не» на предложение',
      focus: 'negative',
      why: 'В английском отрицание одно. Либо don’t / didn’t + any-, либо nobody / nothing без not.',
      variants: [
        { q: 'Как сказать: «Я никого здесь не знаю»?', answer: 'I don’t know anybody here.', options: ['I don’t know nobody here.', 'I no know anybody here.'] },
        { q: 'Как сказать: «Он ничего не купил»?', answer: 'He didn’t buy anything.', options: ['He didn’t buy nothing.', 'He not bought anything.'] },
        { q: 'Как сказать: «Никто не позвонил»?', answer: 'Nobody called.', options: ['Nobody didn’t call.', 'Didn’t nobody call.'] },
      ],
    },
  ],
} satisfies TopicBody
