import { DocumentationCategory } from "unocss-docs";
import { theme } from "../../../core";
import colors from "./colors";
import proportions from "./proportions";
import other from "./other";

export const categoy: DocumentationCategory<theme.Theme> = new Map([
  ["Semantic Colors", colors],
  ["Proportions", proportions],
  ["Other", other],
]);

export {
  colors
};

export default categoy
