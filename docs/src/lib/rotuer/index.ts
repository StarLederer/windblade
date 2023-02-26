import router from "@ui/router";
import Route from "./Route";

export { Route };

export const navigate = (path: string) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  urlParams.set("navigation", path);

  router.navigate(path.split("/").filter(Boolean));
  history.pushState({}, "", `?${urlParams}`);
};

const constroller = new AbortController();
const signal = constroller.signal;

export const addNavigationHandler = (fallback: string = "/") => {
  const navigateAsPerUrl = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlNav = decodeURIComponent(urlParams.get("navigation") ?? fallback);
    router.navigate(urlNav.split("/").filter(Boolean));
  };

  window.addEventListener('popstate', navigateAsPerUrl, { signal });
  navigateAsPerUrl();
};

export const removeNavigationHandler = () => {
  constroller.abort();
};

export default navigate;
export { default as LocalLink } from "./LocalLink";
