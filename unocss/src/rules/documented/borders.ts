import { Rule } from "@unocss/core";
import { objectEntries } from "ts-extras"
import { simpleRule } from "..";
import Theme from "../../theme/Theme";
import { colorRule, fgColorRule } from "../colors";
import * as logical from "../logicalSet";
import * as size from "../sizes";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "./types";

export const borderRadius = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    ...size.cornerRules('rounded', '', 'border', 'radius'),
    ...logical.cornerRules('rounded', 'full', 'border', 'radius', (pref, prop) => simpleRule(pref, prop, '999999px')),
    ...logical.cornerRules('rounded', 'none', 'border', 'radius', (pref, prop) => simpleRule(pref, prop, 'none')),
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Border radius",
    description: "Windblade proportions are used instead of separate size values, and physical properties are replaced with logical.",
    utilities: [
      "rounded",
      ...Object.keys(logical.abbreviations.coners).map((val) => `rounded-${val}`),
    ].flatMap((val) => [`${val}-<theme.windblade.proportions>`, `${val}-full`, `${val}-none`]),
    preview: (util) => `
      <div class="${util} size-i-full max-size-i-l.2 aspect-1/1 bg-accent"></div>
    `,
  };

  return { rules, docs };
};

export const borderWidth = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = size.edgeRules('border', '', 'border', 'width');

  const docs: DocumentedRuleGroupDocs = {
    title: "Border width",
    description: "Windblade proportions are used instead of separate size values, and physical properties are replaced with logical.",
    utilities: [
      "border",
      ...Object.keys(logical.abbreviations.axis).map((val) => `border-${val}`),
      ...Object.keys(logical.abbreviations.edges).map((val) => `border-${val}`),
    ].flatMap((val) => [`${val}-<theme.windblade.proportions>`, `${val}-<theme.windblade.miscSizes>`]),
    preview: (util) => `
      <div class="border border-color-accent ${util} rounded-s size-i-full max-size-i-l.2 aspect-1/1"></div>
    `,
  };

  return { rules, docs };
};

export const borderColor = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    ...logical.edgeRules('border', 'color', 'border', 'color', colorRule),
    ...logical.edgeRules('border', 'color-fg', 'border', 'color', fgColorRule),
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Border color",
    description: "Windblade uses semantic colors.",
    utilities: [
      "border-color",
      ...Object.keys(logical.abbreviations.axis).map((val) => `border-${val}-color`),
      ...Object.keys(logical.abbreviations.edges).map((val) => `border-${val}-color`),
    ].flatMap((val) => [`${val}-<theme.windblade.colors>`, `${val}-<theme.windblade.miscColors>`, `${val}-fg-<integer>`]),
    preview: (util) => `
      <div class="border border-width-s.2 ${util} rounded-s size-i-full max-size-i-l.2 aspect-1/1"></div>
    `,
  };

  return { rules, docs };
};

export const outlineWidth = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [size.rule('outline', 'outline-width')];

  const docs: DocumentedRuleGroupDocs = {
    title: "Outline width",
    description: "Windblade proportions are used instead of separate size values.",
    utilities: [
      "outline-<theme.windblade.proportions>",
      "outline-<theme.windblade.miscSizes>",
    ],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const outlineColor = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    colorRule('outline', 'outline-color'),
    fgColorRule('outline-fg', 'outline-color'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Outline color",
    description: "Windblade uses semantic colors.",
    utilities: [
      "outline-color-<theme.windblade.colors>",
      "outline-color-<theme.windblade.miscColors>",
      "outline-color-fg-<integer>",
    ],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const outlineOffset = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [size.rule('outline-offset', 'outline-offset')];

  const docs: DocumentedRuleGroupDocs = {
    title: "Outline offset",
    description: "Windblade proportions are used instead of separate offset values.",
    utilities: [
      "outline-offset-<theme.windblade.proportions>",
      "outline-offset-<theme.windblade.miscSizes>",
    ],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const divide = (): DocumentedRuleGroup => {
  const docs: DocumentedRuleGroupDocs = {
    title: "Divide",
    description: "Divides have been removed.",
    utilities: [],
  };

  return { rules: [], docs };
};

export const ring = (): DocumentedRuleGroup => {
  const docs: DocumentedRuleGroupDocs = {
    title: "Ring",
    description: "Rings have been removed.",
    utilities: [],
  };

  return { rules: [], docs };
};
