import Button from "@ui/primitives/Button";
import { Component, createEffect, createSignal, For, JSXElement, on } from "solid-js";
import uno from "~/unocss";

const isolateTokens = (src: JSXElement[]): JSXElement[] => {
  const tokens = [
    "<integer>",
    "<ratio>",
    "<theme.windblade.sizes>",
    "<theme.windblade.proportions>",
    "<theme.windblade.miscSizes>",
    "<theme.windblade.colors>",
    "<theme.windblade.miscColors>",
    "<theme.windblade.time.functions>",
  ];

  return src.flatMap((element): JSXElement[] => {
    if (typeof element !== "string") {
      return [element];
    }

    // entire element is a token
    if (tokens.includes(element)) return [element];

    // element does not include any tokens
    if (tokens.map((token) => element.includes(token)).filter((element) => Boolean(element)).length <= 0) return [element];

    // loop over known tokens
    return tokens.flatMap((token): JSXElement[] => {
      const i = element.indexOf(token);

      // element does not include the current token
      if (i < 0) return [];

      return [
        // stuff before discovered token
        ...isolateTokens([element.substring(0, i)]),
        // discovered token
        element.substring(i, i + token.length),
        // stuiff after discovered token
        ...isolateTokens([element.substring(i + token.length, element.length)]),
      ].filter((val) => Boolean(val));
    })
  });
};

const Integer: Component<{
  onChange: (val: string) => void;
}> = (props) => {
  const [val, setVal] = createSignal(1);

  const activate = () => props.onChange("" + val());

  createEffect(activate);

  const buttonClasses = "p-b-s.4 p-i-s.6 rounded-s.4 self-stretch";

  return (
    <div class="bg-srf border border-color-srf rounded-s.4 flex items-center">
      <Button class={buttonClasses} onClick={() => setVal(val() - 1)}>-</Button>
      <Button class={buttonClasses} onClick={activate}>{val}</Button>
      <Button class={buttonClasses} onClick={() => setVal(val() + 1)}>+</Button>
    </div>
  );
};

const List: Component<{
  values: any[],
  onChange: (val: string) => void;
}> = (props) => (
  <select
    name="colors"
    class="block size-b-full bg-srf border border-color-srf rounded-s.4 min-size-i-0 p-i-s.4 hover:highlight active:highlight+"
  >
    <option value=""></option>
    <For each={props.values}>
      {([name]) => (
        <option
          value={name}
          onClick={() => props.onChange(name)}
        >
          {name}
        </option>)}
    </For>
  </select>
);

const Main: Component<{
  utility: string;
  onClick?: (util: string) => void;
}> = (props) => {
  const [tokens, setTokens] = createSignal(isolateTokens([props.utility]));

  const activate = () => props.onClick?.(tokens().join(""));

  createEffect(on(tokens, activate, { defer: true }));

  return (
    <div class="flex gap-s.2 justify-between items-center">
      <div class="flex items-center">
        {isolateTokens([props.utility]).map((token, i) => {
          switch (token) {
            case "<integer>":
              return <Integer onChange={(val) => setTokens((prev) => { prev[i] = val; return [...prev] })} />;
            case "<theme.windblade.sizes>":
              return <List values={[...Object.entries(uno.config.theme.windblade.proportions), ...Object.entries(uno.config.theme.windblade.miscSizes)]} onChange={(val) => setTokens((prev) => { prev[i] = val; return [...prev] })} />;
            case "<theme.windblade.proportions>":
              return <List values={Object.entries(uno.config.theme.windblade.proportions)} onChange={(val) => setTokens((prev) => { prev[i] = val; return [...prev] })} />;
            case "<theme.windblade.miscSizes>":
              return <List values={Object.entries(uno.config.theme.windblade.miscSizes)} onChange={(val) => setTokens((prev) => { prev[i] = val; return [...prev] })} />;
            case "<theme.windblade.colors>":
              return <List values={Object.entries(uno.config.theme.windblade.colors)} onChange={(val) => setTokens((prev) => { prev[i] = val; return [...prev] })} />;
            case "<theme.windblade.miscColors>":
              return <List values={Object.entries(uno.config.theme.windblade.miscColors)} onChange={(val) => setTokens((prev) => { prev[i] = val; return [...prev] })} />;
            case "<theme.windblade.time.functions>":
              return <List values={Object.entries(uno.config.theme.windblade.time.functions)} onChange={(val) => setTokens((prev) => { prev[i] = val; return [...prev] })} />;
            default:
              return <button onClick={() => setTokens((prev) => { prev[i] = token; return [...prev] })}>{token}</button>;
          }
        })}
      </div>
    </div>
  );
};

export default Main;
