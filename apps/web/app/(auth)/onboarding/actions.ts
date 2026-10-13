"use server";

import { revalidatePath } from "next/cache";
import {
  type CompleteOnboardingPayload,
  completeOnboarding,
  type SaveStepPayload,
  saveOnboardingStep,
} from "@/lib/onboarding/service";

export type ActionResult<T = void> =
  | { success: true; data?: T; error?: never }
  | { success: false; error: string; data?: never };

export async function saveStepAction(payload: SaveStepPayload): Promise<ActionResult> {
  try {
    await saveOnboardingStep(payload);
    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to save step",
      success: false,
    };
  }
}

export async function completeOnboardingAction(payload: CompleteOnboardingPayload): Promise<ActionResult> {
  try {
    await completeOnboarding(payload);
    revalidatePath("/protected/learner", "layout");
    revalidatePath("/protected/learner");
    revalidatePath("/onboarding");
    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Failed to complete onboarding",
      success: false,
    };
  }
}
