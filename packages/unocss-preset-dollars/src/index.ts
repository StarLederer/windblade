import type { Preset } from '@unocss/core'
import type { Theme } from '@windblade/core'
import variants from './variants'

function main(options: {} = {}): Preset<Theme> {
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
