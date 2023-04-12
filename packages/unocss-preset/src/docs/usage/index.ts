import type { DocumentationTree } from 'unocss-docs'
import { docs as dollarsDocs } from '@windblade/unocss-preset-dollars'
import { docs as colorDocs } from '@windblade/unocss-preset-color'
import installation from './installation'
import logicalProperties from './logicalProperties'
import options from './options'
import variants from './variants'

const dollarSyntax = dollarsDocs.dollarSyntax.default
const semanticColors = colorDocs.usage.semanticColors

export const categoy: DocumentationTree = new Map([
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
