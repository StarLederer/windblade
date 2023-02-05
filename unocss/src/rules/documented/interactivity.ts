import { Rule } from "@unocss/core";
import Theme from "../../theme/Theme";
import * as logical from "../logicalSet";
import { colorRule, fgColorRule } from "../colors";
import * as size from "../sizes";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "./types";

export const accentColor = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [colorRule('accent', 'accent-color')];

  const docs: DocumentedRuleGroupDocs = {
    title: "Accent color",
    description: "Windblade uses semantic colors.",
    utilities: [
      "accent-<theme.windblade.colors>",
      "accent-<theme.windblade.miscColors>",
      "accent-fg-<integer>",
    ],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const caretColor = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    colorRule('caret', 'caret-color'),
    fgColorRule('caret-fg', 'caret-color'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Caret color",
    description: "Windblade uses semantic colors.",
    utilities: [
      "caret-<theme.windblade.colors>",
      "caret-<theme.windblade.miscColors>",
      "caret-fg-<integer>",
    ],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const scrollMargin = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = size.edgeRules('scroll-m', '', 'scroll-margin', '');

  const docs: DocumentedRuleGroupDocs = {
    title: "Scroll margin",
    description: "Windblade proportions are used instead of separate size values, and physical properties are replaced with logical.",
    utilities: [
      ...Object.keys(logical.abbreviations.axis).map((val) => `scroll-m-${val}`),
      ...Object.keys(logical.abbreviations.edges).map((val) => `scroll-m-${val}`),
    ].flatMap((val) => [`${val}-<theme.windblade.proportions>`, `${val}-<theme.windblade.miscSizes>`]),
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const scrollPadding = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = size.edgeRules('scroll-p', '', 'scroll-padding', '');

  const docs: DocumentedRuleGroupDocs = {
    title: "Scroll padding",
    description: "Windblade proportions are used instead of separate size values, and physical properties are replaced with logical.",
    utilities: [
      ...Object.keys(logical.abbreviations.axis).map((val) => `scroll-p-${val}`),
      ...Object.keys(logical.abbreviations.edges).map((val) => `scroll-p-${val}`),
    ].flatMap((val) => [`${val}-<theme.windblade.proportions>`, `${val}-<theme.windblade.miscSizes>`]),
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const scrollSnapType = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    ['snap-none', { 'scroll-snap-type': 'none' }],
    ['snap-both', { 'scroll-snap-type': 'both var(--wb-scroll-snap-strictness)' }],
    ['snap-mandatory', { '--wb-scroll-snap-strictness': 'mandatory' }],
    ['snap-proximity', { '--wb-scroll-snap-strictness': 'proximity' }],
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Scroll snap type",
    description: "snap-x and snap-y have been removed because they have no logical counterparts yet.",
    utilities: ["snap-none", "snap-both", "snap-mandatory", "snap-proximity"],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const touchAction = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    ['touch-auto', { 'touch-action': 'auto' }],
    ['touch-none', { 'touch-action': 'none' }],
    ['touch-pinch-zoom', { 'touch-action': 'pinch-zoom' }],
    ['touch-manipulation', { 'touch-action': 'manipulation' }],
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Touch action",
    description: "pan touch-actions have been removed because they have no logical counterparts yet.",
    utilities: ["touch-auto", "touch-none", "touch-pinch-zoom", "touch-manipulation"],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const hue = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    [
      new RegExp(`^(hue)-(.+)$`),
      (match) => ({
        '--hue': match[2],
      })
    ],
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Hue",
    description: "These utilities change semantic color hues and are not present in Tailwind.",
    utilities: ["hue-0", "hue-30", "hue-60", "hue-90", "hue-120", "hue-150", "hue-180", "hue-210", "hue-240", "hue-270", "hue-300", "hue-330"],
    preview: (util) => `
      <div class="${util} bg-surface border border-color-surface rounded-s p-s flex gap-s items-center">
        <div class="size-i-m.2 aspect-1/1 bg-accent rounded-full"></div>
        <div class="flex flex-col gap-s.2">
          <div class="text-fg-1 font-bold font-(s+s.2)">Colored chip</div>
          <div class="text-fg-2">Chip subtitle...</div>
        </div>
      </div>
    `,
  };

  return { rules, docs };
};

export const highlight = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    ['highlight', { '--highlight': 'var(--base-highlight)' }],
    ['highlight+', { '--highlight': 'var(--base-highlight-plus)' }],
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Highlight",
    description: "Utilities for highlighting interactive semantic colors. Not present in Tailwind.",
    utilities: ["highlight", "highlight+"],
    preview: (util) => `
      <div class="flex flex-col gap-s.4">
        <div class="bg-accent ${util} p-s rounded-s text-center">Highlight</div>
        <div class="bg-accent p-s rounded-s text-center">Normal</div>
      </div>
    `,
  };

  return { rules, docs };
};
