import type { Rule } from "@unocss/core";
import { ITheme } from "../theme/types";

const logicalRuleSet = (
  prefix: string,
  postfix: string,
  propertyPrefix: string,
  propertyPostfix: string,
  rule: (prefix: string, property: string) => Rule<ITheme>
) => ([
  rule(prefix, propertyPrefix),
  rule(`${prefix}-b-${postfix}`, `${propertyPrefix}-block-${propertyPostfix}`),
  rule(`${prefix}-bs-${postfix}`, `${propertyPrefix}-block-start-${propertyPostfix}`),
  rule(`${prefix}-be-${postfix}`, `${propertyPrefix}-block-end-${propertyPostfix}`),
  rule(`${prefix}-i-${postfix}`, `${propertyPrefix}-inline-${propertyPostfix}`),
  rule(`${prefix}-is-${postfix}`, `${propertyPrefix}-inline-start-${propertyPostfix}`),
  rule(`${prefix}-ie-${postfix}`, `${propertyPrefix}-inline-end-${propertyPostfix}`),
]);

export default logicalRuleSet;
