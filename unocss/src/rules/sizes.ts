import { DynamicRule } from "@unocss/core";
import { handler as h, variantGetParameter } from '@unocss/preset-mini/utils';
import Theme from "../theme/Theme";
import * as logical from "./logicalSet";

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
    resolved = resolved.replace(`$${parenExpr}`, Function(`'use strict'; return (${parenExpr})`)());
  }

  return resolved;
};

const solve = (expr: string, theme: Theme, defaultUnit: string): string | undefined => {
  // Try to resolve proportion
  let token = theme.windblade.proportions[expr];
  if (token !== undefined) return `${token}${defaultUnit}`;

  // Try to resolve miscSize
  let misc = theme.windblade.miscSizes?.[expr];
  if (misc !== undefined) return `${misc}`;

  // Resolve
  const resolved = resolveDollars(expr, theme);

  const unbracket = (h.bracket(resolved));
  if (unbracket !== undefined) return unbracket;

  if (!Number.isNaN(Number(resolved))) return `${resolved}${defaultUnit}`;

  return undefined;
};

const rule = (
  prefix: string,
  property: string,
  options?: {
    defaultUnit?: string,
    postprocess?: (size: string) => string,
  },
): DynamicRule<Theme> => {
  return [
    new RegExp(`^${prefix}-(.+)$`),
    (match, { theme }) => {
      let value = solve(match[1], theme, options?.defaultUnit ?? "rem");
      if (value === undefined) return undefined;

      if (options?.postprocess) {
        value = options.postprocess(value);
      }

      return { [property]: value };
    }
  ];
};

const axisRules = (prefix: string, postfix: string, propertyPrefix: string, propertyPostfix: string) => (
  logical.axisRules(prefix, postfix, propertyPrefix, propertyPostfix, rule)
);

const edgeRules = (prefix: string, postfix: string, propertyPrefix: string, propertyPostfix: string) => (
  logical.edgeRules(prefix, postfix, propertyPrefix, propertyPostfix, rule)
);

const cornerRules = (prefix: string, postfix: string, propertyPrefix: string, propertyPostfix: string) => (
  logical.cornerRules(prefix, postfix, propertyPrefix, propertyPostfix, rule)
);

export { solve, rule, axisRules, edgeRules, cornerRules };
