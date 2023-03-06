import { createContext, useContext } from 'solid-js'

const main = createContext<Record<string, string>>()

export const applyVars = (input: string): string => {
  let output = input
  const context = useContext(main) ?? {}
  Object.entries(context).forEach(([key, value]) => {
    output = output.replaceAll(key, value)
  })
  return input
}

export default main
