import type { Preset, PresetOptions } from '@unocss/core'
import type { Theme } from '@windblade/core'
import { createVariants } from './variants'

export interface Stringifiable {
  toString: () => string
}
export type Dollar = [string, Stringifiable]
export type DollarGetter = (theme: Theme) => Dollar[]

export interface Options extends PresetOptions {
  /**
   * Getter of a 'name + value' tuple array that defines variable names and values that they represent.
   * These tuples are used at build time to replace `$<name>` with `$<value>` inside all utils.
   * Even if they are not from Windblade.
   *
   * @param theme
   * @returns array of name + value tuples.
   */
  getVariables?: DollarGetter
}

function main(options: Options = {}): Preset<Theme> {
  const dolarGetter: DollarGetter
    = options?.getVariables
    ?? (theme => theme.windblade?.proportions ? Object.entries(theme.windblade.proportions) : [])

  return {
    name: '@windblade/unocss-preset-dollars',
    options,
    variants: createVariants(dolarGetter),
    prefix: undefined,
  }
}

export default main
export * as docs from './docs'
export * from './variants'
