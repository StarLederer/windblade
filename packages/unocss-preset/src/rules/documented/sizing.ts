import type { Rule } from '@unocss/core'
import type { DocumentedRuleGroup, DocumentedRuleGroupDocs } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { logical, size: sizes } = ruleUtils

export const widthHeight = (): DocumentedRuleGroup<theme.Theme> => {
  const docs: DocumentedRuleGroupDocs = {
    description: 'Removed this, as well as min and max variants, in favor of the size counterparts',
    utilities: [],
  }

  return { rules: [], docs }
}

export const size = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = sizes.axisRules('size', '', '', 'size')

  const docs: DocumentedRuleGroupDocs = {
    description: 'Utilities for setting the size of an element. Missing from Tailwind.',
    utilities: [
      ...Object.keys(logical.abbreviations.axis).map(val => `size-${val}-<theme.windblade.sizes>`),
    ],
    preview: util => `
      <div class="${util} ${util.includes('-i-') ? 'min-size-b-m.2' : 'min-size-i-m.2'} bg-accent rounded-s"></div>
    `,
  }

  return { rules, docs }
}

const minMaxSizePreview = (util: string) => `
  <div class="${util} ${util.includes('-i-') ? 'min-size-b-m.2' : 'min-size-i-m.2'} bg-accent rounded-s"></div>
`

export const minSize = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = sizes.axisRules('min-size', '', 'min', 'size')

  const docs: DocumentedRuleGroupDocs = {
    description: 'Utilities for setting the minimum size of an element. Missing from Tailwind.',
    utilities: Object.keys(logical.abbreviations.axis).map(val => `min-size-${val}-<theme.windblade.proportions>`),
    preview: minMaxSizePreview,
  }

  return { rules, docs }
}

export const maxSize = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = sizes.axisRules('max-size', '', 'max', 'size')

  const docs: DocumentedRuleGroupDocs = {
    description: 'Utilities for setting the maximum size of an element. Missing from Tailwind.',
    utilities: Object.keys(logical.abbreviations.axis).map(val => `max-size-${val}-<theme.windblade.proportions>`),
    preview: minMaxSizePreview,
  }

  return { rules, docs }
}
