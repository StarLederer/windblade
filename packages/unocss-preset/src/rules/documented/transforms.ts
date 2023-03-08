import type { Rule } from '@unocss/core'
import type { DocumentationPage } from 'unocss-docs'
import { ruleUtils } from '@windblade/core'
import type { theme } from '@windblade/core'

const { size } = ruleUtils

export const scale = () => {
  const rules: Rule<theme.Theme>[] = [size.rule('scale', 'transform', { defaultUnit: '', postprocess: val => `scale${val}` })]

  const docs: DocumentationPage = {
    description: 'X and Y variants have been removed because they are not logical properties. Windblade also uses proportions instead of separete values.',
    utilities: ['scale-<theme.windblade.proportions>'],
    preview: util => 'TODO',
  }

  return { rules, docs }
}

export const rotate = () => {
  const rules: Rule<theme.Theme>[] = [size.rule('rotate', 'transform', { defaultUnit: 'deg', postprocess: val => `rotate${Number(val) * 360}` })]

  const docs: DocumentationPage = {
    description: 'Windblade uses proportions instead of separete values.',
    utilities: ['rotate-<theme.windblade.proportions>'],
    preview: util => 'TODO',
  }

  return { rules, docs }
}

export const translate = () => {
  const rules: Rule<theme.Theme>[] = [size.rule('translate', 'transform', { postprocess: val => `translate${val}` })]

  const docs: DocumentationPage = {
    description: 'X and Y variants have been removed because they are not logical properties. Windblade also uses proportions instead of separete values.',
    utilities: ['translate-<theme.windblade.proportions>'],
    preview: util => 'TODO',
  }

  return { rules, docs }
}

export const skew = () => {
  const rules: Rule<theme.Theme>[] = [size.rule('skew', 'transform', { defaultUnit: 'deg', postprocess: val => `skew${Number(val) * 360}` })]

  const docs: DocumentationPage = {
    description: 'Windblade uses proportions instead of separete values.',
    utilities: ['skew-<theme.windblade.proportions>'],
    preview: util => 'TODO',
  }

  return { rules, docs }
}
