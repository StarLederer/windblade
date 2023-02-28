import type { Preset } from '@unocss/core'
import type { theme } from '@windblade/core'
import rules from './rules'

const main = (options: {} = {}): Preset<theme.Theme> => {
  return {
    name: '@windblade/unocss-preset-color',
    rules,
    options,
    prefix: undefined,
  }
}

export default main
export * as docs from './docs'
export { rules }
