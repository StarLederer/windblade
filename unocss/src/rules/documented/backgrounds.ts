import { Rule } from "@unocss/core";
import Theme from "../../theme/Theme";
import * as logical from "../logicalSet";
import { colorRule, colorBgRule, fgColorRule } from "../colors";
import * as size from "../sizes";
import { objectKeys } from "ts-extras";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "./types";

export const color = (): DocumentedRuleGroup => {

  const rules: Rule<Theme>[] = [
    colorRule('bg', 'background-color'),
    colorBgRule('bg'),
    fgColorRule('bg-fg', 'background-color'),
    // TODO: we might need a set-fg rule that is the same as bg but does not actually change background color
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Background color",
    description: "Windblade uses semantic colors.",
    utilities: ["bg-<theme.windblade.colors>", "bg-<theme.windblade.miscColors>", "bg-fg-<integer>"],
    preview: (util) => {
      if (util.startsWith("bg-fg")) {
        return `
          <div class="size-i-full aspect-1/1 max-size-i-m max-size-b-m rounded-s p-s bg-accent">
            <div class="size-i-full aspect-1/1 rounded-full ${util}"></div>
          </div>
        `;
      } else {
        return `
          <div class="size-i-full aspect-1/1 max-size-i-m max-size-b-m rounded-s p-s flex items-center justify-center ${util}">
            Background color: ${util}
          </div>
        `;
      }
    },
  };

  return { rules, docs };
};


