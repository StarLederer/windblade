import Button from "@ui/primitives/Button";
import { Component, For } from "solid-js";
import uno from "~/unocss";

const processInteger = (utility: string, onClick?: (util: string) => void) => {
  const prefix = utility.replace("<integer>", "");
  return (
    <For each={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}>
      {(integer) => (
        <Button
          class="p-s rounded-s.2"
          style="half"
          onClick={() => { onClick?.(prefix + integer) }}
        >
          {prefix + integer}
        </Button>
      )}
    </For>
  );
};

const processWindbladeColor = (utility: string, onClick?: (util: string) => void) => {
  const prefix = utility.replace("<theme.windblade.colors>", "");
  return (
    <For each={Object.keys(uno.config.theme.windblade.colors)}>
      {(color) => (
        <Button
          class="p-s rounded-s.2"
          style="half"
          onClick={() => { onClick?.(prefix + color) }}
        >
          {prefix + color}
        </Button>
      )}
    </For>
  );
};

const processWindbladeMiscColor = (utility: string, onClick?: (util: string) => void) => {
  const prefix = utility.replace("<theme.windblade.miscColors>", "");
  return (
    <For each={Object.keys(uno.config.theme.windblade.miscColors)}>
      {(color) => (
        <Button
          class="p-s rounded-s.2"
          style="half"
          onClick={() => { onClick?.(prefix + color) }}
        >
          {prefix + color}
        </Button>
      )}
    </For>
  );
};

const Main: Component<{
  utility: string;
  onClick?: (color: string) => void;
}> = (props) => {
  if (props.utility.endsWith("<integer>")) {
    return processInteger(props.utility, props.onClick);
  } else if (props.utility.endsWith("<theme.windblade.colors>")) {
    return processWindbladeColor(props.utility, props.onClick);
  } else if (props.utility.endsWith("<theme.windblade.miscColors>")) {
    return processWindbladeMiscColor(props.utility, props.onClick);
  }

  return (
    <Button
      class="p-s rounded-s.2"
      style="half"
      onClick={() => props.onClick?.(props.utility)}
    >
      {props.utility}
    </Button>
  );
};

export default Main;
