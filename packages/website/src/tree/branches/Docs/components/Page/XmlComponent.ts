import { createContext, useContext } from 'solid-js'
import type { Component } from 'solid-js'
import type { Content, Root } from 'xast-util-from-xml/lib'

export type XmlRootComponent<P = {}> = Component<P & Root>

export type XmlComponent<P = {}> = Component<P & Content>

export type AddonXmlComponent = Component<Content & {
  i: number
}>

export const XmlContext = createContext<AddonXmlComponent[]>([])

export const useXmlContext = () => useContext(XmlContext) ?? {}

export const XmlContextProvider = () => XmlContext.Provider

export const extendXmlContext = (extension: AddonXmlComponent[]): AddonXmlComponent[] => {
  return [
    ...useXmlContext(),
    ...extension,
  ]
}
