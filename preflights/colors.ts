import { PreflightContext } from "@unocss/core";
import { objToCSS } from "../core";
import { getThemeCSS } from "../core/theme";
import { ITheme } from "../theme/types";

/**
 * An preflight getter for UnoCSS
 *
 * @returns :root CSS containing various color variables for dark (default) and light (@media) modes. The variables are intended for internal use by this UnoCSS preset
 */
const getCSS = ({ theme }: PreflightContext<ITheme>): string => {
  const {dark, light} = getThemeCSS(theme);

  return `
    :root {
      --hue: 0;
      --highlight: 0%,
    }

    .theme-initial,
    :root {
      ${objToCSS(dark)}
    }

    @media (prefers-color-scheme: light) {
      .theme-initial,
      :root {
        ${objToCSS(light)}
      }
    }
  `;
}

export default getCSS;
