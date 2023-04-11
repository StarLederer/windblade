import type { CompiledDocumentationTree } from '@windblade/unocss-docs'
import type { JSXElement } from 'solid-js'

export const moduleIds = [
  'complete',
  'color',
  'dollars',
] as const

export type ModuleId = typeof moduleIds[number]

export interface Module {
  icon: JSXElement
  title: string
  description: string
  loadDocs: () => Promise<CompiledDocumentationTree>
}

const modules: Record<ModuleId, Module> = {
  complete: {
    icon: <div class="i-mdi-package" />,
    title: 'Complete',
    description: 'Complete package intended to replace Tailwind or unocss-preset-wind. Not recommended at the moment',
    loadDocs: async () => (await import('unocss-preset-windblade')).docs.default,
  },
  color: {
    icon: <div class="i-mdi-palette" />,
    title: 'Color',
    description: 'Semantic color utils from Windblade.',
    loadDocs: async () => (await import('@windblade/unocss-preset-color')).docs.default,
  },
  dollars: {
    icon: <div class="i-mdi-dollar" />,
    title: 'Dollars',
    description: '$ syntax from Windblade.',
    loadDocs: async () => (await import('@windblade/unocss-preset-dollars')).docs.default,
  },
}

export default modules
