import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import For from '~/lib/ForMap'
import { getUid } from '~/lib/uid'
import Select from '~/lib/Select'
import Error from '~/lib/Error'
import docsStore from '~/stores/docsStore'
import type { ModuleId, ModuleMeta } from '~/api'

const Form: Component<{
  index: Map<string, ModuleMeta>
}> = (props) => {
  const id = getUid()

  return (
    <form class="relative">
      <label for={id} class="absolute text-fg-3 inset-i-s inset-bs-s pointer-events-none">Module:</label>
      <Select
        id={id}
        class="p-bs-m.2 p-s rounded-s cursor-pointer bg-accent-4 hover:bg-accent-3 font-semibold"
        onChange={(e) => {
          docsStore.fetchModule((e.target as HTMLSelectElement).value as ModuleId)
        }}
      >
        <option selected disabled value="">select</option>
        <For each={props.index}>
          {([id, meta]) => (
            <option value={id} selected={docsStore.moduleId() === id}>
              {meta.title}
            </option>
          )}
        </For>
      </Select>
    </form>
  )
}

const Main: Component = () => (
  <Show
    when={docsStore.index()}
    fallback={<Error>Index not loaded</Error>}
    keyed
  >
    {option => option.success
      ? <Form index={option.value} />
      : <Error>Error loading index</Error>
    }
  </Show>
)

export default Main
