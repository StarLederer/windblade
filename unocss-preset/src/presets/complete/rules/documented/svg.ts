import { Rule } from "@unocss/core";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "unocss-docs";
import { theme } from "../../../core";
import * as size from "../../../core/rule-utils/sizes";

export const strokeWidth = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [size.rule('stroke', 'stroke-width')];

  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade proportions are used instead of separate size values.",
    utilities: ["stroke-<theme.windblade.proportions>"],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};
