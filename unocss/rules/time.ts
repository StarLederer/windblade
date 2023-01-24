import { DynamicRule } from "@unocss/core";
import Theme from "../theme/Theme";

const durationRule = (
  prefix: string,
  property: string,
  value?: (size: string) => string
): DynamicRule<Theme> => {
  return [
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      const css: any = {};
      let parameter = theme.windblade.sizes.tokens[match[2]] * theme.windblade.time.baseUnitMs + "ms";
      if (parameter === undefined) return undefined;
      css[property] = value?.(parameter) ?? parameter;
      return css;
    }
  ];
};

const timingFunctionRule = (
  prefix: string,
  property: string,
): DynamicRule<Theme> => {
  return [
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      const css: any = {};
      let parameter = theme.windblade.time.functions[match[2]];
      if (parameter === undefined) return undefined;
      css[property] = parameter;
      return css;
    }
  ];
};

export { durationRule, timingFunctionRule };
