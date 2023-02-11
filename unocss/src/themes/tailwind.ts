import type { Theme, ThemeColorCombo } from "../theme";

const tailwindColorSet = (name: string, colors: { l: number, c: number }[]): Record<string, ThemeColorCombo> => {
  return {
    [name + "-900"]: {
      base: { dark: { l: colors[0].l, c: colors[0].c }, light: { l: colors[9].l, c: colors[9].c } },
      on: [{ dark: { l: 1, c: 0 } }]
    },
    [name + "-800"]: {
      base: { dark: { l: colors[1].l, c: colors[1].c }, light: { l: colors[8].l, c: colors[8].c } },
      on: [{ dark: { l: 1, c: 0 } }]
    },
    [name + "-700"]: {
      base: { dark: { l: colors[2].l, c: colors[2].c }, light: { l: colors[7].l, c: colors[7].c } },
      on: [{ dark: { l: 1, c: 0 } }]
    },
    [name + "-600"]: {
      base: { dark: { l: colors[3].l, c: colors[3].c }, light: { l: colors[6].l, c: colors[6].c } },
      on: [{ dark: { l: 1, c: 0 } }]
    },
    [name + "-500"]: {
      base: { dark: { l: colors[4].l, c: colors[4].c }, light: { l: colors[5].l, c: colors[5].c } },
      on: [{ dark: { l: 1, c: 0 } }]
    },
    [name + "-400"]: {
      base: { dark: { l: colors[5].l, c: colors[5].c }, light: { l: colors[4].l, c: colors[4].c } },
      on: [{ dark: { l: 0, c: 0 } }]
    },
    [name + "-300"]: {
      base: { dark: { l: colors[6].l, c: colors[6].c }, light: { l: colors[3].l, c: colors[3].c } },
      on: [{ dark: { l: 0, c: 0 } }]
    },
    [name + "-200"]: {
      base: { dark: { l: colors[7].l, c: colors[7].c }, light: { l: colors[2].l, c: colors[2].c } },
      on: [{ dark: { l: 0, c: 0 } }]
    },
    [name + "-100"]: {
      base: { dark: { l: colors[8].l, c: colors[8].c }, light: { l: colors[1].l, c: colors[1].c } },
      on: [{ dark: { l: 0, c: 0 } }]
    },
    [name + "-50"]: {
      base: { dark: { l: colors[9].l, c: colors[9].c }, light: { l: colors[0].l, c: colors[0].c } },
      on: [{ dark: { l: 0, c: 0 } }]
    },
  };
};

const theme: Theme = {
  windblade: {
    colors: {
      'absolute': {
        base: { dark: { l: 0, c: 0 } },
        on: [{ dark: { l: 1, c: 0 } }],
      },

      ...tailwindColorSet("neutral", [
        { l: 0.21, c: 0 },
        { l: 0.28, c: 0 },
        { l: 0.37, c: 0 },
        { l: 0.45, c: 0 },
        { l: 0.55, c: 0 },
        { l: 0.71, c: 0 },
        { l: 0.87, c: 0 },
        { l: 0.92, c: 0 },
        { l: 0.97, c: 0 },
        { l: 0.98, c: 0 },
      ]),

      ...tailwindColorSet("gray", [
        { l: 0.22, c: 0.023 },
        { l: 0.28, c: 0.026 },
        { l: 0.37, c: 0.03 },
        { l: 0.45, c: 0.026 },
        { l: 0.55, c: 0.023 },
        { l: 0.71, c: 0.019 },
        { l: 0.87, c: 0.009 },
        { l: 0.92, c: 0.006 },
        { l: 0.97, c: 0.003 },
        { l: 0.98, c: 0.002 },
      ]),

      ...tailwindColorSet("slate", [
        { l: 0.21, c: 0.035 },
        { l: 0.28, c: 0.035 },
        { l: 0.37, c: 0.039 },
        { l: 0.45, c: 0.037 },
        { l: 0.55, c: 0.041 },
        { l: 0.71, c: 0.035 },
        { l: 0.87, c: 0.02 },
        { l: 0.92, c: 0.013 },
        { l: 0.97, c: 0.007 },
        { l: 0.98, c: 0.003 },
      ]),

      ...tailwindColorSet("strong", [
        { l: 0.35, c: 0.16 },
        { l: 0.4, c: 0.2 },
        { l: 0.50, c: 0.24 },
        { l: 0.60, c: 0.2 },
        { l: 0.70, c: 0.16 },
        { l: 0.75, c: 0.13 },
        { l: 0.81, c: 0.1 },
        { l: 0.87, c: 0.06 },
        { l: 0.92, c: 0.03 },
        { l: 0.97, c: 0.02 },
      ]),
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
  },
};

export default theme;