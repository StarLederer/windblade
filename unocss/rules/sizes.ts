import { DynamicRule } from "@unocss/core";
import Theme from "../theme/Theme";
import { buildTree, ResolvedToken, solveTree, Token, tokenize } from "./expressions";
import * as logical from "./logicalSet";

const resolveTokens = (tokens: Token[], theme: Theme): ResolvedToken[] => {
  let resolvedTokens: ResolvedToken[] = [];

  // Iterate over types and values of each token given
  tokens.forEach((token) => {
    // Only care about units
    if (token.type !== "unit") {
      resolvedTokens.push({type: token.type});
      return;
    }

    // Try to replace with a theme design token
    let themeValue = theme.windblade.proportions[token.value as string];
    if (themeValue !== undefined) {
      resolvedTokens.push({
        type: token.type,
        value: themeValue,
      });
      return;
    }

    // Try to replace with a number
    let numberValue = Number(token.value);
    if (!Number.isNaN(numberValue)) {
      resolvedTokens.push({
        type: token.type,
        value: numberValue,
      });
      return;
    }
  });

  return resolvedTokens;
};

const solve = (expr: string, theme: Theme): string | undefined => {
  if (expr.startsWith("(")) {
    try {
      const tokens = tokenize(expr);
      const resolvedTokens = resolveTokens(tokens, theme);
      const tree = buildTree(resolvedTokens);
      const result = solveTree(tree);
      return `${result}rem`;
    } catch (err) {
      console.error(err);
    }
  } else {
    let token = theme.windblade.proportions[expr];
    let misc = theme.windblade.miscSizes[expr];
    if (token !== undefined) return `${token}rem`;
    else if (misc !== undefined) return `${misc}`;
  }

  // console.error(`Unable to resolve size unit: ${expr}`);
  return undefined;
};

const rule = (
  prefix: string,
  property: string,
  value?: (size: string) => string
): DynamicRule<Theme> => {
  return [
    new RegExp(`^(${prefix})-(.+)$`),
    (match, { theme }) => {
      const css: any = {};
      let parameter = solve(match[2], theme);
      if (parameter === undefined) return undefined;
      css[property] = value?.(parameter) ?? parameter;
      return css;
    }
  ];
};

const axisRules = (prefix: string, postfix: string, propertyPrefix: string, propertyPostfix: string) => (
  logical.axisRules(prefix, postfix, propertyPrefix, propertyPostfix, rule)
);

const edgeRules = (prefix: string, postfix: string, propertyPrefix: string, propertyPostfix: string) => (
  logical.edgeRules(prefix, postfix, propertyPrefix, propertyPostfix, rule)
);

const cornerRules = (prefix: string, postfix: string, propertyPrefix: string, propertyPostfix: string) => (
  logical.cornerRules(prefix, postfix, propertyPrefix, propertyPostfix, rule)
);

export { solve, rule, axisRules, edgeRules, cornerRules };
