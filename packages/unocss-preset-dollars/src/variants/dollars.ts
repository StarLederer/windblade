import type { Variant } from '@unocss/core'
import type { Theme } from '@windblade/core'
import type { DollarGetter } from '..'

export function resolveDollars(expr: string, theme: Theme, getter: DollarGetter): string {
  let resolved = expr

  // Resolve variables
  getter(theme).forEach(([name, value]) => {
    resolved = resolved.replaceAll(`$${name}`, value.toString())
  })

  // Resolve expressions
  while (resolved.includes('$(')) {
    const start = resolved.indexOf('$') + 1
    const rest = resolved.substring(start)

    // Isolate expression
    const parenStart = 0
    let parenEnd = parenStart
    let open = 0
    for (let i = 0; i < rest.length; ++i) {
      if (rest[i] === '(')
        ++open
      if (rest[i] === ')')
        --open

      if (open === 0) {
        parenEnd = i + 1
        break
      }
    }
    const parenExpr = rest.substring(parenStart, parenEnd)

    // Evaluate and resolve
    try {
      // eslint-disable-next-line no-new-func
      resolved = resolved.replace(`$${parenExpr}`, Function(`'use strict'; return (${parenExpr})`)())
    }
    catch (_) {
      // bail if someting goes wrong and return original expression completely unresolved
      return expr
    }
  }

  return resolved
}

function createVariant(getter: DollarGetter): Variant<Theme> {
  return (matcher, { theme }) => {
    return {
      matcher: resolveDollars(matcher, theme, getter),
    }
  }
}

export default createVariant
