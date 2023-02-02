import { Component, For, onCleanup, onMount, Show } from "solid-js";
import router, { Route } from "@ui/router";
import navigate from "./navigate";
import { addNavigationHandler, removeNavigationHandler } from "./navigate";
import { docs } from "@windblade/unocss";
import RuleGroup from "./branches/RuleGroup";
import Button from "@ui/primitives/Button";
import themeStore from "~/stores/themeStore";
import logoWhite from "@windblade/brand/logo-white.svg";
import logoBlack from "@windblade/brand/logo-black.svg";
import Link from "@ui/primitives/Button/Link";

const Main: Component = () => {
  onMount(() => { addNavigationHandler('/home'); })
  onCleanup(() => { removeNavigationHandler(); })

  const allRules = () => Object.values({
    ...docs.rules.layout,
    ...docs.rules.flexboxAndGrid,
    ...docs.rules.backgrounds,
    ...docs.rules.interactivity,
  });

  return (
    <div class="flex flex-col size-b-full">
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

      <div class="flex flex-1">
        <nav class="flex flex-col gap-s.2 p-m.2">
          <For each={allRules()}>
            {(ruleGroup) => {
              const { rules, docs } = ruleGroup();
              return (
                <button onClick={() => navigate(`/group/${docs.title}`)} class={`${router.route().current.startsWith(`/group/${docs.title}`) ? "bg-srf text-fg-1" : ""} font-semibold p-s rounded-s text-start justify-start text-int transition ease-out hover:highlight hover:bg-int3 active:highlight+`}>
                  {docs.title}
                </button>
              )
            }}
          </For>
        </nav>

        <div class="bg-fg-5 size-i-px" />

        <main class="relative flex-1">
          <For each={allRules()}>
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
