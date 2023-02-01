import { Component } from "solid-js";
import themeStore from "./stores/themeStore";
import Root from "./tree/Root";

const Main: Component = () => {
  const themeStyles = () => themeStore.scheme() === "light" ? "scheme-light hue-220" : "scheme-dark hue-200";

  return (
    <div class={`${themeStyles()} size-i-full size-b-full relative bg-def3 text-fg-2 overflow-hidden`}>
      <Root />
    </div>
  );
};

export default Main;
