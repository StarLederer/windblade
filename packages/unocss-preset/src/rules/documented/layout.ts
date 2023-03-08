import type { Rule } from '@unocss/core'
import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'
import { objectEntries } from 'ts-extras'

const { logical } = ruleUtils

export const aspectRatio = () => {
  const rules: Rule<theme.Theme>[] = [
    [
      /^(aspect)-(.+)$/,
      (match) => {
        if (match[2].includes(':'))
          return undefined
        return { 'aspect-ratio': match[2] }
      },
    ],
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade uses CSS ratios instead of presets.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>aspect-<input type="integer" /></util>
          <util>aspect-1/<input type="integer" /></util>
        </utils>

        <renderer html="${encodeString(`
          <div class="size-b-m $util bg-accent rounded-s.4"></div>
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

export const container = () => {
  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade does not have container utilities or breakpoints becase it focuses on intrinsic sizing instead.</p>
    </page>
  `

  return { rules: [], docs }
}

export const breakAfter = () => {
  const values = ['auto', 'avoid', 'all', 'avoid-page', 'page', 'recto', 'verso', 'column']

  const rules: Rule<theme.Theme>[] = values.map((val): Rule<theme.Theme> => [
    `break-after-${val}`,
    { 'break-after': val },
  ])

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Physical properties replaced with logocal.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          ${values.map(val => `<util>break-after-${val}</util>`).join('')}
        </utils>

        <renderer html="${encodeString(`
          TODO
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

export const breakBefore = () => {
  const values = ['auto', 'avoid', 'all', 'avoid-page', 'page', 'recto', 'verso', 'column']

  const rules: Rule<theme.Theme>[] = values.map((val): Rule<theme.Theme> => [
    `break-before-${val}`,
    { 'break-before': val },
  ])

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Physical properties replaced with logocal.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          ${values.map(val => `<util>break-before-${val}</util>`).join('')}
        </utils>

        <renderer html="${encodeString(`
          TODO
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

export const display = () => {
  const values = ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'flow-root', 'grid', 'inline-grid', 'contents', 'hidden'] as const
  const overrides: Partial<Record<typeof values[number], string>> = {
    hidden: 'none',
  }

  const rules: Rule<theme.Theme>[] = values.map((val): Rule<theme.Theme> => [
    `${val}`,
    { display: Object.keys(overrides).includes(val) ? overrides[val] : val },
  ])

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade removes some utilities from this group that cannot be sued semantically.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          ${values.map(val => `<util>${val}</util>`).join('')}
        </utils>

        <renderer html="${encodeString(`
          <div>
            <div class="bg-accent p-s rounded-s.4 $util">1</div>
            <div class="bg-accent p-s rounded-s.4 $util">2</div>
            <div class="bg-accent p-s rounded-s.4 $util">3</div>
          </div>
        `)}" />

        <h3>Preview</h3>
        <p>Currently our examples of these utilities do not demonstrate their use well. Please feel free to contibute better examples.</p>
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

export const objectPosition = () => {
  const rules: Rule<theme.Theme>[] = [
    ...objectEntries(logical.abbreviations.edges).map(([key, val]): Rule<theme.Theme> => [
      `object-${key}`, { 'object-position': `var(--${val})` },
    ]),
    ...objectEntries(logical.abbreviations.coners).map(([key, val]): Rule<theme.Theme> => [
      `object-${key}`, { 'object-position': `var(--${val})` },
    ]),
    ['object-center', { 'object-position': 'center' }],
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Physical properties replaced with logocal.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          ${[
            ...Object.keys(logical.abbreviations.edges),
            ...Object.keys(logical.abbreviations.coners),
            'center',
          ].map(val => `<util>object-${val}</util>`).join('')}
        </utils>

        <renderer html="${encodeString(`
          <img class="$util rounded-s.4 max-size-i-l.2 object-none" alt="Random demo" src="https://picsum.photos/600/400" />
        `)}" />

        <h3>Preview</h3>
        <p>Currently our examples of these utilities do not demonstrate their use well. Please feel free to contibute better examples.</p>
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
