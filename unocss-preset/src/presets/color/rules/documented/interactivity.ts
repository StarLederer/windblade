import { Rule } from "@unocss/core";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "unocss-docs";
import { theme } from "../../../core";
import * as color from "../../../core/rule-utils/colors";

export const accentColor = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [color.colorRule('accent', 'accent-color')];

  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade uses semantic colors.",
    utilities: [
      "accent-<theme.windblade.colors>",
      "accent-<theme.windblade.miscColors>",
      "accent-fg-<integer>",
    ],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const caretColor = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    color.colorRule('caret', 'caret-color'),
    color.fgColorRule('caret-fg', 'caret-color'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade uses semantic colors.",
    utilities: [
      "caret-<theme.windblade.colors>",
      "caret-<theme.windblade.miscColors>",
      "caret-fg-<integer>",
    ],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};