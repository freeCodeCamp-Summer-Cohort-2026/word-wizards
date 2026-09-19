"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { softDeleteAccount } from "@/lib/settings/actions";
import { createClient } from "@/lib/supabase/client";

function ChangePasswordCard() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsSaving(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setIsSaving(false);

    if (updateError) {
      setError(updateError.message);
      toast.error(updateError.message);
      return;
    }

    setPassword("");
    setConfirmPassword("");
    toast.success("Password updated.");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>Choose a new password for your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="new-password">New password</Label>
            <Input
              autoComplete="new-password"
              id="new-password"
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm new password</Label>
            <Input
              autoComplete="new-password"
              id="confirm-password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              type="password"
              value={confirmPassword}
            />
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <Button disabled={isSaving} type="submit">
            {isSaving ? "Updating..." : "Update password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function SessionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Session</CardTitle>
        <CardDescription>Sign out of Word Wizards on this device.</CardDescription>
      </CardHeader>
      <CardContent>
        <LogoutButton />
      </CardContent>
    </Card>
  );
}

function DangerZoneCard() {
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleDeactivate = async () => {
    setError(null);
    setIsDeactivating(true);

    const result = await softDeleteAccount();
    if (!result.ok) {
      setIsDeactivating(false);
      setError(result.error);
      toast.error(result.error);
      return;
    }

    const supabase = createClient();
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      setIsDeactivating(false);
      setError("Your account was deactivated, but signing out failed. Please sign out manually.");
      toast.error(signOutError.message);
      return;
    }

    toast.success("Your account has been deactivated.");
    router.push("/auth/login");
  };

  const cancel = () => {
    setIsConfirming(false);
    setConfirmation("");
    setError(null);
  };

  return (
    <Card className="ring-destructive/30">
      <CardHeader>
        <CardTitle className="text-destructive">Deactivate account</CardTitle>
        <CardDescription>Deactivates your account and signs you out. Your learning progress is kept.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isConfirming ? (
          <>
            <div className="grid gap-2">
              <Label htmlFor="delete-confirmation">Type DEACTIVATE to confirm</Label>
              <Input
                autoComplete="off"
                id="delete-confirmation"
                onChange={(event) => setConfirmation(event.target.value)}
                value={confirmation}
              />
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <div className="flex flex-wrap gap-2">
              <Button
                disabled={confirmation !== "DEACTIVATE" || isDeactivating}
                onClick={handleDeactivate}
                type="button"
                variant="destructive"
              >
                {isDeactivating ? "Deactivating..." : "Deactivate account"}
              </Button>
              <Button onClick={cancel} type="button" variant="ghost">
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <Button onClick={() => setIsConfirming(true)} type="button" variant="destructive">
            Deactivate account
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function AccountSection() {
  return (
    <section aria-labelledby="account-heading" className="space-y-4">
      <h2 className="font-heading text-xl font-semibold" id="account-heading">
        Account
      </h2>
      <ChangePasswordCard />
      <SessionCard />
      <DangerZoneCard />
    </section>
  );
}
