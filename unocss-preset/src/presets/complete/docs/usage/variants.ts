import { DocumentedThemeObject } from "unocss-docs";

const colors: DocumentedThemeObject<{}> = () =>
`# Hover, focus and other states

Windblade does not come with functionality like hover or focus states. Please use Windblade together with [unocss-preset-mini-variants](https://www.npmjs.com/package/unocss-preset-mini-variants) or other variant implementations if you need this functionality.
`;

export default colors;
