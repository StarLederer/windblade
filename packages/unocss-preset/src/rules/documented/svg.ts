import type { Rule } from '@unocss/core'
import type { DocumentationPage } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { size } = ruleUtils

export const strokeWidth = () => {
  const rules: Rule<theme.Theme>[] = [size.rule('stroke', 'stroke-width')]

  const docs: DocumentationPage = {
    description: 'Windblade proportions are used instead of separate size values.',
    utilities: ['stroke-<theme.windblade.proportions>'],
    preview: util => 'TODO',
  }

  return { rules, docs }
}
