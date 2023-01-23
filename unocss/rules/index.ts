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
    (match) => { return { 'z-index': match[2] } },
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

  ...size.axisRules('size', '', '', 'size'),
  ...size.axisRules('min-size', '', 'min', 'size'),
  ...size.axisRules('max-size', '', 'max', 'size'),
  // our sizing units do not include 'screen' (100vw / 100vh)
  // TODO: implement more fractions and unit overides

  // Typography

  // we are skipping font-family rule because in UnoCSS it is better that develoeprs set this up themselves

  size.rule('text', 'font-size'),

  // we are skipping font smoothing because we set it by default in preflight and it should never be changed

  ['italic', { 'font-style': 'italic' }],
  ['not-italic', { 'font-style': 'normal' }],

  ['font-thin', { 'font-weight': '100' }],
  ['font-extralight', { 'font-weight': '200' }],
  ['font-light', { 'font-weight': '300' }],
  ['font-normal', { 'font-weight': '400' }],
  ['font-medium', { 'font-weight': '500' }],
  ['font-semibold', { 'font-weight': '600' }],
  ['font-bold', { 'font-weight': '700' }],
  ['font-extrabold', { 'font-weight': '800' }],
  ['font-black', { 'font-weight': '900' }],

  ['normal-nums', { 'font-variant-numeric': 'normal' }],
  ['ordinal', { 'font-variant-numeric': 'ordinal' }],
  ['slashed-zero', { 'font-variant-numeric': 'slashed-zero' }],
  ['lining-nums', { 'font-variant-numeric': 'lining-nums' }],
  ['oldstyle-nums', { 'font-variant-numeric': 'oldstyle-nums' }],
  ['proportional-nums', { 'font-variant-numeric': 'proportional-nums' }],
  ['tabular-nums', { 'font-variant-numeric': 'tabular-nums' }],
  ['diagonal-fractions', { 'font-variant-numeric': 'diagonal-fractions' }],
  ['stacked-fractions', { 'font-variant-numeric': 'stacked-fractions' }],

  // we are substituting Tailwinds contants with size units
  size.rule('tracking', 'letter-spacing', (val) => val.replace('rem', 'em')),

  // we are substituting Tailwinds contants with size units
  // TODO: could really use custom units here
  size.rule('leading', 'line-height', (val) => val.replace('rem', '')),

  ['list-none', { 'list-style-type': 'none' }],
  ['list-disc', { 'list-style-type': 'disc' }],
  ['list-decimal', { 'list-style-type': 'decimal' }],

  ['list-inside', { 'list-style-position': 'inside' }],
  ['list-outside', { 'list-style-position': 'outside' }],

  ['text-start', { 'text-align': 'start' }],
  ['text-center', { 'text-align': 'center' }],
  ['text-end', { 'text-align': 'end' }],
  ['text-justify', { 'text-align': 'justify' }],

  // TODO: could use constant CSS colors like transparent, currentColor or inherit
  colorRule('text', 'color'),
  fgColorRule('text-fg', 'color'),

  ['underline', { 'text-decoration-line': 'underline' }],
  ['overline', { 'text-decoration-line': 'overline' }],
  ['line-through', { 'text-decoration-line': 'line-through' }],
  ['no-underline', { 'text-decoration-line': 'none' }], // this doesnt make sense,
  // ['no-line', { 'text-decoration-line': 'none' }], // this would make sense.

  colorRule('decoration', 'text-decoration-color'),
  fgColorRule('decoration-fg', 'text-decoration-color'),

  ['decoration-solid', { 'text-decoration-style': 'solid' }],
  ['decoration-double', { 'text-decoration-style': 'double' }],
  ['decoration-dotted', { 'text-decoration-style': 'dotted' }],
  ['decoration-dashed', { 'text-decoration-style': 'dashed' }],
  ['decoration-wavy', { 'text-decoration-style': 'wavy' }],

  // we use design tokens instead of preset pixel counts
  ['decoration-from-font', { 'text-decoration-thickness': 'from-font' }],
  size.rule('decoration', 'text-decoration-thickness'),

  // we use design tokens instead of preset pixel counts
  size.rule('underline-offset', 'text-underline-offset'),

  ['uppercase', { 'text-transform': 'uppercase' }],
  ['lowercase', { 'text-transform': 'lowercase' }],
  ['capitalize', { 'text-transform': 'capitalize' }],
  ['normal-case', { 'text-transform': 'none' }],

  ['text-ellipsis', {
    'overflow': 'hidden',
    'text-overflow': 'ellipsis',
    'white-space': 'nowrap',
  }],
  ['text-ellipsis', { 'text-overflow': 'ellipsis' }],
  ['text-clip', { 'text-overflow': 'clip' }],

  size.rule('indent', 'text-indent'),

  // TODO: check if this is not rtl-tb-dependent
  ['align-baseline', { 'vertical-align': 'baseline' }],
  ['align-top', { 'vertical-align': 'top' }],
  ['align-middle', { 'vertical-align': 'middle' }],
  ['align-bottom', { 'vertical-align': 'bottom' }],
  ['align-text-top', { 'vertical-align': 'text-top' }],
  ['align-text-bottom', { 'vertical-align': 'text-bottom' }],
  ['align-sub', { 'vertical-align': 'sub' }],
  ['align-super', { 'vertical-align': 'super' }],
  // TODO: could really use fractions here
  size.rule('align', 'vertical-align'),

  ['whitespace-normal', { 'white-space': 'normal' }],
  ['whitespace-nowrap', { 'white-space': 'nowrap' }],
  ['whitespace-pre', { 'white-space': 'pre' }],
  ['whitespace-pre-line', { 'white-space': 'pre-line' }],
  ['whitespace-pre-wrap', { 'white-space': 'pre-wrap' }],

  ['break-normal', { 'overflow-wrap': 'normal', 'word-break': 'normal' }],
  ['break-words', { 'overflow-wrap': 'break-word' }],
  ['break-all', { 'word-break': 'break-all' }],
  ['break-keep', { 'word-break': 'keep-all' }],

  ['content-none', { 'content': 'none' }],

  // Backgrounds

  ['bg-fixed', { 'background-attachment': '' }],
  ['bg-local', { 'background-attachment': 'local' }],
  ['bg-scroll', { 'background-attachment': 'scroll' }],

  ['bg-clip-border', { 'background-clip': 'border-box' }],
  ['bg-clip-padding', { 'background-clip': 'padding-box' }],
  ['bg-clip-content', { 'background-clip': 'content-box' }],
  ['bg-clip-text', { 'background-clip': 'text' }],

  colorBgRule('bg'),
  fgColorRule('bg-fg', 'background'),
  // TODO: we might need a set-fg rule that is the same as bg but does not actually ahcnge background color

  ['bg-origin-border', { 'background-origin': 'border-box' }],
  ['bg-origin-padding', { 'background-origin': 'padding-box' }],
  ['bg-origin-content', { 'background-origin': 'content-box' }],

  // we are skipping most most background-position values because there are no logical alternatives yet
  ['bg-center', { 'background-position': 'center' }],

  // TODO: check whether these are really logical properties
  ['bg-repeat', { 'background-repeat': 'repeat' }],
  ['bg-no-repeat', { 'background-repeat': 'no-repeat' }],
  ['bg-repeat-x', { 'background-repeat': 'repeat-x' }], // especially these two
  ['bg-repeat-y', { 'background-repeat': 'repeat-y' }], // especially these two
  ['bg-repeat-round', { 'background-repeat': 'round' }],
  ['bg-repeat-space', { 'background-repeat': 'space' }],

  ['bg-auto', { 'background-size': 'auto' }],
  ['bg-cover', { 'background-size': 'cover' }],
  ['bg-contain', { 'background-size': 'contain' }],

  ['bg-none', { 'background-image': 'none' }],
  ['bg-gradient-to-t', { 'background-image': 'linear-gradient(to top, var(--wb-gradient-stops))' }],
  ['bg-gradient-to-tr', { 'background-image': 'linear-gradient(to top right, var(--wb-gradient-stops))' }],
  ['bg-gradient-to-r', { 'background-image': 'linear-gradient(to right, var(--wb-gradient-stops))' }],
  ['bg-gradient-to-br', { 'background-image': 'linear-gradient(to bottom right, var(--wb-gradient-stops))' }],
  ['bg-gradient-to-b', { 'background-image': 'linear-gradient(to bottom, var(--wb-gradient-stops))' }],
  ['bg-gradient-to-bl', { 'background-image': 'linear-gradient(to bottom left, var(--wb-gradient-stops))' }],
  ['bg-gradient-to-l', { 'background-image': 'linear-gradient(to left, var(--wb-gradient-stops))' }],
  ['bg-gradient-to-tl', { 'background-image': 'linear-gradient(to top left, var(--wb-gradient-stops))' }],

  colorRule('from', '--wb-gradient-from'),
  colorRule('to', '--wb-gradient-to'),

  [new RegExp(`^(bg-gradient)-.*$`), () => ({ '--wb-gradient-stops': 'var(--wb-gradient-from, transparent), var(--wb-gradient-to, transparent)' })],
  // TODO implement 'via'
  // colorRule('via', '--wb-gradient-stops', (val) => `var(--wb-gradient-from, transparent), ${val}, var(--wb-gradient-to, transparent)`),

  // Borders

  ...size.cornerRules('rounded', '', 'border', 'radius'),
  ...logical.cornerRules('rounded', 'full', 'border', 'radius', (pref, prop) => simpleRule(pref, prop, '999999px')),
  ...logical.cornerRules('rounded', 'none', 'border', 'radius', (pref, prop) => simpleRule(pref, prop, 'none')),

  ...size.edgeRules('border', '', 'border', 'width'),
  ...logical.edgeRules('border', 'color', 'border', 'color', colorRule),
  ...logical.edgeRules('border', 'color-fg', 'border', 'color', fgColorRule),

  ['border-solid', { 'border-style': 'solid' }],
  ['border-dashed', { 'border-style': 'dashed' }],
  ['border-dotted', { 'border-style': 'dotted' }],
  ['border-double', { 'border-style': 'double' }],
  ['border-hidden', { 'border-style': 'hidden' }],
  ['border-none', { 'border-style': 'none' }],

  // we are skipping Devides becasue we believe it does not fit with the architecture

  size.rule('outline', 'outline-width'),
  colorRule('outline', 'outline-color'),

  ['outline-none', { 'outline': '0px solid transparent', 'outline-offset': '0px' }],
  ['outline', { 'outline-style': 'solid' }],
  ['outline-dashed', { 'outline-style': 'dashed' }],
  ['outline-dotted', { 'outline-style': 'dotted' }],
  ['outline-double', { 'outline-style': 'double' }],

  size.rule('outline-offset', 'outline-offset'),

  // we are skipping Rings becasue we believe it does not fit with the architecture

  // Effects

  // Filters

  // Tables

  // Transitions & Animations

  // Transforms

  // Interactivity

  // SVG

  // Accessibility

  // Old Windblade (TODO: re-sort)
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

  colorRule('fill', 'fill'),
  fgColorRule('fill-fg', 'fill'),

  ['transition', { 'transition': '100ms linear' }],
];

export default rules;
