import { Rule } from "@unocss/core";
import { objectEntries } from "ts-extras"
import Theme from "../../theme/Theme";
import * as logical from "../logicalSet";
import * as sizes from "../sizes";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "../../docs/types";

export const widthHeight = (): DocumentedRuleGroup => {
  const docs: DocumentedRuleGroupDocs = {
    title: "Width & Height",
    description: "Removed this, as well as min and max variants, in favor of the size counterparts",
    utilities: [],
  };

  return { rules: [], docs };
};

export const size = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = sizes.axisRules('size', '', '', 'size');

  const docs: DocumentedRuleGroupDocs = {
    title: "Size",
    description: "Utilities for setting the size of an element. Missing from Tailwind.",
    utilities: [
      ...Object.keys(logical.abbreviations.axis).map((val) => `size-${val}-<theme.windblade.sizes>`),
    ],
    preview: (util) => `
      <div class="${util} ${util.includes("-i-") ? "min-size-b-m.2" : "min-size-i-m.2"} bg-accent rounded-s"></div>
    `,
  };

  return { rules, docs };
};

const minMaxSizePreview = (util: string) => `
  <div class="${util} ${util.includes("-i-") ? "min-size-b-m.2" : "min-size-i-m.2"} bg-accent rounded-s"></div>
`;

export const minSize = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = sizes.axisRules('min-size', '', 'min', 'size');

  const docs: DocumentedRuleGroupDocs = {
    title: "Min-Size",
    description: "Utilities for setting the minimum size of an element. Missing from Tailwind.",
    utilities: Object.keys(logical.abbreviations.axis).map((val) => `min-size-${val}-<theme.windblade.proportions>`),
    preview: minMaxSizePreview,
  };

  return { rules, docs };
};

export const maxSize = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = sizes.axisRules('max-size', '', 'max', 'size');

  const docs: DocumentedRuleGroupDocs = {
    title: "Max-Size",
    description: "Utilities for setting the maximum size of an element. Missing from Tailwind.",
    utilities: Object.keys(logical.abbreviations.axis).map((val) => `max-size-${val}-<theme.windblade.proportions>`),
    preview: minMaxSizePreview,
  };

  return { rules, docs };
};

