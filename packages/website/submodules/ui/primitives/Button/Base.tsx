import { ParentComponent } from "solid-js";
import styles from './style.module.css';

type IButtonStyle = "none" | "ghost" | "half" | "secondary" | "solid";

type IBaseProps = {
  style?: IButtonStyle;
  hue?: number;
  class?: string;
};

type IMainProps = IBaseProps & {
  as: ParentComponent<{
    class: string;
    style: string;
  }>;
};

const Main: ParentComponent<IMainProps> = (props) => {
  const As = props.as;

  return (
    <As
      class={[
        props.class ?? "rounded-s p-s",
        styles.button,
        (() => {
          if (props.style === "none") return "";
          if (props.style === "solid") return styles.isSolid;
          if (props.style === "secondary") return styles.isSecondary;
          if (props.style === "half") return styles.isHalf;
          return styles.isGhost;
        })(),
      ].join(" ")}
      style={`${props.hue != null ? `--hue: ${props.hue};` : ""}`}
    >
      {props.style === "none"
        ? props.children
        : <div class="flex flex-row items-center justify-center flex-1 gap-s.8">
          {props.children}
        </div>
      }
    </As>
  );
};

export default Main;
export type { IButtonStyle, IBaseProps };
