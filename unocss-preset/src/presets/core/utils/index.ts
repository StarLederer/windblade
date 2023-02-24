const objToCSS = (obj: Record<string, string>) => {
  let css = "";
  Object.keys(obj).forEach((key) => {
    css += `${key}: ${obj[key]};\n`;
  });
  return css;
};

export { objToCSS };
export * from "./color";
