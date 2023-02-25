import { ParentComponent } from "solid-js";
import Route, { RouteProps } from "@ui/router/Route";

const Main: ParentComponent<Omit<RouteProps, "path"> & {
  path: string;
}> = (props) => (
  <Route
    path={props.path.split("/").filter(Boolean)}
    strict={props.strict}
    class="animation-duration-m.4"
    enter="animate-in"
    leave="animate-out"
  >
    {props.children}
  </Route>
);

export default Main;
