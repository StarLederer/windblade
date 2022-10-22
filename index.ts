import type { Preset, PresetOptions } from '@unocss/core'
import theme from "./theme";
import rules from "./rules";
import preflights from "./preflights";

export const presetWrapp = (options: PresetOptions = {}): Preset<{}> => {
  return {
    name: '@wrapp/unocss-preset',
    theme,
    rules,
    variants: [],
    options,
    postprocess: [],
    preflights,
    prefix: undefined,
    shortcuts: [
      { 'int-text': 'font-semibold' },
      { 'panel': 'round-m-- pd-m0' },
    ],
  }
}

export default presetWrapp;
