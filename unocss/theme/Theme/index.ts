import type { ThemeColorCombo } from "./ThemeColors"

type ITheme = {
  windblade: {
    colors: Record<string, ThemeColorCombo>,
    sizes: {
      tokens: Record<string, number>,
      misc: Record<string, string>,
    };
    time: {
      baseUnitMs: number,
      functions: Record<string, string> & {
        default: string;
      },
    };
  };
};

export default ITheme;
export * from "./ThemeColors";
