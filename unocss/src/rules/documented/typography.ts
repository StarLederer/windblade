import { Rule } from "@unocss/core";
import { objectEntries } from "ts-extras"
import Theme from "../../theme/Theme";
import { colorRule, fgColorRule } from "../colors";
import * as logical from "../logicalSet";
import * as size from "../sizes";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "./types";

export const fontFamily = (): DocumentedRuleGroup => {
  const docs: DocumentedRuleGroupDocs = {
    title: "Font family",
    description: "Font family utilities have been removed.",
    utilities: [],
  };

  return { rules: [], docs };
};

export const fontSize = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [size.rule('text', 'font-size')];

  const docs: DocumentedRuleGroupDocs = {
    title: "Font size",
    description: "Windblade proportions are used instead of separate size values.",
    utilities: ["text-<theme.windblade.proportions>"],
    preview: (util) => `<div class="${util}">Lorem ipsum<div>`,
  };

  return { rules, docs };
};

export const fontSmoothing = (): DocumentedRuleGroup => {
  const docs: DocumentedRuleGroupDocs = {
    title: "Font smoothing",
    description: "Font smoothing has been removed because Windblade sets it by default in preflight and it should never be changed. Plese open an issue if this is wrong.",
    utilities: [],
  };

  return { rules: [], docs };
};

export const tracking = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [size.rule('tracking', 'letter-spacing', { defaultUnit: 'em' })];

  const docs: DocumentedRuleGroupDocs = {
    title: "Letter spacing",
    description: "Windblade proportions are used instead of separate size values.",
    utilities: ["tracking-<theme.windblade.proportions>"],
    preview: (util) => `<div class="${util}">Lorem ipsum<div>`,
  };

  return { rules, docs };
};

export const leading = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [size.rule('leading', 'line-height', { defaultUnit: '' })];

  const docs: DocumentedRuleGroupDocs = {
    title: "Line height",
    description: "Windblade proportions are used instead of separate size values. Setting line height in rem units is not possible at the moment.",
    utilities: ["leading-<theme.windblade.proportions>"],
    preview: (util) => `<div class="${util} text-center" style="max-inline-size: 36ch;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<div>`,
  };

  return { rules, docs };
};

export const textColor = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    colorRule('text', 'color'),
    fgColorRule('text-fg', 'color'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Text color",
    description: "Windblade uses semantic colors.",
    utilities: [
      "text-<theme.windblade.colors>",
      "text-<theme.windblade.miscColors>",
      "text-fg-<integer>",
    ],
    preview: (util) => `<div class="${util}">Lorem ipsum<div>`,
  };

  return { rules, docs };
};

export const textDecorationColor = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    colorRule('decoration', 'text-decoration-color'),
    fgColorRule('decoration-fg', 'text-decoration-color'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Text decoration color",
    description: "Windblade uses semantic colors.",
    utilities: [
      "decoration-<theme.windblade.colors>",
      "decoration-<theme.windblade.miscColors>",
      "decoration-fg-<integer>",
    ],
    preview: (util) => `<div class="underline ${util}">Lorem ipsum<div>`,
  };

  return { rules, docs };
};

export const textDecorationThickness = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    ['decoration-from-font', { 'text-decoration-thickness': 'from-font' }],
    size.rule('decoration', 'text-decoration-thickness')
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Text decoration thickness",
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

export const textUnderlineOffset = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [size.rule('underline-offset', 'text-underline-offset')];

  const docs: DocumentedRuleGroupDocs = {
    title: "Tect underline offset",
    description: "Windblade proportions are used instead of separate ofset values.",
    utilities: [
      "underline-offset-<theme.windblade.proportions>",
      "underline-offset-<theme.windblade.miscSizes>",
    ],
    preview: (util) => `<div class="underline ${util}">Lorem ipsum<div>`,
  };

  return { rules, docs };
};
