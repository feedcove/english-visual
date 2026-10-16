import { describe, expect, it } from 'vitest'
import { parseConllu } from '../src/content/conllu'
import { buildGraph, memberOf } from '../src/content/graph'
import { parseSentence, renderText } from '../src/content/sentence'

const T = (rows: string[][]) => rows.map((r) => r.join('\t')).join('\n')

// Формат UDPipe / spaCy: ID FORM LEMMA UPOS XPOS FEATS HEAD DEPREL DEPS MISC
const EN = `# text = She is a doctor in London.
${T([
  ['1', 'She', 'she', 'PRON', 'PRP', '_', '4', 'nsubj', '_', '_'],
  ['2', 'is', 'be', 'AUX', 'VBZ', '_', '4', 'cop', '_', '_'],
  ['3', 'a', 'a', 'DET', 'DT', '_', '4', 'det', '_', '_'],
  ['4', 'doctor', 'doctor', 'NOUN', 'NN', '_', '0', 'root', '_', '_'],
  ['5', 'in', 'in', 'ADP', 'IN', '_', '6', 'case', '_', '_'],
  ['6', 'London', 'London', 'PROPN', 'NNP', '_', '4', 'obl', '_', 'SpaceAfter=No'],
  ['7', '.', '.', 'PUNCT', '.', '_', '4', 'punct', '_', '_'],
])}`

const RU = `# text = Мама не мыла эту раму.
${T([
  ['1', 'Мама', 'мама', 'NOUN', '_', '_', '3', 'nsubj', '_', '_'],
  ['2', 'не', 'не', 'PART', '_', '_', '3', 'advmod', '_', '_'],
  ['3', 'мыла', 'мыть', 'VERB', '_', '_', '0', 'root', '_', '_'],
  ['4', 'эту', 'этот', 'DET', '_', '_', '5', 'det', '_', '_'],
  ['5', 'раму', 'рама', 'NOUN', '_', '_', '3', 'obj', '_', 'SpaceAfter=No'],
  ['6', '.', '.', 'PUNCT', '_', '_', '3', 'punct', '_', '_'],
])}`

describe('CoNLL-U → разметка', () => {
  it('английский со связкой: сказуемое — is, doctor — именная часть, обстоятельство у глагола', () => {
    const [r] = parseConllu(EN, 'en')
    expect(r!.s).toBe('She_P is_V a_D doctor_N in_I London_N .')
    const g = buildGraph(parseSentence(r!.s), r!.graph)
    expect(g.words[g.root]!.text).toBe('is')
    expect(r!.graph).toContain('4>2 compl')
    expect(r!.graph).toContain('6>2 adv')
    expect(memberOf(g, 0)).toBe('subject')
  })

  it('русский: частица не, местоимение-определитель эту', () => {
    const [r] = parseConllu(RU, 'ru')
    expect(r!.s).toBe('Мама_N не_X мыла_V эту_P раму_N .')
    expect(r!.graph).toBe('1>3 subj, 2>3 part, 4>5 attr, 5>3 obj')
    expect(r!.text).toBe('Мама не мыла эту раму.')
  })

  it('несколько предложений и составные токены пропускаются', () => {
    const two = `${EN}\n\n# text = x\n1-2\tdon't\t_\t_\t_\t_\t_\t_\t_\t_\n${RU.split('\n').slice(1).join('\n')}`
    expect(parseConllu(two, 'en')).toHaveLength(2)
  })
})

describe('крайние случаи CoNLL-U (после ревью)', () => {
  const row = (r: string[]) => r.join('\t')
  it('дефис внутри слова не склеивает слова', () => {
    const [r] = parseConllu(['# text = a well-known writer', row(['1', 'a', 'a', 'DET', '_', '_', '4', 'det', '_', '_']), row(['2', 'well', 'well', 'ADV', '_', '_', '4', 'advmod', '_', 'SpaceAfter=No']), row(['3', '-', '-', 'PUNCT', '_', '_', '2', 'punct', '_', 'SpaceAfter=No']), row(['4', 'known', 'know', 'ADJ', '_', '_', '0', 'root', '_', '_'])].join('\n'), 'en')
    expect(r!.s).toBe('a_D well_R +-known_J')
    expect(renderText(parseSentence(r!.s))).toBe('a well-known')
  })
  it('составной токен пишется слитно', () => {
    const [r] = parseConllu(['1\tI\tI\tPRON\t_\t_\t4\tnsubj\t_\t_', "2-3\tdon't\t_\t_\t_\t_\t_\t_\t_\t_", '2\tdo\tdo\tAUX\t_\t_\t4\taux\t_\t_', "3\tn't\tnot\tPART\t_\t_\t4\tadvmod\t_\t_", '4\tknow\tknow\tVERB\t_\t_\t0\troot\t_\t_'].join('\n'), 'en')
    expect(renderText(parseSentence(r!.s))).toBe("I don't know")
  })
  it('символ без формы не сдвигает нумерацию', () => {
    expect(() => parseConllu(['1\t2\t2\tNUM\t_\t_\t0\troot\t_\t_', '2\t+\t+\tSYM\t_\t_\t3\tcc\t_\t_', '3\t2\t2\tNUM\t_\t_\t1\tconj\t_\t_'].join('\n'), 'en')).not.toThrow()
  })
  it('very остаётся при прилагательном', () => {
    const [r] = parseConllu(['1\tShe\tshe\tPRON\t_\t_\t4\tnsubj\t_\t_', '2\tis\tbe\tAUX\t_\t_\t4\tcop\t_\t_', '3\tvery\tvery\tADV\t_\t_\t4\tadvmod\t_\t_', '4\ttall\ttall\tADJ\t_\t_\t0\troot\t_\t_'].join('\n'), 'en')
    expect(r!.graph).toContain('3>4 adv')
    expect(r!.graph).toContain('4>2 compl')
  })
})
