import router from "@ui/router";
import Route from "./Route";

export { Route };

export const navigate = (path: string) => {
  router.navigate(path);
  history.pushState({}, "", `?navigation=${path}`);
};

const constroller = new AbortController();
const signal = constroller.signal;

export const addNavigationHandler = (fallback: string = "/") => {
  const navigateAsPerUrl = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlNav = urlParams.get("navigation") ?? fallback;
    router.navigate(urlNav);
  };

  window.addEventListener('popstate', navigateAsPerUrl, { signal });
  navigateAsPerUrl();
};

export const removeNavigationHandler = () => {
  constroller.abort();
};

export default navigate;
