type ThemeColor = {
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

type ThemeColorCombo = {
  base: ThemeColor;
  on: ThemeColor[];
  interactive?: boolean;
};

export type { ThemeColor, ThemeColorCombo };
