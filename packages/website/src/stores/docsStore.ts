import type { DocumentationCategories } from '@windblade/unocss-docs'
import { createRoot, createSignal } from 'solid-js'

import { docs as presetCompleteDocs } from 'unocss-preset-windblade'

function main() {
  // System sceheme
  const [docs, setDocs] = createSignal<DocumentationCategories<any> | undefined>(presetCompleteDocs.default)

  // Computed
  // const scheme = createMemo(() => enforceScheme() ?? systemSceheme() ?? "dark");

  return { docs, setDocs }
}

export default createRoot(main)
