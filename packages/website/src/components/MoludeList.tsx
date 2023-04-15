import type { Component } from 'solid-js'
import { Show } from 'solid-js'
import ModuleList from '~/lib/ModuleList'
import Error from '~/lib/Error'
import docsStore from '~/stores/docsStore'

const Main: Component = () => (
  <Show
    when={docsStore.index()}
    fallback={<Error>Module index not loaded</Error>}
    keyed
  >
    {option => option.success
      ? <ModuleList map={option.value} />
      : <Error>Error loading index</Error>
    }
  </Show>
)

export default Main
