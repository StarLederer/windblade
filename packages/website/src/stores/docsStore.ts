import { compiler } from 'unocss-docs'
import type { CompiledDocumentationTree } from 'unocss-docs'
import { createRoot, createSignal } from 'solid-js'

import { docs as presetCompleteDocs } from 'unocss-preset-windblade'
// import { docs as presetCompleteDocs } from '@windblade/unocss-preset-color'

function main() {
  // System sceheme
  const [docs, setDocs] = createSignal<CompiledDocumentationTree | undefined>(compiler.compile(presetCompleteDocs.default))

  // Computed
  // const scheme = createMemo(() => enforceScheme() ?? systemSceheme() ?? "dark");

  return { docs, setDocs }
}

export default createRoot(main)
