import type { Rule } from '@unocss/core'
import type { DocumentationPage } from '@windblade/unocss-docs'
import { encodeString } from '@windblade/unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { Theme } from '@windblade/core'

const { color } = ruleUtils

export function accentColor() {
  const rules: Rule<Theme>[] = [color.colorRule('accent', 'accent-color')]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade uses semantic colors.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
          accent-
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
          accent-fg-
            <input type="integer" />
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

export function caretColor() {
  const rules: Rule<Theme>[] = [
    color.colorRule('caret', 'caret-color'),
    color.fgColorRule('caret-fg', 'caret-color'),
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade uses semantic colors.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
          caret-
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
          caret-fg-
            <input type="integer" />
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
