import { Component, JSXElement, ParentComponent, Suspense } from "solid-js";
import { Content, Root } from "mdast-util-from-markdown/lib";
import { DocumentedThemeObject } from "windblade/docs/types";
import { theme } from "windblade";
import uno from "~/unocss";
import libs from "~/lib/external";
import ShadowDomUnoCSS from "~/lib/ShadowDomUnoCSS";

const Error: ParentComponent = (props) => (
  <div class="inline-block scheme-auto-0 bg-surface p-s.4 p-i-s rounded-s text-fg-2 font-normal">
    <span class="text-fg-1 font-semibold">Error:</span> {props.children}
  </div>
);

const mdToJsx = (tree: Content | Root): JSXElement => {
  switch (tree.type) {
    case "text":
      return tree.value;
    case "link":
      return <a class="text-accent" href={tree.url}>{tree.children.map((child) => mdToJsx(child))}</a>
    case "paragraph":
      return (
        <p class="text-fg-3 font-semibold leading-$($s+$s.2) max-size-i-[128ch]">
          {tree.children.map((child) => mdToJsx(child))}
        </p>
      );
    case "heading":
      switch (tree.depth) {
        case 1:
          return <h2 class="text-fg-1 font-bold text-m.2">{tree.children.map((child) => mdToJsx(child))}</h2>;
        case 2:
          return <h3 class="font-bold text-$($s+$s.2)">{tree.children.map((child) => mdToJsx(child))}</h3>;
        case 3:
          return <h4 class="font-bold">{tree.children.map((child) => mdToJsx(child))}</h4>;
        case 4:
          return <h5>{tree.children.map((child) => mdToJsx(child))}</h5>;
        case 5:
          return <h6>{tree.children.map((child) => mdToJsx(child))}</h6>;
        case 6:
          return <Error>Heading too deep</Error>;;
      }
    case "code":
      if (tree.lang === "uno-html") {
        return <ShadowDomUnoCSS html={tree.value} class="overflow-auto" />
      } else {
        const style = `bg-surface p-s rounded-s leading-$($s+$s.4) overflow-auto ${tree.lang ?? ''}`;

        if (!tree.lang) {
          return <pre class={style}>{tree.value}</pre>
        }

        let highlighted = tree.value;
        try {
          highlighted = libs.highlighter()?.highlight(tree.value, { language: tree.lang }).value ?? '';
        } catch (err: any) {
          return <Error>Failed highlighting code. {err.message}</Error>
        }

        return <pre class={style} innerHTML={highlighted} />
      }
    case "inlineCode":
      return <span class="bg-surface p-i-s.4 rounded-s.4">{tree.value}</span>
    case "strong":
      return <strong class="font-bold">{tree.children.map((child) => mdToJsx(child))}</strong>
    case "list":
      return <ul class="p-is-s flex flex-col gap-s.4">{tree.children.map((child) => mdToJsx(child))}</ul>
    case "listItem":
      return <li class="text-fg-3 font-semibold">{tree.children.map((child) => mdToJsx(child))}</li>
    case "root":
      return tree.children.map((child) => mdToJsx(child));
    default:
      return <Error>Unsoppoprted element: {tree.type}</Error>;
  };
};

const Main: Component<{
  themeObject: DocumentedThemeObject<theme.Theme>,
}> = (props) => (
  <div class="size-b-full overflow-auto">
    <div class="p-m.2 flex flex-col gap-s">
      <Suspense fallback="Loading...">
        {(() => {
          const md = libs.md()?.fromMarkdown(props.themeObject(uno.config.theme));
          if (!md) return "Error: Failed to parse this page's markdown";
          return mdToJsx(md);
        })()}
      </Suspense>
    </div>
  </div>
);

export default Main;
