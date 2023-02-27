import { DocumentedThemeObject } from "unocss-docs";

const colors: DocumentedThemeObject<{}> = () =>
`# Using the $ syntax

You can grab proportions from your theme by prefixing their names with \`$\`. This is mainly useful inside brackets when you want to set custom values.

\`\`\`html
<div class="grid grid-cols-[auto_$l_auto]"></div>
<!-- This is a bad example because at the moment brackets have limited support and do not work in this case -->
\`\`\`

You can also use \`$\` to conveniently perform operations with your design tokens without breaking out of your design system or using \`calc()\`.

\`\`\`html
<div class="p-s">
  Label
  <!-- Custom underline -->
  <div class="absolute size-i-full size-b-s.2 inset-bottom-$(($s-$s.2)/2)"></div>
</div>
\`\`\`

Note that \`$\` is an UnoCSS [variant](https://github.com/unocss/unocss#custom-variants) so it works with UnoCSS utilities that come from other presets too!
`;

export default colors;
