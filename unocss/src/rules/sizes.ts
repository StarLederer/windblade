import { DynamicRule } from "@unocss/core";
import Theme from "../theme/Theme";
import * as logical from "./logicalSet";

const solve = (expr: string, theme: Theme, defaultUnit: string): string | undefined => {
  if (expr.startsWith("(")) {
    let resolved = expr;

    // Resolve
    Object.entries(theme.windblade.proportions).forEach(([name, value]) => {
      resolved = resolved.replaceAll(name, value.toString());
    });

    // Evaluate
    resolved = Function(`'use strict'; return (${resolved})`)()

    return `${resolved}${defaultUnit}`;
  } else {
    let token = theme.windblade.proportions[expr];
    let misc = theme.windblade.miscSizes[expr];
    if (token !== undefined) return `${token}${defaultUnit}`;
    else if (misc !== undefined) return `${misc}`;
  }

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
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      const css: any = {};
      let value = solve(match[2], theme, options?.defaultUnit ?? "rem");
      if (value === undefined) return undefined;

      if (options?.postprocess) {
        value = options.postprocess(value);
      }

      css[property] = value;
      return css;
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
