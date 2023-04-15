import { createRoot, createSignal } from 'solid-js'

import type { Module, ModuleId, ModuleMeta, Option } from '~/api'
import { get, getIndex } from '~/api'

function main() {
  const modules = new Map<ModuleId, Module>()

  const [index, setIndex] = createSignal<Option<Map<ModuleId, ModuleMeta>, string>>()
  const [module, setModule] = createSignal<Option<Module, string>>()
  const [moduleId, setModuleId] = createSignal<ModuleId>()

  const getModuleById = async (id: ModuleId): Promise<Option<Module, string>> => {
    const cached = modules.get(id)

    if (cached) {
      return {
        success: true,
        value: cached,
      }
    }
    else {
      const mdle = await get(id)

      if (mdle.success)
        modules.set(id, mdle.value)

      return mdle
    }
  }

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

  return { index, fetchIndex, module, moduleId, fetchModule, getModuleById }
}

export default createRoot(main)
