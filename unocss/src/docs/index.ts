import usage from "./usage";
import theme from "../theme/documented";
import rules from "../rules/documented";
import { DocumentationCategories } from "./types";
import { Theme } from "../theme";

const main: DocumentationCategories<Theme> = new Map ([
  ["Usage", usage],
  ["Theme", theme],
  ...rules,
]);

export default main;
export * from "./types";
