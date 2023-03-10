import type { Rule } from '@unocss/core'
import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { size } = ruleUtils

export const boxShadow = () => {
  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Box shadows are removed for now because Tailwind's implementation is too limiting. Discussion in progress.</p>
    </page>
  `

  return { rules: [], docs }
}

export const opacity = () => {
  const rules: Rule<theme.Theme>[] = [size.rule('opacity', 'opacity', { defaultUnit: '' })]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade uses proportions instead of separete values.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            opacity-
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
