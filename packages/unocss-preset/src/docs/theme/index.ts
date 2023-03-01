import type { DocumentationTree } from 'unocss-docs'
import colors from './colors'
import proportions from './proportions'
import other from './other'

export const categoy: DocumentationTree = new Map([
  ['Semantic Colors', colors],
  ['Proportions', proportions],
  ['Other', other],
])

export {
  colors,
}

export default categoy
