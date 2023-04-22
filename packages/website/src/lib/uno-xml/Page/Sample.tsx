import type { Component } from 'solid-js'
import { useContext } from 'solid-js'
import VariableContext from '~/lib/uno-xml/XmlVariables'

const main: Component<{
  var: string
}> = (props) => {
  const vars = useContext(VariableContext)

  return `${vars?.[props.var]}`
}

export default main
