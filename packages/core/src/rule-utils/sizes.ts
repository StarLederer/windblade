import type { DynamicRule } from '@unocss/core'
import { handler as h } from '@unocss/preset-mini/utils'
import type { Theme } from '../theme'
import * as logical from './logicalSet'

export function resolve(value: string, theme: Theme, unit: string) {
  // Try to resolve proportion
  const token = theme.windblade?.proportions[value]
  if (token !== undefined)
    return `${token}${unit}`

  // Try to resolve miscSize
  const misc = theme.windblade?.miscSizes?.[value]
  if (misc !== undefined)
    return `${misc}`

  // Try resolving value as a number
  if (!Number.isNaN(Number(value)))
    return `${value}${unit}`

  return undefined
}

export function rule(prefix: string,
  property: string,
  options?: {
    defaultUnit?: string
    postprocess?: (size: string) => string
  },
): DynamicRule<Theme> {
  return [
    new RegExp(`^${prefix}-(.+)$`),
    ([_, value], { theme }) => {
      const unit = options?.defaultUnit ?? 'rem'

      // Try bracket
      const unbracket = (h.bracket(value))
      if (unbracket !== undefined) {
        // return early
        // we do not apply postprocess to brackets
        return { [property]: unbracket }
      }

      // Not a bracket, let's try to resolve
      let resolvedValue = resolve(value, theme, unit)

      // Failed to resolve
      if (resolvedValue === undefined)
        return undefined

      // If we got here resolution must have succeeded,
      // let's apply the postprocess now
      if (options?.postprocess)
        resolvedValue = options.postprocess(resolvedValue)

      return { [property]: resolvedValue }
    },
  ]
}

export function axisRules(prefix: string, postfix: string, propertyPrefix: string, propertyPostfix: string) {
  return logical.axisRules(prefix, postfix, propertyPrefix, propertyPostfix, rule)
}

export function edgeRules(prefix: string, postfix: string, propertyPrefix: string, propertyPostfix: string) {
  return logical.edgeRules(prefix, postfix, propertyPrefix, propertyPostfix, rule)
}

export function cornerRules(prefix: string, postfix: string, propertyPrefix: string, propertyPostfix: string) {
  return logical.cornerRules(prefix, postfix, propertyPrefix, propertyPostfix, rule)
}
