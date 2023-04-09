import type { ParentComponent } from 'solid-js'

const Main: ParentComponent<{
  class?: string
  ref?: HTMLDivElement
}> = props => (
  <div class={`${props.class} absolute inset-0 size-i-full size-b-full overflow-auto`} ref={props.ref}>
    {props.children}
  </div>
)

export default Main
