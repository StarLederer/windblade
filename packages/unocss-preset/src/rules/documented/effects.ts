import type { Rule } from '@unocss/core'
import type { DocumentationPage } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { size } = ruleUtils

export const boxShadow = () => {
  const docs: DocumentationPage = {
    description: 'Box shadows are removed for now because Tailwind\'s implementation is too limiting. Discussion in progress.',
    utilities: [],
  }

  return { rules: [], docs }
}

export const opacity = () => {
  const rules: Rule<theme.Theme>[] = [size.rule('opacity', 'opacity', { defaultUnit: '' })]

  const docs: DocumentationPage = {
    description: 'Windblade uses proportions instead of separete values.',
    utilities: [],
  }

  return { rules, docs }
}
