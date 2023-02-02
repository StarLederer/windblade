import { Rule } from "@unocss/core";
import Theme from "../../theme/Theme";
import * as logical from "../logicalSet";
import { colorRule, colorBgRule, fgColorRule } from "../colors";
import * as size from "../sizes";
import { objectKeys } from "ts-extras";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "./types";

export const hue = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    [
      new RegExp(`^(hue)-(.+)$`),
      (match) => ({
        '--hue': match[2],
      })
    ],
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Hue",
    description: "These utilities change semantic color hues and are not present in Tailwind.",
    utilities: ["hue-0", "hue-30", "hue-60", "hue-90", "hue-120", "hue-150", "hue-180", "hue-210", "hue-240", "hue-270", "hue-300", "hue-330"],
    preview: (util) => `
      <div class="${util} bg-surface border border-color-surface rounded-s p-s flex gap-s items-center">
        <div class="size-i-m.2 aspect-1/1 bg-accent rounded-full"></div>
        <div class="flex flex-col gap-s.2">
          <div class="text-fg-1 font-bold font-(s+s.2)">Colored chip</div>
          <div class="text-fg-2">Chip subtitle...</div>
        </div>
      </div>
    `,
  };

  return { rules, docs };
};


