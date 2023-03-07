import type { Component } from 'solid-js'
import { For, Show } from 'solid-js'
import type { AddonXmlComponent } from '../../XmlComponent'
import Error from '../../Error'
import { applyVars } from '../../XmlVariables'

const Option: Component<{
  value: string
}> = (props) => {
  const value = () => applyVars(props.value)
  return (
    <option value={value()}>
      {value()}
    </option>
  )
}

const Xml: AddonXmlComponent = props => (
  <For each={props.children}>
    {(node) => {
      switch (node.type) {
        case 'element':
          switch (node.name) {
            case 'option':
              return (
                <Show when={node.attributes?.value} keyed fallback={() => <Error>'option' requires a 'value' attribute</Error>}>
                  {value => <Option value={value} />}
                </Show>
              )
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
