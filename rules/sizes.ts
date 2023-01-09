import { DynamicRule } from "@unocss/core";
import { ITheme } from "../theme/types";
import { buildTree, ResolvedToken, solveTree, Token, tokenize } from "./expressions";
import { logicalRuleSetFull } from "./logicalSet";

const resolveTokens = (tokens: Token[], theme: ITheme): ResolvedToken[] => {
  let resolvedTokens: ResolvedToken[] = [];

  // Iterate over types and values of each token given
  tokens.forEach((token) => {
    // Only care about units
    if (token.type !== "unit") {
      resolvedTokens.push({type: token.type});
      return;
    }

    // Try to replace with a theme design token
    let themeValue = theme.wrapp.sizes.tokens[token.value as string];
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

const solve = (expr: string, theme: ITheme): string | undefined => {
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
    let token = theme.wrapp.sizes.tokens[expr];
    let misc = theme.wrapp.sizes.misc[expr];
    if (token !== undefined) return `${token}rem`;
    else if (misc !== undefined) return `${misc}`;
  }

  // console.error(`Unable to resolve size unit: ${expr}`);
  return undefined;
};

const sizeRule = (prefix: string, property: string, value?: (size: string) => string): DynamicRule<ITheme> => {
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

const logicalSizeSet = (prefix: string, postfix: string, propertyPrefix: string, propertyPostfix: string) => (
  logicalRuleSetFull(prefix, postfix, propertyPrefix, propertyPostfix, sizeRule)
);

export { sizeRule, logicalSizeSet };
