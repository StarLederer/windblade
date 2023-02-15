import type { Theme } from "../theme";

const theme: Theme = {
  windblade: {
    colors: {
      'clear': {
        base: { dark: { l: 0, c: 0 } },
        on: [
          { dark: { l: 1, c: 0 } },
        ]
      },

      'normal': {
        base: { dark: { l: 0, c: 0 } },
        on: [
          { dark: { l: 0.96, c: 0.01 } },
          { dark: { l: 0.90, c: 0.02 } },
          { dark: { l: 0.60, c: 0.04 } },
          { dark: { l: 0.40, c: 0.02 } },
          { dark: { l: 0.20, c: 0.01 } },
        ]
      },

      'normal-2': {
        base: { dark: { l: 0.11, c: 0.001 }, light: { l: 0.98 } },
        on: [
          { dark: { l: 0.96, c: 0.01 } },
          { dark: { l: 0.90, c: 0.02 } },
          { dark: { l: 0.60, c: 0.04 } },
          { dark: { l: 0.40, c: 0.02 } },
          { dark: { l: 0.20, c: 0.01 } },
        ]
      },

      'normal-3': {
        base: { dark: { l: 0.15, c: 0.004 }, light: { l: 0.94 } },
        on: [
          { dark: { l: 0.96, c: 0.01 } },
          { dark: { l: 0.90, c: 0.04 }, light: { l: 0.3 } },
          { dark: { l: 0.60, c: 0.06 }, light: { l: 0.4 } },
          { dark: { l: 0.40, c: 0.02 }, light: { l: 0.8 } },
          { dark: { l: 0.20, c: 0.01 }, light: { l: 0.9 } },
        ]
      },

      'normal-4': {
        base: { dark: { l: 0.19, c: 0.006 }, light: { l: 0.9} },
        on: [
          { dark: { l: 0.96, c: 0.01 } },
          { dark: { l: 0.90, c: 0.02 } },
          { dark: { l: 0.60, c: 0.04 } },
          { dark: { l: 0.40, c: 0.02 } },
          { dark: { l: 0.20, c: 0.01 } },
        ]
      },

      'surface': {
        base: { dark: { l: 0.4, c: 0.04, a: 0.1 }, light: { c: 0.1 } },
        on: [
          { dark: { l: 0.9, c: 0.1 }, light: { l: 0.3 } },
          { dark: { l: 0.8, c: 0.1 }, light: { l: 0.4 } },
          { dark: { l: 0.6, c: 0.06 }, light: { l: 0.5 } },
          { dark: { l: 0.4, c: 0.04 } },
          { dark: { l: 0.2, c: 0.02 } },
        ]
      },

      'accent': {
        base: { dark: { l: 0.7, c: 0.2 }, light: { l: 0.6 } },
        on: [
          { dark: { l: 0.1, c: 0.2 }, light: { l: 1 } },
          { dark: { l: 0.2, c: 0.23 }, light: { l: 0.98 } },
          { dark: { l: 0.4, c: 0.26 }, light: { l: 0.9 } },
          { dark: { l: 0.6, c: 0.3 }, light: { l: 0.8 } },
        ],
      },

      'accent-2': {
        base: { dark: { l: 0.7, c: 0.2, a: 0.4 }, light: { l: 0.6 } },
        on: [
          { dark: { l: 0.9, c: 0.1 }, light: { l: 0.2 } },
          { dark: { l: 0.8, c: 0.15 }, light: { l: 0.3 } },
          { dark: { l: 0.6, c: 0.2 }, light: { l: 0.5 } },
        ],
      },

      'accent-3': {
        base: { dark: { l: 0.6, c: 0.06, a: 0.1 }, light: { c: 0.18 } },
        on: [
          { dark: { l: 0.9, c: 0.2 } },
        ],
      },

      'accent-4': {
        base: { dark: { l: 0.4, c: 0.01, a: 0.1 } },
        on: [
          { dark: { l: 0.9, c: 0.2 } },
        ],
      },
    },

    proportions: {
      'zero': 0,
      's.2': 0.2,
      's.4': 0.4,
      's.6': 0.6,
      's.8': 0.8,
      's': 1,
      'm.2': 2,
      'm.4': 4,
      'm.6': 6,
      'm.8': 8,
      'm': 10,
      'l.2': 20,
      'l.4': 40,
      'l.6': 60,
      'l.8': 80,
      'l': 100,
    },

    time: {
      baseUnitMs: 150,

      functions: {
        default: 'cubic-bezier(0.4, 0, 0.2, 1)',

        'linear': 'linear',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    }
  },
};

export default theme;
