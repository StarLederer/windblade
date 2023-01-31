import { Rule } from "@unocss/core";
import Theme from "../../theme/Theme";
import * as logical from "../logicalSet";
import * as size from "../sizes";
import { objectKeys } from "ts-extras";

type DocumentedRuleGroupDocs = {
  utilities: string[];
};

type DocumentedRuleGroup = {
  rules: Rule<Theme>[],
  docs: DocumentedRuleGroupDocs;
};

export const aspectRatio = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    [
      new RegExp(`^(aspect)-(.+)$`),
      (match) => {
        if (match[2].includes(":")) return undefined;
        return { 'aspect-ratio': match[2] }
      },
    ]
  ];

  const docs: DocumentedRuleGroupDocs = {
    utilities: [
      "<ratio>"
    ],
  };

  return { rules, docs };
};

export const columns = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    size.rule('columns', 'columns'),
    [
      new RegExp(/^(columns)-(\d+)$/),
      (match) => ({ 'columns': match[2] }),
    ],
  ];

  const docs: DocumentedRuleGroupDocs = {
    utilities: ["<integer>", "<theme.windblade.proportions>"],
  };

  return { rules, docs }
};

export const breakAfter = (): DocumentedRuleGroup => {
  const values = ["auto", "avoid", "all", "avoid-page", "page", "recto", "verso", "column"];

  const rules: Rule<Theme>[] = values.map((val): Rule<Theme> => [
    `break-after-${val}`,
    { 'break-after': val }
  ]);

  const docs: DocumentedRuleGroupDocs = {
    utilities: values
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
    utilities: values
  };

  return { rules, docs };
};

export const breakInside = (): DocumentedRuleGroup => {
  const values = ["auto", "avoid", "all", "avoid-page", "avoid-column"];

  const rules: Rule<Theme>[] = values.map((val): Rule<Theme> => [
    `break-inside-${val}`,
    { 'break-inside': val }
  ]);

  const docs: DocumentedRuleGroupDocs = {
    utilities: values
  };

  return { rules, docs };
};

export const boxDecorationBreak = (): DocumentedRuleGroup => {
  const values = ["clone", "slice"];

  const rules: Rule<Theme>[] = values.map((val): Rule<Theme> => [
    `box-decoration-${val}`,
    { 'box-decoration': val }
  ]);

  const docs: DocumentedRuleGroupDocs = {
    utilities: values
  };

  return { rules, docs };
};

export const boxSizing = (): DocumentedRuleGroup => {
  const values = ["border", "content"];

  const rules: Rule<Theme>[] = values.map((val): Rule<Theme> => [
    `box-${val}`,
    { 'box-sizing': `${val}-box` }
  ]);

  const docs: DocumentedRuleGroupDocs = {
    utilities: values
  };

  return { rules, docs };
};

export const display = (): DocumentedRuleGroup => {
  // we are skipping some display types because we belive they cannot be used semantically
  const values = ["block", "inline-block", "inline", "flex", "inline-flex", "flow-root", "grid", "inline-grid", "contents", "hidden"];

  const rules: Rule<Theme>[] = values.map((val): Rule<Theme> => [
    `${val}`,
    { 'display': val }
  ]);

  const docs: DocumentedRuleGroupDocs = {
    utilities: values
  };

  return { rules, docs };
};

export const floats = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    ...objectKeys(logical.abbreviations.inlineEdges).map((val): Rule<Theme> => [
      `float-${val}`,
      { 'float': logical.abbreviations.inlineEdges[val] }
    ]),
    ['float-none', { 'float': 'none' }]
  ];

  const docs: DocumentedRuleGroupDocs = {
    utilities: [
      ...Object.keys(logical.abbreviations.inlineEdges),
      "none"
    ].map((val) => `float-${val}`)
  };

  return { rules, docs };
};

export const clear = (): DocumentedRuleGroup => {
  const additionalValues = ["both", "none"];

  const rules: Rule<Theme>[] = [
    ...objectKeys(logical.abbreviations.inlineEdges).map((val): Rule<Theme> => [
      `clear-${val}`,
      { 'clear': logical.abbreviations.inlineEdges[val] }
    ]),
    ...additionalValues.map((val): Rule<Theme> => [
      `clear-${val}`,
      { 'clear': val }
    ]),
  ];

  const docs: DocumentedRuleGroupDocs = {
    utilities: [
      ...Object.keys(logical.abbreviations.inlineEdges),
      ...additionalValues
    ].map((val) => `clear-${val}`)
  };

  return { rules, docs };
};
