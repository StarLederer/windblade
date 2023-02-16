import { DocumentedThemeObject } from "../../docs/types";

const colors: DocumentedThemeObject = (_, { h1, p }) => [
  h1("Hover, focus and other states"),
  p("Windblade does not come with functionality like hover or focus states. Please use Windblade together with unocss-preset-mini-variants (see \"installation\") if you need this functionality."),
];

export default colors;
