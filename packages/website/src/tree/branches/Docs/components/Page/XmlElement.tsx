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
          const render = context[j]
          const JSX = render(node, i())
          if (JSX !== undefined)
            return JSX
        }
      }}
    </For>
  )
}

export default main
