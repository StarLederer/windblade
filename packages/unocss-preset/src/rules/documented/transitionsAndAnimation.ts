import type { Rule } from '@unocss/core'
import type { DocumentationPage } from '@windblade/unocss-docs'
import { encodeString } from '@windblade/unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { Theme } from '@windblade/core'

const { time } = ruleUtils

export function transitionDelayAndDuration() {
  const rules: Rule<Theme>[] = [
    time.durationRule('duration', 'transition-duration'),
    time.durationRule('delay', 'transition-delay'),
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Time values in Windblade use same proportions as everything else.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          ${['duration', 'delay'].map(val => `
            <util>
              ${val}-
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

export function transitionTimingFunction() {
  const rules: Rule<Theme>[] = [
    time.timingFunctionRule('ease', 'transition-timing-function'),
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Time values in Windblade use same proportions as everything else.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            ease-
            <select>
              <for object="theme.windblade.time.functions" key-as="$name" value-as="$value">
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

export function animation() {
  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Animations are missing at the moment because we are unsure how to implement them in a way that they can use theme proportions. Discussion in progress. You can, however, use animation control utilities, which are missing from Tailwind.</p>
    </page>
  `

  return { rules: [], docs }
}

export function animationDelayAndDuration() {
  const rules: Rule<Theme>[] = [
    time.durationRule('animation-duration', 'animation-duration'),
    time.durationRule('animation-delay', 'animation-delay'),
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Utilities for controlling the duration &amp; delay of CSS animations. Missing from Tailwind.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          ${['duration', 'delay'].map(val => `
            <util>
              animation-${val}-
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

export function animationTimingFunction() {
  const rules: Rule<Theme>[] = [
    time.timingFunctionRule('animation-ease', 'animation-timing-function'),
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Utilities for controlling the easing of CSS animations. Missing from Tailwind.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            animation-ease-
            <select>
              <for object="theme.windblade.time.functions" key-as="$name" value-as="$value">
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
