import { createGenerator } from "@unocss/core";
import windblade from "@windblade/unocss";
import { createRoot } from "solid-js";

const uno = createRoot(() => createGenerator({
  presets: [windblade()],
  extendTheme: [
    ({ windblade }) => {
      windblade.proportions = {
        's.2': 0.2,
        's.4': 0.4,
        's.5': 0.5,
        's.6': 0.6,
        's.8': 0.8,
        's': 1,
        'm.2': 2,
        'm.4': 4,
        'm.5': 5,
        'm.6': 6,
        'm.8': 8,
        'm': 10,
        'l.2': 20,
        'l.4': 40,
        'l.5': 50,
        'l.6': 60,
        'l.8': 80,
        'l': 100,
      };
    }
  ],
  safelist: [
    "scheme-dark",
    "scheme-light",
  ],
}));

export default uno;
