import { Rule } from "@unocss/core";
import { objectEntries } from "ts-extras"
import Theme from "../../theme/Theme";
import * as logical from "../logicalSet";
import * as size from "../sizes";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "../../docs/types";

export const borderSpacing = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    size.rule('border-spacing', 'border-spacing'),
    // we are skiping border-spacing-b and borer-spacing-i for now beccause they are hard to implement
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Border spacing",
    description: "Changing border-spacing for individual axis is not possible at the moment.",
    utilities: ["border-spacing-<theme.windblade.proportions>"],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};
