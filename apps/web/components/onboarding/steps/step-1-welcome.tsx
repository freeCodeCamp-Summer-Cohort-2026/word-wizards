"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";
import { OwlMascot } from "../icons/owl-mascot";
import { StepDots } from "../onboarding-header";

interface Step1WelcomeProps {
  onBegin: () => void;
}

export function Step1Welcome({ onBegin }: Step1WelcomeProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Mascot Graphic with Quote Bubble */}
      <div className="relative mt-2 flex flex-col items-center">
        {/* Quote Bubble */}
        <div className="absolute -left-12 top-14 hidden -rotate-6 rounded-2xl border border-[#ede9ff] bg-white px-3.5 py-2 shadow-[0_4px_16px_rgba(108,76,246,0.08)] sm:block">
          <p className="font-heading text-xs font-semibold italic text-[#6c4cf6]">“Every word is a new adventure!”</p>
        </div>

        <OwlMascot showBooks={true} size={190} />
      </div>

      {/* Title & Description */}
      <div className="mt-4 max-w-md px-4">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-[#111a46] sm:text-3xl">
          Welcome, Apprentice!
        </h1>
        <p className="mt-1 text-sm font-semibold text-[#6c4cf6]">Your journey into English begins here.</p>
        <p className="mt-3 text-xs sm:text-sm text-[#64748b] leading-relaxed">
          Learn through interactive lessons, practice, and discovery. Build your confidence one step at a time.
        </p>
      </div>

      {/* CTA Button */}
      <div className="mt-8 w-full max-w-sm px-4">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6c4cf6] py-3.5 text-base font-semibold text-white shadow-[0_8px_20px_rgba(108,76,246,0.3)] transition-all duration-200 hover:bg-[#5b3fe0] hover:shadow-[0_12px_24px_rgba(108,76,246,0.38)] active:scale-[0.98]"
          onClick={onBegin}
          type="button"
        >
          <span>Begin your journey</span>
          <ArrowRightIcon size={18} weight="bold" />
        </button>
      </div>

      {/* Step Dots */}
      <div className="mt-6">
        <StepDots currentStep={1} totalSteps={6} />
      </div>
    </div>
  );
}
