import { Rule } from "@unocss/core";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "unocss-docs";
import { theme } from "../../../core";
import * as size from "../../../core/rule-utils/sizes";

export const borderSpacing = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    size.rule('border-spacing', 'border-spacing'),
    // we are skiping border-spacing-b and borer-spacing-i for now beccause they are hard to implement
  ];

  const docs: DocumentedRuleGroupDocs = {
    description: "Changing border-spacing for individual axis is not possible at the moment.",
    utilities: ["border-spacing-<theme.windblade.proportions>"],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};
