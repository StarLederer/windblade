import type { JSXElement } from 'solid-js'
import { createEffect, createSignal, on } from 'solid-js'

function Main<K, V>(props: {
  each: Map<K, V>
  children: (entry: [ K, V ]) => JSXElement
}) {
  const [children, setChildren] = createSignal<JSXElement[]>([])

  createEffect(on(() => props.each, () => {
    const nextChildren: JSXElement = []
    props.each.forEach((value, key) => {
      nextChildren.push(props.children([key, value]))
    })
    setChildren(nextChildren)
  }))

  return () => children
}

export default Main
