import { DocumentationCategories } from "unocss-docs";
import { theme } from "../../core";

import * as backgrounds from "../rules/documented/backgrounds";
import * as typography from "../rules/documented/typography";
import * as borders from "../rules/documented/borders";
import * as interactivity from "../rules/documented/interactivity";
import * as svg from "../rules/documented/svg";
import * as accessibility from "../rules/documented/accessibility";

const main: DocumentationCategories<theme.Theme> = new Map([
  ["Windblade Color", new Map([
    ["Background Color", backgrounds.bgColor()],
    ["Background Gradient", backgrounds.backgroundImage()],
    ["Background Gradient Stops", backgrounds.gradientColorStops()],

    ["Border Color", borders.borderColor()],
    ["Outline Color", borders.outlineColor()],

    ["Accent color", interactivity.accentColor()],
    ["Caret color", interactivity.caretColor()],

    ["Fill", svg.fill()],
    ["Stroke Color", svg.stroke()],

    ["Text Color", typography.textColor()],
    ["Text Decoration Color", typography.textDecorationColor()],

    ["Color Scheme", accessibility.colorScheme()],
  ])],
]);

export default main;
export {
  backgrounds,
  borders,
  interactivity,
  svg,
  typography,
  accessibility,
};