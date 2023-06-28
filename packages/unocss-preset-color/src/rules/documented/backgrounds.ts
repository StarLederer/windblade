import type { Rule } from '@unocss/core'
import { objectKeys } from 'ts-extras'
import type { DocumentationPage } from '@windblade/unocss-docs'
import { encodeString } from '@windblade/unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { Theme } from '@windblade/core'

const { color, logical } = ruleUtils

export function bgColor() {
  const rules: Rule<Theme>[] = [
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
      <try-it selected="$util">
        <utils>
          <util>
            bg-
            <select>
              <for object="theme.windblade.colors" key-as="$name" value-as="$color">
                <option value="$name"/>
              </for>
              <for object="theme.windblade.miscColors" key-as="$name" value-as="$color">
                <option value="$name"/>
              </for>
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

export function backgroundImage() {
  const rules: Rule<Theme>[] = [
    ['bg-none', { 'background-image': 'none' }],
    ...objectKeys(logical.abbreviations.edges).map((edgeKey): Rule<Theme> => [
      `bg-gradient-to-${edgeKey}`,
      {
        '--wb-gradient-stops': 'var(--wb-gradient-from, transparent), var(--wb-gradient-to, transparent)',
        'background-image': `linear-gradient(to var(--${logical.abbreviations.edges[edgeKey]}), var(--wb-gradient-stops))`,
      },
    ]),
    ...objectKeys(logical.abbreviations.coners).map((cornerKey): Rule<Theme> => [
      `bg-gradient-to-${cornerKey}`,
      {
        '--wb-gradient-stops': 'var(--wb-gradient-from, transparent), var(--wb-gradient-to, transparent)',
        'background-image': `linear-gradient(to var(--${logical.abbreviations.coners[cornerKey]}), var(--wb-gradient-stops))`,
      },
    ]),
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Repalced static colors with sematic colors.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          ${[
            'bg-none',
            ...Object.keys(logical.abbreviations.edges).map(val => `bg-gradient-to-${val}`),
            ...Object.keys(logical.abbreviations.coners).map(val => `bg-gradient-to-${val}`),
          ].map(val => `<util>${val}</util>`).join('')}
        </utils>

        <renderer html="${encodeString(`
          <div class="$util from-accent size-i-full size-b-l.2 rounded-s"></div>
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

export function gradientColorStops() {
  const rules: Rule<Theme>[] = [
    color.colorRule('from', '--wb-gradient-from'),
    color.colorRule('to', '--wb-gradient-to'),
    // TODO implement 'via'
    // colorRule('via', '--wb-gradient-stops', (val) => `var(--wb-gradient-from, transparent), ${val}, var(--wb-gradient-to, transparent)`),
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Repalced static colors with sematic colors. Temporarily missing the \'via\' utilities.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          ${['from', 'to'].map(val => `
            <util renderer="${val}">
            ${val}-
              <select>
                <for object="theme.windblade.colors" key-as="$name" value-as="$color">
                  <option value="$name"/>
                </for>
                <for object="theme.windblade.miscColors" key-as="$name" value-as="$color">
                  <option value="$name"/>
                </for>
              </select>
            </util>
          `).join('')}
        </utils>

        <renderer html="${encodeString(`
          <div class="bg-gradient-to-ie $util from-accent-2 size-i-full size-b-l.2 rounded-s"></div>
        `)}" />

        <renderer for="from" html="${encodeString(`
          <div class="bg-gradient-to-ie $util to-accent-2 size-i-full size-b-l.2 rounded-s"></div>
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
