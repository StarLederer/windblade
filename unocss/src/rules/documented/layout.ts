import { Rule } from "@unocss/core";
import { objectEntries } from "ts-extras"
import Theme from "../../theme/Theme";
import * as logical from "../logicalSet";
import { DocumentationCategory, DocumentedRuleGroup, DocumentedRuleGroupDocs } from "../../docs/types";

export const aspectRatio = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    [
      new RegExp(`^(aspect)-(.+)$`),
      (match) => {
        if (match[2].includes(":")) return undefined;
        return { 'aspect-ratio': match[2] }
      },
    ],
  ];

  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade uses CSS ratios instead of presets.",
    utilities: ["aspect-<ratio>"],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const container = (): DocumentedRuleGroup => {
  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade does not have container utilities or breakpoints becase it focuses on intrinsic sizing instead.",
    utilities: [],
  };

  return { rules: [], docs };
};

export const breakAfter = (): DocumentedRuleGroup => {
  const values = ["auto", "avoid", "all", "avoid-page", "page", "recto", "verso", "column"];

  const rules: Rule<Theme>[] = values.map((val): Rule<Theme> => [
    `break-after-${val}`,
    { 'break-after': val }
  ]);

  const docs: DocumentedRuleGroupDocs = {
    description: "Physical properties replaced with logocal.",
    utilities: values.map((val) => `break-after-${val}`),
  };

  return { rules, docs };
};

export const breakBefore = (): DocumentedRuleGroup => {
  const values = ["auto", "avoid", "all", "avoid-page", "page", "recto", "verso", "column"];

  const rules: Rule<Theme>[] = values.map((val): Rule<Theme> => [
    `break-before-${val}`,
    { 'break-before': val }
  ]);

  const docs: DocumentedRuleGroupDocs = {
    description: "Physical properties replaced with logocal.",
    utilities: values.map((val) => `break-before-${val}`),
  };

  return { rules, docs };
};

export const display = (): DocumentedRuleGroup => {
  const values = ["block", "inline-block", "inline", "flex", "inline-flex", "flow-root", "grid", "inline-grid", "contents", "hidden"] as const;
  const overrides: Partial<Record<typeof values[number], string>> = {
    hidden: "none",
  }

  const rules: Rule<Theme>[] = values.map((val): Rule<Theme> => [
    `${val}`,
    { 'display': Object.keys(overrides).includes(val) ? overrides[val] : val }
  ]);

  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade removes some utilities from this group that cannot be sued semantically.",
    utilities: values as unknown as string[],
    preview: (util) => {
      switch (util) {
        default:
          return `
            <div>
              <div class="bg-accent p-s rounded-s.4 ${util}">1</div>
              <div class="bg-accent p-s rounded-s.4 ${util}">2</div>
              <div class="bg-accent p-s rounded-s.4 ${util}">3</div>
            </div>
          `;
      }
    },
  };

  return { rules, docs };
};

export const objectPosition = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    ...objectEntries(logical.abbreviations.edges).map(([key, val]): Rule<Theme> => [
      `object-${key}`, { 'object-position': `var(--${val})` }
    ]),
    ...objectEntries(logical.abbreviations.coners).map(([key, val]): Rule<Theme> => [
      `object-${key}`, { 'object-position': `var(--${val})` }
    ]),
    ['object-center', { 'object-position': 'center' }]
  ];

  const docs: DocumentedRuleGroupDocs = {
    description: "Physical properties replaced with logocal.",
    utilities: [
      ...Object.keys(logical.abbreviations.edges),
      ...Object.keys(logical.abbreviations.coners),
      "center"
    ].map((val) => `object-${val}`),
    preview: (util) => `
      <img alt="Random demo" src="https://picsum.photos/600/400" class="rounded-s.4 max-size-i-l.2 object-none ${util}">
    `,
  };

  return { rules, docs };
};

const category: DocumentationCategory<Theme> = new Map([
  ["Aspect Ratio", aspectRatio()],
  ["Container", container()],
  ["Break After", breakAfter()],
  ["Break Before", breakBefore()],
  ["Disaply", display()],
  ["Object Position", objectPosition()],
]);

export default category;
