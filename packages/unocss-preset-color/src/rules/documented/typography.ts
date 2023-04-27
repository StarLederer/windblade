import type { Rule } from '@unocss/core'
import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { Theme } from '@windblade/core'

const { color } = ruleUtils

export const textColor = () => {
  const rules: Rule<Theme>[] = [
    color.colorRule('text', 'color'),
    color.fgColorRule('text-fg', 'color'),
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade uses semantic colors.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            text-
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
            text-fg-
            <input type="integer" />
          </util>
        </utils>

        <renderer html="${encodeString(`
          <div class="$util">Lorem ipsum<div>
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

export const textDecorationColor = () => {
  const rules: Rule<Theme>[] = [
    color.colorRule('decoration', 'text-decoration-color'),
    color.fgColorRule('decoration-fg', 'text-decoration-color'),
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade uses semantic colors.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
          decoration-
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
          decoration-fg-
            <input type="integer" />
          </util>
        </utils>

        <renderer html="${encodeString(`
          <div class="underline $util">Lorem ipsum<div>
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
