import type { Rule } from '@unocss/core'
import type { DocumentedRuleGroup, DocumentedRuleGroupDocs } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { color, logical } = ruleUtils

export const borderColor = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    ...logical.edgeRules('border', 'color', 'border', 'color', color.colorRule),
    ...logical.edgeRules('border', 'color-fg', 'border', 'color', color.fgColorRule),
  ]

  const docs: DocumentedRuleGroupDocs = {
    description: 'Windblade uses semantic colors.',
    utilities: [
      'border-color',
      ...Object.keys(logical.abbreviations.axis).map(val => `border-${val}-color`),
      ...Object.keys(logical.abbreviations.edges).map(val => `border-${val}-color`),
    ].flatMap(val => [`${val}-<theme.windblade.colors>`, `${val}-<theme.windblade.miscColors>`, `${val}-fg-<integer>`]),
    preview: util => `
      <div class="border border-width-s.2 ${util} rounded-s size-i-full max-size-i-l.2 aspect-1/1"></div>
    `,
  }

  return { rules, docs }
}

export const outlineColor = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    color.colorRule('outline', 'outline-color'),
    color.fgColorRule('outline-fg', 'outline-color'),
  ]

  const docs: DocumentedRuleGroupDocs = {
    description: 'Windblade uses semantic colors.',
    utilities: [
      'outline-color-<theme.windblade.colors>',
      'outline-color-<theme.windblade.miscColors>',
      'outline-color-fg-<integer>',
    ],
    preview: util => 'TODO',
  }

  return { rules, docs }
}
