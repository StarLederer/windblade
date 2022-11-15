import type { Rule } from "@unocss/core";

import { ITheme } from "../theme/types";
import { colorRule, colorBgRule, fgColorRule } from "./colors";
import sizeRule from "./sizes";

const rules: Rule<ITheme>[] = [
  // Colors
  ['highlight', { '--highlight': 'var(--base-highlight);' }],
  ['highlight+', { '--highlight': 'var(--base-highlight-plus)' }],

  ['bg-none', { background: 'none' }],
  colorBgRule('bg'),

  colorRule('border-color', 'border-color'),
  colorRule('text', 'color'),

  fgColorRule('border-color-fg', 'border-color'),
  fgColorRule('text-fg', 'color'),

  // Shapesand sizes
  sizeRule('inset', 'inset'),
  sizeRule('inset-b', 'inset-block'),
  sizeRule('inset-bs', 'inset-block-start'),
  sizeRule('inset-be', 'inset-block-end'),
  sizeRule('inset-i', 'inset-inline'),
  sizeRule('inset-is', 'inset-inline-start'),
  sizeRule('inset-ie', 'inset-inline-end'),

  sizeRule('round', 'border-radius'),

  sizeRule('pd', 'padding'),
  sizeRule('pd-i', 'padding-inline'),
  sizeRule('pd-is', 'padding-inline-start'),
  sizeRule('pd-ie', 'padding-inline-end'),
  sizeRule('pd-b', 'padding-block'),
  sizeRule('pd-bs', 'padding-block-start'),
  sizeRule('pd-be', 'padding-block-end'),

  sizeRule('mg', 'margin'),
  sizeRule('mg-i', 'margin-inline'),
  sizeRule('mg-is', 'margin-inline-start'),
  sizeRule('mg-ie', 'margin-inline-end'),
  sizeRule('mg-b', 'margin-block'),
  sizeRule('mg-bs', 'margin-block-start'),
  sizeRule('mg-be', 'margin-block-end'),

  sizeRule('gap', 'gap'),
];

export default rules;
