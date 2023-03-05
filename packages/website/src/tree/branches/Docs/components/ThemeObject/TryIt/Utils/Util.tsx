import { For } from 'solid-js'
import Button from '@ui/primitives/Button'
import type { AddonXmlComponent } from '../../XmlComponent'
import type { Props } from '../Utils'
import Select from './Select'
import Input from './Input'

const Xml: AddonXmlComponent<Props> = (props) => {
  const Fallback = props.fallback ?? (() => undefined)

  const select = () => props.onChange({ util: '', id: '' }) // TODO

  return <For each={props.children}>
    {(node) => {
      switch (node.type) {
        case 'text':
          return (
            <Button
              style="none"
              class="text-accent transition ease-in"
              onClick={select}
            >
              {node.value}
            </Button>
          )
        case 'element':
          switch (node.name) {
            case 'select':
              return <Select fallback={Fallback} onChange={select}>{node.children}</Select>
            case 'input':
              return <Input onChange={select}/>
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
      <td class="p-b-s.6 font-semibold flex flex-wrap">
        <Xml {...props} />
      </td>
    </tr>
  )
}

export default main
