import type { Pos } from '../../content/types'

// Данные семьи timeline: 12 времён = 3 момента × 4 аспекта. Ключи — как в catalog.ts.

export const TIMES = ['past', 'present', 'future'] as const
export const ASPECTS = ['simple', 'cont', 'perf', 'perfcont'] as const
export type Time = (typeof TIMES)[number]
export type Aspect = (typeof ASPECTS)[number]

export const TIME_NAME: Record<Time, { en: string; ru: string }> = {
  past: { en: 'Past', ru: 'прошлое' },
  present: { en: 'Present', ru: 'настоящее' },
  future: { en: 'Future', ru: 'будущее' },
}

// sym — подпись символа на оси (одна и та же во всех схемах), ru — смысл аспекта.
export const ASPECT_NAME: Record<Aspect, { en: string; ru: string; sym: string }> = {
  simple: { en: 'Simple', ru: 'факт или привычка', sym: 'факт' },
  cont: { en: 'Continuous', ru: 'процесс в этот момент', sym: 'процесс' },
  perf: { en: 'Perfect', ru: 'результат к моменту', sym: 'результат' },
  perfcont: { en: 'Perfect Continuous', ru: 'длилось до момента', sym: 'длилось до' },
}

export interface Tense {
  time?: Time
  aspect?: Aspect
}

const isTime = (s: string): s is Time => (TIMES as readonly string[]).includes(s)
const isAspect = (s: string): s is Aspect => (ASPECTS as readonly string[]).includes(s)

/** Ключ focus: `past.perf` — ячейка, `past` — столбец, `perf` — строка. */
export function parseTense(focus?: string): Tense {
  if (!focus) return {}
  const [a = '', b] = focus.split('.')
  if (b) return isTime(a) && isAspect(b) ? { time: a, aspect: b } : {}
  if (isTime(a)) return { time: a }
  if (isAspect(a)) return { aspect: a }
  return {}
}

export const tenseName = (t: Time, a: Aspect) => `${TIME_NAME[t].en} ${ASPECT_NAME[a].en}`

export interface Tok {
  pos: Pos
  t: string
}
const A = (t: string): Tok => ({ pos: 'aux', t })
const V = (t: string): Tok => ({ pos: 'verb', t })

export const FORMULA: Record<Time, Record<Aspect, Tok[]>> = {
  past: {
    simple: [V('V2')],
    cont: [A('was/were'), V('V-ing')],
    perf: [A('had'), V('V3')],
    perfcont: [A('had'), A('been'), V('V-ing')],
  },
  present: {
    simple: [V('V1/V-s')],
    cont: [A('am/is/are'), V('V-ing')],
    perf: [A('have/has'), V('V3')],
    perfcont: [A('have/has'), A('been'), V('V-ing')],
  },
  future: {
    simple: [A('will'), V('V1')],
    cont: [A('will'), A('be'), V('V-ing')],
    perf: [A('will'), A('have'), V('V3')],
    perfcont: [A('will'), A('have'), A('been'), V('V-ing')],
  },
}

export const EXAMPLE: Record<Time, Record<Aspect, string>> = {
  past: {
    simple: 'I_P watched_V a_D film_N yesterday_R .',
    cont: 'I_P was_A watching_V a_D film_N at_I eight_M .',
    perf: 'I_P had_A already_R seen_V the_D film_N .',
    perfcont: 'I_P had_A been_A waiting_V for_I an_D hour_N .',
  },
  present: {
    simple: 'I_P watch_V films_N every_D day_N .',
    cont: 'I_P am_A watching_V a_D film_N now_R .',
    perf: 'I_P have_A seen_V this_D film_N .',
    perfcont: 'I_P have_A been_A waiting_V for_I an_D hour_N .',
  },
  future: {
    simple: 'I_P will_A watch_V a_D film_N tomorrow_R .',
    cont: 'I_P will_A be_A watching_V a_D film_N at_I eight_M .',
    perf: 'I_P will_A have_A seen_V the_D film_N by_I Friday_N .',
    perfcont: 'I_P will_A have_A been_A waiting_V for_I an_D hour_N .',
  },
}
