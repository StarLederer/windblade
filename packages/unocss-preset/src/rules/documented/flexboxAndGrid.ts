import type { Rule } from '@unocss/core'
import type { DocumentationPage } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { size } = ruleUtils

const generateAuto = (ruleName: string, cssName: string) => () => {
  const rules: Rule<theme.Theme>[] = [
    [`auto-${ruleName}-auto`, { [`grid-auto-${cssName}`]: 'auto' }],
    [`auto-${ruleName}-fr`, { [`grid-auto-${cssName}`]: 'minmax(0, 1fr)' }],
    size.rule(`auto-${ruleName}`, `grid-auto-${cssName}`),
  ]

  const docs: DocumentationPage = {
    description: 'Added utilities for controlling the size of implicitly-created grid columns with proportion units.',
    utilities: [`auto-${ruleName}-auto`, `auto-${ruleName}-fr`, `auto-${ruleName}-<theme.windblade.proportions>`],
    preview: util => `
      <div class="grid ${util} ${util.includes('cols') ? 'grid-flow-col' : ''} gap-s bg-accent-3 rounded-s.4 size-i-full">
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">01</div>
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">02</div>
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">03</div>
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">04</div>
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">05</div>
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">06</div>
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">07</div>
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">08</div>
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">09</div>
      </div>
    `,
  }

  return { rules, docs }
}

export const gridAutoCols = generateAuto('cols', 'columns')
export const gridAutoRows = generateAuto('rows', 'rows')

const generateFitFill = (type: 'fit' | 'fill', ruleName: string, cssName: string) => () => {
  const rules: Rule<theme.Theme>[] = [
    size.rule(`grid-${type}-${ruleName}s`, `grid-template-${cssName}s`, { postprocess: size => (`repeat(auto-fit, minmax(${size}, 1fr))`) }),
  ]

  const docs: DocumentationPage = {
    description: `Utilities specifying the columns in a grid layout using auto-${type}. Missing from Tailwind.`,
    utilities: [`grid-${type}-${ruleName}s-<theme.windblade.proportions>`],
    preview: util => `
      <div class="grid ${util} ${util.includes('cols') ? '' : 'grid-flow-col'} gap-s bg-accent-3 rounded-s.4 size-i-full">
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">01</div>
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">02</div>
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">03</div>
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">04</div>
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">05</div>
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">06</div>
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">07</div>
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">08</div>
        <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">09</div>
      </div>
    `,
  }

  return { rules, docs }
}

export const gridFitCols = generateFitFill('fit', 'col', 'column')
export const gridFillCols = generateFitFill('fill', 'col', 'column')
export const gridFitRows = generateFitFill('fit', 'row', 'row')
export const gridFillRows = generateFitFill('fill', 'row', 'row')
