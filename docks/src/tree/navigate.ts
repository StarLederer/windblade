import router from "@ui/router"

const navigate = (path: string) => {
  router.navigate(path);
  history.pushState({}, "", `?navigation=${path}`);
};

const constroller = new AbortController();
const signal = constroller.signal;

const addNavigationHandler = (fallback: string = "/") => {
  const navigateAsPerUrl = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlNav = urlParams.get("navigation") ?? fallback;
    router.navigate(urlNav);
  };

  window.addEventListener('popstate', navigateAsPerUrl, { signal });
  navigateAsPerUrl();
};

const removeNavigationHandler = () => {
  constroller.abort();
};

export default navigate;
export { addNavigationHandler, removeNavigationHandler };
