import { createResource, createRoot } from 'solid-js'

const main = () => {
  const [formatter] = createResource(async () => (await import('js-beautify')).default)
  const [highlighter] = createResource(async () => (await import('highlight.js')).default)
  const [xml] = createResource(async () => (await import('xast-util-from-xml')))
  return { highlighter, formatter, xml }
}

export default createRoot(main)
