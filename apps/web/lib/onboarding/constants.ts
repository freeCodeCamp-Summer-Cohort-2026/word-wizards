import type { ExperienceLevel, OnboardingGoal, PlacementBand, ThemeChoice } from "./types";

export interface GoalOption {
  description: string;
  iconName: "book" | "chat" | "file-text" | "target";
  id: OnboardingGoal;
  title: string;
}

export const GOAL_OPTIONS: GoalOption[] = [
  {
    description: "Build your word knowledge",
    iconName: "book",
    id: "vocabulary",
    title: "Vocabulary",
  },
  {
    description: "Express yourself confidently",
    iconName: "chat",
    id: "communication",
    title: "Communication",
  },
  {
    description: "Understand what you read",
    iconName: "file-text",
    id: "comprehension",
    title: "Comprehension",
  },
  {
    description: "Follow a structured path",
    iconName: "target",
    id: "guided_journey",
    title: "Guided Journey",
  },
];

export interface ExperienceOption {
  accent: "green" | "blue" | "amber";
  description: string;
  iconName: "plant" | "chart-bar" | "star";
  id: ExperienceLevel;
  targetStep: number; // 5 for beginner (auto-bypass step 4), 4 for others
  title: string;
}

export const EXPERIENCE_OPTIONS: ExperienceOption[] = [
  {
    accent: "green",
    description: "I'm new to English or know only a little.",
    iconName: "plant",
    id: "beginner",
    targetStep: 5,
    title: "Just getting started",
  },
  {
    accent: "blue",
    description: "I know some words and basic sentences.",
    iconName: "chart-bar",
    id: "some_experience",
    targetStep: 4,
    title: "I have some experience",
  },
  {
    accent: "amber",
    description: "I can hold conversations and would like to check my level.",
    iconName: "star",
    id: "comfortable",
    targetStep: 4,
    title: "I'm comfortable with English",
  },
];

export interface ThemeOption {
  description?: string;
  emoji: string;
  iconName: "paw" | "hamburger" | "airplane" | "leaf" | "house" | "laptop" | "dice";
  id: ThemeChoice;
  title: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  { emoji: "🐾", iconName: "paw", id: "animals", title: "Animals" },
  { emoji: "🍔", iconName: "hamburger", id: "food", title: "Food" },
  { emoji: "✈️", iconName: "airplane", id: "travel", title: "Travel" },
  { emoji: "🌿", iconName: "leaf", id: "nature", title: "Nature" },
  { emoji: "🏠", iconName: "house", id: "daily_life", title: "Daily Life" },
  { emoji: "💻", iconName: "laptop", id: "technology", title: "Technology" },
];

export const SURPRISE_THEME_OPTION: ThemeOption = {
  description: "Choose a recommended theme",
  emoji: "🎲",
  iconName: "dice",
  id: "surprise_me",
  title: "Surprise Me",
};

export const PLACEMENT_CHECK_BENEFITS = [
  "10–15 questions",
  "No time pressure",
  "Personalized recommendation",
  "Takes only a few minutes",
];

export function getPlacementBand(score: number): PlacementBand {
  if (score >= 80) return "advanced";
  if (score >= 50) return "intermediate";
  return "foundation";
}
