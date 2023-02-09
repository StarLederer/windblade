import { DynamicRule } from "@unocss/core";
import Theme, { ThemeColor } from "../theme/Theme";

const colorRule = (prefix: string, property: string): DynamicRule<Theme> => {
  return [
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      if (theme.windblade.miscColors[match[2]]) return {
        [property]: match[2]
      }

      if (theme.windblade.colors[match[2]]) return {
        [property]: `var(--${match[2]}-0)`
      };

      return;
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
      const color = theme.windblade.colors[match[2]]
      if (!color) return;

      const css: any = {
        'background': `var(--${match[2]}-0)`,
        'color': 'var(--fg-1)', // this CSS varaible gets defined below
      };

      for (let i = 1; i <= color.on.length; ++i) {
        css[`--fg-${i}`] = `var(--${match[2]}-${i})`;
      }

      return css;
    }
  ];
};

const fgColorRule = (prefix: string, property: string): DynamicRule<Theme> => {
  return [
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      if (theme.windblade.miscColors[match[2]]) return {
        [property]: match[2],
      }

      return {
        [property]: `var(--fg-${match[2]})`,
      };
    }
  ];
};

export { colorRule, colorBgRule, fgColorRule }
