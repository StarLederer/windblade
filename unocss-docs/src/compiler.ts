import { DocumentationCategories } from "./types";

const mapsToArrays = (obj: unknown) => {
  if (obj instanceof Map) {
    const arr: any[] = [];

    obj.forEach((val: any, key: any) => {
      arr.push([key, mapsToArrays(val)]);
    });

    return {
      type: "Map",
      value: arr,
    };
  }

  return obj;
};

export const stringify = (docs: DocumentationCategories<any>) => {
  return JSON.stringify(mapsToArrays(docs));
};
