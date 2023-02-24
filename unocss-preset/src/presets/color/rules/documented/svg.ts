import { Rule } from "@unocss/core";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "unocss-docs";
import { theme } from "../../../core";
import * as color from "../../../core/rule-utils/colors";

export const fill = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    color.colorRule('fill', 'fill'),
    color.fgColorRule('fill-fg', 'fill'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade uses semantic colors.",
    utilities: [
      "fill-<theme.windblade.colors>",
      "fill-<theme.windblade.miscColors>",
      "fill-fg-<integer>",
    ],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const stroke = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    color.colorRule('stroke', 'stroke'),
    color.fgColorRule('stroke-fg', 'stroke'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade uses semantic colors.",
    utilities: [
      "stroke-<theme.windblade.colors>",
      "stroke-<theme.windblade.miscColors>",
      "stroke-fg-<integer>",
    ],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};
