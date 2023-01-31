<h1 align="center">
  <a href="https://starlederer.github.io/windblade" target="_blank">
    <img alt="Windblade" src="https://raw.githubusercontent.com/starlederer/windblade/HEAD/brand/logo.svg" width="64" height="64" style="max-inline-size: 100%;">
  </a>

  Windblade
</h1>

<p align="center">
  Tailwind-inspired UnoCSS preset with logical properties and a better color system.
</p>

## Progress

- [x] All suitable Tailwind utilities implemented (all except animations).
- [x] All rtl-tb utilities replaced with logical counterparts (or removed if not possible).
- [x] Pseudo-classes and pseudo-elements (chose to implement separately via [uoncss-preset-mini-variants](https://github.com/StarLederer/unocss-preset-mini-variants))
- [x] Automatic color system.
- [x] Javascript access to the automatic color system.
- [x] Detailed README.
- [ ] Published to NPM.
- [ ] Cool demo.
- [ ] Listed on [UnoCSS](https://github.com/unocss/unocss) readme.
- [ ] Documentation.
- [ ] Become UnoCSS default preset 🤷🫣

## Installation

```sh
npm i unocss-preset-windblade unocss --save-dev
# or
yarn add unocss-preset-windblade unocss -D
# or
pnpm add unocss-preset-windblade unocss -D
```

## Usage

There are no docks at the moment but you should be able to follow [Tailwind's docks](https://tailwindcss.com/docs/aspect-ratio) without major problems. Please see the following sections for intentional differences with Tailwind.

### Configuring with UnoCSS

Windblade is an UnoCSS preset, please follow its own [guide](https://github.com/unocss/unocss#installation) to install it.

```js
import { defineConfig } from 'unocss'
import presetWindblade from 'unocss-preset-windblade'
import presetVariants from 'unocss-preset-mini-variants' // optional

export default defineConfig({
  presets: [
    presetWindblade({
      // config
    }),
    presetVariants(), // optional
  ],
})
```

### Using proportions

Windblade uses Tailwind's 'spacing' with 't' appended to them + 'screen' units as proportions by default.

```html
<main class="max-size-i-xl">
  <div class="m-10t p-2t"></div>
</main>
```

Since Windblade is so easily customizable it is highly recommended that you change the units to match your design system.

```js
import { defineConfig } from 'unocss'

export default defineConfig({
  extendTheme: [
    ({ windblade }) => {
      // These are the proportions Star uses
      windblade.proportions = {
        's.2': 0.2,
        's.4': 0.4,
        's.5': 0.5,
        's.6': 0.6,
        's.8': 0.8,
        's': 1,
        'm.2': 2,
        'm.4': 4,
        'm.5': 5,
        'm.6': 6,
        'm.8': 8,
        'm': 10,
        'l.2': 20,
        'l.4': 40,
        'l.5': 50,
        'l.6': 60,
        'l.8': 80,
        'l': 100,
      };
    }
  ],
})
```

### Using colors

Windblade comes with a semantic color system. Refer to colors by their names as defined [here](https://github.com/StarLederer/windblade/blob/master/unocss/theme/index.ts) or in your theme.

```html
<div class="bg-normal">
  This will have the 'normal' background
  <div class="bg-accent"> And this will have the 'accent' background </div>
</div>
```

All colors have one or more foreground colors. The first foreground color is set as CSS `color` automatically but you can override it with others or use it for other properties. The foreground colors are updated whenever the `bg` utility is applied.

```html
<div class="bg-normal">
  This will have the 'normal' background and default foreground color.
  <span class="text-fg-2"> And this will have the secondary foreground color </span>
  <div class="bg-fg-2"> <!-- This div has secondary foreground color as background --> </div>
</div>
```

Change color hue by applying `bg-{color name}` together with `hue-{number}` or together with `style="--hue: {number}"` (we recommend using the utility, but the CSS variable can be useful if you need to control hue with JavaScript).

```html
<div class="hue-45 bg-normal"></div>
```

It is a good idea to override the default hue at the root of your app.

```html
<body class="hue-45 bg-normal">
  ...
</body>
```

Windblade can make colors interactive which uses a `calc` and a css varaible to boost color lightness when `highlight` or `highlight+` utilities are applied.

```html
<button class="bg-interactive hover:highlight active:highlight+"></button>
```

Windblade uses `@media (prefers-color-scheme: light)` to determine which color scheme to use but you can override it with `scheme-dark` and `scheme-light` utilities or use `scheme-initial` to reset.

```html
<body class="hue-45 bg-normal scheme-light">
  This website is always light
  <section class="scheme-dark bg-normal">
    But this section is always dark.
  </section>
  It's a panda! 🐼
</body>
```

### Using Windblade colors in JavaScrtipt

Sometimes you might need to set a color with JavaScript and you might be unable to use a class (e.g. drawing to a canvas). In those situations, you can use Windblade's `core` module.

```js
import { getSLA } from "unocss-preset-windblade/core";
import { theme } from "unocss-preset-windblade"; // this is just a source file and it does not know about your theme customizations. If you are using your own colors you should import them instead

const brandHue = 45;

getBrandColor((light?: boolean) => {
  const colors = getSLA(theme.windblade.colors['brand'].base); // returns light and dark variants with all values calculated

  let sla;
  if (light) {
    sla = colors.light;
  } else {
    sla = colors.dark;
  }

  return `hsla(${brandHue}, ${sla.s}%, ${sla.l}%, ${sla.a}%)`;
});

export default getBrandColor;

```

### Using logical properties

Windblade uses logical properties and values only.

All properties that can be customized on multiple axis/edges/corenrs can be prepended with:
- `-b` for block axis (e.g. `size-b`).
- `-i` for inline axis (e.g. `size-i`).
- `-bs` and `-be` for block start and end edges.
- `-is` and `-ie` for inline start and end edges.
- `-ss` `-se` `-es` `-ee` for corners (start start, start end, end start & end end)

Windblade polyfills logical values so you can use this even where CSS does not support it yet (e.g. `background-position` with `bg-{corner}` utility).

If you are new to logical properties try playing with `bg-gradient-to-{edge/corner}` and see which way the gradient goes.

Please note that `width` and `height` are completely removed in favor of `size-{axis}`.

### Customizing theme

This section explains the options specific to Windblade, for a general guide on how to customize UnoCSS themes see [UnoCSS reamde](https://github.com/unocss/unocss#extend-theme).

#### Colors

Colors in windblade are based on the [HSL](https://en.wikipedia.org/wiki/HSL_and_HSV) model and have a base (background) and one or more 'on' (foreground) colors.

Add a color by specifying an object like the following:

```js
const theme: Theme = {
  windblade: {
    colors: {
      'mycolor': {
        base: { dark: { s: 0, l: 0 } },
        on: [
          { dark: { s: 0, l: 100 } },
        ],
      },
    },
  },
};
```

Dark scheme is the default. Lightness is flipped when light color scheme is used.

The HSL color space is not perfect and different hues can look darker or brighter than others. Windblade will switch to a much better [OkLCH](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch) model when browser support improves. For now, Windblade allows you to customize the light mode appearance if your colors need it. This is especially useful with brand and accent colors that should not adapt to color schemes.

It is highly recommended to avoid doing this!

```js
const theme: Theme = {
  windblade: {
    colors: {
      'myColor': {
        base: { dark: { s: 0, l: 0 }, light: { s: 10, l: 90 } }, // slightly more saturated and darker than it would be otherwise in light mode (100 - 0 = 100, we tell it to be 90)
        on: [
          { dark: { s: 0, l: 100 }, light: { a: 80 } }, // more transparent in light mode (80%)
        ],
      },
      'brandColor': {
        base: { dark: { s: 100, l: 60 }, light: { l: 60 } }, // has lightness 60 in both color schemes
        on: [
          { dark: { s: 0, l: 0 } },
        ],
      },
    },
  },
};
```

Colors can be marked as `interactive`, it will make them respect `highlight` and `highlight+` utilities. This is not always on to avoid extra `calc`s.

```js
const theme: Theme = {
  windblade: {
    colors: {
      'my-interactive-color': {
        base: { dark: { s: 0, l: 0 } },
        on: [
          { dark: { s: 0, l: 100 } },
        ],
        interactive: true,
      },
    },
  },
};
```

#### Proportions

Proportions are used throughout the whole preset for size, duration, opacity, etc.

Proportions are simple numbers that are converted to relevant units automatically (rem is used for sizing).

```js
const theme: Theme = {
  windblade: {
    proportions: {
      'half': 0.5,
      'full': 1,
      'double': 2,
    },
  },
};
```

#### Other customizations

See the [default theme](https://github.com/StarLederer/windblade/blob/master/unocss/theme/index.ts) for other values you can customize.

### WIP: Using calculations

Tailwind allows you to use custom values when your design specification does not fit with their design language. Windblade does not allow that to help you stay within the design language but allows you to do calculations with your proportions right inside CSS.

```html
<div class="p-4t">
  Label
  <!-- Custom underline -->
  <div class="absolute size-i-full size-b-1t inset-bottom-((4t - 1t) / 2)"></div>
</div>
```

### Hover, focus and other states

Windblade does not come with functionality like hover or focus states. Please use Windblade together with [unocss-preset-mini-variants](https://www.npmjs.com/package/unocss-preset-mini-variants) if you need this functionality.

## About Windblade

Windblade is a Tailwind-inspired UnoCSS preset that does three things better than Tailwind. First, Windblade uses semantic hue-independent colors that automatically adapt to the browser color scheme. Second, it uses logical properties instead of right-to-left, top-to-bottom ones and polyfills logical values which have not been implemented in CSS yet. And finally, it has a much simpler theme that is faster to customize and fit your design language.

### Semantic colors

#### Tailwind has too many colors

Tailwind has an incomprehensible amount of colors which is very hard to customize. Windblade's semantic colors solve this by using color "meanings" like 'background' or 'surface' instead of actual color values like 'red', 'green', 'blue' or 'desaturated blue' and generating both background and foreground colors. HSL is used in the background to power this so you can use any hue you need with the `hue-{number}` or `--hue` CSS variable

T🤮ilwind:
```js
module.exports = {
  theme: {
    colors: {
      'red': {
        100: 'hsl(0, 60%, 10%)',
        200: 'hsl(0, 60%, 20%)',
        300: 'hsl(0, 60%, 30%)',
        400: 'hsl(0, 60%, 40%)',
        500: 'hsl(0, 60%, 50%)',
        600: 'hsl(0, 60%, 60%)',
        700: 'hsl(0, 60%, 70%)',
        800: 'hsl(0, 60%, 80%)',
        900: 'hsl(0, 60%, 90%)',
      },
      'desaturated-red': {
        100: 'hsl(0, 20%, 10%)',
        200: 'hsl(0, 20%, 20%)',
        300: 'hsl(0, 20%, 30%)',
        400: 'hsl(0, 20%, 40%)',
        500: 'hsl(0, 20%, 50%)',
        600: 'hsl(0, 20%, 60%)',
        700: 'hsl(0, 20%, 70%)',
        800: 'hsl(0, 20%, 80%)',
        900: 'hsl(0, 20%, 90%)',
      },
      'green': {
        100: 'hsl(120, 60%, 10%)',
        200: 'hsl(120, 60%, 20%)',
        300: 'hsl(120, 60%, 30%)',
        400: 'hsl(120, 60%, 40%)',
        500: 'hsl(120, 60%, 50%)',
        600: 'hsl(120, 60%, 60%)',
        700: 'hsl(120, 60%, 70%)',
        800: 'hsl(120, 60%, 80%)',
        900: 'hsl(120, 60%, 90%)',
      },
      'desaturated-green': {
        100: 'hsl(120, 20%, 10%)',
        200: 'hsl(120, 20%, 20%)',
        300: 'hsl(120, 20%, 30%)',
        400: 'hsl(120, 20%, 40%)',
        500: 'hsl(120, 20%, 50%)',
        600: 'hsl(120, 20%, 60%)',
        700: 'hsl(120, 20%, 70%)',
        800: 'hsl(120, 20%, 80%)',
        900: 'hsl(120, 20%, 90%)',
      },
      'blue': {
        100: 'hsl(240, 60%, 10%)',
        200: 'hsl(240, 60%, 20%)',
        300: 'hsl(240, 60%, 30%)',
        400: 'hsl(240, 60%, 40%)',
        500: 'hsl(240, 60%, 50%)',
        600: 'hsl(240, 60%, 60%)',
        700: 'hsl(240, 60%, 70%)',
        800: 'hsl(240, 60%, 80%)',
        900: 'hsl(240, 60%, 90%)',
      },
      'desaturated-blue': {
        100: 'hsl(240, 20%, 10%)',
        200: 'hsl(240, 20%, 20%)',
        300: 'hsl(240, 20%, 30%)',
        400: 'hsl(240, 20%, 40%)',
        500: 'hsl(240, 20%, 50%)',
        600: 'hsl(240, 20%, 60%)',
        700: 'hsl(240, 20%, 70%)',
        800: 'hsl(240, 20%, 80%)',
        900: 'hsl(240, 20%, 90%)',
      },
    },
  },
}
```
```html
<div class="bg-red-600 text-red-200"> Red </div>
<div class="bg-green-600 text-green-200"> Green </div>
<div class="bg-blue-600 text-blue-200"> Blue </div>
<div class="bg-blue-600 text-desaturated-blue-200"> Blue but text is desaturated </div>
```

Windblade ⚡:
```js
unocss({
  theme: {
    windblade: {
      colors: {
        'surface': {
        base: { dark: { s: 60, l: 80 } },
        on: [
          { dark: { s: 20, l: 20 } },
          { dark: { s: 10, l: 20 } },
        ]
      },
      },
    },
  },
}),
```
```html
<div class="hue-0 bg-surface"> Red </div>
<div class="hue-120 bg-surface"> Green </div>
<div class="hue-240 bg-surface"> Blue </div>
<div class="hue-240 bg-surface text-fg-2"> Blue but text is desaturated </div>
```

#### Foreground colors in Tailwind are too much manual work

Tailwind provides a color framework but does not help you use it. Windblade's semantic colors solve this by automatically applying foreground colors and giving you semantic variations of them.

T🤮ilwind:
```html
<div class="bg-blue-100 text-blue-900"> Primary </div>
<div class="bg-blue-100 text-blue-800"> Secondary </div>
<div class="bg-blue-100 text-blue-600"> Tertiary </div>
```

Windblade ⚡:
```html
<div class="bg-blue"> Primary (text-fg-1 is applied by default) </div>
<div class="bg-blue text-fg-2"> Secondary </div>
<div class="bg-blue text-fg-3"> Tertiary </div>
```

#### Color-scheme adaptation with Tailwind is a nightmare

Because Tailwind defines static color values you have to manually set light and dark colors every time which is twice as much code as it could be. Windblade's semantic colors solve this by flipping the lightness value so you only declare what the color means, and Windblade figures out exactly what it should look like in different color schemes.

T🤮ilwind:
```html
<div class="bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100"> Hello </div>
```

Windblade ⚡:
```html
<div class="bg-blue"> Hello </div>
```

### Logical properties

Tailwind is very hard to use for multilanguage applications because layout reorientation has to be done manually. Windblade solves this by replacing all physical properties with logical counterparts even where CSS doesn't support it yet.

T🤮ilwind:
```html
<div class="rtl:m-right-l ltr:m-left-l"></div>
<div>Horizontal writing modes are not supported at all =(</div>
```

Windblade ⚡:
```html
<div class="m-ie-l"></div>
<div class="size-i-l"> Size in the direction of writing (width if horizontal, height if vertical) </div>
```

### Simpler theme

Tailwind configures a lot of things separately which takes a long time to customize and could just be automated. Windblade has a simpler theme that you can bend completely to your design language and rhythm very quickly.


T🤮ilwind:
```js
module.exports = {
  theme: {
    spacing: {
      '0': '0',
      '0.25': '0.25rem',
      '0.5': '0.5rem',
      '0.75': '0.75rem',
      '1': '1rem',
      '2.5': '2.5rem',
      '5': '5rem',
      '7.5': '7.5rem',
      '10': '10rem',
    },
    borderRadius: ({ theme }) => ({
      DEFAULT: '0.5rem',
      ...theme('spacing')
    }),
    opacity: ({ theme }) => ({
      ...theme('spacing')
    }),
    width: ({ theme }) => ({
      ...theme('spacing')
    }),
    height: ({ theme }) => ({
      ...theme('spacing')
    }),
    margin: ({ theme }) => ({
      ...theme('spacing')
    }),
    borderWidth: ({ theme }) => ({
      ...theme('spacing')
    }),
    // ...
    // ...
    // ...
    // ...
    // ...
    // ...
    // ...
    // ...
    // ...
    // ...
    // ...
  }
}
```

Windblade ⚡:
```js
unocss({
  theme: {
    windblade: {
      proportions: {
        '0.25': 0.25,
        '0.5': 0.5,
        '0.75': 0.75,
        '1': 1,
        '2.5': 2,
        '5': 5,
        '7.5': 7.5,
        '10': 10,
      },

      time: {
        baseUnitMs: 150, // you can use duration-0.25, duration-5, etc. where duration-1 is 150ms and the rest follows proportions
      },
    },
  },
}),
```

### Bonus: calculations

Tailwind allows you to use custom values when your design specification does not fit with their design language. Windblade does not allow that to help you stay within the design language but allows you to do calculations with your proportions right inside CSS.

T🤮ilwind:
```html
<div class="p-4">
  Label
  <!-- Custom underline -->
  <div class="absolute width-full height-1 inset-bottom-[0.375rem]"></div>
  <!-- (4-1) / 2 -->
  <!-- (1rem - 0.25rem) / 2 -->
  <!-- was hard to calculate and will break if the theme changes -->
</div>
```

Windblade ⚡:
```html
<div class="p-4t">
  Label
  <!-- Custom underline -->
  <div class="absolute size-i-full size-b-1t inset-bottom-((4t - 1t) / 2)"></div>
  <!-- We did not need to calculate anything and this will not break if proportions change -->
  <!-- One downside, we cannot name proportions with valid numbers if we want to use this -->
  <!-- Temporary gotcha: calculations do not propritize * and / so 2+2*2 is 8. Working on fixing this... -->
</div>
```
