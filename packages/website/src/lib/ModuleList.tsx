import type { Component } from 'solid-js'
import ModuleCard from './ModuleCard'
import For from './ForMap'
import type { ModuleId, ModuleMeta } from '~/api/modules/types'

const Main: Component<{
  map: Map<ModuleId, ModuleMeta>
  onInspect?: (id: ModuleId) => void
}> = props => (<>
  <ul class="size-i-full list-none grid grid-fit-cols-m gap-s">
    <For each={props.map}>
      {([id, meta]) => (
        <li>
          <ModuleCard href={`/docs/${id}`} meta={meta} onInspect={() => props.onInspect?.(id)}/>
        </li>
      )}
    </For>
  </ul>
</>)

export default Main
