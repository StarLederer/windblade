export type Md = string

export type DocumentationPage = Md

export type DocumentationTree = Map<string, DocumentationPage | DocumentationTree>
