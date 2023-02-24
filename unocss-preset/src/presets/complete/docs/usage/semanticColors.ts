import { DocumentedThemeObject } from "unocss-docs";

const colors: DocumentedThemeObject<{}> = () =>
`# Using semantic colors

Windblade comes with a semantic color system. Refer to colors by their names.

\`\`\`html
<div class="bg-normal">
  This will have the 'normal' background
  <div class="bg-accent"> And this will have the 'accent' background </div>
</div>
\`\`\`

## Foreground colors

All colors have one or more foreground colors. The first foreground color is set as CSS color automatically but you can override it with others or use it for other properties. The foreground colors are updated whenever the bg utility is applied.

\`\`\`html
<div class="bg-normal">
  This will have the 'normal' background and default foreground color.
  <span class="text-fg-2"> And this will have the secondary foreground color </span>
  <div class="bg-fg-2"> <!-- This div has secondary foreground color as background --> </div>
</div>
\`\`\`

## Hue & color scheme

Change color hue by applying color rules together with or sheme-(auto|dark|light)-{number} or inside elemetns with that class.

\`\`\`html
<div class="scheme-auto-80 bg-normal"></div>
\`\`\`

It is a good idea apply a default color scheme at the root of your app.

\`\`\`
<body class="scheme-auto-80 bg-normal">
  ...
</body>
\`\`\`

@media(prefers-color-scheme) is used for scheme-auto-... by default but you can override this behaviour with scheme-(dark|light).

\`\`\`html
<body class="scheme-dark scheme-auto-80 bg-normal">
  <h1>Always-dark website</h1>
  <section class="bg-accent">Default (orange)</section>
  <section class="scheme-auto-240 bg-accent">Blue</section>
  <section class="scheme-auto-280 bg-accent">Purple</section>
</body>
\`\`\`

## Using Windblade colors in JavaScrtipt

Sometimes you might need to set a color with JavaScript and you might be unable to use a class (e.g. drawing to a canvas). In those situations, you can use Windblade's core module.

\`\`\`ts
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

export default getBrandColor;
\`\`\`
`;

export default colors;
