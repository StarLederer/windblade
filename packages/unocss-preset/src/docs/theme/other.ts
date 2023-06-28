import type { DocumentationPage } from '@windblade/unocss-docs'
import { encodeString } from '@windblade/unocss-docs'

const example = `
type ThemeColor = {
  dark: {
    l: number;
    c: number;
    a?: number;
  };
  light?: {
    l?: number;
    c?: number;
    a?: number;
  };
};

type ThemeColorCombo = {
  base: ThemeColor;
  on: ThemeColor[];
};

type Theme = {
  windblade: {
    colors: Record<string, ThemeColorCombo>;
    miscColors?: Record<string, string>;
    proportions: Record<string, number>;
    miscSizes?: Record<string, string>;
    time: {
      baseUnitMs: number;
      functions: Record<string, string> & {
        default: string;
      };
    };
  };
};
`

const main: DocumentationPage = `
  <page>
    <h1>Other theme objects</h1>
    <p>See the theme type below for other values you can customize.</p>

    <h2>Theme type</h2>
    <pre lang="ts" code="${encodeString(example)}" />
  </page>
`

export default main
