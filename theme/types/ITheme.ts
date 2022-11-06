import type { IThemeColorCombo } from "./IThemeColors"

type ITheme = {
  wrapp: {
    colors: {
      static: Record<string, IThemeColorCombo>,
      interactive: Record<string, IThemeColorCombo>,
    };
    sizes: Record<string, string>;
  };
};

export type { ITheme };
