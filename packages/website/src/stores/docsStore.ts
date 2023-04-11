import type { CompiledDocumentationTree } from 'unocss-docs'
import { createRoot, createSignal } from 'solid-js'

import type { ModuleId } from './docsStore/modules'
import modules from './docsStore/modules'

function main() {
  const [module, setModule] = createSignal<{
    id: ModuleId | undefined
    docs: CompiledDocumentationTree | undefined
    error: any
  }>({
    id: undefined,
    docs: undefined,
    error: undefined,
  })

  const fetchModule = async (id: ModuleId) => {
    let docs
    let error

    try {
      docs = await modules[id].loadDocs()
    }
    catch (err) {
      error = err
    }

    setModule({ id, docs, error })
  }

  return { module, fetchModule }
}

export default createRoot(main)
export { default as modules } from './docsStore/modules'
