import { Preflight } from "@unocss/core";
import { ITheme } from "../theme/types";

import getColorCSS from "./colors"

const preflights: Preflight<ITheme>[] = [
  // Setup
  {
    getCSS: () => `
      * {
        padding: 0;
        margin: 0;

        color: inherit;
        background: none;
        border: none;
        font-size: inherit;
        font-weight: inherit;
        line-height: 1;

        color-scheme: light dark;
        box-sizing: border-box;
        cursor: inherit;
      }

      :root {
        font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
        font-size: 16px;
        font-weight: normal;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;

        cursor: default;

        user-select: none;
        -webkit-user-select: none;
      }

      a {
        cursor: pointer;
      }
    `
  },
  // Color properties
  {
    getCSS: getColorCSS
  }
]

export default preflights;
