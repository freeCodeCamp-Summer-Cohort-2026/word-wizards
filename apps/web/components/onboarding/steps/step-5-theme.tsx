"use client";

import {
  AirplaneTiltIcon,
  ArrowRightIcon,
  CheckIcon,
  DiceFiveIcon,
  HamburgerIcon,
  HouseIcon,
  LaptopIcon,
  PawPrintIcon,
  PlantIcon,
} from "@phosphor-icons/react";
import { SURPRISE_THEME_OPTION, THEME_OPTIONS } from "@/lib/onboarding/constants";
import type { ThemeChoice } from "@/lib/onboarding/types";
import { cn } from "@/lib/utils";
import { StepDots } from "../onboarding-header";

interface Step5ThemeProps {
  onBack: () => void;
  onContinue: () => void;
  onSelectTheme: (theme: ThemeChoice) => void;
  selectedTheme?: ThemeChoice;
}

export function Step5Theme({ selectedTheme, onSelectTheme, onContinue, onBack }: Step5ThemeProps) {
  const getThemeIcon = (iconName: string) => {
    switch (iconName) {
      case "paw":
        return <PawPrintIcon className="text-[#6c4cf6]" size={24} weight="duotone" />;
      case "hamburger":
        return <HamburgerIcon className="text-amber-600" size={24} weight="duotone" />;
      case "airplane":
        return <AirplaneTiltIcon className="text-blue-600" size={24} weight="duotone" />;
      case "leaf":
        return <PlantIcon className="text-emerald-600" size={24} weight="duotone" />;
      case "house":
        return <HouseIcon className="text-orange-600" size={24} weight="duotone" />;
      case "laptop":
        return <LaptopIcon className="text-indigo-600" size={24} weight="duotone" />;
      case "dice":
        return <DiceFiveIcon className="text-rose-600" size={24} weight="duotone" />;
      default:
        return <PawPrintIcon className="text-[#6c4cf6]" size={24} weight="duotone" />;
    }
  };

  const handleCardKeyDown = (e: React.KeyboardEvent, id: ThemeChoice) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelectTheme(id);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Title */}
      <div className="text-left">
        <h2 className="font-heading text-xl font-bold tracking-tight text-[#111a46] sm:text-2xl">
          What would you like to learn first?
        </h2>
        <p className="mt-1 text-xs text-[#64748b] sm:text-sm">
          Pick a theme that interests you. You can explore others anytime.
        </p>
      </div>

      {/* 3x2 Grid of Themes */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {THEME_OPTIONS.map((theme) => {
          const isSelected = selectedTheme === theme.id;
          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                "group relative flex cursor-pointer select-none flex-col items-center justify-center rounded-2xl border-2 p-3.5 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#6c4cf6]",
                isSelected
                  ? "border-[#6c4cf6] bg-[#f5f2ff] shadow-[0_4px_16px_rgba(108,76,246,0.15)]"
                  : "border-[#e7e3f3] bg-white hover:border-[#6c4cf6]/40 hover:bg-[#faf9ff]",
              )}
              key={theme.id}
              onClick={() => onSelectTheme(theme.id)}
              onKeyDown={(e) => handleCardKeyDown(e, theme.id)}
              type="button"
            >
              {/* Radio Indicator */}
              <div
                className={cn(
                  "absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full border transition-all",
                  isSelected
                    ? "border-[#6c4cf6] bg-[#6c4cf6]"
                    : "border-[#cbd5e1] bg-white group-hover:border-[#94a3b8]",
                )}
              >
                {isSelected && <CheckIcon className="text-white" size={10} weight="bold" />}
              </div>

              {/* Icon Container */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f1ff] transition-transform duration-200 group-hover:scale-110">
                {getThemeIcon(theme.iconName)}
              </div>

              {/* Title */}
              <span className="mt-2 text-xs font-bold text-[#111a46] sm:text-sm">{theme.title}</span>
            </button>
          );
        })}
      </div>

      <button
        aria-pressed={selectedTheme === SURPRISE_THEME_OPTION.id}
        className={cn(
          "group mt-3 flex w-full cursor-pointer select-none items-center justify-between rounded-2xl border-2 p-3.5 text-left transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#6c4cf6]",
          selectedTheme === SURPRISE_THEME_OPTION.id
            ? "border-rose-400 bg-rose-50/70 shadow-[0_4px_16px_rgba(244,63,94,0.12)]"
            : "border-[#e7e3f3] bg-white hover:border-rose-300 hover:bg-rose-50/20",
        )}
        onClick={() => onSelectTheme(SURPRISE_THEME_OPTION.id)}
        onKeyDown={(e) => handleCardKeyDown(e, SURPRISE_THEME_OPTION.id)}
        type="button"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600 transition-transform group-hover:scale-105">
            <DiceFiveIcon size={22} weight="duotone" />
          </div>
          <div className="text-left">
            <span className="text-xs font-bold text-[#111a46] sm:text-sm">Surprise Me</span>
            <p className="text-[11px] text-[#64748b]">Choose a recommended theme</p>
          </div>
        </div>

        <div
          className={cn(
            "flex h-4 w-4 items-center justify-center rounded-full border transition-all",
            selectedTheme === SURPRISE_THEME_OPTION.id
              ? "border-rose-500 bg-rose-500"
              : "border-[#cbd5e1] bg-white group-hover:border-[#94a3b8]",
          )}
        >
          {selectedTheme === SURPRISE_THEME_OPTION.id && <CheckIcon className="text-white" size={10} weight="bold" />}
        </div>
      </button>

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
          disabled={!selectedTheme}
          onClick={onContinue}
          type="button"
        >
          <span>Continue</span>
          <ArrowRightIcon size={16} weight="bold" />
        </button>
      </div>

      {/* Step Dots */}
      <div className="mt-6">
        <StepDots currentStep={5} totalSteps={6} />
      </div>
    </div>
  );
}
