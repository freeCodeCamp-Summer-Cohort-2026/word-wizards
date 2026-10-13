"use client";

import { ArrowRightIcon, ChartBarIcon, PlantIcon, StarIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { EXPERIENCE_OPTIONS } from "@/lib/onboarding/constants";
import type { ExperienceLevel } from "@/lib/onboarding/types";
import { StepDots } from "../onboarding-header";
import { OptionCard } from "../option-card";

interface Step3ExperienceProps {
  onBack: () => void;
  onSelectAndAdvance: (level: ExperienceLevel, targetStep: number) => void;
  selectedLevel?: ExperienceLevel;
}

export function Step3Experience({ selectedLevel, onSelectAndAdvance, onBack }: Step3ExperienceProps) {
  const [localSelected, setLocalSelected] = useState<ExperienceLevel | undefined>(selectedLevel);

  const getExperienceIcon = (iconName: string) => {
    switch (iconName) {
      case "plant":
        return <PlantIcon className="text-emerald-600" size={26} weight="duotone" />;
      case "chart-bar":
        return <ChartBarIcon className="text-blue-600" size={26} weight="duotone" />;
      case "star":
        return <StarIcon className="text-amber-500" size={26} weight="duotone" />;
      default:
        return <PlantIcon className="text-emerald-600" size={26} weight="duotone" />;
    }
  };

  const handleCardClick = (level: ExperienceLevel, targetStep: number) => {
    setLocalSelected(level);
    // Provide a brief tactile visual feedback before auto-advancing
    setTimeout(() => {
      onSelectAndAdvance(level, targetStep);
    }, 150);
  };

  return (
    <div className="flex flex-col">
      {/* Title */}
      <div className="text-left">
        <h2 className="font-heading text-xl font-bold tracking-tight text-[#111a46] sm:text-2xl">
          How familiar are you with English?
        </h2>
        <p className="mt-1 text-xs text-[#64748b] sm:text-sm">This helps us suggest the best starting point for you.</p>
      </div>

      {/* 3 Vertical Stacked Cards */}
      <div className="mt-6 flex flex-col gap-3.5">
        {EXPERIENCE_OPTIONS.map((option) => (
          <OptionCard
            accent={option.accent}
            className="py-4"
            description={option.description}
            icon={getExperienceIcon(option.iconName)}
            id={option.id}
            key={option.id}
            onSelect={() => handleCardClick(option.id, option.targetStep)}
            radioPosition="right"
            selected={localSelected === option.id}
            title={option.title}
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
          disabled={!localSelected}
          onClick={() => {
            if (localSelected) {
              const opt = EXPERIENCE_OPTIONS.find((o) => o.id === localSelected);
              if (opt) onSelectAndAdvance(localSelected, opt.targetStep);
            }
          }}
          type="button"
        >
          <span>Continue</span>
          <ArrowRightIcon size={16} weight="bold" />
        </button>
      </div>

      {/* Step Dots */}
      <div className="mt-6">
        <StepDots currentStep={3} totalSteps={6} />
      </div>
    </div>
  );
}
