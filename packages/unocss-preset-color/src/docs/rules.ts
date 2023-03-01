import type { DocumentationTree } from 'unocss-docs'

import * as backgrounds from '../rules/documented/backgrounds'
import * as typography from '../rules/documented/typography'
import * as borders from '../rules/documented/borders'
import * as interactivity from '../rules/documented/interactivity'
import * as svg from '../rules/documented/svg'
import * as accessibility from '../rules/documented/accessibility'

const main: DocumentationTree = new Map([
  ['Background', new Map([
    ['Background Color', backgrounds.bgColor()],
    ['Background Gradient', backgrounds.backgroundImage()],
    ['Background Gradient Stops', backgrounds.gradientColorStops()],
  ])],
  ['Text', new Map([
    ['Text Color', typography.textColor()],
    ['Text Decoration Color', typography.textDecorationColor()],
  ])],
  ['Border', new Map([
    ['Border Color', borders.borderColor()],
    ['Outline Color', borders.outlineColor()],
  ])],
  ['Other', new Map([
    ['Color Scheme', accessibility.colorScheme()],

    ['Accent color', interactivity.accentColor()],
    ['Caret color', interactivity.caretColor()],

    ['Fill', svg.fill()],
    ['Stroke Color', svg.stroke()],
  ])],
])

export default main
export {
  backgrounds,
  borders,
  interactivity,
  svg,
  typography,
  accessibility,
}
