"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { completeOnboardingAction, saveStepAction } from "@/app/(auth)/onboarding/actions";
import type { ExperienceLevel, OnboardingGoal, ProfileOnboardingData, ThemeChoice } from "@/lib/onboarding/types";
import { OnboardingHeader } from "./onboarding-header";
import { Step1Welcome } from "./steps/step-1-welcome";
import { Step2Goal } from "./steps/step-2-goal";
import { Step3Experience } from "./steps/step-3-experience";
import { Step4Placement } from "./steps/step-4-placement";
import { Step5Theme } from "./steps/step-5-theme";
import { Step6Summary } from "./steps/step-6-summary";
import { Step7FirstLesson } from "./steps/step-7-first-lesson";

// Explicit placeholder score for mock placement until the assessment engine is implemented
const MOCK_PLACEMENT_SCORE = 85;

interface OnboardingWizardProps {
  initialProfile?: ProfileOnboardingData | null;
}

export function OnboardingWizard({ initialProfile }: OnboardingWizardProps) {
  const router = useRouter();

  // Selections state
  const [goal, setGoal] = useState<OnboardingGoal | undefined>(initialProfile?.goal ?? undefined);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | undefined>(
    initialProfile?.experienceLevel ?? undefined,
  );
  const [placementChoice, setPlacementChoice] = useState<"take_check" | "skip_check" | undefined>(
    initialProfile?.placementCheckStatus === "completed"
      ? "take_check"
      : initialProfile?.placementCheckStatus === "skipped"
        ? "skip_check"
        : undefined,
  );
  const [theme, setTheme] = useState<ThemeChoice | undefined>((initialProfile?.firstTheme as ThemeChoice) ?? "animals");

  // Determine starting step based on saved profile progress (capped at 6)
  const initialStep = Math.max(1, Math.min(initialProfile?.onboardingStep ?? 1, 6));

  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  // History stack preserves the exact path taken to support conditional branching back navigation
  const [historyStack, setHistoryStack] = useState<number[]>([initialStep]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Navigate forward and append target to history stack
  const navigateForward = (targetStep: number) => {
    setHistoryStack((prev) => [...prev, targetStep]);
    setCurrentStep(targetStep);
  };

  // Back navigation: pop top of stack and restore previous step
  const handleBack = () => {
    if (historyStack.length <= 1) {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
      return;
    }

    setHistoryStack((prev) => {
      const nextStack = [...prev];
      nextStack.pop(); // Remove current step
      const previousStep = nextStack[nextStack.length - 1];
      setCurrentStep(previousStep);
      return nextStack;
    });
  };

  // Step 1 -> Step 2
  // Step 1 -> Step 2
  const handleBegin = async () => {
    setErrorMsg(null);
    const result = await saveStepAction({ step: 2 });
    if (!result.success) {
      setErrorMsg(result.error ?? "Failed to save progress. Please try again.");
      return;
    }
    navigateForward(2);
  };

  // Step 2 Continue -> Step 3
  const handleGoalContinue = async () => {
    if (!goal) return;
    setErrorMsg(null);
    const result = await saveStepAction({ goal, step: 3 });
    if (!result.success) {
      setErrorMsg(result.error ?? "Failed to save progress. Please try again.");
      return;
    }
    navigateForward(3);
  };

  // Step 3: AUTO-ADVANCE & CONDITIONAL BRANCHING
  const handleExperienceSelect = async (level: ExperienceLevel, targetStep: number) => {
    setExperienceLevel(level);
    setErrorMsg(null);
    const result = await saveStepAction({ experienceLevel: level, step: targetStep });
    if (!result.success) {
      setErrorMsg(result.error ?? "Failed to save progress. Please try again.");
      return;
    }
    navigateForward(targetStep);
  };

  // Step 4: Take Placement Check
  const handleTakePlacementCheck = async () => {
    setPlacementChoice("take_check");
    setErrorMsg(null);
    const result = await saveStepAction({
      placementCheckStatus: "completed",
      placementScore: MOCK_PLACEMENT_SCORE,
      step: 5,
    });
    if (!result.success) {
      setErrorMsg(result.error ?? "Failed to save progress. Please try again.");
      return;
    }
    navigateForward(5);
  };

  // Step 4: Skip Placement Check
  const handleSkipPlacementCheck = async () => {
    setPlacementChoice("skip_check");
    setErrorMsg(null);
    const result = await saveStepAction({
      placementCheckStatus: "skipped",
      placementScore: null,
      step: 5,
    });
    if (!result.success) {
      setErrorMsg(result.error ?? "Failed to save progress. Please try again.");
      return;
    }
    navigateForward(5);
  };

  // Step 5 Continue -> Step 6
  const handleThemeContinue = async () => {
    if (!theme) return;
    setErrorMsg(null);
    const result = await saveStepAction({ firstTheme: theme, step: 6 });
    if (!result.success) {
      setErrorMsg(result.error ?? "Failed to save progress. Please try again.");
      return;
    }
    navigateForward(6);
  };

  // Step 6: Edit any previous selection
  const handleEditStep = (stepToEdit: number) => {
    navigateForward(stepToEdit);
  };

  // Step 6 Confirm -> Step 7 First Lesson Preview
  const handleConfirmSummary = () => {
    navigateForward(7);
  };

  // Step 7: Finalize Onboarding & Enter Learner Realm
  const handleFinishOnboarding = async () => {
    setIsSubmitting(true);
    setErrorMsg(null);

    const result = await completeOnboardingAction({
      experienceLevel,
      firstTheme: theme,
      goal,
      placementCheckStatus: placementChoice === "take_check" ? "completed" : "skipped",
      placementScore: placementChoice === "take_check" ? MOCK_PLACEMENT_SCORE : null,
    });

    if (!result.success) {
      setErrorMsg(result.error ?? "Failed to finalize onboarding. Please try again.");
      setIsSubmitting(false);
      return;
    }

    // Direct user to learner dashboard with fresh session
    router.push("/protected/learner");
    router.refresh();
  };

  // Can go back on steps 2 to 5 (and step 6 if navigated from stack)
  const canGoBack = currentStep > 1 && currentStep <= 6;

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-[#e7e3f3] bg-white shadow-[0_20px_60px_-15px_rgba(72,52,140,0.12)]">
      {/* Header with Back Arrow and Step Counter */}
      <OnboardingHeader canGoBack={canGoBack} currentStep={currentStep} onBack={handleBack} totalSteps={6} />

      {/* Main Step Content Area */}
      <div className="p-6 sm:p-8">
        {errorMsg && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
            {errorMsg}
          </div>
        )}

        {currentStep === 1 && <Step1Welcome onBegin={handleBegin} />}

        {currentStep === 2 && (
          <Step2Goal onBack={handleBack} onContinue={handleGoalContinue} onSelectGoal={setGoal} selectedGoal={goal} />
        )}

        {currentStep === 3 && (
          <Step3Experience
            onBack={handleBack}
            onSelectAndAdvance={handleExperienceSelect}
            selectedLevel={experienceLevel}
          />
        )}

        {currentStep === 4 && (
          <Step4Placement
            onBack={handleBack}
            onSkipCheck={handleSkipPlacementCheck}
            onTakeCheck={handleTakePlacementCheck}
          />
        )}

        {currentStep === 5 && (
          <Step5Theme
            onBack={handleBack}
            onContinue={handleThemeContinue}
            onSelectTheme={setTheme}
            selectedTheme={theme}
          />
        )}

        {currentStep === 6 && (
          <Step6Summary
            experienceLevel={experienceLevel}
            goal={goal}
            isSubmitting={isSubmitting}
            onConfirm={handleConfirmSummary}
            onEditStep={handleEditStep}
            theme={theme}
          />
        )}

        {currentStep === 7 && (
          <Step7FirstLesson
            isSubmitting={isSubmitting}
            onGoToDashboard={handleFinishOnboarding}
            onStartLesson={handleFinishOnboarding}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
}
