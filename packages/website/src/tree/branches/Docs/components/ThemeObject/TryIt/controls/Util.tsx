import { For } from 'solid-js'
import type { AddonXmlComponent } from '../../XmlComponent'

const Xml: AddonXmlComponent = (props) => {
  const Fallback = props.fallback ?? (() => undefined)

  return <For each={props.children}>
    {(node) => {
      return <Fallback>{[node]}</Fallback>
    }}
  </For>
}

const main: AddonXmlComponent = (props) => {
  const Fallback = props.fallback ?? (() => undefined)

  return (
    <tr class="border border-color-transparent border-be-color-fg-5">
      <td>
        <div class="i-mdi-check m-auto"/>
      </td>
      <td class="p-b-s.6"><Xml fallback={Fallback}>{props.children}</Xml></td>
    </tr>
  )
}

export default main
