import type { Component } from 'solid-js'
import { For } from 'solid-js'
import { LocalLink } from '~/lib/rotuer'
import docsStore, { modules } from '~/stores/docsStore'
import type { ModuleId } from '~/stores/docsStore/modules'

const Main: Component = () => (<>
  <ul class="size-i-full list-none grid grid-fit-cols-m gap-s">
    <For each={Object.entries(modules)}>
      {([id, mdle]) => (
        <li>
          <LocalLink
            style="none"
            class="size-b-full transition bg-accent-4 text-fg-3 border border-color-surface p-m.2 gap-m.2 rounded-m.2 flex flex-col justify-between"
            href="/docs"
            onClick={() => docsStore.fetchModule(id as ModuleId)}
          >
            <div class="text-m.2">{mdle.icon}</div>
            <div class="flex flex-col gap-s">
              <div class="flex flex-col gap-s.4">
                <h3 class="text-m.2 font-bold text-fg-2">{mdle.title}</h3>
                <p class="leading-$($s+$s.2)">{mdle.description}</p>
              </div>
            </div>
          </LocalLink>
        </li>
      )}
    </For>
  </ul>
</>)

export default Main
