import type Theme from "./Theme";

const theme: Theme = {
  windblade: {
    colors: {
      'clear': {
        base: { dark: { l: 0, c: 0 } },
        on: [
          { dark: { l: 100, c: 0 } },
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
          { dark: { l: 0.90, c: 0.02 } },
          { dark: { l: 0.60, c: 0.04 } },
          { dark: { l: 0.40, c: 0.02 }, light: { l: 0.8 } },
          { dark: { l: 0.20, c: 0.01 }, light: { l: 0.9 } },
        ]
      },

      'normal-4': {
        base: { dark: { l: 0.20, c: 0.006 } },
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
          { dark: { l: 0.9, c: 0.1 } },
          { dark: { l: 0.8, c: 0.1 } },
          { dark: { l: 0.6, c: 0.06 } },
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
        base: { dark: { l: 0.6, c: 0.06, a: 0.1 } },
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

    miscColors: {
      transparent: "transparent",
      inherit: "inherit",
      currentColor: "currentColor",
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
