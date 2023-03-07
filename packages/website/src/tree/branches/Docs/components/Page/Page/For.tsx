import { For, useContext } from 'solid-js'
import type { Element } from 'xast-util-from-xml/lib'
import type { XmlComponent } from '../XmlComponent'
import VariableContext, { applyVars } from '../XmlVariables'
import Error from '../Error'
import XmlElement from '../XmlElement'
import uno from '~/unocss'

const navigateUnoConfig = (path: string) => {
  let destination: any = uno.config
  path.split('.').forEach(node => destination = destination[node])
  return destination
}

const main: XmlComponent<Element> = (props) => {
  const parentContext = useContext(VariableContext)

  const noAttrs = '\'for\' requires an \'array\' or \'object\' attribute'
  const noValue = '\'for\' requires a \'value-as\' attribute'
  const noKey = '\'for\' with an \'object\' attribute requires a \'key-as\' attribute'

  const attrs = props.attributes
  if (!attrs)
    return <Error>{noAttrs}</Error>

  if (attrs.array) {
    if (!attrs.as)
      return <Error>{noValue}</Error>

    return <For each={navigateUnoConfig(applyVars(attrs.array))}>
      {value => (
        <VariableContext.Provider value={{ ...parentContext, value }}>
          <XmlElement {...props} />
        </VariableContext.Provider>
      )}
    </For>
  }

  if (attrs.object) {
    const valueAs = attrs['value-as']
    if (!valueAs)
      return <Error>{noValue}</Error>

    const keyAs = attrs['key-as']
    if (!keyAs)
      return <Error>{noKey}</Error>

    return <For each={Object.entries(navigateUnoConfig(applyVars(attrs.object)) ?? {})}>
      {([key, value]) => (
        <VariableContext.Provider value={{
          ...parentContext,
          [keyAs]: key,
          [valueAs]: `${value}`,
        }}>
          <XmlElement {...props} />
        </VariableContext.Provider>
      )}
    </For>
  }

  return <Error>{noAttrs}</Error>
}

export default main
