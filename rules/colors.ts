import { DynamicRule } from "@unocss/core";
import { ITheme, IThemeColor } from "../theme/types";

const staticColorCss = (color: string) => `hsla(var(--hue), var(--col-${color}-s), var(--col-${color}-l), var(--col-${color}-a));`;
const interactiveColorCss = (color: string) => `hsl(var(--hue), var(--col-${color}-s), calc(var(--col-${color}-l) + var(--highlight)), var(--col-${color}-a));`;

const colorRule = (prefix: string, property: string): DynamicRule<ITheme> => {
  return [
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      const css: any = {};

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

/**
 * UnoCSS rule getter specifically for the background property
 *
 * @param prefix The Atomic CSS class name prefix
 * @returns UnoCSS dynamic rule that sets the background to the color defined in the class name as well as sets --fg variables and changes text to var(--fg0)
 */
const colorBgRule = (prefix: string): DynamicRule<ITheme> => {
  return [
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      const css: any = {};

      // Static css
      const statColor = theme.wrapp.colors.static[match[2]];
      if (statColor !== undefined) {
        css['background'] = staticColorCss(match[2]);
        statColor.on.forEach((_, i) => {
          css[`--fg${i}`] = staticColorCss(`on-${match[2]}-${i}`);
        });
      }

      // Interactive css
      const intColor = theme.wrapp.colors.interactive[match[2]];
      if (intColor !== undefined) {
        css['background'] = interactiveColorCss(match[2]);
        intColor.on.forEach((_, i) => {
          css[`--fg${i}`] = interactiveColorCss(`on-${match[2]}-${i}`);
        });
      }

      css['color'] = 'var(--fg0)';

      return css;
    }
  ];
};

const fgColorRule = (prefix: string, property: string): DynamicRule<ITheme> => {
  return [
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      const css: any = {};
      css[property] = `var(--fg${match[2]})`
      return css;
    }
  ];
};

export { colorRule, colorBgRule, fgColorRule }
