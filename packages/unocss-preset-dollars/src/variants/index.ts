import type { Variant } from '@unocss/core'
import type { Theme } from '@windblade/core'
import type { DollarGetter } from '..'
import createVariantDollars from './dollars'

export function createVariants(dolarGetter: DollarGetter): Variant<Theme>[] {
  return [
    createVariantDollars(dolarGetter),
  ]
}

export { createVariantDollars }
