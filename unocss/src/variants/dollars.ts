import { Variant } from "@unocss/core";
import { Theme } from "../theme";

export const resolveDollars = (expr: string, theme: Theme): string => {
  let resolved = expr;

  // Resolve variables
  Object.entries(theme.windblade.proportions).forEach(([name, value]) => {
    resolved = resolved.replaceAll(`$${name}`, value.toString());
  });

  // Resolve expressions
  while (resolved.includes('$(')) {
    let start = resolved.indexOf('$') + 1;
    let rest = resolved.substring(start);

    // Isolate expression
    let parenStart = 0;
    let parenEnd = parenStart;
    let open = 0;
    for (let i = 0; i < rest.length; ++i) {
      if (rest[i] === '(') ++open;
      if (rest[i] === ')') --open;

      if (open === 0) {
        parenEnd = i + 1;
        break;
      }
    }
    const parenExpr = rest.substring(parenStart, parenEnd);

    // Evaluate and resolve
    try {
      resolved = resolved.replace(`$${parenExpr}`, Function(`'use strict'; return (${parenExpr})`)());
    } catch (_) {
      // bail if someting goes wrong and return original expression completely unresolved
      return expr;
    }
  }

  return resolved;
};

const main: Variant<Theme> = (matcher, ctx) => {
  return {
    matcher: resolveDollars(matcher, ctx.theme),
  }
};

export default main;
