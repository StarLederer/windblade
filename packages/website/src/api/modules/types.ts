import type { CompiledDocumentationTree } from '@windblade/unocss-docs'

export type ModuleId = string

export interface ModuleMeta {
  title: string
  description: string
}

export interface Module {
  meta: ModuleMeta
  docs: CompiledDocumentationTree
}
