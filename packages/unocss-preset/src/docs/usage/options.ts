import type { DocumentationPage } from '@windblade/unocss-docs'
import { encodeString } from '@windblade/unocss-docs'
import { themes } from '@windblade/core'

const theme = `
import { defineConfig } from 'unocss';
import presetWindblade from '@windblade/unocss-preset';

export default defineConfig({
  presets: [
    presetWindblade({
      theme: 'windblade',
    }),
  ],
});`

const main: DocumentationPage = `
  <page>
    <h1><title /></h1>
    <p>At the moment Windblade only exposes one option which configures which theme preset is used.</p>
    <p>To specify which preset to use define the <code>theme</code> value in the preset options:</p>
    <pre lang="ts" code="${encodeString(theme)}" />

    <p>The following themes are available:</p>
    <ul>
      ${Object.keys(themes).map(name => `<li><code>${name}</code></li>`).join('')}
    </ul>

    <p><small>Please note that the <code>material3</code> theme is not finished and is almost unusable at the moment.</small></p>
  </page>
`

export default main
