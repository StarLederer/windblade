import type { CompiledDocumentationTree } from 'unocss-docs'
import { createRoot, createSignal } from 'solid-js'

import { docs as presetCompleteDocs } from 'unocss-preset-windblade'

function main() {
  // System sceheme
  const [name, setName] = createSignal<string>()
  const [docs, setDocs] = createSignal<CompiledDocumentationTree | undefined>(presetCompleteDocs.default)

  // Computed
  // const scheme = createMemo(() => enforceScheme() ?? systemSceheme() ?? "dark");

  return { docs, setDocs, name, setName }
}

export default createRoot(main)
