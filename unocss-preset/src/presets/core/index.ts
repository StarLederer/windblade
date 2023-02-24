import type { Preset } from '@unocss/core'
import theme from "./theme";
import Theme from './theme/Theme';

export const presetWindblade = (options: {} = {}): Preset<Theme> => {
  return {
    name: '@windblade/unocss-preset-core',
    theme,
    rules: [],
    variants: [],
    options,
    postprocess: [],
    preflights: [],
    prefix: undefined,
    shortcuts: [],
  }
}

export * as theme from "./theme";
export default presetWindblade;
