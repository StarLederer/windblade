import type { DocumentationTree } from 'unocss-docs'
import { compiler } from 'unocss-docs'
import usage from './usage'
import theme from './theme'
import rules from './rules'

const main: DocumentationTree = new Map([
  ['Usage', usage],
  ['Theme', theme],
  ...rules,
])

export default compiler.compile(main)
export * as usage from './usage'
export * as theme from './theme'
export * as rules from './rules'
