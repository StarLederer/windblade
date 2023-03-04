/* eslint-disable @typescript-eslint/no-use-before-define */

import { For } from 'solid-js'
import type { XmlComponent } from './XmlComponent'
import Error from './Error'
import TryIt from './TryIt'

const XmlElement: XmlComponent<{
  name: string
}> = (props) => {
  switch (props.name) {
    case 'page':
      return <Xml>{props.children}</Xml>
    case 'h1':
      return <h2 class="text-fg-1 font-bold text-m.2"><Xml>{props.children}</Xml></h2>
    case 'h2':
      return <h3 class="font-bold text-$($s+$s.2)"><Xml>{props.children}</Xml></h3>
    case 'h3':
      return <h4 class="font-bold"><Xml>{props.children}</Xml></h4>
    case 'title':
      return 'Title (TODO: pass actual title)'
    case 'p':
      return (
        <p class="text-fg-3 font-semibold leading-$($s+$s.2) max-size-i-[128ch]">
          <Xml>{props.children}</Xml>
        </p>
      )
    case 'try-it':
      return <TryIt fallback={Xml}>{props.children}</TryIt>
    default:
      return <Error>Unsupported XML element: {props.name}</Error>
  }
}

const Xml: XmlComponent = (props) => {
  return <For each={props.children}>
    {(node) => {
      switch (node.type) {
        case 'element':
          return <XmlElement name={node.name}>{node.children}</XmlElement>
        case 'text':
          return node.value
        default:
          return <Error>Unsupported XML node type: {node.type}</Error>
      }
    }}
  </For>
}

export default Xml
