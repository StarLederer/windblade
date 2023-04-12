import type { DocumentationTree } from 'unocss-docs'
import installation from './installation'
import theme from './theme'
import semanticColors from './semanticColors'

export const categoy: DocumentationTree = new Map([
  ['Installation', installation],
  ['Theme', theme],
  ['Semantic colors', semanticColors],
])

export {
  installation,
  theme,
  semanticColors,
}

export default categoy
