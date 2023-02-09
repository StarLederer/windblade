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
  }
};

type ThemeColorCombo = {
  base: ThemeColor;
  on: ThemeColor[];
};

export type { ThemeColor, ThemeColorCombo };
