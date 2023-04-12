import material3 from './material3'
import tailwind from './tailwind'
import windblade from './windblade'

export const themes = {
  none: {},
  material3,
  tailwind,
  windblade,
} as const

export type WindbladeTheme = keyof typeof themes
