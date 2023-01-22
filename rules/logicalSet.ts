import type { Rule } from "@unocss/core";
import Theme from "../theme/Theme";

const join = (arr: Array<any>) => (arr.filter(Boolean).join("-"));

const axisRules = (
  prefix: string,
  postfix: string | undefined,
  propertyPrefix: string,
  propertyPostfix: string | undefined,
  rule: (prefix: string, property: string) => Rule<Theme>
) => ([
  rule(join([prefix, postfix]), join([propertyPrefix, propertyPostfix])),
  rule(join([prefix, "b", postfix]), join([propertyPrefix, "block", propertyPostfix])),
  rule(join([prefix, "i", postfix]), join([propertyPrefix, "inline", propertyPostfix])),
]);

const edgeRules = (
  prefix: string,
  postfix: string | undefined,
  propertyPrefix: string,
  propertyPostfix: string | undefined,
  rule: (prefix: string, property: string) => Rule<Theme>
) => ([
  rule(join([prefix, postfix]), join([propertyPrefix, propertyPostfix])),
  rule(join([prefix, "b", postfix]), join([propertyPrefix, "block", propertyPostfix])),
  rule(join([prefix, "bs", postfix]), join([propertyPrefix, "block-start", propertyPostfix])),
  rule(join([prefix, "be", postfix]), join([propertyPrefix, "block-end", propertyPostfix])),
  rule(join([prefix, "i", postfix]), join([propertyPrefix, "inline", propertyPostfix])),
  rule(join([prefix, "is", postfix]), join([propertyPrefix, "inline-start", propertyPostfix])),
  rule(join([prefix, "ie", postfix]), join([propertyPrefix, "inline-end", propertyPostfix])),
]);

const cornerRules = (
  prefix: string,
  postfix: string | undefined,
  propertyPrefix: string,
  propertyPostfix: string | undefined,
  rule: (prefix: string, property: string) => Rule<Theme>
) => ([
  rule(join([prefix, postfix]), join([propertyPrefix, propertyPostfix])),
  rule(join([prefix, "ss", postfix]), join([propertyPrefix, "start-start", propertyPostfix])),
  rule(join([prefix, "se", postfix]), join([propertyPrefix, "start-end", propertyPostfix])),
  rule(join([prefix, "ee", postfix]), join([propertyPrefix, "end-end", propertyPostfix])),
  rule(join([prefix, "es", postfix]), join([propertyPrefix, "end-start", propertyPostfix])),
]);

export {
  axisRules,
  edgeRules,
  cornerRules,
};
