import type { DocumentationTree } from '@windblade/unocss-docs'
import { docs } from '@windblade/unocss-preset-color'

import * as layout from '../../rules/documented/layout'
import * as flexboxAndGrid from '../../rules/documented/flexboxAndGrid'
import * as spacing from '../../rules/documented/spacing'
import * as sizing from '../../rules/documented/sizing'
import * as backgrounds from '../../rules/documented/backgrounds'
import * as typography from '../../rules/documented/typography'
import * as borders from '../../rules/documented/borders'
import * as effects from '../../rules/documented/effects'
import * as filters from '../../rules/documented/filters'
import * as tables from '../../rules/documented/tables'
import * as transitionsAndAnimation from '../../rules/documented/transitionsAndAnimation'
import * as transforms from '../../rules/documented/transforms'
import * as interactivity from '../../rules/documented/interactivity'
import * as svg from '../../rules/documented/svg'

const main: DocumentationTree = new Map([
  ['Layout', new Map([
    ['Aspect Ratio', layout.aspectRatio().docs],
    ['Container', layout.container().docs],
    ['Break After', layout.breakAfter().docs],
    ['Break Before', layout.breakBefore().docs],
    ['Disaply', layout.display().docs],
    ['Object Position', layout.objectPosition().docs],
  ])],
  ['Flexbox & Grid', new Map([
    ['Grid Auto Columns', flexboxAndGrid.gridAutoCols().docs],
    ['Grid Auto Rows', flexboxAndGrid.gridAutoRows().docs],
    ['Grid Fit Columns', flexboxAndGrid.gridFitCols().docs],
    ['Grid Fit Rows', flexboxAndGrid.gridFitRows().docs],
    ['Grid Fill Clumns', flexboxAndGrid.gridFillCols().docs],
    ['Grid Fill Rows', flexboxAndGrid.gridFillRows().docs],
  ])],
  ['Spacing', new Map([
    ['Padding', spacing.padding().docs],
    ['Margin', spacing.margin().docs],
    ['Space between', spacing.spaceBetween().docs],
  ])],
  ['Sizing', new Map([
    ['Width & Height', sizing.widthHeight().docs],
    ['Size', sizing.size().docs],
    ['Min-Size', sizing.minSize().docs],
    ['Max-Size', sizing.maxSize().docs],
  ])],
  ['Background', new Map([
    ['Color', docs.rules.backgrounds.bgColor().docs],
    ['Background Position', backgrounds.backgroundPosition().docs],
  ])],
  ['Typography', new Map([
    ['Font Family', typography.fontFamily().docs],
    ['Font Size', typography.fontSize().docs],
    ['Font Smoothing', typography.fontSmoothing().docs],
    ['Letter Spacing', typography.tracking().docs],
    ['Line Height', typography.leading().docs],
    ['Text Color', docs.rules.typography.textColor().docs],
    ['Text Decoration Color', docs.rules.typography.textDecorationColor().docs],
    ['Text Decoration Thickness', typography.textDecorationThickness().docs],
    ['Text Underline Offset', typography.textUnderlineOffset().docs],
  ])],
  ['Borders', new Map([
    ['Border Radius', borders.borderRadius().docs],
    ['Border Width', borders.borderWidth().docs],
    ['Border Color', docs.rules.borders.borderColor().docs],
    ['Outline Width', borders.outlineWidth().docs],
    ['Outline Offset', borders.outlineOffset().docs],
    ['Outline Color', docs.rules.borders.outlineColor().docs],
    ['Divide', borders.divide().docs],
    ['Ring', borders.ring().docs],
  ])],
  ['Effects', new Map([
    ['Box Shadow', effects.boxShadow().docs],
    ['Opacity', effects.opacity().docs],
  ])],
  ['Filters', new Map([
    ['Drop Shadow', filters.dropShadow().docs],
  ])],
  ['Tables', new Map([
    ['Border spacing', tables.borderSpacing().docs],
  ])],
  ['Transitions & Animation', new Map([
    ['Transition Delay & Duration', transitionsAndAnimation.transitionDelayAndDuration().docs],
    ['Transition Timing Function', transitionsAndAnimation.transitionTimingFunction().docs],
    ['Animations', transitionsAndAnimation.animation().docs],
    ['Animation Delay & Duration', transitionsAndAnimation.animationDelayAndDuration().docs],
    ['Animation Timing Function', transitionsAndAnimation.animationTimingFunction().docs],
  ])],
  ['Transforms', new Map([
    ['Scale', transforms.scale().docs],
    ['Rotate', transforms.rotate().docs],
    ['Translate', transforms.translate().docs],
    ['Skew', transforms.skew().docs],
  ])],
  ['Interactivity', new Map([
    ['Scroll margin', interactivity.scrollMargin().docs],
    ['Scroll padding', interactivity.scrollPadding().docs],
    ['Scroll snap type', interactivity.scrollSnapType().docs],
    ['Touch action', interactivity.touchAction().docs],
  ])],
  ['SVG', new Map([
    ['Fill', docs.rules.svg.fill().docs],
    ['Stroke Color', docs.rules.svg.stroke().docs],
    ['Stroke Width', svg.strokeWidth().docs],
  ])],
  ['Accessibility', new Map([
    ['Color Scheme', docs.rules.accessibility.colorScheme().docs],
  ])],
])

export default main
