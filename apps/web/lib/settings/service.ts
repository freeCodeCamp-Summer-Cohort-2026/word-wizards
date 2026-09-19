import { createClient } from "@/lib/supabase/server";

import type { LearnerSettings } from "./types";

function displayNameFromEmail(email: string) {
  const [localPart] = email.split("@");
  return localPart || "Learner";
}

export async function getLearnerSettings(): Promise<LearnerSettings> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email ?? "";

  return {
    avatarUrl: null,
    displayName: displayNameFromEmail(email),
    email,
  };
}
