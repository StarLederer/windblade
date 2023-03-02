export type DocumentationPage = (root: HTMLElement) => void

export type DocumentationTree = Map<string, DocumentationPage | DocumentationTree>

export type CompiledDocumentationTree = {
  name: string
  value: DocumentationPage | CompiledDocumentationTree
}[]
