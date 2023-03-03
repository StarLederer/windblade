import { createResource, createRoot } from 'solid-js'

const main = () => {
  const [formatter] = createResource(async () => (await import('js-beautify')).default)
  const [highlighter] = createResource(async () => (await import('highlight.js')).default)
  const [md] = createResource(async () => (await import('mdast-util-from-markdown')))
  const [mdDirective] = createResource(async () => (await import('mdast-util-directive')))
  const [micromarkDirective] = createResource(async () => (await import('micromark-extension-directive')))
  return { highlighter, formatter, md, mdDirective, micromarkDirective }
}

export default createRoot(main)
