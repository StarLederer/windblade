import { For } from 'solid-js'
import type { AddonXmlComponent } from '../../XmlComponent'

const Xml: AddonXmlComponent = props => (
  <For each={props.children}>
    {(node) => {
      switch (node.type) {
        case 'element':
          switch (node.name) {
            case 'option':
              return <option value={node.attributes?.value ?? ''}>
                {node.attributes?.title ?? node.attributes?.value ?? ''}
              </option>
          }
      }

      return <props.fallback>{[node]}</props.fallback>
    }}
  </For>
)

const main: AddonXmlComponent<{
  onChange: (value: string) => void
}> = (props) => {
  return (
    <select
      name="colors"
      class="size-b-full bg-accent-2 rounded-s.4 min-size-i-0 size-b-m.2 p-i-s.4 leading-s transition ease-out hover:highlight active:highlight+"
      onChange={({ target }) => props.onChange((target as HTMLSelectElement).value)}
    >
      <option value=""></option>
      <Xml {...props} />
    </select>
  )
}

export default main
