import type { ITheme } from "./types/ITheme";

const theme: ITheme = {
  wrapp: {
    colors: {
      static: {
        'abs': {
          base: { dark: { s: 0, l: 0 } },
          on: [
            { dark: { s: 10, l: 100 } },
          ]
        },

        'def': {
          base: { dark: { s: 10, l: 5 } },
          on: [
            { dark: { s: 10, l: 90 } },
            { dark: { s: 20, l: 80 } },
            { dark: { s: 20, l: 60 } },
            { dark: { s: 20, l: 40 } },
            { dark: { s: 10, l: 10 } },
          ]
        },

        'srf': {
          base: { dark: { s: 40, l: 20, a: 10 } },
          on: [
            { dark: { s: 100, l: 80 } },
            { dark: { s: 40, l: 60 } },
          ]
        },

        'srf2': {
          base: { dark: { s: 40, l: 40, a: 20 } },
          on: [
            { dark: { s: 20, l: 80 } },
          ]
        },
      },
      interactive: {
        'int': {
          base: { dark: { s: 100, l: 60 }, light: { l: 60 } },
          on: [
            { dark: { s: 100, l: 10 }, light: { l: 10 } },
          ]
        },

        'int2': {
          base: { dark: { s: 80, l: 40, a: 40 }, light: { s: 90 } },
          on: [
            { dark: { s: 100, l: 80 } },
          ]
        },

        'int3': {
          base: { dark: { s: 60, l: 60, a: 10 } },
          on: [
            { dark: { s: 10, l: 80 } },
          ]
        },

        'int4': {
          base: { dark: { s: 20, l: 20, a: 20 } },
          on: [
            { dark: { s: 10, l: 80 } },
          ]
        },
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
