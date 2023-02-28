import type { Rule } from '@unocss/core'
import type { DocumentedRuleGroup, DocumentedRuleGroupDocs } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { size } = ruleUtils

export const borderSpacing = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    size.rule('border-spacing', 'border-spacing'),
    // we are skiping border-spacing-b and borer-spacing-i for now beccause they are hard to implement
  ]

  const docs: DocumentedRuleGroupDocs = {
    description: 'Changing border-spacing for individual axis is not possible at the moment.',
    utilities: ['border-spacing-<theme.windblade.proportions>'],
    preview: util => 'TODO',
  }

  return { rules, docs }
}
