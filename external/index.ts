import type { IThemeColor } from "../theme/types/"

const getColor = (hue: number, color: IThemeColor) => {
  let s = color.dark.s;
  let l = color.dark.l;
  let a = color.dark.a ?? 100;

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    s = color.light?.s ?? s;
    l = color.light?.l ?? l;
    a = color.light?.a ?? a;
  }

  return `hsla(${hue}, ${s}%, ${l}%, ${a}%)`;
};

export {
  getColor
}
