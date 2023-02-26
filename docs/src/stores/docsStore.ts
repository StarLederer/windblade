import { DocumentationCategories } from "@windblade/unocss-docs";
import { createSignal, createMemo, createRoot } from "solid-js";

import { docs as presetCompleteDocs } from "windblade/presets/complete";

function main() {
  // System sceheme
  const [docs, setDocs] = createSignal<DocumentationCategories<any> | undefined>(presetCompleteDocs.default);

  // Computed
  // const scheme = createMemo(() => enforceScheme() ?? systemSceheme() ?? "dark");

  return { docs, setDocs };
}

export default createRoot(main);
