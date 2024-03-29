import type { Rule } from '@unocss/core'
import type { DocumentationPage } from '@windblade/unocss-docs'
import { encodeString } from '@windblade/unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { Theme } from '@windblade/core'

const { size } = ruleUtils

export function borderSpacing() {
  const rules: Rule<Theme>[] = [
    size.rule('border-spacing', 'border-spacing'),
    // we are skiping border-spacing-b and borer-spacing-i for now beccause they are hard to implement
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Changing border-spacing for individual axis is not possible at the moment.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            border-spacing-
            <select>
              <for object="theme.windblade.proportions" key-as="$name" value-as="$value">
                <option value="$name" />
              </for>
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
