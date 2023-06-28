import type { Rule } from '@unocss/core'
import type { DocumentationPage } from '@windblade/unocss-docs'
import { encodeString } from '@windblade/unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { Theme } from '@windblade/core'
import { iterObjects, selectLogical } from './doc-components'

const { size } = ruleUtils

export function padding() {
  const rules: Rule<Theme>[] = size.edgeRules('p', '', 'padding', '')

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Replaced physical properties with logical.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            p-
            <select>
              ${iterObjects(['theme.windblade.proportions', 'theme.windblade.miscSizes'], '$name', '$val', `
                <option value="$name"/>
              `)}
            </select>
          </util>
          <util>
            p-
            ${selectLogical({ axis: true, edges: true })}-
            <select>
              ${iterObjects(['theme.windblade.proportions', 'theme.windblade.miscSizes'], '$name', '$val', `
                <option value="$name"/>
              `)}
            </select>
          </util>
        </utils>

        <renderer html="${encodeString(`
          <div class="$util rounded-s bg-accent">
            <div class="border border-dashed rounded-s.2">Padding</div>
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

export function margin() {
  const rules: Rule<Theme>[] = size.edgeRules('m', '', 'margin', '')

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Replaced physical properties with logical.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            m-
            <select>
              ${iterObjects(['theme.windblade.proportions', 'theme.windblade.miscSizes'], '$name', '$val', `
                <option value="$name"/>
              `)}
            </select>
          </util>
          <util>
            m-
            ${selectLogical({ axis: true, edges: true })}-
            <select>
              ${iterObjects(['theme.windblade.proportions', 'theme.windblade.miscSizes'], '$name', '$val', `
                <option value="$name"/>
              `)}
            </select>
          </util>
        </utils>

        <renderer html="${encodeString(`
          <div class="border border-dashed border-color-accent rounded-s.2">
            <div class="$util p-s rounded-s bg-accent">Margin</div>
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

export function spaceBetween() {
  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Removed this. Please use gap and flex/grid/columns instead.</p>
    </page>
  `

  return { rules: [], docs }
}
