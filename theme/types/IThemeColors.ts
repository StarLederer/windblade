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

export type { IThemeColor };
