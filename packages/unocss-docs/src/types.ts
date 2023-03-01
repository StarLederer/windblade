import type { Rule } from '@unocss/core'

// Theme

export type DocumentedThemeObject<Theme extends {} = {}> = (theme: Theme) => string

// Rules

export interface DocumentedRuleGroupDocs {
  description: string
  utilities: string[]
  preview?: (utility: string) => string
}

export interface DocumentedRuleGroup<Theme extends {} = {}> {
  rules: Rule<Theme>[]
  docs: DocumentedRuleGroupDocs
}

// Categories

export type DocumentationCategory<Theme extends {} = {}> = Map<string, DocumentedThemeObject<Theme> | DocumentedRuleGroup<Theme>>

export type DocumentationCategories<Theme extends {} = {}> = Map<string, DocumentationCategory<Theme>>
