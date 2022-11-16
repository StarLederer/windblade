import { DynamicRule } from "@unocss/core";
import { ITheme } from "../theme/types";
import logicalRuleSet from "./logicalSet";

const sizeRule = (prefix: string, property: string): DynamicRule<ITheme> => {
  return [
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      const css = {};
      css[property] = theme.wrapp.sizes[match[2]]
      return css;
    }
  ];
};

const logicalSizeSet = (prefix: string, postfix: string, propertyPrefix: string, propertyPostfix: string) => (
  logicalRuleSet(prefix, postfix, propertyPrefix, propertyPostfix, sizeRule)
);

export { sizeRule, logicalSizeSet };
