import { createRoot, createSignal } from 'solid-js'

import type { Module, ModuleId, ModuleMeta, Option } from '~/api'
import { get, getIndex } from '~/api'

function main() {
  const [index, setIndex] = createSignal<Option<Map<ModuleId, ModuleMeta>, string>>()
  const [module, setModule] = createSignal<Option<Module, string>>()
  const [moduleId, setModuleId] = createSignal<ModuleId>()

  const fetchIndex = async () => {
    setIndex(getIndex())
  }

  const fetchModule = async (id: ModuleId) => {
    if (id === moduleId())
      return

    setModuleId(id)
    setModule(undefined)
    setModule(await get(id))
  }

  return { index, fetchIndex, module, moduleId, fetchModule }
}

export default createRoot(main)
