import { Component, createEffect, createResource, createSignal, For, on, Show, Suspense } from "solid-js";
import type { docs } from "@windblade/unocss";
import themeStore from "~/stores/themeStore";
import uno from "~/unocss";
import UnilityButton from "./RuleGroup/components/UtilityButton";
import Progress from "@ui/primitives/Progress";
import syntax from "~/lib/syntax";
import ShadowDomUnoCSS from "~/lib/ShadowDomUnoCSS";

const Main: Component<{
  ruleGroup: docs.rules.DocumentedRuleGroup
}> = (props) => {
  const [selectedI, setSelectedI] = createSignal(-1);
  const [selected, setSelected] = createSignal<string | undefined>(undefined);
  const [css, setCss] = createSignal<string>("");

  const { formatter, highlighter } = syntax;
  // const [delay] = createResource(async () => await new Promise(r => setTimeout(r, 100000)));

  const html = () => docs().preview?.(selected() ?? "") ?? "";
  const docs = () => props.ruleGroup.docs;

  const styles = {
    tr: "border border-color-transparent border-be-color-fg-5",
    th: "p-b-s.6 text-start text-fg-3",
    h3: "font-bold text-$($s+$s.2)",
    h4: "font-bold m-be-s",
    pre: "bg-surface p-s rounded-s leading-$($s+$s.4) overflow-auto",
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
                <th class={`${styles.th} p-i-s`}><div class="i-mdi-minus" /></th>
                <th class={`${styles.th} size-i-full`}>Utility</th>
              </tr>
            </thead>
            <tbody>
              <For each={docs().utilities}>
                {(utility, i) => (
                  <tr class={styles.tr} >
                    <td class="p-i-s">
                      <div class="m-auto i-mdi-check transition ease-linear text-fg-1" style={`opacity: ${selectedI() === i() ? 1 : 0};`} />
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
            <section class="break-inside-avoid break-after-column">
              <h4 class={styles.h4}>Preview</h4>
              <ShadowDomUnoCSS
                html={html()}
                class="bg-normal-2 rounded-s p-m.2 overflow-auto"
                rootStyle="display: flex; align-items: center; justify-content: center;"
                onChange={setCss}
              />
            </section>

            <section class="break-inside-avoid">
              <h4 class={styles.h4}>HTML</h4>
              <Suspense fallback={<div class={`${styles.pre} flex gap-s items-center`}>Loading <Progress /></div>}>
                {/* {delay() + ""} */}
                <pre
                  class={styles.pre}
                  innerHTML={highlighter()?.highlight(formatter()?.html_beautify(html()) ?? "", { language: "xml" }).value.replaceAll(selected() ?? "", `<span class="bg-accent-2 rounded-s.4 p-i-s.2">${selected()}</span>`)}
                />
              </Suspense>
            </section>

            <section class="break-inside-avoid">
              <h4 class={styles.h4}>Generated CSS</h4>
              <Suspense fallback={<div class={`${styles.pre} flex gap-s items-center`}>Loading <Progress /></div>}>
                <pre
                  class={`${styles.pre} css`}
                  innerHTML={highlighter()?.highlight(formatter()?.css_beautify(css()) ?? "", { language: "css" }).value}
                />
              </Suspense>
            </section>
          </Show>
        </>}
      </div>
    </div>
  );
};

export default Main;
