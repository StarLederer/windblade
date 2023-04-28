import type { Theme } from '@windblade/core'

const main: Theme = {
  windblade: {
    colors: {},

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
        'default': 'cubic-bezier(0.4, 0, 0.2, 1)',

        'linear': 'linear',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
}

export default main
