import type { Component } from 'solid-js'
import Root from './router'
import themeStore from '~/stores/themeStore'
import docsStore from '~/stores/docsStore'

const Main: Component = () => {
  docsStore.fetchIndex()
  const themeStyles = () => `scheme-${themeStore.scheme()}-${themeStore.hue()}`

  return (
    <div class={`${themeStyles()} size-i-full size-b-full relative bg-normal-3 text-fg-2 overflow-hidden animate-in animation-duration-m.4`}>
      <Root />
    </div>
  )
}

export default Main
