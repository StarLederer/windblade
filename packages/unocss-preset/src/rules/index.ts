import type { Rule } from '@unocss/core'
import { grids } from '@unocss/preset-mini/rules'

import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

import * as layout from './documented/layout'
import * as flexboxAndGrid from './documented/flexboxAndGrid'
import * as spacing from './documented/spacing'
import * as sizing from './documented/sizing'
import * as backgrounds from './documented/backgrounds'
import * as typography from './documented/typography'
import * as borders from './documented/borders'
import * as effects from './documented/effects'
import * as filters from './documented/filters'
import * as tables from './documented/tables'
import * as transitionsAndAnimation from './documented/transitionsAndAnimation'
import * as transforms from './documented/transforms'
import * as interactivity from './documented/interactivity'
import * as svg from './documented/svg'

const { logical, size } = ruleUtils

type Theme = theme.Theme

const rules: Rule<Theme>[] = [
  // Layout
  ...layout.aspectRatio().rules,
  ...layout.container().rules,

  [
    /^(columns)-(.+)$/,
    (match, { theme }) => {
      const values = match[2].split(',')
      const minWidth = size.resolve(values[0], theme, 'rem')
      const maxNumCols = values[1]
      return { columns: [minWidth, maxNumCols].join(' ') }
    },
  ],

  ...layout.breakAfter().rules,
  ...layout.breakBefore().rules,

  ...['auto', 'avoid', 'all', 'avoid-page', 'avoid-column'].map((val): Rule<Theme> => [
    `break-inside-${val}`,
    { 'break-inside': val },
  ]),

  ...['clone', 'slice'].map((val): Rule<Theme> => [
    `box-decoration-${val}`,
    { 'box-decoration': val },
  ]),

  ...['border', 'content'].map((val): Rule<Theme> => [
    `box-${val}`,
    { 'box-sizing': `${val}-box` },
  ]),

  ...layout.display().rules,

  ...(Object.keys(logical.abbreviations.inlineEdges) as Array<keyof typeof logical.abbreviations.inlineEdges>).map((val): Rule<Theme> => [
    `float-${val}`,
    { float: logical.abbreviations.inlineEdges[val] },
  ]),
  ['float-none', { float: 'none' }],

  ...(Object.keys(logical.abbreviations.inlineEdges) as Array<keyof typeof logical.abbreviations.inlineEdges>).map((val): Rule<Theme> => [
    `clear-${val}`,
    { clear: logical.abbreviations.inlineEdges[val] },
  ]),
  ...['both', 'none'].map((val): Rule<Theme> => [
    `clear-${val}`,
    { clear: val },
  ]),

  ['isolate', { isolation: 'isolate' }],
  ['isolation-auto', { isolation: 'auto' }],

  ...['contain', 'cover', 'fill', 'none', 'scale-down'].map((val): Rule<Theme> => [
    `object-${val}`,
    { 'object-fit': val },
  ]),

  ...layout.objectPosition().rules,

  ...['auto', 'hidden', 'clip', 'visible', 'scroll'].flatMap((val): Rule<Theme>[] =>
    logical.axisRules('overflow', val, 'overflow', '', (pref, prop) => [pref, { [prop]: val }]),
  ),

  ...['auto', 'contain', 'none'].flatMap((val): Rule<Theme>[] =>
    logical.axisRules('overscroll', val, 'overscroll-behavior', '', (pref, prop) => [pref, { [prop]: val }]),
  ),

  ...['static', 'fixed', 'absolute', 'relative', 'sticky'].map((val): Rule<Theme> => [
    val,
    { position: val },
  ]),

  ...size.edgeRules('inset', '', 'inset', ''),

  ...['visible', 'invisible', 'collapse'].map((val): Rule<Theme> => [
    val,
    { visibility: val.replace('invisible', 'hidden') },
  ]),

  [
    /^z-(.+)$/,
    (match) => { return { 'z-index': match[2] } },
  ],

  // Flexbox & Grid

  size.rule('basis', 'flex-basis'),

  ...size.edgeRules('inset', '', 'inset', ''),

  ['flex-col', { 'flex-direction': 'column' }],
  ['flex-col-reverse', { 'flex-direction': 'column-reverse' }],
  ['flex-row', { 'flex-direction': 'row' }],
  ['flex-row-reverse', { 'flex-direction': 'row-reverse' }],

  ...['wrap', 'wrap-reverse', 'nowrap'].map((val): Rule<Theme> => [
    `flex-${val}`,
    { 'flex-wrap': val },
  ]),

  ['flex-1', { flex: '1 1 0%' }],
  ['flex-auto', { flex: '1 1 auto' }],
  ['flex-initial', { flex: '0 1 auto' }],
  ['flex-none', { flex: 'none' }],

  // TODO: Grow and Shrink need theme fractions
  ['grow', { 'flex-grow': '1' }],
  ['grow-0', { 'flex-grow': '0' }],
  ['shrink', { 'flex-shrink': '1' }],
  ['shrink-0', { 'flex-shrink': '0' }],

  // we are skipping first (-9999) and last (9999) becase that is jank af
  [
    /^(order)-(.+)$/,
    match => ({ order: match[2] }),
  ],
  ['order-none', { order: '0' }],

  // ...[
  //   {
  //     ruleName: 'col',
  //     cssName: 'column',
  //   },
  //   {
  //     ruleName: 'row',
  //     cssName: 'row',
  //   },
  // ].flatMap(({ cssName, ruleName }): Rule<Theme>[] => [
  //   [
  //     new RegExp(`^(grid-${ruleName}s)-(.+)$`),
  //     (match) => ({ ['grid-template-' + cssName + "s"]: `repeat(${match[2]}, minmax(0, 1fr))` }),
  //   ],
  //   [`grid-${ruleName}s-none`, { ['grid-template-' + cssName + "s"]: 'none' }],
  //   [`${ruleName}-auto`, { ['grid-' + cssName]: 'auto' }],
  //   [
  //     new RegExp(`^(${ruleName}-span)-(.+)$`),
  //     (match) => ({ ['grid-' + cssName]: `span ${match[2]} / span ${match[2]}` }),
  //   ],
  //   [`${ruleName}-span-full`, { ['grid-' + cssName]: '1 / -1' }],
  //   [
  //     new RegExp(`^(${ruleName}-start)-(.+)$`),
  //     (match) => ({ ['grid-' + cssName + '-start']: match[2] }),
  //   ],
  //   [`${ruleName}-start-auto`, { ['grid-' + cssName + '-start']: 'auto' }],
  //   [
  //     new RegExp(`^(${ruleName}-end)-(.+)$`),
  //     (match) => ({ ['grid-' + cssName + '-end']: match[2] }),
  //   ],
  //   [`${ruleName}-end-auto`, { ['grid-' + cssName + '-end']: 'auto' }]
  // ]),
  ...(grids as Rule<Theme>[]),

  ...flexboxAndGrid.gridFitCols().rules,
  ...flexboxAndGrid.gridFillCols().rules,
  ...flexboxAndGrid.gridFitRows().rules,
  ...flexboxAndGrid.gridFillRows().rules,

  // ['grid-flow-row', { 'grid-auto-flow': 'row' }],
  // ['grid-flow-col', { 'grid-auto-flow': 'column' }],
  // ['grid-flow-dense', { 'grid-auto-flow': 'dense' }],
  // ['grid-flow-row-dense', { 'grid-auto-flow': 'row dense' }],
  // ['grid-flow-col-dense', { 'grid-auto-flow': 'column desne' }],

  ...flexboxAndGrid.gridAutoCols().rules,
  ...flexboxAndGrid.gridAutoRows().rules,

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

  ...spacing.padding().rules,
  ...spacing.margin().rules,
  ...spacing.spaceBetween().rules,

  // Sizing

  ...sizing.widthHeight().rules,
  ...sizing.size().rules,
  ...sizing.minSize().rules,
  ...sizing.maxSize().rules,

  // Backgrounds

  ['bg-fixed', { 'background-attachment': '' }],
  ['bg-local', { 'background-attachment': 'local' }],
  ['bg-scroll', { 'background-attachment': 'scroll' }],

  ['bg-clip-border', { 'background-clip': 'border-box' }],
  ['bg-clip-padding', { 'background-clip': 'padding-box' }],
  ['bg-clip-content', { 'background-clip': 'content-box' }],
  ['bg-clip-text', { 'background-clip': 'text' }],

  // background color is in /src/presets/color

  ['bg-origin-border', { 'background-origin': 'border-box' }],
  ['bg-origin-padding', { 'background-origin': 'padding-box' }],
  ['bg-origin-content', { 'background-origin': 'content-box' }],

  ...backgrounds.backgroundPosition().rules,

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

  // background-image is in /src/presets/color
  // background-color-stops is in /src/presets/color

  // Typography
  ...typography.fontFamily().rules,
  ...typography.fontSize().rules,
  ...typography.fontSmoothing().rules,

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

  ...typography.tracking().rules,
  ...typography.leading().rules,

  ['list-none', { 'list-style-type': 'none' }],
  ['list-disc', { 'list-style-type': 'disc' }],
  ['list-decimal', { 'list-style-type': 'decimal' }],

  ['list-inside', { 'list-style-position': 'inside' }],
  ['list-outside', { 'list-style-position': 'outside' }],

  ['text-start', { 'text-align': 'start' }],
  ['text-center', { 'text-align': 'center' }],
  ['text-end', { 'text-align': 'end' }],
  ['text-justify', { 'text-align': 'justify' }],

  // text color is in /src/presets/color

  ['underline', { 'text-decoration-line': 'underline' }],
  ['overline', { 'text-decoration-line': 'overline' }],
  ['line-through', { 'text-decoration-line': 'line-through' }],
  ['no-underline', { 'text-decoration-line': 'none' }], // this doesnt make sense,
  // ['no-line', { 'text-decoration-line': 'none' }], // this would make sense.

  // text decoration color is in /src/presets/color

  ['decoration-solid', { 'text-decoration-style': 'solid' }],
  ['decoration-double', { 'text-decoration-style': 'double' }],
  ['decoration-dotted', { 'text-decoration-style': 'dotted' }],
  ['decoration-dashed', { 'text-decoration-style': 'dashed' }],
  ['decoration-wavy', { 'text-decoration-style': 'wavy' }],

  ...typography.textDecorationThickness().rules,
  ...typography.textUnderlineOffset().rules,

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

  ['content-none', { content: 'none' }],

  // Borders
  ...borders.borderRadius().rules,
  [/^(border)$/, () => ({
    'border-style': 'solid',
    'border-width': '1px',
  })],
  ...borders.borderWidth().rules,
  // border-color is in /src/presets/color
  ['border-solid', { 'border-style': 'solid' }],
  ['border-dashed', { 'border-style': 'dashed' }],
  ['border-dotted', { 'border-style': 'dotted' }],
  ['border-double', { 'border-style': 'double' }],
  ['border-hidden', { 'border-style': 'hidden' }],
  ['border-none', { 'border-style': 'none' }],
  ...borders.divide().rules,
  ...borders.outlineWidth().rules,
  // outline-color is in /src/presets/color
  ['outline-none', { 'outline': '0px solid transparent', 'outline-offset': '0px' }],
  ['outline', { 'outline-style': 'solid' }],
  ['outline-dashed', { 'outline-style': 'dashed' }],
  ['outline-dotted', { 'outline-style': 'dotted' }],
  ['outline-double', { 'outline-style': 'double' }],
  ...borders.outlineOffset().rules,
  ...borders.ring().rules,

  // Effects
  ...effects.boxShadow().rules,
  ...effects.opacity().rules,
  ['mix-blend-normal', { 'mix-blend-mode': 'normal' }],
  ['mix-blend-multiply', { 'mix-blend-mode': 'multiply' }],
  ['mix-blend-screen', { 'mix-blend-mode': 'screen' }],
  ['mix-blend-overlay', { 'mix-blend-mode': 'overlay' }],
  ['mix-blend-darken', { 'mix-blend-mode': 'darken' }],
  ['mix-blend-lighten', { 'mix-blend-mode': 'lighten' }],
  ['mix-blend-color-dodge', { 'mix-blend-mode': 'color-dodge' }],
  ['mix-blend-color-burn', { 'mix-blend-mode': 'color-burn' }],
  ['mix-blend-hard-light', { 'mix-blend-mode': 'hard-light' }],
  ['mix-blend-soft-light', { 'mix-blend-mode': 'soft-light' }],
  ['mix-blend-difference', { 'mix-blend-mode': 'difference' }],
  ['mix-blend-exclusion', { 'mix-blend-mode': 'exclusion' }],
  ['mix-blend-hue', { 'mix-blend-mode': 'hue' }],
  ['mix-blend-saturation', { 'mix-blend-mode': 'saturation' }],
  ['mix-blend-color', { 'mix-blend-mode': 'color' }],
  ['mix-blend-luminosity', { 'mix-blend-mode': 'luminosity' }],
  ['mix-blend-plus-lighter', { 'mix-blend-mode': 'plus-lighter' }],
  ['bg-blend-normal', { 'background-blend-mode': 'normal' }],
  ['bg-blend-multiply', { 'background-blend-mode': 'multiply' }],
  ['bg-blend-screen', { 'background-blend-mode': 'screen' }],
  ['bg-blend-overlay', { 'background-blend-mode': 'overlay' }],
  ['bg-blend-darken', { 'background-blend-mode': 'darken' }],
  ['bg-blend-lighten', { 'background-blend-mode': 'lighten' }],
  ['bg-blend-color-dodge', { 'background-blend-mode': 'color-dodge' }],
  ['bg-blend-color-burn', { 'background-blend-mode': 'color-burn' }],
  ['bg-blend-hard-light', { 'background-blend-mode': 'hard-light' }],
  ['bg-blend-soft-light', { 'background-blend-mode': 'soft-light' }],
  ['bg-blend-difference', { 'background-blend-mode': 'difference' }],
  ['bg-blend-exclusion', { 'background-blend-mode': 'exclusion' }],
  ['bg-blend-hue', { 'background-blend-mode': 'hue' }],
  ['bg-blend-saturation', { 'background-blend-mode': 'saturation' }],
  ['bg-blend-color', { 'background-blend-mode': 'color' }],
  ['bg-blend-luminosity', { 'background-blend-mode': 'luminosity' }],

  // Filters
  size.rule('blur', 'filter', { postprocess: val => `blur(${val})` }),
  size.rule('brightness', 'filter', { postprocess: val => `brightness(${val})` }),
  size.rule('contrast', 'filter', { postprocess: val => `contrast(${val})` }),
  ...filters.dropShadow().rules,
  size.rule('grayscale', 'filter', { postprocess: val => `grayscale(${val})` }),
  size.rule('hue-rotate', 'filter', { postprocess: val => `hue-rotate(${Number(val) * 360}deg)`, defaultUnit: '' }),
  size.rule('invert', 'filter', { postprocess: val => `invert(${val})` }),
  size.rule('saturate', 'filter', { postprocess: val => `saturate(${val})` }),
  size.rule('sepia', 'filter', { postprocess: val => `sepia(${val})` }),
  size.rule('backdrop-blur', 'backdrop-filter', { postprocess: val => `blur(${val})` }),
  size.rule('backdrop-brightness', 'backdrop-filter', { postprocess: val => `brightness(${val})` }),
  size.rule('backdrop-contrast', 'backdrop-filter', { postprocess: val => `contrast(${val})` }),
  size.rule('backdrop-grayscale', 'backdrop-filter', { postprocess: val => `grayscale(${val})` }),
  size.rule('backdrop-hue-rotate', 'backdrop-filter', { postprocess: val => `hue-rotate(${Number(val) * 360}deg)`, defaultUnit: '' }),
  size.rule('backdrop-invert', 'backdrop-filter', { postprocess: val => `invert(${val})` }),
  size.rule('backdrop-opacity', 'backdrop-filter', { postprocess: val => `opacity(${val})` }),
  size.rule('backdrop-saturate', 'backdrop-filter', { postprocess: val => `saturate(${val})` }),
  size.rule('backdrop-sepia', 'backdrop-filter', { postprocess: val => `sepia(${val})` }),

  // Tables
  ['border-collapse', { 'border-collapse': 'collapse' }],
  ['border-separate', { 'border-collapse': 'separate' }],
  ...tables.borderSpacing().rules,
  ['table-auto', { 'table-layout': 'auto' }],
  ['table-fixed', { 'table-layout': 'fixed' }],

  // Transitions & Animations
  ['transition-none', { 'transition-property': 'none' }],
  [/^(transition-all)$/, (_, { theme }) => ({
    'transition': 'all',
    'transition-timing-function': theme.windblade.time.functions.default,
    'transition-duration': `${theme.windblade.time.baseUnitMs}ms`,
  })],
  [/^(transition)$/, (_, { theme }) => ({
    'transition': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
    'transition-timing-function': theme.windblade.time.functions.default,
    'transition-duration': `${theme.windblade.time.baseUnitMs}ms`,
  })],
  [/^(transition-colors)$/, (_, { theme }) => ({
    'transition': 'color, background-color, border-color, text-decoration-color, fill, stroke    ',
    'transition-timing-function': theme.windblade.time.functions.default,
    'transition-duration': `${theme.windblade.time.baseUnitMs}ms`,
  })],
  [/^(transition-opacity)$/, (_, { theme }) => ({
    'transition': 'opacity',
    'transition-timing-function': theme.windblade.time.functions.default,
    'transition-duration': `${theme.windblade.time.baseUnitMs}ms`,
  })],
  [/^(transition-shadow)$/, (_, { theme }) => ({
    'transition': 'box-shadow',
    'transition-timing-function': theme.windblade.time.functions.default,
    'transition-duration': `${theme.windblade.time.baseUnitMs}ms`,
  })],
  [/^(transition-transform)$/, (_, { theme }) => ({
    'transition': 'transform',
    'transition-timing-function': theme.windblade.time.functions.default,
    'transition-duration': `${theme.windblade.time.baseUnitMs}ms`,
  })],
  ...transitionsAndAnimation.transitionDelayAndDuration().rules,
  ...transitionsAndAnimation.transitionTimingFunction().rules,
  ...transitionsAndAnimation.animation().rules,
  ...transitionsAndAnimation.animationDelayAndDuration().rules,
  ...transitionsAndAnimation.animationTimingFunction().rules,

  // Transforms
  ...transforms.scale().rules,
  ...transforms.rotate().rules,
  ...transforms.translate().rules,
  ...transforms.skew().rules,

  ['origin-ss', { 'transform-origin': 'var(--start-start)' }],
  ['origin-bs', { 'transform-origin': 'var(--block-start)' }],
  ['origin-es', { 'transform-origin': 'var(--end-start)' }],
  ['origin-is', { 'transform-origin': 'var(--inline-start)' }],
  ['origin-center', { 'transform-origin': 'center' }],
  ['origin-ie', { 'transform-origin': 'var(--inline-start)' }],
  ['origin-se', { 'transform-origin': 'var(--start-end)' }],
  ['origin-be', { 'transform-origin': 'var(--block-end)' }],
  ['origin-ee', { 'transform-origin': 'var(--end-end)' }],

  // Interactivity
  // accent-color is in /src/presets/color

  ['appearance-none', { appearance: 'none' }],

  ['cursor-auto', { cursor: 'auto' }],
  ['cursor-default', { cursor: 'default' }],
  ['cursor-pointer', { cursor: 'pointer' }],
  ['cursor-wait', { cursor: 'wait' }],
  ['cursor-text', { cursor: 'text' }],
  ['cursor-move', { cursor: 'move' }],
  ['cursor-help', { cursor: 'help' }],
  ['cursor-not-allowed', { cursor: 'not-allowed' }],
  ['cursor-none', { cursor: 'none' }],
  ['cursor-context-menu', { cursor: 'context-menu' }],
  ['cursor-progress', { cursor: 'progress' }],
  ['cursor-cell', { cursor: 'cell' }],
  ['cursor-crosshair', { cursor: 'crosshair' }],
  ['cursor-vertical-text', { cursor: 'vertical-text' }],
  ['cursor-alias', { cursor: 'alias' }],
  ['cursor-copy', { cursor: 'copy' }],
  ['cursor-no-drop', { cursor: 'no-drop' }],
  ['cursor-grab', { cursor: 'grab' }],
  ['cursor-grabbing', { cursor: 'grabbing' }],
  ['cursor-all-scroll', { cursor: 'all-scroll' }],
  ['cursor-col-resize', { cursor: 'col-resize' }],
  ['cursor-row-resize', { cursor: 'row-resize' }],
  ['cursor-n-resize', { cursor: 'n-resize' }],
  ['cursor-e-resize', { cursor: 'e-resize' }],
  ['cursor-s-resize', { cursor: 's-resize' }],
  ['cursor-w-resize', { cursor: 'w-resize' }],
  ['cursor-ne-resize', { cursor: 'ne-resize' }],
  ['cursor-nw-resize', { cursor: 'nw-resize' }],
  ['cursor-se-resize', { cursor: 'se-resize' }],
  ['cursor-sw-resize', { cursor: 'sw-resize' }],
  ['cursor-ew-resize', { cursor: 'ew-resize' }],
  ['cursor-ns-resize', { cursor: 'ns-resize' }],
  ['cursor-nesw-resize', { cursor: 'nesw-resize' }],
  ['cursor-nwse-resize', { cursor: 'nwse-resize' }],
  ['cursor-zoom-in', { cursor: 'zoom-in' }],
  ['cursor-zoom-out', { cursor: 'zoom-out' }],

  // caret-color is in /src/presets/color

  ['pointer-events-none', { 'pointer-events': 'none' }],
  ['pointer-events-auto', { 'pointer-events': 'auto' }],

  ['resize-none', { resize: 'none' }],
  ['resize-b', { resize: 'block' }],
  ['resize-i', { resize: 'inline' }],
  ['resize', { resize: 'both' }],

  ['scroll-auto', { 'scroll-behavior': 'auto' }],
  ['scroll-smooth', { 'scroll-behavior': 'smooth' }],

  ...interactivity.scrollMargin().rules,
  ...interactivity.scrollPadding().rules,

  ['snap-start', { 'scroll-snap-align': 'start' }],
  ['snap-end', { 'scroll-snap-align': 'end' }],
  ['snap-center', { 'scroll-snap-align': 'center' }],
  ['snap-align-none', { 'scroll-snap-align': 'none' }],

  ['snap-normal', { 'scroll-snap-stop': 'normal' }],
  ['snap-always', { 'scroll-snap-stop': 'always' }],

  ...interactivity.scrollSnapType().rules,
  ...interactivity.touchAction().rules,

  ['select-none', { 'user-select': 'none' }],
  ['select-text', { 'user-select': 'text' }],
  ['select-all', { 'user-select': 'all' }],
  ['select-auto', { 'user-select': 'auto' }],

  ['will-change-auto', { 'will-change': 'auto' }],
  ['will-change-scroll', { 'will-change': 'scroll-position' }],
  ['will-change-contents', { 'will-change': 'contents' }],
  ['will-change-transform', { 'will-change': 'transform' }],

  // SVG
  // fill is in /src/presets/color
  // stroke is in /src/presets/color
  ...svg.strokeWidth().rules,

  // Accessibility

  ['sr-only', {
    'position': 'absolute',
    'block-size': '1px',
    'inline-size': '1px',
    'padding': '0',
    'margin': '-1px',
    'overflow': 'hidden',
    'clip': 'rect(0, 0, 0, 0)',
    'white-space': 'nowrap',
    'border-width': '0',
  }],

  ['not-sr-only', {
    'position': 'static',
    'block-size': 'auto',
    'inline-size': 'auto',
    'padding': '0',
    'margin': '0',
    'overflow': 'visible',
    'clip': 'auto',
    'white-space': 'normal',
  }],

  // Internationalization
  // Tailwind doesn't have this category
  // TODO: We don't need this, this can be done using CSS selecteors automatically

  ['horizontal-tb', {
    'writing-mode': 'horizontal-tb',
    '--block-start': 'top',
    '--block-end': ' bottom',
    '--inline-start': 'left',
    '--inline-end': 'right',
    '--start-start': 'top left',
    '--start-end': 'top right',
    '--end-start': 'bottom left',
    '--end-end': 'bottom right',
  }],
  ['vertical-lr', {
    'writing-mode': 'vertical-lr',
    '--block-start': 'left',
    '--block-end': 'right',
    '--inline-start': 'top',
    '--inline-end': 'bottom',
    '--start-start': 'top left',
    '--start-end': 'top right',
    '--end-start': 'bottom left',
    '--end-end': 'bottom right',
  }],
  ['vertical-rl', {
    'writing-mode': 'vertical-rl',
    '--block-start': 'right',
    '--block-end': 'left',
    '--inline-start': 'top',
    '--inline-end': 'bottom',
    '--start-start': 'top right',
    '--start-end': 'top left',
    '--end-start': 'bottom right',
    '--end-end': 'bottom left',
  }],
]

export default rules
