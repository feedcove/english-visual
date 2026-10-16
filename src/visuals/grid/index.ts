import './grid.css'
import type { VisualFamilyModule } from '../types'
import { BeForms } from './BeForms'
import { IndefGrid } from './IndefGrid'
import { NearFar } from './NearFar'
import { PronGrid } from './PronGrid'
import { VerbPerson } from './VerbPerson'

export default {
  'pron-grid': PronGrid,
  'be-forms': BeForms,
  'verb-person': VerbPerson,
  'near-far': NearFar,
  'indef-grid': IndefGrid,
} satisfies VisualFamilyModule
