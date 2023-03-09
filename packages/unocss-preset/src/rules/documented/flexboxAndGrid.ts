import type { Rule } from '@unocss/core'
import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { size } = ruleUtils

const nineChildren = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(val => `<div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">0${val}</div>`).join('\n')

const generateAuto = (ruleName: string, cssName: string) => () => {
  const rules: Rule<theme.Theme>[] = [
    [`auto-${ruleName}-auto`, { [`grid-auto-${cssName}`]: 'auto' }],
    [`auto-${ruleName}-fr`, { [`grid-auto-${cssName}`]: 'minmax(0, 1fr)' }],
    size.rule(`auto-${ruleName}`, `grid-auto-${cssName}`),
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Added utilities for controlling the size of implicitly-created grid columns with proportion units.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>auto-${ruleName}-auto</util>
          <util>auto-${ruleName}-fr</util>
          <util>
            auto-${ruleName}-
            <select>
              <for object="theme.windblade.proportions" key-as="$name" value-as="$value">
                <option value="$name"/>
              </for>
            </select>
          </util>
        </utils>

        <renderer html="${encodeString(`
          <div class="grid $util ${ruleName === 'cols' ? 'grid-flow-col' : 'grid-flow-row'} gap-s bg-accent-3 rounded-s.4 size-i-full">
            ${nineChildren}
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

export const gridAutoCols = generateAuto('cols', 'columns')
export const gridAutoRows = generateAuto('rows', 'rows')

const generateFitFill = (type: 'fit' | 'fill', ruleName: string, cssName: string) => () => {
  const rules: Rule<theme.Theme>[] = [
    size.rule(`grid-${type}-${ruleName}s`, `grid-template-${cssName}s`, { postprocess: size => (`repeat(auto-${type}, minmax(min(${size}, 100%), 1fr))`) }),
  ]

  const docs: DocumentationPage = `
    <page>
      <h1><title /></h1>
      <p>Utilities specifying the columns in a grid layout using auto-${type}. Missing from Tailwind.</p>

      <h2>Try it</h2>
      <try-it selected="$util">
        <utils>
          <util>
            grid-${type}-${ruleName}s-
            <select>
              <for object="theme.windblade.proportions" key-as="$name" value-as="$value">
                <option value="$name"/>
              </for>
            </select>
          </util>
        </utils>

        <renderer html="${encodeString(`
          <div class="grid $util ${ruleName === 'row' ? 'grid-flow-col' : 'grid-flow-auto'} gap-s bg-accent-3 rounded-s.4 size-i-full">
            ${nineChildren}
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

export const gridFitCols = generateFitFill('fit', 'col', 'column')
export const gridFillCols = generateFitFill('fill', 'col', 'column')
export const gridFitRows = generateFitFill('fit', 'row', 'row')
export const gridFillRows = generateFitFill('fill', 'row', 'row')
