import { Component, For } from "solid-js";

const Main: Component<{
  ruleGroup: any
}> = (props) => {
  const styles = {
    tr: "border border-color-transparent border-be-color-fg-5",
    th: "p-b-s.6 text-start size-i-half",
    td: "p-b-s.6"
  };

  return (
    <div class="flex flex-col gap-s">
      <h2 class="text-fg-1 font-bold text-m.2">{props.ruleGroup.title}</h2>
      <p class="text-fg-3 font-semibold">{props.ruleGroup.description}</p>
      <table class="border-collapse">
        <thead class="font-semibold">
          <tr class={styles.tr}>
            <th class={styles.th}>Class</th>
            <th class={styles.th}>CSS</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.ruleGroup.utilities}>
            {(utility) => (
              <tr class={styles.tr}>
                <td class={`${styles.td} font-semibold text-fg-1`}>{utility}</td>
                <td class={`${styles.td} text-fg-4`}>TODO: Generate</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};

export default Main;
