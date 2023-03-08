import type { Rule } from '@unocss/core'
import type { DocumentationPage } from 'unocss-docs'
import { objectEntries } from 'ts-extras'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { logical } = ruleUtils

export const backgroundPosition = () => {
  const rules: Rule<theme.Theme>[] = [
    ...objectEntries(logical.abbreviations.edges).map(([key, val]): Rule<theme.Theme> => [
      `bg-${key}`, { 'background-position': `var(--${val})` },
    ]),
    ...objectEntries(logical.abbreviations.coners).map(([key, val]): Rule<theme.Theme> => [
      `bg-${key}`, { 'background-position': `var(--${val})` },
    ]),
    ['bg-center', { 'background-position': 'center' }],
  ]

  const docs: DocumentationPage = {
    description: 'Physical properties replaced with logocal.',
    utilities: [
      ...Object.keys(logical.abbreviations.edges),
      ...Object.keys(logical.abbreviations.coners),
      'center',
    ].map(val => `bg-${val}`),
    preview: util => `
      <div class="${util} rounded-s.4 size-i-full max-size-i-l.2 aspect-10/6" style="background-image: url('https://picsum.photos/600/400')"></div>
    `,
  }

  return { rules, docs }
}
