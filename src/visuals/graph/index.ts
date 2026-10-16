import './graph.css'
import type { VisualFamilyModule } from '../types'
import { PosBridge } from './PosBridge'
import { SentenceGraphVisual } from './SentenceGraphVisual'

export default {
  'sentence-graph': SentenceGraphVisual,
  'pos-bridge': PosBridge,
} satisfies VisualFamilyModule
