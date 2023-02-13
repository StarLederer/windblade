import theme from "../theme/documented";
import rules from "../rules/documented";
import { DocumentationCategories } from "./types";

const main: DocumentationCategories = new Map ([
  ["Theme", theme],
  ...rules,
]);

export default main;
export * from "./types";
