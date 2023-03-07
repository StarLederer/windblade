/* eslint-disable @typescript-eslint/no-use-before-define */

import { For, Show } from 'solid-js'
import type { XmlComponent } from './XmlComponent'
import Error from './Error'
import TryIt from './TryIt'
import ForUno from './For'
import Sample from './Sample'

const XmlElement: XmlComponent<{
  name: string
  attrs?: Record<string, string | null | undefined>
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
    case 'for':
      return <>{(() => {
        const noAttrs = '\'for\' requires an \'array\' or \'object\' attribute'
        const noValue = '\'for\' requires a \'value-as\' attribute'
        const noKey = '\'for\' with an \'object\' attribute requires a \'key-as\' attribute'

        if (!props.attrs)
          return <Error>{noAttrs}</Error>

        if (props.attrs.array) {
          if (!props.attrs['value-as'])
            return <Error>{noValue}</Error>

          return <ForUno type="array" array={props.attrs.array} as={props.attrs['value-as']} fallback={Xml}>{props.children}</ForUno>
        }
        else if (props.attrs.object) {
          if (!props.attrs['value-as'])
            return <Error>{noValue}</Error>

          if (!props.attrs['key-as'])
            return <Error>{noKey}</Error>

          return <ForUno type="object" object={props.attrs.object} keyAs={props.attrs['key-as']} valueAs={props.attrs['value-as']} fallback={Xml}>{props.children}</ForUno>
        }

        return <Error>{noAttrs}</Error>
      })()}</>
    case 'sample':
      return (
        <Show when={props.attrs?.var} keyed>
          {v => <Sample var={v}/>}
        </Show>
      )
    default:
      return <Error>Unsupported XML element: {props.name}</Error>
  }
}

const Xml: XmlComponent = (props) => {
  return <For each={props.children}>
    {(node) => {
      switch (node.type) {
        case 'element':
          return <XmlElement name={node.name} attrs={node.attributes}>{node.children}</XmlElement>
        case 'text':
          return node.value
        default:
          return <Error>Unsupported XML node type: {node.type}</Error>
      }
    }}
  </For>
}

export default Xml
