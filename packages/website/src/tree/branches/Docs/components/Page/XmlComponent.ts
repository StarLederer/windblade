import type { Component } from 'solid-js'
import type { Content } from 'xast-util-from-xml/lib'

export type XmlComponent<P = {}> = Component<P & {
  children: Content[]
}>

export type AddonXmlComponent<P = {}> = XmlComponent<P & {
  fallback: XmlComponent
}>
