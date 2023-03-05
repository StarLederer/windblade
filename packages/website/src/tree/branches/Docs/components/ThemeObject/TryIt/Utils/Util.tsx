import { For, createEffect, createSignal } from 'solid-js'
import Button from '@ui/primitives/Button'
import type { AddonXmlComponent } from '../../XmlComponent'
import type { Props as ParentProps } from '../Utils'
import Select from './Select'
import Input from './Input'

interface Props extends ParentProps {
  renderer: string
}

const Xml: AddonXmlComponent<Props> = (props) => {
  const Fallback = props.fallback ?? (() => undefined)

  const [parts, setParts] = createSignal<string[]>([])

  const setPart = (i: number, val: string) => {
    setParts((prev) => {
      prev[i] = val
      return [...prev]
    })
  }

  // Keep parts in sync with inner text nodes
  createEffect(() => {
    props.children.forEach((node, i) => {
      switch (node.type) {
        case 'text':
          setPart(i, node.value)
          break
      }
    })
  })

  const util = () => {
    const s = parts().join('').match(/\S+/g)
    return s ? s.join('') : ''
  }

  const select = () => props.onChange({ util: util(), renderer: props.renderer })

  createEffect(select)

  return <For each={props.children}>
    {(node, i) => {
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
              return <Select fallback={Fallback} onChange={val => setPart(i(), val)}>{node.children}</Select>
            case 'input':
              return <Input onChange={val => setPart(i(), val)}/>
          }
      }

      return <Fallback>{[node]}</Fallback>
    }}
  </For>
}

const main: AddonXmlComponent<Props & {
  selected: boolean
}> = (props) => {
  return (
    <tr class="border border-color-transparent border-be-color-fg-5">
      <td>
        <div class={`i-mdi-check m-auto transition opacity-${props.selected ? 's' : 'zero'}`} />
      </td>
      <td class="p-b-s.6 font-semibold flex flex-wrap">
        <Xml {...props} />
      </td>
    </tr>
  )
}

export default main
