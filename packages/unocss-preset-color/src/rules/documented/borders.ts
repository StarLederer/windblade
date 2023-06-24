import type { Rule } from '@unocss/core'
import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { Theme } from '@windblade/core'

const { color, logical } = ruleUtils

export function borderColor() {
  const rules: Rule<Theme>[] = [
    ...logical.edgeRules('border', 'color', 'border', 'color', color.colorRule),
    ...logical.edgeRules('border', 'color-fg', 'border', 'color', color.fgColorRule),
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade uses semantic colors.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            border-color-
            <select>
              <for object="theme.windblade.colors" key-as="$name" value-as="$color">
                <option value="$name"/>
              </for>
              <for object="theme.windblade.miscColors" key-as="$name" value-as="$color">
                <option value="$name"/>
              </for>
            </select>
          </util>
          <util>
            border-color-fg-
            <input type="integer" />
          </util>
          <util>
            border-
            <select>
              ${Object.keys(logical.abbreviations.axis).map(val => `<option value="${val}" />`)}
              ${Object.keys(logical.abbreviations.edges).map(val => `<option value="${val}" />`)}
            </select>
            -color-
            <select>
              <for object="theme.windblade.colors" key-as="$name" value-as="$color">
                <option value="$name"/>
              </for>
              <for object="theme.windblade.miscColors" key-as="$name" value-as="$color">
                <option value="$name"/>
              </for>
            </select>
          </util>
          <util>
            border-
            <select>
              ${Object.keys(logical.abbreviations.axis).map(val => `<option value="${val}" />`)}
              ${Object.keys(logical.abbreviations.edges).map(val => `<option value="${val}" />`)}
            </select>
            -color-fg-
            <input type="integer" />
          </util>
        </utils>

        <renderer html="${encodeString(`
          <div class="border border-width-s.2 $util rounded-s size-i-full max-size-i-l.2 aspect-1/1"></div>
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

export function outlineColor() {
  const rules: Rule<Theme>[] = [
    color.colorRule('outline', 'outline-color'),
    color.fgColorRule('outline-fg', 'outline-color'),
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade uses semantic colors.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            outline-color-
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
            outline-color-fg-
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
