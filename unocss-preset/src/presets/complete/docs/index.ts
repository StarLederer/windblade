import { DocumentationCategories } from "unocss-docs";
import { theme as coreTheme } from "../../core";
import usage from "./usage";
import theme from "./theme";
import rules from "./rules";

const main: DocumentationCategories<coreTheme.Theme> = new Map([
  ["Usage", usage],
  ["Theme", theme],
  ...rules,
]);

export default main;
