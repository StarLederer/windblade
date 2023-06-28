import type { Rule } from '@unocss/core'
import type { DocumentationPage } from '@windblade/unocss-docs'
import { encodeString } from '@windblade/unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { Theme } from '@windblade/core'

const { size } = ruleUtils

export function scale() {
  const rules: Rule<Theme>[] = [size.rule('scale', 'transform', { defaultUnit: '', postprocess: val => `scale${val}` })]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>X and Y variants have been removed because they are not logical properties. Windblade also uses proportions instead of separete values.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            scale-
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

export function rotate() {
  const rules: Rule<Theme>[] = [size.rule('rotate', 'transform', { defaultUnit: 'deg', postprocess: val => `rotate${Number(val) * 360}` })]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade uses proportions instead of separete values.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            rotate-
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

export function translate() {
  const rules: Rule<Theme>[] = [size.rule('translate', 'transform', { postprocess: val => `translate${val}` })]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>X and Y variants have been removed because they are not logical properties. Windblade also uses proportions instead of separete values.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            translate-
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

export function skew() {
  const rules: Rule<Theme>[] = [size.rule('skew', 'transform', { defaultUnit: 'deg', postprocess: val => `skew${Number(val) * 360}` })]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade uses proportions instead of separete values.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            skew-
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
