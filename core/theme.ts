import { ITheme } from "../theme/types";
import { getCSSProperties } from "./color";

type ThemeType = "dark" | "light";

type ThemedProps = Record<ThemeType, Record<string, string>>;

const getThemeCSS = (theme: ITheme): ThemedProps => {
  const { windblade } = theme;
  const themeColors = { ...windblade.colors.static, ...windblade.colors.interactive };

  // Collect custom properties for light and dark variatns of
  // color.base and all color.on
  const colors: ThemedProps[] = [];
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

export type { ThemeType, ThemedProps };
export { getThemeCSS };
