import { ParentComponent } from "solid-js";
import styles from './style.module.css';

type IMainProps = {
  radius?: number;
};

const Main: ParentComponent<IMainProps> = (props) => {
  return (
    <div
      class={styles.progress}
      style={`--radius: ${props.radius ?? 1}rem`}
    />
  );
};

export default Main;
