import type { Accessor } from 'solid-js'
import { createContext, createEffect, createSignal, useContext } from 'solid-js'
import type { Element } from 'xast-util-from-xml/lib'
import Button from '@ui/primitives/Button'
import type { AddonXmlComponent, XmlComponent } from '../../../XmlComponent'
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

const Xml: AddonXmlComponent = (props) => {
  const ctx = useContext(Context)

  const select = (val: string) => {
    ctx?.setPart(props.i, val)
    ctx?.select()
  }

  return <>{(() => {
    switch (props.type) {
      case 'text':
        return (
          <Button
            style="none"
            class="text-accent transition ease-in"
            onClick={() => select(props.value)}
          >
            {props.value}
          </Button>
        )
      case 'element':
        switch (props.name) {
          case 'select':
            return <Select {...props} onChange={val => select(val)} />
          case 'input':
            return <Input {...props} onChange={val => select(val)}/>
        }
    }
  })()}</>
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
      <XmlContext.Provider value={extendXmlContext([Xml])}>
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
