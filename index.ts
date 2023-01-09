import type { Preset, PresetOptions } from '@unocss/core'
import * as external from "./external";
import theme from "./theme";
import rules from "./rules";
import preflights from "./preflights";
import { ITheme } from './theme/types';

export const presetWrapp = (options: PresetOptions = {}): Preset<ITheme> => {
  return {
    name: '@wrapp/unocss-preset',
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

export default presetWrapp;
export { theme, external };
