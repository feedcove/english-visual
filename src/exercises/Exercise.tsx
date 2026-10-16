import { Choose } from './Choose'
import { Graph } from './Graph'
import { Order } from './Order'
import { Pick } from './Pick'
import { Tag } from './Tag'
import { Type } from './Type'
import type { ExerciseProps } from './types'

export function Exercise(props: ExerciseProps) {
  switch (props.format) {
    case 'choose':
    case 'choice':
      return <Choose {...props} />
    case 'type':
      return <Type {...props} />
    case 'order':
      return <Order {...props} />
    case 'tag':
      return <Tag {...props} />
    case 'pick':
      return <Pick {...props} />
    case 'graph':
      return <Graph {...props} />
  }
}
