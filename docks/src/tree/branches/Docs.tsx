import { Component, For, JSXElement } from "solid-js";
import { navigate, Route } from "~/lib/rotuer";
import router from "@ui/router";
import { docs } from "windblade";
import ThemeObject from "./Docs/branches/ThemeObject";
import RuleGroup from "./Docs/branches/RuleGroup";

const Main: Component = () => {
  return (
    <div class="flex size-b-full">
      <nav class="flex flex-col gap-s p-m.2 overflow-auto">
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
                      <button onClick={() => navigate(`/docs/${categoryName}-${pageName}`)} class={`${current() ? "bg-surface text-fg-1" : "text-fg-3"} relative p-s.6 p-i-s p-is-m.2 rounded-full text-start justify-start transition ease-out overflow-hidden hover:highlight hover:bg-accent-3 hover:text-fg-1 active:highlight+`}>
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

      <div class="bg-fg-5 size-i-px" />

      <main class="relative flex-1">
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
  );
};

export default Main;
