import './sets.css'
import type { VisualFamilyModule } from '../types'
import { AAn } from './AAn'
import { ArticleTree } from './ArticleTree'
import { CountMass } from './CountMass'
import { PluralRules } from './PluralRules'
import { PosShapes } from './PosShapes'
import { PossessiveS } from './PossessiveS'
import { QuantScale } from './QuantScale'
import { ThereIt } from './ThereIt'

export default {
  'pos-shapes': PosShapes,
  'article-tree': ArticleTree,
  'a-an': AAn,
  'plural-rules': PluralRules,
  'count-mass': CountMass,
  'quant-scale': QuantScale,
  'there-it': ThereIt,
  'possessive-s': PossessiveS,
} satisfies VisualFamilyModule
