import type { IThemeColorCombo } from "./IThemeColors"

type ITheme = {
  wrapp: {
    colors: {
      static: Record<string, IThemeColorCombo>,
      interactive: Record<string, IThemeColorCombo>,
    };
    sizes: {
      tokens: Record<string, number>,
      misc: Record<string, string>,
    };
  };
};

export type { ITheme };
