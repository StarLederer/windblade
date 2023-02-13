import { DocumentationCategory } from "../../docs/types";
import colors from "./colors";
import proportions from "./proportions";

export const categoy: DocumentationCategory = new Map([
  ["Semantic Colors", colors],
  ["Proportions", proportions],
]);

export {
  colors
};

export default categoy
