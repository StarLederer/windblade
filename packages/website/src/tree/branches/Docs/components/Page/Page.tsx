import { Show, useContext } from 'solid-js'
import type { Element } from 'xast-util-from-xml/lib'

import type { XmlComponent, XmlNodeRenderer } from './types'
import { XmlContext, extendXmlContext } from './types'
import { Context as RootContext } from './XmlRoot'
import XmlChildren from './components/XmlChildren'
import Code from './components/Code'
import TryIt from './Page/TryIt'
import ForUno from './Page/For'
import Sample from './Page/Sample'
import Example from './Page/Example'

import Error from '~/lib/Error'

const render: XmlNodeRenderer = (node) => {
  const ctx = useContext(RootContext)

  switch (node.type) {
    case 'text':
      return node.value
    case 'element':
      switch (node.name) {
        case 'h1':
          return <h2 class="text-fg-1 font-bold text-m.2"><XmlChildren {...node} /></h2>
        case 'h2':
          return <h3 class="font-bold text-$($s+$s.2)"><XmlChildren {...node} /></h3>
        case 'h3':
          return <h4 class="font-bold"><XmlChildren {...node} /></h4>
        case 'title':
          return ctx?.title ?? <Error>No title</Error>
        case 'p':
          return (
            <p class="text-fg-3 font-semibold leading-$($s+$s.2) max-size-i-[128ch]">
              <XmlChildren {...node} />
            </p>
          )
        case 'small':
          return (
            <small class="text-fg-4">
              <XmlChildren {...node} />
            </small>
          )
        case 'a':
          return (
            <a href={node.attributes?.href ?? '#'} class="text-accent transition hover:highlight active:highlight+">
              <XmlChildren {...node} />
            </a>
          )
        case 'ul':
          return (
            <ul class="p-is-s flex flex-col gap-s.4">
              <XmlChildren {...node} />
            </ul>
          )
        case 'li':
          return (
            <li class="text-fg-3 font-semibold leading-$($s+$s.2)">
              <XmlChildren {...node} />
            </li>
          )
        case 'code':
          return (
            <code class="bg-surface p-i-s.4 rounded-s.4">
              <XmlChildren {...node} />
            </code>
          )
        case 'pre':
          return <Code lang={node.attributes?.lang ?? 'txt'} value={node.attributes?.code ?? ''} />
        case 'example':
          return <Example html={node.attributes?.html ?? ''} />
        case 'try-it':
          return <TryIt {...node} />
        case 'for':
          return <ForUno {...node} />
        case 'sample':
          return (
            <Show when={node.attributes?.var} keyed>
              {v => <Sample var={v} />}
            </Show>
          )
        default:
          return <Error>Unsupported XML element: {node.name}</Error>
      }
    default:
      return <Error>Unsupported XML node type: {node.type}</Error>
  }
}

const main: XmlComponent<Element> = (props) => {
  return (
    <XmlContext.Provider value={extendXmlContext([render])}>
      <XmlChildren {...props} />
    </XmlContext.Provider>
  )
}

export default main
