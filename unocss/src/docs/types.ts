import { Rule } from "@unocss/core";
import Theme from "../theme/Theme";

// Rednering

export type Components = {
  h1: (text: string) => any;
  h2: (text: string) => any;
  h3: (text: string) => any;
  p: (text: string) => any;
  pre: (code: string, lang: string) => any;
  example: (html: string) => any;
};

// Theme

export type DocumentedThemeObject = (
  themeObject: unknown,
  markupComponents: Components,
) => any[];

// Rules

export type DocumentedRuleGroupDocs = {
  description: string;
  utilities: string[];
  preview?: (utility: string) => string;
};

export type DocumentedRuleGroup = {
  rules: Rule<Theme>[];
  docs: DocumentedRuleGroupDocs;
};

// Categories

export type DocumentationCategory = Map<string, DocumentedThemeObject | DocumentedRuleGroup>;

export type DocumentationCategories =  Map<string, DocumentationCategory>
