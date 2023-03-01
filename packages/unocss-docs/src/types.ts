export type Md = string

export type DocumentationPage = Md

export type DocumentationTree = Map<string, DocumentationPage | DocumentationTree>

export type CompiledDocumentationTree = {
  name: string
  value: DocumentationPage | CompiledDocumentationTree
}[]
