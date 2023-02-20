import { createRoot, createResource } from "solid-js";

const main = () => {
  const [formatter] = createResource(async () => (await import("js-beautify")).default);
  const [highlighter] = createResource(async () => (await import("highlight.js")).default);
  const [md] = createResource(async () => (await import("mdast-util-from-markdown")));
  return { highlighter, formatter, md };
}

export default createRoot(main);
