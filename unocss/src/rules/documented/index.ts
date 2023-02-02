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

export const categories = {
  "Layout": Object.values(layout),
  "Flexbox & grid": Object.values(flexboxAndGrid),
  "Spacing": Object.values(spacing),
  "Sizing": Object.values(sizing),
  "Typography": Object.values(typography),
  "Backgrounds": Object.values(backgrounds),
  "Borders": Object.values(borders),
  "Effects": Object.values(effects),
  "Filters": Object.values(filters),
  "Tables": Object.values(tables),
  "Transitions & Animation": Object.values(transitionsAndAnimation),
  "Transforms": Object.values(transforms),
  "Interactivity": Object.values(interactivity),
  "SVG": Object.values(svg),
  "Accessibility": Object.values(accessibility),

};

export * from "./types";
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
