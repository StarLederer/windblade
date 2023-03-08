import { Show } from 'solid-js'
import type { Element } from 'xast-util-from-xml/lib'
import type { XmlComponent, XmlNodeRenderer } from './XmlComponent'
import { XmlContext, extendXmlContext } from './XmlComponent'
import Error from './Error'
import TryIt from './Page/TryIt'
import ForUno from './Page/For'
import Sample from './Page/Sample'
import XmlChildren from './XmlElement'

const render: XmlNodeRenderer = (node) => {
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
          return 'Title (TODO: pass actual title)'
        case 'p':
          return (
            <p class="text-fg-3 font-semibold leading-$($s+$s.2) max-size-i-[128ch]">
              <XmlChildren {...node} />
            </p>
          )
        case 'a':
          return (
            <a href={node.attributes?.href ?? '#'} class="text-accent transition hover:highlight active:highlight+">
              <XmlChildren {...node} />
            </a>
          )
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
