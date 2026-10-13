import { createClient } from "@/lib/supabase/server";
import type { ExperienceLevel, OnboardingGoal, ProfileOnboardingData, ThemeChoice } from "./types";

export async function getOnboardingProfile(): Promise<ProfileOnboardingData | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();

  if (error) {
    console.error("Error fetching onboarding profile:", error);
    throw new Error("Failed to fetch onboarding profile");
  }

  if (!profile) {
    // Graceful creation if profile trigger was not yet executed
    const defaultDisplayName = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Apprentice";

    const newProfile = {
      display_name: defaultDisplayName,
      email: user.email,
      id: user.id,
      keys_balance: 5,
      onboarding_completed: false,
      onboarding_step: 1,
    };

    const { data: inserted, error: insertError } = await supabase
      .from("profiles")
      .insert(newProfile)
      .select("*")
      .single();

    if (insertError) {
      console.error("Error creating initial profile:", insertError);
      throw new Error("Failed to initialize user profile");
    }

    return {
      displayName: inserted.display_name,
      email: inserted.email,
      experienceLevel: inserted.experience_level,
      firstTheme: inserted.first_theme,
      goal: inserted.goal,
      id: inserted.id,
      keysBalance: inserted.keys_balance ?? 5,
      onboardingCompleted: inserted.onboarding_completed ?? false,
      onboardingStep: inserted.onboarding_step ?? 1,
      placementCheckStatus: inserted.placement_check_status,
      placementScore: inserted.placement_score,
    };
  }

  return {
    displayName: profile.display_name,
    email: profile.email,
    experienceLevel: profile.experience_level,
    firstTheme: profile.first_theme,
    goal: profile.goal,
    id: profile.id,
    keysBalance: profile.keys_balance ?? 5,
    onboardingCompleted: profile.onboarding_completed ?? false,
    onboardingStep: profile.onboarding_step ?? 1,
    placementCheckStatus: profile.placement_check_status,
    placementScore: profile.placement_score,
  };
}

export interface SaveStepPayload {
  experienceLevel?: ExperienceLevel;
  firstTheme?: ThemeChoice | string;
  goal?: OnboardingGoal;
  placementCheckStatus?: "skipped" | "completed" | "pending";
  placementScore?: number | null;
  step: number;
}

export async function saveOnboardingStep(payload: SaveStepPayload) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const updates: Record<string, unknown> = {
    onboarding_step: payload.step,
    updated_at: new Date().toISOString(),
  };

  if (payload.goal !== undefined) updates.goal = payload.goal;
  if (payload.experienceLevel !== undefined) updates.experience_level = payload.experienceLevel;
  if (payload.placementCheckStatus !== undefined) updates.placement_check_status = payload.placementCheckStatus;
  if (payload.placementScore !== undefined) updates.placement_score = payload.placementScore;
  if (payload.firstTheme !== undefined) updates.first_theme = payload.firstTheme;

  const { error } = await supabase.from("profiles").update(updates).eq("id", user.id);

  if (error) {
    console.error("Error saving onboarding step:", error);
    throw new Error("Failed to save step progress");
  }

  return { success: true };
}

export interface CompleteOnboardingPayload {
  experienceLevel?: ExperienceLevel;
  firstTheme?: ThemeChoice | string;
  goal?: OnboardingGoal;
  placementCheckStatus?: "skipped" | "completed" | "pending";
  placementScore?: number | null;
}

export async function completeOnboarding(payload: CompleteOnboardingPayload) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const updates: Record<string, unknown> = {
    onboarding_completed: true,
    onboarding_step: 7,
    updated_at: new Date().toISOString(),
  };

  if (payload.goal !== undefined) updates.goal = payload.goal;
  if (payload.experienceLevel !== undefined) updates.experience_level = payload.experienceLevel;
  if (payload.placementCheckStatus !== undefined) updates.placement_check_status = payload.placementCheckStatus;
  if (payload.placementScore !== undefined) updates.placement_score = payload.placementScore;
  if (payload.firstTheme !== undefined) updates.first_theme = payload.firstTheme;

  // Ensure user has at least 5 keys
  const { error } = await supabase.from("profiles").update(updates).eq("id", user.id);

  if (error) {
    console.error("Error completing onboarding:", error);
    throw new Error("Failed to complete onboarding");
  }

  return { success: true };
}
