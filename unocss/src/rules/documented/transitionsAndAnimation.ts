import { Rule } from "@unocss/core";
import { objectEntries } from "ts-extras"
import Theme from "../../theme/Theme";
import * as logical from "../logicalSet";
import * as time from "../time";
import { DocumentedRuleGroup, DocumentedRuleGroupDocs } from "../../docs/types";

export const transitionDelayAndDuration = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    time.durationRule('duration', 'transition-duration'),
    time.durationRule('delay', 'transition-delay'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Transition delay & duration",
    description: "Time values in Windblade use same proportions as everything else.",
    utilities: ["duration-<theme.windblade.proportions>", "delay-<theme.windblade.proportions>"],
    preview: () => `TODO`,
  };

  return { rules, docs };
};

export const transitionTimingFunction = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    time.timingFunctionRule('ease', 'transition-timing-function'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Transition timing function",
    description: "Time values in Windblade use same proportions as everything else.",
    utilities: ["ease-<theme.windblade.time.functions>"],
    preview: () => `TODO`,
  };

  return { rules, docs };
};

export const animation = (): DocumentedRuleGroup => {
  const docs: DocumentedRuleGroupDocs = {
    title: "Animations",
    description: "Animations are missing at the moment because we are unsure how to implement them in a way that they can use theme proportions. Discussion in progress. You can, however, use animation control utilities, which are missing from Tailwind.",
    utilities: [],
  };

  return { rules: [], docs };
};

export const animationDelayAndDuration = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    time.durationRule('animation-duration', 'animation-duration'),
    time.durationRule('animation-delay', 'animation-delay'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Animation delay & duration",
    description: "Utilities for controlling the duration & delay of CSS animations. Missing from Tailwind.",
    utilities: ["animation-duration-<theme.windblade.proportions>", "animation-delay-<theme.windblade.proportions>"],
    preview: () => `TODO`,
  };

  return { rules, docs };
};

export const animationTimingFunction = (): DocumentedRuleGroup => {
  const rules: Rule<Theme>[] = [
    time.timingFunctionRule('animation-ease', 'animation-timing-function'),
  ];

  const docs: DocumentedRuleGroupDocs = {
    title: "Animation timing function",
    description: "Utilities for controlling the easing of CSS animations. Missing from Tailwind.",
    utilities: ["animation-ease-<theme.windblade.time.functions>"],
    preview: () => `TODO`,
  };

  return { rules, docs };
};
