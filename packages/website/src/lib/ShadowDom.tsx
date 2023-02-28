import type { Component } from 'solid-js'
import { createEffect, createSignal } from 'solid-js'

const Main: Component<{
  class?: string
  innerHTML: string
}> = (props) => {
  const [shadowRoot, setShadowRoot] = createSignal<ShadowRoot>()
  let previewContainer: HTMLDivElement | undefined

  // Keep shadowRoot in sync with container ref
  createEffect(() => {
    if (!previewContainer) {
      setShadowRoot(undefined)
      return
    }
    if (shadowRoot())
      return
    setShadowRoot(previewContainer.attachShadow({ mode: 'open' }))
  })

  // Keep shadow dom in sync with innerHTML prop
  createEffect(() => {
    const root = shadowRoot()
    if (!root)
      return
    root.innerHTML = props.innerHTML
  })

  return (
    <div class={props.class} ref={previewContainer} />
  )
}

export default Main
