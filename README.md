<h1 align="center">
  <a href="https://starlederer.github.io/windblade" target="_blank">
    <img alt="Windblade" src="https://raw.githubusercontent.com/starlederer/windblade/HEAD/brand/logo.svg" width="64" height="64" style="max-inline-size: 100%;">
  </a>

  Windblade
</h1>

<p align="center">
  Tailwind-inspired UnoCSS preset with a better color system, logical properties, and simpler customization.
</p>

<p align="center">
  <a href="https://starlederer.github.io/windblade">Homepage</a> | <a href="https://starlederer.github.io/windblade?navigation=/docs">Documentation</a> (WIP) | <a href="https://github.com/unocss/unocss">UnoCSS</a> | <a href="https://tailwindcss.com/">Tailwind</a>
</p>

## Progress

- [x] All suitable Tailwind utilities implemented (all except animations).
- [x] All rtl-tb utilities replaced with logical counterparts (or removed if not possible).
- [x] Pseudo-classes and pseudo-elements (chose to implement separately via [uoncss-preset-mini-variants](https://github.com/StarLederer/unocss-preset-mini-variants))
- [x] Automatic color system.
- [x] Javascript access to the automatic color system.
- [x] Detailed README.
- [ ] Documentation with demos.
- [ ] Published to NPM.
- [ ] Listed on [UnoCSS](https://github.com/unocss/unocss) readme.
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

[Documentation](https://starlederer.github.io/windblade?navigation=/docs) is in development. Until it is complete please follow [Tailwind's docs](https://tailwindcss.com/docs/aspect-ratio) and refer to our documentation and this readme for differences. *You will not have to refer to Tilwind's docs or this readme once our own docuentation is complete.*

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

Change color hue by applying `bg-{color name}` together with `sheme-(auto|dark|light)-{number}` or together with `style="--hue: {number}"` (we recommend using the utility, but the CSS variable can be useful if you need to control hue with JavaScript).

```html
<div class="scheme-auto-80 bg-normal"></div>
```

It is a good idea to override the default hue at the root of your app.

```html
<body class="scheme-auto-80 bg-normal">
  ...
</body>
```

### Using Windblade colors in JavaScrtipt

Sometimes you might need to set a color with JavaScript and you might be unable to use a class (e.g. drawing to a canvas). In those situations, you can use Windblade's `core` module.

```js
import { getLCA, LCHToCSSColor } from "unocss-preset-windblade/core";
import { theme } from "unocss-preset-windblade"; // this is just a source file and it does not know about your theme customizations. If you are using your own colors you should import them instead

const brandHue = 80;

getBrandColor((light?: boolean) => {
  const colors = getLCA(theme.windblade.colors['brand'].base); // returns light and dark variants with all values calculated

  let lca;
  if (light) {
    lca = colors.light;
  } else {
    lca = colors.dark;
  }

  let rgb = LCHToCSSColor(lca.l, lca.c, brandHue);

  return `rgb(${rgb.r}, ${rgb.g}%, ${rgb.b}%, ${lca.a}%)`;
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

For Windblade specific theme customization see the [Docs](https://starlederer.github.io/windblade?navigation=/docs/Theme-Semantic%20Colors). For for a general guide on how to customize UnoCSS themes see [UnoCSS reamde](https://github.com/unocss/unocss#extend-theme).

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
