import type { DocumentationCategories } from 'unocss-docs'
import type { theme } from '@windblade/core'
import dollarSyntax from './dollarSyntax'

const main: DocumentationCategories<theme.Theme> = new Map([
  ['Usage', new Map([
    ['$ syntax', dollarSyntax],
  ])],
])

export default main
export * as dollarSyntax from './dollarSyntax'
