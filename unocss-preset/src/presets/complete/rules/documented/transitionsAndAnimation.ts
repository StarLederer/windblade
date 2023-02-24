import { Rule } from "@unocss/core";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "unocss-docs";
import { theme } from "../../../core";
import * as time from "../../../core/rule-utils/time";

export const transitionDelayAndDuration = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    time.durationRule('duration', 'transition-duration'),
    time.durationRule('delay', 'transition-delay'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    description: "Time values in Windblade use same proportions as everything else.",
    utilities: ["duration-<theme.windblade.proportions>", "delay-<theme.windblade.proportions>"],
    preview: () => `TODO`,
  };

  return { rules, docs };
};

export const transitionTimingFunction = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    time.timingFunctionRule('ease', 'transition-timing-function'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    description: "Time values in Windblade use same proportions as everything else.",
    utilities: ["ease-<theme.windblade.time.functions>"],
    preview: () => `TODO`,
  };

  return { rules, docs };
};

export const animation = (): DocumentedRuleGroup<theme.Theme> => {
  const docs: DocumentedRuleGroupDocs = {
    description: "Animations are missing at the moment because we are unsure how to implement them in a way that they can use theme proportions. Discussion in progress. You can, however, use animation control utilities, which are missing from Tailwind.",
    utilities: [],
  };

  return { rules: [], docs };
};

export const animationDelayAndDuration = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    time.durationRule('animation-duration', 'animation-duration'),
    time.durationRule('animation-delay', 'animation-delay'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    description: "Utilities for controlling the duration & delay of CSS animations. Missing from Tailwind.",
    utilities: ["animation-duration-<theme.windblade.proportions>", "animation-delay-<theme.windblade.proportions>"],
    preview: () => `TODO`,
  };

  return { rules, docs };
};

export const animationTimingFunction = (): DocumentedRuleGroup<theme.Theme> => {
  const rules: Rule<theme.Theme>[] = [
    time.timingFunctionRule('animation-ease', 'animation-timing-function'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    description: "Utilities for controlling the easing of CSS animations. Missing from Tailwind.",
    utilities: ["animation-ease-<theme.windblade.time.functions>"],
    preview: () => `TODO`,
  };

  return { rules, docs };
};
