import type Theme from './Theme'

const theme: Theme = {
  windblade: {
    colors: {},

    miscColors: {
      transparent: 'transparent',
      inherit: 'inherit',
      currentColor: 'currentColor',
    },

    proportions: {},

    miscSizes: {
      0: '0px',
      px: '1px',
      half: '50%',
      full: '100%',
      auto: 'auto',
      min: 'min-content',
      max: 'max-content',
      fit: 'fit-content',
    },

    time: {
      baseUnitMs: 0,
      functions: {
        default: 'linear',
      },
    },
  },
}

export default theme
export * from './Theme'
