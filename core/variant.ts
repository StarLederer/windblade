import Theme from "../theme/Theme";
import { getCSSProperties } from "./color";

type Variant = "dark" | "light";

type VariantProps = Record<Variant, Record<string, string>>;

const getThemeCSS = (theme: Theme): VariantProps => {
  const { windblade } = theme;

  // Collect custom properties for light and dark variatns of
  // color.base and all color.on
  const colors: VariantProps[] = [];
  Object.keys(windblade.colors).forEach((color) => {
    // Add color.base custom CSS properties
    colors.push(getCSSProperties(color, windblade.colors[color].base));

    // Add custom CSS properties for each color.on
    // On colors are used as foreground variants
    windblade.colors[color].on.forEach((on, i) => {
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
