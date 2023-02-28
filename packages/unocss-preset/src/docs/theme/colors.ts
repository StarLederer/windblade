import type { DocumentedThemeObject } from 'unocss-docs'
import type { theme } from '@windblade/core'

const colors: DocumentedThemeObject<theme.Theme> = theme =>
`# Semantic colors

Colors in Windblade are based on the [OkLCH](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) model and have a 'base' and one or more 'on' colors.

## Default colors

It is highly encouraged that you use your own colors, however, Windblade does come with a set of well-crafted example colors that are designed to demonstrate the semantic color system and were used to build this documnentation.

\`\`\`uno-html
<div class="grid grid-fit-cols-m gap-s.4">
  ${((): string => {
    const colors = theme.windblade.colors
    if (typeof colors === 'object') {
      return Object.entries(colors as Record<string, theme.ThemeColorCombo>).map(([name, colorCombo]) => `
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
\`\`\`

## Custom colors

Add a color by specifying an object like the following:

\`\`\`ts
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
};
\`\`\`

Dark scheme is the default and, unless overriden, light scheme is generated automatically by flipping the lightness value. That is great for effortlessly prototyping a light mode but you will often want more than simple lightness fliping. In those cases you can override any light mode component of the color manually. Default windblade colors use this to increase contrast and saturation in light mode.

\`\`\`ts
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
};
\`\`\`
`

export default colors
