"use client";

import { ArrowRightIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { PLACEMENT_CHECK_BENEFITS } from "@/lib/onboarding/constants";
import { TestClipboardIcon } from "../icons/test-clipboard";
import { StepDots } from "../onboarding-header";

interface Step4PlacementProps {
  onBack: () => void;
  onSkipCheck: () => void;
  onTakeCheck: () => void;
}

export function Step4Placement({ onTakeCheck, onSkipCheck, onBack }: Step4PlacementProps) {
  return (
    <div className="flex flex-col">
      {/* Title */}
      <div className="text-left">
        <h2 className="font-heading text-xl font-bold tracking-tight text-[#111a46] sm:text-2xl">
          Take a quick placement check?
        </h2>
        <p className="mt-1 text-xs text-[#64748b] sm:text-sm">
          Take a short optional check to help us recommend the best starting point for you.
        </p>
      </div>

      {/* Hero Illustration & Value Props Card */}
      <div className="mt-6 flex flex-col items-center justify-between rounded-3xl border border-[#e7e3f3] bg-gradient-to-b from-[#faf9ff] to-white p-6 sm:flex-row sm:gap-6">
        <div className="flex shrink-0 items-center justify-center p-2">
          <TestClipboardIcon size={130} />
        </div>

        <div className="mt-4 flex flex-1 flex-col gap-2.5 sm:mt-0">
          {PLACEMENT_CHECK_BENEFITS.map((benefit) => (
            <div className="flex items-center gap-2.5 text-left" key={benefit}>
              <CheckCircleIcon className="shrink-0 text-emerald-600" size={18} weight="fill" />
              <span className="text-xs font-semibold text-[#1e293b] sm:text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6c4cf6] py-3.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(108,76,246,0.3)] transition-all duration-200 hover:bg-[#5b3fe0] active:scale-[0.98]"
          onClick={onTakeCheck}
          type="button"
        >
          <span>Take the quick check</span>
          <ArrowRightIcon size={16} weight="bold" />
        </button>

        <button
          className="text-xs font-semibold text-[#6c4cf6] transition-colors hover:text-[#5b3fe0] hover:underline"
          onClick={onSkipCheck}
          type="button"
        >
          I&apos;ll choose my starting point
        </button>
        <p className="text-[11px] text-[#94a3b8]">You can always take a test later.</p>
      </div>

      {/* Bottom Back Button */}
      <div className="mt-4 flex justify-start">
        <button
          className="rounded-2xl border border-[#e7e3f3] px-6 py-2.5 text-xs font-semibold text-[#475569] transition-all hover:bg-[#f8f6ff] active:scale-95"
          onClick={onBack}
          type="button"
        >
          Back
        </button>
      </div>

      {/* Step Dots */}
      <div className="mt-4">
        <StepDots currentStep={4} totalSteps={6} />
      </div>
    </div>
  );
}
