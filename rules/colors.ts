import { DynamicRule } from "@unocss/core";
import { ITheme, IThemeColor } from "../theme/types";

const staticColorCss = (color: string) => `hsl(var(--hue), var(--col-${color}-s), var(--col-${color}-l));`;
const interactiveColorCss = (color: string) => `hsl(var(--hue), var(--col-${color}-s), calc(var(--col-${color}-l) + var(--highlight)));`;

const colorRule = (prefix: string, property: string): DynamicRule<ITheme> => {
  return [
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      const css = {};

      // Static css
      const statColor = theme.wrapp.colors.static[match[2]];
      if (statColor !== undefined) {
        css[property] = staticColorCss(match[2]);
      }

      // Interactive css
      const intColor = theme.wrapp.colors.interactive[match[2]];
      if (intColor !== undefined) {
        css[property] = interactiveColorCss(match[2]);
      }

      return css;
    }
  ];
};

export { colorRule }
