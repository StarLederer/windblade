import type { Component } from 'solid-js'
import Root from './tree/Root'
import themeStore from '~/stores/themeStore'
const Main: Component = () => {
  const themeStyles = () => `${themeStore.scheme() === 'light' ? 'scheme-light' : 'scheme-dark'} scheme-auto-${themeStore.hue()}`

  return (
    <div class={`${themeStyles()} size-i-full size-b-full relative bg-normal-3 text-fg-2 overflow-hidden animate-in animation-duration-m.4`}>
      <Root />
    </div>
  )
}

export default Main
