import './sets2.css'
import type { VisualFamilyModule } from '../types'
import { AdjAdv } from './AdjAdv'
import { ComparisonSteps } from './ComparisonSteps'
import { ConjLinks } from './ConjLinks'
import { EdIng } from './EdIng'
import { ModalScale } from './ModalScale'
import { PhrasalParticles } from './PhrasalParticles'
import { StateAction } from './StateAction'
import { VerbForms } from './VerbForms'

export default {
  'adj-adv': AdjAdv,
  'comparison-steps': ComparisonSteps,
  'modal-scale': ModalScale,
  'verb-forms': VerbForms,
  'state-action': StateAction,
  'phrasal-particles': PhrasalParticles,
  'conj-links': ConjLinks,
  'ed-ing': EdIng,
} satisfies VisualFamilyModule
