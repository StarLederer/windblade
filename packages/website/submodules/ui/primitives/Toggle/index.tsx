import { createSignal, ParentComponent, Signal } from "solid-js";
import {
  Checkbox,
  CheckboxIndicator,
} from 'solid-headless';
import styles from './style.module.css';

type IMainProps = {
  radius?: number;
  label?: string;
  signal: Signal<boolean | undefined>;
};

const Main: ParentComponent<IMainProps> = (props) => {
  return (
    <Checkbox
      checked={props.signal[0]()}
      onChange={props.signal[1]}
      as="div"
    >
      <CheckboxIndicator
        class={`${styles.switch} ${props.signal[0]() ? styles.on : ''}`}
        onClick={(e: MouseEvent) => { e.preventDefault() }}
      >
        <div class={styles.text}>Toggle {props.label}: {props.signal[0]() ? "on" : "off"}</div>
        <div class={styles.toggle} />
      </CheckboxIndicator>
    </Checkbox>
  );
};

export default Main;
