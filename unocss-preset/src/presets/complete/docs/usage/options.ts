import { DocumentedThemeObject } from "../../docs/types";
import themes from "../../themes"

const colors: DocumentedThemeObject<{}> = () =>
`# Options

At the moment Windblade only exposes one option which configures which theme preset is used.

To specify which preset to use define the \`theme\` value in the preset options:

\`\`\`ts
import { defineConfig } from 'unocss';
import presetWindblade from 'unocss-preset-windblade';

export default defineConfig({
  presets: [
    presetWindblade({
      theme: 'windblade',
    }),
  ],
});
\`\`\`

The following themes are available:
${Object.keys(themes).map((name) => `- \`${name}\``).join("\n")}

**Please note that the \`material3\` theme is not finished and is almost unusable at the moment.**
`;

export default colors;
