import type { DocumentationTree } from 'unocss-docs'
import usage from './usage'
import rules from './rules'

const main: DocumentationTree = new Map([
  ['Usage', usage],
  ...rules,
])

export default main
export * as usage from './usage'
export * as rules from './rules'
