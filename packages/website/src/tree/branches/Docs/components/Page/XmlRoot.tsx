import { For, createContext } from 'solid-js'
import type { XmlRootComponent } from './types'
import Error from './components/Error'
import Page from './Page'

export const Context = createContext<{
  title: string
}>()

const main: XmlRootComponent<{
  title: string
}> = (props) => {
  return (
    <Context.Provider value={{ title: props.title }}>
      <For each={props.children}>
        {(node) => {
          switch (node.type) {
            case 'element':
              switch (node.name) {
                case 'page':
                  return <Page {...node} />
              }
          }

          return <Error>Only 'page' tag is recognized as the page root</Error>
        }}
      </For>
    </Context.Provider>
  )
}

export default main
