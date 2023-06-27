import type { DocumentationTree } from 'unocss-docs'
import installation from './installation'
import options from './options'
import dollarSyntax from './dollarSyntax'

const main: DocumentationTree = new Map([
  ['Usage', new Map([
    ['Installation', installation],
    ['Options', options],
    ['$ syntax', dollarSyntax],
  ])],
])

export default main
export * as dollarSyntax from './dollarSyntax'
