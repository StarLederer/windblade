import type { DocumentationTree } from 'unocss-docs'
import { compiler } from 'unocss-docs'
import rules from './rules'

const main: DocumentationTree = new Map([
  ...rules,
])

export default compiler.compile(main)
export * as rules from './rules'
