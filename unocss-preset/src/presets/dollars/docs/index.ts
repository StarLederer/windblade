import { DocumentationCategories } from "unocss-docs";
import { theme } from "../../core";
import dollarSyntax from "./dollarSyntax";

const main: DocumentationCategories<theme.Theme> = new Map([
  ["Usage", new Map([
    ["$ syntax", dollarSyntax],
  ])],
]);

export default main;
export * as dollarSyntax from "./dollarSyntax";
