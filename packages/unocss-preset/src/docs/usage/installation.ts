import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'

const example = `
import { defineConfig } from 'unocss';
import presetWindblade from '@windblade/unocss-preset';

export default defineConfig({
  presets: [
    presetWindblade(),
  ],
});`

const addition1 = `import { defineConfig } from 'unocss';
import presetWindblade from '@windblade/unocss-preset';
import presetVariants from 'unocss-preset-mini-variants';

export default defineConfig({
  presets: [
    presetWindblade(),
    presetVariants(),
  ],
});`

const addition2 = `import { defineConfig } from 'unocss';
import presetWindblade from '@windblade/unocss-preset';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
  presets: [
    presetWindblade(),
  ],
  transformers: [
    transformerDirectives(),
  ],
});`

const main: DocumentationPage = `
  <page>
    <h1><title /></h1>
    <p>Windblade is an UnoCSS preset, please follow its own <a href="https://unocss.dev/integrations">guide</a> to install it.</p>
    <p>Once UnoCSS is installed in your project simply get Windblade from npm and add it to the presets array.</p>
    <pre lang="sh" code="npm install @windblade/unocss-preset" />
    <pre lang="ts" code="${encodeString(example)}" />

    <h2>Recommended additions</h2>
    <p>Windblade can be used by itself, however there are other UnoCSS presets that we recommend using together with it.</p>

    <h3>Getting hover, active, etc.</h3>
    <p>Windblade does not come with combinators, pseudo-selectors or other query modifiers so you need to get this functionality elsewhere. We recommend using unocss-preset-mini-variants.</p>
    <pre lang="sh" code="npm install unocss-preset-mini-variants" />
    <pre lang="ts" code="${encodeString(addition1)}" />

    <h3>Getting @apply</h3>
    <p>UnoCSS offers an official solution for getting @apply in your projects. We recommend to use that if you need this functionality.</p>
    <pre lang="sh" code="npm install -D @unocss/transformer-directives" />
    <pre lang="ts" code="${encodeString(addition2)}" />
  </page>
`

export default main
