import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'

const example = `
import { defineConfig } from 'unocss';
import windbladeColor from '@windblade/preset-color';

export default defineConfig({
  presets: [
    windbladeColor(),
  ],
});`

const removeColors = `import { defineConfig, presetMini } from 'unocss';
import windbladeColor from '@windblade/preset-color';

export default defineConfig({
  extendTheme: [
    (theme) => {
      delete theme.colors
    },
  ],
  presets: [
    windbladeColor(),
    presetMini(),
  ],
});`

const main: DocumentationPage = `
  <page>
    <h1><title /></h1>
    <p>Just like the complete Windblade, the Color module is an UnoCSS preset, please follow its own <a href="https://github.com/unocss/unocss#installation">guide</a> to install it.</p>
    <p>Once UnoCSS is installed in your project simply get @windblade/preset-color from npm and add it to the presets array.</p>
    <pre lang="sh" code="npm install @windblade/preset-color" />
    <pre lang="ts" code="${encodeString(example)}" />
    <p>That's it! You can now use Windblade's color utilities in your proejct but it is likely that you want more utilities for things like layout and typography, please read on to learn how to use Windblade's color module othether with other UnoCSS presets.</p>

    <h2>Installation with other UnoCSS presets</h2>
    <p>You likely want to combine @windblade/preset-color with other UnoCSS presets (e.g. @unocss/preset-mini) to get utilities for layout, typography and other CSS features. This should generally work without any problems but we recommend removing colors from other presets' configuration to avoid confusion and possible conflicts.</p>
    <p>You will find instructions on how to remove colors from most popuilar UnoCSS presets below. If you are using other presets consult the docs for those presets.</p>

    <h3>@unocss/preset-mini, @unocss/preset-wind &amp; @unocss/preset-uno</h3>
    <p>Use <code>extendTheme</code> property to remove <code>colors</code> from the config.</p>
    <pre lang="ts" code="${encodeString(removeColors)}" />
  </page>
`

export default main
