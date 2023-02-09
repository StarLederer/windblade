import { Component, For, onCleanup, onMount, Show } from "solid-js";
import { navigate, Route, addNavigationHandler, removeNavigationHandler } from "~/lib/rotuer";
import router from "@ui/router";
import Button from "@ui/primitives/Button";
import Link from "@ui/primitives/Button/Link";
import { docs } from "windblade";
import logoWhite from "@windblade/brand/logo-white.svg";
import logoBlack from "@windblade/brand/logo-black.svg";
import themeStore from "~/stores/themeStore";
import RuleGroup from "./branches/RuleGroup";

const Main: Component = () => {
  onMount(() => { addNavigationHandler('/home'); })
  onCleanup(() => { removeNavigationHandler(); })

  return (
    <div class="size-b-full grid" style="grid-template-rows: auto minmax(0, 1fr);">
      <header class="p-b-s.4 p-m.2 border border-color-transparent border-be-color-fg-5 flex justify-between items-center">
        <h1 class="font-bold text-fg-1 flex gap-s items-center">
          <Show
            when={themeStore.scheme() === "dark"}
            fallback={<img src={logoBlack} alt="Logo" class="size-b-m.2" />}
          >
            <img src={logoWhite} alt="Logo" class="size-b-m.2" />
          </Show>
          Windblade
        </h1>

        <div class="flex gap-s.4">
          <Button onClick={themeStore.toggleScheme} class="p-s rounded-s relative">
            <div class="i-mdi-brightness-4 transition" style={`opacity: ${themeStore.enforceScheme() === undefined ? 1 : 0}`} />
            <div class="absolute i-mdi-brightness-7 transition" style={`opacity: ${themeStore.enforceScheme() === "light" ? 1 : 0}`} />
            <div class="absolute i-mdi-brightness-2 transition" style={`opacity: ${themeStore.enforceScheme() === "dark" ? 1 : 0}`} />
          </Button>
          <Link href="https://github.com/StarLederer/windblade"><div class="i-simple-icons-github" /></Link>
        </div>
      </header>

      <div class="flex">
        <nav class="flex flex-col gap-s p-m.2 overflow-auto">
          <For each={Object.entries(docs.rules.categories)}>
            {([category, groups]) => (
              <div>
                <div class="font-semibold m-be-s.4">{category}</div>
                <div class="flex flex-col gap-s.2">
                  <For each={groups}>
                    {(ruleGroup, i) => {
                      const { docs } = ruleGroup();
                      const current = () => router.route().current.startsWith(`/group/${docs.title}`);
                      const style = `filter: hue-rotate(${3.6 * i()}deg);`;
                      return (
                        <button onClick={() => navigate(`/group/${docs.title}`)} class={`${current() ? "bg-surface text-fg-1" : "text-fg-3"} relative p-s.6 p-i-s p-is-m.2 rounded-full text-start justify-start transition ease-out overflow-hidden hover:highlight hover:bg-accent-3 hover:text-fg-1 active:highlight+`}>
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
                <Route path={`/group/${group.docs.title}`}>
                  <RuleGroup ruleGroup={group} />
                </Route>
              )
            }}
          </For>
        </main>
      </div>
    </div>
  );
};

export default Main;
