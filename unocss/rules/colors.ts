import { DynamicRule } from "@unocss/core";
import Theme, { ThemeColor } from "../theme/Theme";

const staticColorCss = (color: string) => `hsla(var(--hue), var(--col-${color}-s), var(--col-${color}-l), var(--col-${color}-a));`;
const interactiveColorCss = (color: string) => `hsl(var(--hue), var(--col-${color}-s), calc(var(--col-${color}-l) + var(--highlight)), var(--col-${color}-a));`;

const colorRule = (prefix: string, property: string): DynamicRule<Theme> => {
  return [
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      const css: any = {};
      const color = theme.windblade.colors[match[2]];
      if (!color) return;

      if (color.interactive) {
        css[property] = interactiveColorCss(match[2]);
      } else {
        css[property] = staticColorCss(match[2]);
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
const colorBgRule = (prefix: string): DynamicRule<Theme> => {
  return [
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      const css: any = {};
      const color = theme.windblade.colors[match[2]];
      if (!color) return;

      if (color.interactive) {
        css['background'] = interactiveColorCss(match[2]);
        color.on.forEach((_, i) => {
          css[`--fg-${i + 1}`] = interactiveColorCss(`on-${match[2]}-${i}`);
        });
      } else {
        css['background'] = staticColorCss(match[2]);
        color.on.forEach((_, i) => {
          css[`--fg-${i + 1}`] = staticColorCss(`on-${match[2]}-${i}`);
        });
      }

      css['color'] = 'var(--fg-1)';

      return css;
    }
  ];
};

const fgColorRule = (prefix: string, property: string): DynamicRule<Theme> => {
  return [
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      const css: any = {};
      css[property] = `var(--fg-${match[2]})`
      return css;
    }
  ];
};

export { colorRule, colorBgRule, fgColorRule }
