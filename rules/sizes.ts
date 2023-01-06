import { DynamicRule } from "@unocss/core";
import { ITheme } from "../theme/types";
import { logicalRuleSetFull } from "./logicalSet";

const sizeRule = (prefix: string, property: string, value?: (size: string) => string): DynamicRule<ITheme> => {
  return [
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      const css = {};
      css[property] = value?.(theme.wrapp.sizes[match[2]]) ?? theme.wrapp.sizes[match[2]];
      return css;
    }
  ];
};

const logicalSizeSet = (prefix: string, postfix: string, propertyPrefix: string, propertyPostfix: string) => (
  logicalRuleSetFull(prefix, postfix, propertyPrefix, propertyPostfix, sizeRule)
);

export { sizeRule, logicalSizeSet };
