import { Component, onCleanup, onMount, Show } from "solid-js";
import { navigate, Route, addNavigationHandler, removeNavigationHandler } from "~/lib/rotuer";
import Button from "@ui/primitives/Button";
import Link from "@ui/primitives/Button/Link";
import logoWhite from "@windblade/brand/logo-white.svg";
import logoBlack from "@windblade/brand/logo-black.svg";
import themeStore from "~/stores/themeStore";
import Home from "./branches/Home";
import Docs from "./branches/Docs";

const Main: Component = () => {
  onMount(() => { addNavigationHandler('/home'); })
  onCleanup(() => { removeNavigationHandler(); })

  return (
    <div class="size-b-full grid" style="grid-template-rows: auto minmax(0, 1fr);">
      <header class="p-b-s.4 p-m.2 border border-color-transparent border-be-color-fg-5 flex justify-between items-center">
        <h1 class="font-bold text-fg-1 ">
          <button onClick={() => navigate("/home")} class="flex gap-s.4 items-center -m-i-s.8 p-s.4 p-ie-s rounded-full transition-all hover:bg-accent-4 hover:highlight">
            <Show
              when={themeStore.scheme() === "dark"}
              fallback={<img src={logoBlack} alt="Logo" class="size-b-m.2" />}
            >
              <img src={logoWhite} alt="Logo" class="size-b-m.2" />
            </Show>
            Windblade
          </button>
        </h1>

        <div class="flex gap-s.4">
          <Button onClick={() => navigate("/home")}>Home</Button>
          <Button onClick={() => navigate("/docs")}>Docs</Button>
          <Button onClick={themeStore.toggleScheme} class="p-s rounded-s relative">
            <div class="i-mdi-brightness-4 transition" style={`opacity: ${themeStore.enforceScheme() === undefined ? 1 : 0}`} />
            <div class="absolute i-mdi-brightness-7 transition" style={`opacity: ${themeStore.enforceScheme() === "light" ? 1 : 0}`} />
            <div class="absolute i-mdi-brightness-2 transition" style={`opacity: ${themeStore.enforceScheme() === "dark" ? 1 : 0}`} />
          </Button>
          <Link href="https://github.com/StarLederer/windblade"><div class="i-simple-icons-github" /></Link>
        </div>
      </header>

      <div class="relative">
        <Route path="/home">
          <Home />
        </Route>

        <Route path="/docs">
          <Docs />
        </Route>
      </div>
    </div>
  );
};

export default Main;
