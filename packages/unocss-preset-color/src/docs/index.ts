import type { DocumentationCategories } from 'unocss-docs'
import type { theme } from '@windblade/core'
import rules from './rules'

const main: DocumentationCategories<theme.Theme> = new Map([
  ...rules,
])

export default main
export * as rules from './rules'
