import { Rule } from "@unocss/core";
import Theme from "../../theme/Theme";
import * as size from "../sizes";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "./types";

export const scale = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [size.rule('scale', 'transform', {defaultUnit: '', postprocess: (val) => `scale${val}`})];

  const docs: DocumentedRuleGroupDocs = {
    title: "Scale",
    description: "X and Y variants have been removed because they are not logical properties. Windblade also uses proportions instead of separete values.",
    utilities: ["scale-<theme.windblade.proportions>"],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const rotate = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [size.rule('rotate', 'transform', {defaultUnit: 'deg', postprocess: (val) => `rotate${Number(val) * 360}`})];

  const docs: DocumentedRuleGroupDocs = {
    title: "Rotate",
    description: "Windblade uses proportions instead of separete values.",
    utilities: ["rotate-<theme.windblade.proportions>"],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const translate = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [size.rule('translate', 'transform', {postprocess: (val) => `translate${val}`})];

  const docs: DocumentedRuleGroupDocs = {
    title: "Translate",
    description: "X and Y variants have been removed because they are not logical properties. Windblade also uses proportions instead of separete values.",
    utilities: ["translate-<theme.windblade.proportions>"],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const skew = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [size.rule('skew', 'transform', {defaultUnit: 'deg', postprocess: (val) => `skew${Number(val) * 360}`})];

  const docs: DocumentedRuleGroupDocs = {
    title: "Skew",
    description: "Windblade uses proportions instead of separete values.",
    utilities: ["skew-<theme.windblade.proportions>"],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};
