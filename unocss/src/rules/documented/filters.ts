import { DocumentationCategory, DocumentedRuleGroup, DocumentedRuleGroupDocs } from "../../docs/types";

export const dropShadow = (): DocumentedRuleGroup => {
  const docs: DocumentedRuleGroupDocs = {
    description: "Drop shadows are removed for now because Tailwind's implementation is too limiting. Discussion in progress.",
    utilities: [],
  };

  return { rules: [], docs };
};

const category: DocumentationCategory = new Map([
  ["Drop Shadow", dropShadow()],
]);

export default category;
