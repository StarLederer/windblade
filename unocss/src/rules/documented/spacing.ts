import { Rule } from "@unocss/core";
import Theme from "../../theme/Theme";
import * as logical from "../logicalSet";
import * as size from "../sizes";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "./types";

export const padding = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = size.edgeRules('p', '', 'padding', '');

  const docs: DocumentedRuleGroupDocs = {
    title: "Padding",
    description: "Replaced physical properties with logical.",
    utilities: [
      ...Object.keys(logical.abbreviations.axis),
      ...Object.keys(logical.abbreviations.edges),
    ].map((val) => `p-${val}-<theme.windblade.proportions>`),
    preview: (util) => `
      <div class="${util} rounded-s bg-accent">
        <div class="border border-dashed rounded-s p-s">${util}</div>
      </div>
    `,
  };

  return { rules, docs };
};

export const margin = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = size.edgeRules('m', '', 'margin', '');

  const docs: DocumentedRuleGroupDocs = {
    title: "Margin",
    description: "Replaced physical properties with logical.",
    utilities: [
      ...Object.keys(logical.abbreviations.axis),
      ...Object.keys(logical.abbreviations.edges),
    ].map((val) => `m-${val}-<theme.windblade.proportions>`),
    preview: (util) => `
      <div class="border border-dashed border-color-accent rounded-s">
        <div class="${util} p-s rounded-s bg-accent">${util}</div>
      </div>
    `,
  };

  return { rules, docs };
};

export const spaceBetween = (): DocumentedRuleGroup => {
  const docs: DocumentedRuleGroupDocs = {
    title: "Space between",
    description: "Removed this. Please use gap and flex/grid/columns instead",
    utilities: [],
  };

  return { rules: [], docs };
};
