import type { IThemeColor } from "./IThemeColors"

type ITheme = {
  wrapp: {
    colors: {
      static: Record<string, IThemeColor>,
      interactive: Record<string, IThemeColor>,
    };
    sizes: Record<string, string>;
  };
};

export type { ITheme };
