import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'

const example = `
import { defineConfig } from 'vite'
import unocss from '@unocss/vite'
import presetDollars from '@windblade/unocss-preset-dollars'

export default defineConfig({
  plugins: [
    unocss({
      presets: [
        presetDollars({
          getVariables: () => ([
            ['small', 0.5],
            ['normal', 1],
            ['large', 2],
          ]),
        }),
      ],
    }),
  ],
})
`

const example2 = `
import { defineConfig } from 'vite'
import unocss from '@unocss/vite'
import presetDollars from '@windblade/unocss-preset-dollars'

export default defineConfig({
  plugins: [
    unocss({
      theme: {
        things: {
          a: 'foo',
          b: 'bar',
          color: 'oklch(80 0.2 0.8)',
          size: '2rem',
          unit: 16,
        }
      }
      presets: [
        presetDollars({
          getVariables: (theme) => Object.entries(theme.things),
        }),
      ],
    }),
  ],
})
`

const main: DocumentationPage = `
  <page>
    <h1><title /></h1>
    <p>You can customize where the dollars (key-value pairs) are coming from.</p>

    <p>Define a <code>getVariables</code> function inside the preset options that returns custom dollars as an array of key-value tuples.</p>
    <pre lang="ts" code="${encodeString(example)}" />

    <p>You can also use the <code>theme</code> argument passed to the <code>getVariables</code> to repalce keys with values from your theme.</p>
    <p>Make sure that values have a <code>toString</code> metod.</p>
    <pre lang="ts" code="${encodeString(example2)}" />

    <p>If you don't provide this option the preset will make key-value pairs out of the <code>theme.windblade.proportions</code> object.</p>
  </page>
`

export default main
