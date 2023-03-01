import type { Preset } from '@unocss/core'
import type { theme } from '@windblade/core'
import variants from './variants'

const main = (options: {} = {}): Preset<theme.Theme> => {
  return {
    name: '@windblade/unocss-preset-dollars',
    options,
    variants,
    prefix: undefined,
  }
}

export default main
export * as docs from './docs'
export { variants }