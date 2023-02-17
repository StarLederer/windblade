import { DocumentedThemeObject } from "../../docs/types";

const main = `<div class="p-s">
  Label
  <!-- Custom underline -->
  <div class="absolute size-i-full size-b-s.2 inset-bottom-$(($s-$s.2)/2)"></div>
</div>
`;

const colors: DocumentedThemeObject = (_, { h1, p, pre }) => [
  h1("Using the $ syntax"),
  p("You can grab relevant to the rule theme values prefixing them with $. This is especially useful inside brackets when you want to set custom values."),
  pre(`<div class="grid grid-cols-[auto_$l_auto]"></div>\n<!-- This is a bad example because at the moment brackets have limited support and do not work in this case -->`, 'xml'),
  p("You can also use the $ syntax to conveniently perform operations with your design tokens without breaking out of your design system or using calc()."),
  pre(main, 'xml'),
];

export default colors;
