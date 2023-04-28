import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'
import type { ThemeColorCombo } from '@windblade/core'
import theme from '../../theme'

const wb = theme.windblade

const example = `
const theme: Theme = {
  windblade: {
    colors: {
      'mycolor': {
        base: { dark: { l: 0, c: 0 } },
        on: [
          { dark: { l: 1, c: 0 } },
        ],
      },
    },
  },
};`

const example2 = `
const theme: Theme = {
  windblade: {
    colors: {
      'myColor': {
        base: { dark: { l: 0, c: 0 }, light: { l: 0.9, c: 0.05 } }, // slightly more saturated and darker than it would be otherwise in light mode (1 - 0 = 1, we tell it to be 0.9)
        on: [
          { dark: { l: 1, c: 0 }, light: { a: 0.8 } }, // more transparent in light mode (80%)
        ],
      },
      'brandColor': {
        base: { dark: { l: 0.6, c: 0.3 }, light: { l: 0.6 } }, // has lightness 0.6 in both color schemes
        on: [
          { dark: { l: 0, c: 0 } },
        ],
      },
    },
  },
};`

const colors: DocumentationPage = `
  <page>
    <h1><title /></h1>
    <p>Colors in Windblade are based on the <a href="https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl">OkLCH</a> model and have a 'base' and one or more 'on' colors.</p>

    <h2>Default colors</h2>
    <p>It is highly encouraged that you use your own colors, however, Windblade does come with a set of well-crafted example colors that are designed to demonstrate the semantic color system and were used to build this documnentation.</p>
    <example html="${encodeString(`
      <div class="grid grid-fit-cols-m gap-s.4">
        ${((): string => {
          const colors = wb.colors
          if (typeof colors === 'object') {
            return Object.entries(colors as Record<string, ThemeColorCombo>).map(([name, colorCombo]) => `
              <div class="bg-${name} flex flex-col border border-color-surface rounded-s overflow-hidden font-bold">
                <h1 class="p-s">${name}</h1>
                <div class="size-b-px shrink-0 bg-fg-1 opacity-[0.1]"></div>
                <div class="size-b-full flex flex-col gap-s p-s">
                  ${colorCombo.on.map((_, i) => `<div class="text-fg-${i + 1}">Fg-${i + 1}</div>`).join('')}
                </div>
              </div>
            `).join('')
          }
          return '<div class="theme-auto-20 font-bold">Error</div>'
        })()}
      </div>
    `)}" />

    <h2>Custom colors</h2>
    <p>Add a color by specifying an object like the following:</p>
    <pre lang="ts" code="${encodeString(example)}" />

    <p>Dark scheme is the default and, unless overriden, light scheme is generated automatically by flipping the lightness value. That is great for effortlessly prototyping a light mode but you will often want more than simple lightness fliping. In those cases you can override any light mode component of the color manually. Default windblade colors use this to increase contrast and saturation in light mode.</p>
    <pre lang="ts" code="${encodeString(example2)}" />
  </page>
`

export default colors
