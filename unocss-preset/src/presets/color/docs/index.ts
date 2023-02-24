import { DocumentationCategories } from "unocss-docs";
import { theme } from "../../core";
import rules from "./rules";

const main: DocumentationCategories<theme.Theme> = new Map([
  ...rules,
]);

export default main;
export * as rules from "./rules";
