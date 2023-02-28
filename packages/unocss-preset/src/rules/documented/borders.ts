import type { Rule } from '@unocss/core'
import type { DocumentedRuleGroup, DocumentedRuleGroupDocs } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { logical, size } = ruleUtils

export const borderRadius = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    ...size.cornerRules('rounded', '', 'border', 'radius'),
    ...logical.cornerRules('rounded', 'full', 'border', 'radius', (pref, prop) => [pref, { [prop]: '99999px' }]),
    ...logical.cornerRules('rounded', 'none', 'border', 'radius', (pref, prop) => [pref, { [prop]: 'none' }]),
  ]

  const docs: DocumentedRuleGroupDocs = {
    description: 'Windblade proportions are used instead of separate size values, and physical properties are replaced with logical.',
    utilities: [
      'rounded',
      ...Object.keys(logical.abbreviations.coners).map(val => `rounded-${val}`),
    ].flatMap(val => [`${val}-<theme.windblade.proportions>`, `${val}-full`, `${val}-none`]),
    preview: util => `
      <div class="${util} size-i-full max-size-i-l.2 aspect-1/1 bg-accent"></div>
    `,
  }

  return { rules, docs }
}

export const borderWidth = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = size.edgeRules('border', '', 'border', 'width')

  const docs: DocumentedRuleGroupDocs = {
    description: 'Windblade proportions are used instead of separate size values, and physical properties are replaced with logical.',
    utilities: [
      'border',
      ...Object.keys(logical.abbreviations.axis).map(val => `border-${val}`),
      ...Object.keys(logical.abbreviations.edges).map(val => `border-${val}`),
    ].flatMap(val => [`${val}-<theme.windblade.proportions>`, `${val}-<theme.windblade.miscSizes>`]),
    preview: util => `
      <div class="border border-color-accent ${util} rounded-s size-i-full max-size-i-l.2 aspect-1/1"></div>
    `,
  }

  return { rules, docs }
}

export const outlineWidth = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [size.rule('outline', 'outline-width')]

  const docs: DocumentedRuleGroupDocs = {
    description: 'Windblade proportions are used instead of separate size values.',
    utilities: [
      'outline-<theme.windblade.proportions>',
      'outline-<theme.windblade.miscSizes>',
    ],
    preview: util => 'TODO',
  }

  return { rules, docs }
}

export const outlineOffset = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [size.rule('outline-offset', 'outline-offset')]

  const docs: DocumentedRuleGroupDocs = {
    description: 'Windblade proportions are used instead of separate offset values.',
    utilities: [
      'outline-offset-<theme.windblade.proportions>',
      'outline-offset-<theme.windblade.miscSizes>',
    ],
    preview: util => 'TODO',
  }

  return { rules, docs }
}

export const divide = (): DocumentedRuleGroup<theme.Theme> => {
  const docs: DocumentedRuleGroupDocs = {
    description: 'Divides have been removed.',
    utilities: [],
  }

  return { rules: [], docs }
}

export const ring = (): DocumentedRuleGroup<theme.Theme> => {
  const docs: DocumentedRuleGroupDocs = {
    description: 'Rings have been removed.',
    utilities: [],
  }

  return { rules: [], docs }
}
