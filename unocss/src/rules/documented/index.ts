import { DocumentationCategories } from "../../docs/types";

import * as layout from "./layout";
import * as flexboxAndGrid from "./flexboxAndGrid";
import * as spacing from "./spacing";
import * as sizing from "./sizing";
import * as backgrounds from "./backgrounds";
import * as typography from "./typography";
import * as borders from "./borders";
import * as effects from "./effects";
import * as filters from "./filters";
import * as tables from "./tables";
import * as transitionsAndAnimation from "./transitionsAndAnimation";
import * as transforms from "./transforms";
import * as interactivity from "./interactivity";
import * as svg from "./svg";
import * as accessibility from "./accessibility";

export const categories: DocumentationCategories = new Map([
  ["Layout", layout.default],
  ["Flexbox & Grid", flexboxAndGrid.default],
  ["Spacing", spacing.default],
  ["Sizing", sizing.default],
  ["Background", backgrounds.default],
  ["Typography", typography.default],
  ["Borders", borders.default],
  ["Effects", effects.default],
  ["Filters", filters.default],
  ["Tables", tables.default],
  ["Transitions & Animation", transitionsAndAnimation.default],
  ["Transforms", transforms.default],
  ["Interactivity", interactivity.default],
  ["SVG", svg.default],
  ["Accessibility", accessibility.default],
]);

export {
  layout,
  flexboxAndGrid,
  spacing, sizing,
  backgrounds,
  typography,
  borders,
  effects,
  filters,
  tables,
  transitionsAndAnimation,
  transforms,
  interactivity,
  svg,
  accessibility,
};

export default categories
