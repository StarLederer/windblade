import { ParentComponent, Signal } from "solid-js";
import styles from './style.module.css';

type IMainProps = {
  min?: number;
  max?: number;
  step?: number;
  hue?: number;
  signal: Signal<number>;
};

const Main: ParentComponent<IMainProps> = (props) => {
  return (
    <div class={styles.bg}>
      <div class={styles.fill} style={`width: calc(${props.signal[0]() * 100}%`} />
      <input
        class={styles.slider}
        type="range"
        min={props.min ?? 0}
        max={props.max ?? 1}
        step={props.step ?? 1}
        value={props.signal[0]()} onInput={(a) => {
          props.signal[1](Number((a.target as HTMLInputElement).value));
        }}
      />
    </div>
  );
};

export default Main;
