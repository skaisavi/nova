"use client";

import { useState, useTransition } from "react";
import { Check, Moon, Shield, Sparkles, Sun, UserRound, UsersRound } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { deleteWorkspaceAction, updateProfileAction, updateWorkspaceAction } from "@/lib/actions";

type Props = {
  initialName: string;
  initialWorkspaceName: string;
};

export function SettingsForms({ initialName, initialWorkspaceName }: Props) {
  const [profileName, setProfileName] = useState(initialName);
  const [workspaceName, setWorkspaceName] = useState(initialWorkspaceName);
  const [profileMsg, setProfileMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [workspaceMsg, setWorkspaceMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [dangerConfirm, setDangerConfirm] = useState(false);
  const [profilePending, startProfileTransition] = useTransition();
  const [workspacePending, startWorkspaceTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();
  const { resolvedTheme, setTheme } = useTheme();
  const activeTheme = resolvedTheme === "light" ? "light" : "dark";

  function saveProfile() {
    startProfileTransition(async () => {
      const result = await updateProfileAction({ name: profileName });
      setProfileMsg({ ok: result.ok, text: result.message });
      setTimeout(() => setProfileMsg(null), 3000);
    });
  }

  function saveWorkspace() {
    startWorkspaceTransition(async () => {
      const result = await updateWorkspaceAction({ name: workspaceName });
      setWorkspaceMsg({ ok: result.ok, text: result.message });
      setTimeout(() => setWorkspaceMsg(null), 3000);
    });
  }

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {/* Profile */}
      <GlassCard>
        <UserRound className="size-7 text-primary" aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-medium">Profile</h2>
        <p className="mt-3 leading-7 text-muted-foreground">Your display name across NOVA workspaces.</p>
        <div className="mt-6 space-y-3">
          <input
            type="text"
            aria-label="Display name"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            placeholder="Display name"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm outline-none placeholder:text-muted-foreground transition focus:border-white/20 focus:bg-white/[0.09]"
          />
          {profileMsg ? (
            <p className={`flex items-center gap-2 text-sm ${profileMsg.ok ? "text-emerald-400" : "text-destructive"}`}>
              {profileMsg.ok && <Check className="size-4" aria-hidden="true" />}
              {profileMsg.text}
            </p>
          ) : (
            <Button variant="secondary" onClick={saveProfile} disabled={profilePending || profileName.trim().length < 2}>
              {profilePending ? "Saving…" : "Save profile"}
            </Button>
          )}
        </div>
      </GlassCard>

      {/* Workspace */}
      <GlassCard>
        <UsersRound className="size-7 text-primary" aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-medium">Workspace</h2>
        <p className="mt-3 leading-7 text-muted-foreground">The name shown to members and clients.</p>
        <div className="mt-6 space-y-3">
          <input
            type="text"
            aria-label="Workspace name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            placeholder="Workspace name"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm outline-none placeholder:text-muted-foreground transition focus:border-white/20 focus:bg-white/[0.09]"
          />
          {workspaceMsg ? (
            <p className={`flex items-center gap-2 text-sm ${workspaceMsg.ok ? "text-emerald-400" : "text-destructive"}`}>
              {workspaceMsg.ok && <Check className="size-4" aria-hidden="true" />}
              {workspaceMsg.text}
            </p>
          ) : (
            <Button variant="secondary" onClick={saveWorkspace} disabled={workspacePending || workspaceName.trim().length < 2}>
              {workspacePending ? "Saving…" : "Save workspace"}
            </Button>
          )}
        </div>
      </GlassCard>

      {/* Theme */}
      <GlassCard>
        <Sparkles className="size-7 text-primary" aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-medium">Theme</h2>
        <p className="mt-3 leading-7 text-muted-foreground">Choose and persist your preferred visual mode.</p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setTheme("dark")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm transition ${
              activeTheme === "dark"
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-white/10 bg-white/[0.06] text-muted-foreground hover:bg-white/[0.09]"
            }`}
            aria-pressed={activeTheme === "dark"}
          >
            <Moon className="size-4" aria-hidden="true" />
            Dark
            {activeTheme === "dark" && <Check className="ml-auto size-3.5" aria-hidden="true" />}
          </button>
          <button
            onClick={() => setTheme("light")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm transition ${
              activeTheme === "light"
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-white/10 bg-white/[0.06] text-muted-foreground hover:bg-white/[0.09]"
            }`}
            aria-pressed={activeTheme === "light"}
          >
            <Sun className="size-4" aria-hidden="true" />
            Light
            {activeTheme === "light" && <Check className="ml-auto size-3.5" aria-hidden="true" />}
          </button>
        </div>
      </GlassCard>

      {/* Danger zone */}
      <GlassCard>
        <Shield className="size-7 text-destructive" aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-medium">Danger zone</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          Permanently delete this workspace and all its data. This cannot be undone.
        </p>
        {dangerConfirm ? (
          <div className="mt-6 space-y-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-4">
            <p className="text-sm font-medium text-destructive">
              All projects, tasks, comments, and activity will be deleted forever.
            </p>
            <div className="flex gap-2">
              <Button
                variant="danger"
                size="sm"
                disabled={deletePending}
                onClick={() => {
                  startDeleteTransition(async () => {
                    const result = await deleteWorkspaceAction();
                    if (result.ok) {
                      toast.success("Workspace deleted");
                      await signOut({ callbackUrl: "/" });
                    } else {
                      toast.error(result.message);
                      setDangerConfirm(false);
                    }
                  });
                }}
              >
                {deletePending ? "Deleting…" : "Confirm delete"}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setDangerConfirm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button className="mt-6" variant="danger" onClick={() => setDangerConfirm(true)}>
            Delete workspace
          </Button>
        )}
      </GlassCard>
    </section>
  );
}
