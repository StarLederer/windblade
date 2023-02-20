import { DocumentationCategory } from "../../docs/types";
import colors from "./colors";
import proportions from "./proportions";
import other from "./other";
import Theme from "../Theme";

export const categoy: DocumentationCategory<Theme> = new Map([
  ["Semantic Colors", colors],
  ["Proportions", proportions],
  ["Other", other],
]);

export {
  colors
};

export default categoy
