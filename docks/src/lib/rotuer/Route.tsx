import { ParentComponent } from "solid-js";
import Route, { RouteProps } from "@ui/router/Route";

const Main: ParentComponent<RouteProps & {
  scroll?: boolean
}> = (props) => (
  <Route
    path={props.path}
    strict={props.strict}
    class="overflow-auto animation-duration-m.4"
    enter="animate-in"
    leave="animate-out"
  >
    {props.children}
  </Route>
);

export default Main;
