import { createSignal, createRoot } from "solid-js";

export type Path = string[];

type FirstDifferent = [string | undefined, string | undefined];

type IRouteStore = {
  previous: Path;
  current: Path;
  // Fist path segments that is different between previous and current
  firstDifferent: FirstDifferent;
};

const resolve = (path: Path): Path => {
  let resolvedPath: Path = [];

  path.forEach((segment) => {
    if (segment === "..") {
      resolvedPath.pop();
    } else {
      resolvedPath.push(segment);
    }
  })

  return resolvedPath;
}

const findFirstDifferent = (a: Path, b: Path): FirstDifferent => {
  // Yes, we do go outside one of the array bounds
  // It is very convenient that javascript gives us
  // undefined if we do so.
  // /a/b/undefined (undefined is first different)
  // /a/b/c/d (c is first differenc)
  const maxLength = Math.max(a.length, b.length);
  for (let i = 0; i < maxLength; ++i) {
    if (a[i] != b[i]) {
      return [a[i], b[i]];
    }
  }

  // If paths are the same return undefined as
  // first different for both paths
  return [undefined, undefined];
}

export const pathStartsWith = (self: Path, other: Path): boolean => {
  if (self.length < other.length) return false;

  for (let i = 0; i < other.length; ++i) {
    if (self[i] !== other[i]) return false;
  }

  return true;
};

export const pathEquals = (self: Path, other: Path): boolean => {
  if (self.length !== other.length) return false;

  return pathStartsWith(self, other);
};

const createRouter = () => {
  const [route, setRoute] = createSignal<IRouteStore>({
    previous: [],
    current: [],
    firstDifferent: [undefined, undefined],
  });

  const navigate = (to: Path) => {
    const previous = route().current;
    const current = resolve(to);

    setRoute({
      previous,
      current,
      firstDifferent: findFirstDifferent(previous, current)
    });
  };

  return { route, navigate };
}

export default createRoot(createRouter);
export { default as Route } from "./Route";
