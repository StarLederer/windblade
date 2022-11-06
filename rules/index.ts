import type { Rule } from "@unocss/core";

import { ITheme } from "../theme/types";
import { colorRule, colorBgRule } from "./colors";
import sizeRule from "./sizes";

const rules: Rule<ITheme>[] = [
  // Colors
  ['highlight', { '--highlight': 'var(--base-highlight);' }],
  ['highlight+', { '--highlight': 'var(--base-highlight-plus)' }],

  ['bg-none', { background: 'none' }],
  colorBgRule('bg'),

  colorRule('border-color', 'border-color'),

  // TODO: Turn these into dynamic rules and move to a getter function
  ['border-color-on0', { 'border-color': 'var(--fg0)' }],
  ['border-color-on1', { 'border-color': 'var(--fg1)' }],
  ['border-color-on2', { 'border-color': 'var(--fg2)' }],
  ['border-color-on3', { 'border-color': 'var(--fg3)' }],
  ['border-color-on4', { 'border-color': 'var(--fg4)' }],
  ['text-on0', { color: 'var(--fg0)' }],
  ['text-on1', { color: 'var(--fg1)' }],
  ['text-on2', { color: 'var(--fg2)' }],
  ['text-on3', { color: 'var(--fg3)' }],
  ['text-on4', { color: 'var(--fg4)' }],

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
