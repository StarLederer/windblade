import type { Rule } from '@unocss/core'
import type { DocumentedRuleGroup, DocumentedRuleGroupDocs } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { logical, size } = ruleUtils

export const scrollMargin = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = size.edgeRules('scroll-m', '', 'scroll-margin', '')

  const docs: DocumentedRuleGroupDocs = {
    description: 'Windblade proportions are used instead of separate size values, and physical properties are replaced with logical.',
    utilities: [
      ...Object.keys(logical.abbreviations.axis).map(val => `scroll-m-${val}`),
      ...Object.keys(logical.abbreviations.edges).map(val => `scroll-m-${val}`),
    ].flatMap(val => [`${val}-<theme.windblade.proportions>`, `${val}-<theme.windblade.miscSizes>`]),
    preview: util => 'TODO',
  }

  return { rules, docs }
}

export const scrollPadding = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = size.edgeRules('scroll-p', '', 'scroll-padding', '')

  const docs: DocumentedRuleGroupDocs = {
    description: 'Windblade proportions are used instead of separate size values, and physical properties are replaced with logical.',
    utilities: [
      ...Object.keys(logical.abbreviations.axis).map(val => `scroll-p-${val}`),
      ...Object.keys(logical.abbreviations.edges).map(val => `scroll-p-${val}`),
    ].flatMap(val => [`${val}-<theme.windblade.proportions>`, `${val}-<theme.windblade.miscSizes>`]),
    preview: util => 'TODO',
  }

  return { rules, docs }
}

export const scrollSnapType = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    ['snap-none', { 'scroll-snap-type': 'none' }],
    ['snap-both', { 'scroll-snap-type': 'both var(--wb-scroll-snap-strictness)' }],
    ['snap-mandatory', { '--wb-scroll-snap-strictness': 'mandatory' }],
    ['snap-proximity', { '--wb-scroll-snap-strictness': 'proximity' }],
  ]

  const docs: DocumentedRuleGroupDocs = {
    description: 'snap-x and snap-y have been removed because they have no logical counterparts yet.',
    utilities: ['snap-none', 'snap-both', 'snap-mandatory', 'snap-proximity'],
    preview: util => 'TODO',
  }

  return { rules, docs }
}

export const touchAction = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    ['touch-auto', { 'touch-action': 'auto' }],
    ['touch-none', { 'touch-action': 'none' }],
    ['touch-pinch-zoom', { 'touch-action': 'pinch-zoom' }],
    ['touch-manipulation', { 'touch-action': 'manipulation' }],
  ]

  const docs: DocumentedRuleGroupDocs = {
    description: 'pan touch-actions have been removed because they have no logical counterparts yet.',
    utilities: ['touch-auto', 'touch-none', 'touch-pinch-zoom', 'touch-manipulation'],
    preview: util => 'TODO',
  }

  return { rules, docs }
}
