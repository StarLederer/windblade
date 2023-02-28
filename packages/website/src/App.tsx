import type { Component } from 'solid-js'
import themeStore from '~/stores/themeStore'
import Root from '~/tree/Root'

const Main: Component = () => {
  const themeStyles = () => `${themeStore.scheme() === 'light' ? 'scheme-light' : 'scheme-dark'}-${themeStore.hue()}`

  return (
    <div class={`${themeStyles()} size-i-full size-b-full relative bg-normal-3 text-fg-2 overflow-hidden`}>
      <Root />
    </div>
  )
}

export default Main
