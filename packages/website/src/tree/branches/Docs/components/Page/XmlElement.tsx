import { For } from 'solid-js'
import type { Element } from 'xast-util-from-xml/lib'
import type { XmlComponent } from './XmlComponent'
import { useXmlContext } from './XmlComponent'

const main: XmlComponent<Element> = (props) => {
  const context = useXmlContext()

  return (
    <For each={props.children}>
      {(node, i) => {
        for (let j = context.length - 1; j >= 0; --j) {
          const XmlComponent = context[j]
          const JSX = <XmlComponent {...node} i={i()} />
          if (JSX()() !== undefined) // TODO: This is unacceptable, just putting it here for now so that we have a proof of concept
            return JSX
        }
      }}
    </For>
  )
}

export default main
