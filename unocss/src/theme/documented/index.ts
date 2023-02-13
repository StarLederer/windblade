import { DocumentationCategory } from "../../docs/types";
import colors from "./colors";
import proportions from "./proportions";
import other from "./other";

export const categoy: DocumentationCategory = new Map([
  ["Semantic Colors", colors],
  ["Proportions", proportions],
  ["Other", other],
]);

export {
  colors
};

export default categoy
