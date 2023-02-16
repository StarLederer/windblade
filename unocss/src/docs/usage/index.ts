import { DocumentationCategory } from "../../docs/types";
import installation from "./installation";
import semanticColors from "./semanticColors";
import logicalProperties from "./logicalProperties";
import dollarSyntax from "./dollarSyntax";
import variants from "./variants";

export const categoy: DocumentationCategory = new Map([
  ["Installation", installation],
  ["Semantic colors", semanticColors],
  ["Logical properties", logicalProperties],
  ["$ syntax", dollarSyntax],
  ["Hover, focus and other states", variants],
]);

export {
  installation,
  semanticColors
};

export default categoy
