import type Theme from "./Theme";

const theme: Theme = {
  windblade: {
    colors: {
      'clear': {
        base: { dark: { s: 0, l: 0 } },
        on: [
          { dark: { s: 0, l: 100 } },
        ]
      },

      'normal': {
        base: { dark: { s: 0, l: 0 } },
        on: [
          { dark: { s: 10, l: 90 } },
          { dark: { s: 20, l: 80 } },
          { dark: { s: 20, l: 60 } },
          { dark: { s: 20, l: 40 } },
          { dark: { s: 10, l: 10 }, light: { l: 80 } },
        ]
      },

      'normal-2': {
        base: { dark: { s: 1, l: 2 } },
        on: [
          { dark: { s: 10, l: 90 } },
          { dark: { s: 20, l: 80 } },
          { dark: { s: 20, l: 60 } },
          { dark: { s: 20, l: 40 } },
          { dark: { s: 10, l: 10 }, light: { l: 80 } },
        ]
      },

      'normal-3': {
        base: { dark: { s: 10, l: 5 }, light: { l: 90 } },
        on: [
          { dark: { s: 10, l: 90 } },
          { dark: { s: 20, l: 80 } },
          { dark: { s: 20, l: 60 } },
          { dark: { s: 20, l: 40 } },
          { dark: { s: 10, l: 10 }, light: { l: 80 } },
        ]
      },

      'normal-4': {
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

      'surface': {
        base: { dark: { s: 40, l: 20, a: 10 }, light: { a: 40 } },
        on: [
          { dark: { s: 100, l: 80 } },
          { dark: { s: 40, l: 60 } },
          { dark: { s: 20, l: 40 } },
        ]
      },

      'accent': {
        base: { dark: { s: 100, l: 60 }, light: { l: 60 } },
        on: [
          { dark: { s: 100, l: 10 }, light: { l: 10 } },
          { dark: { s: 100, l: 20 }, light: { l: 20 } },
          { dark: { s: 100, l: 40 }, light: { l: 40 } },
          { dark: { s: 100, l: 40 }, light: { l: 40 } },
        ],
        interactive: true,
      },

      'accent-2': {
        base: { dark: { s: 80, l: 40, a: 40 }, light: { s: 90 } },
        on: [
          { dark: { s: 100, l: 80 } },
          { dark: { s: 100, l: 60 } },
        ],
        interactive: true,
      },

      'accent-3': {
        base: { dark: { s: 60, l: 60, a: 10 } },
        on: [
          { dark: { s: 10, l: 80 } },
        ],
        interactive: true,
      },

      'accent-4': {
        base: { dark: { s: 20, l: 20, a: 20 } },
        on: [
          { dark: { s: 10, l: 80 } },
        ],
        interactive: true,
      },
    },

    proportions: {
      '0.5t': 0.125,
      '1t': 0.25,
      '1.5t': 0.375,
      '2t': 0.5,
      '2.5t': 0.625,
      '3t': 0.75,
      '3.5t': 0.875,
      '4t': 1,
      '5t': 1.25,
      '6t': 1.5,
      '7t': 1.75,
      '8t': 2,
      '9t': 2.25,
      '10t': 2.5,
      '11t': 2.75,
      '12t': 3,
      '14t': 3.5,
      '16t': 4,
      '20t': 5,
      '24t': 6,
      '28t': 7,
      '32t': 8,
      '36t': 9,
      '40t': 10,
      '44t': 11,
      '48t': 12,
      '52t': 13,
      '56t': 14,
      '60t': 15,
      '64t': 16,
      '72t': 18,
      '80t': 20,
      '96t': 24,
      'sm': 40,
      'md': 48,
      'lg': 64,
      'xl': 80,
      '2xl': 96,
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
