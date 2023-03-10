import type { Rule } from '@unocss/core'
import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'
import { iterObjects, selectLogical } from './doc-components'

const { logical, size } = ruleUtils

export const borderRadius = () => {
  const rules: Rule<theme.Theme>[] = [
    ...size.cornerRules('rounded', '', 'border', 'radius'),
    ...logical.cornerRules('rounded', 'full', 'border', 'radius', (pref, prop) => [pref, { [prop]: '99999px' }]),
    ...logical.cornerRules('rounded', 'none', 'border', 'radius', (pref, prop) => [pref, { [prop]: 'none' }]),
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade proportions are used instead of separate size values, and physical properties are replaced with logical.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            rounded-
            <select>
              <option value="none" />
              <option value="full" />
              ${iterObjects(['theme.windblade.proportions', 'theme.windblade.miscSizes'], '$name', '$value', '<option value="$name" />')}
            </select>
          </util>
          <util>
            rounded-
            ${selectLogical({ corners: true })}-
            <select>
              <option value="none" />
              <option value="full" />
              ${iterObjects(['theme.windblade.proportions', 'theme.windblade.miscSizes'], '$name', '$value', '<option value="$name" />')}
            </select>
          </util>
        </utils>

        <renderer html="${encodeString(`
          <div class="$util size-i-full max-size-i-l.2 aspect-1/1 bg-accent"></div>
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

export const borderWidth = () => {
  const rules: Rule<theme.Theme>[] = size.edgeRules('border', '', 'border', 'width')

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade proportions are used instead of separate size values, and physical properties are replaced with logical.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            border-
            <select>
              ${iterObjects(['theme.windblade.proportions', 'theme.windblade.miscSizes'], '$name', '$value', '<option value="$name" />')}
            </select>
          </util>
          <util>
            border-
            ${selectLogical({ axis: true, edges: true })}-
            <select>
              ${iterObjects(['theme.windblade.proportions', 'theme.windblade.miscSizes'], '$name', '$value', '<option value="$name" />')}
            </select>
          </util>
        </utils>

        <renderer html="${encodeString(`
          <div class="border border-color-accent $util rounded-s size-i-full max-size-i-l.2 aspect-1/1"></div>
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

export const outlineWidth = () => {
  const rules: Rule<theme.Theme>[] = [size.rule('outline', 'outline-width')]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade proportions are used instead of separate size values.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            outline-
            <select>
              ${iterObjects(['theme.windblade.proportions', 'theme.windblade.miscSizes'], '$name', '$value', '<option value="$name" />')}
            </select>
          </util>
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

export const outlineOffset = () => {
  const rules: Rule<theme.Theme>[] = [size.rule('outline-offset', 'outline-offset')]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade proportions are used instead of separate offset values.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            outline-offset-
            <select>
              ${iterObjects(['theme.windblade.proportions', 'theme.windblade.miscSizes'], '$name', '$value', '<option value="$name" />')}
            </select>
          </util>
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

export const divide = () => {
  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Divides have been removed.</p>
    </page>
  `

  return { rules: [], docs }
}

export const ring = () => {
  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Rings have been removed.</p>
    </page>
  `

  return { rules: [], docs }
}
