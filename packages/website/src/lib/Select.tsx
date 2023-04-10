import type { ParentComponent } from 'solid-js'

const Main: ParentComponent<{
  id?: string
  class?: string
  onChange: (e: Event) => void
}> = props => (
  <div class="relative">
    <select {...props} class={`${props.class} transition size-i-full appearance-none p-s p-ie-$($s*3) hover:highlight active:highlight+`} onChange={props.onChange}>
      {props.children}
    </select>
    <div class="i-mdi-unfold-more-horizontal absolute inset-ie-s inset-b-0 m-auto pointer-events-none" />
  </div>
)

export default Main
