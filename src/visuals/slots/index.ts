import './slots.css'
import type { VisualFamilyModule } from '../types'
import { AdjOrder } from './AdjOrder'
import { AdvSlots } from './AdvSlots'
import { AuxFormula } from './AuxFormula'
import { WordTrain } from './WordTrain'

export default {
  'word-train': WordTrain,
  'adv-slots': AdvSlots,
  'aux-formula': AuxFormula,
  'adj-order': AdjOrder,
} satisfies VisualFamilyModule
