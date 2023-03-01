import type { DocumentationTree } from 'unocss-docs'
import rules from './rules'

const main: DocumentationTree = new Map([
  ...rules,
])

export default main
export * as rules from './rules'
