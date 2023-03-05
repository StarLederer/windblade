import type { Rule } from '@unocss/core'
import { objectKeys } from 'ts-extras'
import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { color, logical } = ruleUtils

export const bgColor = () => {
  const rules: Rule<theme.Theme>[] = [
    color.colorRule('bg', 'background-color'),
    color.colorBgRule('bg'),
    color.fgColorRule('bg-fg', 'background-color'),
    // TODO: we might need a set-fg rule that is the same as bg but does not actually change background color
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade uses semantic colors.</p>

      <h2>Try it</h2>
      <try-it>
        <utils>
          <util>
            bg-
            <select>
              <option value="theme.windblade.colors" />
              <option value="theme.windblade.miscColors" />
            </select>
          </util>
          <util renderer="fg">
            bg-fg-
            <input type="integer" />
          </util>
        </utils>

        <renderer for="fg" html="${encodeString(`
          <div class="size-i-full aspect-1/1 max-size-i-m max-size-b-m rounded-s p-s bg-accent">
            <div class="size-i-full aspect-1/1 rounded-full $util"></div>
          </div>
        `)}" />

        <renderer html="${encodeString(`
          <div class="$util size-i-full aspect-1/1 max-size-i-m max-size-b-m rounded-s p-s flex items-center justify-center text-center">
            Background color
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

export const backgroundImage = () => {
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

  const docs: DocumentationPage = `# :title
Repalced static colors with sematic colors.

## Try it
::try-it-controls{${[
  'none=bg-none',
  ...Object.keys(logical.abbreviations.edges).map(val => `to-${val}=bg-gradient-to-${val}`),
  ...Object.keys(logical.abbreviations.coners).map(val => `to-${val}=bg-gradient-to-${val}`),
].join(' ')}}

:::try-it-preview
<div class="$util from-accent size-i-full size-b-l.2 rounded-s"></div>
:::

### HTML
::try-it-html

### Generated CSS
::try-it-css`

  return { rules, docs }
}

export const gradientColorStops = () => {
  const rules: Rule<theme.Theme>[] = [
    color.colorRule('from', '--wb-gradient-from'),
    color.colorRule('to', '--wb-gradient-to'),
    // TODO implement 'via'
    // colorRule('via', '--wb-gradient-stops', (val) => `var(--wb-gradient-from, transparent), ${val}, var(--wb-gradient-to, transparent)`),
  ]

  const docs: DocumentationPage = `# :title
Repalced static colors with sematic colors. Temporarily missing the \'via\' utilities.

## Try it
::try-it-controls{${[
  'fc=from-$theme.windblade.colors',
  'fmc=from-$theme.windblade.miscColors',
  'tc=to-$theme.windblade.colors',
  'tmc=to-$theme.windblade.miscColors',
].join(' ')}}

### Preview
:::try-it-preview{for=fc,fmc}
<div class="bg-gradient-to-ie $util to-accent-2 size-i-full size-b-l.2 rounded-s"></div>
:::

:::try-it-preview{for=tc,tmc}
<div class="bg-gradient-to-ie $util from-accent-2 size-i-full size-b-l.2 rounded-s"></div>
:::

### HTML
::try-it-html

### Generated CSS
::try-it-css`

  return { rules, docs }
}
