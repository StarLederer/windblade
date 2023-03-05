import { For } from 'solid-js'
import type { Props as ParentProps } from '../TryIt'
import type { AddonXmlComponent } from '../XmlComponent'
import Util from './Utils/Util'

export interface Props extends ParentProps {}

const styles = {
  tr: 'border border-color-transparent border-be-color-fg-5',
  th: 'p-b-s.6 text-start text-fg-3',
}

const Xml: AddonXmlComponent<Props> = (props) => {
  const Fallback = props.fallback ?? (() => undefined)

  return <For each={props.children}>
    {(node) => {
      if (node.type === 'element') {
        switch (node.name) {
          case 'util':
            return (
              <Util
                renderer={node.attributes?.renderer ?? ''}
                onChange={props.onChange}
                fallback={props.fallback}
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

const main: AddonXmlComponent<Props> = props => (
  <table class="border-collapse">
    <thead class="font-semibold">
      <tr class={styles.tr}>
        <th class={`${styles.th} p-i-s`}><div class="i-mdi-minus" /></th>
        <th class={`${styles.th} size-i-full`}>Utility</th>
      </tr>
    </thead>
    <tbody>
      <Xml {...props}></Xml>
    </tbody>
  </table>
)

export default main