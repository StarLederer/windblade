import type { Preset, PresetOptions } from '@unocss/core'
import type { Theme, WindbladeTheme } from '@windblade/core'
import { theme, themes } from '@windblade/core'
import merge from 'ts-deepmerge'
import presetColor, { theme as colorTheme } from '@windblade/unocss-preset-color'
import presetDollars from '@windblade/unocss-preset-dollars'
import rules from './rules'
import preflights from './preflights'

export interface WindbladeOptions extends PresetOptions {
  theme?: WindbladeTheme
}

function main(options: WindbladeOptions = {}): Preset<Theme> {
  options.theme = options.theme ?? 'windblade'

  // Create presets that we inherit
  const pColor = presetColor()
  const pDollars = presetDollars()

  return {
    name: '@windblade/unocss-preset',
    theme: merge(
      theme,
      colorTheme,
      themes[options.theme],
    ) as Theme,
    rules: [
      ...pColor.rules ?? [],
      ...pDollars.rules ?? [],
      ...rules,
    ],
    variants: [
      ...pColor.variants ?? [],
      ...pDollars.variants ?? [],
    ],
    options: {
      ...pColor.options,
      ...pDollars.options,
      ...options,
    },
    postprocess: [],
    preflights: [
      ...pColor.preflights ?? [],
      ...pDollars.preflights ?? [],
      ...preflights,
    ],
    prefix: undefined,
    shortcuts: [],
  }
}

export default main
export * as docs from './docs'
