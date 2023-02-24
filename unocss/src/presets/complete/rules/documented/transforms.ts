import { Rule } from "@unocss/core";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "unocss-docs";
import { theme } from "../../../core";
import * as size from "../../../core/rule-utils/sizes";

export const scale = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [size.rule('scale', 'transform', {defaultUnit: '', postprocess: (val) => `scale${val}`})];

  const docs: DocumentedRuleGroupDocs = {
    description: "X and Y variants have been removed because they are not logical properties. Windblade also uses proportions instead of separete values.",
    utilities: ["scale-<theme.windblade.proportions>"],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const rotate = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [size.rule('rotate', 'transform', {defaultUnit: 'deg', postprocess: (val) => `rotate${Number(val) * 360}`})];

  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade uses proportions instead of separete values.",
    utilities: ["rotate-<theme.windblade.proportions>"],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const translate = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [size.rule('translate', 'transform', {postprocess: (val) => `translate${val}`})];

  const docs: DocumentedRuleGroupDocs = {
    description: "X and Y variants have been removed because they are not logical properties. Windblade also uses proportions instead of separete values.",
    utilities: ["translate-<theme.windblade.proportions>"],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};

export const skew = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [size.rule('skew', 'transform', {defaultUnit: 'deg', postprocess: (val) => `skew${Number(val) * 360}`})];

  const docs: DocumentedRuleGroupDocs = {
    description: "Windblade uses proportions instead of separete values.",
    utilities: ["skew-<theme.windblade.proportions>"],
    preview: (util) => `TODO`,
  };

  return { rules, docs };
};
