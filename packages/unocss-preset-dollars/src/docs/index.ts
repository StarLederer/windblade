import type { DocumentationTree } from 'unocss-docs'
import { compiler } from 'unocss-docs'
import installation from './installation'
import dollarSyntax from './dollarSyntax'

const main: DocumentationTree = new Map([
  ['Usage', new Map([
    ['Installation', installation],
    ['$ syntax', dollarSyntax],
  ])],
])

export default compiler.compile(main)
export * as dollarSyntax from './dollarSyntax'
