import type { Rule } from '@unocss/core'
import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'
import { objectKeys } from 'ts-extras'
import { iterObjects } from './doc-components'

const { logical, size: sizes } = ruleUtils

export const widthHeight = () => {
  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Removed this, as well as min and max variants, in favor of the size counterparts</p>
    </page>
  `

  return { rules: [], docs }
}

export const size = () => {
  const rules: Rule<theme.Theme>[] = sizes.axisRules('size', '', '', 'size')

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Utilities for setting the size of an element. Missing from Tailwind.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          ${objectKeys(logical.abbreviations.axis).map(axis => `
            <util renderer="${axis}">
              size-${axis}-
              <select>
                ${iterObjects(['theme.windblade.proportions', 'theme.windblade.miscSizes'], '$name', '$val', `
                  <option value="$name"/>
                `)}
              </select>
            </util>
          `).join('')}
        </utils>

        ${objectKeys(logical.abbreviations.axis).map(axis => `
          <renderer for="${axis}" html="${encodeString(`
            <div class="$util ${axis === 'i' ? 'min-size-b-m.2' : 'min-size-i-m.2'} bg-accent rounded-s"></div>
          `)}" />
        `).join('')}

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

const minMaxSizeHtml = (axis: string) => `
  <div class="$util ${axis === 'inline' ? 'min-size-b-m.2' : 'min-size-i-m.2'} bg-accent rounded-s"></div>
`

export const minSize = () => {
  const rules: Rule<theme.Theme>[] = sizes.axisRules('min-size', '', 'min', 'size')

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Utilities for setting the minimum size of an element. Missing from Tailwind.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          ${objectKeys(logical.abbreviations.axis).map(axis => `
            <util renderer="${axis}">
              min-size-${axis}-
              <select>
                ${iterObjects(['theme.windblade.proportions', 'theme.windblade.miscSizes'], '$name', '$val', `
                  <option value="$name" />
                `)}
              </select>
            </util>
          `).join('')}
        </utils>

        ${objectKeys(logical.abbreviations.axis).map(axis => `
          <renderer for="${axis}" html="${encodeString(`
            ${minMaxSizeHtml(axis)}
          `)}" />
        `).join('')}

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

export const maxSize = () => {
  const rules: Rule<theme.Theme>[] = sizes.axisRules('max-size', '', 'max', 'size')

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Utilities for setting the maximum size of an element. Missing from Tailwind.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          ${objectKeys(logical.abbreviations.axis).map(axis => `
            <util renderer="${axis}">
              max-size-${axis}-
              <select>
                ${iterObjects(['theme.windblade.proportions', 'theme.windblade.miscSizes'], '$name', '$val', `
                  <option value="$name"/>
                `)}
              </select>
            </util>
          `).join('')}
        </utils>

        ${objectKeys(logical.abbreviations.axis).map(axis => `
          <renderer for="${axis}" html="${encodeString(`
            ${minMaxSizeHtml(axis)}
          `)}" />
        `).join('')}

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
