import { Rule } from "@unocss/core";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "unocss-docs";
import { theme } from "../../../core";
import * as size from "../../../core/rule-utils/sizes";

export const fontFamily = (): DocumentedRuleGroup<theme.Theme> => {
  const docs: DocumentedRuleGroupDocs = {
    description: "Font family utilities have been removed.",
    utilities: [],
  };

  return { rules: [], docs };
};

export const fontSize = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [size.rule('text', 'font-size')];

  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade proportions are used instead of separate size values.",
    utilities: ["text-<theme.windblade.proportions>"],
    preview: (util) => `<div class="${util}">Lorem ipsum<div>`,
  };

  return { rules, docs };
};

export const fontSmoothing = (): DocumentedRuleGroup<theme.Theme> => {
  const docs: DocumentedRuleGroupDocs = {
    description: "Font smoothing has been removed because Windblade sets it by default in preflight and it should never be changed. Plese open an issue if this is wrong.",
    utilities: [],
  };

  return { rules: [], docs };
};

export const tracking = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [size.rule('tracking', 'letter-spacing', { defaultUnit: 'em' })];

  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade proportions are used instead of separate size values.",
    utilities: ["tracking-<theme.windblade.proportions>"],
    preview: (util) => `<div class="${util}">Lorem ipsum<div>`,
  };

  return { rules, docs };
};

export const leading = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [size.rule('leading', 'line-height', { defaultUnit: '' })];

  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade proportions are used instead of separate size values. Setting line height in rem units is not possible at the moment.",
    utilities: ["leading-<theme.windblade.proportions>"],
    preview: (util) => `<div class="${util} text-center" style="max-inline-size: 36ch;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<div>`,
  };

  return { rules, docs };
};

export const textDecorationThickness = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    ['decoration-from-font', { 'text-decoration-thickness': 'from-font' }],
    size.rule('decoration', 'text-decoration-thickness')
  ];

  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade proportions are used instead of separate thickness values.",
    utilities: [
      "decoration-from-font",
      "decoration-<theme.windblade.proportions>",
      "decoration-<theme.windblade.miscSizes>",
    ],
    preview: (util) => `<div class="underline ${util}">Lorem ipsum<div>`,
  };

  return { rules, docs };
};

export const textUnderlineOffset = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [size.rule('underline-offset', 'text-underline-offset')];

  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade proportions are used instead of separate ofset values.",
    utilities: [
      "underline-offset-<theme.windblade.proportions>",
      "underline-offset-<theme.windblade.miscSizes>",
    ],
    preview: (util) => `<div class="underline ${util}">Lorem ipsum<div>`,
  };

  return { rules, docs };
};
