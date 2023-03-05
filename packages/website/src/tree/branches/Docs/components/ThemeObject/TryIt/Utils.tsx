import type { Accessor, Setter } from 'solid-js'
import { For, createSignal } from 'solid-js'
import type { Props as ParentProps } from '../TryIt'
import type { AddonXmlComponent } from '../XmlComponent'
import Util from './Utils/Util'

export interface Props extends ParentProps {}

const styles = {
  tr: 'border border-color-transparent border-be-color-fg-5',
  th: 'p-b-s.6 text-start text-fg-3',
}

const Xml: AddonXmlComponent<Props & {
  selected: Accessor<number>
  setSelected: Setter<number>
}> = (props) => {
  const Fallback = props.fallback ?? (() => undefined)

  return <For each={props.children}>
    {(node, i) => {
      if (node.type === 'element') {
        switch (node.name) {
          case 'util':
            return (
              <Util
                renderer={node.attributes?.renderer ?? ''}
                onChange={(...args) => {
                  props.onChange(...args)
                  props.setSelected(i())
                }}
                fallback={props.fallback}
                selected={props.selected() === i()}
              >
                {node.children}
              </Util>
            )
        }
      }

      return <Fallback>{[node]}</Fallback>
    }}
  </For>
}

const main: AddonXmlComponent<Props> = (props) => {
  const [selected, setSelected] = createSignal(-1)

  return (
    <table class="border-collapse">
      <thead class="font-semibold">
        <tr class={styles.tr}>
          <th class={`${styles.th} p-i-s`}><div class="i-mdi-minus" /></th>
          <th class={`${styles.th} size-i-full`}>Utility</th>
        </tr>
      </thead>
      <tbody>
        <Xml {...{ selected, setSelected, ...props }}></Xml>
      </tbody>
    </table>
  )
}

export default main
