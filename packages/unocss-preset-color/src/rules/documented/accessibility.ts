import type { Rule } from '@unocss/core'
import { escapeSelector as e } from '@unocss/core'
import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'
import type { Theme } from '@windblade/core'
import { utils } from '@windblade/core'

const { getColorSchemeCSSProps, objToCSS } = utils

export function colorScheme() {
  const rules: Rule<Theme>[] = [
    [
      /^scheme-(auto|light|dark)-(\d+)$/,
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
                color-scheme: light;
                ${objToCSS(light)}
              }
            `
          case 'dark':
            return `
              .${selector} {
                color-scheme: dark;
                ${objToCSS(dark)}
              }
            `

          default:
            return `
              .${selector} {
                color-scheme: light dark;
                ${objToCSS(dark)}
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

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Utilities for switching color scheme. Missing from Tailwind.</p>

      <h2>Try it</h2>
      <try-it>
        <utils>
          <util>
            scheme-
            <select>
              <option value="auto" />
              <option value="dark" />
              <option value="light" />
            </select>
            -
            <input type="integer" />
          </util>
        </utils>

        <renderer html="${encodeString(`
          <div class="$util bg-normal p-m rounded-s">
            <div class="bg-surface border border-color-surface p-s rounded-s flex gap-s items-center">
              <div class="size-i-m.2 aspect-1/1 bg-accent rounded-full"></div>
              <div>Hello</div>
            </div>
          </div>
        `)}" />


        <h3>Preview</h3>
        <viewport />

        <h3>HTML</h3>
        <html />

        <h3>Generated CSS</h3>
        <css />
      </try-it>
    </page>
  `

  return { rules, docs }
}
