import type Theme from "./Theme";

const theme: Theme = {
  windblade: {
    colors: {
      // Regular

      'abs': {
        base: { dark: { s: 0, l: 0 } },
        on: [
          { dark: { s: 10, l: 100 } },
        ]
      },

      'def': {
        base: { dark: { s: 0, l: 0 } },
        on: [
          { dark: { s: 10, l: 90 } },
          { dark: { s: 20, l: 80 } },
          { dark: { s: 20, l: 60 } },
          { dark: { s: 20, l: 40 } },
          { dark: { s: 10, l: 10 }, light: { l: 80 } },
        ]
      },

      'def2': {
        base: { dark: { s: 1, l: 2 } },
        on: [
          { dark: { s: 10, l: 90 } },
          { dark: { s: 20, l: 80 } },
          { dark: { s: 20, l: 60 } },
          { dark: { s: 20, l: 40 } },
          { dark: { s: 10, l: 10 }, light: { l: 80 } },
        ]
      },

      'def3': {
        base: { dark: { s: 10, l: 5 }, light: { l: 90 } },
        on: [
          { dark: { s: 10, l: 90 } },
          { dark: { s: 20, l: 80 } },
          { dark: { s: 20, l: 60 } },
          { dark: { s: 20, l: 40 } },
          { dark: { s: 10, l: 10 }, light: { l: 80 } },
        ]
      },

      'def4': {
        base: { dark: { s: 10, l: 10 }, light: { l: 80 } },
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
        base: { dark: { s: 40, l: 20, a: 10 }, light: { a: 40 } },
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

      // Interactive

      'int': {
        base: { dark: { s: 100, l: 60 }, light: { l: 60 } },
        on: [
          { dark: { s: 100, l: 10 }, light: { l: 10 } },
          { dark: { s: 100, l: 20 }, light: { l: 20 } },
          { dark: { s: 100, l: 40 }, light: { l: 40 } },
          { dark: { s: 100, l: 40 }, light: { l: 40 } },
        ],
        interactive: true,
      },

      'int2': {
        base: { dark: { s: 80, l: 40, a: 40 }, light: { s: 90 } },
        on: [
          { dark: { s: 100, l: 80 } },
          { dark: { s: 100, l: 60 } },
        ],
        interactive: true,
      },

      'int3': {
        base: { dark: { s: 60, l: 60, a: 10 } },
        on: [
          { dark: { s: 10, l: 80 } },
        ],
        interactive: true,
      },

      'int4': {
        base: { dark: { s: 20, l: 20, a: 20 } },
        on: [
          { dark: { s: 10, l: 80 } },
        ],
        interactive: true,
      },
    },

    proportions: {
      's.2': 0.2,
      's.4': 0.4,
      's.5': 0.5,
      's.6': 0.6,
      's.8': 0.8,
      's': 1,
      'm.2': 2,
      'm.4': 4,
      'm.5': 5,
      'm.6': 6,
      'm.8': 8,
      'm': 10,
      'l.2': 20,
      'l.4': 40,
      'l.5': 50,
      'l.6': 60,
      'l.8': 80,
      'l': 100,
    },

    miscSizes: {
      '0': '0px',
      'px': '1px',
      'half': '50%',
      'full': '100%',
      'auto': 'auto',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
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
    },
  }
};

export default theme;
export * from "./Theme";
