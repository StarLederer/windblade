import { Show } from 'solid-js'
import type { Element } from 'xast-util-from-xml/lib'
import type { XmlComponent } from './XmlComponent'
import { XmlContext, extendXmlContext } from './XmlComponent'
import Error from './Error'
import TryIt from './Page/TryIt'
import ForUno from './Page/For'
import Sample from './Page/Sample'
import XmlChildren from './XmlElement'

const Xml: XmlComponent = props => <>{(() => {
  switch (props.type) {
    case 'text':
      return props.value
    case 'element':
      switch (props.name) {
        case 'h1':
          return <h2 class="text-fg-1 font-bold text-m.2"><XmlChildren {...props} /></h2>
        case 'h2':
          return <h3 class="font-bold text-$($s+$s.2)"><XmlChildren {...props} /></h3>
        case 'h3':
          return <h4 class="font-bold"><XmlChildren {...props} /></h4>
        case 'title':
          return 'Title (TODO: pass actual title)'
        case 'p':
          return (
            <p class="text-fg-3 font-semibold leading-$($s+$s.2) max-size-i-[128ch]">
              <XmlChildren {...props} />
            </p>
          )
        case 'try-it':
          return <TryIt {...props} />
        case 'for':
          return <ForUno {...props}/>
        case 'sample':
          return (
            <Show when={props.attributes?.var} keyed>
              {v => <Sample var={v} />}
            </Show>
          )
        default:
          return <Error>Unsupported XML element: {props.name}</Error>
      }
    default:
      return <Error>Unsupported XML node type: {props.type}</Error>
  }
})()}</>

const main: XmlComponent<Element> = (props) => {
  return (
    <XmlContext.Provider value={extendXmlContext([Xml])}>
      <XmlChildren {...props} />
    </XmlContext.Provider>
  )
}

export default main
