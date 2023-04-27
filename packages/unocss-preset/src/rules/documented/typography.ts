import type { Rule } from '@unocss/core'
import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { Theme } from '@windblade/core'
import { iterObjects } from './doc-components'

const { size } = ruleUtils

export const fontFamily = () => {
  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Font family utilities have been removed.</p>
    </page>
  `

  return { rules: [], docs }
}

export const fontSize = () => {
  const rules: Rule<Theme>[] = [size.rule('text', 'font-size')]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade proportions are used instead of separate size values.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            text-
            <select>
              <for object="theme.windblade.proportions" key-as="$name" value-as="$value">
                <option value="$name" />
              </for>
            </select>
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

export const fontSmoothing = () => {
  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Font smoothing has been removed because Windblade sets it by default in preflight and it should never be changed. Plese open an issue if this is wrong.</p>
    </page>
  `

  return { rules: [], docs }
}

export const tracking = () => {
  const rules: Rule<Theme>[] = [size.rule('tracking', 'letter-spacing', { defaultUnit: 'em' })]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade proportions are used instead of separate size values.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
          tracking-
            <select>
              <for object="theme.windblade.proportions" key-as="$name" value-as="$value">
                <option value="$name" />
              </for>
            </select>
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

export const leading = () => {
  const rules: Rule<Theme>[] = [size.rule('leading', 'line-height', { defaultUnit: '' })]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade proportions are used instead of separate size values.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
          leading-
            <select>
              <for object="theme.windblade.proportions" key-as="$name" value-as="$value">
                <option value="$name" />
              </for>
            </select>
          </util>
        </utils>

        <renderer html="${encodeString(`
          <div class="$util text-center" style="max-inline-size: 36ch;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<div>
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

export const textDecorationThickness = () => {
  const rules: Rule<Theme>[] = [
    ['decoration-from-font', { 'text-decoration-thickness': 'from-font' }],
    size.rule('decoration', 'text-decoration-thickness'),
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade proportions are used instead of separate thickness values.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>decoration-from-font</util>
          <util>
            decoration-
            <select>
              ${iterObjects(['theme.windblade.proportions', 'theme.windblade.miscSizes'], '$name', '$value', '<option value="$name" />')}
            </select>
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

export const textUnderlineOffset = () => {
  const rules: Rule<Theme>[] = [size.rule('underline-offset', 'text-underline-offset')]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade proportions are used instead of separate ofset values.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            underline-offset-
            <select>
              ${iterObjects(['theme.windblade.proportions', 'theme.windblade.miscSizes'], '$name', '$value', '<option value="$name" />')}
            </select>
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
