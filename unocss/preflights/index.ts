import { Preflight } from "@unocss/core";
import Theme from "../theme/Theme";

import getColorCSS from "./colors"

const preflights: Preflight<Theme>[] = [
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

      a,
      button {
        cursor: pointer;
      }
    `
  },

  // Polyfill logical values
  // TODO: add writimg mode queries when CSS implements it
  // TODO: remove when CSS implements logical values
  {
    getCSS: () => `
    :root {
      --block-start: top;
      --block-end: bottom;
      --inline-start: left;
      --inline-end: right;
      --start-start: top left;
      --start-end: top right;
      --end-start: bottom left;
      --end-end: bottom right;
    }
    `
  },

  // Color properties
  {
    getCSS: getColorCSS
  }
]

export default preflights;