import { createGenerator } from "@unocss/core";
import windblade from "@windblade/unocss";
import { createRoot } from "solid-js";

const uno = createRoot(() => createGenerator({
  presets: [windblade()],
  safelist: [
    "scheme-dark-276",
    "scheme-light-296",
  ],
}));

export default uno;
