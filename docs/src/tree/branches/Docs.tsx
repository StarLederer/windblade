import { Component, createEffect, createSignal, For, JSXElement, onCleanup, onMount, Show } from "solid-js";
import {
  Dialog,
  DialogPanel,
  DialogOverlay,
} from 'solid-headless';
import { navigate, Route } from "~/lib/rotuer";
import router from "@ui/router";
import { docs } from "windblade";
import ThemeObject from "./Docs/branches/ThemeObject";
import RuleGroup from "./Docs/branches/RuleGroup";
import Button from "@ui/primitives/Button";

const Main: Component = () => {
  const [containerSize, setContainerSize] = createSignal(0);
  const [drawerSize, setDrawerSize] = createSignal(0);
  const [drawerOpen, setDrawerOpen] = createSignal(false);
  const [drawerFlat, setDrawerFlat] = createSignal(false);

  let container: HTMLElement | undefined = undefined;
  let drawer: HTMLElement | undefined = undefined;

  createEffect(async () => {
    containerResizeObserver.disconnect();
    if (!container) return;
    containerResizeObserver.observe(container);
  });
  createEffect(async () => {
    drawerResizeObserver.disconnect();
    if (!drawer) return;
    drawerResizeObserver.observe(drawer);
  });

  const containerResizeObserver = new ResizeObserver(([entry]) => {
    setContainerSize(entry.borderBoxSize[0].inlineSize);
  });
  const drawerResizeObserver = new ResizeObserver(([entry]) => {
    setDrawerSize(entry.borderBoxSize[0].inlineSize);
  });

  createEffect(() => {
    setDrawerFlat(containerSize() >= drawerSize() * 4);
  });

  const drawerVisible = () => drawerOpen() || drawerFlat();

  const nav = (
    <nav class="flex flex-col gap-s p-m.2 overflow-auto border-solid border-0 border-ie-px border-color-fg-5 size-i-max" ref={drawer}>
      {(() => {
        const navDom: JSXElement[] = [];

        docs.default.forEach((category, categoryName) => {
          navDom.push(<>
            <div class="font-semibold m-be-s.4">{categoryName}</div>
            <div class="flex flex-col gap-s.2">
              {(() => {
                const pages: JSXElement[] = [];
                let i = 0;

                category.forEach((page, pageName) => {
                  const current = () => router.route().current.startsWith(`/docs/${categoryName}-${pageName}`);
                  const style = `filter: hue-rotate(${3.6 * i++}deg);`;

                  pages.push(
                    <button
                      onClick={() => {
                        navigate(`/docs/${categoryName}-${pageName}`);
                        setDrawerOpen(false);
                      }}
                      class={`${current() ? "bg-surface text-fg-1" : "text-fg-3"} relative p-s.6 p-i-s p-is-m.2 rounded-full text-start justify-start transition ease-out overflow-hidden hover:highlight hover:bg-accent-3 hover:text-fg-1 active:highlight+`}
                    >
                      <div class="absolute inset-0" style={style}>
                        <div class={`${current() ? "bg-accent-2" : "bg-transparent"} blur-s transition absolute size-b-m.2 size-i-m.2 rounded-full inset-0 inset-b-0 m-b-auto`} />
                        <div class={`${current() ? "bg-accent" : "bg-accent-2"} size-b-s.4 size-i-s.4 transition absolute rounded-full inset-0 inset-b-0 m-b-auto m-is-$(($m.2-$s.4)/2)`} />
                      </div>
                      <span class="relative">{pageName}</span>
                    </button>
                  );
                });

                return pages;
              })()}
            </div>
          </>);
        });

        return navDom;
      })()}
    </nav>
  );

  return (
    <div class="flex flex-col size-b-full" ref={container}>
      <Show when={!drawerFlat()}>
        <div class="relative flex gap-s items-center p-s.4 p-i-m.2 border-solid border-0 border-be-px border-color-fg-5">
          <Button onClick={() => setDrawerOpen(!drawerOpen())} class="p-s.6 rounded-full" style="half">
            <div class={`i-mdi-menu ${!drawerOpen() ? "opacity-s" : "opacity-zero"} transition`} />
            <div class={`i-mdi-backburger ${drawerOpen() ? "opacity-s" : "opacity-zero"} transition absolute`} />
          </Button>
          <div class="flex flex-wrap gap-s.4 text-fg-3">
            <For each={router.route().current.split("/").pop()?.split("-")}>
              {(crumb, i) => <>
                <div class={`${i() === 0 ? "" : "text-fg-1 font-semibold"}`}>{crumb}</div>
                {i() === 0 && <div class="i-mdi-chevron-right" />}
              </>}
            </For>
          </div>
        </div>
      </Show>

      <div class={`flex-1 flex relative ${drawerFlat() ? "flex-row" : "flex-col"}`}>
        <Show
          when={!drawerFlat()}
          fallback={<aside>{nav}</aside>}
        >
          <Dialog isOpen={drawerVisible()} onClose={() => setDrawerOpen(false)} style="z-index: 1;" unmount={false} title="Navigation drawer">
            <Show when={drawerOpen() && !drawerFlat()}>
              <DialogOverlay class="absolute inset-0" />
            </Show>
            <DialogPanel class={`bg-normal-3 transition-transform ease-out ${drawerFlat() ? "relative" : "absolute inset-b-0 inset-is-0"}`} style={`transform: translateX(${drawerVisible() ? "0" : "-100%"})`}>
              {nav}
            </DialogPanel>
          </Dialog>
        </Show>

        <main class={`relative flex-1 transition-all ${drawerOpen() && !drawerFlat() ? "blur-s.2 opacity-s.4" : ""}`} onClick={() => setDrawerOpen(false)}>
          {(() => {
            const routes: JSXElement[] = [];
            docs.default.forEach((category, categoryName) => {
              category.forEach((page, pageName) => {
                if (typeof page === "function") {
                  routes.push(
                    <Route path={`/docs/${categoryName}-${pageName}`}>
                      <ThemeObject themeObject={page} />
                    </Route>
                  );
                } else {
                  routes.push(
                    <Route path={`/docs/${categoryName}-${pageName}`}>
                      <RuleGroup title={pageName} ruleGroup={page} />
                    </Route>
                  );
                }
              })
            });
            return routes;
          })()}
        </main>
      </div>
    </div>
  );
};

export default Main;
