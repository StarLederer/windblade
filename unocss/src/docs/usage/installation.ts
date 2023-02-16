import { DocumentedThemeObject } from "../../docs/types";

const main = `import { defineConfig } from 'unocss';
import presetWindblade from 'unocss-preset-windblade';

export default defineConfig({
  presets: [
    presetWindblade(),
  ],
})`;

const withVariants = `import { defineConfig } from 'unocss';
import presetWindblade from 'unocss-preset-windblade';
import presetVariants from 'unocss-preset-mini-variants';

export default defineConfig({
  presets: [
    presetWindblade(),
    presetVariants(),
  ],
})`;

const withApply = `import { defineConfig } from 'unocss';
import presetWindblade from 'unocss-preset-windblade';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
  presets: [
    presetWindblade(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})`;

const colors: DocumentedThemeObject = (_, { h1, h2, h3, p, pre, example }) => [
  h1("Installation"),
  p("Windblade is an UnoCSS preset, please follow its own guide to install it."),
  p("Once UnoCSS is installed in your proejct simply get Windblade from npm and add it to the presets array."),
  pre("npm install unocss-preset-windblade", 'sh'),
  pre(main, 'ts'),
  h2("Recommended additions"),
  p("Windblade can be used by itself, however there are other UnoCSS presets that we recommend using together with it."),
  h3("Getting hover, active, etc."),
  p("Windblade does not come with combinators, pseudo-selectors or other query modifiers so you need to get this functionality elsewhere. We recommend using unocss-preset-mini-variants."),
  pre("npm install unocss-preset-mini-variants", 'sh'),
  pre(withVariants, 'ts'),
  h3("Getting @apply"),
  p("UnoCSS offers an official solution for getting @apply in your proejcts. We recommend to use that if you need this functionality."),
  pre("npm i -D @unocss/transformer-directives", 'sh'),
  pre(withApply, 'ts'),
];

export default colors;
