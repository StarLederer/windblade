import { Component, For } from "solid-js";
import uno from "~/unocss";
import syntax from "~/lib/syntax";
import ShadowDomUnoCSS from "~/lib/ShadowDomUnoCSS";
import { Components, DocumentedThemeObject } from "windblade/docs/types";

const H1 = (text: string) => <h2 class="text-fg-1 font-bold text-m.2">{text}</h2>;
const H2 = (text: string) => <h3 class="font-bold text-$($s+$s.2)">{text}</h3>;
const H3 = (text: string) => <h4 class="font-bold">{text}</h4>;
const P = (text: string) => <p class="text-fg-3 font-semibold leading-$($s+$s.2) max-size-i-[128ch]">{text}</p>;
const Ul = (items: string[]) => <ul class="p-is-s">
  <For each={items}>
    {(item) => <li class="text-fg-3 font-semibold leading-$($s+$s.2)">{item}</li>}
  </For>
</ul>
const Pre = (code: string, lang: string) => <pre class={`bg-surface p-s rounded-s leading-$($s+$s.4) overflow-auto ${lang}`} innerHTML={syntax.highlighter()?.highlight(code, { language: lang }).value} />;
const Example = (html: string) => <ShadowDomUnoCSS html={html} class="overflow-auto" />;

const components: Components = { h1: H1, h2: H2, h3: H3, p: P, ul: Ul, pre: Pre, example: Example };

const Main: Component<{
  themeObject: DocumentedThemeObject,
}> = (props) => (
  <div class="size-b-full overflow-auto">
    <div class="p-m.2 flex flex-col gap-s">
      {props.themeObject(uno.config.theme, components)}
    </div>
  </div>
);

export default Main;
