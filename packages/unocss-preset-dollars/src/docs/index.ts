import type { DocumentationTree } from 'unocss-docs'
import { compiler } from 'unocss-docs'
import dollarSyntax from './dollarSyntax'

const main: DocumentationTree = new Map([
  ['Usage', new Map([
    ['$ syntax', dollarSyntax],
  ])],
])

export default compiler.compile(main)
export * as dollarSyntax from './dollarSyntax'
