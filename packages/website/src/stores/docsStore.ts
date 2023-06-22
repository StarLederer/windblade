import { createRoot, createSignal } from 'solid-js'

import type { Module, ModuleId, ModuleMeta, Option } from '~/api'
import { get, getIndex } from '~/api'

function main() {
  const modules = new Map<ModuleId, Module>()

  const [index, setIndex] = createSignal<Option<Map<ModuleId, ModuleMeta>, string>>()

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

  const getCachedModuleById = (id: ModuleId): Option<Module, string> => {
    const cached = modules.get(id)

    if (cached) {
      return {
        success: true,
        value: cached,
      }
    }
    else {
      return {
        success: false,
        error: 'Not cached',
      }
    }
  }

  const fetchIndex = async () => {
    setIndex(getIndex())
  }

  return { index, fetchIndex, getModuleById, getCachedModuleById }
}

export default createRoot(main)
