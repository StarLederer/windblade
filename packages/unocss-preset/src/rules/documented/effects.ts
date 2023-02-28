import type { Rule } from '@unocss/core'
import type { DocumentedRuleGroup, DocumentedRuleGroupDocs } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { size } = ruleUtils

export const boxShadow = (): DocumentedRuleGroup<theme.Theme> => {
  const docs: DocumentedRuleGroupDocs = {
    description: 'Box shadows are removed for now because Tailwind\'s implementation is too limiting. Discussion in progress.',
    utilities: [],
  }

  return { rules: [], docs }
}

export const opacity = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [size.rule('opacity', 'opacity', { defaultUnit: '' })]

  const docs: DocumentedRuleGroupDocs = {
    description: 'Windblade uses proportions instead of separete values.',
    utilities: [],
  }

  return { rules, docs }
}
