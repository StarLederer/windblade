import type { DocumentationTree } from 'unocss-docs'
import usage from './usage'
import theme from './theme'
import rules from './rules'

const main: DocumentationTree = new Map([
  ['Usage', usage],
  ['Theme', theme],
  ...rules,
])

export default main
