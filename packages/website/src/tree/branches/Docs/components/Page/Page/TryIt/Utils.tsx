import type { Accessor, Setter } from 'solid-js'
import { createContext, createSignal, useContext } from 'solid-js'
import type { Element } from 'xast-util-from-xml/lib'
import type { XmlComponent, XmlNodeRenderer } from '../../XmlComponent'
import { XmlContext, extendXmlContext } from '../../XmlComponent'
import XmlChildren from '../../XmlElement'
import Util from './Utils/Util'

export const Context = createContext<{
  selected: Accessor<number>
  setSelected: Setter<number>
}>()

const styles = {
  tr: 'border border-color-transparent border-be-color-fg-5',
  th: 'p-b-s.6 text-start text-fg-3',
}

const render: XmlNodeRenderer = (node, i) => {
  const ctx = useContext(Context)

  if (node.type === 'element') {
    switch (node.name) {
      case 'util':
        return <Util {...node} selected={ctx?.selected() === i} onSelect={() => ctx?.setSelected(i)} />
    }
  }
}

const main: XmlComponent<Element> = (props) => {
  const [selected, setSelected] = createSignal(-1)

  return (
    <Context.Provider value={{ selected, setSelected }}>
      <XmlContext.Provider value={extendXmlContext([render])}>
        <table class="border-collapse">
          <thead class="font-semibold">
            <tr class={styles.tr}>
              <th class={`${styles.th} p-i-s`}><div class="i-mdi-minus" /></th>
              <th class={`${styles.th} size-i-full`}>Utility</th>
            </tr>
          </thead>
          <tbody>
            <XmlChildren {...props} />
          </tbody>
        </table>
      </XmlContext.Provider>
    </Context.Provider>
  )
}

export default main
