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

        'def2': {
          base: { dark: { s: 10, l: 10 } },
          on: [
            { dark: { s: 10, l: 90 } },
            { dark: { s: 20, l: 80 } },
            { dark: { s: 20, l: 60 } },
            { dark: { s: 10, l: 40 } },
            { dark: { s: 10, l: 40, a: 60 } },
            { dark: { s: 10, l: 40, a: 10 } },
          ]
        },

        'srf': {
          base: { dark: { s: 40, l: 20, a: 10 } },
          on: [
            { dark: { s: 100, l: 80 } },
            { dark: { s: 40, l: 60 } },
            { dark: { s: 20, l: 40 } },
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
            { dark: { s: 100, l: 20 }, light: { l: 10 } },
            { dark: { s: 100, l: 40 }, light: { l: 10 } },
          ]
        },

        'int2': {
          base: { dark: { s: 80, l: 40, a: 40 }, light: { s: 90 } },
          on: [
            { dark: { s: 100, l: 80 } },
            { dark: { s: 100, l: 60 } },
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
      tokens: {
        '.2s': 0.2,
        '.4s': 0.4,
        '.5s': 0.5,
        '.6s': 0.6,
        '.8s': 0.8,
        's': 1,
        '.2m': 2,
        '.4m': 4,
        '.5m': 5,
        '.6m': 6,
        '.8m': 8,
        'm': 10,
        '.2l': 20,
        '.4l': 40,
        '.5l': 50,
        '.6l': 60,
        '.8l': 80,
        'l': 100,
      },
      misc: {
        'min': '1px',
        '0': '0rem',
        'half': '50%',
        'full': '100%',
        'auto': 'auto',
      },
    }
  }
};

export default theme;
