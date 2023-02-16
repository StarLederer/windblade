import { DocumentationCategory } from "../../docs/types";
import installation from "./installation";
import semanticColors from "./semanticColors";

export const categoy: DocumentationCategory = new Map([
  ["Installation", installation],
  ["Semantic colors", semanticColors],
]);

export {
  installation
};

export default categoy
