import { describe, expect, it } from 'vitest'
import { buildGraph, memberOf, subtree } from '../src/content/graph'
import { gapToken, parseSentence, renderText, tilesOf, trailingPunct } from '../src/content/sentence'
import { canonical, matchesAny, sameAnswer } from '../src/engine/check'

describe('разметка предложений', () => {
  it('части речи, пропуск и пунктуация', () => {
    const t = parseSentence('I_P saw_V [him_P] at_I the_D station_N yesterday_R.')
    expect(t.map((x) => x.text)).toEqual(['I', 'saw', 'him', 'at', 'the', 'station', 'yesterday', '.'])
    expect(t[0]!.pos).toBe('pron')
    expect(gapToken(t)?.text).toBe('him')
    expect(renderText(t)).toBe('I saw him at the station yesterday.')
    expect(renderText(t, '___')).toBe('I saw ___ at the station yesterday.')
  })

  it('склейка ~, прилипание + и цель {}', () => {
    const t = parseSentence("It_P +'s_A in~front~of_I {the_D} house_N , isn't_A it_P ?")
    expect(renderText(t)).toBe("It's in front of the house, isn't it?")
    expect(t.find((x) => x.mark)?.text).toBe('the')
    expect(tilesOf(t)).toEqual(["It's", 'in front of', 'the', 'house', "isn't", 'it'])
    expect(trailingPunct(t)).toBe('?')
  })

  it('русские предложения, частицы и числительные', () => {
    const t = parseSentence('Я_P не_X видел_V двух_M собак_N .')
    expect(t.map((x) => x.pos)).toEqual(['pron', 'part', 'verb', 'num', 'noun', undefined])
  })

  it('ошибки разметки', () => {
    expect(() => parseSentence('[him_P')).toThrow()
    expect(() => parseSentence('him_Z')).toThrow()
    expect(() => parseSentence('a_b_N')).toThrow()
  })
})

describe('граф', () => {
  const tokens = parseSentence('Mum_N moved_V the_D old_J table_N .')
  const g = buildGraph(tokens, '1>2 subj, 3>5 attr, 4>5 attr, 5>2 obj')

  it('корень, члены предложения и группы', () => {
    expect(g.words[g.root]!.text).toBe('moved')
    expect(memberOf(g, 0)).toBe('subject')
    expect(memberOf(g, 3)).toBe('attribute')
    expect(subtree(g, 4)).toEqual([2, 3, 4])
  })

  it('ловит ошибки', () => {
    expect(() => buildGraph(tokens, '1>2 subj, 3>5 attr, 4>5 attr')).toThrow(/Корней/)
    expect(() => buildGraph(tokens, '1>2 subj, 1>3 obj')).toThrow(/два хозяина/)
    expect(() => buildGraph(tokens, '1>2 subj, 2>5 obj, 3>5 attr, 4>5 attr, 5>2 obj')).toThrow()
    expect(() => buildGraph(tokens, '1>2 foo')).toThrow(/Неизвестное/)
  })
})

describe('проверка ответа', () => {
  it('сокращения и регистр', () => {
    expect(sameAnswer("isn't", 'is not')).toBe(true)
    expect(sameAnswer('Doesn’t', 'does not')).toBe(true)
    expect(sameAnswer("I'm", 'i am')).toBe(true)
    expect(sameAnswer("won't", 'will not')).toBe(true)
    expect(sameAnswer('cannot', "can't")).toBe(true)
    expect(canonical('  Him. ')).toBe('him')
    expect(matchesAny('', [''])).toBe(false)
    expect(sameAnswer('him', 'he')).toBe(false)
  })
})

describe('лесенка', async () => {
  const { cascade } = await import('../src/content/cascade')
  const text = (s: string, spec: string, maxChars = 0) => {
    const g = buildGraph(parseSentence(s), spec)
    return cascade(g, { maxChars }).map((l) => `${l.level}:${l.words.map((w) => g.words[w]!.text).join(' ')}`)
  }

  it('подлежащее слева, сказуемое, дополнения глубже', () => {
    expect(text('The_D old_J man_N moved_V the_D table_N into_I the_D kitchen_N .', '1>3 attr, 2>3 attr, 3>4 subj, 5>6 attr, 6>4 obj, 7>9 prep, 8>9 attr, 9>4 adv')).toEqual([
      '0:The old man',
      '1:moved',
      '2:the table',
      '2:into the kitchen',
    ])
  })

  it('однородные на одном уровне, союз со вторым', () => {
    expect(text('Tom_N and_C Kate_N live_V in_I London_N .', '1>4 subj, 2>3 cc, 3>1 conj, 5>6 prep, 6>4 adv')).toEqual(['0:Tom', '0:and Kate', '1:live', '2:in London'])
  })

  it('склейка коротких фраз одной клаузы, придаточное отдельно', () => {
    const s = 'When_C Anna_N got_V home_R , the_D old_J man_N was_A waiting_V for_I her_P at_I the_D gate_N .'
    const g = '1>3 mark, 2>3 subj, 3>9 adv, 4>3 adv, 5>7 attr, 6>7 attr, 7>9 subj, 8>9 aux, 10>11 prep, 11>9 obj, 12>14 prep, 13>14 attr, 14>9 adv'
    expect(text(s, g, 24)).toEqual(['1:When Anna got home', '0:the old man was waiting', '2:for her at the gate'])
  })

  it('вопрос: вспомогательный отдельным куском перед подлежащим', () => {
    expect(text('Do_A you_P like_V it_P ?', '1>3 aux, 2>3 subj, 4>3 obj')).toEqual(['1:Do', '0:you', '1:like', '2:it'])
  })
})
