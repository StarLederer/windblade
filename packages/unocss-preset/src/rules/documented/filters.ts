import type { DocumentedRuleGroup, DocumentedRuleGroupDocs } from 'unocss-docs'
import type { theme } from '@windblade/core'

export const dropShadow = (): DocumentedRuleGroup<theme.Theme> => {
  const docs: DocumentedRuleGroupDocs = {
    description: 'Drop shadows are removed for now because Tailwind\'s implementation is too limiting. Discussion in progress.',
    utilities: [],
  }

  return { rules: [], docs }
}
