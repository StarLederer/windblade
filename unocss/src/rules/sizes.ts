import { DynamicRule } from "@unocss/core";
import { handler as h } from '@unocss/preset-mini/utils';
import Theme from "../theme/Theme";
import * as logical from "./logicalSet";

const resolve = (expr: string, theme: Theme, defaultUnit: string): string | undefined => {
  // Try to resolve proportion
  let token = theme.windblade.proportions[expr];
  if (token !== undefined) return `${token}${defaultUnit}`;

  // Try to resolve miscSize
  let misc = theme.windblade.miscSizes?.[expr];
  if (misc !== undefined) return `${misc}`;

  const unbracket = (h.bracket(expr));
  if (unbracket !== undefined) return unbracket;

  if (!Number.isNaN(Number(expr))) return `${expr}${defaultUnit}`;

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
      let value = resolve(match[1], theme, options?.defaultUnit ?? "rem");
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

export { resolve, rule, axisRules, edgeRules, cornerRules };
