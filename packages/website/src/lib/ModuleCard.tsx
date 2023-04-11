import type { Component } from 'solid-js'
import { LocalLink } from './rotuer'
import type { ModuleMeta } from '~/api'

const Main: Component<{
  meta: ModuleMeta
  href: string
  onInspect?: () => void
}> = props => (
  <LocalLink
    style="none"
    class="size-b-full transition bg-accent-4 text-fg-3 border border-color-surface p-m.2 gap-m.2 rounded-m.2 flex flex-col justify-between"
    href={props.href}
    onClick={props.onInspect}
  >
    {/* <div class="text-m.2">{props.meta.icon}</div> */}
    <div class="flex flex-col gap-s">
      <div class="flex flex-col gap-s.4">
        <h3 class="text-m.2 font-bold text-fg-2">{props.meta.title}</h3>
        <p class="leading-$($s+$s.2)">{props.meta.description}</p>
      </div>
    </div>
  </LocalLink>
)

export default Main
