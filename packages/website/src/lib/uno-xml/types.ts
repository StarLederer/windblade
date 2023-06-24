import { createContext, useContext } from 'solid-js'
import type { Component, JSXElement } from 'solid-js'
import type { Content, Root } from 'xast-util-from-xml/lib'

// Old (components)

export type XmlRootComponent<P = {}> = Component<P & Root>

export type XmlComponent<P = {}> = Component<P & Content>

// New (render functions)

export type XmlNodeRenderer = (node: Content, i: number) => JSXElement

export const XmlContext = createContext<XmlNodeRenderer[]>([])

export const useXmlContext = () => useContext(XmlContext) ?? {}

export const XmlContextProvider = () => XmlContext.Provider

export function extendXmlContext(extension: XmlNodeRenderer[]): XmlNodeRenderer[] {
  return [
    ...useXmlContext(),
    ...extension,
  ]
}
