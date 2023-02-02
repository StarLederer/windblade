import { Rule } from "@unocss/core";
import Theme from "../../theme/Theme";

export type DocumentedRuleGroupDocs = {
  title: string;
  description: string;
  utilities: string[];
};

export type DocumentedRuleGroup = {
  rules: Rule<Theme>[];
  docs: DocumentedRuleGroupDocs;
};
