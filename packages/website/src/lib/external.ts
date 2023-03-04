import { createResource, createRoot } from 'solid-js'

const main = () => {
  const [formatter] = createResource(async () => (await import('js-beautify')).default)
  const [highlighter] = createResource(async () => (await import('highlight.js')).default)
  const [xml] = createResource(async () => (await import('xast-util-from-xml')))
  // const [md] = createResource(async () => (await import('mdast-util-from-markdown')))
  // const [mdDirective] = createResource(async () => (await import('mdast-util-directive')))
  // const [micromarkDirective] = createResource(async () => (await import('micromark-extension-directive')))
  return { highlighter, formatter, xml }
}

export default createRoot(main)
