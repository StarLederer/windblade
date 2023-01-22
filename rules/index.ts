import type { Rule } from "@unocss/core";

import Theme from "../theme/Theme";
import * as logical from "./logicalSet";
import { colorRule, colorBgRule, fgColorRule } from "./colors";
import * as size from "./sizes";
import { getThemeCSS } from "../core/variant";

const simpleRule = (prefix: string, property: string, value: string): Rule<Theme> => {
  const css: any = {};
  css[property] = value;
  return [
    prefix, css,
  ]
};

const rules: Rule<Theme>[] = [
  // Layout

  [
    new RegExp(`^(aspect)-(.+)$`),
    (match) => ({ 'aspect-ratio': match[2] }),
  ],

  // we are skipping container because max-size-i does that already
  [
    new RegExp(`^(aspect)-(.+)$`),
    (match, { theme }) => {
      const values = match[2].split(',');
      const minWidth = size.solve(values[0], theme);
      const maxNumCols = values[1];
      return { 'columns': [minWidth, maxNumCols].join(" ") };
    },
  ],

  ...["auto", "avoid", "all", "avoid-page", "page", "recto", "verso", "column"].map((val): Rule<Theme> => [
    `break-after-${val}`,
    { 'break-after': val }
  ]),

  ...["auto", "avoid", "all", "avoid-page", "page", "recto", "verso", "column"].map((val): Rule<Theme> => [
    `break-before-${val}`,
    { 'break-before': val }
  ]),

  ...["auto", "avoid", "all", "avoid-page", "avoid-column"].map((val): Rule<Theme> => [
    `break-inside-${val}`,
    { 'break-inside': val }
  ]),

  ...["clone", "slice"].map((val): Rule<Theme> => [
    `box-decoration-${val}`,
    { 'box-decoration': val }
  ]),

  ...["border", "content"].map((val): Rule<Theme> => [
    `box-${val}`,
    { 'box-sizing': `${val}-box` }
  ]),

  // we are skipping some display types because we belive they cannot be used semantically
  ...["block", "inline-block", "inline", "flex", "inline-flex", "flow-root", "grid", "inline-grid", "contents", "hidden"].map((val): Rule<Theme> => [
    `${val}`,
    { 'display': val }
  ]),

  ...(Object.keys(logical.abbreviations.inlineEdges) as Array<keyof typeof logical.abbreviations.inlineEdges>).map((val): Rule<Theme> => [
    `float-${val}`,
    { 'float': logical.abbreviations.inlineEdges[val] }
  ]),
  ['float-none', { 'float': 'none' }],

  ...(Object.keys(logical.abbreviations.inlineEdges) as Array<keyof typeof logical.abbreviations.inlineEdges>).map((val): Rule<Theme> => [
    `clear-${val}`,
    { 'clear': logical.abbreviations.inlineEdges[val] }
  ]),
  ...["both", "none"].map((val): Rule<Theme> => [
    `clear-${val}`,
    { 'clear': val }
  ]),

  ['isolate', { 'isolation': 'isolate' }],
  ['isolation-auto', { 'isolation': 'auto' }],

  ...["contain", "cover", "fill", "none", "scale-down"].map((val): Rule<Theme> => [
    `object-${val}`,
    { 'object-fit': val }
  ]),

  // we are skipping a most object-position values because there are no logical counterparts yet
  ['object-center', { 'object-position': 'center' }],

  ...["auto", "hidden", "clip", "visible", "scroll"].flatMap((val): Rule<Theme>[] =>
    logical.axisRules('overflow', val, 'overflow', '', (pref, prop) => (simpleRule(pref, prop, val))),
  ),

  ...["auto", "contain", "none"].flatMap((val): Rule<Theme>[] =>
    logical.axisRules('overscroll', val, 'overscroll-behavior', '', (pref, prop) => (simpleRule(pref, prop, val))),
  ),

  ...["static", "fixed", "absolute", "relative", "sticky"].map((val): Rule<Theme> => [
    val,
    { 'position': val }
  ]),

  ...size.edgeRules('inset', '', 'inset', ''),

  ...["visible", "invisible", "collapse"].map((val): Rule<Theme> => [
    val,
    { 'visibility': val }
  ]),

  [
    new RegExp(`^z-(.+)$`),
    (match) => {return { 'z-index': match[2] }},
  ],

  // Flexbox & Grid

  size.rule('basis', 'flex-basis'),

  ...size.edgeRules('inset', '', 'inset', ''),

  ['flex-col', { 'flex-direction': 'column' }],
  ['flex-col-reverse', { 'flex-direction': 'column-reverse' }],
  ['flex-row', { 'flex-direction': 'row' }],
  ['flex-row-reverse', { 'flex-direction': 'row-reverse' }],

  ...["wrap", "wrap-reverse", "nowrap"].map((val): Rule<Theme> => [
    `flex-${val}`,
    { 'flex-wrap': val }
  ]),

  ['flex-1', { 'flex': '1 1 0%' }],
  ['flex-auto', { 'flex': '1 1 auto' }],
  ['flex-initial', { 'flex': '0 1 auto' }],
  ['flex-none', { 'flex': 'none' }],

  // TODO: Grow and Shrink need theme fractions
  ['grow', { 'flex-grow': '1' }],
  ['grow-0', { 'flex-grow': '0' }],
  ['shrink', { 'flex-shrink': '1' }],
  ['shrink-0', { 'flex-shrink': '0' }],

  // we are skipping first (-9999) and last (9999) becase that is jank af
  [
    new RegExp(`^(order)-(.+)$`),
    (match) => ({ 'order': match[2] }),
  ],
  ['order-none', { 'order': '0' }],

  ...[
    {
      ruleName: 'col',
      cssName: 'column',
    },
    {
      ruleName: 'row',
      cssName: 'row',
    },
  ].flatMap(({ cssName, ruleName }): Rule<Theme>[] => [
    [
      new RegExp(`^(grid-${ruleName}s)-(.+)$`),
      (match) => ({ ['grid-template-' + cssName + "s"]: `repeat(${match[2]}, minmax(0, 1fr))` }),
    ],
    // Tailwind doesn't have rules that do auto fit and auto fill, let's add them
    size.rule(`grid-fit-${ruleName}s`, `grid-template-${cssName}s`, (size) => (`repeat(auto-fit, minmax(${size}, 1fr))`)),
    size.rule(`grid-fill-${ruleName}s`, `grid-template-${cssName}s`, (size) => (`repeat(auto-fill, minmax(${size}, 1fr))`)),
    [`grid-${ruleName}s-none`, { ['grid-template-' + cssName + "s"]: 'none' }],
    [`${ruleName}-auto`, { ['grid-' + cssName]: 'auto' }],
    [
      new RegExp(`^(${ruleName}-span)-(.+)$`),
      (match) => ({ ['grid-' + cssName]: `span ${match[2]} / span ${match[2]}` }),
    ],
    [`${ruleName}-span-full`, { ['grid-' + cssName]: '1 / -1' }],
    [
      new RegExp(`^(${ruleName}-start)-(.+)$`),
      (match) => ({ ['grid-' + cssName + '-start']: match[2] }),
    ],
    [`${ruleName}-start-auto`, { ['grid-' + cssName + '-start']: 'auto' }],
    [
      new RegExp(`^(${ruleName}-end)-(.+)$`),
      (match) => ({ ['grid-' + cssName + '-end']: match[2] }),
    ],
    [`${ruleName}-end-auto`, { ['grid-' + cssName + '-end']: 'auto' }]
  ]),

  ['grid-flow-row', { 'grid-auto-flow': 'row' }],
  ['grid-flow-col', { 'grid-auto-flow': 'column' }],
  ['grid-flow-dense', { 'grid-auto-flow': 'dense' }],
  ['grid-flow-row-dense', { 'grid-auto-flow': 'row dense' }],
  ['grid-flow-col-dense', { 'grid-auto-flow': 'column desne' }],

  ...[
    {
      ruleName: 'cols',
      cssName: 'columns',
    },
    {
      ruleName: 'rows',
      cssName: 'rows',
    },
  ].flatMap(({ cssName, ruleName }): Rule<Theme>[] => [
    [`auto-${ruleName}-auto`, { ['grid-auto-' + cssName]: 'auto' }],
    [`auto-${ruleName}-min`, { ['grid-auto-' + cssName]: 'min-content' }],
    [`auto-${ruleName}-max`, { ['grid-auto-' + cssName]: 'max-content' }],
    [`auto-${ruleName}-fr`, { ['grid-auto-' + cssName]: 'minmax(0, 1fr)' }],
    // tailwind doesnt have length values for this rule, let's add them
    size.rule(`auto-${ruleName}`, `grid-auto-${cssName}`),
  ]),

  size.rule('gap', 'gap'),
  size.rule('gap-col', 'column-gap'),
  size.rule('gap-row', 'row-gap'),

  ['justify-start', { 'justify-content': 'start' }],
  ['justify-end', { 'justify-content': 'end' }],
  ['justify-center', { 'justify-content': 'center' }],
  ['justify-between', { 'justify-content': 'space-between' }],
  ['justify-around', { 'justify-content': 'space-around' }],
  ['justify-evenly', { 'justify-content': 'space-evenly' }],

  ['justify-items-start', { 'justify-items': 'start' }],
  ['justify-items-end', { 'justify-items': 'end' }],
  ['justify-items-center', { 'justify-items': 'center' }],
  ['justify-items-stretch', { 'justify-items': 'stretch' }],

  ['justify-self-auto', { 'justify-self': 'auto' }],
  ['justify-self-start', { 'justify-self': 'start' }],
  ['justify-self-end', { 'justify-self': 'end' }],
  ['justify-self-center', { 'justify-self': 'center' }],
  ['justify-self-stretch', { 'justify-self': 'stretch' }],

  ['content-center', { 'align-content': 'center' }],
  ['content-start', { 'align-content': 'start' }],
  ['content-end', { 'align-content': 'end' }],
  ['content-between', { 'align-content': 'space-between' }],
  ['content-around', { 'align-content': 'space-around' }],
  ['content-evenly', { 'align-content': 'space-evenly' }],
  ['content-baseline', { 'align-content': 'baseline' }],

  ['items-start', { 'align-items': 'start' }],
  ['items-end', { 'align-items': 'end' }],
  ['items-center', { 'align-items': 'center' }],
  ['items-baseline', { 'align-items': 'baseline' }],
  ['items-stretch', { 'align-items': 'stretch' }],

  ['self-auto', { 'align-self': 'auto' }],
  ['self-start', { 'align-self': 'start' }],
  ['self-end', { 'align-self': 'end' }],
  ['self-center', { 'align-self': 'center' }],
  ['self-stretch', { 'align-self': 'stretch' }],
  ['self-baseline', { 'align-self': 'baseline' }],

  ['place-content-center', { 'place-content': 'center' }],
  ['place-content-start', { 'place-content': 'start' }],
  ['place-content-end', { 'place-content': 'end' }],
  ['place-content-between', { 'place-content': 'space-between' }],
  ['place-content-around', { 'place-content': 'space-around' }],
  ['place-content-evenly', { 'place-content': 'space-evenly' }],
  ['place-content-baseline', { 'place-content': 'baseline' }],
  ['place-content-stretch', { 'place-content': 'stretch' }],

  ['place-items-start', { 'place-items': 'start' }],
  ['place-items-end', { 'place-items': 'end' }],
  ['place-items-center', { 'place-items': 'center' }],
  ['place-items-baseline', { 'place-items': 'baseline' }],
  ['place-items-stretch', { 'place-items': 'stretch' }],

  ['place-items-auto', { 'place-self': 'auto' }],
  ['place-items-start', { 'place-self': 'start' }],
  ['place-items-end', { 'place-self': 'end' }],
  ['place-items-center', { 'place-self': 'center' }],
  ['place-items-stretch', { 'place-self': 'stretch' }],

  // Spacing

  ...size.edgeRules('p', '', 'padding', ''),
  ...size.edgeRules('m', '', 'margin', ''),
  // we are skipping Space Between because we believe users should use flexbox instead

  // Sizing

  // Typography

  // Backgrounds

  // Borders

  // Effects

  // Filters

  // Tables

  // Transitions & Animations

  // Transforms

  // Interactivity

  // SVG

  // Accessibility



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
  ['highlight', { '--highlight': 'var(--base-highlight)' }],
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
  ...size.cornerRules('rounded', '', 'border', 'radius'),
  ...logical.cornerRules('rounded', 'full', 'border', 'radius', (pref, prop) => simpleRule(pref, prop, '999999px')),
  ...logical.edgeRules('border', 'color', 'border', 'color', colorRule),
  ...logical.edgeRules('border', 'color-fg', 'border', 'color', fgColorRule),

  // Typography
  colorRule('text', 'color'),
  fgColorRule('text-fg', 'color'),

  size.rule('text', 'font-size'),
  size.rule('line-height', 'line-height'),

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
  ...size.axisRules('size', '', '', 'size'),
  ...size.axisRules('min-size', '', 'min', 'size'),
  ...size.axisRules('max-size', '', 'max', 'size'),
  ...logical.axisRules('size', 'min-content', 'size', '', (pref, prop) => simpleRule(pref, prop, 'min-content')),
  ...logical.axisRules('size', 'max-content', 'size', '', (pref, prop) => simpleRule(pref, prop, 'max-content')),

  // Transitions
  ['transition', { 'transition': '100ms linear' }],
];

export default rules;
