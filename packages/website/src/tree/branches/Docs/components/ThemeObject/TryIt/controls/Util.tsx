import { For } from 'solid-js'
import type { XmlComponent } from '../../XmlComponent'

const Xml: XmlComponent = (props) => {
  const Fallback = props.fallback ?? (() => undefined)

  return <For each={props.children}>
    {(node) => {
      return <Fallback>{[node]}</Fallback>
    }}
  </For>
}

const main: XmlComponent = (props) => {
  const Fallback = props.fallback ?? (() => undefined)

  return (
    <tr>
      <td>
        <div class="i-mdi-check m-auto"/>
      </td>
      <td><Xml fallback={Fallback}>{props.children}</Xml></td>
    </tr>
  )
}

export default main
