import type { CompiledDocumentationTree, DocumentationTree } from './types'

const mapsToArrays = (obj: unknown) => {
  if (obj instanceof Map) {
    const arr: {
      name: any
      value: any
    }[] = []

    obj.forEach((val: any, key: any) => {
      arr.push({ name: key, value: mapsToArrays(val) })
    })

    return arr
  }

  return obj
}

export const compile = (docs: DocumentationTree) => mapsToArrays(docs) as CompiledDocumentationTree

export const stringify = (docs: DocumentationTree) => {
  return JSON.stringify(mapsToArrays(docs))
}
