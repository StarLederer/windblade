import Button from "@ui/primitives/Button";
import { Component, createEffect, createSignal, For, on, Show } from "solid-js";
import uno from "~/unocss";
import type { docs } from "@windblade/unocss";
import UnilityButton from "./components/UtilityButton";

const Main: Component<{
  ruleGroup: docs.rules.DocumentedRuleGroup
}> = (props) => {
  const [selectedI, setSelectedI] = createSignal(-1);
  const [selected, setSelected] = createSignal("");
  const [shadowRoot, setShadowRoot] = createSignal<ShadowRoot>();
  const [preview, setPreview] = createSignal<{ html: string; css: string; preflights: string }>();

  // Preview container ref
  let previewContainer: HTMLDivElement | undefined;

  // Keep shadowRoot in sync with container ref
  createEffect(on(
    () => selected(),
    () => {
      if (!previewContainer) {
        setShadowRoot(undefined);
        return;
      }

      if (shadowRoot()) return;

      setShadowRoot(previewContainer.attachShadow({ mode: "open" }));
    }
  ));

  // Keep preview in sync with selected
  createEffect(async () => {
    const html = docs().preview?.(selected()) ?? "";
    const generateResult = await uno.generate(html, { minify: true });
    const css = generateResult.getLayer("default") ?? "";
    const preflights = generateResult.getLayer("preflights") ?? "";
    setPreview({ html, css, preflights, });
  });

  // Keep preview dom in sync with preview
  createEffect(() => {
    const root = shadowRoot();
    if (!root) return;
    const p = preview();
    if (!p) return;
    const { html, css, preflights } = p;
    root.innerHTML = `<div id="root" style="--hue: 20; display: flex; align-items: center; justify-content: center;"><style>${preflights.replaceAll(":root", "#root")}\n${css}</style>${html}</div>`;
  });

  const docs = () => props.ruleGroup.docs;

  const styles = {
    tr: "border border-color-transparent border-be-color-fg-5",
    th: "p-b-s.6 text-start",
    h3: "font-bold text-(s+s.2)",
    h4: "font-bold",
  };

  return (
    <div class="size-b-full overflow-auto">
      <div class="flex flex-col gap-s p-m.2">
        <h2 class="text-fg-1 font-bold text-m.2">{docs().title}</h2>
        <p class="text-fg-3 font-semibold">{docs().description}</p>

        {docs().preview && <>
          <h3 class={styles.h3}>Try it</h3>
          <table class="border-collapse">
            <thead class="font-semibold">
              <tr class={styles.tr}>
                <th class={`${styles.th} p-ie-s`}>Selected</th>
                <th class={`${styles.th} size-i-full`}>Utility</th>
              </tr>
            </thead>
            <tbody>
              <For each={docs().utilities}>
                {(utility, i) => (
                  <tr class={styles.tr} >
                    <td>
                      <div class="m-auto i-mdi-check transition ease-linear" style={`opacity: ${selectedI() === i() ? 1 : 0};`} />
                    </td>
                    <td class="p-b-s">
                      <UnilityButton
                        utility={utility}
                        onClick={(util) => {
                          setSelectedI(i);
                          setSelected(util);
                        }}
                      />
                    </td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>

          <Show when={selected()}>
            <h4 class={styles.h4}>Preview</h4>
            <div class="scheme-dark bg-def2 rounded-s p-m.2 overflow-auto" ref={previewContainer} />

            <h4 class={styles.h4}>HTML</h4>
            <code class="block bg-srf p-s rounded-s">{preview()?.html}</code>

            <h4 class={styles.h4}>Generated CSS</h4>
            <code class="block bg-srf p-s rounded-s">{preview()?.css}</code>
          </Show>
        </>}
      </div>
    </div>
  );
};

export default Main;
