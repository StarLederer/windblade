import type { DocumentationTree } from '@windblade/unocss-docs'
import { docs as colorDocs } from '@windblade/unocss-preset-color'
import proportions from './proportions'
import other from './other'

const colors = colorDocs.usage.theme

export const categoy: DocumentationTree = new Map([
  ['Semantic Colors', colors],
  ['Proportions', proportions],
  ['Other', other],
])

export {
  colors,
}

export default categoy
