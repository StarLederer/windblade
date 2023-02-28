import type { DocumentationCategories } from 'unocss-docs'
import type { theme as coreTheme } from '@windblade/core'
import usage from './usage'
import theme from './theme'
import rules from './rules'

const main: DocumentationCategories<coreTheme.Theme> = new Map([
  ['Usage', usage],
  ['Theme', theme],
  ...rules,
])

export default main
