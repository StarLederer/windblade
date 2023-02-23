import type { Preset, PresetOptions } from '@unocss/core'
import baseTheme from "./theme";
import rules from "./rules";
import variants from "./variants";
import preflights from "./preflights";
import Theme from './theme/Theme';
import themes, { WindbladeTheme } from "./themes";
import merge from "ts-deepmerge";

export interface WindbladeOptions extends PresetOptions {
  theme?: WindbladeTheme,
};

export const presetWindblade = (options: WindbladeOptions = {}): Preset<Theme> => {
  options.theme = options.theme ?? "windblade";

  const theme = merge(baseTheme, themes[options.theme]) as Theme;

  return {
    name: 'Windblade',
    theme,
    rules,
    variants,
    options,
    postprocess: [],
    preflights,
    prefix: undefined,
    shortcuts: [],
  }
}

export * as core from "./core";
export * as theme from "./theme";
export * as docs from "./docs";
export default presetWindblade;
