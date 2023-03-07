import { For, useContext } from 'solid-js'
import type { AddonXmlComponent } from './XmlComponent'
import VariableContext, { applyVars } from './XmlVariables'
import uno from '~/unocss'

const navigateUnoConfig = (path: string) => {
  let destination: any = uno.config
  path.split('.').forEach(node => destination = destination[node])
  return destination
}

interface IterateObjectProps {
  type: 'object'
  object: string
  keyAs: string
  valueAs: string
}

interface IterateArrayProps {
  type: 'array'
  array: string
  as: string
}

type Props = IterateObjectProps | IterateArrayProps

const main: AddonXmlComponent<Props> = (props) => {
  const parentContext = useContext(VariableContext)

  return <>{(() => {
    switch (props.type) {
      case 'array':
        return (
          <For each={navigateUnoConfig(applyVars(props.array))}>
            {value => (
              <VariableContext.Provider value={{ ...parentContext, value }}>
                <props.fallback>
                  {props.children}
                </props.fallback>
              </VariableContext.Provider>
            )}
          </For>
        )
      case 'object':
        return (
          <For each={Object.entries(navigateUnoConfig(applyVars(props.object)) ?? {})}>
            {([key, value]) => (
              <VariableContext.Provider value={{
                ...parentContext,
                [props.keyAs]: key,
                [props.valueAs]: `${value}`,
              }}>
                <props.fallback>
                  {props.children}
                </props.fallback>
              </VariableContext.Provider>
            )}
          </For>
        )
    }
  })()}</>
}

export default main
