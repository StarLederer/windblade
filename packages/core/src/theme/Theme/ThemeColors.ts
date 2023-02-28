export interface ThemeColor {
  dark: {
    l: number
    c: number
    a?: number
  }
  light?: {
    l?: number
    c?: number
    a?: number
  }
}

export interface ThemeColorCombo {
  base: ThemeColor
  on: ThemeColor[]
}
