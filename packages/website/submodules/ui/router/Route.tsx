import { createEffect, createSignal, on, ParentComponent, Show } from "solid-js";
import router, { Path, pathEquals, pathStartsWith } from "./index";

export type RouteProps = {
  path: Path;
  strict?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  enter?: string;
  leave?: string;
  class?: string;
};

const Route: ParentComponent<RouteProps> = (props) => {
  const { route } = router;

  // Determine whether this path is open.

  const isOpen = () => {
    if (props.strict) {
      return pathEquals(route().current, props.path);
    } else {
      return pathStartsWith(route().current, props.path);
    }
  };

  // Open & close callbacks.
  // Executes when open state changes but not when allbakcs change

  createEffect(on(isOpen, () => {
    if (isOpen()) props.onOpen?.();
    else props.onClose?.();
  }))

  // DOM & CSS.
  // Manage correctly timed DOM updates and animation classes

  let container: HTMLElement | undefined;
  let timeout = setTimeout(() => { }, 0);
  const [hasDom, setHasDom] = createSignal(false);
  const [animationClass, setAnimationClass] = createSignal("");

  createEffect(() => {
    clearTimeout(timeout);
    const pathLast = props.path.at(-1);
    if (isOpen()) {
      // set dom regardless
      setHasDom(true);
      // animate only the deepest node that changed
      if (route().firstDifferent[1] === pathLast) setAnimationClass(props.enter ?? "");
    } else {
      if (route().firstDifferent[0] === pathLast) {
        // animate and remove dom of only the deepst node that chagned
        // there is no need to remove children's dom because they are
        // supposed to be nested.
        setAnimationClass(props.leave ?? "");
        requestAnimationFrame(() => {
          if (!container) return;
          const computedStyle = window.getComputedStyle(container);
          const delay = (
            Number(computedStyle.animationDelay.slice(0, -1))
            + Number(computedStyle.animationDuration.slice(0, -1))
          ) * 1000;
          timeout = setTimeout(() => {
            setHasDom(false);
          }, delay);
        });
      }
    }
  });

  return (
    <Show when={hasDom()}>
      <section class={`absolute inset-0 ${animationClass()} ${props.class ?? ""}`} ref={container}>
        {props.children}
      </section>
    </Show>
  );
};

export default Route;
