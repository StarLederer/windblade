import { For } from 'solid-js'
import type { AddonXmlComponent } from '../../XmlComponent'
import Select from './Select'
import type { Props } from '.'

const Xml: AddonXmlComponent<Props> = (props) => {
  const Fallback = props.fallback ?? (() => undefined)

  const select = () => props.onChange({ util: '', id: '' }) // TODO

  return <For each={props.children}>
    {(node) => {
      switch (node.type) {
        case 'text':
          return (
            <button
              class="text-accent transition ease-out hover:highlight active:highlight+"
              onClick={select}
            >
              {node.value}
            </button>
          )
        case 'element':
          switch (node.name) {
            case 'select':
              return <Select fallback={Fallback} onChange={select}>{node.children}</Select>
          }
      }

      return <Fallback>{[node]}</Fallback>
    }}
  </For>
}

const main: AddonXmlComponent<Props> = (props) => {
  return (
    <tr class="border border-color-transparent border-be-color-fg-5">
      <td>
        <div class="i-mdi-check m-auto" />
      </td>
      <td class="p-b-s.6 font-semibold">
        <Xml {...props} />
      </td>
    </tr>
  )
}

export default main
