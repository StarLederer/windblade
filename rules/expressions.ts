const operators = ["+", "-", "*", "/"] as const;
type Operator = typeof operators[number];

const scopers = ["(", ")"] as const;
type Scoper = typeof scopers[number];

const words = [...operators, ...scopers] as const;
type Word = typeof words[number];

type WordToken = {
  type: Word,
};
type UnitToken = {
  type: Word | "unit",
  value?: string;
};
type Token = WordToken | UnitToken;

type ResolvedUnitToken = {
  type: Word | "unit",
  value: number;
};
type ResolvedToken = WordToken | ResolvedUnitToken;

type Tree = {
  operator: Operator;
  value: number | Tree;
}[];

/**
 *
 * @param expr
 * @returns
 */
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

/*
 * We are not implementing a resolveTokens function here
 * beacure we don't want to make this file dependant on ITheme.
 *
 * Example implementation:
 * const resolveTokens = (tokens: Token[]): ResolvedTokens[] => ...
 */

/**
 * Converts an array of ResolvedTokens into an
 * abstract syntax tree (AST).
 *
 * @param tokens array of tokens to buld the AST from.
 * @returns abstract syntax tree.
 */
const buildTree = (tokens: ResolvedToken[]): Tree => {
  const tree: Tree = [];

  let i = 0;
  let operator: Operator = "+"; // current operator
  while (i < tokens.length) {
    if (operators.includes(tokens[i].type as Operator)) {
      // Change current operator
      operator = tokens[i].type as Operator;
      i++;
    } else if (tokens[i].type === "unit") {
      // Push a new leaf of curent operator and current token value
      tree.push({ operator, value: (tokens[i] as ResolvedUnitToken).value });
      i++;
    } else if (tokens[i].type === "(") {
      let open = 1;
      let subtree: ResolvedToken[] = [];
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

/**
 * Solves mathematical expressions represented as abstrract syntax trees (AST).
 *
 * @param tree matematical expression represented by and AST.
 * @returns result of the expression.
 */
const solveTree = (tree: Tree): number => {
  let result = 0;

  tree.forEach((leaf) => {
    let operator = leaf.operator;
    let value = leaf.value;

    if (Array.isArray(value)) value = solveTree(value);

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

export type {
  Token,
  ResolvedToken,
  Tree,
};
export {
  tokenize,
  buildTree,
  solveTree,
};
