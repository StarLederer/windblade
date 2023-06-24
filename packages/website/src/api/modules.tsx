import type { Module, ModuleId, ModuleMeta } from './modules/types'
import type { Option } from './core'
import moduleDefs from './modules/data'

export function getIndex(): Option<Map<ModuleId, ModuleMeta>, string> {
  try {
    const value = new Map()
    Object.entries(moduleDefs).forEach(([id, def]) => {
      value.set(id, def.meta)
    })
    return {
      success: true,
      value,
    }
  }
  catch (err) {
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}

export async function get(id: ModuleId): Promise<Option<Module, string>> {
  try {
    const def = moduleDefs[id]
    return {
      success: true,
      value: {
        meta: def.meta,
        docs: await def.loadDocs(),
      },
    }
  }
  catch (err) {
    return {
      success: false,
      error: `${err}`,
    }
  }
}

export * from './modules/types'
