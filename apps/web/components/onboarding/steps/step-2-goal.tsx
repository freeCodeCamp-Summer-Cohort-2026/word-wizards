"use client";

import { ArrowRightIcon, BookOpenIcon, ChatCircleDotsIcon, CompassIcon, FileTextIcon } from "@phosphor-icons/react";
import { GOAL_OPTIONS } from "@/lib/onboarding/constants";
import type { OnboardingGoal } from "@/lib/onboarding/types";
import { StepDots } from "../onboarding-header";
import { OptionCard } from "../option-card";

interface Step2GoalProps {
  onBack: () => void;
  onContinue: () => void;
  onSelectGoal: (goal: OnboardingGoal) => void;
  selectedGoal?: OnboardingGoal;
}

export function Step2Goal({ selectedGoal, onSelectGoal, onContinue, onBack }: Step2GoalProps) {
  const getGoalIcon = (iconName: string) => {
    switch (iconName) {
      case "book":
        return <BookOpenIcon className="text-[#6c4cf6]" size={24} weight="duotone" />;
      case "chat":
        return <ChatCircleDotsIcon className="text-[#6c4cf6]" size={24} weight="duotone" />;
      case "file-text":
        return <FileTextIcon className="text-[#6c4cf6]" size={24} weight="duotone" />;
      case "target":
        return <CompassIcon className="text-[#6c4cf6]" size={24} weight="duotone" />;
      default:
        return <BookOpenIcon className="text-[#6c4cf6]" size={24} weight="duotone" />;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Title */}
      <div className="text-left">
        <h2 className="font-heading text-xl font-bold tracking-tight text-[#111a46] sm:text-2xl">
          What would you like to improve?
        </h2>
        <p className="mt-1 text-xs text-[#64748b] sm:text-sm">
          Choose your primary goal. You can always change this later.
        </p>
      </div>

      {/* 2x2 Grid of Goals */}
      <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {GOAL_OPTIONS.map((goal) => (
          <OptionCard
            className="min-h-[96px]"
            description={goal.description}
            icon={getGoalIcon(goal.iconName)}
            id={goal.id}
            key={goal.id}
            onSelect={() => onSelectGoal(goal.id)}
            radioPosition="top-right"
            selected={selectedGoal === goal.id}
            title={goal.title}
          />
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          className="rounded-2xl border border-[#e7e3f3] px-6 py-3 text-sm font-semibold text-[#475569] transition-all hover:bg-[#f8f6ff] hover:text-[#111a46] active:scale-95"
          onClick={onBack}
          type="button"
        >
          Back
        </button>

        <button
          className="flex items-center gap-2 rounded-2xl bg-[#6c4cf6] px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(108,76,246,0.3)] transition-all duration-200 hover:bg-[#5b3fe0] disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98]"
          disabled={!selectedGoal}
          onClick={onContinue}
          type="button"
        >
          <span>Continue</span>
          <ArrowRightIcon size={16} weight="bold" />
        </button>
      </div>

      {/* Step Dots */}
      <div className="mt-6">
        <StepDots currentStep={2} totalSteps={6} />
      </div>
    </div>
  );
}
