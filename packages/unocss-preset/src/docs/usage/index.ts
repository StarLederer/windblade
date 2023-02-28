import type { DocumentationCategory } from 'unocss-docs'
import type { theme } from '@windblade/core'
import { docs as dollarsDocs } from '@windblade/unocss-preset-dollars'
import installation from './installation'
import options from './options'
import semanticColors from './semanticColors'
import logicalProperties from './logicalProperties'
import variants from './variants'

const dollarSyntax = dollarsDocs.dollarSyntax.default

export const categoy: DocumentationCategory<theme.Theme> = new Map([
  ['Installation', installation],
  ['Options', options],
  ['Semantic colors', semanticColors],
  ['Logical properties', logicalProperties],
  ['$ syntax', dollarSyntax],
  ['Hover, focus and other states', variants],
])

export {
  installation,
  semanticColors,
  logicalProperties,
  dollarSyntax,
  variants,
  options,
}

export default categoy
