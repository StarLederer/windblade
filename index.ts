import type { Preset, PresetOptions } from '@unocss/core'
import * as core from "./core";
import theme from "./theme";
import rules from "./rules";
import preflights from "./preflights";
import { ITheme } from './theme/types';

export const presetWindblade = (options: PresetOptions = {}): Preset<ITheme> => {
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
