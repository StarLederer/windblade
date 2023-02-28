import type { Rule } from '@unocss/core'
import type { DocumentedRuleGroup, DocumentedRuleGroupDocs } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { color } = ruleUtils

export const accentColor = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [color.colorRule('accent', 'accent-color')]

  const docs: DocumentedRuleGroupDocs = {
    description: 'Windblade uses semantic colors.',
    utilities: [
      'accent-<theme.windblade.colors>',
      'accent-<theme.windblade.miscColors>',
      'accent-fg-<integer>',
    ],
    preview: util => 'TODO',
  }

  return { rules, docs }
}

export const caretColor = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    color.colorRule('caret', 'caret-color'),
    color.fgColorRule('caret-fg', 'caret-color'),
  ]

  const docs: DocumentedRuleGroupDocs = {
    description: 'Windblade uses semantic colors.',
    utilities: [
      'caret-<theme.windblade.colors>',
      'caret-<theme.windblade.miscColors>',
      'caret-fg-<integer>',
    ],
    preview: util => 'TODO',
  }

  return { rules, docs }
}
