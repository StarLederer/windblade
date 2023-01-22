import type { Preset, PresetOptions } from '@unocss/core'
import * as core from "./core";
import theme from "./theme";
import rules from "./rules";
import preflights from "./preflights";
import Theme from './theme/Theme';

export const presetWindblade = (options: PresetOptions = {}): Preset<Theme> => {
  return {
    name: 'Windblade',
    theme,
    rules,
    variants: [],
    options,
    postprocess: [],
    preflights,
    prefix: undefined,
    shortcuts: [],
  }
}

export default presetWindblade;
export { theme, core };
