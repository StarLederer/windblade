import type { Accessor, Setter } from 'solid-js'
import { createContext, createSignal, useContext } from 'solid-js'
import type { Element } from 'xast-util-from-xml/lib'
import type { AddonXmlComponent, XmlComponent } from '../../XmlComponent'
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

const Xml: AddonXmlComponent = (props) => {
  const ctx = useContext(Context)

  return <>{(() => {
    if (props.type === 'element') {
      switch (props.name) {
        case 'util':
          return <Util {...props} selected={ctx?.selected() === props.i} onSelect={() => ctx?.setSelected(props.i)}/>
      }
    }
  })()}</>
}

const main: XmlComponent<Element> = (props) => {
  const [selected, setSelected] = createSignal(-1)

  return (
    <Context.Provider value={{ selected, setSelected }}>
      <XmlContext.Provider value={extendXmlContext([Xml])}>
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
