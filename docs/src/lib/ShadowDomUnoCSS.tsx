import { Component, createEffect, createSignal } from "solid-js";
import themeStore from "~/stores/themeStore";
import uno from "~/unocss";
import ShadowDom from "./ShadowDom";

const Main: Component<{
  class?: string;
  rootStyle?: string;
  html: string;
  onChange?: (shortCss: string) => void;
}> = (props) => {
  const [code, setCode] = createSignal<{ html: string, shortCss: string; fullCss: string }>();

  createEffect(async () => {
    const { html } = props;
    const shortCss = (await uno.generate(html, { safelist: false, preflights: false, minify: true })).css;
    const fullCss = (await uno.generate(html)).css;
    setCode({ html, shortCss, fullCss });
    props.onChange?.(shortCss);
  });

  return <ShadowDom class={props.class} innerHTML={`
    <div
      id="root"
      class="${themeStore.scheme() === "dark" ? "scheme-dark-276" : "scheme-light-296"}"
      style="${props.rootStyle}"
    >
      <style>${code()?.fullCss.replaceAll(":root", ":where(#root)")}</style>
      ${code()?.html}
    </div>
  `} />;
};

export default Main;
