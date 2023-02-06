import type { Variant } from "windblade/core";
import { createSignal, createMemo, createRoot } from "solid-js";

export const hues: Record<Variant, number> = {
  dark: 200,
  light: 220,
};

function main() {
  // System sceheme
  const [systemSceheme, setSystemScheme] = createSignal<Variant | undefined>(window.matchMedia('(prefers-color-scheme: light)').matches ? "light" : "dark");
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', event => {
    setSystemScheme(event.matches ? "light" : "dark");
  });

  // Manually selected scheme
  const [enforceScheme, setEnforceScheme] = createSignal<Variant | undefined>(undefined);
  const toggleScheme = () => {
    switch (enforceScheme()) {
      case "dark":
        setEnforceScheme("light");
        break;
      case "light":
        setEnforceScheme("dark");
        break;
      default:
        setEnforceScheme(systemSceheme() === "light" ? "dark" : "light");
    }
  };

  // Computed
  const scheme = createMemo(() => enforceScheme() ?? systemSceheme() ?? "dark");
  const hue = createMemo(() => scheme() === "dark" ? 200 : 220);

  return { scheme, hue, enforceScheme, setEnforceScheme, toggleScheme };
}

export default createRoot(main);
