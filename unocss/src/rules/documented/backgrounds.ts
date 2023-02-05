import { Rule } from "@unocss/core";
import Theme from "../../theme/Theme";
import * as logical from "../logicalSet";
import { colorRule, colorBgRule, fgColorRule } from "../colors";
import * as size from "../sizes";
import { objectEntries, objectKeys } from "ts-extras";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "./types";

export const color = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    colorRule('bg', 'background-color'),
    colorBgRule('bg'),
    fgColorRule('bg-fg', 'background-color'),
    // TODO: we might need a set-fg rule that is the same as bg but does not actually change background color
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Background color",
    description: "Windblade uses semantic colors.",
    utilities: ["bg-<theme.windblade.colors>", "bg-<theme.windblade.miscColors>", "bg-fg-<integer>"],
    preview: (util) => {
      if (util.startsWith("bg-fg")) {
        return `
          <div class="size-i-full aspect-1/1 max-size-i-m max-size-b-m rounded-s p-s bg-accent">
            <div class="size-i-full aspect-1/1 rounded-full ${util}"></div>
          </div>
        `;
      } else {
        return `
          <div class="${util} size-i-full aspect-1/1 max-size-i-m max-size-b-m rounded-s p-s flex items-center justify-center text-center">
            ${util}
          </div>
        `;
      }
    },
  };

  return { rules, docs };
};

export const backgroundPosition = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    ...objectEntries(logical.abbreviations.edges).map(([key, val]): Rule<Theme> => [
      `bg-${key}`, { 'background-position': `var(--${val})` }
    ]),
    ...objectEntries(logical.abbreviations.coners).map(([key, val]): Rule<Theme> => [
      `bg-${key}`, { 'background-position': `var(--${val})` }
    ]),
    ['bg-center', { 'background-position': 'center' }]
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Background position",
    description: "Physical properties replaced with logocal.",
    utilities: [
      ...Object.keys(logical.abbreviations.edges),
      ...Object.keys(logical.abbreviations.coners),
      "center"
    ].map((val) => `bg-${val}`),
    preview: (util) => `
      <div class="${util} rounded-s.4 size-i-full max-size-i-l.2 aspect-10/6" style="background-image: url('https://picsum.photos/600/400')"></div>
    `,
  };

  return { rules, docs };
};

export const backgroundImage = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    ['bg-none', { 'background-image': 'none' }],
    ...objectKeys(logical.abbreviations.edges).map((edgeKey): Rule<Theme> => [
      `bg-gradient-to-${edgeKey}`,
      {
        '--wb-gradient-stops': 'var(--wb-gradient-from, transparent), var(--wb-gradient-to, transparent)',
        'background-image': `linear-gradient(to var(--${logical.abbreviations.edges[edgeKey]}), var(--wb-gradient-stops))`
      }
    ]),
    ...objectKeys(logical.abbreviations.coners).map((cornerKey): Rule<Theme> => [
      `bg-gradient-to-${cornerKey}`,
      {
        '--wb-gradient-stops': 'var(--wb-gradient-from, transparent), var(--wb-gradient-to, transparent)',
        'background-image': `linear-gradient(to var(--${logical.abbreviations.coners[cornerKey]}), var(--wb-gradient-stops))`
      }
    ]),
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Background image",
    description: "Repalced static colors with sematic colors.",
    utilities: [
      "bg-none",
      ...Object.keys(logical.abbreviations.edges).map((val) => `bg-gradient-to-${val}`),
      ...Object.keys(logical.abbreviations.coners).map((val) => `bg-gradient-to-${val}`),
    ],
    preview: (util) => `
      <div class="${util} from-accent size-i-full size-b-l.2 rounded-s"></div>
    `,
  };

  return { rules, docs };
};

export const gradientColorStops = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    colorRule('from', '--wb-gradient-from'),
    colorRule('to', '--wb-gradient-to'),
    // TODO implement 'via'
    // colorRule('via', '--wb-gradient-stops', (val) => `var(--wb-gradient-from, transparent), ${val}, var(--wb-gradient-to, transparent)`),
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Gradient color stops",
    description: "Repalced static colors with sematic colors. Temporarily missing the 'via' utilities.",
    utilities: ["from-<theme.windblade.colors>", "from-<theme.windblade.miscColors>", "to-<theme.windblade.colors>", "to-<theme.windblade.miscColors>"],
    preview: (util) => `
      <div class="bg-gradient-to-ie ${util} ${util.startsWith("from") ? "to-accent-2" : "from-accent-2"} size-i-full size-b-l.2 rounded-s"></div>
    `,
  };

  return { rules, docs };
};
