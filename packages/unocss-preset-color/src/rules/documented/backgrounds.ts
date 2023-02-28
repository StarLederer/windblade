import type { Rule } from '@unocss/core'
import { objectKeys } from 'ts-extras'
import type { DocumentedRuleGroup, DocumentedRuleGroupDocs } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { color, logical } = ruleUtils

export const bgColor = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    color.colorRule('bg', 'background-color'),
    color.colorBgRule('bg'),
    color.fgColorRule('bg-fg', 'background-color'),
    // TODO: we might need a set-fg rule that is the same as bg but does not actually change background color
  ]

  const docs: DocumentedRuleGroupDocs = {
    description: 'Windblade uses semantic colors.',
    utilities: ['bg-<theme.windblade.colors>', 'bg-<theme.windblade.miscColors>', 'bg-fg-<integer>'],
    preview: (util) => {
      if (util.startsWith('bg-fg')) {
        return `
          <div class="size-i-full aspect-1/1 max-size-i-m max-size-b-m rounded-s p-s bg-accent">
            <div class="size-i-full aspect-1/1 rounded-full ${util}"></div>
          </div>
        `
      }
      else {
        return `
          <div class="${util} size-i-full aspect-1/1 max-size-i-m max-size-b-m rounded-s p-s flex items-center justify-center text-center">
            ${util}
          </div>
        `
      }
    },
  }

  return { rules, docs }
}

export const backgroundImage = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    ['bg-none', { 'background-image': 'none' }],
    ...objectKeys(logical.abbreviations.edges).map((edgeKey): Rule<theme.Theme> => [
      `bg-gradient-to-${edgeKey}`,
      {
        '--wb-gradient-stops': 'var(--wb-gradient-from, transparent), var(--wb-gradient-to, transparent)',
        'background-image': `linear-gradient(to var(--${logical.abbreviations.edges[edgeKey]}), var(--wb-gradient-stops))`,
      },
    ]),
    ...objectKeys(logical.abbreviations.coners).map((cornerKey): Rule<theme.Theme> => [
      `bg-gradient-to-${cornerKey}`,
      {
        '--wb-gradient-stops': 'var(--wb-gradient-from, transparent), var(--wb-gradient-to, transparent)',
        'background-image': `linear-gradient(to var(--${logical.abbreviations.coners[cornerKey]}), var(--wb-gradient-stops))`,
      },
    ]),
  ]

  const docs: DocumentedRuleGroupDocs = {
    description: 'Repalced static colors with sematic colors.',
    utilities: [
      'bg-none',
      ...Object.keys(logical.abbreviations.edges).map(val => `bg-gradient-to-${val}`),
      ...Object.keys(logical.abbreviations.coners).map(val => `bg-gradient-to-${val}`),
    ],
    preview: util => `
      <div class="${util} from-accent size-i-full size-b-l.2 rounded-s"></div>
    `,
  }

  return { rules, docs }
}

export const gradientColorStops = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    color.colorRule('from', '--wb-gradient-from'),
    color.colorRule('to', '--wb-gradient-to'),
    // TODO implement 'via'
    // colorRule('via', '--wb-gradient-stops', (val) => `var(--wb-gradient-from, transparent), ${val}, var(--wb-gradient-to, transparent)`),
  ]

  const docs: DocumentedRuleGroupDocs = {
    description: 'Repalced static colors with sematic colors. Temporarily missing the \'via\' utilities.',
    utilities: ['from-<theme.windblade.colors>', 'from-<theme.windblade.miscColors>', 'to-<theme.windblade.colors>', 'to-<theme.windblade.miscColors>'],
    preview: util => `
      <div class="bg-gradient-to-ie ${util} ${util.startsWith('from') ? 'to-accent-2' : 'from-accent-2'} size-i-full size-b-l.2 rounded-s"></div>
    `,
  }

  return { rules, docs }
}
