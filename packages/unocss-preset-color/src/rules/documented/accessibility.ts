import type { Rule } from '@unocss/core'
import { escapeSelector as e } from '@unocss/core'
import type { DocumentedRuleGroup, DocumentedRuleGroupDocs } from 'unocss-docs'
import type { theme } from '@windblade/core'
import { utils } from '@windblade/core'

const { getColorSchemeCSSProps, objToCSS } = utils

export const colorScheme = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    [
      /^scheme-(dark|light|inverse|auto)-(\d+)$/,
      (match, { rawSelector, theme }) => {
        const hue = Number(match[2] ?? 0)
        if (Number.isNaN(hue))
          return

        const selector = e(rawSelector)
        const { dark, light } = getColorSchemeCSSProps(theme, hue)

        switch (match[1]) {
          case 'light':
            return `
              .${selector} {
                ${objToCSS(light)}
              }
            `
          case 'dark':
            return `
              .${selector} {
                ${objToCSS(dark)}
              }
            `
          // TODO: Discus whether we need this and how to implement it (what happens when you stack these?)
          // case "inverse":
          //   return `
          //     .scheme-dark .${selector} {
          //       ${objToCSS(dark)}
          //     }
          //     .scheme-light .${selector} {
          //       ${objToCSS(light)}
          //     }
          //   `;
          default:
            return `
              .${selector},
              .scheme-dark.${selector},
              .scheme-dark .${selector} {
                ${objToCSS(dark)}
              }
              .scheme-light.${selector},
              .scheme-light .${selector} {
                ${objToCSS(light)}
              }
              @media (prefers-color-scheme: light) { .${selector} {
                  ${objToCSS(light)}
                }
              }
            `
        }
      },
    ],
  ]

  const docs: DocumentedRuleGroupDocs = {
    description: 'Utilities for switching color scheme. Missing from Tailwind.',
    utilities: ['scheme-dark', 'scheme-light', 'scheme-auto-<integer>', 'scheme-dark-<integer>', 'scheme-light-<integer>'],
    preview: util => 'TODO',
  }

  return { rules, docs }
}
