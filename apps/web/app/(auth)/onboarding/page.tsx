import { redirect } from "next/navigation";
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { getOnboardingProfile } from "@/lib/onboarding/service";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/onboarding");
  }

  const profile = await getOnboardingProfile();

  // If already completed onboarding, redirect to learner dashboard
  if (profile?.onboardingCompleted) {
    redirect("/protected/learner");
  }

  return <OnboardingWizard initialProfile={profile} />;
}
