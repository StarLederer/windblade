import { DocumentedThemeObject } from "../../docs/types";
import { ThemeColorCombo } from "../Theme";

const newColor = `const theme: Theme = {
  windblade: {
    colors: {
      'mycolor': {
        base: { dark: { l: 0, c: 0 } },
        on: [
          { dark: { l: 100, c: 0 } },
        ],
      },
    },
  },
};`;

const lightColor = `const theme: Theme = {
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
};`;

const colors: DocumentedThemeObject = (theme: any, { h1, h2, p, pre, example }) => [
  h1("Customizing semantic colors"),
  p("Colors in Windblade are based on the OkLCH model and have a base (background) and one or more 'on' (foreground) colors."),
  h2("Default colors"),
  p("It is highly encouraged that you use your own colors, however, Windblade does come with a set of well-crafted example colors that are designed to demonstrate the semantic color system and were used to build this documnentation."),
  example(`
    <div class="grid grid-fit-cols-m gap-s.4">
    ${((): string => {
      const colors = theme?.windblade?.colors;
      if (typeof colors === "object") {
        return Object.entries(colors as Record<string, ThemeColorCombo>).map(([name, colorCombo]) => `
          <div class="bg-${name} flex flex-col border border-color-surface rounded-s overflow-hidden font-bold">
            <h1 class="p-s">${name}</h1>
            <div class="size-b-px shrink-0 bg-fg-1 opacity-[0.1]"></div>
            <div class="size-b-full flex flex-col gap-s p-s">
              ${colorCombo.on.map((_, i) => `<div class="text-fg-${i + 1}">Fg-${i + 1}</div>`).join('')}
            </div>
          </div>
        `).join('');
      }
      return '<div class="theme-auto-20 font-bold">Error</div>';
    })()}
    </div>
  `),
  h2("Custom colors"),
  p("Add a color by specifying an object like the following:"),
  pre(newColor, 'ts'),
  p("Dark scheme is the default. Lightness is flipped when light color scheme is used."),
  p("If flipping lightness does not work for your design language or you need a specific color to break out of the system you can provide custom values for light mode."),
  pre(lightColor, 'ts'),
];

export default colors;
