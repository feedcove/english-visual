import './spatial.css'
import type { VisualFamilyModule } from '../types'
import { PrepMotion } from './PrepMotion'
import { PrepPlace } from './PrepPlace'
import { PrepTime } from './PrepTime'

export default {
  'prep-place': PrepPlace,
  'prep-time': PrepTime,
  'prep-motion': PrepMotion,
} satisfies VisualFamilyModule
