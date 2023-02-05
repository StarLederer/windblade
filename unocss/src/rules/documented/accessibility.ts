import { Rule } from "@unocss/core";
import { getThemeCSS } from "../../core";
import Theme from "../../theme/Theme";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "./types";

export const colorScheme = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    [
      new RegExp(`^(scheme-dark)$`),
      (match, { theme }) => (getThemeCSS(theme).dark)
    ],
    [
      new RegExp(`^(scheme-light)$`),
      (match, { theme }) => (getThemeCSS(theme).light)
    ],
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Color scheme",
    description: "Utilities for switching color scheme. Missing from Tailwind.",
    utilities: ["scheme-dark", "scheme-light"],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};
