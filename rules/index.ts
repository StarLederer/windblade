import type { Rule } from "@unocss/core";

import { ITheme } from "../theme/types";
import { logicalRuleSet, logicalRuleSetFull } from "./logicalSet";
import { colorRule, colorBgRule, fgColorRule } from "./colors";
import { sizeRule, logicalSizeSet } from "./sizes";
import { getThemeCSS } from "../core/variant";

const simpleRule = (prefix: string, property: string, value: string): Rule<ITheme> => {
  const css: any = {};
  css[property] = value;
  return [
    prefix, css,
  ]
};

const rules: Rule<ITheme>[] = [
  // Colors
  [
    new RegExp(`^(theme-dark)$`),
    (match, { theme }) => (getThemeCSS(theme).dark)
  ],
  [
    new RegExp(`^(theme-light)$`),
    (match, { theme }) => (getThemeCSS(theme).light)
  ],

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
  fgColorRule('bg-fg', 'background'),
  colorRule('fill', 'fill'),
  fgColorRule('fill-fg', 'fill'),

  // Borders
  ['border', {
    'border-style': 'solid',
    'border-width': '1px',
  }],
  ...logicalRuleSetFull('border', 'color', 'border', 'color', colorRule),
  ...logicalRuleSetFull('border', 'color-fg', 'border', 'color', fgColorRule),

  // Typography
  colorRule('text', 'color'),
  fgColorRule('text-fg', 'color'),

  sizeRule('text', 'font-size'),
  sizeRule('line-height', 'line-height'),

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

  ['uppercase', { 'text-transform': 'uppercase' }],
  ['lowercase', { 'text-transform': 'lowercase' }],
  ['capitalize', { 'text-transform': 'capitalize' }],
  ['normal-case', { 'text-transform': 'none' }],

  // Lists
  ['list-none', { 'list-style-type': 'none' }],
  ['list-disc', { 'list-style-type': 'disc' }],
  ['list-decimal', { 'list-style-type': 'decimal' }],

  // Shapes and sizes
  ['width-min-content', { 'width': 'min-content' }],
  ['width-max-content', { 'width': 'max-content' }],
  ['height-min-content', { 'height': 'min-content' }],
  ['height-max-content', { 'height': 'max-content' }],
  sizeRule('width', 'width'),
  sizeRule('height', 'height'),
  sizeRule('min-width', 'min-width'),
  sizeRule('min-height', 'min-height'),
  sizeRule('max-width', 'max-width'),
  sizeRule('max-height', 'max-height'),
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
  ['flex-col-reverse', { 'flex-direction': 'column-reverse' }],
  ['flex-row', { 'flex-direction': 'row' }],
  ['flex-row-reverse', { 'flex-direction': 'row-reverse' }],
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

  // Grids
  ['grid', { display: 'grid' }],
  sizeRule('grid-auto-cols', 'grid-auto-columns'),
  sizeRule('grid-auto-rows', 'grid-auto-rows'),
  sizeRule('grid-auto-fit', 'grid-template-columns', (size) => (`repeat(auto-fit, minmax(${size}, 1fr))`)),
  sizeRule('grid-auto-fill', 'grid-template-columns', (size) => (`repeat(auto-fill, minmax(${size}, 1fr))`)),

  // Alignment
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

  // Transitions
  ['transition', { 'transition': '100ms linear' }],

  // Misc
  ...logicalRuleSet('overflow', 'visible', 'overflow', '', (pref, prop) => (simpleRule(pref, prop, 'visible'))),
  ...logicalRuleSet('overflow', 'hidden', 'overflow', '', (pref, prop) => (simpleRule(pref, prop, 'hidden'))),
  ...logicalRuleSet('overflow', 'scroll', 'overflow', '', (pref, prop) => (simpleRule(pref, prop, 'scroll'))),
  ...logicalRuleSet('overflow', 'auto', 'overflow', '', (pref, prop) => (simpleRule(pref, prop, 'auto'))),
];

export default rules;
