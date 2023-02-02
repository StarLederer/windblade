import { Rule } from "@unocss/core";
import { objectEntries } from "ts-extras"
import Theme from "../../../theme/Theme";
import * as logical from "../../logicalSet";
import * as size from "../../sizes";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "../types";

const generate = (type: "fit" | "fill", ruleName: string, cssName: string) => ((): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    size.rule(`grid-${type}-${ruleName}s`, `grid-template-${cssName}s`, { postprocess: (size) => (`repeat(auto-fit, minmax(${size}, 1fr))`) }),
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: `Grid ${type} ${cssName}s`,
    description: `Utilities specifying the columns in a grid layout using auto-${type}. Missing from Tailwind.`,
    utilities: [`grid-${type}-${ruleName}s-<theme.windblade.proportions>`],
    preview: (util) => `
        <div class="grid ${util} ${util.includes("cols") ? "" : "grid-flow-col"} gap-s min-size-b-l.4 bg-accent-3 rounded-s.4 size-i-full">
          <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">01</div>
          <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">02</div>
          <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">03</div>
          <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">04</div>
          <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">05</div>
          <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">06</div>
          <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">07</div>
          <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">08</div>
          <div class="bg-accent rounded-s.4 p-s flex items-center justify-center text-center">09</div>
        </div>
      `,
  };

  return { rules, docs };
});

export const gridFitCols = generate("fit", "col", "column");
export const gridFillCols = generate("fill", "col", "column");
export const gridFitRows = generate("fit", "row", "row");
export const gridFillRows = generate("fill", "row", "row");
