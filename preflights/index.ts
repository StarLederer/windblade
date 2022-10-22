import { Preflight } from "@unocss/core";

import getColorCSS from "./colors"

const preflights: Preflight<{}>[] = [
  // Setup
  {
    getCSS: ({ theme }) => `
      * {
        padding: 0;
        margin: 0;

        color: inherit;
        background: none;
        border: none;
        font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
        font-size: inherit;
        line-height: 1;

        color-scheme: light dark;
        box-sizing: border-box;
        cursor: inherit;
      }

      :root {
        font-size: 16px;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;

        cursor: default;

        user-select: none;
        -webkit-user-select: none;
      }
    `
  },
  // Color properties
  {
    getCSS: getColorCSS
  }
]

export default preflights;
