// Озвучка через системный синтез речи (работает офлайн на macOS и iOS). Британский голос в приоритете.

const PREFERRED_EN = ['Daniel', 'Kate', 'Serena', 'Arthur', 'Martha', 'Oliver', 'Stephanie']

let voices: SpeechSynthesisVoice[] = []

function load() {
  if (typeof speechSynthesis === 'undefined') return
  voices = speechSynthesis.getVoices()
}

if (typeof speechSynthesis !== 'undefined') {
  load()
  speechSynthesis.addEventListener?.('voiceschanged', load)
}

export function canSpeak(): boolean {
  return typeof speechSynthesis !== 'undefined'
}

export function englishVoices(): SpeechSynthesisVoice[] {
  load()
  return voices.filter((v) => v.lang.toLowerCase().startsWith('en'))
}

function pickVoice(lang: 'en' | 'ru', name?: string): SpeechSynthesisVoice | undefined {
  if (lang === 'ru') return voices.find((v) => v.lang.toLowerCase().startsWith('ru'))
  if (name) {
    const exact = voices.find((v) => v.name === name)
    if (exact) return exact
  }
  const gb = voices.filter((v) => v.lang.toLowerCase().replace('_', '-') === 'en-gb')
  return PREFERRED_EN.map((p) => gb.find((v) => v.name.startsWith(p))).find(Boolean) ?? gb[0] ?? voices.find((v) => v.lang.startsWith('en'))
}

export function speak(text: string, opts: { lang?: 'en' | 'ru'; voiceName?: string; rate?: number } = {}) {
  if (!canSpeak() || !text) return
  load()
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  const lang = opts.lang ?? 'en'
  const voice = pickVoice(lang, opts.voiceName)
  if (voice) u.voice = voice
  u.lang = voice?.lang ?? (lang === 'ru' ? 'ru-RU' : 'en-GB')
  u.rate = opts.rate ?? 0.95
  speechSynthesis.speak(u)
}

export function stopSpeaking() {
  if (canSpeak()) speechSynthesis.cancel()
}
