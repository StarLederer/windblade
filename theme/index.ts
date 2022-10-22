import type { ITheme } from "./types/ITheme";

const theme: ITheme = {
  wrapp: {
    colors: {
      static: {
        'abs': { dark: { s: 0, l: 0 } },
        'on-abs': { dark: { s: 10, l: 100 } },

        'def': { dark: { s: 10, l: 5 } },
        'on-def': { dark: { s: 10, l: 90 } },
        'on-def-2': { dark: { s: 20, l: 60 } },
        'on-def-3': { dark: { s: 20, l: 40 } },
        'on-def-4': { dark: { s: 10, l: 10 } },

        'srf': { dark: { s: 20, l: 10 } },
        'on-srf': { dark: { s: 100, l: 80 } },
        'on-srf-2': { dark: { s: 40, l: 60 } },

        'srf2': { dark: { s: 20, l: 20 } },
        'on-srf2': { dark: { s: 20, l: 80 } },
      },
      interactive: {
        'int': { dark: { s: 100, l: 60 }, light: { l: 60 } },
        'on-int': { dark: { s: 100, l: 10 }, light: { l: 10 } },

        'int2': { dark: { s: 60, l: 20 }, light: { s: 90 } },
        'on-int2': { dark: { s: 100, l: 80 } },

        'int3': { dark: { s: 10, l: 10 } },
        'on-int3': { dark: { s: 10, l: 80 } },
      },
    },
    sizes: {
      'min': '1px',
      '0': '0rem',
      's--': '0.2rem',
      's-': '0.4rem',
      's': '0.5rem',
      's+': '0.6rem',
      's++': '0.8rem',
      'm0': '1rem',
      'm--': '2rem',
      'm-': '4rem',
      'm': '5rem',
      'm+': '6rem',
      'm++': '8rem',
      'l0': '10rem',
      'l--': '20rem',
      'l-': '40rem',
      'l': '50rem',
      'l+': '60rem',
      'l++': '80rem',
      'xl0': '100rem',
    }
  }
};

export default theme;
