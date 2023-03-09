import type { Rule } from '@unocss/core'
import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'
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

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Physical properties replaced with logocal.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>${[
          ...Object.keys(logical.abbreviations.edges),
          ...Object.keys(logical.abbreviations.coners),
          'center',
        ].map(val => `
          <util>bg-${val}</util>
        `).join('')}</utils>

        <renderer html="${encodeString(`
          <div class="$util rounded-s.4 size-i-full max-size-i-l.2 aspect-10/6" style="background-image: url('https://picsum.photos/600/400')"></div>
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
