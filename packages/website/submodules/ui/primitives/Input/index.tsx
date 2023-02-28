import { ParentComponent, Signal } from "solid-js";
import styles from './style.module.css';

type IMainProps = {
  required?: boolean;
  label?: string;
  signal: Signal<string>;
};

const Main: ParentComponent<IMainProps> = (props) => {

  return (
    <label class={styles.input}>
      <div class={styles.label}>{props.label}</div>
      <input type="text" required={props.required} value={props.signal[0]()} onChange={(a) => {
        props.signal[1]((a.target as HTMLInputElement).value);
      }} />
    </label>
  );
};

export default Main;
