import type { Component } from 'solid-js'
import { For } from 'solid-js'
import { getUid } from '~/lib/uid'
import Select from '~/lib/Select'
import docsStore, { modules } from '~/stores/docsStore'
import type { ModuleId } from '~/stores/docsStore/modules'

const Main: Component = () => {
  const id = getUid()
  return (
    <form class="relative">
      <label for={id} class="absolute text-fg-3 inset-i-s inset-bs-s pointer-events-none">Module:</label>
      <Select
        id={id}
        class="p-bs-m.2 p-s rounded-s cursor-pointer bg-accent-4 hover:bg-accent-3 font-semibold"
        onChange={e => docsStore.fetchModule((e.target as HTMLSelectElement).value as ModuleId)}
      >
        <option selected disabled value="">select</option>
        <For each={Object.entries(modules)}>
          {([id, mdle]) => <option value={id} selected={id === docsStore.module()?.id}>{mdle.title}</option>}
        </For>
      </Select>
    </form>
  )
}

export default Main
