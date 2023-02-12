import { Component, For } from "solid-js";
import { navigate, Route } from "~/lib/rotuer";
import router from "@ui/router";
import { docs } from "windblade";
import RuleGroup from "./branches/RuleGroup";

const Main: Component = () => {
  return (
    <div class="flex size-b-full">
      <nav class="flex flex-col gap-s p-m.2 overflow-auto">
        <For each={Object.entries(docs.rules.categories)}>
          {([category, groups]) => (
            <div>
              <div class="font-semibold m-be-s.4">{category}</div>
              <div class="flex flex-col gap-s.2">
                <For each={groups}>
                  {(ruleGroup, i) => {
                    const { docs } = ruleGroup();
                    const current = () => router.route().current.startsWith(`/docs/${docs.title}`);
                    const style = `filter: hue-rotate(${3.6 * i()}deg);`;
                    return (
                      <button onClick={() => navigate(`/docs/${docs.title}`)} class={`${current() ? "bg-surface text-fg-1" : "text-fg-3"} relative p-s.6 p-i-s p-is-m.2 rounded-full text-start justify-start transition ease-out overflow-hidden hover:highlight hover:bg-accent-3 hover:text-fg-1 active:highlight+`}>
                        <div class="absolute inset-0" style={style}>
                          <div class={`${current() ? "bg-accent" : "bg-accent-2"} size-b-s.4 size-i-s.4 transition absolute rounded-full inset-0 inset-b-0 m-b-auto m-is-((m.2-s.4)/2)`} />
                          <div class={`${current() ? "bg-accent-2" : "bg-transparent"} blur-s transition absolute size-b-m.2 size-i-m.2 rounded-full inset-0 inset-b-0 m-b-auto`} />
                        </div>
                        <span class="relative">{docs.title}</span>
                      </button>
                    )
                  }}
                </For>
              </div>
            </div>
          )}
        </For>
      </nav>

      <div class="bg-fg-5 size-i-px" />

      <main class="relative flex-1">
        <For each={Object.values(docs.rules.categories).flatMap((val) => val)}>
          {(ruleGroup) => {
            const group = ruleGroup();
            return (
              <Route path={`/docs/${group.docs.title}`}>
                <RuleGroup ruleGroup={group} />
              </Route>
            )
          }}
        </For>
      </main>
    </div>
  );
};

export default Main;
