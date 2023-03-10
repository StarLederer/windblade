import type { Rule } from '@unocss/core'
import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'
import { selectLogical } from './doc-components'

const { logical, size } = ruleUtils

export const scrollMargin = () => {
  const rules: Rule<theme.Theme>[] = size.edgeRules('scroll-m', '', 'scroll-margin', '')

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade proportions are used instead of separate size values.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          ${[false, true].map(val => `
            <util>
              scroll-m-
              ${val ? `${selectLogical({ axis: true, edges: true })}-` : ''}
              <select>
                <for object="theme.windblade.proportions" key-as="$name" value-as="$value">
                  <option value="$name" />
                </for>
              </select>
            </util>
          `).join('')}
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

export const scrollPadding = () => {
  const rules: Rule<theme.Theme>[] = size.edgeRules('scroll-p', '', 'scroll-padding', '')

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Windblade proportions are used instead of separate size values, and physical properties are replaced with logical.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          ${[false, true].map(val => `
            <util>
              scroll-p-
              ${val ? `${selectLogical({ axis: true, edges: true })}-` : ''}
              <select>
                <for object="theme.windblade.proportions" key-as="$name" value-as="$value">
                  <option value="$name" />
                </for>
              </select>
            </util>
          `).join('')}
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

export const scrollSnapType = () => {
  const rules: Rule<theme.Theme>[] = [
    ['snap-none', { 'scroll-snap-type': 'none' }],
    ['snap-both', { 'scroll-snap-type': 'both var(--wb-scroll-snap-strictness)' }],
    ['snap-mandatory', { '--wb-scroll-snap-strictness': 'mandatory' }],
    ['snap-proximity', { '--wb-scroll-snap-strictness': 'proximity' }],
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p><code>snap-x</code> and <code>snap-y</code> have been removed because they have no logical counterparts yet.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>snap-none</util>
          <util>snap-both</util>
          <util>snap-mandatory</util>
          <util>snap-proximity</util>
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

export const touchAction = () => {
  const rules: Rule<theme.Theme>[] = [
    ['touch-auto', { 'touch-action': 'auto' }],
    ['touch-none', { 'touch-action': 'none' }],
    ['touch-pinch-zoom', { 'touch-action': 'pinch-zoom' }],
    ['touch-manipulation', { 'touch-action': 'manipulation' }],
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p><code>pan</code> touch-actions have been removed because they have no logical counterparts yet.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>touch-auto</util>
          <util>touch-none</util>
          <util>touch-pinch-zoom</util>
          <util>touch-manipulation</util>
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
