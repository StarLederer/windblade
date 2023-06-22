import type { ParentComponent } from 'solid-js'
import themeStore from '~/stores/themeStore'

const main: ParentComponent = props => (
  <div class={`inline-block scheme-${themeStore.scheme()}-0 bg-surface p-s.4 p-i-s rounded-s text-fg-2 font-normal`}>
    <span class="text-fg-1 font-semibold">Error:</span> {props.children}
  </div>
)

export default main
