import type { DynamicRule } from '@unocss/core'
import type Theme from '../theme/Theme'

function durationRule(prefix: string,
  property: string,
  value?: (size: string) => string,
): DynamicRule<Theme> {
  return [
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      if (!theme.windblade)
        return

      const css: any = {}
      const parameter = `${theme.windblade.proportions[match[2]] * theme.windblade.time.baseUnitMs}ms`
      if (parameter === undefined)
        return undefined
      css[property] = value?.(parameter) ?? parameter

      return css
    },
  ]
}

function timingFunctionRule(
  prefix: string,
  property: string,
): DynamicRule<Theme> {
  return [
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      if (!theme.windblade)
        return

      const css: any = {}
      const parameter = theme.windblade.time.functions[match[2]]
      if (parameter === undefined)
        return undefined
      css[property] = parameter
      return css
    },
  ]
}

export { durationRule, timingFunctionRule }
