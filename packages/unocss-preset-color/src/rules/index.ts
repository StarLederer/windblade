import type { Rule } from '@unocss/core'
import type { Theme } from '@windblade/core'

import * as backgrounds from './documented/backgrounds'
import * as borders from './documented/borders'
import * as interactivity from './documented/interactivity'
import * as svg from './documented/svg'
import * as typography from './documented/typography'
import * as accessibility from './documented/accessibility'

const rules: Rule<Theme>[] = [
  // Backgrounds
  ...backgrounds.bgColor().rules,
  ...backgrounds.backgroundImage().rules,
  ...backgrounds.gradientColorStops().rules,

  // Typography
  ...typography.textColor().rules,
  ...typography.textDecorationColor().rules,

  // Borders
  ...borders.borderColor().rules,
  ...borders.outlineColor().rules,

  // Effects

  // Filters

  // Tables

  // Transitions & Animations

  // Transforms

  // Interactivity
  ...interactivity.accentColor().rules,
  ...interactivity.caretColor().rules,

  // SVG
  ...svg.fill().rules,
  ...svg.stroke().rules,

  // Accessibility
  ...accessibility.colorScheme().rules,
]

export default rules
