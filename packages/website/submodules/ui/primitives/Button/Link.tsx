import { ParentComponent } from "solid-js";
import Base, { IBaseProps } from "./Base";

type IMainProps = IBaseProps & {
  href: string;
};

const Main: ParentComponent<IMainProps> = (props) => {
  return (
    <Base
      class={props.class}
      style={props.style}
      hue={props.hue}
      as={(baseProps) => (
        <a
          class={baseProps.class}
          style={`text-decoration: none; ${baseProps.style}`}
          href={props.href}
        >
          {baseProps.children}
        </a>
      )}
    >
      {props.children}
    </Base>
  );
};

export default Main;
