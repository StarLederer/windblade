import { For } from 'solid-js'
import type { XmlRootComponent } from './XmlComponent'
import Error from './Error'
import Page from './Page'

const main: XmlRootComponent = (props) => {
  return (
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
  )
}

export default main
