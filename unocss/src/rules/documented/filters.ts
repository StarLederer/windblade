import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "../../docs/types";

export const dropShadow = (): DocumentedRuleGroup => {
  const docs: DocumentedRuleGroupDocs = {
    title: "Drop shadow",
    description: "Drop shadows are removed for now because Tailwinds implementation is too limiting. Discussion in progress.",
    utilities: [],
  };

  return { rules: [], docs };
};
