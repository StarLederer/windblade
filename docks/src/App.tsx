import { Component } from "solid-js";
import themeStore from "~/stores/themeStore";
import Root from "~/tree/Root";

const Main: Component = () => {
  const themeStyles = () => themeStore.scheme() === "light" ? "scheme-light" : "scheme-dark";

  return (
    <div class={`${themeStyles()} size-i-full size-b-full relative bg-def3 text-fg-2 overflow-hidden`} style={`--hue: ${themeStore.hue()};`}>
      <Root />
    </div>
  );
};

export default Main;
