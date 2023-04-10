import type { Component } from 'solid-js'
import { For } from 'solid-js'
import { LocalLink } from '~/lib/rotuer'
import modules from '~/lib/modules'
import docsStore from '~/stores/docsStore'

const Main: Component = () => (<>
  <ul class="size-i-full list-none grid grid-fit-cols-m gap-s">
    <For each={modules}>
      {mdle => (
        <li>
          <LocalLink style="none" class="size-b-full transition bg-accent-4 text-fg-3 border border-color-surface p-m.2 gap-m.2 rounded-m.2 flex flex-col justify-between" href="/docs"
            onClick={async () => {
              docsStore.setDocs(await mdle.loadDocs())
              docsStore.setName(await mdle.name)
            }}
          >
            <div class="text-m.2">{mdle.icon}</div>
            <div class="flex flex-col gap-s">
              <div class="flex flex-col gap-s.4">
                <h3 class="text-m.2 font-bold text-fg-2">{mdle.name}</h3>
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
