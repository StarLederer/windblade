import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'

const example = `
import { defineConfig } from 'unocss';
import windbladeDollars from '@windblade/preset-dollars';

export default defineConfig({
  presets: [
    windbladeDollars(),
  ],
});`

const main: DocumentationPage = `
  <page>
    <h1><title /></h1>
    <p>Just like the complete Windblade, the Dollars module is an UnoCSS preset, please follow its own <a href="https://unocss.dev/integrations">guide</a> to install it.</p>
    <p>Once UnoCSS is installed in your project simply get @windblade/preset-dollars from npm and add it to the presets array.</p>
    <pre lang="sh" code="npm install @windblade/preset-color" />
    <pre lang="ts" code="${encodeString(example)}" />
    <p>That's it! You can now use Windblade's dollar syntax in your project.</p>
  </page>
`

export default main
