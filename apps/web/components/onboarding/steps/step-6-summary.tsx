"use client";

import { ArrowRightIcon, BookOpenIcon, ChartBarIcon, PawPrintIcon, SparkleIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { EXPERIENCE_OPTIONS, GOAL_OPTIONS, SURPRISE_THEME_OPTION, THEME_OPTIONS } from "@/lib/onboarding/constants";
import type { ExperienceLevel, OnboardingGoal, ThemeChoice } from "@/lib/onboarding/types";
import { StepDots } from "../onboarding-header";

interface Step6SummaryProps {
  experienceLevel?: ExperienceLevel;
  goal?: OnboardingGoal;
  isSubmitting?: boolean;
  onConfirm: () => void;
  onEditStep: (step: number) => void;
  theme?: ThemeChoice;
}

export function Step6Summary({
  goal,
  experienceLevel,
  theme,
  onEditStep,
  onConfirm,
  isSubmitting = false,
}: Step6SummaryProps) {
  const goalObj = GOAL_OPTIONS.find((g) => g.id === goal) ?? GOAL_OPTIONS[0];
  const expObj = EXPERIENCE_OPTIONS.find((e) => e.id === experienceLevel) ?? EXPERIENCE_OPTIONS[0];
  const themeObj =
    theme === "surprise_me" ? SURPRISE_THEME_OPTION : (THEME_OPTIONS.find((t) => t.id === theme) ?? THEME_OPTIONS[0]);

  return (
    <div className="flex flex-col">
      {/* Title */}
      <div className="text-left">
        <h2 className="font-heading text-xl font-bold tracking-tight text-[#111a46] sm:text-2xl">
          Here&apos;s your starting path
        </h2>
        <p className="mt-1 text-xs text-[#64748b] sm:text-sm">You can change these settings later in your profile.</p>
      </div>

      {/* Summary Cards */}
      <div className="mt-6 flex flex-col gap-3">
        {/* Goal Item */}
        <div className="flex items-center justify-between rounded-2xl border border-[#e7e3f3] bg-white p-3.5 shadow-sm transition-all hover:border-[#6c4cf6]/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4f1ff] text-[#6c4cf6]">
              <BookOpenIcon size={20} weight="duotone" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-semibold tracking-wide text-[#64748b] uppercase">Your Goal</span>
              <p className="text-sm font-bold text-[#111a46]">{goalObj.title}</p>
              <p className="text-xs text-[#64748b]">{goalObj.description}</p>
            </div>
          </div>
          <button
            className="rounded-lg px-2.5 py-1 text-xs font-semibold text-[#6c4cf6] hover:bg-[#ede9ff]"
            onClick={() => onEditStep(2)}
            type="button"
          >
            Edit
          </button>
        </div>

        {/* Experience Level Item */}
        <div className="flex items-center justify-between rounded-2xl border border-[#e7e3f3] bg-white p-3.5 shadow-sm transition-all hover:border-[#6c4cf6]/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ChartBarIcon size={20} weight="duotone" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-semibold tracking-wide text-[#64748b] uppercase">
                Your Experience Level
              </span>
              <p className="text-sm font-bold text-[#111a46]">{expObj.title}</p>
              <p className="text-xs text-[#64748b]">{expObj.description}</p>
            </div>
          </div>
          <button
            className="rounded-lg px-2.5 py-1 text-xs font-semibold text-[#6c4cf6] hover:bg-[#ede9ff]"
            onClick={() => onEditStep(3)}
            type="button"
          >
            Edit
          </button>
        </div>

        {/* First Theme Item */}
        <div className="flex items-center justify-between rounded-2xl border border-[#e7e3f3] bg-white p-3.5 shadow-sm transition-all hover:border-[#6c4cf6]/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4f1ff] text-[#6c4cf6]">
              <PawPrintIcon size={20} weight="duotone" />
            </div>
            <div className="text-left">
              <span className="text-[11px] font-semibold tracking-wide text-[#64748b] uppercase">Your First Theme</span>
              <p className="text-sm font-bold text-[#111a46]">{themeObj.title}</p>
            </div>
          </div>
          <button
            className="rounded-lg px-2.5 py-1 text-xs font-semibold text-[#6c4cf6] hover:bg-[#ede9ff]"
            onClick={() => onEditStep(5)}
            type="button"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Cheerleader Owl Card */}
      <div className="mt-4 flex items-center gap-3.5 rounded-2xl border border-[#ede9ff] bg-gradient-to-r from-[#f7f4ff] to-[#fbfaff] p-3.5">
        <div className="shrink-0">
          <Image
            alt="Word Wizards mascot cheerleader"
            className="h-12 w-12 object-contain"
            height={48}
            src="/assets-png/mascot/mascot-happy.png"
            width={48}
          />
        </div>
        <div className="text-left">
          <p className="flex items-center gap-1 text-xs font-bold text-[#6c4cf6]">
            <span>Great choice!</span>
            <SparkleIcon className="text-amber-400" size={14} weight="fill" />
          </p>
          <p className="mt-0.5 text-xs text-[#475569]">
            Let&apos;s start with some amazing words about {themeObj.title.toLowerCase()}.
          </p>
        </div>
      </div>

      {/* Confirm CTA */}
      <div className="mt-6 flex flex-col gap-2">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6c4cf6] py-3.5 text-base font-semibold text-white shadow-[0_6px_20px_rgba(108,76,246,0.3)] transition-all duration-200 hover:bg-[#5b3fe0] disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
          disabled={isSubmitting}
          onClick={onConfirm}
          type="button"
        >
          <span>{isSubmitting ? "Setting up your realm..." : "Start my first lesson"}</span>
          {!isSubmitting && <ArrowRightIcon size={18} weight="bold" />}
        </button>
      </div>

      {/* Step Dots */}
      <div className="mt-4">
        <StepDots currentStep={6} totalSteps={6} />
      </div>
    </div>
  );
}
