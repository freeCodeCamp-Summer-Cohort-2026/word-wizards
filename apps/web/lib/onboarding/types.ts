export type OnboardingGoal = "vocabulary" | "communication" | "comprehension" | "guided_journey";

export type ExperienceLevel = "beginner" | "some_experience" | "comfortable";

export type PlacementChoice = "take_check" | "skip_check";

export type ThemeChoice = "animals" | "food" | "travel" | "nature" | "daily_life" | "technology" | "surprise_me";

export type PlacementBand = "foundation" | "intermediate" | "advanced";

export interface ProfileOnboardingData {
  displayName?: string | null;
  email?: string | null;
  experienceLevel?: ExperienceLevel | null;
  firstTheme?: string | null;
  goal?: OnboardingGoal | null;
  id: string;
  keysBalance: number;
  onboardingCompleted: boolean;
  onboardingStep: number;
  placementCheckStatus?: "skipped" | "completed" | "pending" | null;
  placementScore?: number | null;
}

export interface OnboardingState {
  currentStep: number; // 1 to 7
  error?: string | null;
  historyStack: number[];
  isSubmitting: boolean;
  selections: {
    goal?: OnboardingGoal;
    experienceLevel?: ExperienceLevel;
    placementChoice?: PlacementChoice;
    placementScore?: number;
    selectedTheme?: ThemeChoice;
  };
}
