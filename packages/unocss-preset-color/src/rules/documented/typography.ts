import type { Rule } from '@unocss/core'
import type { DocumentedRuleGroup, DocumentedRuleGroupDocs } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { color } = ruleUtils

export const textColor = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    color.colorRule('text', 'color'),
    color.fgColorRule('text-fg', 'color'),
  ]

  const docs: DocumentedRuleGroupDocs = {
    description: 'Windblade uses semantic colors.',
    utilities: [
      'text-<theme.windblade.colors>',
      'text-<theme.windblade.miscColors>',
      'text-fg-<integer>',
    ],
    preview: util => `<div class="${util}">Lorem ipsum<div>`,
  }

  return { rules, docs }
}

export const textDecorationColor = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    color.colorRule('decoration', 'text-decoration-color'),
    color.fgColorRule('decoration-fg', 'text-decoration-color'),
  ]

  const docs: DocumentedRuleGroupDocs = {
    description: 'Windblade uses semantic colors.',
    utilities: [
      'decoration-<theme.windblade.colors>',
      'decoration-<theme.windblade.miscColors>',
      'decoration-fg-<integer>',
    ],
    preview: util => `<div class="underline ${util}">Lorem ipsum<div>`,
  }

  return { rules, docs }
}
