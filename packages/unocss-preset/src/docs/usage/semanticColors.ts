import type { DocumentationPage } from 'unocss-docs'
import { encodeString } from 'unocss-docs'

const example1 = `
<div class="bg-normal">
  This will have the 'normal' background
  <div class="bg-accent"> And this will have the 'accent' background </div>
</div>
`

const example2 = `
<div class="bg-normal">
  This will have the 'normal' background and default foreground color.
  <span class="text-fg-2"> And this will have the secondary foreground color </span>
  <div class="bg-fg-2"> <!-- This div has secondary foreground color as background --> </div>
</div>
`
const example3 = `
<body class="scheme-auto-80 bg-normal">
  ...
</body>
`

const example4 = `
<body class="scheme-dark scheme-auto-80 bg-normal">
  <h1>Always-dark website</h1>
  <section class="bg-accent">Default (orange)</section>
  <section class="scheme-auto-240 bg-accent">Blue</section>
  <section class="scheme-auto-280 bg-accent">Purple</section>
</body>
`

const example5 = `
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

  return LCHToCSSColor(lca.l, lca.c, brandHue, lca.a).rgba;
});

export default getBrandColor;`

const main: DocumentationPage = `
  <page>
    <h1>Using semantic colors</h1>
    <p>Windblade comes with a semantic color system. Refer to colors by their names.</p>
    <pre lang="html" code="${encodeString(example1)}" />

    <h2>Foreground colors</h2>
    <p>All colors have one or more foreground colors. The first foreground color is set as CSS color automatically but you can override it with others or use it for other properties. The foreground colors are updated whenever the bg utility is applied.</p>
    <pre lang="html" code="${encodeString(example2)}" />

    <h2>Hue &amp; color scheme</h2>
    <p>Change color hue by applying color rules together with or sheme-(auto|dark|light)-{number} or inside elemetns with that class.</p>
    <pre lang="html" code="${encodeString('<div class="scheme-auto-80 bg-normal"></div>')}" />

    <p>It is a good idea apply a default color scheme at the root of your app.</p>
    <pre lang="html" code="${encodeString(example3)}" />

    <p><code>@media(prefers-color-scheme)</code> is used for scheme-auto-... by default but you can override this behaviour with <code>scheme-(dark|light)</code>.</p>
    <pre lang="html" code="${encodeString(example4)}" />

    <h2>Using Windblade colors in JavaScrtipt</h2>
    <p>Sometimes you might need to set a color with JavaScript and you might be unable to use a class (e.g. drawing to a canvas). In those situations, you can use Windblade's core module.</p>
    <pre lang="ts" code="${encodeString(example5)}" />
  </page>
`

export default main
