import { Rule } from "@unocss/core";
import Theme from "../../theme/Theme";
import * as logical from "../logicalSet";
import * as size from "../sizes";
import { objectKeys } from "ts-extras";

type DocumentedRuleGroupDocs = {
  title: string,
  description: string,
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
    title: "Aspect ratio",
    description: "Utilities for controlling the aspect ratio of an element.",
    utilities: [
      "aspect-<ratio>"
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
    title: "Columns",
    description: "Utilities for controlling the number of columns within an element.",
    utilities: ["columns-<integer>", "columns-<theme.windblade.proportions>"],
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
    title: "Break after",
    description: "Utilities for controlling how a column or page should break after an element.",
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
    title: "Break before",
    description: "Utilities for controlling how a column or page should break before an element.",
    utilities: values.map((val) => `break-before-${val}`),
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
    title: "Break inside",
    description: "Utilities for controlling how a column or page should break within an element.",
    utilities: values.map((val) => `break-inside-${val}`),
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
    title: "Box decoration break",
    description: "Utilities for controlling how element fragments should be rendered across multiple lines, columns, or pages.",
    utilities: values.map((val) => `box-decoration-${val}`),
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
    title: "Box sizing",
    description: "Utilities for controlling how the browser should calculate an element's total size.",
    utilities: values.map((val) => `box-${val}`),
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
    title: "Display",
    description: "Utilities for controlling the display box type of an element.",
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
    title: "Float",
    description: "Utilities for controlling the wrapping of content around an element.",
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
    title: "Clear",
    description: "Utilities for controlling the wrapping of content around an element.",
    utilities: [
      ...Object.keys(logical.abbreviations.inlineEdges),
      ...additionalValues
    ].map((val) => `clear-${val}`)
  };

  return { rules, docs };
};
