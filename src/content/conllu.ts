import { buildGraph } from './graph'
import { parseSentence } from './sentence'
import type { Lang, Pos, Rel } from './types'

// Свой текст → разметка приложения. На входе CoNLL-U (Universal Dependencies): его выдают UDPipe
// (в том числе веб-сервис LINDAT), spaCy и Stanza, см. tools/parse.py. На выходе — предложение в нашей
// мини-разметке и граф. Связка с be переворачивается: у нас сказуемое — глагол (She is a doctor → is).

interface UdToken {
  id: number
  form: string
  lemma: string
  upos: string
  head: number
  deprel: string
  spaceAfter: boolean
}

export interface ParsedSentence {
  s: string
  graph: string
  lang: Lang
  text: string
}

const POS_CODE: Partial<Record<Pos, string>> = {
  noun: 'N', pron: 'P', det: 'D', num: 'M', adj: 'J', verb: 'V', aux: 'A', adv: 'R', prep: 'I', conj: 'C', part: 'X',
}

function posOf(t: UdToken, lang: Lang, isHeadVerb: boolean): Pos {
  switch (t.upos) {
    case 'NOUN':
    case 'PROPN':
    case 'SYM':
    case 'X':
      return 'noun'
    case 'PRON':
      return 'pron'
    case 'DET':
      // В русском «этот, мой, весь» — местоимения; в английском the / this book — определители.
      return lang === 'ru' ? 'pron' : 'det'
    case 'NUM':
      return 'num'
    case 'ADJ':
      return 'adj'
    case 'VERB':
      return 'verb'
    case 'AUX':
      return isHeadVerb ? 'verb' : 'aux'
    case 'ADV':
      return 'adv'
    case 'ADP':
      return 'prep'
    case 'CCONJ':
    case 'SCONJ':
      return 'conj'
    default:
      return 'part'
  }
}

// К связке переезжают зависимые всей клаузы. advmod остаётся: very в «is very tall» — степень при прилагательном.
const CLAUSE_LEVEL = new Set(['nsubj', 'csubj', 'aux', 'mark', 'advcl', 'obl', 'expl', 'discourse', 'parataxis', 'punct', 'cc'])

function relOf(t: UdToken, byId: Map<number, UdToken>): Rel {
  const base = t.deprel.split(':')[0]!
  const head = byId.get(t.head)
  switch (base) {
    case 'nsubj':
    case 'csubj':
      return 'subj'
    case 'obj':
    case 'iobj':
    case 'ccomp':
    case 'xcomp':
      return 'obj'
    case 'compl':
      return 'compl'
    case 'det':
    case 'amod':
    case 'nummod':
    case 'acl':
    case 'compound':
    case 'flat':
    case 'fixed':
    case 'appos':
    case 'goeswith':
      return 'attr'
    case 'nmod':
      return head && (head.upos === 'VERB' || head.upos === 'AUX') ? 'adv' : 'attr'
    case 'aux':
    case 'cop':
      return 'aux'
    case 'case':
      return 'prep'
    case 'cc':
      return 'cc'
    case 'conj':
      return 'conj'
    case 'mark':
      return t.upos === 'PART' ? 'part' : 'mark'
    case 'expl':
      return 'part'
    case 'advmod':
      return t.upos === 'PART' ? 'part' : 'adv'
    default:
      return t.upos === 'PART' ? 'part' : 'adv'
  }
}

/** Разбор блока CoNLL-U (одного или нескольких предложений). */
export function parseConllu(input: string, lang: Lang): ParsedSentence[] {
  const out: ParsedSentence[] = []
  for (const block of input.replace(/\r/g, '').split(/\n\s*\n/)) {
    const tokens: UdToken[] = []
    let text = ''
    // Составной токен «2-3 don't»: части пишутся слитно, пробел после — как у всего токена.
    let range: { from: number; to: number; spaceAfter: boolean } | null = null
    for (const line of block.split('\n')) {
      if (line.startsWith('# text =')) text = line.slice(8).trim()
      if (!line.trim() || line.startsWith('#')) continue
      const cols = line.split('\t')
      const mwt = cols[0]?.match(/^(\d+)-(\d+)$/)
      if (mwt) {
        range = { from: Number(mwt[1]), to: Number(mwt[2]), spaceAfter: !(cols[9] ?? '').includes('SpaceAfter=No') }
        continue
      }
      if (cols.length < 8 || !/^\d+$/.test(cols[0]!)) continue // пустые узлы 1.1
      const id = Number(cols[0])
      const inRange = range && id >= range.from && id <= range.to
      tokens.push({
        id,
        form: cols[1]!,
        lemma: cols[2]!,
        upos: cols[3]!,
        head: Number(cols[6]),
        deprel: cols[7]!,
        spaceAfter: inRange ? id === range!.to && range!.spaceAfter : !(cols[9] ?? '').includes('SpaceAfter=No'),
      })
    }
    if (tokens.length) out.push(convert(tokens, lang, text))
  }
  return out
}

