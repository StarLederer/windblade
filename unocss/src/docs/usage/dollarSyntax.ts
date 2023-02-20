import { DocumentedThemeObject } from "../../docs/types";

const colors: DocumentedThemeObject<{}> = () =>
`# Using the $ syntax

You can grab relevant to the rule theme values prefixing them with \`$\`. This is especially useful inside brackets when you want to set custom values.

\`\`\`html
<div class="grid grid-cols-[auto_$l_auto]"></div>
<!-- This is a bad example because at the moment brackets have limited support and do not work in this case -->
\`\`\`

You can also use \`$\` to conveniently perform operations with your design tokens without breaking out of your design system or using \`calc()\`.

\`\`\`
<div class="p-s">
  Label
  <!-- Custom underline -->
  <div class="absolute size-i-full size-b-s.2 inset-bottom-$(($s-$s.2)/2)"></div>
</div>
\`\`\`
`;

export default colors;
