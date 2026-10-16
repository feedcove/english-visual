import './timeline.css'
import type { VisualFamilyModule } from '../types'
import { FutureForms } from './FutureForms'
import { PpVsPs } from './PpVsPs'
import { TenseMap } from './TenseMap'
import { Timeline } from './Timeline'

export default {
  timeline: Timeline,
  'tense-map': TenseMap,
  'pp-vs-ps': PpVsPs,
  'future-forms': FutureForms,
} satisfies VisualFamilyModule
