import type { Rule } from "@unocss/core";

import { ITheme } from "../theme/types";
import logicalRuleSet from "./logicalSet";
import { colorRule, colorBgRule, fgColorRule } from "./colors";
import { sizeRule, logicalSizeSet } from "./sizes";

const rules: Rule<ITheme>[] = [
  // Colors
  [
    new RegExp(`^(hue)-(.+)$`),
    (match, { theme }) => ({
      '--hue': match[2],
    })
  ],
  ['highlight', { '--highlight': 'var(--base-highlight);' }],
  ['highlight+', { '--highlight': 'var(--base-highlight-plus)' }],

  ['bg-none', { background: 'none' }],
  colorBgRule('bg'),

  // Borders
  ['border', {
    'border-style': 'solid',
    'border-width': '1px',
  }],
  ...logicalRuleSet('border', 'color', 'border', 'color', colorRule),
  ...logicalRuleSet('border', 'color', 'border', 'color', fgColorRule),

  // Typography
  colorRule('text', 'color'),
  fgColorRule('text-fg', 'color'),

  sizeRule('text', 'font-size'),

  ['font-thin', { 'font-weight': '100' }],
  ['font-extralight', { 'font-weight': '200' }],
  ['font-light', { 'font-weight': '300' }],
  ['font-normal', { 'font-weight': '400' }],
  ['font-medium', { 'font-weight': '500' }],
  ['font-semibold', { 'font-weight': '600' }],
  ['font-bold', { 'font-weight': '700' }],
  ['font-extrabold', { 'font-weight': '800' }],
  ['font-black', { 'font-weight': '900' }],

  ['text-start', { 'text-align': 'start' }],
  ['text-end', { 'text-align': 'end' }],
  ['text-center', { 'text-align': 'center' }],
  ['text-justify', { 'text-align': 'justify' }],

  // Lists
  ['list-none', { 'list-style-type': 'none' }],
  ['list-disc', { 'list-style-type': 'disc' }],
  ['list-decimal', { 'list-style-type': 'decimal' }],

  // Shapes and sizes
  ['width-full', { 'width': '100%' }],
  ['height-full', { 'height': '100%' }],
  sizeRule('width', 'width'),
  sizeRule('height', 'height'),
  ...logicalSizeSet('inset', '', 'inset', ''),

  ...logicalSizeSet('pd', '', 'padding', ''),
  ...logicalSizeSet('mg', '', 'margin', ''),

  ['round-full', { 'border-radius': '999999px' }],
  sizeRule('round', 'border-radius'),

  ['static', { 'position': 'static' }],
  ['fixed', { 'position': 'fixed' }],
  ['absolute', { 'position': 'absolute' }],
  ['relative', { 'position': 'relative' }],
  ['sticky', { 'position': 'sticky' }],

  // Gaps
  sizeRule('gap', 'gap'),
  sizeRule('gap-col', 'column-gap'),
  sizeRule('gap-row', 'row-gap'),

  // Flex
  ['flex', { display: 'flex' }],
  ['flex-col', { 'flex-direction': 'column' }],
  ['flex-row', { 'flex-direction': 'row' }],
  ['flex-wrap', { 'flex-wrap': 'wrap' }],
  ['flex-wrap-reverse', { 'flex-wrap': 'wrap-reverse' }],
  ['flex-nowrap', { 'flex-wrap': 'nowrap' }],
  ['flex-1', { 'flex': '1 1 0%' }],
  ['flex-auto', { 'flex': '1 1 auto' }],
  ['flex-initial', { 'flex': '0 1 auto' }],
  ['grow', { 'flex-grow': '1' }],
  ['grow-0', { 'flex-grow': '0' }],
  ['shrink', { 'flex-shrink': '1' }],
  ['shrink-0', { 'flex-shrink': '0' }],

  // TODO: Grids

  // ALignment
  ['justify-start', { 'justify-content': 'flex-start' }],
  ['justify-end', { 'justify-content': 'flex-end' }],
  ['justify-center', { 'justify-content': 'center' }],
  ['justify-between', { 'justify-content': 'space-between' }],
  ['justify-around', { 'justify-content': 'space-around' }],
  ['justify-evenly', { 'justify-content': 'space-evenly' }],

  ['items-start', { 'align-items': 'flex-start' }],
  ['items-end', { 'align-items': 'flex-end' }],
  ['items-center', { 'align-items': 'center' }],
  ['items-baseline', { 'align-items': 'baseline' }],
  ['items-stretch', { 'align-items': 'stretch' }],
];

export default rules;
