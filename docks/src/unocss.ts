import { createGenerator } from "@unocss/core";
import windblade from "@windblade/unocss";
import { createRoot } from "solid-js";

const uno = createRoot(() => createGenerator({
  presets: [windblade()],
}));

export default uno;
