import type { Rule } from '@unocss/core'
import type { DocumentedRuleGroup, DocumentedRuleGroupDocs } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { logical, size } = ruleUtils

export const padding = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = size.edgeRules('p', '', 'padding', '')

  const docs: DocumentedRuleGroupDocs = {
    description: 'Replaced physical properties with logical.',
    utilities: [
      'p',
      ...Object.keys(logical.abbreviations.axis).map(val => `p-${val}`),
      ...Object.keys(logical.abbreviations.edges).map(val => `p-${val}`),
    ].map(val => `${val}-<theme.windblade.proportions>`),
    preview: util => `
      <div class="${util} rounded-s bg-accent">
        <div class="border border-dashed rounded-s.2">${util}</div>
      </div>
    `,
  }

  return { rules, docs }
}

export const margin = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = size.edgeRules('m', '', 'margin', '')

  const docs: DocumentedRuleGroupDocs = {
    description: 'Replaced physical properties with logical.',
    utilities: [
      'm',
      ...Object.keys(logical.abbreviations.axis).map(val => `m-${val}`),
      ...Object.keys(logical.abbreviations.edges).map(val => `m-${val}`),
    ].map(val => `${val}-<theme.windblade.proportions>`),
    preview: util => `
      <div class="border border-dashed border-color-accent rounded-s.2">
        <div class="${util} p-s rounded-s bg-accent">${util}</div>
      </div>
    `,
  }

  return { rules, docs }
}

export const spaceBetween = (): DocumentedRuleGroup<theme.Theme> => {
  const docs: DocumentedRuleGroupDocs = {
    description: 'Removed this. Please use gap and flex/grid/columns instead',
    utilities: [],
  }

  return { rules: [], docs }
}
