"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteProjectAction } from "@/lib/actions";
import { cn } from "@/lib/utils";

export function DeleteProjectButton({ projectId, redirectAfter }: { projectId: string; redirectAfter?: boolean }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!confirming) {
      setConfirming(true);
      return;
    }

    startTransition(async () => {
      const result = await deleteProjectAction(projectId);
      if (result.ok) {
        toast.success("Project deleted");
        if (redirectAfter) {
          router.push("/dashboard/projects");
        } else {
          router.refresh();
        }
      } else {
        toast.error(result.message);
        setConfirming(false);
      }
    });
  }

  return (
    <button
      onClick={handleClick}
      onBlur={() => setConfirming(false)}
      disabled={isPending}
      className={cn(
        "flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs transition disabled:opacity-50",
        confirming
          ? "border-rose-500/40 bg-rose-500/10 text-rose-300"
          : "border-white/10 bg-white/[0.05] text-muted-foreground hover:border-white/20 hover:text-foreground"
      )}
      aria-label={confirming ? "Confirm delete project" : "Delete project"}
    >
      <Trash2 className="size-3.5 shrink-0" aria-hidden="true" />
      {isPending ? "Deleting…" : confirming ? "Confirm delete?" : "Delete"}
    </button>
  );
}