function convert(input: UdToken[], lang: Lang, text: string): ParsedSentence {
  const tokens = input.map((t) => ({ ...t }))
  const byId = new Map(tokens.map((t) => [t.id, t]))

  // Связка: be становится сказуемым, именная часть — compl. Обстоятельства и подлежащее переезжают к be.
  for (const cop of tokens.filter((t) => t.deprel === 'cop')) {
    const pred = byId.get(cop.head)
    if (!pred) continue
    cop.head = pred.head
    cop.deprel = pred.deprel
    pred.head = cop.id
    pred.deprel = 'compl'
    for (const t of tokens) {
      const base = t.deprel.split(':')[0]!
      // Вторая клауза со своим подлежащим или связкой (She is smart and he is kind) — однородная к связке.
      const clauseConj = base === 'conj' && tokens.some((d) => d.head === t.id && (d.deprel.startsWith('nsubj') || d.deprel === 'cop'))
      if (t.head === pred.id && t !== cop && (CLAUSE_LEVEL.has(base) || clauseConj)) t.head = cop.id
    }
  }

  // Пунктуацию оставляем только ту, что разметка понимает; остальную (кавычки, тире) убираем.
  // Слово, от которого после очистки ничего не осталось («+», «_»), считаем пунктуацией, иначе съедет нумерация.
  const clean = (form: string) => form.replace(/[\s_[\]{}~+]/g, '')
  const isPunct = (t: UdToken) => t.upos === 'PUNCT' || !clean(t.form)
  const keep = tokens.filter((t) => !isPunct(t) || /^[.,!?;:…]+$/.test(t.form))
  const words = keep.filter((t) => !isPunct(t))
  const index = new Map(words.map((t, i) => [t.id, i + 1]))

  const headOf = (t: UdToken): UdToken | undefined => {
    // Если хозяин — выброшенная пунктуация (бывает в кривых разборах), поднимаемся выше.
    let h = byId.get(t.head)
    while (h && isPunct(h)) h = byId.get(h.head)
    return h
  }

  const parts: string[] = []
  let prevSpace = true
  // Выброшенный знак внутри слова (well-known, e-mail) приклеиваем к следующему слову, чтобы не получилось wellknown.
  let glue = ''
  for (const t of tokens) {
    const kept = keep.includes(t)
    if (!kept) {
      if (!prevSpace && !t.spaceAfter) glue += clean(t.form) || t.form
      else if (t.spaceAfter) prevSpace = true
      continue
    }
    const form = clean(t.form)
    if (isPunct(t)) parts.push(form)
    else {
      const verbHead = t.upos === 'AUX' && tokens.some((d) => d.head === t.id && d.deprel === 'compl')
      const code = POS_CODE[posOf(t, lang, verbHead || t.deprel === 'root')]
      parts.push(`${prevSpace && !glue ? '' : '+'}${glue}${form}_${code}`)
      glue = ''
    }
    prevSpace = t.spaceAfter
  }

  const edges: string[] = []
  for (const t of words) {
    const h = headOf(t)
    if (!h || t.head === 0) continue
    edges.push(`${index.get(t.id)}>${index.get(h.id)} ${relOf(t, byId)}`)
  }

  const s = parts.join(' ')
  const graph = edges.join(', ')
  buildGraph(parseSentence(s), graph) // бросит понятную ошибку, если разбор кривой
  return { s, graph, lang, text: text || words.map((w) => w.form).join(' ') }
}
