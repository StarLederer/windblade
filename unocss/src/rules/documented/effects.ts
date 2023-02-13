import { Rule } from "@unocss/core";
import Theme from "../../theme/Theme";
import * as size from "../sizes";
import { DocumentationCategory, DocumentedRuleGroup, DocumentedRuleGroupDocs } from "../../docs/types";

export const boxShadow = (): DocumentedRuleGroup => {
  const docs: DocumentedRuleGroupDocs = {
    description: "Box shadows are removed for now because Tailwind's implementation is too limiting. Discussion in progress.",
    utilities: [],
  };

  return { rules: [], docs };
};

export const opacity = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [size.rule('opacity', 'opacity', { defaultUnit: '' })];

  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade uses proportions instead of separete values.",
    utilities: [],
  };

  return { rules, docs };
};

const category: DocumentationCategory = new Map([
  ["Box Shadow", boxShadow()],
  ["Opacity", opacity()],
]);

export default category;
