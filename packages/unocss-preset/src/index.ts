import type { Preset, PresetOptions } from '@unocss/core'
import type { WindbladeTheme } from '@windblade/core'
import { theme, themes } from '@windblade/core'
import merge from 'ts-deepmerge'
import presetColor from '@windblade/unocss-preset-color'
import presetDollars from '@windblade/unocss-preset-dollars'
import rules from './rules'
import preflights from './preflights'

export interface WindbladeOptions extends PresetOptions {
  theme?: WindbladeTheme
}

const main = (options: WindbladeOptions = {}): Preset<theme.Theme> => {
  options.theme = options.theme ?? 'windblade'

  const mergedTheme = merge(theme.default, themes[options.theme]) as theme.Theme

  // Create presets that we inherit
  const pColor = presetColor()
  const pDollars = presetDollars()

  return {
    name: '@windblade/unocss-preset',
    theme: mergedTheme, // theme is unified so we don't merge themes
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
