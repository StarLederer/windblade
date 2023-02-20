import { Rule } from "@unocss/core";
import Theme from "../theme/Theme";

// Theme

export type DocumentedThemeObject<T> = (theme: T) => string;

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

export type DocumentationCategory<T> = Map<string, DocumentedThemeObject<T> | DocumentedRuleGroup>;

export type DocumentationCategories<T> =  Map<string, DocumentationCategory<T>>
