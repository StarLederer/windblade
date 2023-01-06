import type { Rule } from "@unocss/core";
import { ITheme } from "../theme/types";

const join = (arr: Array<any>) => (arr.filter(Boolean).join("-"));

const logicalRuleSet = (
  prefix: string,
  postfix: string | undefined,
  propertyPrefix: string,
  propertyPostfix: string | undefined,
  rule: (prefix: string, property: string) => Rule<ITheme>
) => ([
  rule(join([prefix, postfix]), join([propertyPrefix, propertyPostfix])),
  rule(join([prefix, "b", postfix]), join([propertyPrefix, "block", propertyPostfix])),
  rule(join([prefix, "i", postfix]), join([propertyPrefix, "inline", propertyPostfix])),
]);

const logicalRuleSetFull = (
  prefix: string,
  postfix: string | undefined,
  propertyPrefix: string,
  propertyPostfix: string | undefined,
  rule: (prefix: string, property: string) => Rule<ITheme>
) => ([
  rule(join([prefix, postfix]), join([propertyPrefix, propertyPostfix])),
  rule(join([prefix, "b", postfix]), join([propertyPrefix, "block", propertyPostfix])),
  rule(join([prefix, "bs", postfix]), join([propertyPrefix, "block-start", propertyPostfix])),
  rule(join([prefix, "be", postfix]), join([propertyPrefix, "block-end", propertyPostfix])),
  rule(join([prefix, "i", postfix]), join([propertyPrefix, "inline", propertyPostfix])),
  rule(join([prefix, "is", postfix]), join([propertyPrefix, "inline-start", propertyPostfix])),
  rule(join([prefix, "ie", postfix]), join([propertyPrefix, "inline-end", propertyPostfix])),
]);

export {
  logicalRuleSet,
  logicalRuleSetFull
};
