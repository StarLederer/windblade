import { DocumentedThemeObject } from "../../docs/types";

const colors: DocumentedThemeObject<{}> = () =>
`#Installation

Windblade is an UnoCSS preset, please follow its own [guide](https://github.com/unocss/unocss#installation) to install it.

Once UnoCSS is installed in your project simply get Windblade from npm and add it to the presets array.

\`\`\`sh
npm install unocss-preset-windblade
\`\`\`

\`\`\`ts
import { defineConfig } from 'unocss';
import presetWindblade from 'unocss-preset-windblade';

export default defineConfig({
  presets: [
    presetWindblade(),
  ],
})
\`\`\`

## Recommended additions

Windblade can be used by itself, however there are other UnoCSS presets that we recommend using together with it.

### Getting hover, active, etc.

Windblade does not come with combinators, pseudo-selectors or other query modifiers so you need to get this functionality elsewhere. We recommend using unocss-preset-mini-variants.

\`\`\`sh
npm install unocss-preset-mini-variants
\`\`\`

\`\`\`ts
import { defineConfig } from 'unocss';
import presetWindblade from 'unocss-preset-windblade';
import presetVariants from 'unocss-preset-mini-variants';

export default defineConfig({
  presets: [
    presetWindblade(),
    presetVariants(),
  ],
})
\`\`\`

### Getting @apply

UnoCSS offers an official solution for getting @apply in your projects. We recommend to use that if you need this functionality.

\`\`\`sh
npm install -D @unocss/transformer-directives
\`\`\`

\`\`\`ts
import { defineConfig } from 'unocss';
import presetWindblade from 'unocss-preset-windblade';
import transformerDirectives from '@unocss/transformer-directives';

export default defineConfig({
  presets: [
    presetWindblade(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
\`\`\`
`;

export default colors;
