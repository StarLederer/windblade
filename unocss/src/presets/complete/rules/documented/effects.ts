import { Rule } from "@unocss/core";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "unocss-docs";
import { theme } from "../../../core";
import * as size from "../../../core/rule-utils/sizes";

export const boxShadow = (): DocumentedRuleGroup<theme.Theme> => {
  const docs: DocumentedRuleGroupDocs = {
    description: "Box shadows are removed for now because Tailwind's implementation is too limiting. Discussion in progress.",
    utilities: [],
  };

  return { rules: [], docs };
};

export const opacity = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [size.rule('opacity', 'opacity', { defaultUnit: '' })];

  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade uses proportions instead of separete values.",
    utilities: [],
  };

  return { rules, docs };
};
