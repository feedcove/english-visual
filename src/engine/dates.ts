// Учебные сутки начинаются в 04:00 по местному времени: занятие в час ночи — ещё «вчера».
export const DAY_START_HOUR = 4
const DAY_MS = 86_400_000

/** Ключ учебного дня 'YYYY-MM-DD' по местному времени. */
export function dayKey(t: number | Date = Date.now()): string {
  const d = new Date(typeof t === 'number' ? t : t.getTime())
  d.setHours(d.getHours() - DAY_START_HOUR)
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

/** Момент окончания текущих учебных суток: всё, что до него, — «на сегодня». */
export function endOfStudyDay(t: number = Date.now()): number {
  const d = new Date(t)
  d.setHours(d.getHours() - DAY_START_HOUR)
  d.setHours(24 + DAY_START_HOUR, 0, 0, 0)
  return d.getTime()
}

export function addDays(key: string, n: number): string {
  const [y, m, d] = key.split('-').map(Number) as [number, number, number]
  const date = new Date(y, m - 1, d + n, 12)
  return dayKey(date.getTime() + DAY_START_HOUR * 3_600_000)
}

/** Номер дня недели учебного дня: 0 — понедельник. */
export function weekday(key: string): number {
  const [y, m, d] = key.split('-').map(Number) as [number, number, number]
  return (new Date(y, m - 1, d).getDay() + 6) % 7
}

export function daysBetween(a: string, b: string): number {
  const [y1, m1, d1] = a.split('-').map(Number) as [number, number, number]
  const [y2, m2, d2] = b.split('-').map(Number) as [number, number, number]
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / DAY_MS)
}

const WEEKDAYS = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье']
const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

export function formatDay(key: string): string {
  const [, m, d] = key.split('-').map(Number) as [number, number, number]
  const wd = WEEKDAYS[weekday(key)]!
  return `${wd[0]!.toUpperCase()}${wd.slice(1)}, ${d} ${MONTHS[m - 1]}`
}

export const WEEKDAY_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
