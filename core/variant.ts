import { ITheme } from "../theme/types";
import { getCSSProperties } from "./color";

type Variant = "dark" | "light";

type VariantProps = Record<Variant, Record<string, string>>;

const getThemeCSS = (theme: ITheme): VariantProps => {
  const { windblade } = theme;
  const themeColors = { ...windblade.colors.static, ...windblade.colors.interactive };

  // Collect custom properties for light and dark variatns of
  // color.base and all color.on
  const colors: VariantProps[] = [];
  Object.keys(themeColors).forEach((color) => {
    // Add color.base custom CSS properties
    colors.push(getCSSProperties(color, themeColors[color].base));

    // Add custom CSS properties for each color.on
    // On colors are used as foreground variants
    themeColors[color].on.forEach((on, i) => {
      colors.push(getCSSProperties(`on-${color}-${i}`, on));
    })
  });

  let propsDark: Record<string, string> = {
    "--base-highlight": "10%",
    "--base-highlight-plus": "20%",
    "--highlight": "0%",
  };
  colors.forEach(({dark, light}) => {
    propsDark = {...propsDark, ...dark};
  });

  let propsLight: Record<string, string> = {
    "--base-highlight": "-10%",
    "--base-highlight-plus": "-20%",
  };
  colors.forEach(({dark, light}) => {
    propsLight = {...propsLight, ...light};
  });

  return {
    dark: propsDark,
    light: propsLight
  };
};

export type { Variant, VariantProps };
export { getThemeCSS };
