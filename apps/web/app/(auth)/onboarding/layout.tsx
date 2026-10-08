import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  description: "Begin your personalized English learning adventure.",
  title: "Welcome Apprentice | Word Wizards",
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#f4f1ff] via-[#fffdf7] to-[#f4f1ff] p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xl">{children}</div>
    </div>
  );
}
