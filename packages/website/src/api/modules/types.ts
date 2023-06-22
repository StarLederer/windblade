import type { DocumentationTree } from '@windblade/unocss-docs'

export type ModuleId = string

export interface ModuleMeta {
  title: string
  description: string
  openOn: string[]
}

export interface Module {
  meta: ModuleMeta
  docs: DocumentationTree
}
