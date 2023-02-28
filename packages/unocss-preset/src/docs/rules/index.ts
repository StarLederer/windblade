import type { DocumentationCategories } from 'unocss-docs'
import type { theme } from '@windblade/core'
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

const main: DocumentationCategories<theme.Theme> = new Map([
  ['Layout', new Map([
    ['Aspect Ratio', layout.aspectRatio()],
    ['Container', layout.container()],
    ['Break After', layout.breakAfter()],
    ['Break Before', layout.breakBefore()],
    ['Disaply', layout.display()],
    ['Object Position', layout.objectPosition()],
  ])],
  ['Flexbox & Grid', new Map([
    ['Grid Auto Columns', flexboxAndGrid.gridAutoCols()],
    ['Grid Auto Rows', flexboxAndGrid.gridAutoRows()],
    ['Grid Fit Columns', flexboxAndGrid.gridFitCols()],
    ['Grid Fit Rows', flexboxAndGrid.gridFitRows()],
    ['Grid Fill Clumns', flexboxAndGrid.gridFillCols()],
    ['Grid Fill Rows', flexboxAndGrid.gridFillRows()],
  ])],
  ['Spacing', new Map([
    ['Padding', spacing.padding()],
    ['Margin', spacing.margin()],
    ['Space between', spacing.spaceBetween()],
  ])],
  ['Sizing', new Map([
    ['Width & Height', sizing.widthHeight()],
    ['Size', sizing.size()],
    ['Min-Size', sizing.minSize()],
    ['Max-Size', sizing.maxSize()],
  ])],
  ['Background', new Map([
    ['Color', docs.rules.backgrounds.bgColor()],
    ['Background Position', backgrounds.backgroundPosition()],
  ])],
  ['Typography', new Map([
    ['Font Family', typography.fontFamily()],
    ['Font Size', typography.fontSize()],
    ['Font Smoothing', typography.fontSmoothing()],
    ['Letter Spacing', typography.tracking()],
    ['Line Height', typography.leading()],
    ['Text Color', docs.rules.typography.textColor()],
    ['Text Decoration Color', docs.rules.typography.textDecorationColor()],
    ['Text Decoration Thickness', typography.textDecorationThickness()],
    ['Text Underline Offset', typography.textUnderlineOffset()],
  ])],
  ['Borders', new Map([
    ['Border Radius', borders.borderRadius()],
    ['Border Width', borders.borderWidth()],
    ['Border Color', docs.rules.borders.borderColor()],
    ['Outline Width', borders.outlineWidth()],
    ['Outline Offset', borders.outlineOffset()],
    ['Outline Color', docs.rules.borders.outlineColor()],
    ['Divide', borders.divide()],
    ['Ring', borders.ring()],
  ])],
  ['Effects', new Map([
    ['Box Shadow', effects.boxShadow()],
    ['Opacity', effects.opacity()],
  ])],
  ['Filters', new Map([
    ['Drop Shadow', filters.dropShadow()],
  ])],
  ['Tables', new Map([
    ['Border spacing', tables.borderSpacing()],
  ])],
  ['Transitions & Animation', new Map([
    ['Transition Delay & Duration', transitionsAndAnimation.transitionDelayAndDuration()],
    ['Transition Timing Function', transitionsAndAnimation.transitionTimingFunction()],
    ['Animations', transitionsAndAnimation.animation()],
    ['Animation Delay & Duration', transitionsAndAnimation.animationDelayAndDuration()],
    ['Animation Timing Function', transitionsAndAnimation.animationTimingFunction()],
  ])],
  ['Transforms', new Map([
    ['Scale', transforms.scale()],
    ['Rotate', transforms.rotate()],
    ['Translate', transforms.translate()],
    ['Skew', transforms.skew()],
  ])],
  ['Interactivity', new Map([
    ['Scroll margin', interactivity.scrollMargin()],
    ['Scroll padding', interactivity.scrollPadding()],
    ['Scroll snap type', interactivity.scrollSnapType()],
    ['Touch action', interactivity.touchAction()],
  ])],
  ['SVG', new Map([
    ['Fill', docs.rules.svg.fill()],
    ['Stroke Color', docs.rules.svg.stroke()],
    ['Stroke Width', svg.strokeWidth()],
  ])],
  ['Accessibility', new Map([
    ['Color Scheme', docs.rules.accessibility.colorScheme()],
  ])],
])

export default main
