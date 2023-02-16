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

Please see the [Docs](https://starlederer.github.io/windblade?navigation=/docs/Usage-Installation) for installation instrucions.

## Usage

[Documentation](https://starlederer.github.io/windblade?navigation=/docs) is in development. Until it is complete please follow [Tailwind's docs](https://tailwindcss.com/docs/aspect-ratio) and refer to our documentation and this readme for differences. *You will not have to refer to Tilwind's docs or this readme once our own docuentation is complete.*

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
