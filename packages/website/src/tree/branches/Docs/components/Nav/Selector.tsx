import type { Component } from 'solid-js'
import { For } from 'solid-js'
import { getUid } from '~/lib/uid'
import Select from '~/lib/Select'
import docsStore from '~/stores/docsStore'
import modules from '~/lib/modules'

const Main: Component = () => {
  const id = getUid()
  return (
    <form class="relative">
      <label for={id} class="absolute text-fg-3 inset-i-s inset-bs-s pointer-events-none">Module:</label>
      <Select
        id={id}
        class="p-bs-m.2 p-s rounded-s cursor-pointer bg-accent-4 hover:bg-accent-3 font-semibold"
        onChange={async (e) => {
          docsStore.setDocs(await modules.find(item => item.name === (e.target as HTMLSelectElement).value)?.loadDocs())
        }}>
        <For each={modules}>
          {mdle => <option value={mdle.name} selected={mdle.name === docsStore.name()}>{mdle.name}</option>}
        </For>
      </Select>
    </form>
  )
}

export default Main
