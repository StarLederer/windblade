import { Rule } from "@unocss/core";
import { objectEntries } from "ts-extras"
import Theme from "../../theme/Theme";
import { colorRule, fgColorRule } from "../colors";
import * as logical from "../logicalSet";
import * as size from "../sizes";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "../../docs/types";

export const fill = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    colorRule('fill', 'fill'),
    fgColorRule('fill-fg', 'fill'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Fill",
    description: "Windblade uses semantic colors.",
    utilities: [
      "fill-<theme.windblade.colors>",
      "fill-<theme.windblade.miscColors>",
      "fill-fg-<integer>",
    ],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const stroke = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    colorRule('stroke', 'stroke'),
    fgColorRule('stroke-fg', 'stroke'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Stroke color",
    description: "Windblade uses semantic colors.",
    utilities: [
      "stroke-<theme.windblade.colors>",
      "stroke-<theme.windblade.miscColors>",
      "stroke-fg-<integer>",
    ],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const strokeWidth = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [size.rule('stroke', 'stroke-width')];

  const docs: DocumentedRuleGroupDocs = {
    title: "Stroke width",
    description: "Windblade proportions are used instead of separate size values.",
    utilities: ["stroke-<theme.windblade.proportions>"],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};
