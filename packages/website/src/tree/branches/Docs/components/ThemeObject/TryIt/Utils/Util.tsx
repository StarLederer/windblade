import { For, createEffect, createSignal } from 'solid-js'
import Button from '@ui/primitives/Button'
import type { AddonXmlComponent } from '../../XmlComponent'
import type { Props as ParentProps } from '../Utils'
import Select from './Select'
import Input from './Input'

interface Props extends ParentProps {
  renderer: string
}

type PartSetter = (i: number, val: string) => void

const Xml: AddonXmlComponent<Props & {
  setPart: PartSetter
}> = (props) => {
  return <For each={props.children}>
    {(node, i) => {
      switch (node.type) {
        case 'text':
          return (
            <Button
              style="none"
              class="text-accent transition ease-in"
              onClick={() => props.setPart(i(), node.value)}
            >
              {node.value}
            </Button>
          )
        case 'element':
          switch (node.name) {
            case 'select':
              return <Select fallback={props.fallback} onChange={val => props.setPart(i(), val)}>{node.children}</Select>
            case 'input':
              return <Input onChange={val => props.setPart(i(), val)}/>
          }
      }

      return <props.fallback>{[node]}</props.fallback>
    }}
  </For>
}

const main: AddonXmlComponent<Props & {
  selected: boolean
}> = (props) => {
  const [parts, setParts] = createSignal<string[]>([])

  const setPart: PartSetter = (i, val) => {
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

  return (
    <tr class="border border-color-transparent border-be-color-fg-5">
      <td>
        <div class={`i-mdi-check m-auto transition opacity-${props.selected ? 's' : 'zero'}`} />
      </td>
      <td class="p-b-s.6 font-semibold flex flex-wrap">
        <Xml {...props} {...{ setPart }} />
      </td>
    </tr>
  )
}

export default main
