import type { Component } from 'solid-js'
import ShadowDom from '~/lib/ShadowDom'
import themeStore from '~/stores/themeStore'

const Main: Component<{
  class?: string
  rootStyle?: string
  html: string
  css: string
}> = (props) => {
  return <ShadowDom class={props.class} innerHTML={`
    <div
      id="root"
      class="${themeStore.scheme() === 'dark' ? 'scheme-dark-276' : 'scheme-light-296'}"
      style="${props.rootStyle}"
    >
      <style>${props.css.replaceAll(':root', ':where(#root)')}</style>
      ${props.html}
    </div>
  `} />
}

export default Main
