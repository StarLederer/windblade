import type { Preset } from '@unocss/core'
import type { Theme } from '@windblade/core'
import theme from './theme'
import rules from './rules'

function main(options: {} = {}): Preset<Theme> {
  return {
    name: '@windblade/unocss-preset-color',
    theme,
    rules,
    options,
    prefix: undefined,
  }
}

export default main
export * as docs from './docs'
export { theme, rules }
