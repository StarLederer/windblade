import type { CompiledDocumentationTree } from '@windblade/unocss-docs'
import type { JSXElement } from 'solid-js'

const modules: {
  icon: JSXElement
  name: string
  description: string
  loadDocs: () => Promise<CompiledDocumentationTree>
}[] = [
  {
    icon: <div class="i-mdi-package" />,
    name: 'Complete',
    description: 'Complete package intended to replace Tailwind or unocss-preset-wind. Not recommended at the moment',
    loadDocs: async () => (await import('unocss-preset-windblade')).docs.default,
  },
  {
    icon: <div class="i-mdi-palette" />,
    name: 'Color',
    description: 'Semantic color utils from Windblade.',
    loadDocs: async () => (await import('@windblade/unocss-preset-color')).docs.default,
  },
  {
    icon: <div class="i-mdi-dollar" />,
    name: 'Dollars',
    description: '$ syntax from Windblade.',
    loadDocs: async () => (await import('@windblade/unocss-preset-dollars')).docs.default,
  },
]

export default modules
