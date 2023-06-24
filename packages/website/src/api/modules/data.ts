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
      openOn: ['Usage', 'Installation'],
    },
    loadDocs: async () => (await import('@windblade/unocss-preset')).docs.default,
  },
  color: {
    meta: {
      title: 'Color',
      description: 'Semantic color utils from Windblade.',
      openOn: ['Usage', 'Installation'],
    },
    loadDocs: async () => (await import('@windblade/unocss-preset-color')).docs.default,
  },
  dollars: {
    meta: {
      title: 'Dollars',
      description: '$ syntax from Windblade.',
      openOn: ['Usage', 'Installation'],
    },
    loadDocs: async () => (await import('@windblade/unocss-preset-dollars')).docs.default,
  },
}

export default defs
