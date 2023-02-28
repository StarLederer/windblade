import { ParentComponent } from "solid-js";
import Base, { IBaseProps } from "./Base";

type IMainProps = IBaseProps & {
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  onClick?: () => void;
};

const Main: ParentComponent<IMainProps> = (props) => {
  return (
    <Base
      class={props.class}
      style={props.style}
      hue={props.hue}
      as={(baseProps) => (
        <button
          class={baseProps.class}
          style={baseProps.style}
          type={props.type ?? "button"}
          disabled={props.disabled}
          onClick={props.onClick}
        >
          {baseProps.children}
        </button>
      )}
    >
      {props.children}
    </Base>
  );
};

export default Main;
export * from "./Base";
