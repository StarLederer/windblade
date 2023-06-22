import type { DocumentationTree } from '@windblade/unocss-docs'
import type { ModuleId, ModuleMeta } from './types'

const defs: Record<ModuleId, {
  meta: ModuleMeta
  loadDocs: () => Promise<DocumentationTree>
}> = {
  complete: {
    meta: {
      title: 'Complete',
      description: 'Complete package intended to replace Tailwind or unocss-preset-wind. Not recommended at the moment',
    },
    loadDocs: async () => (await import('unocss-preset-windblade')).docs.default,
  },
  color: {
    meta: {
      title: 'Color',
      description: 'Semantic color utils from Windblade.',
    },
    loadDocs: async () => (await import('@windblade/unocss-preset-color')).docs.default,
  },
  dollars: {
    meta: {
      title: 'Dollars',
      description: '$ syntax from Windblade.',
    },
    loadDocs: async () => (await import('@windblade/unocss-preset-dollars')).docs.default,
  },
}

export default defs
