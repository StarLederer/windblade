import type { Accessor } from 'solid-js'
import { createContext, createEffect, createSignal, useContext } from 'solid-js'
import type { Element } from 'xast-util-from-xml/lib'
import Button from '@ui/primitives/Button'
import type { XmlComponent, XmlNodeRenderer } from '../../../XmlComponent'
import { XmlContext, extendXmlContext } from '../../../XmlComponent'
import XmlChildren from '../../../XmlElement'
import { Context as TryItContext } from '../../TryIt'
import Select from './Select'
import Input from './Input'

type PartSetter = (i: number, val: string) => void

export const Context = createContext<{
  parts: Accessor<string[]>
  setPart: PartSetter
  select: () => void
}>()

const render: XmlNodeRenderer = (node, i) => {
  const ctx = useContext(Context)

  const select = (val: string) => {
    ctx?.setPart(i, val)
    ctx?.select()
  }

  switch (node.type) {
    case 'text':
      return (
        <Button
          style="none"
          class="text-accent transition ease-in"
          onClick={() => select(node.value)}
        >
          {node.value}
        </Button>
      )
    case 'element':
      switch (node.name) {
        case 'select':
          return <Select {...node} onChange={val => select(val)} />
        case 'input':
          return <Input {...node} onChange={val => select(val)} />
      }
  }
}

const main: XmlComponent<Element & {
  selected: boolean
  onSelect: () => void
}> = (props) => {
  const tryItCtx = useContext(TryItContext)

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

  const select = () => {
    tryItCtx?.selectUtil({ util: util(), renderer: props.attributes?.renderer ?? '' })
    props.onSelect()
  }

  return (
    <Context.Provider value={{ parts, setPart, select }}>
      <XmlContext.Provider value={extendXmlContext([render])}>
        <tr class="border border-color-transparent border-be-color-fg-5">
          <td>
            <div class={`i-mdi-check m-auto transition opacity-${props.selected ? 's' : 'zero'}`} />
          </td>
          <td class="p-b-s.6 font-semibold flex flex-wrap">
            <XmlChildren {...props} />
          </td>
        </tr>
      </XmlContext.Provider>
    </Context.Provider>
  )
}

export default main
