import { defineConfig } from 'vite'
import unocss from '@unocss/vite'
import type { Dollar } from '@windblade/unocss-preset-dollars'
import presetDollars from '@windblade/unocss-preset-dollars'

/** Our custom dollars (key value paris) */
const dollars: Dollar[] = [
  ['small', 0.5],
  ['normal', 1],
  ['large', 2],
]

export default defineConfig({
  plugins: [
    unocss({
      rules: [
        /** Custom rule that sets `font-size` to whatever is specified after `font-size-` with 'rem' at the end. */
        [/^font-size-(.+)$/, ([_, value]) => {
          return {
            'font-size': `${value}rem`,
          }
        }],
      ],
      presets: [
        presetDollars({
          // By default the preset will try to use values inside `theme.windlade.propotions` but we don't have that in this setup so we define a custom getter instead.
          getVariables: () => dollars,

          // We could also use values from the theme here.
          // getVariables: (theme) => Object.entries(theme.something.something),
        }),
      ],
    }),
  ],
})
