type IThemeColor = {
  dark: {
    s: number;
    l: number;
    a?: number;
  };
  light?: {
    s?: number;
    l?: number;
    a?: number;
  }
};

type IThemeColorCombo = {
  base: IThemeColor;
  on: IThemeColor[];
};

export type { IThemeColor, IThemeColorCombo };
