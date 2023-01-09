import type { IThemeColor } from "../theme/types/"
import type { VariantProps, Variant } from "./variant";

/**
 * Turns IThemeColor into CSS string
 *
 * @param name custom CSS property name partial (--col-NAME)
 * @param dark
 * @param light
 * @returns a tuple of (s)aturation, (l)ightness and (a)lpha custom CSS properties for dark (default) and light modes
 */
const getCSSProperties = (name: string, color: IThemeColor): VariantProps => {
  const { dark, light } = color;

  const propsDark: any = {};
  propsDark[`--col-${name}-s`] = `${dark.s}%`;
  propsDark[`--col-${name}-l`] = `${dark.l}%`;
  propsDark[`--col-${name}-a`] = `${dark.a ?? 100}%`;

  // We could generate this the same as propsDark
  // but we can optimize if we don't add light variatns
  // when they are the same as dark.
  // This at least removes the need for --col-NAME-s
  // light variant for almost all the colors
  let propsLight: any = {};
  if (light?.s !== undefined) {
    propsLight[`--col-${name}-s`] = `${light.s}%;`;
  }

  if (light?.l !== undefined) {
    propsLight[`--col-${name}-l`] = `${light.l}%;`;
  }
  else {
    propsLight[`--col-${name}-l`] = `${100 - dark.l}%;`;
  }

  if (light?.a !== undefined) {
    propsLight[`--col-${name}-a`] = `${light.a}%;`;
  }

  return {
    dark: propsDark,
    light: propsLight,
  };
};

const getSLA = (color: IThemeColor): Record<Variant, {s: number, l: number, a: number}> => {
  const s = color.dark.s;
  const l = color.dark.l;
  const a = color.dark.a ?? 100;

  return {
    dark: {s, l, a},
    light: {
      s: color.light?.s ?? s,
      l: color.light?.l ?? l,
      a: color.light?.a ?? a,
    },
  }
};

const getHSLA = (hue: number, color: IThemeColor): Record<Variant, {h: number, s: number, l: number, a: number}> => {
  let sla: any = getSLA(color);
  Object.assign(sla, {
    dark: {h: hue},
    light: {h: hue},
  });

  return sla;
};

export {
  getCSSProperties,
  getSLA,
  getHSLA,
}
