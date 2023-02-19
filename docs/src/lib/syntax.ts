import { createRoot, createResource } from "solid-js";

const main = () => {
  const [formatter] = createResource(async () => (await import("js-beautify")).default);
  const [highlighter] = createResource(async () => (await import("highlight.js")).default);
  return { highlighter, formatter };
}

export default createRoot(main);
