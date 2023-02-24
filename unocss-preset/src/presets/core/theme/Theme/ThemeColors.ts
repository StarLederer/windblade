export type ThemeColor = {
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

export type ThemeColorCombo = {
  base: ThemeColor;
  on: ThemeColor[];
};
