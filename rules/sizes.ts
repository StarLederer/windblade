import { DynamicRule } from "@unocss/core";
import { ITheme } from "../theme/types";
import { logicalRuleSetFull } from "./logicalSet";

const words = ["(", ")", "+", "-", "*", "/"] as const;
type Word = typeof words[number];
type Token = {
  type: Word | "unit",
  value?: string;
};

const tokenize = (expr: string): Token[] => {
  const tokens: Token[] = [];

  let i = 0;
  while (i < expr.length) {
    // Check if expr[i] is a known word
    let j = i;
    words.forEach(word => {
      if (expr[j] === word) {
        tokens.push({ type: word });
        ++i;
      }
    });

    // i was not moved so expr[i] is not a known word
    if (j === i) {
      let value = "";
      while (i < expr.length && !words.includes(expr[i] as Word)) {
        value += expr[i];
        i++
      }

      tokens.push({
        type: "unit",
        value,
      });
    }
  }

  return tokens;
};

const operators = ["+", "-", "*", "/"] as const;
type Operator = typeof operators[number];
type Leaf = {
  operator: Operator;
  value: number | string | Tree;
};
type Tree = Leaf[];

const buildTree = (tokens: Token[]): Tree => {
  const tree: Tree = [];

  let i = 0;
  let operator: Operator = "+";
  let value: number | string = 0;
  while (i < tokens.length) {
    if (operators.includes(tokens[i].type as Operator)) {
      operator = tokens[i].type as Operator;
      i++;
    } else if (tokens[i].type === "unit") {
      value = Number(tokens[i].value);

      if (Number.isNaN(value)) value = tokens[i].value as string;

      tree.push({ operator, value });

      i++;
    } else if (tokens[i].type === "(") {
      let open = 1;
      let subtree: Token[] = [];
      ++i;

      while (true) {
        if (tokens[i].type === ")") {
          --open;
          if (open <= 0) {
            tree.push({ operator, value: buildTree(subtree) });
            ++i;
            break;
          } else {
            subtree.push(tokens[i]);
          }
        } else if (tokens[i].type === "(") {
          ++open;
          subtree.push(tokens[i]);
        } else if (i >= tokens.length) {
          throw Error("Unexpected end!");
        } else {
          subtree.push(tokens[i]);
        }
        ++i;
      }
    } else {
      throw Error(`Unexpected token: ${tokens[i]}`);
    }
  }

  return tree;
};

const solveTree = (tree: Tree, theme: ITheme): number => {
  let result = 0;

  tree.forEach((leaf) => {
    let operator = leaf.operator;
    let value = leaf.value;

    if (Array.isArray(value)) value = solveTree(leaf.value as Tree, theme);
    else if (typeof value === "string") value = theme.wrapp.sizes.tokens[leaf.value as string];
    // else { is already a number }

    if (value === undefined) throw Error(`Unknown value: ${leaf.value}`)

    switch (operator) {
      case "+":
        result += value;
        break;
      case "-":
        result -= value;
        break;
      case "*":
        result *= value;
        break;
      case "/":
        result /= value;
        break;
    }
  });

  return result;
}

const solve = (expr: string, theme: ITheme): string | undefined => {
  if (expr.startsWith("(")) {
    try {
      const tokens = tokenize(expr);
      const tree = buildTree(tokens);
      const result = solveTree(tree, theme);
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
