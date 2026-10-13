"use client";

import { CaretLeftIcon, SparkleIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface OnboardingHeaderProps {
  canGoBack?: boolean;
  currentStep: number;
  onBack?: () => void;
  totalSteps?: number;
}

export function OnboardingHeader({ currentStep, totalSteps = 6, onBack, canGoBack = false }: OnboardingHeaderProps) {
  // Step indicator displays 1-6 across main progression steps (capped at 6 for preview/summary)
  const displayStep = Math.min(currentStep, totalSteps);

  return (
    <div className="relative flex w-full items-center justify-between border-b border-[#e7e3f3] bg-white/70 px-6 py-4 backdrop-blur-md">
      {/* Left Back Arrow */}
      <div className="flex w-16 items-center">
        {canGoBack && onBack ? (
          <button
            aria-label="Go back to previous step"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e7e3f3] text-[#334155] transition-all duration-150 hover:border-[#6c4cf6]/40 hover:bg-[#ede9ff] hover:text-[#6c4cf6] active:scale-95"
            onClick={onBack}
            type="button"
          >
            <CaretLeftIcon size={18} weight="bold" />
          </button>
        ) : (
          <div className="h-9 w-9" />
        )}
      </div>

      {/* Brand Center */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] text-white shadow-sm shadow-[#6c4cf6]/30">
          <SparkleIcon size={18} weight="fill" />
        </div>
        <span className="font-heading text-lg font-bold tracking-tight text-[#111a46]">Word Wizards</span>
      </div>

      {/* Right Step Counter */}
      <div className="flex w-16 items-center justify-end">
        {currentStep <= totalSteps && (
          <span className="rounded-full bg-[#f4f1ff] px-2.5 py-1 text-xs font-semibold text-[#6c4cf6]">
            Step {displayStep} of {totalSteps}
          </span>
        )}
      </div>
    </div>
  );
}

interface StepDotsProps {
  className?: string;
  currentStep: number;
  totalSteps?: number;
}

const STEP_DOT_IDS = ["dot-1", "dot-2", "dot-3", "dot-4", "dot-5", "dot-6"] as const;

export function StepDots({ currentStep, totalSteps = 6, className }: StepDotsProps) {
  const activeDotIndex = Math.min(currentStep, totalSteps) - 1;
  const dots = STEP_DOT_IDS.slice(0, totalSteps);

  return (
    <div
      aria-label={`Step ${currentStep} of ${totalSteps}`}
      aria-valuemax={totalSteps}
      aria-valuemin={1}
      aria-valuenow={currentStep}
      className={cn("flex items-center justify-center gap-2 py-3", className)}
      role="progressbar"
    >
      {dots.map((dotId, index) => {
        const isActive = index === activeDotIndex;
        const isCompleted = index < activeDotIndex;

        return (
          <div
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              isActive ? "w-6 bg-[#6c4cf6]" : isCompleted ? "w-2 bg-[#6c4cf6]/60" : "w-2 bg-[#e2e8f0]",
            )}
            key={dotId}
          />
        );
      })}
    </div>
  );
}
